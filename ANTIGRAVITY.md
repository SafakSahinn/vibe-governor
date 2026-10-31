# VIBE GOVERNOR: TEK PARÇA MASTER PROJE VE GELİŞTİRME SPESİFİKASYONU

> **AntiGravity Agent & Gemini İçin Komut / Sistem İstemi:**
> Bu belge, **"Vibe Governor Web Sihirbazı ve CLI Otomasyon Sisteminin"** sıfırdan uçtan uca geliştirilmesi için gerekli tüm mimariyi, ekran tasarımlarını, form yapılarını ve projenin dinamik olarak üreteceği **10 temel şablon/betik dosyasının tam kaynak kodlarını** içerir.
> Lütfen bu belgeyi projenin kök dizinine `ANTIGRAVITY.md` veya `SYSTEM_PROMPT.md` adıyla koyun ve geliştirmeyi bu yönergelere göre yürütün.

---

## 🎯 1. PROJE VİZYONU VE GENEL MİMARİ

**Vibe Governor**, yapay zeka destekli (vibe coding) büyük ölçekli yazılım ve donanım (HDL: Verilog/VHDL) projelerinin çökmesini, hafıza kaybı yaşamasını ve spagetti koda dönüşmesini engelleyen görsel bir proje kurulum ve otomasyon sihirbazıdır.

### Teknolojik Altyapı
- **Framework:** Next.js 14+ (App Router, React 18, TypeScript)
- **Stil & UI:** Tailwind CSS, Shadcn UI (Lucide Icons, Framer Motion)
- **Form & Doğrulama:** React Hook Form + Zod
- **Dışa Aktarma Motoru:** JSZip (Browser-side ZIP oluşturma) + Monaco Editor (Kod Ön İzleme)

---

## 🗺️ 2. WEB SİHİRBAZI EKRAN AKIŞI VE FORM YAPISI (5 ADIM)

### ADIM 1: Dil ve Target AI Platform Seçimi
- **Arayüz Dili:** `tr` | `en`
- **Hedef AI Araçları (Çoklu Seçim):**
  - `CLAUDE_CLI`: Komut Satırı (`CLAUDE.md`)
  - `ANTIGRAVITY`: AntiGravity AI Agent (`ANTIGRAVITY.md`)
  - `CURSOR`: Cursor IDE (`.cursorrules`)
  - `WINDSURF`: Windsurf IDE (`.windsurfrules`)
  - `CLINE`: VS Code + Cline (`.clinerules`)
  - `GITHUB_COPILOT`: GitHub Copilot (`.github/copilot-instructions.md`)
- **Proje Türü & Diller:**
  - Yazılım: Rust, TypeScript, Python, C++, Go
  - Donanım (HDL): Verilog, VHDL

### ADIM 2: Mimari ve Kısıtlar Yapılandırması
- **Dosya Satır Sınırı:** Varsayılan `800` satır (Değiştirilebilir).
- **Dokümantasyon Puan Barajı:** Varsayılan `8/10` (Public metotlar için öz-puanlama).
- **Dile Özel Güvenlik Anahtarları:**
  - Rust: `unsafe` yasağı, `.clone()` kısıtı.
  - TypeScript: `any` tipi yasağı.
  - Python: Type Hint zorunluluğu.
  - Verilog/VHDL: Blocking (`=`) vs Non-blocking (`<=`) atama ve latch önleme kuralları.

### ADIM 3: Memory Bank Formu (6 Dosya İçin Girişler)
- `projectbrief.md`: Proje Vizyonu ve Çekirdek Hedefler.
- `productContext.md`: Çözülen Problem ve Kullanıcı Deneyimi.
- `systemPatterns.md`: Mimari Desenler, Modül Hiyerarşisi, Veri Akışı.
- `techContext.md`: Teknolojiler, Bağımlılıklar, Derleme/Sentez Komutları.
- `activeContext.md`: Mevcut Odak, Son Yapılanlar, Sıradaki Adımlar.
- `progress.md`: Çalışan Modüller, Tamamlanış Oranı, Teknik Borçlar.

