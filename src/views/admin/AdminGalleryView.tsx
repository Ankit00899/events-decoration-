import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceCategory } from '../../types';
import { Plus, Trash2, Image, Sparkles, X, Check } from 'lucide-react';

export const AdminGalleryView: React.FC = () => {
  const { gallery, addGalleryItem, deleteGalleryItem } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('birthday');
  const [imageUrl, setImageUrl] = useState('/src/assets/images/hero_luxury_decor_1791540796509.jpg');
  const [caption, setCaption] = useState('');
  const [city, setCity] = useState('Manhattan');
  const [eventDate, setEventDate] = useState(new Date().toISOString().split('T')[0]);
  const [isFeatured, setIsFeatured] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGalleryItem({
      title,
      category,
      imageUrl,
      caption,
      city,
      eventDate,
      isFeatured
    });
    setIsModalOpen(false);
    setTitle('');
    setCaption('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E0D7CC] pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1715]">
            Completed Event Portfolio Manager
          </h1>
          <p className="text-xs text-[#7A6F62] mt-1">
            Showcase completed real-world celebrations, update gallery highlights, and feature photos on the customer homepage.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-[#1A1715] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#2F2923] flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Portfolio Project</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map(item => (
          <div key={item.id} className="bg-white border border-[#DFD6C9] overflow-hidden flex flex-col justify-between group shadow-sm">
            <div>
              <div className="relative aspect-[4/3] bg-[#EAE2D8]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 bg-[#FAF8F5]/90 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 text-[#1A1715]">
                  {item.category.replace('_', ' ')}
                </div>
                {item.isFeatured && (
                  <div className="absolute top-2 right-2 bg-[#9E7749] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                    Featured
                  </div>
                )}
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-serif font-bold text-base text-[#1A1715] leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#6B6156] leading-relaxed">
                  {item.caption}
                </p>
                <div className="text-[11px] text-[#8C8074] pt-1">
                  <span>{item.city}</span> · <span>{item.eventDate}</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-[#F2ECE3] flex justify-end">
              <button
                onClick={() => {
                  if (confirm(`Remove "${item.title}" from gallery?`)) {
                    deleteGalleryItem(item.id);
                  }
                }}
                className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 py-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Photo</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Gallery Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full border border-[#3E3831] shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#EAE2D8] pb-3">
              <h2 className="font-serif font-bold text-2xl text-[#1A1715]">Add Completed Event Photo</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#8C8074] hover:text-[#1A1715]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs text-[#3D352B]">
              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Skyline Rooftop Proposal"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 border border-[#D5CABB]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                    className="w-full p-2.5 border border-[#D5CABB]"
                  >
                    <option value="birthday">Birthday</option>
                    <option value="proposal">Proposal</option>
                    <option value="room">Romantic Room</option>
                    <option value="baby_shower">Baby Shower</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="engagement">Engagement</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 border border-[#D5CABB]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Image URL / Path *</label>
                <input
                  type="text"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full p-2.5 border border-[#D5CABB]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Caption / Setup Details *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Briefly describe props, balloon colors, neon text, and venue setup..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full p-2.5 border border-[#D5CABB]"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="accent-[#1A1715]"
                />
                <span className="font-semibold">Feature this photo on the homepage gallery</span>
              </label>

              <div className="pt-4 border-t border-[#EAE2D8] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#D5CABB] uppercase font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#1A1715] text-white uppercase font-semibold text-xs tracking-wider"
                >
                  Upload & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
