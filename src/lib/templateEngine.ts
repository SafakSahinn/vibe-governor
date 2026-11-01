import type { GeneratedFile, WizardFormData } from "../types/wizard";
import { getEnabledRules, getSafetySummary } from "./rules";
import { encodePreset } from "./preset";
import { buildGuidelinesTemplate } from "./templates/guidelines";
import { TEMPLATE_CHECK_GUIDELINES_PY } from "./templates/checker";
import { buildAuditPrompt, buildGitignore, buildPreCommitHook, TEMPLATE_GITHUB_CI } from "./templates/misc";
import { buildIdeRuleFiles } from "./templates/ideRules";
import { buildMemoryBankFiles } from "./templates/memoryBank";
import { contentHash } from "./hash";
import { CONFIG_FORMAT_VERSION, VERSION } from "./version";

/** Values substituted into `{{PLACEHOLDER}}` tokens. */
export interface TemplateVars {
  MAX_LINES: string;
  MAX_LINES_THRESHOLD: string;
  DOC_SCORE: string;
  LOCALE: string;
  ENABLED_RULES: string;
  ENABLED_RULES_DOC: string;
}

/** Derives template variables from the wizard state. */
export function buildTemplateVars(data: WizardFormData): TemplateVars {
  const maxLines = data.constraints.maxLines || 800;
  const rules = getEnabledRules(data);
  return {
    MAX_LINES: String(maxLines),
    MAX_LINES_THRESHOLD: String(Math.max(100, maxLines - 100)),
    DOC_SCORE: String(data.constraints.docScoreThreshold || 8),
    LOCALE: data.locale,
    ENABLED_RULES: JSON.stringify(rules),
    ENABLED_RULES_DOC: rules.length > 0 ? rules.join(", ") : "(none)",
  };
}

/** Replaces every `{{KEY}}` token; unknown tokens are left untouched. */
export function applyTemplate(template: string, vars: TemplateVars): string {
  return template.replace(/\{\{([A-Z_]+)\}\}/g, (match, key: string) =>
    key in vars ? vars[key as keyof TemplateVars] : match
  );
}

/** Generates every file of the governance pack for the given wizard state. */
export function generateProjectFiles(data: WizardFormData): GeneratedFile[] {
  const vars = buildTemplateVars(data);
  const fill = (t: string): string => applyTemplate(t, vars);
  const safetySummary = getSafetySummary(data);
  const files: GeneratedFile[] = [];

  files.push({
    path: "AI_GUIDELINES.md",
    name: "AI_GUIDELINES.md",
    content: fill(buildGuidelinesTemplate(data)),
    language: "markdown",
    category: "guidelines",
  });

  files.push(...buildIdeRuleFiles(data, vars, safetySummary));
  files.push(...buildMemoryBankFiles(data, vars, safetySummary));

  const a = data.automation;
  if (a.includeCheckGuidelines) {
    files.push({
      path: "scripts/check_guidelines.py",
      name: "check_guidelines.py",
      content: fill(TEMPLATE_CHECK_GUIDELINES_PY),
      language: "python",
      category: "scripts",
    });
  }
  if (a.includePreCommitHook) {
    files.push({
      path: "scripts/pre-commit-hook.sh",
      name: "pre-commit-hook.sh",
      content: buildPreCommitHook(data.locale),
      language: "shell",
      category: "scripts",
    });
  }
  if (a.includeCheckGuidelines || a.includePreCommitHook) {
    // Keeps scripts LF-only so Windows checkouts (core.autocrlf) do not break bash/CI.
    files.push({
      path: ".gitattributes",
      name: ".gitattributes",
      content: "*.sh text eol=lf\n*.py text eol=lf\n*.yml text eol=lf\n",
      language: "plaintext",
      category: "config",
    });
  }
  if (a.includeGitHubCI) {
    files.push({
      path: ".github/workflows/ai-guidelines-ci.yml",
      name: "ai-guidelines-ci.yml",
      content: TEMPLATE_GITHUB_CI,
      language: "yaml",
      category: "ci",
    });
  }
  if (a.includeAuditPrompt) {
    files.push({
      path: "AUDIT_PROMPT.md",
      name: "AUDIT_PROMPT.md",
      content: fill(buildAuditPrompt(data.locale)),
      language: "markdown",
      category: "guidelines",
    });
  }
  if (a.includeGitignore) {
    files.push({
      path: ".gitignore",
      name: ".gitignore",
      content: buildGitignore(data.locale),
      language: "plaintext",
      category: "config",
    });
  }
  files.push(buildConfigFile(data, files));
  return files;
}

/** Project config written next to the generated files; read by `vibe-governor update` and the wizard. */
export const CONFIG_FILE = "vibe-governor.json";

/**
 * Files owned by the user after creation: never overwritten by `update`
 * (only created when missing). Everything else is "managed".
 */
export function isUserOwnedPath(path: string): boolean {
  return path.startsWith(".memory_bank/") || path === ".gitignore" || path === CONFIG_FILE;
}

/** Shape of vibe-governor.json. */
export interface ProjectConfigFile {
  $comment: string;
  formatVersion: number;
  generator: string;
  config: WizardFormData;
  /** path -> content hash of each managed file as last written by the generator. */
  managedFiles: Record<string, string>;
}

/** Builds vibe-governor.json from the wizard state and the files generated with it. */
export function buildConfigFile(
  data: WizardFormData,
  files: GeneratedFile[],
  hashOverrides: Record<string, string> = {}
): GeneratedFile {
  const managedFiles: Record<string, string> = {};
  for (const f of files) if (!isUserOwnedPath(f.path)) managedFiles[f.path] = contentHash(f.content);
  Object.assign(managedFiles, hashOverrides);
  const doc: ProjectConfigFile = {
    $comment: "Vibe Governor project config. Change settings with `npx vibe-governor update` or load this file in the web wizard.",
    formatVersion: CONFIG_FORMAT_VERSION,
    generator: `vibe-governor@${VERSION}`,
    config: data,
    managedFiles,
  };
  return {
    path: CONFIG_FILE,
    name: CONFIG_FILE,
    content: JSON.stringify(doc, null, 2) + "\n",
    language: "json",
    category: "config",
  };
}

/** npm package spec used by the one-line command (published on npm). */
export const CLI_PACKAGE = "vibe-governor";

/** One-line terminal command reproducing exactly the current wizard state. */
export function generateCliCommand(data: WizardFormData): string {
  return `npx -y ${CLI_PACKAGE} init --preset=${encodePreset(data)}`;
}
