# THEME_HYDRATION_TRACE — Hydration ve State Yarış Durumu (Race Condition) Takip Raporu

**Tarih:** 2026-08-28  

---

## 1. Hydration Sırasındaki State Çatışması

| Aşama | DOM `data-theme` | `layout.tsx` Server Değeri | `ThemeDispatcher` Değeri | `useCMSStore` Değeri | Ekranda Görünen Bileşen |
|---|---|---|---|---|---|
| **1. SSR (HTML Çıktısı)** | `theme-fintech` | `theme-fintech` | `theme-existing` ⚠️ | `theme-existing` ⚠️ | `<ExistingHomePage />` |
| **2. Initial Hydration (0 ms)** | `theme-fintech` | - (Client) | `theme-existing` ⚠️ | `theme-existing` ⚠️ | `<ExistingHomePage />` |
| **3. Client fetchCMSData (200 ms)** | `theme-fintech` | - (Client) | `theme-fintech` ✅ | `theme-fintech` ✅ | `<FintechHomePage />` |

### ⚠️ Tespit Edilen Kritik Hatalar:
1. **Initial State İzolasyonu:** `RootLayout` sunucuda `getActiveThemeAsync()` ile DB'den `theme-fintech` değerini almasına rağmen, bu değeri alt component'lere (children) veya store'a `initialState` olarak aktaran bir mekanizma (`ThemeProvider`, `ThemeContext` veya `StoreInitializer`) bulunmamaktadır.
2. **`ThemeDispatcher` Varsayılan Değere Düşmesi:** `ThemeDispatcher` client component olarak render edildiğinde store henüz fetch yapmadığı için `defaultCMSData`'daki statik `themeId: 'theme-existing'` değerini almakta ve ilk render'da her zaman mevcut temayı ekrana basmaktadır.
3. **Çift Render & DOM Değişimi:** 200ms sonra API verisi gelince `settings.themeId` değişmekte ve React sayfanın tamamını unmount edip baştan mount etmektedir.