### ADIM 4: Otomasyon ve Denetçi Betikleri
- `check_guidelines.py`: Statik kod boyutu ve yasaklı kelime denetçisi.
- `pre-commit-hook.sh`: Git pre-commit yerel engelleyici kanca.
- `ai-guidelines-ci.yml`: GitHub Actions CI/CD entegrasyonu.
- `AUDIT_PROMPT.md`: Frontier modeller (Opus/GPT-4o) için teknik borç tarama istemi.
- `.gitignore`: Memory bank takibi ve geçici dosya muafiyeti.

### ADIM 5: Ön İzleme ve Dışa Aktarma Hub'ı
- **Sol Panel:** Üretilecek projenin dosya ağacı (`tree view`).
- **Sağ Panel:** Seçilen dosyanın ön izlemesi (Monaco Editor).
- **Aksiyonlar:**
  - **"Proje Paketini İndir (.ZIP)":** Tüm klasör ve dosyaları eksiksiz zipler.
  - **"Tek Satır CLI Komutu Üret":** Terminalde çalıştırılabilir `npx vibe-governor init --preset=...` komutunu verir.

---

## 📦 3. SİSTEMİN DİNAMİK OLARAK ÜRETECEĞİ EMBEDDED ŞABLON DOSYALARI

Aşağıdaki 10 şablon, uygulamanızın `templates/` veya `assets/` klasöründe saklanacak ve web formundan gelen verilerle dinamik olarak birleştirilerek kullanıcıya sunulacaktır.

---

