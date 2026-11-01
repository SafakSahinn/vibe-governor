import type { CodingLanguage, ProjectConstraints, WizardFormData } from "../types/wizard";

/**
 * Machine-checkable rule identifiers understood by the generated
 * `scripts/check_guidelines.py`. A rule is active only when its language is
 * selected in step 1 AND its safety switch is enabled in step 2.
 */
export type RuleId =
  | "rust_unsafe"
  | "rust_clone"
  | "ts_any"
  | "py_type_hints"
  | "py_no_global"
  | "cpp_raw_ptr"
  | "go_errors"
  | "verilog_assign"
  | "verilog_latch"
  | "vhdl_numeric_std";

interface RuleDef {
  id: RuleId;
  language: CodingLanguage;
  toggle: keyof ProjectConstraints;
  summary: string;
}

const RULE_DEFS: RuleDef[] = [
  { id: "rust_unsafe", language: "Rust", toggle: "rustNoUnsafe", summary: "Rust no-unsafe" },
  { id: "rust_clone", language: "Rust", toggle: "rustLimitClone", summary: "Rust clone restrictions" },
  { id: "ts_any", language: "TypeScript", toggle: "tsNoAny", summary: "TypeScript no-any" },
  { id: "py_type_hints", language: "Python", toggle: "pyTypeHints", summary: "Python type hints" },
  { id: "py_no_global", language: "Python", toggle: "pyNoGlobalState", summary: "Python no global state / wildcard imports" },
  { id: "cpp_raw_ptr", language: "C++", toggle: "cppNoRawPointers", summary: "C++ no raw new/delete & reinterpret_cast" },
  { id: "go_errors", language: "Go", toggle: "goCheckErrors", summary: "Go explicit error checks" },
  { id: "verilog_assign", language: "Verilog", toggle: "hdlAssignmentRules", summary: "Verilog non-blocking (<=) sequential / blocking (=) combinational" },
  { id: "verilog_latch", language: "Verilog", toggle: "hdlLatchPrevention", summary: "Verilog latch prevention (case default)" },
  { id: "vhdl_numeric_std", language: "VHDL", toggle: "hdlAssignmentRules", summary: "VHDL ieee.numeric_std only" },
];

/** Returns true when a constraint switch is both enabled and relevant to a selected language. */
export function isToggleActive(
  data: Pick<WizardFormData, "constraints" | "languages">,
  toggle: keyof ProjectConstraints,
  languages: CodingLanguage[]
): boolean {
  return Boolean(data.constraints[toggle]) && languages.some((l) => data.languages.includes(l));
}

/** Rule ids the generated checker script must enforce. */
export function getEnabledRules(data: Pick<WizardFormData, "constraints" | "languages">): RuleId[] {
  return RULE_DEFS.filter((r) => isToggleActive(data, r.toggle, [r.language])).map((r) => r.id);
}

/** Human-readable, comma separated list of active safety rules (used in IDE rule files). */
export function getSafetySummary(data: Pick<WizardFormData, "constraints" | "languages">): string {
  const enabled = new Set(getEnabledRules(data));
  const list = RULE_DEFS.filter((r) => enabled.has(r.id)).map((r) => r.summary);
  return list.length > 0 ? list.join(", ") : "strict typing & modularity";
}
