// End-to-end tests: generate packs with the bundled CLI, then run the generated
// Python checker against clean scaffolds and planted good/bad source files.
// Run with `npm test` (builds bin/vibe-governor.cjs first).
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CLI = path.join(ROOT, "bin", "vibe-governor.cjs");
const ALL_LANGS = ["C", "C++", "C#", "Java", "JavaScript", "TypeScript", "Python", "Go", "Rust", "Kotlin", "Swift", "PHP", "Verilog", "VHDL"];
const ALL_SWITCHES = [
  "cBanUnsafeFunctions", "cCheckMalloc", "cppNoRawPointers", "csNoDynamic", "csNoAsyncVoid", "javaExceptionHandling",
  "javaNoSystemOut", "jsNoVar", "jsStrictEquality", "tsNoAny", "pyTypeHints", "pyNoGlobalState",
  "goCheckErrors", "rustNoUnsafe", "rustLimitClone", "ktNoForceUnwrap", "ktNoGlobalScope",
  "swiftNoForceUnwrap", "phpStrictTypes", "phpNoEval", "phpPreparedStatements", "hdlAssignmentRules", "hdlLatchPrevention",
];

const PYTHON = ["python3", "python", "py"].find(
  (cmd) => spawnSync(cmd, ["-c", "import sys; assert sys.version_info >= (3, 8)"]).status === 0
);

function baseConfig(overrides = {}) {
  const base = {
    locale: "en",
    targetPlatforms: ["CLAUDE_CLI", "ANTIGRAVITY", "CURSOR", "WINDSURF", "CLINE", "GITHUB_COPILOT"],
    languages: ALL_LANGS,
    constraints: {
      maxLines: 800, docScoreThreshold: 8, ...Object.fromEntries(ALL_SWITCHES.map((k) => [k, true])),
    },
    memoryBank: {
      projectName: "test-proj", projectBrief: "", productContext: "", systemPatterns: "",
      techContext: "", activeContext: "", progress: "",
    },
    automation: {
      includeCheckGuidelines: true, includePreCommitHook: true, includeGitHubCI: true,
      includeAuditPrompt: true, includeGitignore: true,
    },
  };
  return {
    ...base,
    ...overrides,
    constraints: { ...base.constraints, ...(overrides.constraints ?? {}) },
    automation: { ...base.automation, ...(overrides.automation ?? {}) },
  };
}

const preset = (cfg) => Buffer.from(JSON.stringify(cfg), "utf8").toString("base64url");

function tmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "vibe-gov-"));
}

function runCli(args, cwd) {
  return spawnSync(process.execPath, [CLI, ...args], { cwd, encoding: "utf8" });
}

function scaffold(cfg) {
  const dir = tmpDir();
  const res = runCli(["init", `--preset=${preset(cfg)}`, `--dir=${dir}`], dir);
  assert.equal(res.status, 0, res.stderr || res.stdout);
  return dir;
}

function check(dir) {
  const res = spawnSync(PYTHON, ["scripts/check_guidelines.py"], {
    cwd: dir,
    encoding: "utf8",
    env: { ...process.env, PYTHONIOENCODING: "utf-8" },
  });
  return { code: res.status, out: res.stdout + res.stderr };
}

function write(dir, rel, content) {
  const p = path.join(dir, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content);
}

