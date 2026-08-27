# PAYPOS / ONPOS2 — Veritabanı ve Kod Geri Dönüş Planı (ROLLBACK_PLAN.md) (Aşama 3)

Bu doküman, migration işlemi veya sonraki aşamalarda beklenmeyen bir hata oluşması durumunda sistemin en hızlı ve güvenli şekilde önceki kararlı duruma (`baseline`) döndürülmesini sağlayan adımları tanımlar.

---

## 1. Geri Dönüş Senaryoları ve Tetikleyiciler

Aşağıdaki durumlardan herhangi biri gerçekleşirse derhal Rollback prosedürü işletilir:
1. Migration sonrasında `npm run build` veya `npx tsc --noEmit` hatası oluşması.
2. `GET /api/cms/all` veya `PUT /api/cms/settings` endpoint'lerinin 500 hatası vermesi.
3. Mevcut temanın (`theme-existing`) herhangi bir sayfasında görsel veya veri kırılması yaşanması.
4. Veri kaybı veya eksik alan tespiti.

---

## 2. Geri Dönüş SQL Scripti (Rollback Script)

Dosya: `migrations/001_rollback_theme_id.sql`

```sql
BEGIN;

-- 1. DROP THEME OVERRIDES TABLE & POLICIES
DROP TABLE IF EXISTS public.theme_overrides CASCADE;

-- 2. DROP THEME_ID COLUMN FROM SETTINGS TABLE
DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'settings'
          AND column_name = 'theme_id'
    ) THEN
        ALTER TABLE public.settings DROP COLUMN theme_id;
    END IF;
END $$;

COMMIT;
```

---

## 3. JSON Veritabanı Geri Yükleme Adımı

```bash
# Alınan yedek dosyayı birincil veritabanı üzerine kopyala
cp data/cms-db.backup-pre-migration.json data/cms-db.json

# Bellek içi cache'i ve geliştirme sunucusunu yeniden başlat
```

---

## 4. Kod Düzeyi Geri Dönüş Adımları

1. `src/types/index.ts` içindeki `themeId` alanı kaldırılır veya opsiyonel (`themeId?: string`) haline getirilir.
2. Git çalışma ağacında yapılan değişiklikler geri alınır:
   ```bash
   git checkout main
   ```
3. `npm run build` çalıştırılarak baseline durumunun korunduğu doğrulanır.

---

## 5. Rollback Sonrası Doğrulama Kontrol Listesi

- [ ] `data/cms-db.json` dosyası migration öncesi boyut ve içeriğe sahip.
- [ ] `http://localhost:3000` ana sayfası ve alt sayfaları (`/pos-cihazlari`, `/hizmetler`, `/kurumsal/hakkimizda`) hatasız açılıyor.
- [ ] `/admin/settings` ayar kaydetme işlemi 200 OK yanıtı veriyor.
- [ ] `npx tsc --noEmit` 0 hata veriyor.
