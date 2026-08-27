# PAYPOS / ONPOS2 — Veri Akışı ve Mimari Haritası (Aşama 1)

Bu doküman, tek admin paneli, tek veritabanı ve çift tema (`theme-existing` ve `theme-fintech`) mimarisinin uçtan uca veri akışını gösterir.

---

## 1. Ana Mimari Veri Akış Şeması

```mermaid
flowchart TD
    subgraph AdminLayer["1. Admin Yönetim Paneli (/admin/*)"]
        A1["Admin UI: Formlar & CRUD Ekranları"]
        A2["useCMSStore Actions (saveProduct, updateSettings vb.)"]
        A3["useAuthStore (Rol & Oturum Denetimi)"]
    end

    subgraph BackendAPI["2. Backend & Route Handlers"]
        B1["GET /api/cms/all (revalidate: 0)"]
        B2["POST / PUT / DELETE /api/cms/[entity]"]
        B3["Zod Validation Layer (quoteSubmissionSchema, newsletterSchema)"]
    end

    subgraph StorageLayer["3. Veritabanı & Kalıcı Depolama"]
        S1["data/cms-db.json (Birincil Veri Dosyası)"]
        S2["inMemoryCache (Singleton Bellek Önbelleği)"]
        S3["Supabase DB (İsteğe Bağlı Bulut Eşitleme)"]
    end

    subgraph SharedDataLayer["4. Ortak Tip / DTO / Normalizer Katmanı"]
        D1["Data Normalizer & DTO Adapter"]
        D2["useCMSStore (Global Zustand Store)"]
        D3["Active Theme Resolver (themeId: 'theme-existing' | 'theme-fintech')"]
    end

    subgraph ThemeRenderer["5. Tema Yönlendirici (Theme Dispatcher / Registry)"]
        TR["Root Page & Layout Dispatcher"]
        T1["Theme Existing (Mevcut Kurumsal Beyaz/Mavi Tema)"]
        T2["Theme Fintech (Yeni Modern Fintek Koyu/Metrik Tema)"]
    end

    subgraph PublicFrontend["6. Public Ziyaretçi Sayfaları"]
        P1["Header, MegaMenu & Topbar"]
        P2["Hero Slider & Fintek Hero"]
        P3["Ürünler & Detay (/pos-cihazlari/[slug])"]
        P4["Hizmetler & Detay (/hizmetler/[slug])"]
        P5["Çözümler & Detay (/cozumler/[slug])"]
        P6["Projeler & Detay (/projeler/[slug])"]
        P7["Kurumsal Sayfalar & Blog (/blog/[slug])"]
        P8["SSS, Galeri, İletişim, Teklif Formu"]
        P9["Footer & E-Bülten"]
    end

    %% Akış Bağlantıları
    A1 --> A2
    A2 -->|HTTP Fetch / Payload| B2
    B2 --> B3
    B3 --> S2
    S2 --> S1
    S2 -.->|Asenkron Upsert| S3

    B1 --> S2
    D2 -->|fetchCMSData GET| B1
    D2 --> D1
    D1 --> D3

    D3 --> TR
    TR -->|themeId === 'theme-existing'| T1
    TR -->|themeId === 'theme-fintech'| T2

    T1 --> P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9
    T2 --> P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9

    %% Ziyaretçi Etkileşimleri (Form İletimi)
    P8 -->|Teklif Talebi POST| B2
    P9 -->|Bülten Kaydı POST| B2
```

---

## 2. Veri Yaşam Döngüsü (Data Lifecycle) Adımları

### A. Okuma (Read / Hydration) Döngüsü
1. Kullanıcı siteye girdiğinde `src/app/layout.tsx` içindeki `<CMSHydrator />` çalışır.
2. `useCMSStore.getState().fetchCMSData()` tetiklenir.
3. `GET /api/cms/all` isteği `src/lib/cms-db.ts` üzerindeki bellek içi `inMemoryCache`'den veya `data/cms-db.json`'dan anında döner.
4. Gelen veriler `useCMSStore` içerisine yerleşir.
5. `CMSHydrator`, `settings.primaryColor`, `settings.accentColor`, `settings.layoutDensity` ve `settings.cardStyle` değerlerini CSS kök değişkenleri (`:root`) olarak DOM'a enjekte eder.
6. Tema seçicisi (`themeId`), gelen ayara göre (`'theme-existing'` veya `'theme-fintech'`) ilgili tema bileşen ağacını render eder.

### B. Yazma ve Güncelleme (Write / Mutation) Döngüsü
1. Yönetici `/admin/settings`, `/admin/products` vb. ekranından bir değişiklik yapıp "Kaydet"e basar.
2. `useCMSStore` ilgili eylemi (`saveProduct`, `updateSettings` vb.) çalıştırır.
3. `PUT` veya `POST` ile `/api/cms/[entity]` çağrılır.
4. `writeCMSData` fonksiyonu hem belleği hem de `data/cms-db.json` dosyasını günceller.
5. Sunucu yanıtı (200 OK) store'a döner, store local state'i anında güncellenir (reaktif güncelleme).
6. Sekme yenilense dahi dosya diskte kalıcı olduğu için tüm değişiklikler korunur.

### C. Teklif Formu İletim Döngüsü (Lead Submission Flow)
1. Ziyaretçi `QuoteModal` veya `QuoteFormSection` üzerinden formu doldurur.
2. `POST /api/cms/quote-submit` çağrılır.
3. Sunucuda `quoteSubmissionSchema` (Zod) ile ad-soyad, telefon, e-posta ve KVKK onayı doğrulanır.
4. Yeni başvuru kaydı `submissions` dizisinin başına eklenir ve kaydedilir.
5. Admin `/admin/submissions` sayfasına girdiğinde başvuru listesinde anında "Yeni" rozetiyle görünür.
