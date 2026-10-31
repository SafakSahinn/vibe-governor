export const TEMPLATE_AI_GUIDELINES_TR = `# Dile Özel Yapay Zeka Kodlama ve Mimari Kuralları (AI_GUIDELINES.md)

Bu doküman, genel yazılım dilleri (Rust, TypeScript, Python, C++, Go) ve Donanım Tanımlama Dilleri (Verilog, VHDL) için yapay zeka kodlama asistanlarının uyması gereken dile özel kısıtlamaları, güvenlik kurallarını ve mimari sınırları tanımlar.

---

## 0. Genel Çekirdek Kurallar
- **Maksimum Dosya Sınırı:** Hiçbir dosya {{MAX_LINES}} satırı geçemez. {{MAX_LINES_THRESHOLD}} satıra yaklaşıldığında alt modüllere bölünmelidir.
- **Dokümantasyon Puan Barajı:** Public bileşen ve fonksiyonlar için öz-değerlendirme puanı en az {{DOC_SCORE}}/10 olmalıdır.
- **Memory Bank Senkronizasyonu:** Her görev bitiminde \`.memory_bank/activeContext.md\` ve \`.memory_bank/progress.md\` dosyaları güncellenmelidir.
- **Kombinasyon Testleri:** Tüm yeni yetenekler için uç durumları (edge-cases) kapsayan testler yazılmalıdır.

---

## 1. Genel Yazılım Dilleri Kısıtlama Kuralları

### 1.1 Rust
- **Unsafe Kullanım Yasakları:** Yapay zekanın bellek yönetiminde kolay çözüme kaçmasını önlemek için \`unsafe\` blok kullanımı kesinlikle yasaktır (açık kullanıcı izni hariç).
- **Gereksiz Clone Çağrıları:** Performans israfını önlemek adına gereksiz \`.clone()\` kullanımı engellenmeli; sahiplik (ownership) ve borçlanma (borrowing) mekanizmaları doğru kurgulanmalıdır.
- **Cargo Workspace Modülerliği:** Proje \`crates/\` altında bağımsız modüllere bölünmeli, {{MAX_LINES}} satır kuralı sıkı şekilde uygulanmalıdır.

### 1.2 TypeScript / JavaScript
- **Strict Typing (No \`any\`):** \`any\` veri tipi kullanımı kesinlikle yasaktır. Tüm arayüzler (interface) ve tipler (type) açıkça tanımlanmalıdır.
- **Async Error Handling:** \`async/await\` yapılarında yakalanmamış promise hataları (unhandled rejections) engellenmeli, \`try/catch\` blokları zorunlu tutulmalıdır.
- **Bileşen Modülerliği:** React/Vue/Node.js dosyalarında UI ve iş mantığı (business logic) ayrılmalı, tek dosyada {{MAX_LINES}} satır aşılmamalıdır.

### 1.3 Python
- **Type Hints Zorunluluğu:** Tüm fonksiyon parametreleri ve dönüş tipleri için \`typing\` modülü ile tip ipuçları verilmelidir.
- **Global Değişken Yasakları:** Fonksiyonlar arası bağımlılığı artıran global değişken kullanımı ve \`from module import *\` yapısı yasaktır.
- **Modüler Yapı:** Monolitik \`.py\` betikleri yerine paket/modül mimarisi kurgulanmalıdır.

### 1.4 C++
- **Ham İşaretçi (Raw Pointer) Yasağı:** Manuel \`new\` / \`delete\` kullanımı yasaktır. Bellek yönetimi \`std::unique_ptr\` ve \`std::shared_ptr\` ile yapılmalıdır.
- **Döküm (Cast) Güvenliği:** Tehlikeli \`reinterpret_cast\` kullanımı engellenmeli, \`static_cast\` veya \`dynamic_cast\` tercih edilmelidir.
- **Başlık (Header) İzolasyonu:** \`.h\` / \`.hpp\` dosyalarında tanım karmaşası önlenmeli, {{MAX_LINES}} satır kuralına uyulmalıdır.

### 1.5 Go
- **Hata Denetim Zorunluluğu:** Dönülen \`err\` değerlerinin göz ardı edilmesi (\`_\` ile geçiştirilmesi) yasaktır.
- **Goroutine Sızıntı Önlemleri:** Kanal (channel) kapatma ve context yönetimi eksiksiz yapılmalıdır.

---

## 2. Donanım Tanımlama Dilleri (HDL: Verilog & VHDL) Kuralları

Donanım tasarımı dijital sentez ve zamanlama kısıtlarına dayandığı için yapay zekanın yazılım dillerindeki gibi serbest hareket etmesi donanım sentezleme hatalarına (synthesis errors) veya yarış durumlarına (race conditions) yol açar.

### 2.1 Verilog / SystemVerilog
- **Atama Kuralları (Blocking vs. Non-blocking):**
  - Ardışıl Mantık (Sequential Logic - \`always @(posedge clk)\`): Kesinlikle **Non-blocking (\`<=\`)** atama kullanılmalıdır.
  - Kombinasyonel Mantık (\`always @(*)\`): Kesinlikle **Blocking (\`=\`)** atama kullanılmalıdır. Aynı blok içinde ikisini karıştırmak kesinlikle yasaktır!
- **Mandal (Latch) Önleme:** Kombinasyonel bloklardaki \`if/else\` ve \`case\` ifadeleri tüm olasılıkları kapsamalı (\`default\` eklenmeli), eksik tanımlama nedeniyle istem dışı şeffaf latch oluşumu engellenmelidir.
- **Modül Sınırları ve {{MAX_LINES}} Satır Kuralı:** Her Verilog modülü ayrı bir \`.v\` veya \`.sv\` dosyasında bulunmalı, top-level modül altında temiz bir hiyerarşi kurgulanmalıdır.
- **Testbench Ayrımı:** Test kodları ana donanım modülünden ayrı \`tb_*.v\` dosyalarında üretilmeli ve self-checking assertions içermelidir.

### 2.2 VHDL
- **Varlık / Mimari (Entity / Architecture) Ayrımı:** Her VHDL varlığı kendi \`.vhd\` dosyasında yer almalıdır. Ortak veri tipleri ve sabitler paket dosyalarında (\`*_pkg.vhd\`) toplanmalıdır.
- **Duyarlılık Listeleri (Sensitivity Lists):** Kombinasyonel süreçlerde (\`process\`) okunan TÜM sinyaller duyarlılık listesine eklenmelidir. Ardışıl süreçlerde yalnızca \`rising_edge(clock)\` ve asenkron sıfırlama yer almalıdır.
- **Güçlü Tip Güvenliği:** Standart dışı \`std_logic_unsigned\` kütüphaneleri yerine \`ieee.numeric_std\` kütüphanesi ve \`signed\`/\`unsigned\` tipleri zorunlu tutulmalıdır.
`;

