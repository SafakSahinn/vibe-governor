# 🛡️ Vibe Governor

[![npm](https://img.shields.io/npm/v/vibe-governor)](https://www.npmjs.com/package/vibe-governor)
[![license](https://img.shields.io/npm/l/vibe-governor)](https://github.com/SafakSahinn/vibe-governor/blob/main/LICENSE)

**English** · [Türkçe](https://github.com/SafakSahinn/vibe-governor/blob/main/BENIOKU.md)

Guardrails for AI-assisted ("vibe coding") projects, both software and hardware (Verilog/VHDL).
Vibe Governor installs one shared rule set for all your AI coding assistants, a **Memory Bank** that
keeps project context between sessions, and a **checker** that blocks commits breaking the rules
(oversized files, `any`, `unsafe`, `gets()`, latches, …).

- **Web wizard:** https://safaksahinn.github.io/vibe-governor/ (pick your settings, preview every file, download a ZIP or copy a one-line command). The rules of the languages you pick are switched on automatically, and the Memory Bank fields that follow from your choices (brief, architecture, build commands, status) are pre-written for you to extend.
- **CLI:** `npx vibe-governor init` (no install, no dependencies, Node.js 18+)

## Why

AI assistants forget the project between sessions, each tool reads its own rule file, and nothing
stops a model from growing a 2,000-line file or sprinkling `any` everywhere. Vibe Governor fixes all three:

| Problem | What you get |
|---|---|
| Every tool has its own rule format | One `AI_GUIDELINES.md`, referenced from each tool's file in its current documented format |
| Context is lost between sessions | `.memory_bank/` with 6 files the assistant reads first and updates as it works |
| Rules are only suggestions | `scripts/check_guidelines.py` + a pre-commit hook + optional GitHub Actions CI that fail on violations |

## Quick start

Run inside your project folder:

```bash
npx vibe-governor init
```

Languages are detected from your files (`npx vibe-governor detect` shows them). Or set things explicitly:

```bash
npx vibe-governor init --name=my-app --languages=Rust,Verilog --lang=en
```

The web wizard's last step gives you a command with all of your choices encoded:

```bash
npx -y vibe-governor init --preset=<value copied from the wizard>
```

If the folder is a git repository, `.git/hooks/pre-commit` is installed automatically (`--no-hook` to skip).
Existing files are never overwritten unless you pass `--force`; `--dry-run` only lists what would be written.

## What gets generated

| File | Purpose |
|---|---|
| `AI_GUIDELINES.md` | The rule set, built only from the languages and switches you selected |
| `AGENTS.md`, `CLAUDE.md`, `GEMINI.md` | AGENTS.md standard, Claude Code, Gemini CLI |
| `.agents/rules/vibe-governor.md` | Google Antigravity |
| `.cursor/rules/vibe-governor.mdc` | Cursor (`alwaysApply: true`) |
| `.windsurf/rules/vibe-governor.md` | Windsurf / Devin (`trigger: always_on`) |
| `.clinerules/vibe-governor.md` | Cline |
| `.github/copilot-instructions.md` | GitHub Copilot |
| `.memory_bank/*.md` | `projectbrief`, `productContext`, `systemPatterns`, `techContext`, `activeContext`, `progress` |
| `scripts/check_guidelines.py` | Static checker (Python 3.8+, no dependencies) |
| `scripts/pre-commit-hook.sh` | Runs the checker on staged content only |
| `.github/workflows/ai-guidelines-ci.yml` | Same checks in CI |
| `AUDIT_PROMPT.md` | Prompt for a technical-debt review by a frontier model |
| `vibe-governor.json` | Your settings + hashes of generated files, used by `update` |

Only the files for the tools you select are written.

## Supported languages and checker rules

C, C++, C#, Java, JavaScript, TypeScript, Python, Go, Rust, Kotlin, Swift, PHP, Verilog, VHDL —
or no language at all (e.g. a pure documentation or hardware-planning repo); then only the
language-independent rules apply (line limit, Memory Bank, documentation, tests).

| Language | Rule ids |
|---|---|
| C | `c_unsafe_funcs` (no `gets`/`strcpy`/`strcat`/`sprintf`), `c_malloc_check` (NULL check after allocation) |
| C++ | `cpp_raw_ptr` (no raw `new`/`delete`, `reinterpret_cast`) |
| C# | `cs_no_dynamic`, `cs_no_async_void` |
| Java | `java_exceptions` (no empty/generic catch), `java_no_sysout` |
| JavaScript | `js_no_var`, `js_strict_eq` |
| TypeScript | `ts_any` |
| Python | `py_type_hints`, `py_no_global` (no global state / wildcard imports) |
| Go | `go_errors` |
| Rust | `rust_unsafe`, `rust_clone` |
| Kotlin | `kt_no_bang`, `kt_no_globalscope` |
| Swift | `swift_no_force` (no `!`, `try!`, `as!`) |
| PHP | `php_strict_types`, `php_no_eval`, `php_prepared` (no interpolated SQL) |
| Verilog | `verilog_assign` (`<=` sequential, `=` combinational), `verilog_latch` (`case` needs `default`) |
| VHDL | `vhdl_numeric_std`, `vhdl_sensitivity` (complete sensitivity lists) |
| All | `line_limit` (default 800 lines per file) |

Each rule can be switched off in the wizard or with `--disable=<switch>`.

## Changing settings later

All choices are stored in `vibe-governor.json`. To change them:

```bash
npx vibe-governor update --max-lines=600 --enable=tsNoAny --disable=includeGitHubCI
```

- Files you edited by hand are kept; the new version is written next to them as `<file>.vibe-new`.
- `.memory_bank/` and `.gitignore` are never touched by `update`.
- Unmodified files of tools you deselected are removed.
- In the web wizard, **Load Config** reads a project's `vibe-governor.json` back into the form.

## Adopting it in an existing project

```bash
python3 scripts/check_guidelines.py --update-baseline
```

Current violations are recorded in `.vibe-baseline.json`; from then on only **new** violations fail.
Baseline entries survive line shifts, and an oversized file fails again only if it grows.

Inline exemptions (each finding prints its rule id):

```ts
let raw: any = JSON.parse(s); // vibe-ignore: ts_any
// vibe-ignore-next-line
let other: any = 1;
```

`vibe-ignore-file: line_limit` within the first 10 lines exempts a whole file.

The pre-commit hook runs `check_guidelines.py --staged`: it checks only the staged content and warns
when code changed but `.memory_bank/` was not updated in the same commit.

## CLI reference

```text
vibe-governor init   [options]   Install the governance pack into a project
vibe-governor update [options]   Re-generate from vibe-governor.json (optionally changing settings)
vibe-governor detect [--dir=]    List the languages detected in a project

--dir=<path>         Target directory (default: current directory)
--force              Overwrite files even if they exist / were edited by hand
--dry-run            Only show what would change
--no-hook            Do not install .git/hooks/pre-commit
--preset=<string>    (init) Full configuration copied from the web wizard
--name=<project>     Project name
--platforms=<list>   AGENTS_MD,CLAUDE_CLI,GEMINI_CLI,ANTIGRAVITY,CURSOR,WINDSURF,CLINE,GITHUB_COPILOT
--languages=<list>   C,C++,C#,Java,JavaScript,TypeScript,Python,Go,Rust,Kotlin,Swift,PHP,Verilog,VHDL
--detect             (update) Replace the language list with the detected languages
--max-lines=<n>      File line limit (200-1500)
--doc-score=<n>      Documentation score threshold (5-10)
--lang=<tr|en>       Language of the generated files
--enable=<keys>      Turn switches on, e.g. tsNoAny,includeGitHubCI
--disable=<keys>     Turn switches off
```

The interface and the generated files are available in English and Turkish.

## Development

```bash
npm install
npm run dev        # web wizard on http://localhost:3000
npm test           # builds the CLI, tests the pack + Python checker, then the UI (Vitest)
npm run lint
npm run build      # static export to out/
```

- `src/lib/` — schema (Zod), rules, templates and the generator shared by the wizard and the CLI
- `cli/index.ts` → `bin/vibe-governor.cjs` (single file bundled with esbuild; rebuild with `npm run build:cli` and commit it)
- Stack: Next.js 16 (static export), React 19, Tailwind CSS 3, shadcn/ui, React Hook Form + Zod 4, Monaco Editor

## License

[MIT](https://github.com/SafakSahinn/vibe-governor/blob/main/LICENSE) © 2026 SafakSahinn
