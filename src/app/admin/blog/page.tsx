'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { FileText, Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import { BlogPost } from '@/types';

export default function AdminBlogPage() {
  const { blogPosts, saveBlogPost, deleteBlogPost } = useCMSStore();
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);

  const handleCreateNew = () => {
    setEditing({
      title: '',
      slug: '',
      category: 'Mevzuat & Rehber',
      excerpt: '',
      content: '',
      author: 'PAYPOS Editörü',
      authorRole: 'Fintech Araştırmacısı',
      publishedAt: new Date().toLocaleDateString('tr-TR'),
      readTime: '4 dk okuma',
      coverImage: 'https://images.unsplash.com/photo-1556742049-0a67daf40d3a?q=80&w=800&auto=format&fit=crop',
      tags: ['POS', 'Ödeme'],
      isFeatured: true,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const slug = editing.slug || editing.title?.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'yazi';
    await saveBlogPost({ ...editing, slug });
    setEditing(null);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Blog & Haberler Yönetimi</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Sektörel haberler, ÖKC mevzuat rehberleri ve blog makaleleri.</p>
        </div>

        <button
          onClick={handleCreateNew}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Yazı Ekle</span>
        </button>
      </div>

      {editing && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-blue-200 shadow-xl space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">{editing.id ? 'Yazıyı Düzenle' : 'Yeni Yazı Ekle'}</h3>
            <button type="button" onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Makale Başlığı</label>
              <input
                type="text"
                value={editing.title || ''}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Kategori</label>
              <input
                type="text"
                value={editing.category || ''}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Özet Metin</label>
            <textarea
              rows={2}
              value={editing.excerpt || ''}
              onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Kapak Görsel URL</label>
            <input
              type="text"
              value={editing.coverImage || ''}
              onChange={(e) => setEditing({ ...editing, coverImage: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
              required
            />
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg">
              İptal
            </button>
            <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-bold rounded-lg flex items-center gap-1">
              <Save className="w-4 h-4" />
              <span>Kaydet</span>
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3 shadow-sm">
            <div className="space-y-2">
              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full uppercase">
                {post.category}
              </span>
              <h4 className="font-bold text-slate-900 text-sm">{post.title}</h4>
              <p className="text-xs text-slate-500 line-clamp-2">{post.excerpt}</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button onClick={() => setEditing(post)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg text-xs font-bold flex items-center gap-1">
                <Edit3 className="w-4 h-4" />
                <span>Düzenle</span>
              </button>
              <button onClick={() => deleteBlogPost(post.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg text-xs font-bold flex items-center gap-1">
                <Trash2 className="w-4 h-4" />
                <span>Sil</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
