import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceCategory } from '../types';
import { Search, ArrowRight, Clock, Check, Sparkles } from 'lucide-react';

export const ServicesView: React.FC = () => {
  const { services, settings, setActiveView, selectedCategory } = useApp();
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>(selectedCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { label: string; value: ServiceCategory | 'all' }[] = [
    { label: 'All Curations', value: 'all' },
    { label: 'Birthday', value: 'birthday' },
    { label: 'Romantic Room', value: 'room' },
    { label: 'Proposal', value: 'proposal' },
    { label: 'Baby Shower', value: 'baby_shower' },
    { label: 'Anniversary', value: 'anniversary' },
    { label: 'Other Events', value: 'other' }
  ];

  const filteredServices = services.filter(service => {
    if (!service.isActive) return false;
    const matchesCat = activeCategory === 'all' || service.category === activeCategory;
    const matchesQuery = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#9E7749] font-semibold">
          Tailored Decor Installations
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#1A1715]">
          Decoration Services & Collections
        </h1>
        <p className="text-sm sm:text-base text-[#6E6356] leading-relaxed">
          From intimate candlelight surprises to monumental celebrations, explore our signature collections complete with transparent package tiers and custom add-ons.
        </p>
      </div>

      {/* Filter and Search Bar (Buttons/Tabs for interactive filtering allowed per design rules) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#E8DFD4] pb-6">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EFE9DF] rounded-none">
          {categories.map(cat => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all ${
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

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#8C8074] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#D8CEBE] pl-9 pr-3 py-2 text-xs text-[#1A1715] placeholder-[#9E9182] focus:outline-none focus:border-[#1A1715]"
          />
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-20 bg-white border border-[#EAE2D7] p-8 space-y-3">
          <p className="font-serif text-xl text-[#1A1715]">No collections found matching "{searchQuery}"</p>
          <p className="text-xs text-[#7A6E61]">Try adjusting your search terms or view our custom quote options.</p>
          <button
            onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
            className="mt-3 px-4 py-2 bg-[#1A1715] text-white text-xs uppercase tracking-wider"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-[#E7DFD4] hover:border-[#9E7749] transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div>
                {/* Photo */}
                <div
                  className="relative aspect-[4/3] overflow-hidden bg-[#F2EDE6] cursor-pointer"
                  onClick={() => setActiveView('service-detail', { serviceId: service.id })}
                >
                  <img
                    src={service.coverImage}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-[#1A1715] uppercase tracking-wider">
                    {service.category.replace('_', ' ')}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#1A1715]/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-white tracking-wide">
                    Min {service.minimumNoticeDays} days notice
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3
                      onClick={() => setActiveView('service-detail', { serviceId: service.id })}
                      className="font-serif text-xl font-bold text-[#1A1715] group-hover:text-[#9E7749] transition-colors cursor-pointer leading-snug"
                    >
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#6B6156] mt-2 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Highlights from Packages */}
                  <div className="space-y-1.5 pt-2 border-t border-[#F2ECE4]">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9E7749]">
                      Available Packages ({service.packages.length}):
                    </span>
                    <ul className="text-xs text-[#524B43] space-y-1">
                      {service.packages.map(pkg => (
                        <li key={pkg.id} className="flex items-center justify-between">
                          <span>{pkg.name}</span>
                          <span className="font-semibold tabular-nums">{settings.currencySymbol}{pkg.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Popular Palettes (Unboxed text with separators per zero-pill rule) */}
                  <div className="text-[11px] text-[#7A6F62] pt-1">
                    <span className="font-medium text-[#1A1715]">Themes: </span>
                    {service.popularThemeColors.slice(0, 2).join(' · ')}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 border-t border-[#F4EFE8] flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveView('service-detail', { serviceId: service.id })}
                  className="flex-1 py-2.5 text-xs uppercase tracking-wider font-semibold border border-[#D5CABB] text-[#1A1715] hover:bg-[#1A1715] hover:text-white transition-all text-center"
                >
                  View Details
                </button>
                <button
                  onClick={() => setActiveView('book', { serviceId: service.id })}
                  className="flex-1 py-2.5 text-xs uppercase tracking-wider font-semibold bg-[#1A1715] text-white hover:bg-[#2F2923] transition-all text-center shadow-sm"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
