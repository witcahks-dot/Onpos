# PAYPOS / ONPOS2 — Route, İçerik ve Tema Eşleme Haritası (Aşama 1)

Bu doküman, projedeki tüm public ve admin route'larını, dinamik parametreleri, tüketilen CMS modellerini ve `theme-existing` ile `theme-fintech` arasındaki sunum karşılıklarını haritalandırır.

---

## 1. Public Sayfalar ve Tema Eşleme Haritası

| Route Yolu | Sayfa Türü & Dosya | Dinamik Param | Bağlı CMS Varlıkları | Mevcut Tema (`theme-existing`) | Yeni Fintech Tema (`theme-fintech`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | Ana Sayfa (`src/app/page.tsx`) | Yok | `homeSections`, `heroSlides`, `products`, `services`, `solutions`, `projects`, `references`, `testimonials`, `team`, `blogPosts`, `faqs`, `trustStats`, `corporateIntro`, `cloudPanel`, `whyUs` | 3D Spatial CoverFlow Slider, Kurumsal Beyaz Bölümler, Mavi Vurgular | Modern Koyu Fintek Hero, Metrik Kartları ("12+ Years", "78% Finance Rate"), İnteraktif Fintek Bakiye & Grafik Kartları, İki Sütunlu Fintek Akordeon SSS, Bülten Kutusu, Fintek Modülleri |
| `/pos-cihazlari` | Ürün Kataloğu (`src/app/pos-cihazlari/page.tsx`) | Yok | `products`, `settings` | Kategori filtreleme butonları, beyaz ürün kartları, fiyat/teklif rozeti | Koyu/modern fintek donanım kartları, özellik etiketleri, hızlı filtreleme |
| `/pos-cihazlari/[slug]` | Ürün Detayı (`src/app/pos-cihazlari/[slug]/page.tsx`) | `slug` (örn: `hugin-tiger-t300`) | `products` (tekil kayıt), `settings` | Büyük ürün galerisi, teknik özellikler tablosu, ikame/garanti rozetleri, teklif modalı | Fintek ürün inceleme düzeni, interaktif şartname tablosu, fintek komisyon hesaplama/teklif alanı |
| `/hizmetler` | Hizmet Listesi (`src/app/hizmetler/page.tsx`) | Yok | `services` | İki sütunlu alternatifli kurumsal kartlar, özellik maddeleri | Modern fintek hizmet kartları, ikonlar, avantaj vurguları |
| `/hizmetler/[slug]` | Hizmet Detayı (`src/app/hizmetler/[slug]/page.tsx`) | `slug` (örn: `satis-ve-kurulum`) | `services` (tekil kayıt), `settings` | Detay metni, faydalar ve özellikler grid'i, teklif CTA | Fintek servis detay düzeni, müşteri güvence kartları |
| `/cozumler` | Sektörel Çözümler (`src/app/cozumler/page.tsx`) | Yok | `solutions` | Restoran, perakende vb. sektörel çözüm listesi | Fintek ödeme akışları ve sektör çözümleri |
| `/cozumler/[slug]` | Çözüm Detayı (`src/app/cozumler/[slug]/page.tsx`) | `slug` (örn: `odeko-komisyon`) | `solutions` (tekil kayıt) | Çözüm görseli, hedef kitle, özellik listesi | Fintek çözüm mimarisi ve entegrasyon şeması |
| `/projeler` | Projeler (`src/app/projeler/page.tsx`) | Yok | `projects` | Tamamlanan/devam eden projeler grid'i | Fintek vaka analizi ve proje vitrini |
| `/projeler/[slug]` | Proje Detayı (`src/app/projeler/[slug]/page.tsx`) | `slug` (örn: `zincir-market-pos`) | `projects` (tekil kayıt) | Proje galerisi, kullanılan ürün/hizmetler | Fintek proje sonuç metrikleri ve müşteri başarı hikayesi |
| `/kurumsal/hakkimizda` | Hakkımızda (`src/app/kurumsal/hakkimizda/page.tsx`) | Yok | `aboutPage`, `corporateIntro` | Hikaye, vizyon, misyon, temel değerler ve sertifikalar | Modern fintek şirket profili ve kurumsal metrikler |
| `/kurumsal/tarihcemiz` | Tarihçe (`src/app/kurumsal/tarihcemiz/page.tsx`) | Yok | `aboutPage` / Statik Zaman Çizelgesi | Dikey kurumsal kronoloji timeline | Modern fintek büyüme ve inovasyon yol haritası |
| `/kurumsal/belgelerimiz`| Belgeler & Sertifikalar (`src/app/kurumsal/belgelerimiz/page.tsx`) | Yok | `aboutPage.certifications` | BDDK, PCI-PTS, ISO sertifika kartları | Fintek regülasyon ve güvenlik akreditasyonları |
| `/kurumsal/referanslar` (ve `/referanslar`) | Referanslar (`src/app/referanslar/page.tsx`) | Yok | `references` | İnteraktif Türkiye Haritası (`TurkeyMap.tsx`), il/ilçe filtreleme, Logo Wall | Fintek müşteri vitrini, harita entegrasyonu ve kurumsal logolar |
| `/kurumsal/ekibimiz` | Yönetim & Ekip (`src/app/kurumsal/ekibimiz/page.tsx`) | Yok | `team` | Ekip üyeleri grid'i, unvan ve sosyal linkler | Fintek liderlik ve teknoloji ekibi kartları |
| `/kurumsal/bayiler` | Bayi & Şube Listesi (`src/app/kurumsal/bayiler/page.tsx`) | Yok | `dealers` | Şube adres, telefon ve harita listesi | Fintek yetkili servis ve dağıtım noktaları haritası |
| `/kurumsal/banka-hesaplari` | Banka Hesapları (`src/app/kurumsal/banka-hesaplari/page.tsx`) | Yok | `bankAccounts` | IBAN kopyalama butonlu banka hesap kartları | Modern IBAN ve FAST/EFT fintek kartları |
| `/kurumsal/e-katalog` | E-Katalog İndirme (`src/app/kurumsal/e-katalog/page.tsx`) | Yok | `catalogs` | PDF indirme kartları ve dosya boyutu | Fintek dijital dokümantasyon merkezi |
| `/kurumsal/kariyer` | Kariyer (`src/app/kurumsal/kariyer/page.tsx`) | Yok | Statik Pozisyonlar / Başvuru | Açık pozisyon listesi ve CV başvuru alanı | Fintek kariyer fırsatları ve yetenek formu |
| `/sayfa/[slug]` & `/kurumsal/[slug]` | Dinamik Özel Sayfalar (`src/app/sayfa/[slug]/page.tsx`) | `slug` (örn: `kvkk`, `gizlilik`) | `customPages` | Dinamik bloklar (metin, callout, özellikler, CTA) | Fintek kurumsal ve yasal metin şablonu |
| `/blog` & `/blog/[slug]` | Blog & Haberler (`src/app/blog/page.tsx`) | `slug` (örn: `gib-tebligi-2026`) | `blogPosts` | Haber listesi, etiketler, yazar profili ve detay | Fintek bülteni, mevzuat ve sektörel analizler |
| `/galeri` | Foto & Video Galeri (`src/app/galeri/page.tsx`) | Yok | `gallery` | Albüm filtreleme, lightbox fotoğraf/video | Fintek etkinlik ve ürün lansman galerisi |
| `/sss` | S.S.S (`src/app/sss/page.tsx`) | Yok | `faqs` | Kategori tab'ları ve akordeon soru-cevap listesi | Referans görseldeki 2 sütunlu modern fintek akordeonu |
| `/iletisim` | İletişim (`src/app/iletisim/page.tsx`) | Yok | `settings` | Harita, adres, telefon, WhatsApp ve form | Fintek iletişim masası ve anlık destek kanalları |

---

## 2. Admin Yönetim Paneli Sayfa Haritası (`/admin/*`)

| Admin Route | Modül Adı | Yönetilen Veri Modeli | İşlemler |
| :--- | :--- | :--- | :--- |
| `/admin` | Genel Bakış Dashboard | `submissions`, `products`, `services`, `subscribers` | Metrikler, son başvurular, hızlı bağlantılar |
| `/admin/settings` | Genel Ayarlar & Logo | `SiteSettings` (Logo, Renkler, İletişim, Yüzen Butonlar, **Tema Seçimi**) | Düzenleme ve Canlı Güncelleme |
| `/admin/header-footer`| Header & Footer Yönetimi | `HeaderConfig`, `FooterConfig` | Topbar, buton metinleri, footer link sütunları |
| `/admin/sections` | Ana Sayfa Modül Sıralama | `HomeSectionConfig[]` | Sürükle-bırak / Oklarla sıralama, aktif/pasif |
| `/admin/products` | Ürün Yönetimi (POS) | `PosProduct[]` | Ekle, Düzenle, Sil, Öne Çıkar, Teknik Özellikler |
| `/admin/services` | Hizmet Yönetimi | `ServiceItem[]` | Ekle, Düzenle, Sil, İkon, Özellik ve Faydalar |
| `/admin/solutions` | Sektörel Çözümler | `SolutionItem[]` | Ekle, Düzenle, Sil, Hedef Kitle |
| `/admin/projects` | Proje Yönetimi | `ProjectItem[]` | Ekle, Düzenle, Sil, Müşteri, Durum, Galeri |
| `/admin/pages` | Sayfa Yönetimi | `CustomPage[]` | Şablon seçimi, dinamik blok ekleme/çıkarma |
| `/admin/intro` | Kurumsal Tanıtım (Ana Sayfa) | `CorporateIntroConfig` | Başlık, maddeler, görsel, kart kutuları |
| `/admin/about` | Hakkımızda Sayfası | `AboutPageData` | Vizyon, Misyon, Değerler, Sertifikalar |
| `/admin/faqs` | S.S.S Yönetimi | `FaqItem[]` | Ekle, Düzenle, Sil, Kategori, Sıralama |
| `/admin/references` | Referans Yönetimi | `ReferenceItem[]` | Ekle, Düzenle, Sil, İl/İlçe, Logo, Sıralama |
| `/admin/testimonials`| Müşteri Görüşleri | `TestimonialItem[]` | Onayla/Reddet, Düzenle, Sil, Puan |
| `/admin/team` | Ekip Yönetimi | `TeamMember[]` | Ekle, Düzenle, Sil, Sosyal Linkler, Sıralama |
| `/admin/dealers` | Bayi & Şube Yönetimi | `DealerBranch[]` | Ekle, Düzenle, Sil, Şehir, Bölge, İletişim |
| `/admin/blog` | Haber & Blog Yönetimi | `BlogPost[]` | Ekle, Düzenle, Sil, Markdown/HTML, Etiketler |
| `/admin/hero` | Slider Yönetimi (Hero) | `HeroSlide[]` | Ekle, Düzenle, Sil, Görsel, CTA, Sıralama |
| `/admin/gallery` | Foto Galeri | `GalleryItem[]` | Ekle, Düzenle, Sil, Foto/Video, Albüm |
| `/admin/bank-accounts`| Banka Hesapları | `BankAccount[]` | Ekle, Düzenle, Sil, IBAN, Banka Logosu |
| `/admin/catalogs` | E-Katalog Yönetimi | `ECatalog[]` | Ekle, Düzenle, Sil, PDF Bağlantısı |
| `/admin/submissions` | Gelen Teklif Talepleri | `QuoteSubmission[]` | Durum Güncelle (Yeni, İnceleniyor, Tamamlandı), Sil |
| `/admin/subscribers` | E-Bülten Aboneleri | `SubscriberItem[]` | Liste Görüntüleme, Dışa Aktarma |
| `/admin/users` | Kullanıcı & Yetki Yönetimi | `AdminUser[]` | Ekle, Düzenle, Sil, Rol Atama |
| `/admin/cloud-panel` | Bulut Servis Paneli | `CloudPanelConfig` | Gelir, Cihaz Sayısı, Hız metrikleri |
| `/admin/stats` | Güven İstatistikleri | `TrustStat[]` | Sayı, Açıklama, Sıralama |
| `/admin/why-us` | Neden Biz Maddeleri | `WhyUsItem[]` | Ekle, Düzenle, Sil, Sıralama |
| `/admin/menu` | Menü Yönetimi | `MenuItem[]` | Sıralama, Görünürlük, Mega Menü Ayarları |
| `/admin/login` | Yönetici Girişi | `useAuthStore` | Giriş formu, oturum açma |
