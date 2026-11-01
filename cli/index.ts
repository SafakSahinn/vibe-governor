import * as fs from "node:fs";
import * as path from "node:path";
import { CONFIG_FILE, buildConfigFile, generateProjectFiles, isUserOwnedPath, type ProjectConfigFile } from "../src/lib/templateEngine";
import { decodePreset, parseConfig } from "../src/lib/preset";
import { fillEmptyMemory } from "../src/lib/autoFill";
import { CODING_LANGUAGES, DEFAULT_FORM_DATA, SAFETY_SWITCH_KEYS, wizardSchema } from "../src/lib/schema";
import { contentHash } from "../src/lib/hash";
import { LEGACY_RULE_FILES } from "../src/lib/templates/ideRules";
import { VERSION } from "../src/lib/version";
import type { AutomationOptions, CodingLanguage, GeneratedFile, WizardFormData } from "../src/types/wizard";

/**
 * vibe-governor CLI. Writes the same governance pack the web wizard exports and
 * keeps it up to date through vibe-governor.json.
 */

const HELP = `vibe-governor ${VERSION}

Usage:
  vibe-governor init   [options]   Install the governance pack into a project
  vibe-governor update [options]   Re-generate from vibe-governor.json (optionally changing settings)
  vibe-governor detect [--dir=]    List the languages detected in a project

Common options:
  --dir=<path>            Target directory (default: current directory)
  --force                 Overwrite files even if they exist / were edited by hand
  --dry-run               Only show what would change
  --no-hook               Do not install .git/hooks/pre-commit

init:
  --preset=<string>       Full configuration copied from the web wizard (step 5)
  Without --preset, defaults can be adjusted with the setting options below;
  when --languages is omitted, languages are detected from the project files.

Setting options (init and update):
  --name=<project>        Project name
  --platforms=<list>      AGENTS_MD,CLAUDE_CLI,GEMINI_CLI,ANTIGRAVITY,CURSOR,WINDSURF,CLINE,GITHUB_COPILOT
  --languages=<list>      ${CODING_LANGUAGES.join(",")} (empty = none)
  --detect                (update) replace the language list with the detected languages
  --max-lines=<n>         File line limit (200-1500)
  --doc-score=<n>         Documentation score threshold (5-10)
  --lang=<tr|en>          Language of the generated files
  --enable=<keys>         Turn switches on, e.g. tsNoAny,includeGitHubCI
  --disable=<keys>        Turn switches off

update never touches .memory_bank/ or .gitignore (created only when missing). A managed
file edited by hand is kept and the new version is written next to it as <file>.vibe-new.

  -h, --help              Show this help
  -v, --version           Show version
`;

type Flags = Map<string, string | true>;

function parseArgs(argv: string[]): { command: string | undefined; flags: Flags } {
  const flags: Flags = new Map();
  let command: string | undefined;
  for (const arg of argv) {
    if (arg === "-h") flags.set("help", true);
    else if (arg === "-v") flags.set("version", true);
    else if (arg.startsWith("--")) {
      const eq = arg.indexOf("=");
      if (eq < 0) flags.set(arg.slice(2), true);
      else flags.set(arg.slice(2, eq), arg.slice(eq + 1));
    } else if (!command) command = arg;
  }
  return { command, flags };
}

const str = (flags: Flags, key: string): string | undefined => {
  const v = flags.get(key);
  return typeof v === "string" ? v : undefined;
};
const list = (value: string | undefined): string[] | undefined =>
  value === undefined ? undefined : value.split(",").map((s) => s.trim()).filter(Boolean);

function fail(message: string): never {
  console.error(`✖ ${message}`);
  process.exit(1);
}

// ---------------------------------------------------------------- detection

const EXT_LANG: Record<string, CodingLanguage> = {
  ".c": "C", ".cpp": "C++", ".cc": "C++", ".cxx": "C++", ".hpp": "C++", ".hh": "C++", ".cs": "C#",
  ".java": "Java", ".js": "JavaScript", ".jsx": "JavaScript", ".mjs": "JavaScript", ".cjs": "JavaScript",
  ".ts": "TypeScript", ".tsx": "TypeScript", ".py": "Python", ".go": "Go", ".rs": "Rust", ".kt": "Kotlin",
  ".kts": "Kotlin", ".swift": "Swift", ".php": "PHP", ".v": "Verilog", ".sv": "Verilog", ".svh": "Verilog",
  ".vhd": "VHDL", ".vhdl": "VHDL",
};
const SKIP_DIRS = new Set([
  ".git", "node_modules", "target", "dist", "build", "out", ".next", "vendor", "__pycache__",
  ".venv", "venv", "env", "coverage", ".idea", ".vscode", ".memory_bank", "scripts",
]);

