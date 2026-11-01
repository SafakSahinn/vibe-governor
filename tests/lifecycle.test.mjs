// Lifecycle tests: vibe-governor.json + update, language detection, tool file
// formats, vibe-ignore comments, baseline, --staged mode and the Memory Bank
// freshness warning. Run with `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CLI = path.join(ROOT, "bin", "vibe-governor.cjs");
const PYTHON = ["python3", "python", "py"].find(
  (cmd) => spawnSync(cmd, ["-c", "import sys; assert sys.version_info >= (3, 8)"]).status === 0
);
const HAS_GIT = spawnSync("git", ["--version"]).status === 0;
const py = { skip: PYTHON ? false : "Python 3 not available" };
const pyGit = { skip: PYTHON && HAS_GIT ? false : "Python 3 and git required" };

const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), "vibe-life-"));
const cli = (args, cwd) => spawnSync(process.execPath, [CLI, ...args], { cwd, encoding: "utf8" });
const read = (dir, rel) => fs.readFileSync(path.join(dir, rel), "utf8");
const exists = (dir, rel) => fs.existsSync(path.join(dir, rel));
function write(dir, rel, content) {
  const p = path.join(dir, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content);
}
function check(dir, ...args) {
  const r = spawnSync(PYTHON, ["scripts/check_guidelines.py", ...args], {
    cwd: dir,
    encoding: "utf8",
    env: { ...process.env, PYTHONIOENCODING: "utf-8" },
  });
  return { code: r.status, out: r.stdout + r.stderr };
}
const git = (dir, ...args) =>
  spawnSync("git", ["-c", "user.email=t@example.com", "-c", "user.name=t", ...args], { cwd: dir, encoding: "utf8" });

function initProject(extra = []) {
  const dir = tmp();
  const r = cli(["init", `--dir=${dir}`, "--lang=en", "--name=life", ...extra], dir);
  assert.equal(r.status, 0, r.stderr || r.stdout);
  return dir;
}

test("init writes vibe-governor.json with config and managed-file hashes", () => {
  const dir = initProject(["--languages=TypeScript"]);
  const cfg = JSON.parse(read(dir, "vibe-governor.json"));
  assert.equal(cfg.formatVersion, 1);
  assert.match(cfg.generator, /^vibe-governor@\d+\.\d+\.\d+$/);
  assert.deepEqual(cfg.config.languages, ["TypeScript"]);
  assert.ok(cfg.managedFiles["AI_GUIDELINES.md"]);
  assert.ok(!Object.keys(cfg.managedFiles).some((p) => p.startsWith(".memory_bank/") || p === ".gitignore"));
});

test("tool files use the current documented formats", () => {
  const dir = initProject([
    "--languages=TypeScript",
    "--platforms=AGENTS_MD,CLAUDE_CLI,GEMINI_CLI,ANTIGRAVITY,CURSOR,WINDSURF,CLINE,GITHUB_COPILOT",
  ]);
  assert.match(read(dir, ".cursor/rules/vibe-governor.mdc"), /^---\ndescription: .+\nalwaysApply: true\n---/);
  assert.match(read(dir, ".windsurf/rules/vibe-governor.md"), /^---\ntrigger: always_on\n---/);
  for (const f of ["AGENTS.md", "GEMINI.md", ".agents/rules/vibe-governor.md", ".clinerules/vibe-governor.md"]) {
    assert.match(read(dir, f), /AI_GUIDELINES\.md/);
  }
  assert.ok(!exists(dir, ".cursorrules") && !exists(dir, "ANTIGRAVITY.md"));
});

test("a legacy .clinerules file does not break init", () => {
  const dir = tmp();
  write(dir, ".clinerules", "old rules");
  const r = cli(["init", `--dir=${dir}`, "--platforms=CLINE", "--languages=Go"], dir);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /\.clinerules/);
  assert.equal(read(dir, ".clinerules"), "old rules");
});

test("languages are detected when --languages is omitted", () => {
  const dir = tmp();
  write(dir, "src/main.c", "int main(void) { return 0; }\n");
  write(dir, "src/util.h", "#pragma once\n");
  write(dir, "rtl/top.v", "module top; endmodule\n");
  write(dir, "node_modules/x/index.js", "var a;\n"); // ignored directory
  assert.equal(cli(["detect", `--dir=${dir}`], dir).stdout.trim(), "C,Verilog");
  const r = cli(["init", `--dir=${dir}`, "--lang=en"], dir);
  assert.match(r.stdout, /Detected languages: C, Verilog/);
  assert.deepEqual(JSON.parse(read(dir, "vibe-governor.json")).config.languages, ["C", "Verilog"]);
});

