# THEME_CACHE_AUDIT — Önbellek, SSR ve Hydration Denetim Raporu

**Tarih:** 2026-08-28  
**İncelenen Alanlar:** Next.js Route Caching, Client Hydration, Zustand Store State, `data-theme` CSS Enjeksiyonu

---

## 1. Next.js App Router ve API Route Cache İncelemesi

### `src/app/api/cms/[entity]/route.ts`
- **Konfigürasyon:**
  ```ts
  export const dynamic = 'force-dynamic';
  export const revalidate = 0;
  ```
- **Durum:** ✅ API Route caching devre dışı bırakılmıştır. `revalidate = 0` ve `force-dynamic` mevcuttur.
- **İstemci Çağrısı:** `fetch('/api/cms/all', { cache: 'no-store' })` ile `no-store` bayrağı ile çağrılmaktadır.
- **Bulgu:** API seviyesinde gereksiz Next.js cache tutulmamaktadır; sorun API'nin okuduğu dosya kaynağının Vercel'de kalıcı güncellenememesidir.

---

## 2. Client Hydration ve FOUC (Flash of Unstyled Content) Analizi

### `src/components/CMSHydrator.tsx`
1. Bileşen istemcide mount olduğunda (`useEffect`) `fetchCMSData()` çağırır.
2. API yanıtı gelene kadar Zustand store varsayılan `theme-existing` değerini tutar.
3. API yanıtı geldikten sonra `root.setAttribute('data-theme', activeThemeId)` tetiklenir.
4. **Risk / Problem:**
   - Eğer sunucu tarafında tema bilinmezse (örneğin sadece client-side fetch ile beklenirse), sayfa ilk yüklendiğinde kısa bir süre `theme-existing` görünüp ardından `theme-fintech`'e dönebilir (Hydration mismatch / Flicker).
   - **Çözüm:** `paypos_theme_id` çerezi (Cookie) kullanılarak sunucu tarafında (`layout.tsx` / `<html>` etiketi) sayfa henüz tarayıcıya gönderilmeden doğru `data-theme` ile render edilmelidir.

---

## 3. Zustand Store ve Reaktivite Denetimi

- **Dosya:** [src/lib/cms-store.ts](file:///Users/macos/Desktop/onpos2/src/lib/cms-store.ts)
- **Durum:**
  - `useCMSStore` tarayıcı belleğinde reaktif çalışmaktadır.
  - `updateSettings` çağrıldığında `set({ settings: merged })` ile anlık UI güncellemesi gerçekleşir.
  - Ancak sayfa yenilendiğinde bellek sıfırlanmakta ve `fetchCMSData` API'ye bağımlı kalmaktadır.
- **Düzeltme:**
  - `updateSettings` metodunun `fetch` yanıtını `await` edip dönen gerçek veriyi store'a yazması ve hata durumunda store'u eski haline geri alması (`rollback`) sağlanmalıdır.
