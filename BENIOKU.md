# 🛡️ Vibe Governor Web Sihirbazı

[English](README.md) · **Türkçe**

**Vibe Governor**, yapay zeka destekli (vibe coding) büyük ölçekli yazılım ve donanım (HDL: Verilog/VHDL) projelerinde hafıza kaybını, 800 satır kuralı ihlallerini ve spagetti kod sapmalarını engelleyen modern bir web sihirbazı ve otomasyon platformudur.

---

## 🚀 Özellikler & 5 Adımlı Akış

1. **Adım 1: Dil ve Target AI Platform Seçimi**
   - Arayüz dili (sağ üst TR/EN) ve üretilen dosyaların dili ayrı ayrı seçilir
   - Çoklu AI Asistan Desteği: AGENTS.md standardı, Claude Code, Gemini CLI, Google Antigravity, Cursor, Windsurf/Devin, Cline, GitHub Copilot
   - Diller: C, C++, C#, Java, JavaScript, TypeScript, Python, Go, Rust, Kotlin, Swift, PHP ve HDL (Verilog, VHDL)

2. **Adım 2: Mimari ve Kısıtlar Yapılandırması**
   - Ayarlanabilir Dosya Satır Tavanı (Varsayılan 800 satır)
   - Dokümantasyon Kalite Barajı (Varsayılan 8/10)
   - Dile Özel Güvenlik Anahtarları (23 anahtar, 1. adımda seçilen dillere göre otomatik açılır): C güvensiz fonksiyonlar ve malloc NULL kontrolü, C++ ham işaretçi, C# dynamic/async void, Java istisna/loglama, JavaScript var/==, TypeScript any, Python tip ipuçları/global, Go hata kontrolü, Rust unsafe/clone, Kotlin !!/GlobalScope, Swift zorla açma, PHP strict_types/eval/hazırlanmış SQL, HDL atama, latch ve VHDL duyarlılık listesi

3. **Adım 3: Memory Bank Formu (6 Çekirdek Dosya)**
   - `projectbrief.md`: Proje Vizyonu ve Çekirdek Hedefler
   - `productContext.md`: Çözülen Problem ve Kullanıcı Deneyimi
   - `systemPatterns.md`: Mimari Desenler, Modül Hiyerarşisi, Veri Akışı
   - `techContext.md`: Teknolojiler, Bağımlılıklar, Derleme Komutları
   - `activeContext.md`: Mevcut Odak, Son Yapılanlar, Sıradaki Adımlar
   - `progress.md`: Çalışan Modüller, Tamamlanış Oranı, Teknik Borçlar
   - Önceki adımlardan çıkarılabilen alanlar (özet, mimari, komutlar, aktif oturum, ilerleme) otomatik doldurulur; elle düzenlenen metin korunur

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

## 📖 Uygulama İçi Rehber

Sağ üstteki **Rehber / Guide** butonu; uygulamanın ne yaptığını, ne işe yaradığını, 5 adımın nasıl çalıştığını, üretilen dosyaları, kurulumu, günlük akışı, denetçi kurallarını ve SSS’yi iki dilde anlatır.

## ⌨️ CLI (Tek Satır Kurulum)

Sihirbazın 5. adımındaki komut, tüm seçimleri `--preset` ile taşır ve aynı dosyaları doğrudan proje klasörüne yazar (Node.js 18+):

```bash
npx -y vibe-governor init --preset=<sihirbazdan kopyalanan değer>
# veya preset olmadan:
npx -y vibe-governor init --name=my-app --languages=Rust,Verilog --lang=en
```

- `--languages` verilmezse diller projedeki dosyalardan algılanır (`npx vibe-governor detect` ile görebilirsiniz).
- Mevcut dosyalar korunur (`--force` ile üzerine yazılır), `--dry-run` sadece listeler.
- Tüm seçimler `vibe-governor.json` dosyasına kaydedilir. Sonradan değiştirmek için:
  `npx -y vibe-governor update --max-lines=600 --enable=tsNoAny --disable=includeGitHubCI`
  Elle düzenlenmiş dosyalar korunur (yeni sürüm `<dosya>.vibe-new` olarak yazılır), Memory Bank'e dokunulmaz, seçimden çıkan araçların değiştirilmemiş dosyaları kaldırılır.
- Sihirbazdaki **Yapılandırma Yükle** düğmesi bir projenin `vibe-governor.json` dosyasını forma geri yükler.

### Mevcut projeler, istisnalar ve Memory Bank uyarısı

- `python3 scripts/check_guidelines.py --update-baseline` mevcut ihlalleri `.vibe-baseline.json`'a alır; sonra yalnızca yeni ihlaller commit'i engeller.
- Satır içi istisna: `// vibe-ignore: ts_any`, bir alt satır için `vibe-ignore-next-line`, tüm dosya için ilk 10 satırda `vibe-ignore-file: line_limit`. Her bulgunun sonunda kural kimliği yazar.
- Pre-commit kancası `--staged` ile yalnızca commit'e giren dosyaların hazırlanmış içeriğini denetler; kod değişip `.memory_bank/` güncellenmediyse uyarır.

### Araç dosyaları (güncel resmi biçimler)

AGENTS.md · CLAUDE.md · GEMINI.md · `.agents/rules/` (Antigravity) · `.cursor/rules/*.mdc` · `.windsurf/rules/` · `.clinerules/` · `.github/copilot-instructions.md`
- Klasörde git deposu varsa `.git/hooks/pre-commit` otomatik kurulur (`--no-hook` ile kapatılır).
- GitHub sürümü de çalışır: `npx -y github:SafakSahinn/vibe-governor init ...`

## 🧱 Mimari

- `src/lib/schema.ts` — Zod şeması (React Hook Form doğrulaması + CLI preset doğrulaması)
- `src/lib/rules.ts` — seçili dil × güvenlik anahtarı → aktif kural listesi
- `src/lib/templates/` — `AI_GUIDELINES.md`, IDE kural dosyaları, Memory Bank, `check_guidelines.py`, kanca/CI/denetim/.gitignore şablonları
- `src/lib/templateEngine.ts` — `{{PLACEHOLDER}}` motoru ve dosya üretimi
- `cli/index.ts` → `bin/vibe-governor.cjs` (esbuild ile tek dosya, bağımlılıksız)
- `src/components/ui/` — shadcn/ui bileşenleri (Button, Switch, Dialog; Radix tabanlı, `components.json` ile `npx shadcn add` uyumlu)
- Yığın: Next.js 16 (statik export), React 19, Tailwind CSS 3, React Hook Form + Zod 4, Monaco Editor, Framer Motion

## 🧪 Test

```bash
npm test       # CLI'yı derler; üretilen paketi ve Python denetçisini iyi/kötü örneklerle, ardından arayüzü (Vitest + Testing Library) test eder
npm run test:ui  # yalnızca arayüz testleri
npm run lint   # ESLint (eslint-config-next)
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

## 📄 Lisans

[MIT](LICENSE) © 2026 SafakSahinn
