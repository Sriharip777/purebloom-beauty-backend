import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { productAPI, categoryAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus, HiOutlinePhotograph } from 'react-icons/hi';

const emptyProduct = {
  title: '', description: '', shortDescription: '', price: '', originalPrice: '',
  image: '', category: '', affiliateUrl: '', brand: '', rating: 0, reviewCount: 0,
  isTrending: false, isBestSeller: false, isDeal: false, isFeatured: false,
};

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyProduct);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    Promise.all([
      productAPI.getAll({ limit: 100 }),
      categoryAPI.getAll(),
    ]).then(([prodRes, catRes]) => {
      setProducts(prodRes.data.products);
      setCategories(catRes.data.categories);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleEdit = (product) => {
    setEditing(product._id);
    setForm({
      title: product.title, description: product.description, shortDescription: product.shortDescription || '',
      price: product.price, originalPrice: product.originalPrice || '',
      image: product.image, category: typeof product.category === 'object' ? product.category._id : product.category,
      affiliateUrl: product.affiliateUrl, brand: product.brand || '', rating: product.rating, reviewCount: product.reviewCount,
      isTrending: product.isTrending, isBestSeller: product.isBestSeller, isDeal: product.isDeal, isFeatured: product.isFeatured,
    });
    setShowForm(true);
  };

  const handleNew = () => {
    setEditing(null);
    setForm(emptyProduct);
    setShowForm(true);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...form, price: Number(form.price), originalPrice: Number(form.originalPrice) || undefined, rating: Number(form.rating), reviewCount: Number(form.reviewCount) };
      if (editing) {
        await productAPI.update(editing, data);
        toast.success('Product updated');
      } else {
        const res = await productAPI.create(data);
        setProducts([res.data.product, ...products]);
        toast.success('Product created');
      }
      setShowForm(false);
      setEditing(null);
      if (editing) {
        const res = await productAPI.getAll({ limit: 100 });
        setProducts(res.data.products);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving product');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await productAPI.delete(id);
      setProducts(products.filter((p) => p._id !== id));
      toast.success('Product deleted');
    } catch (err) {
      toast.error('Error deleting product');
    }
  };

  if (loading) return <div className="text-center py-12"><div className="w-10 h-10 border-4 border-navy/20 border-t-navy rounded-full animate-spin mx-auto" /></div>;

  if (showForm) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl text-navy">{editing ? 'Edit Product' : 'New Product'}</h2>
          <button onClick={() => setShowForm(false)} className="text-xs text-navy/40 hover:text-navy font-sans">Cancel</button>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl card-shadow p-6 max-w-2xl space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-navy/60 font-sans mb-1">Title *</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 bg-cream-50 rounded-xl border border-cream-200 focus:border-navy/30 focus:outline-none font-sans text-sm text-navy" required />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-navy/60 font-sans mb-1">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows="3" className="w-full px-4 py-2.5 bg-cream-50 rounded-xl border border-cream-200 focus:border-navy/30 focus:outline-none font-sans text-sm text-navy resize-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-navy/60 font-sans mb-1">Price *</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-4 py-2.5 bg-cream-50 rounded-xl border border-cream-200 focus:border-navy/30 focus:outline-none font-sans text-sm text-navy" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-navy/60 font-sans mb-1">Original Price</label>
              <input type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} className="w-full px-4 py-2.5 bg-cream-50 rounded-xl border border-cream-200 focus:border-navy/30 focus:outline-none font-sans text-sm text-navy" />
            </div>
            <div>
              <label className="block text-xs font-medium text-navy/60 font-sans mb-1">Category *</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 bg-cream-50 rounded-xl border border-cream-200 focus:border-navy/30 focus:outline-none font-sans text-sm text-navy" required>
                <option value="">Select category</option>
                {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-navy/60 font-sans mb-1">Affiliate URL *</label>
              <input type="url" value={form.affiliateUrl} onChange={(e) => setForm({ ...form, affiliateUrl: e.target.value })} className="w-full px-4 py-2.5 bg-cream-50 rounded-xl border border-cream-200 focus:border-navy/30 focus:outline-none font-sans text-sm text-navy" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-navy/60 font-sans mb-1">Image</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex items-center justify-center w-full h-32 rounded-xl border-2 border-dashed cursor-pointer transition-colors overflow-hidden ${
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
                    <HiOutlinePhotograph size="24" className="mx-auto text-navy/30 mb-1" />
                    <p className="text-xs text-navy/40 font-sans">Click to upload image</p>
                    <p className="text-[10px] text-navy/30 font-sans mt-0.5">JPG, PNG, WebP • Max 20MB</p>
                  </div>
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-navy/20 border-t-navy rounded-full animate-spin" />
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-navy/60 font-sans mb-1">Brand</label>
              <input type="text" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="w-full px-4 py-2.5 bg-cream-50 rounded-xl border border-cream-200 focus:border-navy/30 focus:outline-none font-sans text-sm text-navy" />
            </div>
          </div>
          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isTrending} onChange={(e) => setForm({ ...form, isTrending: e.target.checked })} className="w-4 h-4 rounded border-navy/30 text-navy focus:ring-navy" />
              <span className="text-xs font-sans text-navy/60">Trending</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isBestSeller} onChange={(e) => setForm({ ...form, isBestSeller: e.target.checked })} className="w-4 h-4 rounded border-navy/30 text-navy focus:ring-navy" />
              <span className="text-xs font-sans text-navy/60">Best Seller</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isDeal} onChange={(e) => setForm({ ...form, isDeal: e.target.checked })} className="w-4 h-4 rounded border-navy/30 text-navy focus:ring-navy" />
              <span className="text-xs font-sans text-navy/60">Deal</span>
            </label>
          </div>
          <div className="pt-2">
            <button type="submit" className="btn-primary text-xs py-2.5">
              {editing ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl lg:text-3xl text-navy">Products</h1>
          <p className="text-sm text-navy/40 font-sans">{products.length} products</p>
        </div>
        <button onClick={handleNew} className="btn-primary text-[10px] px-5 py-2.5 flex items-center gap-1.5">
          <HiOutlinePlus size="14" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream-200 text-left">
                <th className="px-4 py-3 text-xs font-medium text-navy/40 font-sans uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-xs font-medium text-navy/40 font-sans uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-xs font-medium text-navy/40 font-sans uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-xs font-medium text-navy/40 font-sans uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-xs font-medium text-navy/40 font-sans uppercase tracking-wider">Clicks</th>
                <th className="px-4 py-3 text-xs font-medium text-navy/40 font-sans uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b border-cream-100 hover:bg-cream-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.image && <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />}
                      <span className="text-sm font-medium text-navy font-sans truncate max-w-[200px]">{p.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-sans text-navy">₹{p.price?.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm font-sans text-navy/60">{typeof p.category === 'object' ? p.category?.name : '-'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {p.isTrending && <span className="text-[10px] px-2 py-0.5 rounded-full bg-bloom-100 text-bloom-700 font-sans">T</span>}
                      {p.isBestSeller && <span className="text-[10px] px-2 py-0.5 rounded-full bg-navy text-white font-sans">BS</span>}
                      {p.isDeal && <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-50 text-red-500 font-sans">D</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-sans text-navy/60">{p.clickCount || 0}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(p)} className="p-1.5 text-navy/40 hover:text-navy transition-colors"><HiOutlinePencil size="16" /></button>
                      <button onClick={() => handleDelete(p._id)} className="p-1.5 text-navy/40 hover:text-red-500 transition-colors"><HiOutlineTrash size="16" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
