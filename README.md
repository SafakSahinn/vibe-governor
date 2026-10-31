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
