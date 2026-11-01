import { CLI_PACKAGE } from "@/lib/templateEngine";

/**
 * Bilingual content of the in-app guide ("Rehber" / "Guide").
 * Kept as data so the modal component stays presentation-only.
 */

export interface GuideText {
  tr: string;
  en: string;
}

export interface GuideSection {
  id: string;
  title: GuideText;
  paragraphs?: GuideText[];
  bullets?: GuideText[];
  steps?: { title: GuideText; body: GuideText }[];
  table?: { key: string; value: GuideText }[];
  code?: { label: GuideText; command: string }[];
  /** Rendered from the live safety-switch list instead of static text. */
  rulesList?: boolean;
}

const CLI = `npx -y ${CLI_PACKAGE} init`;

export const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: "what",
    title: { tr: "Vibe Governor nedir?", en: "What is Vibe Governor?" },
    paragraphs: [
      {
        tr: "Vibe Governor, yapay zeka kodlama asistanlarıyla (Claude, Cursor, Copilot, Windsurf, Cline, AntiGravity) geliştirilen projeler için bir \"anayasa\" üreticisidir. Projenize, asistanın her oturumda okuyacağı kural dosyalarını, projenin hafızasını tutan Memory Bank dosyalarını ve bu kurallara uyulup uyulmadığını otomatik denetleyen betikleri kurar.",
        en: "Vibe Governor is a \"constitution\" generator for projects built with AI coding assistants (Claude, Cursor, Copilot, Windsurf, Cline, AntiGravity). It installs rule files the assistant reads every session, Memory Bank files that hold the project's memory, and scripts that automatically verify the rules are followed.",
      },
      {
        tr: "Yazılım dillerinin yanında Verilog ve VHDL gibi donanım tanımlama dillerini de destekler.",
        en: "Besides software languages it also supports hardware description languages such as Verilog and VHDL.",
      },
    ],
  },
  {
    id: "why",
    title: { tr: "Ne işe yarar?", en: "Why use it?" },
    paragraphs: [
      {
        tr: "AI asistanları uzun projelerde üç tipik soruna yol açar. Vibe Governor her birine bir çözüm getirir:",
        en: "AI assistants cause three typical problems on long projects. Vibe Governor answers each one:",
      },
    ],
    bullets: [
      {
        tr: "Hafıza kaybı: Her yeni oturumda asistan projeyi unutur. → Memory Bank (`.memory_bank/`) mimariyi, mevcut odağı ve ilerlemeyi saklar; asistan işe başlamadan bunları okur ve iş bitince günceller.",
        en: "Memory loss: the assistant forgets the project every new session. → The Memory Bank (`.memory_bank/`) stores architecture, current focus and progress; the assistant reads it first and updates it when done.",
      },
      {
        tr: "Spagetti kod ve dev dosyalar: Asistan her şeyi tek dosyaya yığar. → Dosya satır sınırı (varsayılan 800) ve modülerlik kuralları; sınır aşılınca commit engellenir.",
        en: "Spaghetti code and giant files: the assistant piles everything into one file. → A per-file line limit (default 800) and modularity rules; commits are blocked when exceeded.",
      },
      {
        tr: "Dile özgü kestirmeler: `any`, `unsafe`, boş `catch`, `!!`, Verilog'da yanlış atama gibi. → Seçtiğiniz dillere özel kurallar hem asistana yazılı olarak verilir hem de denetçi betiğiyle otomatik yakalanır.",
        en: "Language shortcuts such as `any`, `unsafe`, empty `catch`, `!!`, or wrong Verilog assignments. → Rules for your selected languages are given to the assistant in writing and caught automatically by the checker.",
      },
      {
        tr: "Tek kural seti, tüm araçlar: Aynı kurallar her araç için kendi dosya biçiminde (CLAUDE.md, .cursorrules, ...) üretilir; araç değiştirince kurallar kaybolmaz.",
        en: "One rule set, every tool: the same rules are emitted in each tool's own format (CLAUDE.md, .cursorrules, ...), so switching tools keeps your rules.",
      },
    ],
  },
  {
    id: "how",
    title: { tr: "Nasıl çalışır? (5 adım)", en: "How does it work? (5 steps)" },
    steps: [
      {
        title: { tr: "Platform ve diller", en: "Platforms & languages" },
        body: {
          tr: "Kullandığınız AI araçlarını ve projenin dillerini seçin. Burada ayrıca üretilecek dosyaların dilini (TR/EN) belirlersiniz; arayüz dili sağ üstten ayrı seçilir.",
          en: "Pick your AI tools and project languages. You also choose the language of the generated files (TR/EN) here; the interface language is chosen separately at the top right.",
        },
      },
      {
        title: { tr: "Kısıtlar", en: "Constraints" },
        body: {
          tr: "Dosya satır sınırını, dokümantasyon puan barajını ve dile özel güvenlik anahtarlarını ayarlayın. Yalnızca seçili dillerin açık anahtarları pakete girer.",
          en: "Set the line limit, the documentation score threshold and the language-specific safety switches. Only enabled switches of selected languages are exported.",
        },
      },
      {
        title: { tr: "Memory Bank", en: "Memory Bank" },
        body: {
          tr: "Projenin vizyonunu, mimarisini, teknolojilerini, mevcut odağını ve ilerlemesini yazın. Bu 6 dosya asistanın kalıcı hafızasıdır.",
          en: "Describe vision, architecture, tech stack, current focus and progress. These 6 files are the assistant's persistent memory.",
        },
      },
      {
        title: { tr: "Otomasyon", en: "Automation" },
        body: {
          tr: "Denetçi betiğini, git pre-commit kancasını, GitHub Actions iş akışını, denetim istemini ve .gitignore'u seçin.",
          en: "Choose the checker script, the git pre-commit hook, the GitHub Actions workflow, the audit prompt and the .gitignore.",
        },
      },
      {
        title: { tr: "Ön izleme ve dışa aktarma", en: "Preview & export" },
        body: {
          tr: "Üretilen dosyaları inceleyin; ZIP olarak indirin veya tek satırlık komutu kopyalayıp proje klasörünüzde çalıştırın.",
          en: "Inspect the generated files; download them as a ZIP or copy the one-line command and run it in your project folder.",
        },
      },
    ],
  },
  {
    id: "files",
    title: { tr: "Üretilen dosyalar", en: "Generated files" },
    table: [
      { key: "AI_GUIDELINES.md", value: { tr: "Ana kural kitabı: genel kurallar + seçili dillerin kuralları.", en: "The main rulebook: core rules + rules of the selected languages." } },
      { key: "CLAUDE.md, ANTIGRAVITY.md, .cursorrules, .windsurfrules, .clinerules, .github/copilot-instructions.md", value: { tr: "Her aracın oturum başında otomatik okuduğu yükleyici dosyalar; asistanı AI_GUIDELINES.md ve Memory Bank'e yönlendirir.", en: "Loader files each tool reads automatically at session start; they point the assistant to AI_GUIDELINES.md and the Memory Bank." } },
      { key: ".memory_bank/*.md", value: { tr: "6 hafıza dosyası: projectbrief, productContext, systemPatterns, techContext, activeContext, progress.", en: "6 memory files: projectbrief, productContext, systemPatterns, techContext, activeContext, progress." } },
      { key: "scripts/check_guidelines.py", value: { tr: "Satır sınırını, Memory Bank'in varlığını ve dile özel kuralları tarayan denetçi (Python 3.8+).", en: "Checker for the line limit, Memory Bank presence and language rules (Python 3.8+)." } },
      { key: "scripts/pre-commit-hook.sh", value: { tr: "Her commit'ten önce denetçiyi çalıştırır; ihlal varsa commit'i durdurur.", en: "Runs the checker before every commit and stops the commit on violations." } },
      { key: ".github/workflows/ai-guidelines-ci.yml", value: { tr: "Her push ve pull request'te denetçiyi GitHub'da çalıştırır.", en: "Runs the checker on GitHub for every push and pull request." } },
      { key: "AUDIT_PROMPT.md", value: { tr: "Güçlü bir modele kodu değiştirmeden teknik borç raporu (audit-report.md) hazırlatan istem.", en: "Prompt that has a frontier model write a technical-debt report (audit-report.md) without changing code." } },
      { key: ".gitignore, .gitattributes", value: { tr: "Geçici rapor dosyalarını dışlar, Memory Bank'i takipte tutar; betiklerin satır sonlarını LF'e sabitler.", en: "Ignores temporary reports, keeps the Memory Bank tracked; pins script line endings to LF." } },
    ],
  },
  {
    id: "install",
    title: { tr: "Projeye kurulum", en: "Installing into a project" },
    paragraphs: [
      {
        tr: "İki yol vardır. Komut yolu Node.js 18+ ister; mevcut dosyalarınızın üzerine yazmaz (--force verilmedikçe) ve klasörde git deposu varsa pre-commit kancasını kendisi kurar.",
        en: "There are two ways. The command needs Node.js 18+; it never overwrites existing files (unless --force) and installs the pre-commit hook itself when the folder is a git repo.",
      },
    ],
    code: [
      { label: { tr: "1) Tek satır komut (5. adımdan kopyalayın)", en: "1) One-line command (copy it from step 5)" }, command: `${CLI} --preset=...` },
      { label: { tr: "Preset olmadan, varsayılanlarla", en: "Without a preset, using defaults" }, command: `${CLI} --name=my-app --languages=Java,Kotlin --lang=en` },
      { label: { tr: "2) ZIP kullandıysanız kancayı elle kurun", en: "2) If you used the ZIP, install the hook manually" }, command: "cp scripts/pre-commit-hook.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit" },
      { label: { tr: "Denetçiyi istediğiniz an çalıştırın", en: "Run the checker any time" }, command: "python3 scripts/check_guidelines.py" },
    ],
  },
  {
    id: "flow",
    title: { tr: "Günlük kullanım akışı", en: "Day-to-day workflow" },
    steps: [
      { title: { tr: "Oturum başlar", en: "Session starts" }, body: { tr: "Asistan, aracına ait yükleyici dosya sayesinde AI_GUIDELINES.md ile activeContext.md'yi okur.", en: "Through its loader file the assistant reads AI_GUIDELINES.md and activeContext.md." } },
      { title: { tr: "Kod yazılır", en: "Code is written" }, body: { tr: "Asistan satır sınırına, modülerliğe ve dil kurallarına göre çalışır.", en: "The assistant works within the line limit, modularity and language rules." } },
      { title: { tr: "Commit", en: "Commit" }, body: { tr: "Pre-commit kancası denetçiyi çalıştırır; ihlal varsa commit durur ve ihlaller dosya:satır olarak listelenir.", en: "The pre-commit hook runs the checker; on violations the commit stops and issues are listed as file:line." } },
      { title: { tr: "Push / PR", en: "Push / PR" }, body: { tr: "GitHub Actions aynı denetimi sunucuda tekrarlar; kancayı atlayan kod birleştirilemez.", en: "GitHub Actions repeats the check on the server, so code that skipped the hook cannot be merged." } },
      { title: { tr: "Oturum biter", en: "Session ends" }, body: { tr: "Asistan activeContext.md ve progress.md'yi günceller; bir sonraki oturum kaldığı yerden devam eder.", en: "The assistant updates activeContext.md and progress.md; the next session continues where this one stopped." } },
      { title: { tr: "Periyodik denetim", en: "Periodic audit" }, body: { tr: "Büyük bir modül bitince AUDIT_PROMPT.md'deki istemle güçlü bir modelden teknik borç raporu alın.", en: "After a large module, use the AUDIT_PROMPT.md prompt to get a technical-debt report from a frontier model." } },
    ],
  },
  {
    id: "rules",
    title: { tr: "Denetçinin yakaladığı kurallar", en: "Rules the checker enforces" },
    paragraphs: [
      {
        tr: "Tüm dillerde: dosya satır sınırı (sınıra 100 satır kala uyarı) ve 6 Memory Bank dosyasının varlığı. Dile özel kurallar (2. adımdaki anahtarlar):",
        en: "For every language: the file line limit (warning 100 lines before it) and presence of the 6 Memory Bank files. Language-specific rules (the step-2 switches):",
      },
    ],
    rulesList: true,
  },
  {
    id: "faq",
    title: { tr: "Sık sorulan sorular", en: "FAQ" },
    steps: [
      { title: { tr: "Python kurulu olmak zorunda mı?", en: "Do I need Python?" }, body: { tr: "Sadece denetçi betiği için (Python 3.8+). Kural ve Memory Bank dosyaları Python olmadan da çalışır.", en: "Only for the checker script (Python 3.8+). Rule and Memory Bank files work without it." } },
      { title: { tr: "Mevcut bir projeye kurabilir miyim?", en: "Can I add it to an existing project?" }, body: { tr: "Evet. Komut mevcut dosyaları atlar; önce denetçiyi çalıştırıp ihlalleri görün, gerekirse satır sınırını yükseltin.", en: "Yes. The command skips existing files; run the checker first to see violations and raise the line limit if needed." } },
      { title: { tr: "Bir kuralı sonradan kapatmak istersem?", en: "How do I turn a rule off later?" }, body: { tr: "Sihirbazda anahtarı kapatıp dosyaları yeniden üretin (--force) ya da scripts/check_guidelines.py içindeki ENABLED_RULES listesinden kuralı silin.", en: "Turn the switch off in the wizard and regenerate (--force), or remove the rule from ENABLED_RULES in scripts/check_guidelines.py." } },
      { title: { tr: "Denetçi her hatayı bulur mu?", en: "Does the checker catch everything?" }, body: { tr: "Hayır; hızlı ve yanlış alarm vermeyen sezgisel kontroller yapar. Derin inceleme için AUDIT_PROMPT.md ve derleyici/linter araçları birlikte kullanılmalıdır.", en: "No; it runs fast heuristic checks tuned to avoid false alarms. Use AUDIT_PROMPT.md together with compilers/linters for deep review." } },
      { title: { tr: "Verilerim bir sunucuya gidiyor mu?", en: "Is my data sent to a server?" }, body: { tr: "Hayır. Tüm dosyalar tarayıcınızda üretilir; ZIP de tarayıcıda oluşturulur.", en: "No. Every file is generated in your browser, including the ZIP." } },
    ],
  },
];