test("update applies new settings, keeps hand-edited files and never touches the Memory Bank", () => {
  const dir = initProject(["--languages=TypeScript"]);
  write(dir, "CLAUDE.md", read(dir, "CLAUDE.md") + "\nMy own team rule.\n");
  write(dir, ".memory_bank/activeContext.md", "# my notes\n");
  const r = cli(["update", `--dir=${dir}`, "--max-lines=500", "--languages=TypeScript,Java", "--disable=jsNoVar,includeGitHubCI"], dir);
  assert.equal(r.status, 0, r.stderr);

  assert.match(read(dir, "AI_GUIDELINES.md"), /500 lines/);
  assert.match(read(dir, "AI_GUIDELINES.md"), /### \d\.\d Java/);
  assert.match(read(dir, "CLAUDE.md"), /My own team rule/);
  assert.match(read(dir, "CLAUDE.md.vibe-new"), /500 lines/);
  assert.equal(read(dir, ".memory_bank/activeContext.md"), "# my notes\n");
  assert.ok(!exists(dir, ".github/workflows/ai-guidelines-ci.yml"), "unmodified CI file is removed when disabled");
  const cfg = JSON.parse(read(dir, "vibe-governor.json"));
  assert.equal(cfg.config.constraints.maxLines, 500);
  assert.equal(cfg.config.constraints.jsNoVar, false);
  assert.match(read(dir, "scripts/check_guidelines.py"), /"java_exceptions"/);

  // A second update still treats CLAUDE.md as edited.
  const again = cli(["update", `--dir=${dir}`], dir);
  assert.match(again.stdout, /CLAUDE\.md \(edited by hand/);
  // --force replaces it.
  cli(["update", `--dir=${dir}`, "--force"], dir);
  assert.doesNotMatch(read(dir, "CLAUDE.md"), /My own team rule/);
});

test("update reports bad input clearly", () => {
  const dir = tmp();
  assert.match(cli(["update", `--dir=${dir}`], dir).stderr, /vibe-governor\.json not found/);
  const ok = initProject();
  const bad = cli(["update", `--dir=${ok}`, "--enable=noSuchSwitch"], ok);
  assert.equal(bad.status, 1);
  assert.match(bad.stderr, /Unknown switch "noSuchSwitch"/);
});

test("vibe-ignore comments exempt single lines, next lines, files and specific rules", py, () => {
  const dir = initProject(["--languages=TypeScript,JavaScript"]);
  write(dir, "src/a.ts", "let a: any = 1; // vibe-ignore: ts_any\n// vibe-ignore-next-line\nlet b: any = 2;\n");
  write(dir, "src/b.js", "// vibe-ignore-file: js_no_var\nvar x = 1;\nvar y = 2;\n");
  assert.equal(check(dir).code, 0, check(dir).out);

  write(dir, "src/c.ts", "let c: any = 3; // vibe-ignore: js_strict_eq\n"); // wrong rule -> still reported
  const r = check(dir);
  assert.equal(r.code, 1);
  assert.match(r.out, /src\/c\.ts:1 .*\[ts_any\]/);
  assert.match(r.out, /4 finding\(s\) exempted by vibe-ignore/);
});

test("baseline accepts existing findings; only new ones fail", py, () => {
  const dir = initProject(["--languages=TypeScript", "--max-lines=200"]);
  write(dir, "src/old.ts", "let a: any = 1;\n");
  write(dir, "src/big.ts", "x;\n".repeat(250));
  assert.equal(check(dir).code, 1);
  const b = check(dir, "--update-baseline");
  assert.equal(b.code, 0);
  assert.ok(exists(dir, ".vibe-baseline.json"));
  assert.equal(check(dir).code, 0);

  // Lines shifting does not break the baseline; growth of a big file and new findings do.
  write(dir, "src/old.ts", "// header\n\nlet a: any = 1;\n");
  assert.equal(check(dir).code, 0, check(dir).out);
  write(dir, "src/big.ts", "x;\n".repeat(260));
  assert.match(check(dir).out, /LINE LIMIT EXCEEDED\] src\/big\.ts: 260/);
  write(dir, "src/big.ts", "x;\n".repeat(250));
  write(dir, "src/new.ts", "let n: any = 1;\n");
  const r = check(dir);
  assert.equal(r.code, 1);
  assert.match(r.out, /src\/new\.ts:1/);
  assert.doesNotMatch(r.out, /src\/old\.ts:\d/);
  assert.equal(check(dir, "--no-baseline").code, 1);
});

test("--staged checks only staged content and warns about a stale Memory Bank", pyGit, () => {
  const dir = initProject(["--languages=TypeScript"]);
  git(dir, "init", "-q");
  git(dir, "add", "-A");
  git(dir, "commit", "-qm", "init", "--no-verify");

  write(dir, "src/unstaged.ts", "let u: any = 1;\n"); // not staged -> ignored
  write(dir, "src/ok.ts", "const x: number = 1;\n");
  git(dir, "add", "src/ok.ts");
  let r = check(dir, "--staged");
  assert.equal(r.code, 0, r.out);
  assert.match(r.out, /Checking 1 staged code file/);
  assert.match(r.out, /\[MEMORY BANK\] Code changed but \.memory_bank\/ was not updated/);

  // Staged content is what counts, not the working tree.
  write(dir, "src/ok.ts", "const x: any = 1;\n");
  git(dir, "add", "src/ok.ts");
  write(dir, "src/ok.ts", "const x: number = 1;\n");
  r = check(dir, "--staged");
  assert.equal(r.code, 1);
  assert.match(r.out, /src\/ok\.ts:1/);

  // Updating the Memory Bank in the same commit silences the warning.
  write(dir, "src/ok.ts", "const x: number = 1;\n");
  git(dir, "add", "src/ok.ts");
  write(dir, ".memory_bank/progress.md", "# progress\n- [x] ok.ts\n");
  git(dir, "add", ".memory_bank/progress.md");
  r = check(dir, "--staged");
  assert.equal(r.code, 0);
  assert.doesNotMatch(r.out, /MEMORY BANK/);
});

test("the installed pre-commit hook blocks a bad commit", pyGit, () => {
  const dir = tmp();
  git(dir, "init", "-q");
  const r = cli(["init", `--dir=${dir}`, "--languages=TypeScript", "--lang=en"], dir);
  assert.match(r.stdout, /pre-commit installed/);
  git(dir, "add", "-A");
  assert.equal(git(dir, "commit", "-qm", "init").status, 0);
  write(dir, "src/bad.ts", "let a: any = 1;\n");
  git(dir, "add", "src/bad.ts");
  const c = git(dir, "commit", "-qm", "bad");
  assert.notEqual(c.status, 0);
  assert.match(c.stdout + c.stderr, /COMMIT BLOCKED/);
});