### 3.1 `AI_GUIDELINES_LANGUAGES_TR.md` (Türkçe Anayasa Şablonu)
```markdown
# Dile Özel Yapay Zeka Kodlama ve Mimari Kuralları (AI_GUIDELINES_LANGUAGES_TR.md)

Bu doküman, genel yazılım dilleri (Rust, TypeScript, Python, C++, Go) ve Donanım Tanımlama Dilleri (Verilog, VHDL) için yapay zeka kodlama asistanlarının uyması gereken dile özel kısıtlamaları, güvenlik kurallarını ve mimari sınırları tanımlar.

---

## 1. Genel Yazılım Dilleri Kısıtlama Kuralları

### 1.1 Rust
- **Unsafe Kullanım Yasakları:** Yapay zekanın bellek yönetiminde kolay çözüme kaçmasını önlemek için `unsafe` blok kullanımı kesinlikle yasaktır (açık kullanıcı izni hariç).
- **Gereksiz Clone Çağrıları:** Performans israfını önlemek adına gereksiz `.clone()` kullanımı engellenmeli; sahiplik (ownership) ve borçlanma (borrowing) mekanizmaları doğru kurgulanmalıdır.
- **Cargo Workspace Modülerliği:** Proje `crates/` altında bağımsız modüllere bölünmeli, 800 satır kuralı sıkı şekilde uygulanmalıdır.

### 1.2 TypeScript / JavaScript
- **Strict Typing (No `any`):** `any` veri tipi kullanımı kesinlikle yasaktır. Tüm arayüzler (interface) ve tipler (type) açıkça tanımlanmalıdır.
- **Async Error Handling:** `async/await` yapılarında yakalanmamış promise hataları (unhandled rejections) engellenmeli, `try/catch` blokları zorunlu tutulmalıdır.
- **Bileşen Modülerliği:** React/Vue/Node.js dosyalarında UI ve iş mantığı (business logic) ayrılmalı, tek dosyada 800 satır aşılmamalıdır.

### 1.3 Python
- **Type Hints Zorunluluğu:** Tüm fonksiyon parametreleri ve dönüş tipleri için `typing` modülü ile tip ipuçları verilmelidir.
- **Global Değişken Yasakları:** Fonksiyonlar arası bağımlılığı artıran global değişken kullanımı ve `from module import *` yapısı yasaktır.
- **Modüler Yapı:** Monolitik `.py` betikleri yerine paket/modül mimarisi kurgulanmalıdır.

### 1.4 C++
- **Ham İşaretçi (Raw Pointer) Yasağı:** Manuel `new` / `delete` kullanımı yasaktır. Bellek yönetimi `std::unique_ptr` ve `std::shared_ptr` ile yapılmalıdır.
- **Döküm (Cast) Güvenliği:** Tehlikeli `reinterpret_cast` kullanımı engellenmeli, `static_cast` veya `dynamic_cast` tercih edilmelidir.
- **Başlık (Header) İzolasyonu:** `.h` / `.hpp` dosyalarında tanım karmaşası önlenmeli, 800 satır kuralına uyulmalıdır.

### 1.5 Go
- **Hata Denetim Zorunluluğu:** Dönülen `err` değerlerinin göz ardı edilmesi (`_` ile geçiştirilmesi) yasaktır.
- **Goroutine Sızıntı Önlemleri:** Kanal (channel) kapatma ve context yönetimi eksiksiz yapılmalıdır.

---

## 2. Donanım Tanımlama Dilleri (HDL: Verilog & VHDL) Kuralları

Donanım tasarımı dijital sentez ve zamanlama kısıtlarına dayandığı için yapay zekanın yazılım dillerindeki gibi serbest hareket etmesi donanım sentezleme hatalarına (synthesis errors) veya yarış durumlarına (race conditions) yol açar.

### 2.1 Verilog / SystemVerilog
- **Atama Kuralları (Blocking vs. Non-blocking):**
  - Ardışıl Mantık (Sequential Logic - `always @(posedge clk)`): Kesinlikle **Non-blocking (`<=`)** atama kullanılmalıdır.
  - Kombinasyonel Mantık (`always @(*)`): Kesinlikle **Blocking (`=`)** atama kullanılmalıdır. Aynı blok içinde ikisini karıştırmak kesinlikle yasaktır!
- **Mandal (Latch) Önleme:** Kombinasyonel bloklardaki `if/else` ve `case` ifadeleri tüm olasılıkları kapsamalı (`default` eklenmeli), eksik tanımlama nedeniyle istem dışı şeffaf latch oluşumu engellenmelidir.
- **Modül Sınırları ve 800 Satır Kuralı:** Her Verilog modülü ayrı bir `.v` veya `.sv` dosyasında bulunmalı, top-level modül altında temiz bir hiyerarşi kurgulanmalıdır.
- **Testbench Ayrımı:** Test kodları ana donanım modülünden ayrı `tb_*.v` dosyalarında üretilmeli ve self-checking assertions içermelidir.

### 2.2 VHDL
- **Varlık / Mimari (Entity / Architecture) Ayrımı:** Her VHDL varlığı kendi `.vhd` dosyasında yer almalıdır. Ortak veri tipleri ve sabitler paket dosyalarında (`*_pkg.vhd`) toplanmalıdır.
- **Duyarlılık Listeleri (Sensitivity Lists):** Kombinasyonel süreçlerde (`process`) okunan TÜM sinyaller duyarlılık listesine eklenmelidir. Ardışıl süreçlerde yalnızca `rising_edge(clock)` ve asenkron sıfırlama yer almalıdır.
- **Güçlü Tip Güvenliği:** Standart dışı `std_logic_unsigned` kütüphaneleri yerine `ieee.numeric_std` kütüphanesi ve `signed`/`unsigned` tipleri zorunlu tutulmalıdır.

```

---

