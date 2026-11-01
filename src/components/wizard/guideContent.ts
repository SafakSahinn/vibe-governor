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
          tr: "Kullandığınız AI araçlarını, proje türünü (Yazılım / Donanım / Karma) ve dilleri seçin; dil seçimi isteğe bağlıdır. Burada ayrıca üretilecek dosyaların dilini (TR/EN) belirlersiniz; arayüz dili sağ üstten ayrı seçilir.",
          en: "Pick your AI tools, the project type (Software / Hardware / Mixed) and languages; choosing a language is optional. You also choose the language of the generated files (TR/EN) here; the interface language is chosen separately at the top right.",
        },
      },
      {
        title: { tr: "Kısıtlar", en: "Constraints" },
        body: {
          tr: "Dosya satır sınırını, dokümantasyon puan barajını ve dile özel güvenlik anahtarlarını ayarlayın. 1. adımda seçtiğiniz dillerin anahtarları otomatik açılır; istemediğinizi kapatabilirsiniz. Yalnızca seçili dillerin açık anahtarları pakete girer.",
          en: "Set the line limit, the documentation score threshold and the language-specific safety switches. The switches of the languages chosen in step 1 are turned on automatically; switch off any you don't want. Only enabled switches of selected languages are exported.",
        },
      },
      {
        title: { tr: "Memory Bank", en: "Memory Bank" },
        body: {
          tr: "Bu 6 dosya asistanın kalıcı hafızasıdır. Proje özeti, mimari, teknoloji/komutlar, aktif oturum ve ilerleme önceki adımlardaki seçimlerden otomatik doldurulur ve ayarlar değiştikçe güncellenir; elle düzenlediğiniz metin korunur. Ürün bağlamını (çözülen problem) siz yazarsınız.",
          en: "These 6 files are the assistant's persistent memory. Brief, architecture, tech stack/commands, active context and progress are filled in from your earlier choices and follow them as settings change; text you edit by hand is kept. The product context (the problem being solved) is yours to write.",
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
      { key: "AGENTS.md, CLAUDE.md, GEMINI.md, .agents/rules/, .cursor/rules/*.mdc, .windsurf/rules/, .clinerules/, .github/copilot-instructions.md", value: { tr: "Her aracın oturum başında otomatik okuduğu yükleyici dosyalar (araçların güncel resmi biçimleriyle); asistanı AI_GUIDELINES.md ve Memory Bank'e yönlendirir.", en: "Loader files each tool reads automatically at session start (in each tool's current documented format); they point the assistant to AI_GUIDELINES.md and the Memory Bank." } },
      { key: ".memory_bank/*.md", value: { tr: "6 hafıza dosyası: projectbrief, productContext, systemPatterns, techContext, activeContext, progress.", en: "6 memory files: projectbrief, productContext, systemPatterns, techContext, activeContext, progress." } },
      { key: "scripts/check_guidelines.py", value: { tr: "Satır sınırını, Memory Bank'in varlığını ve dile özel kuralları tarayan denetçi (Python 3.8+).", en: "Checker for the line limit, Memory Bank presence and language rules (Python 3.8+)." } },
      { key: "scripts/pre-commit-hook.sh", value: { tr: "Her commit'ten önce denetçiyi çalıştırır; ihlal varsa commit'i durdurur.", en: "Runs the checker before every commit and stops the commit on violations." } },
      { key: ".github/workflows/ai-guidelines-ci.yml", value: { tr: "Her push ve pull request'te denetçiyi GitHub'da çalıştırır.", en: "Runs the checker on GitHub for every push and pull request." } },
      { key: "AUDIT_PROMPT.md", value: { tr: "Güçlü bir modele kodu değiştirmeden teknik borç raporu (audit-report.md) hazırlatan istem.", en: "Prompt that has a frontier model write a technical-debt report (audit-report.md) without changing code." } },
      { key: "vibe-governor.json", value: { tr: "Sihirbazdaki tüm seçimler ve üretilen dosyaların özetleri. update komutu ve sihirbazdaki \"Yapılandırma Yükle\" bunu kullanır; depoda tutulmalıdır.", en: "All wizard choices plus fingerprints of the generated files. Used by the update command and \"Load Config\" in the wizard; keep it in the repository." } },
      { key: ".vibe-baseline.json", value: { tr: "(İsteğe bağlı) Mevcut projede kabul edilen eski ihlallerin listesi; --update-baseline ile oluşturulur.", en: "(Optional) Accepted pre-existing violations of an existing project; created with --update-baseline." } },
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
      { label: { tr: "Dilleri projeden algılayarak kur (--languages verilmezse)", en: "Install with languages detected from the project (when --languages is omitted)" }, command: `${CLI}` },
      { label: { tr: "Ayarları sonradan değiştir (elle düzenlenen dosyalar ve Memory Bank korunur)", en: "Change settings later (hand-edited files and the Memory Bank are kept)" }, command: `npx -y ${CLI_PACKAGE} update --max-lines=600 --enable=tsNoAny --disable=includeGitHubCI` },
      { label: { tr: "2) ZIP kullandıysanız kancayı elle kurun", en: "2) If you used the ZIP, install the hook manually" }, command: "cp scripts/pre-commit-hook.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit" },
      { label: { tr: "Denetçiyi istediğiniz an çalıştırın", en: "Run the checker any time" }, command: "python3 scripts/check_guidelines.py" },
    ],
  },
  {
    id: "existing",
    title: { tr: "Mevcut projeler ve istisnalar", en: "Existing projects & exceptions" },
    paragraphs: [
      {
        tr: "Yarı yolda bir projede denetçi eski kodda çok sayıda ihlal bulabilir. Bunları tek tek düzeltmeden aracı kullanmaya başlamak için mevcut bulguları temel çizgiye (baseline) alın; bundan sonra yalnızca yeni ihlaller commit'i engeller. Temel çizgi satır numarasına değil satırın içeriğine baktığı için kod kaydığında bozulmaz.",
        en: "In a project that is already under way the checker may find many violations in old code. Put the current findings into a baseline to start using the tool without fixing them first; afterwards only new violations block commits. The baseline matches line content, not line numbers, so it survives code moving around.",
      },
      {
        tr: "Meşru bir istisna için ilgili satıra yorum ekleyin. Her bulgunun sonunda köşeli parantez içinde kural kimliği yazar (ör. [ts_any]); istisnayı bu kimlikle sınırlayabilirsiniz.",
        en: "For a legitimate exception, add a comment on that line. Every finding ends with its rule id in brackets (e.g. [ts_any]); you can limit the exception to that id.",
      },
    ],
    code: [
      { label: { tr: "Mevcut ihlalleri kabul et", en: "Accept existing violations" }, command: "python3 scripts/check_guidelines.py --update-baseline" },
      { label: { tr: "Aynı satırda istisna", en: "Exception on the same line" }, command: "const raw: any = JSON.parse(text); // vibe-ignore: ts_any" },
      { label: { tr: "Bir sonraki satır için", en: "For the next line" }, command: "// vibe-ignore-next-line: cs_no_async_void\nprivate async void OnClick(object s, EventArgs e) { ... }" },
      { label: { tr: "Tüm dosya için (ilk 10 satırda)", en: "For the whole file (within the first 10 lines)" }, command: "# vibe-ignore-file: line_limit" },
    ],
  },
  {
    id: "flow",
    title: { tr: "Günlük kullanım akışı", en: "Day-to-day workflow" },
    steps: [
      { title: { tr: "Oturum başlar", en: "Session starts" }, body: { tr: "Asistan, aracına ait yükleyici dosya sayesinde AI_GUIDELINES.md ile activeContext.md'yi okur.", en: "Through its loader file the assistant reads AI_GUIDELINES.md and activeContext.md." } },
      { title: { tr: "Kod yazılır", en: "Code is written" }, body: { tr: "Asistan satır sınırına, modülerliğe ve dil kurallarına göre çalışır.", en: "The assistant works within the line limit, modularity and language rules." } },
      { title: { tr: "Commit", en: "Commit" }, body: { tr: "Pre-commit kancası yalnızca commit'e giren dosyaları denetler; ihlal varsa commit durur ve ihlaller dosya:satır [kural] olarak listelenir. Kod değişip Memory Bank güncellenmediyse uyarır.", en: "The pre-commit hook checks only the staged files; on violations the commit stops and issues are listed as file:line [rule]. It warns when code changed but the Memory Bank was not updated." } },
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
      { title: { tr: "Programlama dili seçmek zorunda mıyım?", en: "Do I have to pick a programming language?" }, body: { tr: "Hayır. Donanım projesi için \"Donanım (HDL)\" türünü seçmeniz yeterli; hiç dil seçmezseniz de dilden bağımsız kurallar (satır sınırı, Memory Bank, dokümantasyon, testler) uygulanır.", en: "No. For a hardware project just choose \"Hardware (HDL)\"; with no language at all the language-independent rules (line limit, Memory Bank, documentation, tests) still apply." } },
      { title: { tr: "Mevcut bir projeye kurabilir miyim?", en: "Can I add it to an existing project?" }, body: { tr: "Evet. Komut mevcut dosyaları atlar; önce denetçiyi çalıştırıp ihlalleri görün, gerekirse satır sınırını yükseltin.", en: "Yes. The command skips existing files; run the checker first to see violations and raise the line limit if needed." } },
      { title: { tr: "Bir kuralı sonradan kapatmak istersem?", en: "How do I turn a rule off later?" }, body: { tr: "npx vibe-governor update --disable=jsNoVar gibi bir komut çalıştırın ya da sihirbazda \"Yapılandırma Yükle\" ile vibe-governor.json'ı açıp değiştirin. Tek bir satır için vibe-ignore yorumu yeterlidir.", en: "Run e.g. npx vibe-governor update --disable=jsNoVar, or open vibe-governor.json with \"Load Config\" in the wizard and change it. For a single line a vibe-ignore comment is enough." } },
      { title: { tr: "Denetçi her hatayı bulur mu?", en: "Does the checker catch everything?" }, body: { tr: "Hayır; hızlı ve yanlış alarm vermeyen sezgisel kontroller yapar. Derin inceleme için AUDIT_PROMPT.md ve derleyici/linter araçları birlikte kullanılmalıdır.", en: "No; it runs fast heuristic checks tuned to avoid false alarms. Use AUDIT_PROMPT.md together with compilers/linters for deep review." } },
      { title: { tr: "Verilerim bir sunucuya gidiyor mu?", en: "Is my data sent to a server?" }, body: { tr: "Hayır. Tüm dosyalar tarayıcınızda üretilir; ZIP de tarayıcıda oluşturulur.", en: "No. Every file is generated in your browser, including the ZIP." } },
    ],
  },
];
