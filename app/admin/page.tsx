'use client';
import { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  minQty: number;
  description: string;
  features: string[];
  colors: string[];
  badge?: string;
  material: string;
  weight: string;
  image?: string;
}

interface Category {
  id: string;
  name: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [formState, setFormState] = useState({
    id: '',
    name: '',
    slug: '',
    category: '',
    price: '',
    minQty: '',
    description: '',
    features: '',
    colors: '',
    badge: '',
    material: '',
    weight: '',
    image: '',
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to load products');
        const json = await res.json();
        setProducts(json.products || []);
        setCategories(json.categories || []);
      } catch {
        setError('Unable to load product data.');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const formTitle = editProduct ? 'Edit Product' : 'Add Product';

  const resetForm = () => {
    setEditProduct(null);
    setFormState({
      id: '',
      name: '',
      slug: '',
      category: '',
      price: '',
      minQty: '',
      description: '',
      features: '',
      colors: '',
      badge: '',
      material: '',
      weight: '',
      image: '',
    });
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setFormState({
      id: product.id,
      name: product.name,
      slug: product.slug,
      category: product.category,
      price: product.price.toString(),
      minQty: product.minQty.toString(),
      description: product.description,
      features: product.features.join(', '),
      colors: product.colors.join(', '),
      badge: product.badge || '',
      material: product.material,
      weight: product.weight,
      image: product.image || '',
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setProducts((current) => current.filter((product) => product.id !== id));
    } catch {
      setError('Unable to delete product.');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      name: formState.name,
      slug: formState.slug,
      category: formState.category,
      price: Number(formState.price),
      minQty: Number(formState.minQty),
      description: formState.description,
      features: formState.features.split(',').map((item) => item.trim()).filter(Boolean),
      colors: formState.colors.split(',').map((item) => item.trim()).filter(Boolean),
      badge: formState.badge,
      material: formState.material,
      weight: formState.weight,
      image: formState.image,
    };

    try {
      const url = editProduct ? `/api/products/${editProduct.id}` : '/api/products';
      const method = editProduct ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to save product');
      const json = await res.json();
      if (editProduct) {
        setProducts((current) => current.map((item) => item.id === editProduct.id ? json.product : item));
      } else {
        setProducts((current) => [json.product, ...current]);
      }
      resetForm();
    } catch {
      setError('Unable to save product.');
    } finally {
      setSaving(false);
    }
  };

  const categoryOptions = useMemo(
    () => categories.map((category) => (
      <option key={category.id} value={category.id}>{category.name}</option>
    )),
    [categories]
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-10">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32">
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Product Manager</h1>
            <p className="text-slate-600 mb-6">Create, update, and delete products. Changes are saved to the shared product store and appear on the website immediately.</p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700">Product Name</label>
                  <input
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full mt-2 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">Category</label>
                  <select
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                    className="w-full mt-2 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Select category</option>
                    {categoryOptions}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700">Price</label>
                    <input
                      type="number"
                      value={formState.price}
                      onChange={(e) => setFormState({ ...formState, price: e.target.value })}
                      className="w-full mt-2 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700">Min Qty</label>
                    <input
                      type="number"
                      value={formState.minQty}
                      onChange={(e) => setFormState({ ...formState, minQty: e.target.value })}
                      className="w-full mt-2 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">Description</label>
                  <textarea
                    value={formState.description}
                    onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                    className="w-full mt-2 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-colors min-h-[120px]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700">Slug</label>
                  <input
                    value={formState.slug}
                    onChange={(e) => setFormState({ ...formState, slug: e.target.value })}
                    className="w-full mt-2 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">Features (comma separated)</label>
                  <input
                    value={formState.features}
                    onChange={(e) => setFormState({ ...formState, features: e.target.value })}
                    className="w-full mt-2 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">Colors (comma separated)</label>
                  <input
                    value={formState.colors}
                    onChange={(e) => setFormState({ ...formState, colors: e.target.value })}
                    className="w-full mt-2 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">Badge</label>
                  <input
                    value={formState.badge}
                    onChange={(e) => setFormState({ ...formState, badge: e.target.value })}
                    className="w-full mt-2 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700">Material</label>
                    <input
                      value={formState.material}
                      onChange={(e) => setFormState({ ...formState, material: e.target.value })}
                      className="w-full mt-2 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700">Weight</label>
                    <input
                      value={formState.weight}
                      onChange={(e) => setFormState({ ...formState, weight: e.target.value })}
                      className="w-full mt-2 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">Image Path</label>
                  <input
                    value={formState.image}
                    onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                    className="w-full mt-2 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-2xl px-6 py-3 font-semibold shadow-sm transition-all"
                  >
                    {saving ? 'Saving...' : editProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="border border-slate-300 text-slate-700 rounded-2xl px-6 py-3 hover:border-orange-500 hover:text-orange-600 transition-all"
                  >
                    Clear
                  </button>
                </div>

                {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
              </div>
            </form>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 overflow-x-auto shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Product List</h2>
            {loading ? (
              <p className="text-slate-500">Loading products...</p>
            ) : (
              <table className="w-full table-auto text-left text-sm text-slate-800">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Min Qty</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-900">{product.name}</td>
                      <td className="py-3 px-4 text-slate-600 capitalize">{product.category}</td>
                      <td className="py-3 px-4 font-medium text-slate-800">₹{product.price}</td>
                      <td className="py-3 px-4 text-slate-600">{product.minQty}</td>
                      <td className="py-3 px-4 flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(product)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 font-semibold hover:bg-slate-200 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          className="px-3 py-1.5 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