export const TEMPLATE_AI_GUIDELINES_EN = `# Language-Specific AI Coding & Architectural Rules (AI_GUIDELINES.md)

This document specifies language-specific constraints, safety enforcement rules, and architectural boundaries for AI coding assistants working across general software languages (Rust, TypeScript, Python, C++, Go) and Hardware Description Languages (Verilog, VHDL).

---

## 0. Universal Core Directives
- **Maximum File Limit:** No single file may exceed {{MAX_LINES}} lines. Modularize when approaching {{MAX_LINES_THRESHOLD}} lines.
- **Documentation Self-Scoring:** Public functions and modules must achieve at least {{DOC_SCORE}}/10 self-evaluated documentation quality score.
- **Memory Bank Synchronization:** Synchronize \`.memory_bank/activeContext.md\` and \`.memory_bank/progress.md\` at the end of each session.
- **Combination Tests:** Construct rigorous edge-case combination test matrices for every added component.

---

## 1. General Software Language Constraints

### 1.1 Rust
- **Ban on \`unsafe\`:** Using \`unsafe\` blocks is strictly forbidden unless explicitly requested by the user.
- **Restrict Unnecessary \`.clone()\`: ** Prevent memory allocation waste; strictly enforce Rust ownership and borrowing mechanics.
- **Cargo Workspace Modularity:** Organize projects into crates under \`crates/\` and enforce the {{MAX_LINES}}-line limit per file.

### 1.2 TypeScript / JavaScript
- **Strict Typing (No \`any\`):** The \`any\` type is prohibited. Explicit interfaces and type definitions are required.
- **Async Error Handling:** Unhandled promise rejections are forbidden; \`try/catch\` blocks are mandatory in \`async/await\`.
- **Component Isolation:** Separate UI and business logic; enforce the {{MAX_LINES}}-line cap per file.

### 1.3 Python
- **Mandatory Type Hints:** All function parameters and return types must use explicit \`typing\` annotations.
- **Global State Prohibition:** Global variables and \`from module import *\` wildcards are forbidden.

### 1.4 C++
- **Raw Pointer Ban:** Manual \`new\`/\`delete\` is forbidden. Use \`std::unique_ptr\` and \`std::shared_ptr\`.
- **Casting Safety:** Ban \`reinterpret_cast\`; require \`static_cast\` or \`dynamic_cast\`.

### 1.5 Go
- **Explicit Error Checks:** Ignoring returned \`err\` values (e.g. \`_ = fn()\`) is strictly prohibited.
- **Goroutine Leak Prevention:** Mandatory channel closure and \`context.Context\` management.

---

## 2. Hardware Description Languages (HDL: Verilog & VHDL)

Hardware synthesis and timing constraints require strict rules to prevent hardware race conditions or unintentional latch inference.

### 2.1 Verilog / SystemVerilog
- **Assignment Rules:**
  - Sequential Logic (\`always @(posedge clk)\`): **Non-blocking (\`<=\`)** assignments are strictly mandatory.
  - Combinational Logic (\`always @(*)\`): **Blocking (\`=\`)** assignments are strictly mandatory. Mixing both in one block is banned.
- **Latch Prevention:** All \`if/else\` and \`case\` branches in combinational blocks must be fully specified (with \`default\`) to avoid unintended transparent latches.
- **Module Hierarchy:** One module per \`.v\`/\`.sv\` file; maximum {{MAX_LINES}} lines per file.
- **Testbenches:** Isolated testbenches in \`tb_*.v\` files with self-checking assertions.

### 2.2 VHDL
- **Entity / Architecture Separation:** One entity per \`.vhd\` file; shared constants and types in package files (\`*_pkg.vhd\`).
- **Sensitivity Lists:** Combinational \`process\` statements must list ALL read signals. Sequential processes rely strictly on \`rising_edge(clk)\`.
- **Strong Typing:** Use standard \`ieee.numeric_std\` library with \`signed\`/\`unsigned\` types instead of legacy non-standard packages.
`;

