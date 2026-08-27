# PAYPOS / ONPOS2 — Veritabanı Şema Etki Analizi (SCHEMA_IMPACT.md) (Aşama 3)

Bu doküman, çift tema mimarisinin (`theme-existing` ve `theme-fintech`) veritabanı şemasına, tablolara, JSON depolamaya ve mevcut verilere olan etkisini detaylandırır.

---

## 1. Etki Özeti ve Güvenlik Seviyesi

- **Veri Kaybı Riski:** **%0 (SIFIR)** — Mevcut hiçbir tablo, kolon, tip veya kayıt silinmez veya değiştirilmez.
- **İçerik Tablolarının Çoğaltılması:** **YAPILMAZ** — `products_theme_fintech`, `services_theme_fintech` gibi klon tablolar açılmaz; tüm donanım ve servis kayıtları ortak tutulur.
- **Geriye Dönük Uyumluluk:** **%100 Tam Uyumlu** — Yeni eklenen `theme_id` kolonu varsayılan `'theme-existing'` değerini alır; mevcut sistem aynı şekilde çalışmaya devam eder.

---

## 2. Etkilenen Tablolar ve Depolama Alanları

### A. `public.settings` Tablosu
- **İşlem:** Yeni kolon ekleme (`ADD COLUMN`).
- **Yeni Kolon:** `theme_id TEXT NOT NULL DEFAULT 'theme-existing'`
- **Mevcut Veriye Etkisi:** Mevcut `default` ayar kaydının `theme_id` değeri otomatik olarak `'theme-existing'` olur. Mevcut frontend, admin ve API çağrıları hiçbir kesintiye uğramaz.
- **Null Durumu:** `NOT NULL` (Varsayılan değer her zaman mevcuttur).

### B. `public.theme_overrides` Tablosu *(Yeni İlişkisel Tablo)*
- **Amacı:** Çekirdek ürün/hizmet modellerini kirletmeden, yalnızca tema bazlı özel sunum görseli veya vurgu rengi override'ları gerekirse ilişkisel olarak saklamak.
- **Yapı:**
  - `id` (UUID PK)
  - `theme_id` (`theme-existing` | `theme-fintech`)
  - `entity_type` (`product`, `service`, `solution`, `project`, `hero_slide`, `custom_page`, `section`)
  - `entity_id` (Hedef kaydın ID'si)
  - `override_data` (JSONB)
  - `created_at`, `updated_at`
- **Mevcut Veriye Etkisi:** Sıfır. Mevcut tablolara yabancı anahtar kısıtı koymaz; bağımsız çalışır.

### C. `data/cms-db.json` Dosyası (Birincil JSON Veritabanı)
- **İşlem:** `settings` nesnesi içerisine `"themeId": "theme-existing"` anahtarı eklenir.
- **Mevcut Veriye Etkisi:** Mevcut ürünler, kategoriler, menüler ve slaytlar aynen korunur.

---

## 3. RLS (Row Level Security) ve Yetki Etki Değerlendirmesi

1. **`settings` Tablosu:**
   - Mevcut `Allow public read settings` ve `Allow public all settings` politikaları `theme_id` kolonunu otomatik kapsar.
2. **`theme_overrides` Tablosu:**
   - `Allow public read theme_overrides` (SELECT true) ile ziyaretçiler temaya özel sunum ayarlarını okuyabilir.
   - `Allow admin all theme_overrides` (ALL true) ile admin paneli override kayıtlarını yönetebilir.

---

## 4. Tablo Bazlı Etki Matrisi

| Tablo Adı | Değişiklik Türü | Yeni Kolon / Alan | Varsayılan Değer | Veri Kaybı Riski | Mevcut Sistem Etkisi |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `settings` | Kolon Ekleme | `theme_id` | `'theme-existing'` | Yok (0 risk) | Sıfır etki, geriye uyumlu |
| `theme_overrides` | Yeni Tablo | Tüm tablo | N/A | Yok (0 risk) | Çekirdek tablolardan izole |
| `products` | **DEĞİŞİKLİK YOK** | - | - | - | Doğrudan ortak kullanılır |
| `services` | **DEĞİŞİKLİK YOK** | - | - | - | Doğrudan ortak kullanılır |
| `solutions` | **DEĞİŞİKLİK YOK** | - | - | - | Doğrudan ortak kullanılır |
| `projects` | **DEĞİŞİKLİK YOK** | - | - | - | Doğrudan ortak kullanılır |
| `menu` | **DEĞİŞİKLİK YOK** | - | - | - | Doğrudan ortak kullanılır |
| `hero_slides` | **DEĞİŞİKLİK YOK** | - | - | - | Doğrudan ortak kullanılır |
| `faqs` | **DEĞİŞİKLİK YOK** | - | - | - | Doğrudan ortak kullanılır |
| `references` | **DEĞİŞİKLİK YOK** | - | - | - | Doğrudan ortak kullanılır |
| `testimonials` | **DEĞİŞİKLİK YOK** | - | - | - | Doğrudan ortak kullanılır |
| `submissions` | **DEĞİŞİKLİK YOK** | - | - | - | Doğrudan ortak kullanılır |
| `subscribers` | **DEĞİŞİKLİK YOK** | - | - | - | Doğrudan ortak kullanılır |
