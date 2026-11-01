import type { CodingLanguage, ProjectConstraints, WizardFormData } from "../../types/wizard";

/**
 * AI_GUIDELINES.md builder (spec §3.1 / §3.2). Language sections and individual
 * rules are included only when the language is selected and the related step-2
 * safety switch is on. Placeholders: {{MAX_LINES}}, {{MAX_LINES_THRESHOLD}}, {{DOC_SCORE}}.
 */

interface Rule {
  toggle?: keyof ProjectConstraints;
  tr: string;
  en: string;
}

interface Section {
  language: CodingLanguage;
  titleTr: string;
  titleEn: string;
  rules: Rule[];
}

const SOFTWARE_SECTIONS: Section[] = [
  {
    language: "Rust",
    titleTr: "Rust",
    titleEn: "Rust",
    rules: [
      {
        toggle: "rustNoUnsafe",
        tr: "**Unsafe Kullanım Yasakları:** Yapay zekanın bellek yönetiminde kolay çözüme kaçmasını önlemek için `unsafe` blok kullanımı kesinlikle yasaktır (açık kullanıcı izni hariç).",
        en: "**Ban on `unsafe`:** Using `unsafe` blocks is strictly forbidden unless explicitly requested by the user.",
      },
      {
        toggle: "rustLimitClone",
        tr: "**Gereksiz Clone Çağrıları:** Performans israfını önlemek adına gereksiz `.clone()` kullanımı engellenmeli; sahiplik (ownership) ve borçlanma (borrowing) mekanizmaları doğru kurgulanmalıdır.",
        en: "**Restrict Unnecessary `.clone()`:** Prevent memory allocation waste; strictly enforce Rust ownership and borrowing mechanics.",
      },
      {
        tr: "**Cargo Workspace Modülerliği:** Proje `crates/` altında bağımsız modüllere bölünmeli, {{MAX_LINES}} satır kuralı sıkı şekilde uygulanmalıdır.",
        en: "**Cargo Workspace Modularity:** Organize projects into crates under `crates/` and enforce the {{MAX_LINES}}-line limit per file.",
      },
    ],
  },
  {
    language: "TypeScript",
    titleTr: "TypeScript / JavaScript",
    titleEn: "TypeScript / JavaScript",
    rules: [
      {
        toggle: "tsNoAny",
        tr: "**Strict Typing (No `any`):** `any` veri tipi kullanımı kesinlikle yasaktır. Tüm arayüzler (interface) ve tipler (type) açıkça tanımlanmalıdır.",
        en: "**Strict Typing (No `any`):** The `any` type is prohibited. Explicit interfaces and type definitions are required.",
      },
      {
        tr: "**Async Error Handling:** `async/await` yapılarında yakalanmamış promise hataları (unhandled rejections) engellenmeli, `try/catch` blokları zorunlu tutulmalıdır.",
        en: "**Async Error Handling:** Unhandled promise rejections are forbidden; `try/catch` blocks are mandatory in `async/await`.",
      },
      {
        tr: "**Bileşen Modülerliği:** React/Vue/Node.js dosyalarında UI ve iş mantığı (business logic) ayrılmalı, tek dosyada {{MAX_LINES}} satır aşılmamalıdır.",
        en: "**Component Isolation:** Separate UI and business logic; enforce the {{MAX_LINES}}-line cap per file.",
      },
    ],
  },
  {
    language: "Python",
    titleTr: "Python",
    titleEn: "Python",
    rules: [
      {
        toggle: "pyTypeHints",
        tr: "**Type Hints Zorunluluğu:** Tüm fonksiyon parametreleri ve dönüş tipleri için `typing` modülü ile tip ipuçları verilmelidir.",
        en: "**Mandatory Type Hints:** All function parameters and return types must use explicit `typing` annotations.",
      },
      {
        toggle: "pyNoGlobalState",
        tr: "**Global Değişken Yasakları:** Fonksiyonlar arası bağımlılığı artıran global değişken kullanımı ve `from module import *` yapısı yasaktır.",
        en: "**Global State Prohibition:** Global variables and `from module import *` wildcards are forbidden.",
      },
      {
        tr: "**Modüler Yapı:** Monolitik `.py` betikleri yerine paket/modül mimarisi kurgulanmalıdır.",
        en: "**Modular Structure:** Prefer package/module architecture over monolithic `.py` scripts.",
      },
    ],
  },
  {
    language: "C++",
    titleTr: "C++",
    titleEn: "C++",
    rules: [
      {
        toggle: "cppNoRawPointers",
        tr: "**Ham İşaretçi (Raw Pointer) Yasağı:** Manuel `new` / `delete` kullanımı yasaktır. Bellek yönetimi `std::unique_ptr` ve `std::shared_ptr` ile yapılmalıdır.",
        en: "**Raw Pointer Ban:** Manual `new`/`delete` is forbidden. Use `std::unique_ptr` and `std::shared_ptr`.",
      },
      {
        toggle: "cppNoRawPointers",
        tr: "**Döküm (Cast) Güvenliği:** Tehlikeli `reinterpret_cast` kullanımı engellenmeli, `static_cast` veya `dynamic_cast` tercih edilmelidir.",
        en: "**Casting Safety:** Ban `reinterpret_cast`; require `static_cast` or `dynamic_cast`.",
      },
      {
        tr: "**Başlık (Header) İzolasyonu:** `.h` / `.hpp` dosyalarında tanım karmaşası önlenmeli, {{MAX_LINES}} satır kuralına uyulmalıdır.",
        en: "**Header Isolation:** Keep `.h`/`.hpp` files free of definition sprawl and within the {{MAX_LINES}}-line limit.",
      },
    ],
  },
  {
    language: "Go",
    titleTr: "Go",
    titleEn: "Go",
    rules: [
      {
        toggle: "goCheckErrors",
        tr: "**Hata Denetim Zorunluluğu:** Dönülen `err` değerlerinin göz ardı edilmesi (`_` ile geçiştirilmesi) yasaktır.",
        en: "**Explicit Error Checks:** Ignoring returned `err` values (e.g. `_ = fn()`) is strictly prohibited.",
      },
      {
        toggle: "goCheckErrors",
        tr: "**Goroutine Sızıntı Önlemleri:** Kanal (channel) kapatma ve context yönetimi eksiksiz yapılmalıdır.",
        en: "**Goroutine Leak Prevention:** Mandatory channel closure and `context.Context` management.",
      },
    ],
  },
  {
    language: "C",
    titleTr: "C",
    titleEn: "C",
    rules: [
      {
        toggle: "cBanUnsafeFunctions",
        tr: "**Güvensiz Fonksiyon Yasağı:** Tampon taşmasına açık `gets`, `strcpy`, `strcat`, `sprintf`, `vsprintf` kullanımı yasaktır; `fgets`, `strncpy`/`strlcpy`, `snprintf` gibi sınır denetimli karşılıkları kullanılmalıdır.",
        en: "**Unsafe Function Ban:** Overflow-prone `gets`, `strcpy`, `strcat`, `sprintf`, `vsprintf` are forbidden; use bounded alternatives such as `fgets`, `strncpy`/`strlcpy`, `snprintf`.",
      },
      {
        tr: "**Bellek Yönetimi:** Her `malloc`/`calloc`/`realloc` dönüşü `NULL` için denetlenmeli; her ayırmanın tek bir sahibi ve karşılık gelen tek bir `free` çağrısı olmalıdır.",
        en: "**Memory Management:** Check every `malloc`/`calloc`/`realloc` result for `NULL`; every allocation has exactly one owner and one matching `free`.",
      },
      {
        tr: "**Başlık Koruması:** Her `.h` dosyası include guard (`#ifndef/#define`) veya `#pragma once` içermeli; dosyalar {{MAX_LINES}} satırı geçmemelidir.",
        en: "**Header Guards:** Every `.h` file uses an include guard (`#ifndef/#define`) or `#pragma once`; files stay under {{MAX_LINES}} lines.",
      },
    ],
  },
  {
    language: "C#",
    titleTr: "C#",
    titleEn: "C#",
    rules: [
      {
        toggle: "csNoDynamic",
        tr: "**`dynamic` Yasağı:** Derleme zamanı tip güvenliğini kaldıran `dynamic` kullanılmamalı; generic tipler ve arayüzler tercih edilmelidir.",
        en: "**No `dynamic`:** Do not use `dynamic`, which removes compile-time type safety; prefer generics and interfaces.",
      },
      {
        toggle: "csNoAsyncVoid",
        tr: "**`async void` Yasağı:** Olay işleyiciler (event handler) dışında asenkron metotlar `Task`/`Task<T>` döndürmelidir; aksi halde hatalar yakalanamaz.",
        en: "**No `async void`:** Except for event handlers, async methods must return `Task`/`Task<T>` so exceptions can be observed.",
      },
      {
        tr: "**Nullable ve Kaynak Yönetimi:** Projede `<Nullable>enable</Nullable>` açık olmalı; `IDisposable` nesneler `using` ile yönetilmelidir.",
        en: "**Nullability & Resources:** Enable `<Nullable>enable</Nullable>`; manage `IDisposable` objects with `using`.",
      },
    ],
  },
  {
    language: "Java",
    titleTr: "Java",
    titleEn: "Java",
    rules: [
      {
        toggle: "javaExceptionHandling",
        tr: "**İstisna Disiplini:** Boş `catch` blokları ile `Exception`, `RuntimeException`, `Throwable` gibi genel yakalamalar yasaktır; özel istisna tipleri yakalanmalı ve gerçekten işlenmelidir.",
        en: "**Exception Discipline:** Empty `catch` blocks and generic catches of `Exception`, `RuntimeException`, `Throwable` are forbidden; catch specific types and handle them.",
      },
      {
        toggle: "javaNoSystemOut",
        tr: "**Loglama:** `System.out/err.println` ve `printStackTrace()` yerine bir loglama çatısı (SLF4J, `java.util.logging`) kullanılmalıdır.",
        en: "**Logging:** Use a logging framework (SLF4J, `java.util.logging`) instead of `System.out/err.println` and `printStackTrace()`.",
      },
      {
        tr: "**Paket Yapısı:** Dosya başına tek public sınıf ve katmanlı paket yapısı kurulmalı; sınıflar {{MAX_LINES}} satırı geçmemelidir.",
        en: "**Package Structure:** One public class per file in a layered package structure; classes stay under {{MAX_LINES}} lines.",
      },
    ],
  },
  {
    language: "JavaScript",
    titleTr: "JavaScript",
    titleEn: "JavaScript",
    rules: [
      {
        toggle: "jsNoVar",
        tr: "**`var` Yasağı:** Değişkenler `const` (varsayılan) veya `let` ile tanımlanmalı; fonksiyon kapsamlı ve hoisting'e açık `var` kullanılmaz.",
        en: "**No `var`:** Declare variables with `const` (default) or `let`; never use function-scoped, hoisted `var`.",
      },
      {
        toggle: "jsStrictEquality",
        tr: "**Katı Eşitlik:** Tip dönüştürmeli `==`/`!=` yerine her zaman `===`/`!==` kullanılmalıdır.",
        en: "**Strict Equality:** Always use `===`/`!==` instead of coercing `==`/`!=`.",
      },
      {
        tr: "**Async ve Modüler Yapı:** `async/await` çağrıları `try/catch` ile korunmalı; kod ES modüllerine bölünmeli ve {{MAX_LINES}} satır sınırına uyulmalıdır.",
        en: "**Async & Modules:** Guard `async/await` with `try/catch`; split code into ES modules within the {{MAX_LINES}}-line limit.",
      },
    ],
  },
  {
    language: "Kotlin",
    titleTr: "Kotlin",
    titleEn: "Kotlin",
    rules: [
      {
        toggle: "ktNoForceUnwrap",
        tr: "**`!!` Yasağı:** Null güvenliğini delen `!!` operatörü yerine `?.`, `?:`, `requireNotNull` / `checkNotNull` kullanılmalıdır.",
        en: "**No `!!`:** Replace the null-safety-breaking `!!` operator with `?.`, `?:`, `requireNotNull` / `checkNotNull`.",
      },
      {
        toggle: "ktNoGlobalScope",
        tr: "**Yapısal Eşzamanlılık:** `GlobalScope` yasaktır; coroutine'ler yaşam döngüsüne bağlı bir `CoroutineScope` (ör. `viewModelScope`) içinde başlatılmalıdır.",
        en: "**Structured Concurrency:** `GlobalScope` is forbidden; launch coroutines in a lifecycle-bound `CoroutineScope` (e.g. `viewModelScope`).",
      },
      {
        tr: "**Değişmezlik:** Varsayılan olarak `val` ve salt-okunur koleksiyonlar kullanılmalıdır.",
        en: "**Immutability:** Default to `val` and read-only collections.",
      },
    ],
  },
  {
    language: "Swift",
    titleTr: "Swift",
    titleEn: "Swift",
    rules: [
      {
        toggle: "swiftNoForceUnwrap",
        tr: "**Zorla Açma Yasağı:** `!` ile zorla açma (force unwrap), `try!` ve `as!` yasaktır; `if let`, `guard let`, `??` ve `do/catch` kullanılmalıdır.",
        en: "**No Force Unwrapping:** Force unwrap with `!`, `try!` and `as!` are forbidden; use `if let`, `guard let`, `??` and `do/catch`.",
      },
      {
        tr: "**Bellek Döngüleri:** Closure'larda güçlü referans döngüsünü önlemek için `[weak self]` / `[unowned self]` kullanılmalıdır.",
        en: "**Retain Cycles:** Use `[weak self]` / `[unowned self]` in closures to avoid strong reference cycles.",
      },
      {
        tr: "**Protokol Odaklı Yapı:** Büyük tipler `extension` ve protokollere bölünmeli; dosyalar {{MAX_LINES}} satırı geçmemelidir.",
        en: "**Protocol-Oriented Design:** Split large types into extensions and protocols; files stay under {{MAX_LINES}} lines.",
      },
    ],
  },
  {
    language: "PHP",
    titleTr: "PHP",
    titleEn: "PHP",
    rules: [
      {
        toggle: "phpStrictTypes",
        tr: "**Katı Tipler:** Her PHP dosyası `declare(strict_types=1);` ile başlamalı; parametre ve dönüş tipleri bildirilmelidir.",
        en: "**Strict Types:** Every PHP file starts with `declare(strict_types=1);` and declares parameter and return types.",
      },
      {
        toggle: "phpNoEval",
        tr: "**`eval` Yasağı:** Kod enjeksiyonuna yol açan `eval()` kullanımı kesinlikle yasaktır.",
        en: "**No `eval`:** `eval()` is strictly forbidden (code injection risk).",
      },
      {
        tr: "**SQL Güvenliği ve Standart:** Sorgular yalnızca hazırlanmış ifadelerle (PDO prepared statements) yazılmalı; PSR-12 kod standardına uyulmalıdır.",
        en: "**SQL Safety & Style:** Write queries only with prepared statements (PDO); follow the PSR-12 coding standard.",
      },
    ],
  },
];

