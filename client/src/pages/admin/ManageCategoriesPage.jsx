import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { categoryAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus, HiOutlinePhotograph } from 'react-icons/hi';

export default function ManageCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', description: '', image: '' });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const load = () => categoryAPI.getAll().then((res) => setCategories(res.data.categories)).catch(() => {});

  useEffect(() => { load().finally(() => setLoading(false)); }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { toast.error('Please select an image file'); return; }
    if (file.size > 20 * 1024 * 1024) { toast.error('Image must be under 20MB'); return; }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        setForm({ ...form, image: data.url });
        toast.success('Image uploaded');
      } else {
        toast.error(data.message || 'Upload failed');
      }
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleEdit = (cat) => {
    setEditing(cat._id);
    setForm({ name: cat.name, description: cat.description || '', image: cat.image || '' });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await categoryAPI.update(editing, form);
        toast.success('Category updated');
      } else {
        await categoryAPI.create(form);
        toast.success('Category created');
      }
      setShowForm(false);
      setEditing(null);
      setForm({ name: '', description: '', image: '' });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving category');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this category?')) return;
    try {
      await categoryAPI.delete(id);
      setCategories(categories.filter((c) => c._id !== id));
      toast.success('Category deleted');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Cannot delete category with products');
    }
  };

  if (loading) return <div className="text-center py-12"><div className="w-10 h-10 border-4 border-navy/20 border-t-navy rounded-full animate-spin mx-auto" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl lg:text-3xl text-navy">Categories</h1>
          <p className="text-sm text-navy/40 font-sans">{categories.length} categories</p>
        </div>
        <button onClick={() => { setEditing(null); setForm({ name: '', description: '', image: '' }); setShowForm(true); }} className="btn-primary text-[10px] px-5 py-2.5 flex items-center gap-1.5">
          <HiOutlinePlus size="14" /> Add Category
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl card-shadow p-6 mb-6 max-w-lg">
          <h3 className="font-serif text-lg text-navy mb-4">{editing ? 'Edit Category' : 'New Category'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-navy/60 font-sans mb-1">Name *</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 bg-cream-50 rounded-xl border border-cream-200 focus:border-navy/30 focus:outline-none font-sans text-sm text-navy" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-navy/60 font-sans mb-1">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows="2" className="w-full px-4 py-2.5 bg-cream-50 rounded-xl border border-cream-200 focus:border-navy/30 focus:outline-none font-sans text-sm text-navy resize-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-navy/60 font-sans mb-1">Image</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex items-center justify-center w-full h-28 rounded-xl border-2 border-dashed cursor-pointer transition-colors overflow-hidden ${
                  form.image ? 'border-emerald-300 bg-emerald-50/50' : 'border-cream-300 bg-cream-50 hover:border-bloom-300'
                }`}
              >
                {form.image ? (
                  <>
                    <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setForm({ ...form, image: '' }); }}
                      className="absolute top-1 right-1 w-5 h-5 bg-white/80 rounded-full text-navy/60 hover:text-red-500 text-xs flex items-center justify-center"
                    >×</button>
                  </>
                ) : (
                  <div className="text-center">
                    <HiOutlinePhotograph size="22" className="mx-auto text-navy/30 mb-1" />
                    <p className="text-xs text-navy/40 font-sans">Click to upload image</p>
                  </div>
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-navy/20 border-t-navy rounded-full animate-spin" />
                  </div>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary text-xs py-2.5">{editing ? 'Update' : 'Create'}</button>
              <button type="button" onClick={() => setShowForm(false)} className="text-xs text-navy/40 hover:text-navy font-sans px-4">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <motion.div key={cat._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl card-shadow p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {cat.image && <img src={cat.image} alt="" className="w-12 h-12 rounded-xl object-cover" />}
              <div>
                <h3 className="font-serif text-base text-navy">{cat.name}</h3>
                <p className="text-xs text-navy/40 font-sans">{cat.productCount || 0} products</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => handleEdit(cat)} className="p-1.5 text-navy/40 hover:text-navy"><HiOutlinePencil size="15" /></button>
              <button onClick={() => handleDelete(cat._id)} className="p-1.5 text-navy/40 hover:text-red-500"><HiOutlineTrash size="15" /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
