# THEME_RENDER_ORDER_TRACE — Sunucu ve İstemci Render Sırası Takip Raporu

**Tarih:** 2026-08-28  

---

## 1. Mevcut (Hatalı ve Flicker Oluşturan) Render Sırası

```
[İSTEK GELDİ]
       │
       ▼
1. Next.js Server (RootLayout)
   ├─► await getActiveThemeAsync() -> DB'den 'theme-fintech' okur
   ├─► <html data-theme="theme-fintech"> basar
   │
   ▼
2. Next.js Server (Page / ThemeDispatcher)
   ├─► ThemeDispatcher SSR çalışır
   ├─► useCMSStore() ilk state'i okur -> defaultCMSData ('theme-existing')
   ├─► <ExistingHomePage /> HTML'i üretir (Mevcut Tema HTML'i)
   │
   ▼
3. Server HTML Tarayıcıya Ulaşır (İlk Paint / Frame 1)
   ├─► Tarayıcı <html data-theme="theme-fintech"> görür (Koyu CSS)
   ├─► Gövdede <ExistingHomePage /> görür (Beyaz Mavi Kartlar)
   ├─► Kullanıcı Frame 1'de Mevcut Temayı görür!
   │
   ▼
4. React Hydration (Frame 2 - 0-50ms)
   ├─► useCMSStore initial state: 'theme-existing'
   ├─► DOM ile hydrate olur (Hala ExistingHomePage)
   │
   ▼
5. Asenkron API Çağrısı (Frame 3 - 100-300ms)
   ├─► CMSHydrator useEffect() -> fetch('/api/cms/all')
   ├─► API cevabı döner: { settings: { themeId: 'theme-fintech' } }
   ├─► Zustand set({ settings }) tetiklenir
   │
   ▼
6. İkinci Render ve Dom Değişimi (Frame 4 - 300ms)
   ├─► ThemeDispatcher re-render olur: settings.themeId === 'theme-fintech'
   ├─► <ExistingHomePage /> UNMOUNT edilir
   ├─► <FintechHomePage /> MOUNT edilir
   └─► 💥 FLICKER / GÖRSEL SIÇRAMA OLUŞUR!
```

---

## 2. Olması Gereken (Hedef ve Sıfır Flicker) Render Sırası

```
[İSTEK GELDİ]
       │
       ▼
1. Next.js Server (RootLayout / Page)
   ├─► await getActiveThemeAsync() -> DB'den 'theme-fintech' okur
   ├─► Server-Side ThemeContext / InitialStoreProps: 'theme-fintech'
   ├─► <html data-theme="theme-fintech"> basar
   ├─► ThemeDispatcher server'dan gelen initialTheme = 'theme-fintech' alır
   ├─► Doğrudan <FintechHomePage /> HTML'i üretir
   │
   ▼
2. Server HTML Tarayıcıya Ulaşır (İlk Paint / Frame 1)
   ├─► Tarayıcı <html data-theme="theme-fintech"> görür
   ├─► Gövdede <FintechHomePage /> görür
   ├─► Kullanıcı İLK FRAME'DEN İTİBAREN %100 FİNTECH TEMASINI GÖRÜR!
   │
   ▼
3. React Hydration (Frame 2 - 0-50ms)
   ├─► useCMSStore initial state: 'theme-fintech' (Server initialTheme ile başlar)
   ├─► DOM ile kusursuz hydrate olur (FintechHomePage)
   │
   ▼
4. Asenkron API Çağrısı (Frame 3 - 100-300ms)
   ├─► fetch('/api/cms/all') döner -> themeId: 'theme-fintech'
   ├─► Tema zaten 'theme-fintech' olduğu için RENDERER DEĞİŞMEZ, UNMOUNT OLMAZ!
   └─► ✨ SIFIR FLICKER, KUSURSUZ VE ANINDA AÇILIŞ!
```