/** Display order of sections follows the language order of step 1. */
const LANGUAGE_ORDER: CodingLanguage[] = [
  "C", "C++", "C#", "Java", "JavaScript", "TypeScript", "Python", "Go", "Rust", "Kotlin", "Swift", "PHP", "Verilog", "VHDL",
];
SOFTWARE_SECTIONS.sort((a, b) => LANGUAGE_ORDER.indexOf(a.language) - LANGUAGE_ORDER.indexOf(b.language));

const HDL_SECTIONS: Section[] = [
  {
    language: "Verilog",
    titleTr: "Verilog / SystemVerilog",
    titleEn: "Verilog / SystemVerilog",
    rules: [
      {
        toggle: "hdlAssignmentRules",
        tr: "**Atama Kuralları (Blocking vs. Non-blocking):**\n  - Ardışıl Mantık (Sequential Logic - `always @(posedge clk)`): Kesinlikle **Non-blocking (`<=`)** atama kullanılmalıdır.\n  - Kombinasyonel Mantık (`always @(*)`): Kesinlikle **Blocking (`=`)** atama kullanılmalıdır. Aynı blok içinde ikisini karıştırmak kesinlikle yasaktır!",
        en: "**Assignment Rules:**\n  - Sequential Logic (`always @(posedge clk)`): **Non-blocking (`<=`)** assignments are strictly mandatory.\n  - Combinational Logic (`always @(*)`): **Blocking (`=`)** assignments are strictly mandatory. Mixing both in one block is banned.",
      },
      {
        toggle: "hdlLatchPrevention",
        tr: "**Mandal (Latch) Önleme:** Kombinasyonel bloklardaki `if/else` ve `case` ifadeleri tüm olasılıkları kapsamalı (`default` eklenmeli), eksik tanımlama nedeniyle istem dışı şeffaf latch oluşumu engellenmelidir.",
        en: "**Latch Prevention:** All `if/else` and `case` branches in combinational blocks must be fully specified (with `default`) to avoid unintended transparent latches.",
      },
      {
        tr: "**Modül Sınırları ve {{MAX_LINES}} Satır Kuralı:** Her Verilog modülü ayrı bir `.v` veya `.sv` dosyasında bulunmalı, top-level modül altında temiz bir hiyerarşi kurgulanmalıdır.",
        en: "**Module Hierarchy:** One module per `.v`/`.sv` file; maximum {{MAX_LINES}} lines per file.",
      },
      {
        tr: "**Testbench Ayrımı:** Test kodları ana donanım modülünden ayrı `tb_*.v` dosyalarında üretilmeli ve self-checking assertions içermelidir.",
        en: "**Testbenches:** Isolated testbenches in `tb_*.v` files with self-checking assertions.",
      },
    ],
  },
  {
    language: "VHDL",
    titleTr: "VHDL",
    titleEn: "VHDL",
    rules: [
      {
        tr: "**Varlık / Mimari (Entity / Architecture) Ayrımı:** Her VHDL varlığı kendi `.vhd` dosyasında yer almalıdır. Ortak veri tipleri ve sabitler paket dosyalarında (`*_pkg.vhd`) toplanmalıdır.",
        en: "**Entity / Architecture Separation:** One entity per `.vhd` file; shared constants and types in package files (`*_pkg.vhd`).",
      },
      {
        toggle: "hdlLatchPrevention",
        tr: "**Duyarlılık Listeleri (Sensitivity Lists):** Kombinasyonel süreçlerde (`process`) okunan TÜM sinyaller duyarlılık listesine eklenmelidir. Ardışıl süreçlerde yalnızca `rising_edge(clock)` ve asenkron sıfırlama yer almalıdır.",
        en: "**Sensitivity Lists:** Combinational `process` statements must list ALL read signals. Sequential processes rely strictly on `rising_edge(clk)`.",
      },
      {
        toggle: "hdlAssignmentRules",
        tr: "**Güçlü Tip Güvenliği:** Standart dışı `std_logic_unsigned` kütüphaneleri yerine `ieee.numeric_std` kütüphanesi ve `signed`/`unsigned` tipleri zorunlu tutulmalıdır.",
        en: "**Strong Typing:** Use standard `ieee.numeric_std` library with `signed`/`unsigned` types instead of legacy non-standard packages.",
      },
    ],
  },
];

