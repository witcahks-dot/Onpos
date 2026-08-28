# THEME_FLICKER_FIX_CHANGELOG — Tema Kırpışma (Flicker) Düzeltmeleri Değişiklik Günlüğü

**Branch:** `fix/theme-flicker-hydration`  
**Tarih:** 2026-08-28  
**Sürüm:** v2.3.0 (Zero-Flicker Synchronous SSR-to-Store Injection)

---

## 1. Değiştirilen Dosyalar ve Gerekçeleri

### 1. `src/app/layout.tsx`
- **Gerekçe:** Sunucuda DB'den okunan güncel `settings` ve `initialTheme` verisi `RootLayout` seviyesinde hazırlanıp `<CMSHydrator initialSettings={initialSettings} />` bileşenine aktarıldı.
- **Sonuç:** Server-to-Client veri aktarım köprüsü kuruldu; sunucu çıktısı ile ilk client render'ı %100 senkronize edildi.

### 2. `src/lib/cms-store.ts`
- **Gerekçe:** `initServerData: (serverData) => void` metodu eklendi. İstemcide JavaScript ayağa kalktığı ilk anda sunucudan gelen `initialSettings` değeriyle Zustand store doğrudan başlatılır.
- **Sonuç:** `useCMSStore` istemcide ilk çalıştığı anda asla statik `defaultCMSData`'daki eski `'theme-existing'` değerine düşmez; sunucuyla aynı temayla (`theme-fintech`) başlar.

### 3. `src/components/CMSHydrator.tsx`
- **Gerekçe:** `initialSettings` prop'unu alarak `useRef` kontrolüyle ilk render anında senkron olarak `initServerData` çağırması sağlandı.
- **Sonuç:** Alt bileşenler (`ThemeDispatcher`) render edilmeden önce store güncellendi; 0 ms hydration uyumu elde edildi.

### 4. `src/themes/fintech/FintechHomePage.tsx` & `src/themes/existing/ExistingHomePage.tsx`
- **Gerekçe:** Root layout'ta zaten çalışan `fetchCMSData()` çağrısının sayfa bileşenlerinde gereksiz yere mükerrer (duplicate) tetiklenmesi kaldırıldı.
- **Sonuç:** Gereksiz ağ istekleri ve sayfa içi remount döngüleri engellendi.
