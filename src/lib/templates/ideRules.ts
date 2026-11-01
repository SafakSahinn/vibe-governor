import type { GeneratedFile, TargetPlatform, WizardFormData } from "../../types/wizard";
import type { TemplateVars } from "../templateEngine";

/**
 * Agent / IDE loader files (spec §3.5). One file per selected target platform.
 */

interface RuleFileDef {
  platform: TargetPlatform;
  path: string;
  language: string;
  build: (v: TemplateVars, safety: string) => string;
}

const RULE_FILES: RuleFileDef[] = [
  {
    platform: "ANTIGRAVITY",
    path: "ANTIGRAVITY.md",
    language: "markdown",
    build: (v, safety) => `# AntiGravity AI Agent Protocol

## Mandatory Context Loading
- ALWAYS read and strictly apply \`./AI_GUIDELINES.md\` before analyzing code or writing changes.
- Inspect \`./.memory_bank/activeContext.md\` and \`./.memory_bank/systemPatterns.md\` prior to executing any task.

## Execution Restrictions
- **${v.MAX_LINES}-Line Rule:** Never exceed ${v.MAX_LINES} lines in any single code file. Split into clean sub-modules when approaching ${v.MAX_LINES_THRESHOLD} lines.
- **Modular Architecture:** Enforce strict single responsibility. Avoid monolithic or "God Object" designs.
- **Documentation Self-Scoring:** Add thorough docstrings/JSDoc for public structures and self-score quality (min ${v.DOC_SCORE}/10 required).
- **Combination Testing:** Generate comprehensive edge-case combination tests for every new feature.
- **Language Safety:** Enforce language-specific safety rules (${safety}).

## Session Synchronization
- Upon task completion, update \`./.memory_bank/activeContext.md\` and \`./.memory_bank/progress.md\` with the latest status.
`,
  },
  {
    platform: "CLAUDE_CLI",
    path: "CLAUDE.md",
    language: "markdown",
    build: (v, safety) => `# Claude CLI Project Guidelines

- Read and follow \`./AI_GUIDELINES.md\` strictly.
- Inspect \`./.memory_bank/activeContext.md\` before modifying any files.
- Maintain the ${v.MAX_LINES}-line per file limit and full modularity.
- Require self-evaluated documentation scores (>= ${v.DOC_SCORE}/10).
- Enforce language safety rules: ${safety}.
- Update \`.memory_bank/activeContext.md\` and \`progress.md\` after completing work.
`,
  },
  {
    platform: "CURSOR",
    path: ".cursorrules",
    language: "plaintext",
    build: (v, safety) => `Always read and strictly follow the architecture and coding guidelines in ./AI_GUIDELINES.md before generating any code.
Inspect .memory_bank/activeContext.md and .memory_bank/systemPatterns.md before task execution.
Enforce ${v.MAX_LINES}-line limit per file, mandatory modularity, documentation scoring (>= ${v.DOC_SCORE}/10), and combination tests.
Language safety rules: ${safety}.
Sync .memory_bank/activeContext.md and progress.md upon completion.
`,
  },
  {
    platform: "WINDSURF",
    path: ".windsurfrules",
    language: "plaintext",
    build: (v, safety) => `Rule 1: Adhere strictly to the project rules in ./AI_GUIDELINES.md.
Rule 2: Read .memory_bank/activeContext.md prior to code modification.
Rule 3: Enforce maximum ${v.MAX_LINES} lines per file and single responsibility principle.
Rule 4: Require self-evaluated documentation scores (>= ${v.DOC_SCORE}/10) for public methods.
Rule 5: Enforce language safety rules: ${safety}.
`,
  },
  {
    platform: "CLINE",
    path: ".clinerules",
    language: "plaintext",
    build: (v, safety) => `Context Loading: Always start by analyzing ./AI_GUIDELINES.md and .memory_bank/activeContext.md.
Code Quality: Maintain strict modularity and <${v.MAX_LINES} lines/file limit.
Language Safety: ${safety}.
Verification: Include edge-case combination tests for all new functions.
Session Sync: Update .memory_bank/activeContext.md and progress.md upon completion.
`,
  },
  {
    platform: "GITHUB_COPILOT",
    path: ".github/copilot-instructions.md",
    language: "markdown",
    build: (v, safety) => `# GitHub Copilot Custom Instructions
- Follow all rules defined in \`AI_GUIDELINES.md\`.
- Never produce code files exceeding ${v.MAX_LINES} lines.
- Enforce language safety rules: ${safety}.
- Always generate unit/combination tests for code additions.
`,
  },
];

/** Builds the loader file of every selected platform, in a stable order. */
export function buildIdeRuleFiles(data: WizardFormData, vars: TemplateVars, safety: string): GeneratedFile[] {
  return RULE_FILES.filter((d) => data.targetPlatforms.includes(d.platform)).map((d) => ({
    path: d.path,
    name: d.path.split("/").pop() ?? d.path,
    content: d.build(vars, safety),
    language: d.language,
    category: "rules" as const,
  }));
}