### 3.2 `AI_GUIDELINES_LANGUAGES_EN.md` (İngilizce Anayasa Şablonu)
```markdown
# Language-Specific AI Coding & Architectural Rules (AI_GUIDELINES_LANGUAGES_EN.md)

This document specifies language-specific constraints, safety enforcement rules, and architectural boundaries for AI coding assistants working across general software languages (Rust, TypeScript, Python, C++, Go) and Hardware Description Languages (Verilog, VHDL).

---

## 1. General Software Language Constraints

### 1.1 Rust
- **Ban on `unsafe`:** Using `unsafe` blocks is strictly forbidden unless explicitly requested by the user.
- **Restrict Unnecessary `.clone()`:** Prevent memory allocation waste; strictly enforce Rust ownership and borrowing mechanics.
- **Cargo Workspace Modularity:** Organize projects into crates under `crates/` and enforce the 800-line limit per file.

### 1.2 TypeScript / JavaScript
- **Strict Typing (No `any`):** The `any` type is prohibited. Explicit interfaces and type definitions are required.
- **Async Error Handling:** Unhandled promise rejections are forbidden; `try/catch` blocks are mandatory in `async/await`.
- **Component Isolation:** Separate UI and business logic; enforce the 800-line cap per file.

### 1.3 Python
- **Mandatory Type Hints:** All function parameters and return types must use explicit `typing` annotations.
- **Global State Prohibition:** Global variables and `from module import *` wildcards are forbidden.

### 1.4 C++
- **Raw Pointer Ban:** Manual `new`/`delete` is forbidden. Use `std::unique_ptr` and `std::shared_ptr`.
- **Casting Safety:** Ban `reinterpret_cast`; require `static_cast` or `dynamic_cast`.

### 1.5 Go
- **Explicit Error Checks:** Ignoring returned `err` values (e.g. `_ = fn()`) is strictly prohibited.
- **Goroutine Leak Prevention:** Mandatory channel closure and `context.Context` management.

---

## 2. Hardware Description Languages (HDL: Verilog & VHDL)

Hardware synthesis and timing constraints require strict rules to prevent hardware race conditions or unintentional latch inference.

### 2.1 Verilog / SystemVerilog
- **Assignment Rules:**
  - Sequential Logic (`always @(posedge clk)`): **Non-blocking (`<=`)** assignments are strictly mandatory.
  - Combinational Logic (`always @(*)`): **Blocking (`=`)** assignments are strictly mandatory. Mixing both in one block is banned.
- **Latch Prevention:** All `if/else` and `case` branches in combinational blocks must be fully specified (with `default`) to avoid unintended transparent latches.
- **Module Hierarchy:** One module per `.v`/`.sv` file; maximum 800 lines per file.
- **Testbenches:** Isolated testbenches in `tb_*.v` files with self-checking assertions.

### 2.2 VHDL
- **Entity / Architecture Separation:** One entity per `.vhd` file; shared constants and types in package files (`*_pkg.vhd`).
- **Sensitivity Lists:** Combinational `process` statements must list ALL read signals. Sequential processes rely strictly on `rising_edge(clk)`.
- **Strong Typing:** Use standard `ieee.numeric_std` library with `signed`/`unsigned` types instead of legacy non-standard packages.

```

---

### 3.3 `MEMORY_BANK_TEMPLATES_TR.md` (Türkçe Hafıza Şablonları)
```markdown
# Memory Bank Dosya Taslakları (Türkçe - MEMORY_BANK_TEMPLATES_TR.md)

Projenizin `.memory_bank/` klasöründe yer alması gereken 6 temel Markdown dosyasının hazır şablonları aşağıdadır:

---

### 1. `projectbrief.md`
```markdown
# Proje Özeti ve Vizyonu
- **Proje Adı:** [PROJE_ADI]
- **Temel Amaç:** [Projenin ana varlık nedeni]
- **Çekirdek Hedefler:**
  1. [Hedef 1]
  2. [Hedef 2]
```

### 2. `productContext.md`
```markdown
# Ürün Bağlamı ve Kullanıcı Deneyimi
- **Çözülen Problem:** [Bu yazılım hangi sorunu çözüyor?]
- **Hedef Kullanıcı Kitlesi:** [Kullanıcı profili]
- **Kritik İşlevsel Beklentiler:**
  - [Beklenti 1]
  - [Beklenti 2]