const GOOD = {
  "src/a.ts": `// comment : any\nconst s = "x: any";\nfunction f(company: string): number { return 1; }\n`,
  "src/a.go": `for _, v := range items {\n\tfmt.Println(v)\n}\n`,
  "src/a.py": `class A:\n    def __init__(self, x: int):\n        self.x = x\n    def m(self) -> str:\n        return "import *"\n`,
  "src/a.cpp": `auto p = std::make_unique<Foo>();\n// new Foo\nconst char* s = "new Foo";\n`,
  "src/a.rs": `// unsafe in comment\nlet s = "unsafe";\n`,
  "rtl/alu.v": [
    "module alu(input clk, input rst, input [1:0] s, input a, b, output reg q, output reg y);",
    "  always @(posedge clk or negedge rst) begin",
    "    if (!rst) begin q <= 1'b0; end",
    "    else if ((a == 1) && (b <= 1)) begin",
    "      q <= a;",
    "    end",
    "  end",
    "  always @(*) begin",
    "    case (s)",
    "      2'b00: y = a;",
    "      2'b01: begin y = b; end",
    "      default: y = 1'b0;",
    "    endcase",
    "  end",
    "  always @(*)",
    "    case (s)",
    "      2'b00: y = a;",
    "      default: y = b;",
    "    endcase",
    "  assign w = a & b;",
    "  always_ff @(posedge clk) q <= a;",
    "endmodule",
    "",
  ].join("\n"),
  "src/a.c": '#include <stdio.h>\n/* strcpy(a, b) */\nsnprintf(buf, sizeof buf, "%s", "gets(x)");\nstrncpy(a, b, n);\n',
  "src/A.java": 'try {\n  run();\n} catch (IOException e) {\n  log.warn("x", e);\n}\nString s = "System.out.println";\n',
  "src/a.js": 'const a = 1;\nlet b = a === 1 ? 2 : 3;\nif (a !== b) {}\nconst s = "var x == 1";\n',
  "src/a.cs": 'public async Task RunAsync() { }\nvar text = "dynamic";\n',
  "src/a.kt": 'val x = y ?: return\nviewModelScope.launch { }\nval s = "!!"\n',
  "src/a.swift": 'guard let v = value else { return }\nif a != b && !flag { }\nlet s = "try!"\n',
  "src/a.php": '<?php\ndeclare(strict_types=1);\n# eval($x)\n$y = "eval(";\n',
  "rtl/a.vhd": "library ieee;\nuse ieee.numeric_std.all; -- not ieee.std_logic_unsigned\n",
  "src/alloc.c": [
    "int *a = malloc(n * sizeof *a);",
    "if (!a) return -1;",
    "s->buf = (char *)calloc(1, len);",
    "if (s->buf == NULL) { return -1; }",
    "if ((p = malloc(8)) == NULL) abort();",
    "q = realloc(q, 16);",
    "assert(q);",
    "",
  ].join("\n"),
  "src/db.php": [
    "<?php",
    "declare(strict_types=1);",
    "$stmt = $pdo->prepare('SELECT * FROM users WHERE id = ?');",
    "$stmt->execute([$id]);",
    "$rows = $pdo->query('SELECT COUNT(*) FROM users');",
    "",
  ].join("\n"),
  "rtl/mux.vhd": [
    "entity mux is",
    "  port (a, b : in std_logic; sel : in std_logic; clk : in std_logic; y, q : out std_logic);",
    "end entity;",
    "architecture rtl of mux is",
    "  signal t : std_logic;",
    "begin",
    "  comb : process (a, b, sel)",
    "  begin",
    "    if sel = '1' then y <= a; else y <= b; end if;",
    "  end process;",
    "  seq : process (clk)",
    "  begin",
    "    if rising_edge(clk) then q <= t; end if;",
    "  end process;",
    "  p2 : process (all)",
    "  begin",
    "    t <= a and b;",
    "  end process;",
    "end architecture;",
    "",
  ].join("\n"),
};

