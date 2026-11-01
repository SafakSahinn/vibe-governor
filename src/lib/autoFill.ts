import type { CodingLanguage, MemoryBankData, ProjectConstraints, TargetPlatform, WizardFormData } from "../types/wizard";
import { HDL_LANGUAGES } from "./schema";
import { getEnabledRules, switchLanguages } from "./rules";

/**
 * Values derived from earlier choices: safety switches follow the selected
 * languages (step 2) and the Memory Bank fields that can be inferred from the
 * settings are pre-written (step 3). Shared by the web wizard and the CLI.
 */

const isHdl = (l: CodingLanguage) => (HDL_LANGUAGES as readonly string[]).includes(l);

/**
 * Switches of newly selected languages are turned on, switches whose languages
 * were all deselected are turned off. Switches of languages that stay selected
 * keep the user's choice.
 */
export function syncSwitchesToLanguages(
  constraints: ProjectConstraints,
  prev: CodingLanguage[],
  next: CodingLanguage[]
): ProjectConstraints {
  const out = { ...constraints };
  for (const [key, langs] of Object.entries(switchLanguages()) as [keyof ProjectConstraints, CodingLanguage[]][]) {
    const was = langs.some((l) => prev.includes(l));
    const now = langs.some((l) => next.includes(l));
    if (was !== now) (out[key] as boolean) = now;
  }
  return out;
}

/** Constraints with exactly the switches of the given languages turned on. */
export function switchesForLanguages(constraints: ProjectConstraints, languages: CodingLanguage[]): ProjectConstraints {
  const out = { ...constraints };
  for (const [key, langs] of Object.entries(switchLanguages()) as [keyof ProjectConstraints, CodingLanguage[]][]) {
    (out[key] as boolean) = langs.some((l) => languages.includes(l));
  }
  return out;
}

/** Memory Bank fields that can be derived from the other settings. */
export const AUTO_MEMORY_FIELDS = ["projectBrief", "systemPatterns", "techContext", "activeContext", "progress"] as const;
export type AutoMemoryField = (typeof AUTO_MEMORY_FIELDS)[number];
export type AutoMemory = Record<AutoMemoryField, string>;

const PLATFORM_NAMES: Record<TargetPlatform, string> = {
  AGENTS_MD: "AGENTS.md",
  CLAUDE_CLI: "Claude Code",
  GEMINI_CLI: "Gemini CLI",
  ANTIGRAVITY: "Google Antigravity",
  CURSOR: "Cursor",
  WINDSURF: "Windsurf",
  CLINE: "Cline",
  GITHUB_COPILOT: "GitHub Copilot",
};

/** Typical build / test / lint commands per language. */
const COMMANDS: Record<CodingLanguage, string> = {
  C: "`cmake --build build` / `make`, `gcc -Wall -Wextra`",
  "C++": "`cmake --build build`, `ctest`",
  "C#": "`dotnet build`, `dotnet test`",
  Java: "`mvn verify` / `gradle build`",
  JavaScript: "`npm install`, `npm test`",
  TypeScript: "`npm run build`, `npx tsc --noEmit`, `npm test`",
  Python: "`pip install -r requirements.txt`, `pytest`, `mypy .`",
  Go: "`go build ./...`, `go test ./...`, `go vet ./...`",
  Rust: "`cargo build`, `cargo test`, `cargo clippy`",
  Kotlin: "`./gradlew build`, `./gradlew test`",
  Swift: "`swift build`, `swift test`",
  PHP: "`composer install`, `vendor/bin/phpunit`",
  Verilog: "`verilator --lint-only -Wall`, `iverilog` + testbench",
  VHDL: "`ghdl -a`, `ghdl -e`, `ghdl -r` + testbench",
};