```

### 3. `systemPatterns.md`
```markdown
# Sistem Mimarisi ve Tasarım Kalıpları
- **Mimari Yapı:** [Örn: Modüler Crate Mimarisi / Microservices]
- **Kullanılan Tasarım Kalıpları:** [Örn: Factory, Repository, Adapter]
- **Modüller Arası Veri Akışı:**
  - [Modül A] -> [Modül B] (Arayüz/Interface üzerinden)
```

### 4. `techContext.md`
```markdown
# Teknoloji Yığını ve Ortam Kısıtları
- **Ana Dil ve Sürüm:** [Örn: Rust 1.75]
- **Temel Bağımlılıklar (Crates/Packages):** [Kütüphaneler]
- **Derleme ve Çalıştırma Komutları:** [Örn: cargo build --release]
- **Kısıtlamalar:** [800 satır sınırı, unsafe yasak]
```

### 5. `activeContext.md`
```markdown
# Aktif Oturum Bağlamı
- **Mevcut Odak Noktası:** [Şu an geliştirilen özellik veya düzeltilen bug]
- **Son Yapılan Değişiklikler:**
  - [Değişiklik 1]
  - [Değişiklik 2]
- **Sonraki Adımlar:**
  1. [Adım 1]
  2. [Adım 2]
```

### 6. `progress.md`
```markdown
# İlerleme Durumu ve İnceleme Raporu
- **Tamamlanan Modüller:**
  - [x] [Modül 1]
  - [x] [Modül 2]
- **Çalışan Mevcut Durum:** [Sistem kararlı mı?]
- **Teknik Borçlar ve Bilinen Hatalar:**
  - [ ] [Teknik Borç 1]
```

```

---

### 3.4 `MEMORY_BANK_TEMPLATES_EN.md` (İngilizce Hafıza Şablonları)
```markdown
# Memory Bank Templates (English - MEMORY_BANK_TEMPLATES_EN.md)

Below are the 6 core Markdown templates required inside your project's `.memory_bank/` directory:

---

### 1. `projectbrief.md`
```markdown
# Project Brief & Vision
- **Project Name:** [PROJECT_NAME]
- **Core Purpose:** [Primary objective of the project]
- **Key Goals:**
  1. [Goal 1]
  2. [Goal 2]
```

### 2. `productContext.md`
```markdown
# Product Context & UX
- **Problem Solved:** [What problem does this software solve?]
- **Target Audience:** [User profiles]
- **Key Functional Expectations:**
  - [Expectation 1]
  - [Expectation 2]
```

### 3. `systemPatterns.md`
```markdown
# System Architecture & Design Patterns
- **Architecture Type:** [e.g., Modular Crate Architecture / Microservices]
- **Design Patterns:** [e.g., Factory, Repository, Adapter]
- **Data Flow Between Modules:**
  - [Module A] -> [Module B] (via explicit interface)
```

### 4. `techContext.md`
```markdown
# Tech Stack & Environment Constraints
- **Primary Language & Version:** [e.g., Rust 1.75]
- **Key Dependencies (Crates/Packages):** [Libraries]
- **Build & Run Commands:** [e.g., cargo build --release]
- **Constraints:** [800 line limit, no unsafe]
```

### 5. `activeContext.md`
```markdown
# Active Session Context
- **Current Focus:** [Feature currently under development or bug being fixed]
- **Recent Changes:**
  - [Change 1]
  - [Change 2]
- **Next Steps:**
  1. [Step 1]
  2. [Step 2]
```

### 6. `progress.md`
```markdown
# Progress Status & Known Debts
- **Completed Modules:**
  - [x] [Module 1]
  - [x] [Module 2]
- **Current Working Status:** [Is the system stable?]
- **Technical Debts & Known Bugs:**
  - [ ] [Debt 1]
```

```

---

