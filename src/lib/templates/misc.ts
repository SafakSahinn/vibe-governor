/**
 * Small templates (spec §3.7 – §3.10). Placeholders: {{MAX_LINES}}, {{DOC_SCORE}}.
 */

const HOOK_TEXT = {
  tr: {
    start: "🛡️ Git Pre-Commit: AI Guidelines kuralları denetleniyor...",
    noPython: "❌ Python bulunamadı (python3/python). Denetçi çalıştırılamadı.",
    blocked: "❌ COMMIT ENGELLENDİ: Proje AI Guidelines kurallarına uymuyor!",
    fix: "Lütfen yukarıdaki hataları düzelttikten sonra tekrar commit yapın.",
    ok: "✅ Pre-Commit kontrolü başarılı! Commit işlemine devam ediliyor...",
  },
  en: {
    start: "🛡️ Git Pre-Commit: verifying AI Guidelines rules...",
    noPython: "❌ Python not found (python3/python). Cannot run the checker.",
    blocked: "❌ COMMIT BLOCKED: the project violates the AI Guidelines!",
    fix: "Please fix the errors above and commit again.",
    ok: "✅ Pre-commit check passed! Continuing with the commit...",
  },
};

/** scripts/pre-commit-hook.sh */
export function buildPreCommitHook(locale: "tr" | "en"): string {
  const t = HOOK_TEXT[locale];
  return `#!/usr/bin/env bash
# Git Pre-Commit Hook for AI Guidelines Verification
# Install:  cp scripts/pre-commit-hook.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit
# (\`npx vibe-governor init\` installs it automatically.)

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT" || exit 1

echo "${t.start}"

# Windows ships a 'python3' Store alias that is not a real interpreter, so probe it.
PY=""
for candidate in python3 python py; do
    if command -v "$candidate" >/dev/null 2>&1 && "$candidate" -c "import sys" >/dev/null 2>&1; then
        PY="$candidate"
        break
    fi
done
if [ -z "$PY" ]; then
    echo "${t.noPython}"
    exit 1
fi

if ! "$PY" scripts/check_guidelines.py --staged; then
    echo "${t.blocked}"
    echo "${t.fix}"
    exit 1
fi

echo "${t.ok}"
exit 0
`;
}

/** .github/workflows/ai-guidelines-ci.yml */
export const TEMPLATE_GITHUB_CI = `name: AI Guidelines Verification

on:
  push:
    branches: [ main, master, develop ]
  pull_request:
    branches: [ main, master, develop ]

jobs:
  verify-guidelines:
    runs-on: ubuntu-latest

    steps:
      - name: Codebase Checkout
        uses: actions/checkout@v4

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - name: Run AI Guidelines Checker
        run: |
          python3 scripts/check_guidelines.py
`;

const AUDIT_TR = `## 🇹🇷 Türkçe Denetim İstem Şablonu

\`\`\`text
PROJE PERİYODİK DENETİM VE TEKNİK BORÇ TARAMA TALİMATI

Lütfen projemizin tüm kod tabanını ve modüllerini detaylı bir şekilde denetle.

DENETİM HEDEFLERİ VE KURALLARI:
1. Kök dizindeki \`AI_GUIDELINES.md\` kuralları ile mevcut kodu karşılaştır.
2. {{MAX_LINES}} satırı aşan veya aşmaya yaklaşan monolithic/God Object dosyaları tespit et.
3. Mimari kısıtlamalara aykırı yapıları, spagetti kod sapmalarını ve mantık hatalarını belirle.
4. Dile özel güvenlik ve donanım kurallarını incele (ör. Rust unsafe kullanımı, TypeScript any kullanımı, Verilog/VHDL hatalı atamaları veya mandal/latch oluşumu).
5. Dokümantasyonu eksik veya puanı düşük kalan (hedef >= {{DOC_SCORE}}/10) public yapıları listele.

ÖNEMLİ:
- Doğrudan projedeki kodları DEĞİŞTİRME.
- Bulduğun tüm eksikleri, riskleri ve çözüm önerilerini \`audit-report.md\` adında yeni bir Markdown raporu olarak sun.
- Raporda her bulgu için ilgili dosya yolunu ve satır aralığını açıkça belirt.
\`\`\`
`;

const AUDIT_EN = `## 🇬🇧 English Audit Prompt Template

\`\`\`text
PERIODIC CODEBASE AUDIT & TECHNICAL DEBT SCAN INSTRUCTIONS

Please perform a rigorous audit of the entire codebase and architectural modules.

AUDIT SCOPE & RULES:
1. Compare the codebase against the standards defined in \`AI_GUIDELINES.md\`.
2. Identify any monolithic / God Object files exceeding or nearing the {{MAX_LINES}}-line threshold.
3. Detect architectural drift, spaghetti code patterns, and logic vulnerabilities.
4. Verify language-specific safety rules (e.g., raw pointer hazards, unhandled promises, Verilog/VHDL blocking/non-blocking assignment bugs or unintended latches).
5. Flag any public components lacking self-evaluated documentation (min {{DOC_SCORE}}/10) or adequate test coverage.

CRITICAL DIRECTIVE:
- DO NOT modify the codebase directly.
- Output all findings, security risks, and refactoring action steps into a new Markdown file named \`audit-report.md\`.
- Cite exact file paths and line numbers for each issue identified.
\`\`\`
`;

/** AUDIT_PROMPT.md — both language variants as in the spec; the selected locale comes first. */
export function buildAuditPrompt(locale: "tr" | "en"): string {
  const header =
    locale === "tr"
      ? `# Frontier Model Periyodik Denetim İstem Şablonları (AUDIT_PROMPT.md)

Büyük modüller tamamlandığında veya belirli geliştirme periyotlarının sonunda projenizi Claude Opus / Claude Sonnet / GPT-4o gibi güçlü modellerle denetlerken aşağıdaki promptları kullanabilirsiniz.
`
      : `# Frontier Model Periodic Audit Prompt Templates (AUDIT_PROMPT.md)

Use the prompts below when auditing the project with frontier models (Claude Opus / Claude Sonnet / GPT-4o) after large modules are completed or at the end of a development period.
`;
  const bodies = locale === "tr" ? [AUDIT_TR, AUDIT_EN] : [AUDIT_EN, AUDIT_TR];
  return [header, "---", "", bodies[0], "---", "", bodies[1]].join("\n");
}

/** .gitignore (spec §3.10) */
export function buildGitignore(locale: "tr" | "en"): string {
  const h =
    locale === "tr"
      ? ["Yapay Zeka Denetim ve Geçici Çalışma Dosyaları", "Memory Bank (Versiyon Kontrolüne DÂHİLDİR)", "IDE ve Donanım/Yazılım Derleme Çıktıları"]
      : ["AI Audit Reports & Temporary Work Files", "Memory Bank (TRACKED by version control)", "IDE & Hardware/Software Build Outputs"];
  const bar = "# ==========================================";
  return `${bar}
# ${h[0]}
${bar}
audit-report.md
*.tmp.md
*.vibe-new
scratch/
/tmp/

${bar}
# ${h[1]}
${bar}
!.memory_bank/
!.memory_bank/*.md

${bar}
# ${h[2]}
${bar}
.vscode/
.idea/
build/
target/
dist/
node_modules/
.next/
__pycache__/
*.o
*.elf
*.bit
*.mcs
`;
}
