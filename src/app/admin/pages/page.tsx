'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { FileText, Plus, Trash2, Edit3, Save, X, Layers, Layout, ArrowUp, ArrowDown, Eye, ExternalLink } from 'lucide-react';
import { CustomPage, PageBlock } from '@/types';
import Link from 'next/link';

export default function AdminCustomPagesPage() {
  const { customPages, saveCustomPage, deleteCustomPage } = useCMSStore();
  
  const [editing, setEditing] = useState<Partial<CustomPage> | null>(null);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  // Apply template defaults
  const handleSelectTemplate = (type: 'blank' | 'corporate' | 'support' | 'partnership') => {
    setIsTemplateModalOpen(false);

    if (type === 'blank') {
      setEditing({
        title: 'Yeni Özel Sayfa',
        slug: 'yeni-sayfa-' + Date.now(),
        summary: 'Sayfa hakkında kısa özet metin.',
        coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
        template: 'blank',
        contentHtml: '<h3>Sayfa Başlığı</h3><p>Sayfa içeriğini buradan düzenleyebilirsiniz.</p>',
        blocks: [
          { id: 'b1', type: 'text', title: 'Giriş', content: 'Sayfa detaylı metin alanı.' },
          { id: 'b2', type: 'cta', title: 'İşletmenize Özel Teklif Alın', content: 'Teklif talebi için tıklayın.', ctaText: 'Teklif Al' },
        ],
        metaTitle: 'Yeni Sayfa | PAYPOS',
        metaDescription: 'PAYPOS kurumsal özel sayfa.',
        isPublished: true,
        updatedAt: new Date().toISOString().split('T')[0],
      });
      return;
    }

    if (type === 'corporate') {
      setEditing({
        title: 'Kurumsal Şirket Politikamız',
        slug: 'kurumsal-politika',
        summary: 'PAYPOS ödeme sistemleri kalite ve şeffaflık politikası.',
        coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
        template: 'corporate',
        contentHtml: '<h3>Kalite Standartlarımız</h3><p>PAYPOS olarak 81 ilde kesintisiz hizmet sunuyoruz.</p>',
        blocks: [
          { id: 'b1', type: 'text', title: 'Şeffaflık İlkesi', content: 'Ödemeleriniz ertesi iş günü eksiksiz hesabınıza aktarılır.' },
          { id: 'b2', type: 'callout', title: 'BDDK ve PCI-PTS Sertifikalı Güvenlik', content: 'Tüm donanım ve yazılımlarımız uluslararası P2PE uçtan uca şifreleme standartlarına sahiptir.' },
          { id: 'b3', type: 'features', title: 'Kurumsal Taahhütlerimiz', items: ['2 Saatte Yerinde Servis', 'Ücretsiz İkame Cihaz', 'Gizli Ücretsiz Finansman'] },
          { id: 'b4', type: 'cta', title: 'Hemen Müşterimiz Olun', content: '24 saat içinde cihazınızı kurup kullanıma açalım.', ctaText: 'Hemen Başvur' },
        ],
        metaTitle: 'Kurumsal Şirket Politikamız | PAYPOS',
        metaDescription: 'PAYPOS kurumsal politikaları ve şeffaf ödeme ilkeleri.',
        isPublished: true,
        updatedAt: new Date().toISOString().split('T')[0],
      });
      return;
    }

    if (type === 'support') {
      setEditing({
        title: 'Teknik Destek ve Garanti Prosedürü',
        slug: 'teknik-destek-proseduru',
        summary: 'POS cihazı arızalarında uygulanan ikame ve 7/24 saha desteği esasları.',
        coverImage: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?q=80&w=800&auto=format&fit=crop',
        template: 'support',
        contentHtml: '<h3>7/24 Kesintisiz Destek</h3><p>Yılın 365 günü saha ekiplerimiz görev başındadır.</p>',
        blocks: [
          { id: 'b1', type: 'text', title: 'Arıza Bildirim Süreci', content: '0850 308 00 00 numaralı çağrı merkezimizden arıza kaydı oluşturabilirsiniz.' },
          { id: 'b2', type: 'callout', title: '2 Saat İçinde Adrese İkame Cihaz', content: 'Donanım arızalarında 2 saat içinde adresinize yedek POS cihazı ulaştırılır.' },
          { id: 'b3', type: 'cta', title: 'Teknik Destek Ekibimize Ulaşın', content: '7/24 canlı destek hattımız aktif.', ctaText: 'Bizi Arayın' },
        ],
        metaTitle: 'Teknik Destek ve Garanti | PAYPOS',
        metaDescription: 'PAYPOS teknik destek ve ikame cihaz prosedürü.',
        isPublished: true,
        updatedAt: new Date().toISOString().split('T')[0],
      });
      return;
    }
  };

  const handleAddBlock = (type: PageBlock['type']) => {
    if (!editing) return;
    const newBlock: PageBlock = {
      id: 'blk-' + Date.now(),
      type,
      title: type === 'text' ? 'Yeni Metin Bloğu' : type === 'callout' ? 'Önemli Vurgu' : type === 'features' ? 'Özellik Listesi' : 'Teklif Al Butonu',
      content: 'Blok içeriği buraya yazılır.',
      items: type === 'features' ? ['Özellik 1', 'Özellik 2'] : undefined,
      ctaText: 'Teklif Al',
    };
    setEditing({ ...editing, blocks: [...(editing.blocks || []), newBlock] });
  };

  const handleUpdateBlock = (index: number, updatedBlock: PageBlock) => {
    if (!editing || !editing.blocks) return;
    const blocks = [...editing.blocks];
    blocks[index] = updatedBlock;
    setEditing({ ...editing, blocks });
  };

  const handleDeleteBlock = (index: number) => {
    if (!editing || !editing.blocks) return;
    const blocks = editing.blocks.filter((_, i) => i !== index);
    setEditing({ ...editing, blocks });
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    if (!editing || !editing.blocks) return;
    const blocks = [...editing.blocks];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= blocks.length) return;
    const temp = blocks[index];
    blocks[index] = blocks[targetIdx];
    blocks[targetIdx] = temp;
    setEditing({ ...editing, blocks });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const slug = editing.slug || editing.title?.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'sayfa';
    await saveCustomPage({ ...editing, slug });
    setEditing(null);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Dinamik Kurumsal Sayfa Oluşturucu & Şablon Sistemi</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Örnek şablon seçerek dinamik bloklarla canlı kurumsal sayfalar tasarlayın.</p>
        </div>

        <button
          onClick={() => setIsTemplateModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Sayfa Oluştur (Şablon Seç)</span>
        </button>
      </div>

      {/* Template Chooser Modal */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Sayfa Şablonu Seçin</h3>
                <p className="text-xs text-slate-500 mt-0.5">Hazır bir şablon seçerek hemen düzenlemeye başlayabilirsiniz.</p>
              </div>
              <button onClick={() => setIsTemplateModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => handleSelectTemplate('blank')}
                className="p-5 rounded-2xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 text-left transition-all group space-y-2"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-slate-600 font-bold">
                  📄
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Boş Şablon</h4>
                <p className="text-[11px] text-slate-500">Sıfırdan kendi bloklarınızı ekleyebileceğiniz temiz sayfa.</p>
              </button>

              <button
                onClick={() => handleSelectTemplate('corporate')}
                className="p-5 rounded-2xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 text-left transition-all group space-y-2"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-blue-600 font-bold">
                  🏢
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Kurumsal Politika</h4>
                <p className="text-[11px] text-slate-500">Giriş metni, vurgu kutusu, özellik listesi ve teklif butonu hazır.</p>
              </button>

              <button
                onClick={() => handleSelectTemplate('support')}
                className="p-5 rounded-2xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 text-left transition-all group space-y-2"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-indigo-600 font-bold">
                  ❓
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Teknik Destek</h4>
                <p className="text-[11px] text-slate-500">Garanti ve teknik servis bilgilendirme şablonu.</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Page Editor Form */}
      {editing && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-blue-200 shadow-xl space-y-6 text-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px]">
                {editing.template || 'Şablon'}
              </span>
              <h3 className="font-bold text-slate-900 text-base">{editing.id ? 'Sayfayı Düzenle' : 'Yeni Sayfa Oluşturuluyor'}</h3>
            </div>
            <button type="button" onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Sayfa Başlığı</label>
              <input
                type="text"
                value={editing.title || ''}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">URL Adresi (Slug)</label>
              <input
                type="text"
                placeholder="yeni-sayfa-url"
                value={editing.slug || ''}
                onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Sayfa Özeti</label>
            <input
              type="text"
              value={editing.summary || ''}
              onChange={(e) => setEditing({ ...editing, summary: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Kapak Görsel URL</label>
            <input
              type="text"
              value={editing.coverImage || ''}
              onChange={(e) => setEditing({ ...editing, coverImage: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono"
            />
          </div>

          {/* DYNAMIC CONTENT BLOCKS SYSTEM */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Sayfa İçerik Blokları ({editing.blocks?.length || 0})</span>
              </h4>

              {/* Add Block Options */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleAddBlock('text')}
                  className="bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 px-3 py-1.5 rounded-lg text-[11px] font-bold"
                >
                  + Metin
                </button>
                <button
                  type="button"
                  onClick={() => handleAddBlock('callout')}
                  className="bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 px-3 py-1.5 rounded-lg text-[11px] font-bold"
                >
                  + Vurgu Kutusu
                </button>
                <button
                  type="button"
                  onClick={() => handleAddBlock('features')}
                  className="bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 px-3 py-1.5 rounded-lg text-[11px] font-bold"
                >
                  + Özellik Listesi
                </button>
                <button
                  type="button"
                  onClick={() => handleAddBlock('cta')}
                  className="bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 px-3 py-1.5 rounded-lg text-[11px] font-bold"
                >
                  + Teklif Butonu
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {(editing.blocks || []).map((block, idx) => (
                <div key={block.id || idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-400 font-bold">#{idx + 1}</span>
                      <span className="bg-blue-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                        {block.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveBlock(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 text-slate-500 hover:bg-slate-200 rounded disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveBlock(idx, 'down')}
                        disabled={idx === (editing.blocks?.length || 0) - 1}
                        className="p-1 text-slate-500 hover:bg-slate-200 rounded disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteBlock(idx)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Blok Başlığı"
                      value={block.title || ''}
                      onChange={(e) => handleUpdateBlock(idx, { ...block, title: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 font-bold"
                    />

                    {block.type !== 'features' && (
                      <textarea
                        rows={2}
                        placeholder="Blok İçerik Metni"
                        value={block.content || ''}
                        onChange={(e) => handleUpdateBlock(idx, { ...block, content: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-900"
                      />
                    )}

                    {block.type === 'features' && (
                      <input
                        type="text"
                        placeholder="Maddeler (virgülle ayırın)"
                        value={(block.items || []).join(', ')}
                        onChange={(e) => handleUpdateBlock(idx, { ...block, items: e.target.value.split(',').map(s => s.trim()) })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-900"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-4 border-t border-slate-100">
            <button type="button" onClick={() => setEditing(null)} className="px-5 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl">
              İptal
            </button>
            <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md flex items-center gap-1.5">
              <Save className="w-4 h-4" />
              <span>Sayfayı Kaydet ve Canlıya Al</span>
            </button>
          </div>
        </form>
      )}

      {/* Pages List */}
      <div className="space-y-3">
        {customPages.map((page) => (
          <div key={page.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 shadow-sm text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-slate-900 text-sm">{page.title}</h4>
                <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-mono">
                  /sayfa/{page.slug}
                </span>
              </div>
              <p className="text-slate-500 font-normal">{page.summary}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/sayfa/${page.slug}`}
                target="_blank"
                className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg font-bold flex items-center gap-1"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Canlı Gör</span>
              </Link>

              <button onClick={() => setEditing(page)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={() => deleteCustomPage(page.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