export const TEMPLATE_CHECK_GUIDELINES_PY = `#!/usr/bin/env python3
"""
AI Guidelines Auto-Checker Script
Verifies codebases against AI_GUIDELINES rules:
1. File line count limit (max {{MAX_LINES}} lines).
2. Presence of AI_GUIDELINES.md in root.
3. Presence of .memory_bank/ directory with 6 core files.
4. Language-specific safety rules (Rust unsafe, TS any, Verilog assignments, C++ raw new/delete).
"""

import os
import sys
import re

MAX_LINES = {{MAX_LINES}}
REQUIRED_MEMORY_FILES = [
    "projectbrief.md",
    "productContext.md",
    "systemPatterns.md",
    "techContext.md",
    "activeContext.md",
    "progress.md"
]

EXCLUDE_DIRS = {".git", "node_modules", "target", "dist", "build", ".memory_bank", "vendor"}
EXCLUDE_EXTS = {".png", ".jpg", ".jpeg", ".pdf", ".zip", ".tar", ".gz", ".lock", ".svg"}

def check_memory_bank(root_dir):
    errors = []
    mb_dir = os.path.join(root_dir, ".memory_bank")
    if not os.path.exists(mb_dir):
        errors.append("[CRITICAL] .memory_bank/ klasörü kök dizinde bulunamadı!")
        return errors
    
    for f in REQUIRED_MEMORY_FILES:
        path = os.path.join(mb_dir, f)
        if not os.path.exists(path):
            errors.append(f"[ERROR] Memory Bank dosyası eksik: .memory_bank/{f}")
    return errors

def check_ai_guidelines(root_dir):
    guidelines_files = ["AI_GUIDELINES.md", "AI_GUIDELINES_LANGUAGES_TR.md", "AI_GUIDELINES_LANGUAGES_EN.md"]
    found = any(os.path.exists(os.path.join(root_dir, gf)) for gf in guidelines_files)
    if not found:
        return ["[CRITICAL] Kök dizinde AI_GUIDELINES.md bulunamadı!"]
    return []

def analyze_file(filepath):
    issues = []
    rel_path = filepath
    
    try:
        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
            lines = f.readlines()
    except Exception as e:
        return issues

    line_count = len(lines)
    if line_count > MAX_LINES:
        issues.append(f"[LINE LIMIT EXCEEDED] {rel_path}: {line_count} satır (Maksimum sınır {MAX_LINES} satır)!")

    ext = os.path.splitext(filepath)[1].lower()

    for idx, line in enumerate(lines, 1):
        # Rust Checks
        if ext == ".rs":
            if "unsafe" in line and not line.strip().startswith("//"):
                issues.append(f"[RUST VIOLATION] {rel_path}:{idx} -> 'unsafe' kullanımı tespit edildi!")
        
        # TypeScript / JS Checks
        elif ext in [".ts", ".tsx"]:
            if re.search(r":\s*any\\b", line) and not line.strip().startswith("//"):
                issues.append(f"[TYPESCRIPT VIOLATION] {rel_path}:{idx} -> 'any' tipi kullanımı tespit edildi!")
        
        # C++ Checks
        elif ext in [".cpp", ".hpp", ".cc", ".cxx"]:
            if re.search(r"\\bnew\\s+\\w+", line) and "std::" not in line and not line.strip().startswith("//"):
                issues.append(f"[C++ VIOLATION] {rel_path}:{idx} -> Ham 'new' kullanımı (Smart pointer tercih edin)!")

        # Python Checks
        elif ext == ".py":
            if "import *" in line:
                issues.append(f"[PYTHON VIOLATION] {rel_path}:{idx} -> 'from ... import *' kullanımı engellenmelidir!")

    return issues

def main():
    root_dir = os.getcwd()
    print("==================================================")
    print("🔍 AI GUIDELINES OTOMATİK DENETÇİ BAŞLATILIYOR...")
    print("==================================================")

    all_errors = []
    
    # Check structure
    all_errors.extend(check_ai_guidelines(root_dir))
    all_errors.extend(check_memory_bank(root_dir))

    # Scan files
    for current_root, dirs, files in os.walk(root_dir):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in EXCLUDE_EXTS:
                continue
            full_path = os.path.join(current_root, file)
            file_issues = analyze_file(full_path)
            all_errors.extend(file_issues)

    if all_errors:
        print("\\n❌ AI GUIDELINES İHLALLERİ TESPİT EDİLDİ:\\n")
        for err in all_errors:
            print(f"  • {err}")
        print("\\n⚠️ Lütfen ihlalleri düzelttikten sonra tekrar deneyin.")
        sys.exit(1)
    else:
        print("\\n✅ TÜM DENETİMLER BAŞARIYLA GEÇTİ! Kod tabanı AI Guidelines kurallarına uygun.")
        sys.exit(0)

if __name__ == "__main__":
    main()
`;

