# 🛡️ Vibe Governor Web Sihirbazı

**Vibe Governor**, yapay zeka destekli (vibe coding) büyük ölçekli yazılım ve donanım (HDL: Verilog/VHDL) projelerinde hafıza kaybını, 800 satır kuralı ihlallerini ve spagetti kod sapmalarını engelleyen modern bir web sihirbazı ve otomasyon platformudur.

---

## 🚀 Özellikler & 5 Adımlı Akış

1. **Adım 1: Dil ve Target AI Platform Seçimi**
   - Dil Desteği: Türkçe (TR) ve İngilizce (EN)
   - Çoklu AI Asistan Desteği: AntiGravity AI Agent (`ANTIGRAVITY.md`), Claude CLI (`CLAUDE.md`), Cursor IDE (`.cursorrules`), Windsurf IDE (`.windsurfrules`), VS Code + Cline (`.clinerules`), GitHub Copilot (`.github/copilot-instructions.md`)
   - Diller: Rust, TypeScript, Python, C++, Go ve HDL (Verilog, VHDL)

2. **Adım 2: Mimari ve Kısıtlar Yapılandırması**
   - Ayarlanabilir Dosya Satır Tavanı (Varsayılan 800 satır)
   - Dokümantasyon Kalite Barajı (Varsayılan 8/10)
   - Dile Özel Güvenlik Anahtarları (Rust no-unsafe/clone, TypeScript no-any, Python type hints, C++ smart pointers, Go error checks, HDL non-blocking atama & latch önleme)

3. **Adım 3: Memory Bank Formu (6 Çekirdek Dosya)**
   - `projectbrief.md`: Proje Vizyonu ve Çekirdek Hedefler
   - `productContext.md`: Çözülen Problem ve Kullanıcı Deneyimi
   - `systemPatterns.md`: Mimari Desenler, Modül Hiyerarşisi, Veri Akışı
   - `techContext.md`: Teknolojiler, Bağımlılıklar, Derleme Komutları
   - `activeContext.md`: Mevcut Odak, Son Yapılanlar, Sıradaki Adımlar
   - `progress.md`: Çalışan Modüller, Tamamlanış Oranı, Teknik Borçlar
   - Tek tıkla hazır örneklerle doldurma (`Pre-fill`)

4. **Adım 4: Otomasyon ve Denetçi Betikleri**
   - `scripts/check_guidelines.py`: Statik kod boyutu ve yasaklı anahtar kelime denetçisi
   - `scripts/pre-commit-hook.sh`: Git pre-commit engelleyici kanca
   - `.github/workflows/ai-guidelines-ci.yml`: GitHub Actions CI/CD otomasyonu
   - `AUDIT_PROMPT.md`: Frontier modeller (Opus/Sonnet/GPT-4o) için teknik borç tarama talimatı
   - `.gitignore`: Memory bank korumalı git konfigürasyonu

5. **Adım 5: Ön İzleme ve Dışa Aktarma Hub'ı**
   - İnteraktif Dosya Ağacı (Tree View) ve Arama/Filtreleme
   - Satır numaralı, syntax-aware Kod Ön İzleme, Tekil Dosya İndirme ve Kopyalama
   - **Proje Paketini İndir (.ZIP):** Tarayıcı tarafında JSZip ile eksiksiz klasör yapılı `.zip` paketi
   - **Tek Satır CLI Komutu Üretimi**

---

## ⌨️ CLI (Tek Satır Kurulum)

Sihirbazın 5. adımındaki komut, tüm seçimleri `--preset` ile taşır ve aynı dosyaları doğrudan proje klasörüne yazar (Node.js 18+):

```bash
npx -y github:SafakSahinn/vibe-governor init --preset=<sihirbazdan kopyalanan değer>
# veya preset olmadan:
npx -y github:SafakSahinn/vibe-governor init --name=my-app --languages=Rust,Verilog --lang=en
```

- Mevcut dosyalar korunur (`--force` ile üzerine yazılır), `--dry-run` sadece listeler.
- Klasörde git deposu varsa `.git/hooks/pre-commit` otomatik kurulur (`--no-hook` ile kapatılır).
- Paket npm'e yayınlanırsa komut `npx vibe-governor init --preset=...` olarak kısalır.

## 🧱 Mimari

- `src/lib/schema.ts` — Zod şeması (React Hook Form doğrulaması + CLI preset doğrulaması)
- `src/lib/rules.ts` — seçili dil × güvenlik anahtarı → aktif kural listesi
- `src/lib/templates/` — `AI_GUIDELINES.md`, IDE kural dosyaları, Memory Bank, `check_guidelines.py`, kanca/CI/denetim/.gitignore şablonları
- `src/lib/templateEngine.ts` — `{{PLACEHOLDER}}` motoru ve dosya üretimi
- `cli/index.ts` → `bin/vibe-governor.cjs` (esbuild ile tek dosya, bağımlılıksız)

## 🧪 Test

```bash
npm test   # CLI'yı derler, paket üretir, Python denetçisini iyi/kötü örnek kodlarla çalıştırır
```

`cli/` veya `src/lib/` değiştiğinde `npm run build:cli` ile `bin/vibe-governor.cjs` yeniden üretilip commit'lenmelidir (npx GitHub'dan bu dosyayı çalıştırır).

## 💻 Çalıştırma Talimatları

Geliştirme sunucusunu başlatmak için:

```bash
npm run dev
```

Ardından tarayıcınızdan `http://localhost:3000` adresine gidin.

Üretim derlemesi için:

```bash
npm run build
npm run start
```