const BAD = [
  ["src/b.ts", "let a: any = 1;\n", "[TYPESCRIPT VIOLATION] src/b.ts:1"],
  ["src/c.ts", "const b = x as any;\n", "[TYPESCRIPT VIOLATION] src/c.ts:1"],
  ["src/b.go", "_ = f()\n", "[GO VIOLATION] src/b.go:1"],
  ["src/c.go", "v, _ := g()\n", "[GO VIOLATION] src/c.go:1"],
  ["src/b.py", "from os import *\n", "[PYTHON VIOLATION] src/b.py:1"],
  ["src/c.py", "def f(a: int):\n    return a\n", "no return type hint"],
  ["src/d.py", "def f(a) -> int:\n    return a\n", "parameter 'a'"],
  ["src/e.py", "def f() -> None:\n    global X\n", "'global' variables"],
  ["src/b.cpp", "Foo* p = new Foo();\n", "[C++ VIOLATION] src/b.cpp:1"],
  ["src/c.cpp", "auto q = reinterpret_cast<int*>(p);\n", "reinterpret_cast"],
  ["src/b.rs", "unsafe { x() }\n", "[RUST VIOLATION] src/b.rs:1"],
  ["src/b.c", "strcpy(dst, src);\n", "[C VIOLATION] src/b.c:1"],
  ["src/c.c", "sprintf(buf, fmt, x);\n", "[C VIOLATION] src/c.c:1"],
  ["src/B.java", "try { a(); } catch (Exception e) { log(e); }\n", "generic catch"],
  ["src/C.java", "try {\n  a();\n} catch (IOException e) {\n}\n", "[JAVA VIOLATION] src/C.java:3 -> empty catch"],
  ["src/D.java", "System.out.println(x);\n", "[JAVA VIOLATION] src/D.java:1"],
  ["src/b.js", "var a = 1;\n", "[JAVASCRIPT VIOLATION] src/b.js:1 -> 'var'"],
  ["src/c.js", "if (a == b) {}\n", "[JAVASCRIPT VIOLATION] src/c.js:1 -> use '==='"],
  ["src/b.cs", "dynamic d = x;\n", "[C# VIOLATION] src/b.cs:1 -> 'dynamic'"],
  ["src/c.cs", "public async void Run() { }\n", "[C# VIOLATION] src/c.cs:1 -> 'async void'"],
  ["src/b.kt", "val n = name!!.length\n", "[KOTLIN VIOLATION] src/b.kt:1 -> the '!!'"],
  ["src/c.kt", "GlobalScope.launch { }\n", "[KOTLIN VIOLATION] src/c.kt:1 -> 'GlobalScope'"],
  ["src/b.swift", "let v = value!\n", "[SWIFT VIOLATION] src/b.swift:1"],
  ["src/c.swift", "let d = try! load()\n", "[SWIFT VIOLATION] src/c.swift:1"],
  ["src/b.php", "<?php\necho 1;\n", "[PHP VIOLATION] src/b.php:1 -> missing"],
  ["src/c.php", "<?php\ndeclare(strict_types=1);\neval($code);\n", "[PHP VIOLATION] src/c.php:3 -> 'eval()'"],
  ["rtl/b.v", "module m;\n  always @(posedge clk) begin\n    q = a;\n  end\nendmodule\n", "[VERILOG VIOLATION] rtl/b.v:3"],
  ["rtl/c.v", "module m;\n  always @(*) begin\n    y <= a;\n  end\nendmodule\n", "[VERILOG VIOLATION] rtl/c.v:3"],
  ["rtl/d.v", "module m;\n  always @(*) begin\n    case (s)\n      2'b00: y = a;\n    endcase\n  end\nendmodule\n", "rtl/d.v:3 -> combinational 'case' without 'default'"],
  ["rtl/b.vhd", "use ieee.std_logic_unsigned.all;\n", "[VHDL VIOLATION] rtl/b.vhd:1"],
  [
    "rtl/c.vhd",
    "entity c is\n  port (a, b, sel : in std_logic; y : out std_logic);\nend entity;\narchitecture rtl of c is\nbegin\n  process (a, b)\n  begin\n    if sel = '1' then y <= a; else y <= b; end if;\n  end process;\nend architecture;\n",
    "[VHDL VIOLATION] rtl/c.vhd:6 -> combinational process is missing signal(s) in its sensitivity list: sel",
  ],
  ["src/d.c", "char *p = malloc(64);\nstrncpy(p, s, 63);\nuse(p);\nfree(p);\n", "[C VIOLATION] src/d.c:1 -> allocation result of 'p'"],
  ["src/d.php", "<?php\ndeclare(strict_types=1);\n$r = $db->query(\"SELECT * FROM t WHERE id = $id\");\n", "[PHP VIOLATION] src/d.php:3 -> variable interpolated"],
  ["src/e.php", "<?php\ndeclare(strict_types=1);\n$r = mysqli_query($c, 'SELECT * FROM t WHERE n = ' . $name);\n", "[PHP VIOLATION] src/e.php:3 -> variable interpolated"],
];

const opts = { skip: PYTHON ? false : "Python 3 not available" };

test("CLI prints help and rejects unknown commands", () => {
  assert.match(runCli(["--help"], ROOT).stdout, /vibe-governor init/);
  assert.equal(runCli(["deploy"], ROOT).status, 1);
});

test("invalid presets are rejected with a validation message", () => {
  const dir = tmpDir();
  const bad = runCli(["init", "--preset=%%%", `--dir=${dir}`], dir);
  assert.equal(bad.status, 1);
  const cfg = baseConfig({ languages: [] });
  const res = runCli(["init", `--preset=${preset(cfg)}`, `--dir=${dir}`], dir);
  assert.equal(res.status, 1);
  assert.match(res.stderr, /languages/);
  const dep = baseConfig({ automation: { includeCheckGuidelines: false } });
  assert.match(runCli(["init", `--preset=${preset(dep)}`, `--dir=${dir}`], dir).stderr, /checker_required/);
});

test("presets created before newer switches existed are still accepted", () => {
  const old = baseConfig({ languages: ["Rust"] });
  old.constraints = {
    maxLines: 800, docScoreThreshold: 8, rustNoUnsafe: true, rustLimitClone: true, tsNoAny: true,
    pyTypeHints: true, pyNoGlobalState: true, cppNoRawPointers: true, goCheckErrors: true,
    hdlAssignmentRules: true, hdlLatchPrevention: true,
  };
  const dir = tmpDir();
  const res = runCli(["init", `--preset=${preset(old)}`, `--dir=${dir}`], dir);
  assert.equal(res.status, 0, res.stderr);
});