### 3.5 `IDE_RULES_TEMPLATES-v3.md` (Agent & IDE Yükleyici Şablonları)
```markdown
# AI Editör & Agent Otomatik Yönlendirme Şablonları (IDE & Agent Rules - v3)

Bu şablonlar, kullandığınız yapay zeka kodlama araçlarının (Cursor, Windsurf, VS Code + Cline, Claude CLI ve AntiGravity) projenizin `AI_GUIDELINES.md` kurallarını ve `.memory_bank/` yapısını **her yeni oturumda otomatik olarak yüklemesini** sağlar.

---

## 1. AntiGravity Agent İçin (`ANTIGRAVITY.md` veya `.antigravityrules`)

AntiGravity AI Agent projenizin kök dizininde `ANTIGRAVITY.md` veya `.antigravityrules` dosyasını otomatik sistem talimatı olarak okur. Projenizin kök dizinine **`ANTIGRAVITY.md`** adında bir dosya oluşturup içine şunları yapıştırın:

```markdown
# AntiGravity AI Agent Protocol

## Mandatory Context Loading
- ALWAYS read and strictly apply `./AI_GUIDELINES.md` before analyzing code or writing changes.
- Inspect `./.memory_bank/activeContext.md` and `./.memory_bank/systemPatterns.md` prior to executing any task.

## Execution Restrictions
- **800-Line Rule:** Never exceed 800 lines in any single code file. Split into clean sub-modules when approaching 700 lines.
- **Modular Architecture:** Enforce strict single responsibility. Avoid monolithic or "God Object" designs.
- **Documentation Self-Scoring:** Add thorough docstrings/JSDoc for public structures and self-score quality (min 8/10 required).
- **Combination Testing:** Generate comprehensive edge-case combination tests for every new feature.
- **Language Safety:** Enforce language-specific safety rules (e.g., Rust no unsafe/clone, TypeScript no any, Verilog non-blocking `<=`).

## Session Synchronization
- Upon task completion, update `./.memory_bank/activeContext.md` and `./.memory_bank/progress.md` with the latest status.
```

---

## 2. Claude CLI İçin (`CLAUDE.md`)

CMD / Terminal üzerinde `claude` komutu çalıştırıldığında projenin kök dizinindeki `CLAUDE.md` otomatik yüklenir. Proje köküne **`CLAUDE.md`** ekleyin:

```markdown
# Claude CLI Project Guidelines

- Read and follow `./AI_GUIDELINES.md` strictly.
- Inspect `./.memory_bank/activeContext.md` before modifying any files.
- Maintain the 800-line per file limit and full modularity.
- Require self-evaluated documentation scores (>= 8/10).
- Update `.memory_bank/activeContext.md` and `progress.md` after completing work.
```

---

## 3. Cursor IDE İçin (`.cursorrules`)

Proje kök dizinine **`.cursorrules`** ekleyin:

```text
Always read and strictly follow the architecture and coding guidelines in ./AI_GUIDELINES.md before generating any code.
Inspect .memory_bank/activeContext.md and .memory_bank/systemPatterns.md before task execution.
Enforce 800-line limit per file, mandatory modularity, documentation scoring (>=8/10), and combination tests.
Sync .memory_bank/activeContext.md and progress.md upon completion.
```

---

## 4. Windsurf IDE İçin (`.windsurfrules`)

Proje kök dizinine **`.windsurfrules`** ekleyin:

```text
Rule 1: Adhere strictly to the project rules in ./AI_GUIDELINES.md.
Rule 2: Read .memory_bank/activeContext.md prior to code modification.
Rule 3: Enforce maximum 800 lines per file and single responsibility principle.
Rule 4: Require self-evaluated documentation scores (>= 8) for public methods.
```

---

## 5. VS Code + Cline / Roo Code İçin (`.clinerules`)

Proje kök dizinine **`.clinerules`** ekleyin:

```text
Context Loading: Always start by analyzing ./AI_GUIDELINES.md and .memory_bank/activeContext.md.
Code Quality: Maintain strict modularity and <800 lines/file limit.
Verification: Include edge-case combination tests for all new functions.
```

---

## 6. GitHub Copilot Instructions (`.github/copilot-instructions.md`)

Projede **`.github/copilot-instructions.md`** yoluna ekleyin:

```markdown
# GitHub Copilot Custom Instructions
- Follow all rules defined in `AI_GUIDELINES.md`.
- Never produce code files exceeding 800 lines.
- Always generate unit/combination tests for code additions.
```

```

