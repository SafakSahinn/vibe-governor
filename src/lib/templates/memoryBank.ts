import type { GeneratedFile, WizardFormData } from "../../types/wizard";
import type { TemplateVars } from "../templateEngine";

/**
 * The 6 Memory Bank files (spec §3.3 / §3.4), filled with the step-3 form input.
 * Empty inputs fall back to sensible starter text.
 */

type MemoryFile = [name: string, content: string];

function trFiles(d: WizardFormData, v: TemplateVars, safety: string): MemoryFile[] {
  const mb = d.memoryBank;
  const name = mb.projectName.trim() || "My Project";
  return [
    ["projectbrief.md", `# Proje Özeti ve Vizyonu
- **Proje Adı:** ${name}
- **Temel Amaç:** ${mb.projectBrief || "Projenin ana varlık nedeni ve hedefleri."}
- **Çekirdek Hedefler:**
  1. Modüler, hatasız ve sürdürülebilir mimari kurmak.
  2. AI destekli geliştirmede context kaybı yaşamamak.
`],
    ["productContext.md", `# Ürün Bağlamı ve Kullanıcı Deneyimi
- **Çözülen Problem:** ${mb.productContext || "AI kodlama asistanlarının hafıza kaybı ve spagetti koda yol açmasını önlemek."}
- **Hedef Kullanıcı Kitlesi:** Yazılım ve donanım geliştiricileri, teknik liderler.
- **Kritik İşlevsel Beklentiler:**
  - Maksimum ${v.MAX_LINES} satır kuralının tavizsiz uygulanması.
  - Public yapılarda >= ${v.DOC_SCORE}/10 dokümantasyon puanı.
`],
    ["systemPatterns.md", `# Sistem Mimarisi ve Tasarım Kalıpları
- **Mimari Yapı:** ${mb.systemPatterns || "Modüler mimari ve katmanlı servis deseni."}
- **Kullanılan Tasarım Kalıpları:** Factory, Adapter, Single Responsibility, Explicit Error Handling.
- **Modüller Arası Veri Akışı:**
  - [Modül A] -> [Modül B] (Arayüz/Interface üzerinden)
`],
    ["techContext.md", `# Teknoloji Yığını ve Ortam Kısıtları
- **Diller ve Araçlar:** ${d.languages.join(", ") || "(henüz seçilmedi)"}
- **Temel Bağımlılıklar ve Derleme Komutları:** ${mb.techContext || "Standart araç zinciri ve derleyici ayarları."}
- **Kısıtlamalar:** ${v.MAX_LINES} satır sınırı, ${safety}
`],
    ["activeContext.md", `# Aktif Oturum Bağlamı
- **Mevcut Odak Noktası:** ${mb.activeContext || "Proje başlangıç konfigürasyonu ve anayasa entegrasyonu."}
- **Son Yapılan Değişiklikler:**
  - Vibe Governor Memory Bank şablonları oluşturuldu.
  - AI kuralları ve otomasyon betikleri eklendi.
- **Sonraki Adımlar:**
  1. Çekirdek modüllerin kodlanması.
  2. Otomatik denetçi betiğinin test edilmesi.
`],
    ["progress.md", `# İlerleme Durumu ve İnceleme Raporu
- **Tamamlanan Modüller:**
  - [x] Memory Bank altyapısı (${name})
  - [x] AI Guidelines & Kural seti
- **Çalışan Mevcut Durum:** ${mb.progress || "Proje iskeleti kararlı."}
- **Teknik Borçlar ve Bilinen Hatalar:**
  - [ ] İlk uçtan uca entegrasyon testlerinin tamamlanması.
`],
  ];
}

function enFiles(d: WizardFormData, v: TemplateVars, safety: string): MemoryFile[] {
  const mb = d.memoryBank;
  const name = mb.projectName.trim() || "My Project";
  return [
    ["projectbrief.md", `# Project Brief & Vision
- **Project Name:** ${name}
- **Core Purpose:** ${mb.projectBrief || "Primary objective of the project and key deliverables."}
- **Key Goals:**
  1. Establish modular, resilient, and maintainable architecture.
  2. Prevent AI context drift and hallucination across sessions.
`],
    ["productContext.md", `# Product Context & UX
- **Problem Solved:** ${mb.productContext || "Mitigates AI assistant context loss and spaghetti code creep."}
- **Target Audience:** Software engineers, hardware designers, tech leads.
- **Key Functional Expectations:**
  - Strict enforcement of max ${v.MAX_LINES} lines per file.
  - Public documentation score >= ${v.DOC_SCORE}/10.
`],
    ["systemPatterns.md", `# System Architecture & Design Patterns
- **Architecture Type:** ${mb.systemPatterns || "Modular architecture with isolated service layers."}
- **Design Patterns:** Factory, Adapter, Single Responsibility, Explicit Error Handling.
- **Data Flow Between Modules:**
  - [Module A] -> [Module B] (via explicit interface)
`],
    ["techContext.md", `# Tech Stack & Environment Constraints
- **Primary Languages:** ${d.languages.join(", ") || "(not selected yet)"}
- **Key Dependencies & Build Commands:** ${mb.techContext || "Standard toolchain and compiler options."}
- **Constraints:** ${v.MAX_LINES}-line ceiling, ${safety}
`],
    ["activeContext.md", `# Active Session Context
- **Current Focus:** ${mb.activeContext || "Initial project setup and constitution integration."}
- **Recent Changes:**
  - Generated Vibe Governor Memory Bank structure.
  - Linked AI rules and automation checker scripts.
- **Next Steps:**
  1. Implement core domain logic.
  2. Run guideline verification scripts.
`],
    ["progress.md", `# Progress Status & Known Debts
- **Completed Modules:**
  - [x] Memory Bank scaffold for ${name}
  - [x] AI Guidelines & Rule enforcement configs
- **Current Working Status:** ${mb.progress || "Project scaffold verified and stable."}
- **Technical Debts & Known Bugs:**
  - [ ] Finalize end-to-end integration test suites.
`],
  ];
}

/** Builds `.memory_bank/*.md` in the selected locale. */
export function buildMemoryBankFiles(data: WizardFormData, vars: TemplateVars, safety: string): GeneratedFile[] {
  const list = data.locale === "tr" ? trFiles(data, vars, safety) : enFiles(data, vars, safety);
  return list.map(([name, content]) => ({
    path: `.memory_bank/${name}`,
    name,
    content,
    language: "markdown",
    category: "memory_bank" as const,
  }));
}