/** Languages present in a project, by file extension (.h counts as C unless C++ sources exist). */
function detectLanguages(root: string, maxFiles = 20000): CodingLanguage[] {
  const found = new Set<CodingLanguage>();
  let headers = false;
  let seen = 0;
  const walk = (dir: string): void => {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (seen > maxFiles) return;
      if (e.isDirectory()) {
        if (!SKIP_DIRS.has(e.name)) walk(path.join(dir, e.name));
        continue;
      }
      seen += 1;
      const ext = path.extname(e.name).toLowerCase();
      if (ext === ".h") headers = true;
      const lang = EXT_LANG[ext];
      if (lang) found.add(lang);
    }
  };
  walk(root);
  if (headers && !found.has("C++")) found.add("C");
  return CODING_LANGUAGES.filter((l) => found.has(l));
}

// ---------------------------------------------------------------- settings

/** Applies the setting flags on top of a configuration and validates the result. */
function applySettingFlags(base: WizardFormData, flags: Flags, root: string, detectWhenNoLanguages: boolean): WizardFormData {
  const num = (key: string, fallback: number): number => {
    const v = str(flags, key);
    return v === undefined ? fallback : Number(v);
  };
  let languages = list(str(flags, "languages"));
  if (languages === undefined && (flags.has("detect") || detectWhenNoLanguages)) languages = detectLanguages(root);
  const constraints: Record<string, unknown> = {
    ...base.constraints,
    maxLines: num("max-lines", base.constraints.maxLines),
    docScoreThreshold: num("doc-score", base.constraints.docScoreThreshold),
  };
  const automation: Record<string, unknown> = { ...base.automation };
  const switchKeys = new Set<string>(SAFETY_SWITCH_KEYS);
  const automationKeys = new Set(Object.keys(DEFAULT_FORM_DATA.automation));
  for (const [flag, value] of [["enable", true], ["disable", false]] as const) {
    for (const key of list(str(flags, flag)) ?? []) {
      if (switchKeys.has(key)) constraints[key] = value;
      else if (automationKeys.has(key)) automation[key] = value;
      else fail(`Unknown switch "${key}". Valid: ${[...switchKeys, ...automationKeys].join(", ")}`);
    }
  }
  const candidate = {
    ...base,
    locale: str(flags, "lang") ?? base.locale,
    targetPlatforms: list(str(flags, "platforms")) ?? base.targetPlatforms,
    languages: languages ?? base.languages,
    constraints,
    automation: automation as unknown as AutomationOptions,
    memoryBank: { ...base.memoryBank, projectName: str(flags, "name") ?? base.memoryBank.projectName },
  };
  const parsed = wizardSchema.safeParse(candidate);
  if (!parsed.success) fail(parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "));
  return parsed.data;
}

// ---------------------------------------------------------------- writing

interface WriteContext {
  root: string;
  tr: boolean;
  dryRun: boolean;
  force: boolean;
}

const targetOf = (root: string, rel: string): string => path.join(root, ...rel.split("/"));

function writeFile(ctx: WriteContext, rel: string, content: string): void {
  if (ctx.dryRun) return;
  const target = targetOf(ctx.root, rel);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, "utf8");
  if (/\.(sh|py)$/.test(rel)) fs.chmodSync(target, 0o755);
}

/** Returns the parent path of rel that exists as a regular file (e.g. a legacy `.clinerules` file). */
function blockedByFile(root: string, rel: string): string | null {
  const parts = rel.split("/");
  for (let i = 1; i < parts.length; i++) {
    const p = targetOf(root, parts.slice(0, i).join("/"));
    if (fs.existsSync(p) && fs.statSync(p).isFile()) return parts.slice(0, i).join("/");
  }
  return null;
}

const readText = (p: string): string | null => {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return null;
  }
};

function installHook(ctx: WriteContext, hook: GeneratedFile | undefined, previousHookHash: string | undefined, noHook: boolean): void {
  const gitDir = path.join(ctx.root, ".git");
  if (!hook || noHook || !fs.existsSync(gitDir) || !fs.statSync(gitDir).isDirectory()) return;
  const hookPath = path.join(gitDir, "hooks", "pre-commit");
  const current = readText(hookPath);
  if (current !== null && contentHash(current) === contentHash(hook.content)) return;
  const ours = current !== null && previousHookHash !== undefined && contentHash(current) === previousHookHash;
  if (current !== null && !ours && !ctx.force) {
    console.log(`  ⏭  .git/hooks/pre-commit ${ctx.tr ? "(başka bir kanca var, --force ile değiştirilir)" : "(another hook exists, use --force)"}`);
    return;
  }
  if (!ctx.dryRun) {
    fs.mkdirSync(path.dirname(hookPath), { recursive: true });
    fs.writeFileSync(hookPath, hook.content, "utf8");
    fs.chmodSync(hookPath, 0o755);
  }
  console.log(`  🪝 .git/hooks/pre-commit ${ctx.tr ? (current ? "güncellendi" : "kuruldu") : current ? "updated" : "installed"}`);
}