---

### 3.6 `check_guidelines.py` (Statik Denetçi Betiği)
```python
#!/usr/bin/env python3
"""
AI Guidelines Auto-Checker Script
Verifies codebases against AI_GUIDELINES rules:
1. File line count limit (max 800 lines).
2. Presence of AI_GUIDELINES.md in root.
3. Presence of .memory_bank/ directory with 6 core files.
4. Language-specific safety rules (Rust unsafe, TS any, Verilog assignments, C++ raw new/delete).
"""

import os
import sys
import re

MAX_LINES = 800
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
            if re.search(r":\s*any", line) and not line.strip().startswith("//"):
                issues.append(f"[TYPESCRIPT VIOLATION] {rel_path}:{idx} -> 'any' tipi kullanımı tespit edildi!")
        
        # C++ Checks
        elif ext in [".cpp", ".hpp", ".cc", ".cxx"]:
            if re.search(r"new\s+\w+", line) and "std::" not in line and not line.strip().startswith("//"):
                issues.append(f"[C++ VIOLATION] {rel_path}:{idx} -> Ham 'new' kullanımı (Smart pointer tercih edin)!")

        # Verilog / SystemVerilog Checks
        elif ext in [".v", ".sv"]:
            if "always @" in line or "always_ff" in line:
                # Basic check for non-blocking in sequential logic context
                pass
            if re.search(r"always\s*@\s*\(\s*posedge", line, re.IGNORECASE):
                # check next lines for blocking assignment '='
                pass

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
            rel_path = os.path.relpath(full_path, root_dir)
            file_issues = analyze_file(full_path)
            all_errors.extend(file_issues)

    if all_errors:
        print("
❌ AI GUIDELINES İHLALLERİ TESPİT EDİLDİ:
")
        for err in all_errors:
            print(f"  • {err}")
        print("
⚠️ Lütfen ihlalleri düzelttikten sonra tekrar deneyin.")
        sys.exit(1)
    else:
        print("
✅ TÜM DENETİMLER BAŞARIYLA GEÇTİ! Kod tabanı AI Guidelines kurallarına uygun.")
        sys.exit(0)

if __name__ == "__main__":
    main()

```

---

### 3.7 `pre-commit-hook.sh` (Git Kancası Betiği)
```bash
#!/usr/bin/env bash
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

```

---

### 3.8 `ai-guidelines-ci.yml` (GitHub Actions CI/CD)
```yaml
name: AI Guidelines Verification

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

```

---

### 3.9 `AUDIT_PROMPT.md` (Frontier Model Denetim İstemi)
```markdown
# Frontier Model Periyodik Denetim İstem Şablonları (AUDIT_PROMPT.md)

Büyük modüller tamamlandığında veya belirli geliştirme periyotlarının sonunda projenizi Claude 3.5 Sonnet / Claude Opus / GPT-4o gibi güçlü modellerle denetlerken aşağıdaki promptları kullanabilirsiniz.

---

## 🇹🇷 Türkçe Denetim İstem Şablonu

```text
PROJE PERİYODİK DENETİM VE TEKNİK BORÇ TARAMA TALİMATI

Lütfen projemizin tüm kod tabanını ve modüllerini detaylı bir şekilde denetle. 

