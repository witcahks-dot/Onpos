# POS Cihazı ve Ödeme Teknolojileri Kurumsal Web Sitesi & CMS - Proje Kuralları ve Mimari Rehberi

## 1. TASARIM FELSEFESİ VE MARKA KİMLİĞİ
- **Tasarım Karakteri:** White-First, Soft Grays, Modern Corporate Fintech, Premium Product Showcase.
- **Ana Renk Paleti:** `#FFFFFF` (Beyaz), `#F8FAFC` / `#F1F5F9` (Açık Gri), Accent: `#2563EB` (Modern Canlı Mavi), `#1E3A8A` (Lacivert).
- **YASAKLI ÖĞELER:** Koyu tema, neon, cyberpunk, gaming mor neonlar, aşırı glassmorphism, siyah ağırlıklı arka planlar, eski Bootstrap/kurumsal şablon hissi.
- **Hissiyat:** Ciddiyet ve Güven (Kurumsal) + Yenilikçi ve Hızlı (Teknoloji) + Profesyonellik.

---

## 2. İMZA GÖRSEL ÖZELLİK: 3D SPATIAL POS HERO SLIDER
- Hero alanındaki POS slider'ı klasik banner carousel olmayacaktır.
- **3D CoverFlow / Spatial Carousel Mantığı:**
  - **[ Sol Cihaz: Küçük, Opacity ~0.4, Geride ]**
  - **[ MERKEZ CİHAZ: Büyük, Scale 1.05, Opacity 1.0, Net, Gölge, Önde ]**
  - **[ Sağ Cihaz: Küçük, Opacity ~0.4, Geride ]**
- **Fiziksel Hareket:** Cihazlar sağa/sola gerçekten pozisyon, ölçek ve şeffaflık değiştirerek kayar (`Framer Motion`).
- **Etkileşim:** Otomatik 5s geçiş, hover'da duraklama, dokunmatik swipe/drag desteği, sol/sağ oklar, sayfalama noktaları.

---

## 3. ADMIN PANELİ ↔ BACKEND ↔ FRONTEND ENTEGRASYON ZİNCİRİ
> **KRİTİK KURAL:** Admin Paneli'nde oluşturulan hiçbir özellik frontend tarafında karşılığı olmadan bırakılamaz.

### Çalışma Mantığı:
`Admin Paneli` → `Backend API` → `Database Storage` → `Zustand/Query Store` → `Frontend Dynamic UI`

1. **Genel Ayarlar:** Admin'den Logo, Favicon, Firma Tel/E-posta, Accent Mavi Tonu veya Tema değiştirildiğinde Frontend anında güncellenmelidir.
2. **Menü Yönetimi:** Admin'den Header menü sırası/sayfaları değiştirildiğinde Frontend Header dinamik render edilmelidir.
3. **Hero Slider:** Admin'den slider görseli/metni değiştirildiğinde 3D Spatial Carousel yeni verilerle çalışmalıdır.
4. **Ürün / Hizmet / Proje / Blog:** Admin'den eklenen, düzenlenen veya pasifleştirilen ürünler Frontend listelerinde, detay sayfalarında (`/pos-cihazlari/[slug]`, `/hizmetler/[slug]`) ve arama overlay'inde anında yansımalıdır.
5. **Dinamik Sayfalar:** Admin'den yeni kurumsal sayfa oluşturulduğunda (`/admin/pages`), Frontend dynamic route (`/[slug]`) ve navigation ile sayfayı render etmelidir.
6. **Formlar:** Kullanıcının teklif formundan gönderdiği veriler Admin panelindeki teklifler ekranına düşmelidir.

---

## 4. DİNAMİK ROUTING VE SAYFA HİYERARŞİSİ
- `/` - Ana Sayfa (Spatial Slider, Trust Stats, Services, Products, Solutions, Projects, References, Testimonials, Team, Blog, Quote Form)
- `/pos-cihazlari` - Tüm POS Cihazları Kataloğu
- `/pos-cihazlari/[slug]` - Ürün Detayı (Teknik Özellikler Tablosu, PDF Şartname, İnceleme, Teklif Al Modal)
- `/hizmetler` & `/hizmetler/[slug]` - Kurumsal ve Teknik Hizmetler
- `/cozumler` & `/cozumler/[slug]` - Sektörel Ödeme Çözümleri (Restoran, Market, Perakende, Mobil)
- `/projeler` & `/projeler/[slug]` - Gerçekleştirilen / Devam Eden Projeler
- `/kurumsal/hakkimizda` - Şirket Hakkında & Hikaye
- `/kurumsal/tarihcemiz` - Tarihçe Timeline
- `/kurumsal/belgelerimiz` - Sertifikalar & Belgeler
- `/kurumsal/referanslar` - Müşteri Referansları & Logo Wall
- `/kurumsal/ekibimiz` - Yönetim ve Uzman Ekip
- `/kurumsal/kariyer` - Açık Pozisyonlar & CV Başvuru
- `/kurumsal/bayiler` - Şube & Bayi Harita/Filtreleme
- `/kurumsal/banka-hesaplari` - IBAN Kopyalama Özellikli Kurumsal Banka Hesapları
- `/kurumsal/e-katalog` - PDF Katalog İndirme Center
- `/blog` & `/blog/[slug]` - Haberler, İçerikler & Rehberler
- `/galeri` - Fotoğraf & Video Albümleri
- `/sss` - Sıkça Sorulan Sorular Accordion
- `/iletisim` - Haritayla Entegre İletişim Sayfası
- `/teklif-al` - Detaylı Teklif Formu
- `/admin/*` - Gelişmiş CMS Yönetim Paneli

---

## 5. KONTROL VE DOĞRULAMA ADIMLARI (CHECKLIST)
Her geliştirme aşamasında aşağıdaki testler uygulanacaktır:
1. `npm run build` ile TypeScript ve Next.js derleme hatasız olmalı.
2. Admin Paneli'nde ayar değiştirilip kaydedilmeli.
3. Backend API'nin veriyi güncellediği doğrulanmalı.
4. Frontend'de ilgili alanın anında değiştiği ve sayfa yenilendiğinde korunduğu test edilmeli.
5. 3D Spatial Carousel animasyonu akıcı, duyarlı ve görsel kırılmasız çalışmalı.
6. Responsive görünüm Desktop, Tablet ve Mobil cihazlarda piksel mükemmel olmalı.