export const TEMPLATE_PRE_COMMIT_HOOK = `#!/usr/bin/env bash
# Git Pre-Commit Hook for AI Guidelines Verification
# Place this file in .git/hooks/pre-commit and make it executable (chmod +x .git/hooks/pre-commit)

echo "🛡️ Git Pre-Commit: AI Guidelines kuralları denetleniyor..."

python3 scripts/check_guidelines.py

if [ $? -ne 0 ]; then
    echo "❌ COMMIT ENGELLENDİ: Proje AI Guidelines kurallarına uymuyor!"
    echo "Lütfen yukarıdaki hataları düzelttikten sonra tekrar commit yapın."
    exit 1
fi

echo "✅ Pre-Commit kontrolü başarılı! Commit işlemine devam ediliyor..."
exit 0
`;

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

export const TEMPLATE_AUDIT_PROMPT_TR = `# Frontier Model Periyodik Denetim İstem Şablonları (AUDIT_PROMPT.md)

Büyük modüller tamamlandığında veya belirli geliştirme periyotlarının sonunda projenizi Claude 3.5 Sonnet / Claude 3.7 Sonnet / Claude Opus / GPT-4o gibi güçlü modellerle denetlerken aşağıdaki promptları kullanabilirsiniz.

---

## 🇹🇷 Proje Periyodik Denetim ve Teknik Borç Tarama Talimatı

Lütfen projemizin tüm kod tabanını ve modüllerini detaylı bir şekilde denetle.

### DENETİM HEDEFLERİ VE KURALLARI:
1. Kök dizindeki \`AI_GUIDELINES.md\` kuralları ile mevcut kodu karşılaştır.
2. {{MAX_LINES}} satırı aşan veya aşmaya yaklaşan monolithic/God Object dosyaları tespit et.
3. Mimari kısıtlamalara aykırı yapıları, spagetti kod sapmalarını ve mantık hatalarını belirle.
4. Dile özel güvenlik ve donanım kurallarını incele (ör. Rust unsafe kullanımı, TypeScript any kullanımı, Verilog/VHDL hatalı atamaları veya mandal/latch oluşumu).
5. Dokümantasyonu eksik veya puanı düşük kalan (hedef >={{DOC_SCORE}}/10) public yapıları listele.

### ÖNEMLİ:
- Doğrudan projedeki kodları DEĞİŞTİRME.
- Bulduğun tüm eksikleri, riskleri ve çözüm önerilerini \`audit-report.md\` adında yeni bir Markdown raporu olarak sun.
- Raporda her bulgu için ilgili dosya yolunu ve satır aralığını açıkça belirt.
`;