const list = (items: string[], tr: boolean): string => {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} ${tr ? "ve" : "and"} ${items[items.length - 1]}`;
};

/** Builds the derivable Memory Bank texts in the output language. */
export function buildAutoMemory(data: WizardFormData): AutoMemory {
  const tr = data.locale === "tr";
  const sw = data.languages.filter((l) => !isHdl(l));
  const hdl = data.languages.filter(isHdl);
  const n = data.constraints.maxLines;
  const a = data.automation;
  const tools = data.targetPlatforms.map((p) => PLATFORM_NAMES[p]);
  const rules = getEnabledRules(data);

  let projectBrief = "";
  if (sw.length && hdl.length) {
    projectBrief = tr
      ? `${list(sw, tr)} yazılımı ile ${list(hdl, tr)} donanım tasarımını birlikte içeren karma proje.`
      : `Mixed project combining ${list(sw, tr)} software with ${list(hdl, tr)} hardware design.`;
  } else if (hdl.length) {
    projectBrief = tr ? `${list(hdl, tr)} ile donanım (RTL) tasarım projesi.` : `Hardware (RTL) design project in ${list(hdl, tr)}.`;
  } else if (sw.length) {
    projectBrief = tr ? `${list(sw, tr)} ile geliştirilen yazılım projesi.` : `Software project built with ${list(sw, tr)}.`;
  }

  const patterns: string[] = [];
  if (sw.length) {
    patterns.push(
      tr
        ? `Modüler yazılım: her dosya en fazla ${n} satır ve tek sorumluluk taşır, modüller açık arayüzlerle bağlanır`
        : `Modular software: each file has at most ${n} lines and a single responsibility, modules talk through explicit interfaces`
    );
  }
  if (hdl.length) {
    patterns.push(
      tr
        ? `RTL hiyerarşisi: üst modül alt modülleri örnekler, her modül en fazla ${n} satır, senkron tasarım ve açıkça belirtilmiş saat/reset`
        : `RTL hierarchy: a top module instantiates sub-modules, each at most ${n} lines, synchronous design with explicit clock/reset`
    );
  }
  if (!patterns.length) {
    patterns.push(
      tr ? `Dosyalar konuya göre bölünür, her dosya en fazla ${n} satır` : `Files are split by topic, each at most ${n} lines`
    );
  }

  const tech = data.languages.map((l) => `${l}: ${COMMANDS[l]}`);
  if (a.includeCheckGuidelines) {
    tech.push(`${tr ? "Kural denetimi" : "Rule check"}: \`python3 scripts/check_guidelines.py\``);
  }
  if (tools.length) tech.push(`${tr ? "AI araçları" : "AI tools"}: ${tools.join(", ")}`);

  const onOff = (v: boolean) => (tr ? (v ? "açık" : "kapalı") : v ? "on" : "off");
  const status: string[] = [];
  if (a.includeCheckGuidelines) {
    status.push(
      tr
        ? `denetçi ${rules.length} dile özel kural + ${n} satır sınırı ile çalışıyor`
        : `the checker enforces ${rules.length} language rule(s) + the ${n}-line limit`
    );
  }
  status.push(`${tr ? "pre-commit kancası" : "pre-commit hook"} ${onOff(a.includePreCommitHook)}`);
  status.push(`CI ${onOff(a.includeGitHubCI)}`);

  return {
    projectBrief,
    systemPatterns: `${patterns.join(tr ? ". " : ". ")}.`,
    techContext: tech.join(" · "),
    activeContext: tr
      ? `Vibe Governor kuruldu: AI_GUIDELINES.md${tools.length ? ` ve ${tools.join(", ")} kural dosyaları` : ""}. Sıradaki iş: projectbrief.md ve productContext.md'yi projeye göre tamamlamak.`
      : `Vibe Governor installed: AI_GUIDELINES.md${tools.length ? ` and rule files for ${tools.join(", ")}` : ""}. Next: complete projectbrief.md and productContext.md for this project.`,
    progress: tr ? `Yönetişim paketi kuruldu; ${status.join(", ")}.` : `Governance pack installed; ${status.join(", ")}.`,
  };
}

/** Fills empty derivable fields (used by the CLI and when a config with empty fields is loaded). */
export function fillEmptyMemory(data: WizardFormData): MemoryBankData {
  const auto = buildAutoMemory(data);
  const mb = { ...data.memoryBank };
  for (const f of AUTO_MEMORY_FIELDS) if (!mb[f].trim()) mb[f] = auto[f];
  return mb;
}