function legacyNotes(ctx: WriteContext): void {
  for (const [legacy, replacement] of Object.entries(LEGACY_RULE_FILES)) {
    if (fs.existsSync(targetOf(ctx.root, legacy))) {
      console.log(
        ctx.tr
          ? `  ℹ️  Eski biçim ${legacy} bulundu; yeni dosya ${replacement}. İçeriği taşıdıktan sonra eskisini silebilirsiniz.`
          : `  ℹ️  Legacy ${legacy} found; the current file is ${replacement}. Delete the old one after moving any custom content.`
      );
    }
  }
}

// ---------------------------------------------------------------- commands

function init(flags: Flags): void {
  const root = path.resolve(str(flags, "dir") ?? process.cwd());
  let data: WizardFormData;
  const preset = str(flags, "preset");
  if (preset !== undefined) {
    const res = decodePreset(preset);
    if (!res.ok) fail(res.error);
    data = res.data;
  } else {
    data = applySettingFlags(DEFAULT_FORM_DATA, flags, root, true);
    data = { ...data, memoryBank: fillEmptyMemory(data) };
  }
  const ctx: WriteContext = { root, tr: data.locale === "tr", dryRun: flags.has("dry-run"), force: flags.has("force") };
  const { tr } = ctx;

  console.log(`🛡️  Vibe Governor ${VERSION} → ${root}`);
  if (preset === undefined && str(flags, "languages") === undefined) {
    console.log(
      data.languages.length
        ? `  🔎 ${tr ? "Algılanan diller" : "Detected languages"}: ${data.languages.join(", ")}`
        : `  🔎 ${tr ? "Dil algılanmadı; yalnızca dilden bağımsız kurallar uygulanacak (--languages ile belirtebilirsiniz)." : "No language detected; only language-independent rules apply (set them with --languages)."}`
    );
  }
  const configExisted = fs.existsSync(targetOf(root, CONFIG_FILE));
  if (configExisted && !ctx.force) {
    console.log(`  ℹ️  ${CONFIG_FILE} ${tr ? "zaten var. Ayarları değiştirmek için: npx vibe-governor update" : "already exists. To change settings run: npx vibe-governor update"}`);
  }

  const files = generateProjectFiles(data).filter((f) => f.path !== CONFIG_FILE);
  let written = 0;
  let skipped = 0;
  for (const file of files) {
    const blocker = blockedByFile(root, file.path);
    if (blocker) {
      skipped += 1;
      console.log(`  ⏭  ${file.path} ${tr ? `(${blocker} bir dosya; klasöre çevirin)` : `(${blocker} is a file; convert it to a folder)`}`);
      continue;
    }
    const exists = fs.existsSync(targetOf(root, file.path));
    if (exists && !ctx.force) {
      skipped += 1;
      console.log(`  ⏭  ${file.path} ${tr ? "(zaten var, --force ile üzerine yazılır)" : "(exists, use --force to overwrite)"}`);
      continue;
    }
    writeFile(ctx, file.path, file.content);
    written += 1;
    console.log(`  ${exists ? "♻️ " : "✔ "} ${file.path}`);
  }
  if (!configExisted || ctx.force) {
    writeFile(ctx, CONFIG_FILE, buildConfigFile(data, files).content);
    written += 1;
    console.log(`  ✔  ${CONFIG_FILE}`);
  }
  installHook(ctx, files.find((f) => f.path === "scripts/pre-commit-hook.sh"), undefined, flags.has("no-hook"));
  legacyNotes(ctx);

  const prefix = ctx.dryRun ? (tr ? "[deneme] " : "[dry-run] ") : "";
  console.log(tr ? `\n${prefix}${written} dosya yazıldı, ${skipped} dosya atlandı.` : `\n${prefix}${written} file(s) written, ${skipped} skipped.`);
  if (files.some((f) => f.path === "scripts/check_guidelines.py")) {
    console.log(tr ? "Denetim: python3 scripts/check_guidelines.py" : "Verify: python3 scripts/check_guidelines.py");
    console.log(
      tr
        ? "Mevcut bir projede eski ihlalleri kabul etmek için: python3 scripts/check_guidelines.py --update-baseline"
        : "To accept existing violations in an existing project: python3 scripts/check_guidelines.py --update-baseline"
    );
  }
}