export const TEMPLATE_AUDIT_PROMPT_EN = `# Frontier Model Periodic Audit Prompt Templates (AUDIT_PROMPT.md)

Use the prompt below when conducting periodic code audits with frontier models (Claude 3.5/3.7 Sonnet, Opus, GPT-4o) upon module completions.

---

## 🇬🇧 Periodic Codebase Audit & Technical Debt Scan Instructions

Please perform a rigorous audit of the entire codebase and architectural modules.

### AUDIT SCOPE & RULES:
1. Compare the codebase against the standards defined in \`AI_GUIDELINES.md\`.
2. Identify any monolithic / God Object files exceeding or nearing the {{MAX_LINES}}-line threshold.
3. Detect architectural drift, spaghetti code patterns, and logic vulnerabilities.
4. Verify language-specific safety rules (e.g., raw pointer hazards, unhandled promises, Verilog/VHDL blocking/non-blocking assignment bugs or unintended latches).
5. Flag any public components lacking self-evaluated documentation (min {{DOC_SCORE}}/10) or adequate test coverage.

### CRITICAL DIRECTIVE:
- DO NOT modify the codebase directly.
- Output all findings, security risks, and refactoring action steps into a new Markdown file named \`audit-report.md\`.
- Cite exact file paths and line numbers for each issue identified.
`;

export const TEMPLATE_GITIGNORE = `# ==========================================
# Yapay Zeka Denetim ve Geçici Çalışma Dosyaları
# ==========================================
audit-report.md
*.tmp.md
scratch/
/tmp/

# ==========================================
# Memory Bank (Versiyon Kontrolüne DÂHİLDİR)
# ==========================================
!.memory_bank/
!.memory_bank/*.md

# ==========================================
# IDE ve Donanım/Yazılım Derleme Çıktıları
# ==========================================
.vscode/
.idea/
build/
target/
dist/
node_modules/
.next/
*.o
*.elf
*.bit
*.mcs
`;
