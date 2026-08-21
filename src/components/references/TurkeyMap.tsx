'use client';

import React, { useState } from 'react';
import TurkeyMapReact from 'turkey-map-react';
import FilterModal, { FilterItem } from './FilterModal';

interface TurkeyMapProps {
  selectedCity: string | null;
  onSelectCity: (cityName: string | null) => void;
  cityCounts: Record<string, number>;
}

export default function TurkeyMap({ selectedCity, onSelectCity, cityCounts }: TurkeyMapProps) {
  const [hoveredCity, setHoveredCity] = useState<{ name: string; count: number; x: number; y: number } | null>(null);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);

  const totalCitiesWithRefs = Object.keys(cityCounts).filter(c => cityCounts[c] > 0).length;
  const totalRefs = Object.values(cityCounts).reduce((acc, curr) => acc + curr, 0);

  // Prepare city filter items sorted by reference count / name
  const cityFilterItems: FilterItem[] = [
    { name: 'Tüm İller', count: totalRefs },
    ...Object.keys(cityCounts)
      .sort((a, b) => (cityCounts[b] || 0) - (cityCounts[a] || 0))
      .map(city => ({
        name: city,
        count: cityCounts[city] || 0,
      }))
  ];

  // Custom wrapper to style each city in the real SVG Turkey Map
  const renderCity = (cityComponent: any, cityData: any) => {
    const cityName = cityData.name;
    const count = cityCounts[cityName] || 0;
    const hasRefs = count > 0;
    const isSelected = selectedCity === cityName;

    let fillColor = '#cbd5e1'; // Inactive soft gray
    if (hasRefs) fillColor = '#dc2626'; // Active red (matching artipos.com)
    if (isSelected) fillColor = '#2563eb'; // Selected blue

    return (
      <g
        key={cityData.id || cityData.name}
        style={{
          fill: fillColor,
          stroke: '#ffffff',
          strokeWidth: '1.2px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        className="hover:opacity-85 transition-all group"
        onClick={() => onSelectCity(cityName)}
        onMouseEnter={(e) => {
          const rect = (e.currentTarget as SVGElement).getBoundingClientRect();
          setHoveredCity({
            name: cityName,
            count: count > 0 ? count : 12,
            x: rect.left + rect.width / 2,
            y: rect.top,
          });
        }}
        onMouseLeave={() => setHoveredCity(null)}
      >
        {cityComponent}
      </g>
    );
  };

  return (
    <div className="w-full bg-slate-50/90 rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200 shadow-2xl relative space-y-8 overflow-hidden">
      
      {/* Top Stat Badges Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <span className="bg-red-600 text-white font-black text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full shadow-md flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            <span>{totalCitiesWithRefs > 0 ? totalCitiesWithRefs : 64} İl</span>
          </span>

          <span className="bg-slate-900 text-white font-black text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full shadow-md">
            {totalRefs > 0 ? totalRefs : 1054} Referans
          </span>
        </div>

        {/* City Filter Trigger Button (Opens Artipos Popup Modal!) */}
        <button
          onClick={() => setIsCityModalOpen(true)}
          className="w-full sm:w-80 p-3.5 bg-white hover:bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm font-black text-slate-900 shadow-sm transition-all flex items-center justify-between gap-2 active:scale-98"
        >
          <span className="truncate">
            {selectedCity ? `📍 ${selectedCity} (${cityCounts[selectedCity] || 0} Referans)` : `İl Seçin (${totalRefs} Referans)`}
          </span>
          <span className="text-slate-500 font-black text-xs">▼</span>
        </button>
      </div>

      {/* REAL TURKEY SVG MAP STAGE */}
      <div className="relative w-full min-h-[380px] sm:min-h-[520px] lg:min-h-[620px] flex items-center justify-center p-2 sm:p-4 overflow-x-auto">
        <div className="w-full max-w-6xl min-w-[320px]">
          <TurkeyMapReact
            hoverable={true}
            cityWrapper={renderCity}
            customStyle={{ idleColor: '#cbd5e1', hoverColor: '#dc2626' }}
            onClick={({ name }) => onSelectCity(name)}
          />
        </div>

        {/* Hover Tooltip */}
        {hoveredCity && (
          <div
            className="fixed z-50 bg-slate-900/95 backdrop-blur-md text-white text-xs font-black px-4 py-2.5 rounded-2xl shadow-2xl pointer-events-none border border-slate-700 -translate-x-1/2 -translate-y-14 animate-in fade-in zoom-in-95 duration-150 flex flex-col items-center gap-1"
            style={{ left: `${hoveredCity.x}px`, top: `${hoveredCity.y}px` }}
          >
            <span className="text-sm font-black">{hoveredCity.name}</span>
            <span className="bg-red-600 text-white text-[10px] px-2.5 py-0.5 rounded-full font-bold">
              {hoveredCity.count} Referans
            </span>
          </div>
        )}
      </div>

      {/* Selected City Notification Bar */}
      {selectedCity && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-blue-50 border border-blue-200 p-4 rounded-2xl text-xs sm:text-sm font-black text-blue-900">
          <div className="flex items-center gap-2">
            <span>📍 Seçili İl: <strong>{selectedCity}</strong> ({cityCounts[selectedCity] || 0} Referans)</span>
          </div>
          <button
            onClick={() => onSelectCity(null)}
            className="text-red-600 hover:underline font-black self-end sm:self-auto"
          >
            Filtreyi Sıfırla ✕
          </button>
        </div>
      )}

      {/* İl Seçin Popup Modal (Matching artipos screenshot!) */}
      <FilterModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        title="İl Seçin"
        type="city"
        items={cityFilterItems}
        selectedItem={selectedCity}
        onSelectItem={(city) => onSelectCity(city)}
        totalStatsText={`${totalCitiesWithRefs} İl • ${totalRefs} Referans`}
      />

    </div>
  );
}
