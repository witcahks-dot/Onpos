'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { PosProduct } from '@/types';
import { Plus, Trash2, Edit2, CheckCircle2 } from 'lucide-react';

export default function AdminProductsPage() {
  const { products, saveProduct, deleteProduct } = useCMSStore();
  const [editingProduct, setEditingProduct] = useState<Partial<PosProduct> | null>(null);
  const [saved, setSaved] = useState(false);

  const startNew = () => {
    setEditingProduct({
      id: '',
      slug: 'yeni-pos-cihazi-' + Date.now(),
      name: 'Yeni Android POS Terminal',
      category: 'Android POS',
      shortDesc: '6" Dokunmatik Ekran, Android OS ve Termal Fiş Yazıcısı.',
      fullDesc: 'Detaylı ürün açıklaması buraya gelecek...',
      price: 9999,
      oldPrice: 11999,
      isDiscounted: true,
      discountLabel: '%15 İndirim',
      sku: 'PAY-NEW-' + Date.now().toString().slice(-4),
      brand: 'PAYPOS',
      inStock: true,
      specs: {
        display: '6.0 İnç HD Touch',
        os: 'Secure Android 12',
        connectivity: '4G LTE / Wi-Fi',
        nfc: 'Destekleniyor',
        printer: '58mm Termal Yazıcı',
        battery: '5000 mAh',
        weight: '400 gram',
        security: 'PCI PTS 6.x',
      },
      features: ['Ortak POS Uyumlu', '7/24 Kesintisiz Destek'],
      images: ['https://images.unsplash.com/photo-1556742049-0a67daf40d3a?q=80&w=800&auto=format&fit=crop'],
      isFeatured: true,
      order: products.length + 1,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    await saveProduct(editingProduct);
    setEditingProduct(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">POS Ürünleri Yönetimi</h1>
          <p className="text-xs text-slate-500 mt-1">Cihaz ekleyin, düzenleyin veya pasife alın.</p>
        </div>

        <button
          onClick={startNew}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni POS Ürünü Ekle</span>
        </button>
      </div>

      {saved && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-200 flex items-center gap-2 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4" />
          <span>Ürün başarıyla kaydedildi ve canlı kataloğa eklendi!</span>
        </div>
      )}

      {/* Edit Form Modal */}
      {editingProduct && (
        <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4 text-xs">
          <h3 className="text-lg font-bold text-slate-900">
            {editingProduct.id ? 'Ürünü Düzenle' : 'Yeni Ürün Oluştur'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Ürün Adı</label>
              <input
                type="text"
                value={editingProduct.name || ''}
                onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">URL Slug</label>
              <input
                type="text"
                value={editingProduct.slug || ''}
                onChange={e => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Kategori</label>
              <select
                value={editingProduct.category || 'Android POS'}
                onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value as PosProduct['category'] })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="Android POS">Android POS</option>
                <option value="Mobil POS">Mobil POS</option>
                <option value="Masaüstü POS">Masaüstü POS</option>
                <option value="Yazarkasa POS">Yazarkasa POS</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Satış Fiyatı (₺)</label>
              <input
                type="number"
                value={editingProduct.price || 0}
                onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">İndirim Etiketi</label>
              <input
                type="text"
                value={editingProduct.discountLabel || ''}
                onChange={e => setEditingProduct({ ...editingProduct, discountLabel: e.target.value })}
                placeholder="Örn: %15 İndirim"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Kısa Açıklama</label>
            <textarea
              rows={2}
              value={editingProduct.shortDesc || ''}
              onChange={e => setEditingProduct({ ...editingProduct, shortDesc: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Görsel URL</label>
            <input
              type="text"
              value={editingProduct.images?.[0] || ''}
              onChange={e => setEditingProduct({ ...editingProduct, images: [e.target.value] })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setEditingProduct(null)}
              className="px-5 py-3 rounded-xl bg-slate-100 font-bold text-slate-600"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold shadow-md"
            >
              Ürünü Kaydet
            </button>
          </div>
        </form>
      )}

      {/* Product List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((prod) => (
          <div key={prod.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={prod.images[0]} alt={prod.name} className="w-16 h-20 object-contain rounded-xl bg-slate-50 p-2 border border-slate-100" />
              <div>
                <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full">{prod.category}</span>
                <h3 className="text-base font-bold text-slate-900 mt-1">{prod.name}</h3>
                <span className="text-xs font-black text-slate-800 block mt-1">
                  {prod.price ? `${prod.price.toLocaleString('tr-TR')} ₺` : 'Teklif İle'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditingProduct(prod)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
                title="Düzenle"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteProduct(prod.id)}
                className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                title="Sil"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
