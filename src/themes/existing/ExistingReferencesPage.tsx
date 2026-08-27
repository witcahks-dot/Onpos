'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import TurkeyMap from '@/components/references/TurkeyMap';
import FilterModal, { FilterItem } from '@/components/references/FilterModal';
import { useCMSStore } from '@/lib/cms-store';
import { Search, MapPin, Building2, Filter, ShieldCheck, RefreshCw, ChevronRight } from 'lucide-react';
import QuoteModal from '@/components/ui/QuoteModal';
import { getDistrictsForCity } from '@/lib/turkeyDistricts';

export default function ExistingReferencesPage() {
  const { references } = useCMSStore();

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const [isDistrictModalOpen, setIsDistrictModalOpen] = useState<boolean>(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);

  const cityCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    (references || []).forEach(ref => {
      const city = ref.city || 'İstanbul';
      counts[city] = (counts[city] || 0) + 1;
    });
    return counts;
  }, [references]);

  const districtFilterItems: FilterItem[] = useMemo(() => {
    const dists: Record<string, number> = {};
    const relevantRefs = selectedCity 
      ? (references || []).filter(r => (r.city || 'İstanbul') === selectedCity)
      : (references || []);

    relevantRefs.forEach(ref => {
      const d = ref.district || 'Merkez';
      dists[d] = (dists[d] || 0) + 1;
    });

    const activeList = Object.keys(dists).map(d => ({ name: d, count: dists[d] }));

    if (selectedCity) {
      const allCityDists = getDistrictsForCity(selectedCity);
      allCityDists.forEach(d => {
        if (!dists[d]) {
          activeList.push({ name: d, count: 0 });
        }
      });
    }

    return [
      { name: 'Tüm İlçeler', count: relevantRefs.length },
      ...activeList.sort((a, b) => (b.count || 0) - (a.count || 0)),
    ];
  }, [references, selectedCity]);

  const categoryFilterItems: FilterItem[] = useMemo(() => {
    const cats: Record<string, number> = {};
    (references || []).forEach(ref => {
      const c = ref.category || 'Diğer';
      cats[c] = (cats[c] || 0) + 1;
    });

    return [
      { name: 'Tüm Sektörler', count: (references || []).length },
      ...Object.keys(cats).map(c => ({ name: c, count: cats[c] })).sort((a, b) => (b.count || 0) - (a.count || 0)),
    ];
  }, [references]);

  const filteredReferences = useMemo(() => {
    return (references || []).filter(ref => {
      const refCity = ref.city || 'İstanbul';
      const matchesCity = !selectedCity || refCity === selectedCity;
      const matchesDistrict = !selectedDistrict || selectedDistrict === 'Tüm İlçeler' || ref.district === selectedDistrict;
      const matchesCategory = !selectedCategory || selectedCategory === 'Tüm Sektörler' || ref.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        ref.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ref.city && ref.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (ref.district && ref.district.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCity && matchesDistrict && matchesCategory && matchesSearch;
    });
  }, [references, selectedCity, selectedDistrict, selectedCategory, searchQuery]);

  const handleSelectCity = (city: string | null) => {
    setSelectedCity(city);
    setSelectedDistrict(null);
    if (city) {
      setIsDistrictModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-red-600 selection:text-white">
      <Header />

      <main className="flex-1">
        <Breadcrumb items={[{ label: 'Kurumsal', href: '/kurumsal/hakkimizda' }, { label: 'Referanslarımız' }]} />

        <section className="bg-slate-50 py-12 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
            <span className="text-xs font-black text-red-600 uppercase tracking-widest">
              TÜRKİYE GENELİNDE
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Referanslarımız</h1>
            <p className="text-xs text-slate-500 font-medium">
              İl veya ilçe üzerine tıklayarak o bölgeye ait referansları görüntüleyin.
            </p>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <TurkeyMap
              selectedCity={selectedCity}
              onSelectCity={handleSelectCity}
              cityCounts={cityCounts}
            />

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                  <button
                    onClick={() => setIsDistrictModalOpen(true)}
                    className={`w-full sm:w-auto px-6 py-4 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-between gap-4 shadow-sm border active:scale-98 cursor-pointer ${
                      selectedDistrict && selectedDistrict !== 'Tüm İlçeler'
                        ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/30'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-900 border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                      <span>
                        Semt / İlçe: <strong className="underline">{selectedDistrict || 'Tüm İlçeler'}</strong>
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    onClick={() => setIsCategoryModalOpen(true)}
                    className={`w-full sm:w-auto px-6 py-4 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-between gap-4 shadow-sm border active:scale-98 cursor-pointer ${
                      selectedCategory && selectedCategory !== 'Tüm Sektörler'
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-900 border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>
                        Sektör: <strong className="underline">{selectedCategory || 'Tüm Sektörler'}</strong>
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>

                  {(selectedCity || (selectedDistrict && selectedDistrict !== 'Tüm İlçeler') || (selectedCategory && selectedCategory !== 'Tüm Sektörler') || searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedCity(null);
                        setSelectedDistrict(null);
                        setSelectedCategory(null);
                        setSearchQuery('');
                      }}
                      className="px-4 py-4 bg-slate-100 hover:bg-red-50 text-red-600 font-extrabold text-xs rounded-2xl transition-all flex items-center gap-1.5 shrink-0"
                      title="Tüm Filtreleri Temizle"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Filtreleri Temizle</span>
                    </button>
                  )}
                </div>

                <div className="relative w-full lg:w-72">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Referans veya İl/İlçe ara..."
                    className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-red-600 outline-none"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {filteredReferences.map((ref) => {
                const initials = ref.name
                  .split(' ')
                  .map(w => w[0])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join('')
                  .toUpperCase();

                const city = ref.city || 'İstanbul';
                const district = ref.district || 'Merkez';

                return (
                  <div
                    key={ref.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-red-400 transition-all duration-300 flex flex-col items-center justify-between text-center group min-h-[220px]"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 font-black text-2xl group-hover:scale-105 group-hover:text-red-600 transition-all shadow-inner my-2">
                      {ref.logo && ref.logo.trim() !== '' ? (
                        <img src={ref.logo} alt={ref.name} className="w-full h-full object-contain p-2" />
                      ) : (
                        <span>{initials}</span>
                      )}
                    </div>

                    <div className="space-y-1 w-full mt-2">
                      <h4 className="font-extrabold text-slate-900 text-xs line-clamp-2 uppercase group-hover:text-red-600 transition-colors">
                        {ref.name}
                      </h4>
                      <div className="flex items-center justify-center gap-1 text-[11px] font-extrabold text-red-600 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{city} / {district}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredReferences.length === 0 && (
              <div className="py-16 text-center space-y-3 bg-slate-50 rounded-3xl border border-slate-200">
                <Building2 className="w-12 h-12 text-slate-400 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Referans Bulunamadı</h4>
                <p className="text-xs text-slate-500">Seçtiğiniz kriterlere uyan henüz üye kayıtlı değil.</p>
                <button
                  onClick={() => {
                    setSelectedCity(null);
                    setSelectedDistrict(null);
                    setSelectedCategory(null);
                    setSearchQuery('');
                  }}
                  className="bg-red-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md"
                >
                  Tüm Filtreleri Sıfırla
                </button>
              </div>
            )}

            <div className="bg-slate-900 text-white p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
              <div>
                <h3 className="text-xl font-extrabold">Siz de Türkiye Genelindeki 10.000+ Referansımızın Arasına Katılın!</h3>
                <p className="text-xs text-slate-400 mt-1">24 saat içinde cihazınızı adresinize getirip kasanızı kuruyoruz.</p>
              </div>
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold px-6 py-3.5 rounded-2xl shadow-lg transition-all shrink-0 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Hemen Başvur</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <FilterModal
        isOpen={isDistrictModalOpen}
        onClose={() => setIsDistrictModalOpen(false)}
        title={selectedCity ? `${selectedCity} Semt / İlçe Seçin` : 'Semt / İlçe Seçin'}
        type="district"
        items={districtFilterItems}
        selectedItem={selectedDistrict}
        onSelectItem={(dist) => setSelectedDistrict(dist)}
        totalStatsText={`${districtFilterItems.length - 1} İlçe Kayıtlı`}
      />

      <FilterModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        title="Sektör / Kategori Seçin"
        type="category"
        items={categoryFilterItems}
        selectedItem={selectedCategory}
        onSelectItem={(cat) => setSelectedCategory(cat)}
        totalStatsText={`${categoryFilterItems.length - 1} Sektör Kayıtlı`}
      />

      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
      <Footer />
    </div>
  );
}
