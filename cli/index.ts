import * as fs from "node:fs";
import * as path from "node:path";
import { generateProjectFiles } from "../src/lib/templateEngine";
import { decodePreset } from "../src/lib/preset";
import { DEFAULT_FORM_DATA, wizardSchema } from "../src/lib/schema";
import type { WizardFormData } from "../src/types/wizard";

/**
 * vibe-governor CLI. Writes the same governance pack the web wizard exports.
 *
 *   npx -y github:SafakSahinn/vibe-governor init --preset=<from the web wizard>
 *   npx -y github:SafakSahinn/vibe-governor init --name=my-app --languages=Rust,Verilog --lang=en
 */

const VERSION = "1.1.0";

const HELP = `vibe-governor ${VERSION}

Usage:
  vibe-governor init [options]

Options:
  --preset=<string>     Full configuration copied from the web wizard (step 5)
  --dir=<path>          Target directory (default: current directory)
  --force               Overwrite existing files
  --no-hook             Do not install .git/hooks/pre-commit
  --dry-run             Only list the files that would be written

  Without --preset, defaults can be adjusted with:
  --name=<project>      Project name
  --platforms=<list>    CLAUDE_CLI,ANTIGRAVITY,CURSOR,WINDSURF,CLINE,GITHUB_COPILOT
  --languages=<list>    Rust,TypeScript,Python,C++,Go,Verilog,VHDL
  --max-lines=<n>       File line limit (200-1500, default 800)
  --doc-score=<n>       Documentation score threshold (5-10, default 8)
  --lang=<tr|en>        Output language (default tr)

  -h, --help            Show this help
  -v, --version         Show version
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

function str(flags: Flags, key: string): string | undefined {
  const v = flags.get(key);
  return typeof v === "string" ? v : undefined;
}

function list(value: string | undefined): string[] | undefined {
  return value === undefined ? undefined : value.split(",").map((s) => s.trim()).filter(Boolean);
}

function fail(message: string): never {
  console.error(`✖ ${message}`);
  process.exit(1);
}

/** Resolves the wizard configuration from --preset or individual flags. */
function resolveConfig(flags: Flags): WizardFormData {
  const preset = str(flags, "preset");
  if (preset !== undefined) {
    const res = decodePreset(preset);
    if (!res.ok) fail(res.error);
    return res.data;
  }
  const d = DEFAULT_FORM_DATA;
  const num = (key: string, fallback: number): number => {
    const v = str(flags, key);
    return v === undefined ? fallback : Number(v);
  };
  const candidate = {
    ...d,
    locale: str(flags, "lang") ?? d.locale,
    targetPlatforms: list(str(flags, "platforms")) ?? d.targetPlatforms,
    languages: list(str(flags, "languages")) ?? d.languages,
    constraints: {
      ...d.constraints,
      maxLines: num("max-lines", d.constraints.maxLines),
      docScoreThreshold: num("doc-score", d.constraints.docScoreThreshold),
    },
    memoryBank: { ...d.memoryBank, projectName: str(flags, "name") ?? d.memoryBank.projectName },
  };
  const parsed = wizardSchema.safeParse(candidate);
  if (!parsed.success) {
    fail(parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "));
  }
  return parsed.data;
}

function init(flags: Flags): void {
  const data = resolveConfig(flags);
  const tr = data.locale === "tr";
  const root = path.resolve(str(flags, "dir") ?? process.cwd());
  const force = flags.has("force");
  const dryRun = flags.has("dry-run");
  const files = generateProjectFiles(data);

  console.log(`🛡️  Vibe Governor → ${root}`);
  let written = 0;
  let skipped = 0;
  for (const file of files) {
    const target = path.join(root, ...file.path.split("/"));
    const exists = fs.existsSync(target);
    if (exists && !force) {
      skipped += 1;
      console.log(`  ⏭  ${file.path} ${tr ? "(zaten var, --force ile üzerine yazılır)" : "(exists, use --force to overwrite)"}`);
      continue;
    }
    if (!dryRun) {
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, file.content, "utf8");
      if (/\.(sh|py)$/.test(file.path)) fs.chmodSync(target, 0o755);
    }
    written += 1;
    console.log(`  ${exists ? "♻️ " : "✔ "} ${file.path}`);
  }

  const hook = files.find((f) => f.path === "scripts/pre-commit-hook.sh");
  const gitDir = path.join(root, ".git");
  if (hook && !flags.has("no-hook") && fs.existsSync(gitDir) && fs.statSync(gitDir).isDirectory()) {
    const hookPath = path.join(gitDir, "hooks", "pre-commit");
    if (fs.existsSync(hookPath) && !force) {
      console.log(`  ⏭  .git/hooks/pre-commit ${tr ? "(zaten var)" : "(exists)"}`);
    } else {
      if (!dryRun) {
        fs.mkdirSync(path.dirname(hookPath), { recursive: true });
        fs.writeFileSync(hookPath, hook.content, "utf8");
        fs.chmodSync(hookPath, 0o755);
      }
      console.log(`  🪝 .git/hooks/pre-commit ${tr ? "kuruldu" : "installed"}`);
    }
  }

  const prefix = dryRun ? (tr ? "[deneme] " : "[dry-run] ") : "";
  console.log(
    tr
      ? `\n${prefix}${written} dosya yazıldı, ${skipped} dosya atlandı.`
      : `\n${prefix}${written} file(s) written, ${skipped} skipped.`
  );
  if (files.some((f) => f.path === "scripts/check_guidelines.py")) {
    console.log(tr ? "Denetim: python3 scripts/check_guidelines.py" : "Verify: python3 scripts/check_guidelines.py");
  }
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
  if (command !== "init") fail(`Unknown command "${command}". Run with --help.`);
  init(flags);
}

main();