DENETİM HEDEFLERİ VE KURALLARI:
1. Kök dizindeki `AI_GUIDELINES.md` kuralları ile mevcut kodu karşılaştır.
2. 800 satırı aşan veya aşmaya yaklaşan monolithic/God Object dosyaları tespit et.
3. Mimari kısıtlamalara aykırı yapıları, spagetti kod sapmalarını ve mantık hatalarını belirle.
4. Dile özel güvenlik ve donanım kurallarını incele (ör. Rust unsafe kullanımı, TypeScript any kullanımı, Verilog/VHDL hatalı atamaları veya mandal/latch oluşumu).
5. Dokümantasyonu eksik veya puanı düşük kalan public yapıları listele.

ÖNEMLİ:
- Doğrudan projedeki kodları DEĞİŞTİRME.
- Bulduğun tüm eksikleri, riskleri ve çözüm önerilerini `audit-report.md` adında yeni bir Markdown raporu olarak sun.
- Raporda her bulgu için ilgili dosya yolunu ve satır aralığını açıkça belirt.
```

---

## 🇬🇧 English Audit Prompt Template

```text
PERIODIC CODEBASE AUDIT & TECHNICAL DEBT SCAN INSTRUCTIONS

Please perform a rigorous audit of the entire codebase and architectural modules.

AUDIT SCOPE & RULES:
1. Compare the codebase against the standards defined in `AI_GUIDELINES.md`.
2. Identify any monolithic / God Object files exceeding or nearing the 800-line threshold.
3. Detect architectural drift, spaghetti code patterns, and logic vulnerabilities.
4. Verify language-specific safety rules (e.g., raw pointer hazards, unhandled promises, Verilog/VHDL blocking/non-blocking assignment bugs or unintended latches).
5. Flag any public components lacking self-evaluated documentation or adequate test coverage.

CRITICAL DIRECTIVE:
- DO NOT modify the codebase directly.
- Output all findings, security risks, and refactoring action steps into a new Markdown file named `audit-report.md`.
- Cite exact file paths and line numbers for each issue identified.
```

```

---

### 3.10 `GITIGNORE_TEMPLATE.md` (Git Yapılandırması)
```markdown
# AI Geliştirme Projeleri İçin Standart .gitignore Şablonu

Projenizin `.gitignore` dosyasına aşağıdaki kuralları ekleyerek geçici denetim raporlarının ve AI çalışma dosyalarının versiyon kontrolüne girmesini önleyebilir, ancak Memory Bank klasörünü koruyabilirsiniz:

```gitignore
# ==========================================
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
*.o
*.elf
*.bit
*.mcs
```

```

---

## 🛠️ 4. GELİŞTİRME VE UYGULAMA YOL HARİTASI (GEMINI & ANTIGRAVITY İÇİN)

1. **Aşama 1: Proje Kurulumu ve Tip Tanımları**
   - Next.js 14 projesini `shadcn-ui`, `lucide-react`, `jszip` kütüphaneleriyle başlatın.
   - `types/wizard.ts` içinde form state ve şablon tiplerini oluşturun.

2. **Aşama 2: Dynamic Template Replacer Motoru (`lib/templateEngine.ts`)**
   - Form verilerini (`project_name`, `tech_stack`, `max_lines` vb.) alıp yukarıdaki 10 şablondaki `[PLACEHOLDER]` alanlarını Regex ile değiştiren fonksiyonu yazın.

3. **Aşama 3: 5 Adımlı Wizard UI Bileşenleri (`components/wizard/`)**
   - Stepper bileşeni ve Form adımlarını (`Step1Platform`, `Step2Constraints`, `Step3MemoryBank`, `Step4Automation`, `Step5Export`) inşa edin.

4. **Aşama 4: ZIP ve CLI Üretim Servisleri (`lib/exporter.ts`)**
   - `JSZip` ile seçilen dosyaları projenin gerçek klasör hiyerarşisine (`.memory_bank/`, `scripts/`, `.github/workflows/`) yerleştirip `.zip` olarak indirme servisini yazın.

5. **Aşama 5: Test ve Yayınlama**
   - Üretilen zip paketinin ve betiklerin geçerliliğini doğrulayın.

---
*Vibe Governor Master Project Specification — Single-File Edition*