test("generated pack contains the expected files", () => {
  const dir = scaffold(baseConfig());
  for (const f of [
    "AI_GUIDELINES.md", "ANTIGRAVITY.md", "CLAUDE.md", ".cursorrules", ".windsurfrules", ".clinerules",
    ".github/copilot-instructions.md", ".memory_bank/projectbrief.md", ".memory_bank/productContext.md",
    ".memory_bank/systemPatterns.md", ".memory_bank/techContext.md", ".memory_bank/activeContext.md",
    ".memory_bank/progress.md", "scripts/check_guidelines.py", "scripts/pre-commit-hook.sh",
    ".github/workflows/ai-guidelines-ci.yml", "AUDIT_PROMPT.md", ".gitignore", ".gitattributes",
  ]) {
    assert.ok(fs.existsSync(path.join(dir, f)), `missing ${f}`);
  }
  assert.ok(!fs.readFileSync(path.join(dir, "scripts/pre-commit-hook.sh"), "utf8").includes("\r"));
});

test("AI_GUIDELINES only contains selected languages and enabled rules", () => {
  const dir = scaffold(baseConfig({ languages: ["Verilog"], constraints: { hdlLatchPrevention: false, maxLines: 500 } }));
  const g = fs.readFileSync(path.join(dir, "AI_GUIDELINES.md"), "utf8");
  assert.match(g, /Verilog/);
  assert.doesNotMatch(g, /### .*Rust|### .*Python|### .*VHDL/);
  assert.doesNotMatch(g, /Latch Prevention/);
  assert.match(g, /500 lines/);
  assert.doesNotMatch(g, /\{\{[A-Z_]+\}\}/);
});

test("existing files are kept unless --force is given", () => {
  const dir = scaffold(baseConfig());
  write(dir, "CLAUDE.md", "mine");
  runCli(["init", `--preset=${preset(baseConfig())}`, `--dir=${dir}`], dir);
  assert.equal(fs.readFileSync(path.join(dir, "CLAUDE.md"), "utf8"), "mine");
  runCli(["init", `--preset=${preset(baseConfig())}`, `--dir=${dir}`, "--force"], dir);
  assert.notEqual(fs.readFileSync(path.join(dir, "CLAUDE.md"), "utf8"), "mine");
});

test("clean scaffolds pass the checker in every locale and at the strictest limit", opts, () => {
  for (const locale of ["tr", "en"]) {
    const dir = scaffold(baseConfig({ locale, constraints: { maxLines: 200 } }));
    const r = check(dir);
    assert.equal(r.code, 0, r.out);
  }
});

test("legitimate code produces no false positives", opts, () => {
  const dir = scaffold(baseConfig());
  for (const [rel, content] of Object.entries(GOOD)) write(dir, rel, content);
  const r = check(dir);
  assert.equal(r.code, 0, r.out);
});

test("every planted violation is reported", opts, () => {
  const dir = scaffold(baseConfig());
  for (const [rel, content] of BAD) write(dir, rel, content);
  const r = check(dir);
  assert.equal(r.code, 1);
  for (const [, , expected] of BAD) assert.ok(r.out.includes(expected), `expected "${expected}" in:\n${r.out}`);
});

test("rules follow the step-2 switches and step-1 language selection", opts, () => {
  const off = scaffold(baseConfig({ constraints: { tsNoAny: false } }));
  write(off, "src/b.ts", "let a: any = 1;\n");
  assert.equal(check(off).code, 0);

  const noRust = scaffold(baseConfig({ languages: ["TypeScript"] }));
  write(noRust, "src/b.rs", "unsafe { x() }\n");
  assert.equal(check(noRust).code, 0);
});

test("line limit and missing memory bank files are enforced", opts, () => {
  const dir = scaffold(baseConfig({ constraints: { maxLines: 200 } }));
  write(dir, "src/big.ts", "const x = 1;\n".repeat(201));
  write(dir, "package-lock.json", "{}\n".repeat(5000)); // non-code files are ignored
  fs.rmSync(path.join(dir, ".memory_bank", "progress.md"));
  const r = check(dir);
  assert.equal(r.code, 1);
  assert.match(r.out, /\[LINE LIMIT EXCEEDED\] src\/big\.ts: 201/);
  assert.match(r.out, /\.memory_bank\/progress\.md/);
  assert.doesNotMatch(r.out, /package-lock/);
});