function update(flags: Flags): void {
  const root = path.resolve(str(flags, "dir") ?? process.cwd());
  const rawText = readText(targetOf(root, CONFIG_FILE));
  if (rawText === null) fail(`${CONFIG_FILE} not found in ${root}. Run "npx vibe-governor init" first.`);
  let previous: Partial<ProjectConfigFile>;
  try {
    previous = JSON.parse(rawText) as Partial<ProjectConfigFile>;
  } catch {
    fail(`${CONFIG_FILE} is not valid JSON.`);
  }
  const res = parseConfig(previous, CONFIG_FILE);
  if (!res.ok) fail(res.error);
  const data = applySettingFlags(res.data, flags, root, false);
  const ctx: WriteContext = { root, tr: data.locale === "tr", dryRun: flags.has("dry-run"), force: flags.has("force") };
  const { tr } = ctx;
  const oldHashes = previous.managedFiles ?? {};

  console.log(`🛡️  Vibe Governor ${VERSION} update → ${root}`);
  const files = generateProjectFiles(data).filter((f) => f.path !== CONFIG_FILE);
  const keepHashes: Record<string, string> = {};
  const counts = { updated: 0, created: 0, kept: 0, removed: 0 };

  for (const file of files) {
    if (blockedByFile(root, file.path)) {
      console.log(`  ⏭  ${file.path} ${tr ? "(üst yol bir dosya)" : "(a parent path is a file)"}`);
      continue;
    }
    const current = readText(targetOf(root, file.path));
    if (current === null) {
      writeFile(ctx, file.path, file.content);
      counts.created += 1;
      console.log(`  ✔  ${file.path}`);
      continue;
    }
    if (isUserOwnedPath(file.path) || contentHash(current) === contentHash(file.content)) continue;
    const untouched = oldHashes[file.path] !== undefined && contentHash(current) === oldHashes[file.path];
    if (untouched || ctx.force) {
      writeFile(ctx, file.path, file.content);
      counts.updated += 1;
      console.log(`  ♻️  ${file.path}`);
    } else {
      // Keep the hand-edited file; its old hash (or a marker) keeps it "edited" for the next update.
      writeFile(ctx, `${file.path}.vibe-new`, file.content);
      keepHashes[file.path] = oldHashes[file.path] ?? "edited";
      counts.kept += 1;
      console.log(`  ✋ ${file.path} ${tr ? `(elle düzenlenmiş; yeni sürüm ${file.path}.vibe-new)` : `(edited by hand; new version in ${file.path}.vibe-new)`}`);
    }
  }

  // Managed files that are no longer generated (platform or automation turned off).
  const generated = new Set(files.map((f) => f.path));
  for (const [rel, hash] of Object.entries(oldHashes)) {
    if (generated.has(rel)) continue;
    const current = readText(targetOf(root, rel));
    if (current === null) continue;
    if (contentHash(current) === hash) {
      if (!ctx.dryRun) fs.rmSync(targetOf(root, rel));
      counts.removed += 1;
      console.log(`  🗑  ${rel} ${tr ? "(artık seçili değil, değiştirilmemişti)" : "(no longer selected, was unmodified)"}`);
    } else {
      console.log(`  ℹ️  ${rel} ${tr ? "artık üretilmiyor ama elle düzenlenmiş; silinmedi." : "is no longer generated but was edited; kept."}`);
    }
  }

  writeFile(ctx, CONFIG_FILE, buildConfigFile(data, files, keepHashes).content);
  installHook(ctx, files.find((f) => f.path === "scripts/pre-commit-hook.sh"), oldHashes["scripts/pre-commit-hook.sh"], flags.has("no-hook"));
  legacyNotes(ctx);

  const prefix = ctx.dryRun ? (tr ? "[deneme] " : "[dry-run] ") : "";
  console.log(
    tr
      ? `\n${prefix}${counts.updated} güncellendi, ${counts.created} oluşturuldu, ${counts.kept} korundu (.vibe-new), ${counts.removed} kaldırıldı.`
      : `\n${prefix}${counts.updated} updated, ${counts.created} created, ${counts.kept} kept (.vibe-new), ${counts.removed} removed.`
  );
}

function detect(flags: Flags): void {
  const langs = detectLanguages(path.resolve(str(flags, "dir") ?? process.cwd()));
  console.log(langs.length ? langs.join(",") : "(none)");
}

function main(): void {
  const { command, flags } = parseArgs(process.argv.slice(2));
  if (flags.has("version")) {
    console.log(VERSION);
    return;
  }
  if (flags.has("help") || !command) {
    console.log(HELP);
    return;
  }
  if (command === "init") init(flags);
  else if (command === "update") update(flags);
  else if (command === "detect") detect(flags);
  else fail(`Unknown command "${command}". Run with --help.`);
}

main();
