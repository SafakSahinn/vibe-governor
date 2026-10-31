import { GeneratedFile, WizardFormData } from "@/types/wizard";
import {
  TEMPLATE_AI_GUIDELINES_EN,
  TEMPLATE_AI_GUIDELINES_TR,
  TEMPLATE_AUDIT_PROMPT_EN,
  TEMPLATE_AUDIT_PROMPT_TR,
  TEMPLATE_CHECK_GUIDELINES_PY,
  TEMPLATE_GITIGNORE,
  TEMPLATE_GITHUB_CI,
  TEMPLATE_PRE_COMMIT_HOOK,
} from "./templates";

export function generateProjectFiles(data: WizardFormData): GeneratedFile[] {
  const files: GeneratedFile[] = [];
  const isTr = data.locale === "tr";
  const maxLines = data.constraints.maxLines || 800;
  const threshold = Math.max(100, maxLines - 100);
  const docScore = data.constraints.docScoreThreshold || 8;

  const replaceCommon = (template: string): string => {
    return template
      .replace(/{{MAX_LINES}}/g, String(maxLines))
      .replace(/{{MAX_LINES_THRESHOLD}}/g, String(threshold))
      .replace(/{{DOC_SCORE}}/g, String(docScore));
  };

  // 1. AI_GUIDELINES.md
  const guidelinesRaw = isTr ? TEMPLATE_AI_GUIDELINES_TR : TEMPLATE_AI_GUIDELINES_EN;
  files.push({
    path: "AI_GUIDELINES.md",
    name: "AI_GUIDELINES.md",
    content: replaceCommon(guidelinesRaw),
    language: "markdown",
    category: "guidelines",
  });

  // Language safety summary for IDE rules
  const safetyList: string[] = [];
  if (data.constraints.rustNoUnsafe) safetyList.push("Rust no-unsafe");
  if (data.constraints.rustLimitClone) safetyList.push("Rust clone restrictions");
  if (data.constraints.tsNoAny) safetyList.push("TypeScript no-any");
  if (data.constraints.pyTypeHints) safetyList.push("Python type hints");
  if (data.constraints.cppNoRawPointers) safetyList.push("C++ no raw pointers");
  if (data.constraints.goCheckErrors) safetyList.push("Go error checks");
  if (data.constraints.hdlAssignmentRules) safetyList.push("Verilog/VHDL assignment rules");
  const safetySummary = safetyList.length > 0 ? safetyList.join(", ") : "strict typing & modularity";

  // 2. IDE / Agent Rules based on selected target platforms
  if (data.targetPlatforms.includes("ANTIGRAVITY")) {
    const antigravityContent = `# AntiGravity AI Agent Protocol

## Mandatory Context Loading
- ALWAYS read and strictly apply \`./AI_GUIDELINES.md\` before analyzing code or writing changes.
- Inspect \`./.memory_bank/activeContext.md\` and \`./.memory_bank/systemPatterns.md\` prior to executing any task.

## Execution Restrictions
- **${maxLines}-Line Rule:** Never exceed ${maxLines} lines in any single code file. Split into clean sub-modules when approaching ${threshold} lines.
- **Modular Architecture:** Enforce strict single responsibility. Avoid monolithic or "God Object" designs.
- **Documentation Self-Scoring:** Add thorough docstrings/JSDoc for public structures and self-score quality (min ${docScore}/10 required).
- **Combination Testing:** Generate comprehensive edge-case combination tests for every new feature.
- **Language Safety:** Enforce language-specific safety rules (e.g., ${safetySummary}).

## Session Synchronization
- Upon task completion, update \`./.memory_bank/activeContext.md\` and \`./.memory_bank/progress.md\` with the latest status.
`;
    files.push({
      path: "ANTIGRAVITY.md",
      name: "ANTIGRAVITY.md",
      content: antigravityContent,
      language: "markdown",
      category: "rules",
    });
  }

  if (data.targetPlatforms.includes("CLAUDE_CLI")) {
    const claudeContent = `# Claude CLI Project Guidelines

- Read and follow \`./AI_GUIDELINES.md\` strictly.
- Inspect \`./.memory_bank/activeContext.md\` before modifying any files.
- Maintain the ${maxLines}-line per file limit and full modularity.
- Require self-evaluated documentation scores (>= ${docScore}/10).
- Update \`.memory_bank/activeContext.md\` and \`progress.md\` after completing work.
`;
    files.push({
      path: "CLAUDE.md",
      name: "CLAUDE.md",
      content: claudeContent,
      language: "markdown",
      category: "rules",
    });
  }

  if (data.targetPlatforms.includes("CURSOR")) {
    const cursorContent = `Always read and strictly follow the architecture and coding guidelines in ./AI_GUIDELINES.md before generating any code.
Inspect .memory_bank/activeContext.md and .memory_bank/systemPatterns.md before task execution.
Enforce ${maxLines}-line limit per file, mandatory modularity, documentation scoring (>= ${docScore}/10), and combination tests.
Sync .memory_bank/activeContext.md and progress.md upon completion.
`;
    files.push({
      path: ".cursorrules",
      name: ".cursorrules",
      content: cursorContent,
      language: "text",
      category: "rules",
    });
  }

  if (data.targetPlatforms.includes("WINDSURF")) {
    const windsurfContent = `Rule 1: Adhere strictly to the project rules in ./AI_GUIDELINES.md.
Rule 2: Read .memory_bank/activeContext.md prior to code modification.
Rule 3: Enforce maximum ${maxLines} lines per file and single responsibility principle.
Rule 4: Require self-evaluated documentation scores (>= ${docScore}/10) for public methods.
`;
    files.push({
      path: ".windsurfrules",
      name: ".windsurfrules",
      content: windsurfContent,
      language: "text",
      category: "rules",
    });
  }

  if (data.targetPlatforms.includes("CLINE")) {
    const clineContent = `Context Loading: Always start by analyzing ./AI_GUIDELINES.md and .memory_bank/activeContext.md.
Code Quality: Maintain strict modularity and <${maxLines} lines/file limit.
Verification: Include edge-case combination tests for all new functions.
`;
    files.push({
      path: ".clinerules",
      name: ".clinerules",
      content: clineContent,
      language: "text",
      category: "rules",
    });
  }

  if (data.targetPlatforms.includes("GITHUB_COPILOT")) {
    const copilotContent = `# GitHub Copilot Custom Instructions
- Follow all rules defined in \`AI_GUIDELINES.md\`.
- Never produce code files exceeding ${maxLines} lines.
- Always generate unit/combination tests for code additions.
`;
    files.push({
      path: ".github/copilot-instructions.md",
      name: "copilot-instructions.md",
      content: copilotContent,
      language: "markdown",
      category: "rules",
    });
  }

  // 3. Memory Bank (6 Files)
  const mb = data.memoryBank;
  const pName = mb.projectName || "My Project";

  if (isTr) {
    // 3.1 projectbrief.md
    files.push({
      path: ".memory_bank/projectbrief.md",
      name: "projectbrief.md",
      content: `# Proje Özeti ve Vizyonu
- **Proje Adı:** ${pName}
- **Temel Amaç:** ${mb.projectBrief || "Projenin ana varlık nedeni ve hedefleri."}
- **Çekirdek Hedefler:**
  1. Modüler, hatasız ve sürdürülebilir mimari kurmak.
  2. AI destekli geliştirmede context kaybı yaşamamak.
`,
      language: "markdown",
      category: "memory_bank",
    });

    // 3.2 productContext.md
    files.push({
      path: ".memory_bank/productContext.md",
      name: "productContext.md",
      content: `# Ürün Bağlamı ve Kullanıcı Deneyimi
- **Çözülen Problem:** ${mb.productContext || "AI kodlama asistanlarının hafıza kaybı ve spagetti koda yol açmasını önlemek."}
- **Hedef Kullanıcı Kitlesi:** Yazılım ve donanım geliştiricileri, teknik liderler.
- **Kritik İşlevsel Beklentiler:**
  - Maksimum ${maxLines} satır kuralının tavizsiz uygulanması.
  - Public yapılarda >=${docScore}/10 dokümantasyon puanı.
`,
      language: "markdown",
      category: "memory_bank",
    });

    // 3.3 systemPatterns.md
    files.push({
      path: ".memory_bank/systemPatterns.md",
      name: "systemPatterns.md",
      content: `# Sistem Mimarisi ve Tasarım Kalıpları
- **Mimari Yapı:** ${mb.systemPatterns || "Modüler mimari ve katmanlı servis deseni."}
- **Kullanılan Tasarım Kalıpları:** Factory, Adapter, Single Responsibility, Explicit Error Handling.
- **Modüller Arası Veri Akışı:**
  - UI Katmanı -> Servis Motoru -> İhraç & Raporlama Modülü
`,
      language: "markdown",
      category: "memory_bank",
    });

    // 3.4 techContext.md
    const techLanguages = data.languages.length > 0 ? data.languages.join(", ") : "TypeScript / Modern Stack";
    files.push({
      path: ".memory_bank/techContext.md",
      name: "techContext.md",
      content: `# Teknoloji Yığını ve Ortam Kısıtları
- **Diller ve Araçlar:** ${techLanguages}
- **Temel Detaylar:** ${mb.techContext || "Standart araç zinciri ve derleyici ayarları."}
- **Kısıtlamalar:** ${maxLines} satır sınırı, ${safetySummary}
`,
      language: "markdown",
      category: "memory_bank",
    });

    // 3.5 activeContext.md
    files.push({
      path: ".memory_bank/activeContext.md",
      name: "activeContext.md",
      content: `# Aktif Oturum Bağlamı
- **Mevcut Odak Noktası:** ${mb.activeContext || "Proje başlangıç konfigürasyonu ve anayasa entegrasyonu."}
- **Son Yapılan Değişiklikler:**
  - Vibe Governor Memory Bank şablonları oluşturuldu.
  - AI kuralları ve otomasyon betikleri eklendi.
- **Sonraki Adımlar:**
  1. Çekirdek modüllerin kodlanması.
  2. Otomatik denetçi betiğinin test edilmesi.
`,
      language: "markdown",
      category: "memory_bank",
    });

    // 3.6 progress.md
    files.push({
      path: ".memory_bank/progress.md",
      name: "progress.md",
      content: `# İlerleme Durumu ve İnceleme Raporu
- **Tamamlanan Modüller:**
  - [x] Memory Bank altyapısı (${pName})
  - [x] AI Guidelines & Kural seti
- **Çalışan Mevcut Durum:** ${mb.progress || "Proje iskeleti kararlı ve üretime hazır."}
- **Teknik Borçlar ve Bilinen Hatalar:**
  - [ ] İlk uçtan uca entegrasyon testlerinin tamamlanması.
`,
      language: "markdown",
      category: "memory_bank",
    });
  } else {
    // English Memory Bank
    files.push({
      path: ".memory_bank/projectbrief.md",
      name: "projectbrief.md",
      content: `# Project Brief & Vision
- **Project Name:** ${pName}
- **Core Purpose:** ${mb.projectBrief || "Primary objective of the project and key deliverables."}
- **Key Goals:**
  1. Establish modular, resilient, and maintainable architecture.
  2. Prevent AI context drift and hallucination across sessions.
`,
      language: "markdown",
      category: "memory_bank",
    });

    files.push({
      path: ".memory_bank/productContext.md",
      name: "productContext.md",
      content: `# Product Context & UX
- **Problem Solved:** ${mb.productContext || "Mitigates AI assistant context loss and spaghetti code creep."}
- **Target Audience:** Software engineers, hardware designers, tech leads.
- **Key Functional Expectations:**
  - Strict enforcement of max ${maxLines} lines per file.
  - Public documentation score >=${docScore}/10.
`,
      language: "markdown",
      category: "memory_bank",
    });

    files.push({
      path: ".memory_bank/systemPatterns.md",
      name: "systemPatterns.md",
      content: `# System Architecture & Design Patterns
- **Architecture Type:** ${mb.systemPatterns || "Modular architecture with isolated service layers."}
- **Design Patterns:** Factory, Adapter, Single Responsibility, Explicit Error Handling.
- **Data Flow Between Modules:**
  - UI Layer -> Core Engine -> Export & Reporting Module
`,
      language: "markdown",
      category: "memory_bank",
    });

    const techLanguages = data.languages.length > 0 ? data.languages.join(", ") : "TypeScript / Modern Stack";
    files.push({
      path: ".memory_bank/techContext.md",
      name: "techContext.md",
      content: `# Tech Stack & Environment Constraints
- **Primary Languages:** ${techLanguages}
- **Details:** ${mb.techContext || "Standard toolchain and compiler options."}
- **Constraints:** ${maxLines}-line ceiling, ${safetySummary}
`,
      language: "markdown",
      category: "memory_bank",
    });

    files.push({
      path: ".memory_bank/activeContext.md",
      name: "activeContext.md",
      content: `# Active Session Context
- **Current Focus:** ${mb.activeContext || "Initial project setup and constitution integration."}
- **Recent Changes:**
  - Generated Vibe Governor Memory Bank structure.
  - Linked AI rules and automation checker scripts.
- **Next Steps:**
  1. Implement core domain logic.
  2. Run guideline verification scripts.
`,
      language: "markdown",
      category: "memory_bank",
    });

    files.push({
      path: ".memory_bank/progress.md",
      name: "progress.md",
      content: `# Progress Status & Known Debts
- **Completed Modules:**
  - [x] Memory Bank scaffold for ${pName}
  - [x] AI Guidelines & Rule enforcement configs
- **Current Working Status:** ${mb.progress || "Project scaffold verified and stable."}
- **Technical Debts & Known Bugs:**
  - [ ] Finalize end-to-end integration test suites.
`,
      language: "markdown",
      category: "memory_bank",
    });
  }

  // 4. Automation & Auditor Scripts
  if (data.automation.includeCheckGuidelines) {
    files.push({
      path: "scripts/check_guidelines.py",
      name: "check_guidelines.py",
      content: replaceCommon(TEMPLATE_CHECK_GUIDELINES_PY),
      language: "python",
      category: "scripts",
    });
  }

  if (data.automation.includePreCommitHook) {
    files.push({
      path: "scripts/pre-commit-hook.sh",
      name: "pre-commit-hook.sh",
      content: TEMPLATE_PRE_COMMIT_HOOK,
      language: "bash",
      category: "scripts",
    });
  }

  if (data.automation.includeGitHubCI) {
    files.push({
      path: ".github/workflows/ai-guidelines-ci.yml",
      name: "ai-guidelines-ci.yml",
      content: TEMPLATE_GITHUB_CI,
      language: "yaml",
      category: "ci",
    });
  }

  if (data.automation.includeAuditPrompt) {
    const auditContent = isTr ? TEMPLATE_AUDIT_PROMPT_TR : TEMPLATE_AUDIT_PROMPT_EN;
    files.push({
      path: "AUDIT_PROMPT.md",
      name: "AUDIT_PROMPT.md",
      content: replaceCommon(auditContent),
      language: "markdown",
      category: "guidelines",
    });
  }

  if (data.automation.includeGitignore) {
    files.push({
      path: ".gitignore",
      name: ".gitignore",
      content: TEMPLATE_GITIGNORE,
      language: "gitignore",
      category: "config",
    });
  }

  return files;
}

export function generateCliCommand(data: WizardFormData): string {
  const platforms = data.targetPlatforms.join(",");
  const languages = data.languages.join(",");
  const maxLines = data.constraints.maxLines;
  const projectName = encodeURIComponent(data.memoryBank.projectName || "my-vibe-project");
  return `npx vibe-governor init --name="${projectName}" --platforms="${platforms}" --languages="${languages}" --max-lines=${maxLines} --lang=${data.locale}`;
}
