export type Language = "tr" | "en";

export type TargetPlatform =
  | "CLAUDE_CLI"
  | "ANTIGRAVITY"
  | "CURSOR"
  | "WINDSURF"
  | "CLINE"
  | "GITHUB_COPILOT";

export type CodingLanguage =
  | "Rust"
  | "TypeScript"
  | "Python"
  | "C++"
  | "Go"
  | "Verilog"
  | "VHDL";

export interface ProjectConstraints {
  maxLines: number;
  docScoreThreshold: number;
  rustNoUnsafe: boolean;
  rustLimitClone: boolean;
  tsNoAny: boolean;
  pyTypeHints: boolean;
  pyNoGlobalState: boolean;
  cppNoRawPointers: boolean;
  goCheckErrors: boolean;
  hdlAssignmentRules: boolean;
  hdlLatchPrevention: boolean;
}

export interface MemoryBankData {
  projectName: string;
  projectBrief: string;
  productContext: string;
  systemPatterns: string;
  techContext: string;
  activeContext: string;
  progress: string;
}

export interface AutomationOptions {
  includeCheckGuidelines: boolean;
  includePreCommitHook: boolean;
  includeGitHubCI: boolean;
  includeAuditPrompt: boolean;
  includeGitignore: boolean;
}

export interface WizardFormData {
  locale: Language;
  targetPlatforms: TargetPlatform[];
  languages: CodingLanguage[];
  constraints: ProjectConstraints;
  memoryBank: MemoryBankData;
  automation: AutomationOptions;
}

export interface GeneratedFile {
  path: string;
  name: string;
  content: string;
  language: string;
  category: "guidelines" | "rules" | "memory_bank" | "scripts" | "ci" | "config";
}