function renderSections(sections: Section[], data: WizardFormData, chapter: number, isTr: boolean): string[] {
  const out: string[] = [];
  let n = 0;
  for (const s of sections) {
    if (!data.languages.includes(s.language)) continue;
    const rules = s.rules.filter((r) => !r.toggle || data.constraints[r.toggle]);
    if (rules.length === 0) continue;
    n += 1;
    out.push(`### ${chapter}.${n} ${isTr ? s.titleTr : s.titleEn}`);
    for (const r of rules) out.push(`- ${isTr ? r.tr : r.en}`);
    out.push("");
  }
  return out;
}

/** Builds AI_GUIDELINES.md (still containing {{...}} placeholders). */
export function buildGuidelinesTemplate(data: WizardFormData): string {
  const isTr = data.locale === "tr";
  const langs = data.languages.join(", ");
  const lines: string[] = [];

  if (isTr) {
    lines.push(
      "# Dile Özel Yapay Zeka Kodlama ve Mimari Kuralları (AI_GUIDELINES.md)",
      "",
      `Bu doküman, bu projede kullanılan dillerin (${langs}) yapay zeka kodlama asistanlarınca uyulması gereken dile özel kısıtlamalarını, güvenlik kurallarını ve mimari sınırlarını tanımlar.`,
      "",
      "---",
      "",
      "## 0. Genel Çekirdek Kurallar",
      "- **Maksimum Dosya Sınırı:** Hiçbir kod dosyası {{MAX_LINES}} satırı geçemez. {{MAX_LINES_THRESHOLD}} satıra yaklaşıldığında alt modüllere bölünmelidir.",
      "- **Dokümantasyon Puan Barajı:** Public bileşen ve fonksiyonlar için öz-değerlendirme puanı en az {{DOC_SCORE}}/10 olmalıdır.",
      "- **Memory Bank Senkronizasyonu:** Her görev bitiminde `.memory_bank/activeContext.md` ve `.memory_bank/progress.md` dosyaları güncellenmelidir.",
      "- **Kombinasyon Testleri:** Tüm yeni yetenekler için uç durumları (edge-cases) kapsayan testler yazılmalıdır.",
      ""
    );
  } else {
    lines.push(
      "# Language-Specific AI Coding & Architectural Rules (AI_GUIDELINES.md)",
      "",
      `This document specifies language-specific constraints, safety enforcement rules, and architectural boundaries for AI coding assistants working on this project's languages (${langs}).`,
      "",
      "---",
      "",
      "## 0. Universal Core Directives",
      "- **Maximum File Limit:** No single code file may exceed {{MAX_LINES}} lines. Modularize when approaching {{MAX_LINES_THRESHOLD}} lines.",
      "- **Documentation Self-Scoring:** Public functions and modules must achieve at least {{DOC_SCORE}}/10 self-evaluated documentation quality score.",
      "- **Memory Bank Synchronization:** Synchronize `.memory_bank/activeContext.md` and `.memory_bank/progress.md` at the end of each session.",
      "- **Combination Tests:** Construct rigorous edge-case combination test matrices for every added component.",
      ""
    );
  }

  let chapter = 0;
  const sw = renderSections(SOFTWARE_SECTIONS, data, chapter + 1, isTr);
  if (sw.length > 0) {
    chapter += 1;
    lines.push("---", "", isTr ? `## ${chapter}. Genel Yazılım Dilleri Kısıtlama Kuralları` : `## ${chapter}. General Software Language Constraints`, "", ...sw);
  }
  const hdl = renderSections(HDL_SECTIONS, data, chapter + 1, isTr);
  if (hdl.length > 0) {
    chapter += 1;
    lines.push(
      "---",
      "",
      isTr ? `## ${chapter}. Donanım Tanımlama Dilleri (HDL) Kuralları` : `## ${chapter}. Hardware Description Languages (HDL)`,
      "",
      isTr
        ? "Donanım tasarımı dijital sentez ve zamanlama kısıtlarına dayandığı için yapay zekanın yazılım dillerindeki gibi serbest hareket etmesi donanım sentezleme hatalarına (synthesis errors) veya yarış durumlarına (race conditions) yol açar."
        : "Hardware synthesis and timing constraints require strict rules to prevent hardware race conditions or unintentional latch inference.",
      "",
      ...hdl
    );
  }

  return lines.join("\n").replace(/\n+$/, "\n");
}
