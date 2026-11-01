import { z } from "zod";
import type { WizardFormData } from "../types/wizard";

/**
 * Single source of truth for wizard validation. Used by React Hook Form in the
 * web UI and by the CLI when decoding a `--preset` payload.
 * Error messages are i18n keys resolved by `errorText()` in the UI.
 */

export const TARGET_PLATFORMS = [
  "CLAUDE_CLI",
  "ANTIGRAVITY",
  "CURSOR",
  "WINDSURF",
  "CLINE",
  "GITHUB_COPILOT",
] as const;

export const SOFTWARE_LANGUAGES = [
  "C", "C++", "C#", "Java", "JavaScript", "TypeScript", "Python", "Go", "Rust", "Kotlin", "Swift", "PHP",
] as const;
export const HDL_LANGUAGES = ["Verilog", "VHDL"] as const;
export const CODING_LANGUAGES = [...SOFTWARE_LANGUAGES, ...HDL_LANGUAGES] as const;

/** Every boolean safety switch of step 2 (single list used by schema, defaults and CLI). */
export const SAFETY_SWITCH_KEYS = [
  "cBanUnsafeFunctions", "cCheckMalloc", "cppNoRawPointers", "csNoDynamic", "csNoAsyncVoid",
  "javaExceptionHandling", "javaNoSystemOut", "jsNoVar", "jsStrictEquality", "tsNoAny",
  "pyTypeHints", "pyNoGlobalState", "goCheckErrors", "rustNoUnsafe", "rustLimitClone",
  "ktNoForceUnwrap", "ktNoGlobalScope", "swiftNoForceUnwrap", "phpStrictTypes", "phpNoEval", "phpPreparedStatements",
  "hdlAssignmentRules", "hdlLatchPrevention",
] as const;
export type SafetySwitchKey = (typeof SAFETY_SWITCH_KEYS)[number];

const switchShape = Object.fromEntries(SAFETY_SWITCH_KEYS.map((k) => [k, z.boolean()])) as Record<
  SafetySwitchKey,
  z.ZodBoolean
>;

export const MAX_LINES_MIN = 200;
export const MAX_LINES_MAX = 1500;
export const DOC_SCORE_MIN = 5;
export const DOC_SCORE_MAX = 10;
const MEMORY_TEXT_MAX = 5000;

const memoryText = z.string().max(MEMORY_TEXT_MAX, "text_too_long");

export const wizardSchema = z
  .object({
    locale: z.enum(["tr", "en"]),
    targetPlatforms: z.array(z.enum(TARGET_PLATFORMS)).min(1, "platforms_min"),
    // Optional: with no language only the language-independent rules apply
    // (line limit, Memory Bank, documentation, tests).
    languages: z.array(z.enum(CODING_LANGUAGES)),
    constraints: z.object({
      maxLines: z
        .number({ error: "max_lines_range" })
        .int("max_lines_range")
        .min(MAX_LINES_MIN, "max_lines_range")
        .max(MAX_LINES_MAX, "max_lines_range"),
      docScoreThreshold: z
        .number({ error: "doc_score_range" })
        .int("doc_score_range")
        .min(DOC_SCORE_MIN, "doc_score_range")
        .max(DOC_SCORE_MAX, "doc_score_range"),
      ...switchShape,
    }),
    memoryBank: z.object({
      projectName: z
        .string()
        .trim()
        .min(1, "project_name_required")
        .max(80, "project_name_too_long"),
      projectBrief: memoryText,
      productContext: memoryText,
      systemPatterns: memoryText,
      techContext: memoryText,
      activeContext: memoryText,
      progress: memoryText,
    }),
    automation: z.object({
      includeCheckGuidelines: z.boolean(),
      includePreCommitHook: z.boolean(),
      includeGitHubCI: z.boolean(),
      includeAuditPrompt: z.boolean(),
      includeGitignore: z.boolean(),
    }),
  })
  .superRefine((data, ctx) => {
    const a = data.automation;
    if ((a.includePreCommitHook || a.includeGitHubCI) && !a.includeCheckGuidelines) {
      ctx.addIssue({
        code: "custom",
        path: ["automation", "includeCheckGuidelines"],
        message: "checker_required",
      });
    }
  });

// Compile-time guard: the schema must stay in sync with the hand-written types.
type SchemaOutput = z.infer<typeof wizardSchema>;
const _schemaMatchesTypes: (v: SchemaOutput) => WizardFormData = (v) => v;
void _schemaMatchesTypes;

/** Default form state shared by the web wizard and the CLI. */
export const DEFAULT_FORM_DATA: WizardFormData = {
  locale: "tr",
  targetPlatforms: ["ANTIGRAVITY", "CLAUDE_CLI", "CURSOR", "WINDSURF", "CLINE", "GITHUB_COPILOT"],
  languages: ["TypeScript", "Python", "Rust"],
  constraints: {
    maxLines: 800,
    docScoreThreshold: 8,
    ...(Object.fromEntries(SAFETY_SWITCH_KEYS.map((k) => [k, true])) as Record<SafetySwitchKey, boolean>),
  },
  memoryBank: {
    projectName: "my-vibe-project",
    projectBrief: "",
    productContext: "",
    systemPatterns: "",
    techContext: "",
    activeContext: "",
    progress: "",
  },
  automation: {
    includeCheckGuidelines: true,
    includePreCommitHook: true,
    includeGitHubCI: true,
    includeAuditPrompt: true,
    includeGitignore: true,
  },
};
