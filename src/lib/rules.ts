import type { CodingLanguage, ProjectConstraints, WizardFormData } from "../types/wizard";

/**
 * Machine-checkable rule identifiers understood by the generated
 * `scripts/check_guidelines.py`. A rule is active only when its language is
 * selected in step 1 AND its safety switch is enabled in step 2.
 */
export type RuleId =
  | "c_unsafe_funcs"
  | "c_malloc_check"
  | "cpp_raw_ptr"
  | "cs_no_dynamic"
  | "cs_no_async_void"
  | "java_exceptions"
  | "java_no_sysout"
  | "js_no_var"
  | "js_strict_eq"
  | "ts_any"
  | "py_type_hints"
  | "py_no_global"
  | "go_errors"
  | "rust_unsafe"
  | "rust_clone"
  | "kt_no_bang"
  | "kt_no_globalscope"
  | "swift_no_force"
  | "php_strict_types"
  | "php_no_eval"
  | "php_prepared"
  | "verilog_assign"
  | "verilog_latch"
  | "vhdl_numeric_std"
  | "vhdl_sensitivity";

interface RuleDef {
  id: RuleId;
  language: CodingLanguage;
  toggle: keyof ProjectConstraints;
  summary: string;
}

const RULE_DEFS: RuleDef[] = [
  { id: "c_unsafe_funcs", language: "C", toggle: "cBanUnsafeFunctions", summary: "C no gets/strcpy/strcat/sprintf" },
  { id: "c_malloc_check", language: "C", toggle: "cCheckMalloc", summary: "C malloc/calloc/realloc NULL checks" },
  { id: "cpp_raw_ptr", language: "C++", toggle: "cppNoRawPointers", summary: "C++ no raw new/delete & reinterpret_cast" },
  { id: "cs_no_dynamic", language: "C#", toggle: "csNoDynamic", summary: "C# no dynamic" },
  { id: "cs_no_async_void", language: "C#", toggle: "csNoAsyncVoid", summary: "C# no async void" },
  { id: "java_exceptions", language: "Java", toggle: "javaExceptionHandling", summary: "Java no empty/generic catch" },
  { id: "java_no_sysout", language: "Java", toggle: "javaNoSystemOut", summary: "Java logger instead of System.out/printStackTrace" },
  { id: "js_no_var", language: "JavaScript", toggle: "jsNoVar", summary: "JavaScript no var" },
  { id: "js_strict_eq", language: "JavaScript", toggle: "jsStrictEquality", summary: "JavaScript strict equality (===)" },
  { id: "ts_any", language: "TypeScript", toggle: "tsNoAny", summary: "TypeScript no-any" },
  { id: "py_type_hints", language: "Python", toggle: "pyTypeHints", summary: "Python type hints" },
  { id: "py_no_global", language: "Python", toggle: "pyNoGlobalState", summary: "Python no global state / wildcard imports" },
  { id: "go_errors", language: "Go", toggle: "goCheckErrors", summary: "Go explicit error checks" },
  { id: "rust_unsafe", language: "Rust", toggle: "rustNoUnsafe", summary: "Rust no-unsafe" },
  { id: "rust_clone", language: "Rust", toggle: "rustLimitClone", summary: "Rust clone restrictions" },
  { id: "kt_no_bang", language: "Kotlin", toggle: "ktNoForceUnwrap", summary: "Kotlin no !!" },
  { id: "kt_no_globalscope", language: "Kotlin", toggle: "ktNoGlobalScope", summary: "Kotlin no GlobalScope" },
  { id: "swift_no_force", language: "Swift", toggle: "swiftNoForceUnwrap", summary: "Swift no force unwrap / try! / as!" },
  { id: "php_strict_types", language: "PHP", toggle: "phpStrictTypes", summary: "PHP declare(strict_types=1)" },
  { id: "php_no_eval", language: "PHP", toggle: "phpNoEval", summary: "PHP no eval()" },
  { id: "php_prepared", language: "PHP", toggle: "phpPreparedStatements", summary: "PHP prepared statements (no interpolated SQL)" },
  { id: "verilog_assign", language: "Verilog", toggle: "hdlAssignmentRules", summary: "Verilog non-blocking (<=) sequential / blocking (=) combinational" },
  { id: "verilog_latch", language: "Verilog", toggle: "hdlLatchPrevention", summary: "Verilog latch prevention (case default)" },
  { id: "vhdl_numeric_std", language: "VHDL", toggle: "hdlAssignmentRules", summary: "VHDL ieee.numeric_std only" },
  { id: "vhdl_sensitivity", language: "VHDL", toggle: "hdlLatchPrevention", summary: "VHDL complete sensitivity lists" },
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
