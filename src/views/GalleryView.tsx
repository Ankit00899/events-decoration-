import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceCategory, GalleryItem } from '../types';
import { X, ZoomIn, ArrowRight, Sparkles, MapPin, Calendar } from 'lucide-react';

export const GalleryView: React.FC = () => {
  const { gallery, setActiveView } = useApp();
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const categories: { label: string; value: ServiceCategory | 'all' }[] = [
    { label: 'All Projects', value: 'all' },
    { label: 'Birthdays', value: 'birthday' },
    { label: 'Proposals', value: 'proposal' },
    { label: 'Romantic Room', value: 'room' },
    { label: 'Baby Showers', value: 'baby_shower' },
    { label: 'Anniversaries', value: 'anniversary' }
  ];

  const filteredItems = gallery.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#9E7749] font-semibold">
          Artisan Portfolio
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#1A1715]">
          Our Work & Real Celebrations
        </h1>
        <p className="text-sm sm:text-base text-[#6E6356] leading-relaxed">
          Explore actual event setups designed and styled by our creative team across private residences, boutique hotels, and scenic rooftops.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-[#EFE9DF] max-w-2xl mx-auto">
        {categories.map(cat => {
          const isActive = activeCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all ${
                isActive 
                  ? 'bg-[#1A1715] text-white shadow-sm' 
                  : 'text-[#5C5348] hover:text-[#1A1715]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white border border-[#E5DDD2] overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            onClick={() => setActiveModalItem(item)}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#F2EDE6]">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-3 bg-white/90 text-[#1A1715] rounded-none">
                  <ZoomIn className="w-5 h-5" />
                </span>
              </div>
              <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 px-2 py-1 text-[10px] uppercase font-bold tracking-wider text-[#1A1715]">
                {item.category.replace('_', ' ')}
              </div>
            </div>

            <div className="p-5 space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#1A1715] group-hover:text-[#9E7749] transition-colors leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-[#6B6156] leading-relaxed">
                {item.caption}
              </p>
              <div className="pt-2 border-t border-[#F2ECE3] flex items-center justify-between text-[11px] text-[#8C8074]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#9E7749]" />
                  {item.city}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#9E7749]" />
                  {item.eventDate}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] max-w-4xl w-full border border-[#3E3831] overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-[#1A1715] text-white hover:bg-[#3D3831] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-8 bg-black flex items-center justify-center aspect-[4/3] md:aspect-auto">
                <img
                  src={activeModalItem.imageUrl}
                  alt={activeModalItem.title}
                  className="w-full h-full max-h-[75vh] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="md:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="text-[11px] uppercase tracking-widest text-[#9E7749] font-bold block">
                    {activeModalItem.category.replace('_', ' ')} curation
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#1A1715]">
                    {activeModalItem.title}
                  </h3>
                  <p className="text-xs text-[#5C5348] leading-relaxed">
                    {activeModalItem.caption}
                  </p>
                  <div className="pt-3 border-t border-[#EAE2D8] text-xs text-[#7A6F62] space-y-1">
                    <p>Location: <strong>{activeModalItem.city}</strong></p>
                    <p>Executed: <strong>{activeModalItem.eventDate}</strong></p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EAE2D8]">
                  <button
                    onClick={() => {
                      setActiveModalItem(null);
                      setActiveView('book');
                    }}
                    className="w-full py-3 bg-[#1A1715] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#2F2923] transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Book a Setup Like This</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
