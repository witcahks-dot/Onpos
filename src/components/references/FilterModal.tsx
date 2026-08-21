'use client';

import React, { useState, useMemo } from 'react';
import { X, Search, MapPin, Filter, Building2 } from 'lucide-react';

export interface FilterItem {
  name: string;
  count?: number;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  type: 'city' | 'district' | 'category';
  items: FilterItem[];
  selectedItem: string | null;
  onSelectItem: (itemName: string | null) => void;
  totalStatsText?: string;
}

export default function FilterModal({
  isOpen,
  onClose,
  title,
  subtitle,
  type,
  items,
  selectedItem,
  onSelectItem,
  totalStatsText,
}: FilterModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;
    return items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  if (!isOpen) return null;

  const getIcon = () => {
    if (type === 'city') return MapPin;
    if (type === 'district') return MapPin;
    return Filter;
  };

  const IconComponent = getIcon();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl relative flex flex-col max-h-[85vh] overflow-hidden text-xs">
        
        {/* Modal Header (Matching artipos screenshot) */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black text-red-600 uppercase tracking-widest block">
                FİLTRELE
              </span>
              <h3 className="text-xl font-black text-slate-900 leading-tight">{title}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Inside Modal */}
        <div className="my-4 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`${title} ara... (örn. ${type === 'city' ? 'İzmir' : type === 'district' ? 'Kadıköy' : 'Restoran'})`}
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-300 rounded-2xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-red-600 outline-none shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Multi-Column Items Grid (Matching artipos 3-column screenshot layout) */}
        <div className="flex-1 overflow-y-auto pr-1 my-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {filteredItems.map((item) => {
              const isSelected = selectedItem === item.name || (selectedItem === null && item.name === 'Tüm İller');
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    onSelectItem(item.name === 'Tüm İller' || item.name === 'Tüm İlçeler' || item.name === 'Tüm Sektörler' ? null : item.name);
                    onClose();
                  }}
                  className={`p-3 rounded-2xl text-xs font-extrabold flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                      : 'bg-slate-50 hover:bg-red-50 text-slate-800 hover:text-red-600 border border-slate-100'
                  }`}
                >
                  <span className="truncate mr-1 text-left">{item.name}</span>
                  {typeof item.count === 'number' && (
                    <span
                      className={`text-[10px] font-black font-mono shrink-0 ml-1 px-1.5 py-0.5 rounded-full ${
                        isSelected ? 'bg-white text-red-600' : 'text-red-600 bg-red-50'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="py-12 text-center text-slate-400 font-medium space-y-2">
              <Building2 className="w-8 h-8 mx-auto text-slate-300" />
              <p>Aramanıza uygun sonuç bulunamadı.</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-bold">
          <span>{totalStatsText || `${items.length} Öğe Kayıtlı`}</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-xl transition-colors"
          >
            Kapat
          </button>
        </div>

      </div>
    </div>
  );
}
