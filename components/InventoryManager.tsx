import React, { useState } from 'react';
import { Package, Plus, Trash2, Star } from 'lucide-react';
import { Product } from '../types';

export const InventoryManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Hydrating Shampoo', brand: 'PureCare', category: 'Cleansing', rating: 5 },
    { id: '2', name: 'Shea Butter Mask', brand: 'Natura', category: 'Treatment', rating: 4 },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'Cleansing' as Product['category'],
    rating: 5
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.brand) return;

    const newProduct: Product = {
      id: Date.now().toString(),
      ...formData
    };

    setProducts([...products, newProduct]);
    setFormData({ name: '', brand: '', category: 'Cleansing', rating: 5 });
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold text-charcoal">Product Stash</h2>
        <p className="text-softbrown mt-1">Manage your collection of hair products and treatments.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-peach-100 sticky top-8">
            <h3 className="text-lg font-bold text-charcoal mb-4 flex items-center gap-2">
              <Plus className="text-peach-400" size={20} /> Add New Product
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-softbrown mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Leave-in Conditioner"
                  className="w-full px-4 py-2.5 rounded-xl border border-peach-200 focus:outline-none focus:ring-2 focus:ring-peach-300 bg-peach-50/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-softbrown mb-1">Brand</label>
                <input
                  type="text"
                  required
                  value={formData.brand}
                  onChange={e => setFormData({ ...formData, brand: e.target.value })}
                  placeholder="e.g. SheaMoisture"
                  className="w-full px-4 py-2.5 rounded-xl border border-peach-200 focus:outline-none focus:ring-2 focus:ring-peach-300 bg-peach-50/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-softbrown mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as Product['category'] })}
                  className="w-full px-4 py-2.5 rounded-xl border border-peach-200 focus:outline-none focus:ring-2 focus:ring-peach-300 bg-peach-50/30"
                >
                  <option>Cleansing</option>
                  <option>Conditioning</option>
                  <option>Treatment</option>
                  <option>Styling</option>
                  <option>Tools</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-softbrown mb-1">Rating (1-5)</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: num })}
                      className={`p-2 rounded-lg transition-colors ${formData.rating >= num ? 'text-peach-400' : 'text-gray-200 hover:text-peach-200'}`}
                    >
                      <Star size={20} fill={formData.rating >= num ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-peach-300 text-white font-bold rounded-xl hover:bg-peach-400 transition-all shadow-md shadow-peach-100 mt-2"
              >
                Add to Stash
              </button>
            </form>
          </div>
        </div>

        {/* Table Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-peach-100 overflow-hidden">
            <div className="p-6 border-b border-peach-50">
              <h3 className="text-lg font-bold text-charcoal flex items-center gap-2">
                <Package className="text-peach-400" size={20} /> My Collection
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-peach-50/50 text-softbrown text-sm uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Product</th>
                    <th className="px-6 py-4 font-semibold">Category</th>
                    <th className="px-6 py-4 font-semibold">Rating</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-peach-50">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <tr key={product.id} className="hover:bg-peach-50/30 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="font-bold text-charcoal">{product.name}</div>
                          <div className="text-xs text-softbrown">{product.brand}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                            product.category === 'Cleansing' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                            product.category === 'Treatment' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                            'bg-peach-100 text-peach-700 border-peach-200'
                          }`}>
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex text-peach-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} fill={i < product.rating ? "currentColor" : "none"} />
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            title="Remove Product"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-softbrown">
                        <div className="flex flex-col items-center gap-2">
                          <Package size={48} className="text-peach-200" />
                          <p>Your stash is empty. Add your first product!</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
