# THEME_REQUEST_RESPONSE_TRACE — İstek & Yanıt Akış Takip Raporu

**Tarih:** 2026-08-28  
**İncelenen Akış:** Tema Seçimi, Kayıt İsteği, Backend İşleme, Yanıt ve Sayfa Yenileme

---

## 1. İstek / Yanıt Sözleşmesi ve Yaşam Döngüsü

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Yönetici
    participant UI as AdminSettingsPage (/admin/settings)
    participant Store as useCMSStore (Zustand)
    participant API as /api/cms/settings (Route Handler)
    participant DB as cms-db.ts (Storage Katmanı)
    participant Hydrator as CMSHydrator & ThemeDispatcher (Public Site)

    Admin->>UI: "Fintech Teması" kartına tıklar
    UI->>UI: setForm({ ...form, themeId: 'theme-fintech' })
    Admin->>UI: "Ayarları Kaydet" butonuna basar
    UI->>Store: updateSettings(form)
    Store->>Store: set({ settings: { ...settings, themeId: 'theme-fintech' } })
    Store->>API: POST /api/cms/settings (Body: JSON form)
    
    rect rgb(255, 240, 240)
        Note over API,DB: Vercel Serverless Ortamı
        API->>DB: writeCMSData({ settings: updatedObj })
        DB-->>API: fs.writeFileSync (/var/task/data/cms-db.json - Read Only Hata / Ephemeral)
    end

    API-->>Store: Yanıt (200 veya 500)
    Note over Store: Hata kontrolü yapılmıyor, UI'a başarı kabul ediliyor
    UI->>Admin: "Başarıyla Kaydedildi" mesajı gösterilir

    rect rgb(240, 245, 255)
        Note over Admin,Hydrator: Sayfa Yenilendiğinde (F5 / Yeni Sekme)
        Admin->>UI: Sayfa Yenilenir (F5)
        UI->>Store: Store sıfırlanır (defaultCMSData: theme-existing)
        Hydrator->>API: GET /api/cms/all
        API->>DB: readCMSData() (Statik cms-db.json dosyasını okur)
        DB-->>API: { settings: { themeId: 'theme-existing' } }
        API-->>Hydrator: JSON data
        Hydrator->>Store: set({ ...data }) (themeId: 'theme-existing')
        Store->>UI: Form ve tema 'theme-existing' olarak geri döner
    end
```

---

## 2. İstek ve Yanıt Detayları

### 1. UI Katmanı (`AdminSettingsPage.tsx`)
- **Tetikleyici:** `handleSubmit(e)`
- **Gönderilen Parametre:** `form` nesnesi
- **İçerik:** `{ ...settings, themeId: 'theme-fintech', ... }`

### 2. State & HTTP İstemcisi (`cms-store.ts`)
- **HTTP Metodu:** `POST`
- **Hedef URL:** `/api/cms/settings`
- **Headers:** `Content-Type: application/json`
- **Body:** `JSON.stringify(newSettings)` (Stringified form objesi)

### 3. Backend Route Handler (`src/app/api/cms/[entity]/route.ts`)
- **Yakalanan Parametre:** `entity = 'settings'`
- **Okunan Body:** `const body = await req.json();`
- **İşlem:**
  ```ts
  const currentEntityVal = (currentData as unknown as Record<string, unknown>)[entity];
  if (typeof currentEntityVal === 'object' && currentEntityVal !== null) {
    const objKey = entity as keyof CMSData;
    const updatedObj = { ...currentEntityVal, ...body };
    const newCMS = writeCMSData({ [objKey]: updatedObj });
    return NextResponse.json(newCMS[objKey], { status: 200 });
  }
  ```

### 4. Yeniden Okuma Akışı (`fetchCMSData`)
- **HTTP Metodu:** `GET`
- **Hedef URL:** `/api/cms/all`
- **Dönen Değer:** `readCMSData()` çıktısı
- **Hata Noktası:** Sunucu dosya sistemi kalıcı olmadığından `GET /api/cms/all` her zaman build zamanındaki statik `data/cms-db.json` içeriğini (`theme-existing`) döndürmektedir.
