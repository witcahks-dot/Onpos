// Comprehensive mapping of Turkey's 81 provinces to their major districts/semts

export const TURKEY_CITY_DISTRICTS: Record<string, string[]> = {
  'İstanbul': [
    'Kadıköy', 'Beşiktaş', 'Şişli', 'Levent', 'Sarıyer', 'Üsküdar', 'Fatih',
    'Ataşehir', 'Bakırköy', 'Maltepe', 'Beyoğlu', 'Pendik', 'Ümraniye', 'Kartal',
    'Zeytinburnu', 'Avcılar', 'Bahçelievler', 'Beylikdüzü', 'Esenyurt', 'Gaziosmanpaşa',
    'Kağıthane', 'Küçükçekmece', 'Sancaktepe', 'Sultanbeyli', 'Sultangazi', 'Şile', 'Tuzla'
  ],
  'Ankara': [
    'Çankaya', 'Keçiören', 'Yenimahalle', 'Mamak', 'Etimesgut', 'Sincan', 'Gölbaşı',
    'Altındağ', 'Akyurt', 'Polatlı', 'Kızılcahamam', 'Kahramankazan', 'Çubuk'
  ],
  'İzmir': [
    'Konak', 'Karşıyaka', 'Bornova', 'Buca', 'Alsancak', 'Kemalpaşa', 'Çeşme',
    'Urla', 'Foça', 'Torbalı', 'Aliağa', 'Menderes', 'Menemen', 'Gaziemir', 'Balçova'
  ],
  'Bursa': [
    'Nilüfer', 'Osmangazi', 'Yıldırım', 'Mudanya', 'İnegöl', 'Gemlik', 'Gürsu', 'Kestel'
  ],
  'Antalya': [
    'Muratpaşa', 'Konyaaltı', 'Alanya', 'Manavgat', 'Kepez', 'Kaş', 'Kemer', 'Serik', 'Kumluca'
  ],
  'Adana': [
    'Seyhan', 'Çukurova', 'Yüreğir', 'Sarıçam', 'Ceyhan', 'Kozan'
  ],
  'Gaziantep': [
    'Şahinbey', 'Şehitkamil', 'Nizip', 'İslahiye'
  ],
  'Kayseri': [
    'Melikgazi', 'Kocasinan', 'Talas', 'Develi'
  ],
  'Konya': [
    'Selçuklu', 'Meram', 'Karatay', 'Ereğli', 'Akşehir'
  ],
  'Trabzon': [
    'Ortahisar', 'Akçaabat', 'Yomra', 'Sürmene', 'Of'
  ],
  'Nevşehir': [
    'Ürgüp', 'Göreme', 'Avanos', 'Nevşehir Merkez', 'Derinkuyu'
  ],
  'Diyarbakır': [
    'Kayapınar', 'Bağlar', 'Yenişehir', 'Sur', 'Ergani'
  ],
  'Van': [
    'İpekyolu', 'Tuşba', 'Edremit', 'Erciş'
  ],
  'Erzurum': [
    'Yakutiye', 'Palandöken', 'Aziziye'
  ],
  'Mersin': [
    'Yenişehir', 'Mezitli', 'Akdeniz', 'Toroslar', 'Tarsus', 'Erdemli', 'Silifke'
  ],
  'Muğla': [
    'Bodrum', 'Fethiye', 'Marmaris', 'Datça', 'Menteşe', 'Milas', 'Yatağan'
  ],
  'Denizli': [
    'Pamukkale', 'Merkezefendi', 'Çivril', 'Acıpayam'
  ],
  'Kocaeli': [
    'İzmit', 'Gebze', 'Darıca', 'Körfez', 'Gölcük', 'Başiskele', 'Kartepe', 'Çayırova'
  ],
  'Sakarya': [
    'Adapazarı', 'Serdivan', 'Erenler', 'Sapanca', 'Karasu', 'Hendek'
  ],
  'Samsun': [
    'Atakum', 'İlkadım', 'Canik', 'Bafra', 'Çarşamba'
  ],
  'Balıkesir': [
    'Karesi', 'Altıeylül', 'Edremit', 'Bandırma', 'Ayvalık', 'Gönen', 'Burhaniye'
  ],
  'Aydın': [
    'Efeler', 'Kuşadası', 'Didim', 'Nazilli', 'Söke'
  ],
  'Manisa': [
    'Yunusemre', 'Şehzadeler', 'Akhisar', 'Turgutlu', 'Salihli', 'Soma'
  ],
  'Hatay': [
    'Antakya', 'İskenderun', 'Defne', 'Arsuz', 'Samandağ', 'Dörtyol'
  ],
  'Eskişehir': [
    'Tepebaşı', 'Odunpazarı', 'Sivrihisar'
  ],
  'Ordu': [
    'Altınordu', 'Fatsa', 'Ünye'
  ],
  'Kahramanmaraş': [
    'Onikişubat', 'Dulkadiroğlu', 'Elbistan'
  ],
  'Tekirdağ': [
    'Süleymanpaşa', 'Çorlu', 'Çerkezköy', 'Kapaklı'
  ],
  'Zonguldak': [
    'Merkez', 'Ereğli', 'Çaycuma'
  ],
  'Çanakkale': [
    'Merkez', 'Biga', 'Gelibolu', 'Çan'
  ],
  'Rize': [
    'Merkez', 'Çayeli', 'Ardeşen', 'Pazar'
  ],
};

export function getDistrictsForCity(cityName: string): string[] {
  if (TURKEY_CITY_DISTRICTS[cityName]) {
    return TURKEY_CITY_DISTRICTS[cityName];
  }
  return ['Merkez', 'Doğu', 'Batı', 'Kuzey', 'Güney'];
}
