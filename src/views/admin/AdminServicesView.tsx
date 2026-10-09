import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DecorationService, ServiceCategory, Package, AddOn } from '../../types';
import { Plus, Edit3, Trash2, Check, X, Sparkles, Image, Clock, MapPin } from 'lucide-react';

export const AdminServicesView: React.FC = () => {
  const { services, addOrUpdateService, deleteService, settings } = useApp();
  const [editingService, setEditingService] = useState<DecorationService | null>(null);
  const [isNew, setIsNew] = useState(false);

  // Form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('birthday');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [minimumNoticeDays, setMinimumNoticeDays] = useState(2);
  const [startingPrice, setStartingPrice] = useState(2999);
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [themeColorsStr, setThemeColorsStr] = useState('Champagne & Gold, White & Rose');
  const [citiesStr, setCitiesStr] = useState('New Delhi, Shadipur & West Delhi, Central Delhi, South Delhi, Noida, Gurugram');

  const openNewServiceModal = () => {
    setIsNew(true);
    setTitle('');
    setCategory('birthday');
    setShortDescription('');
    setFullDescription('');
    setCoverImage('/src/assets/images/birthday_balloon_setup_1791540816181.jpg');
    setMinimumNoticeDays(2);
    setStartingPrice(2999);
    setIsActive(true);
    setIsFeatured(false);
    setThemeColorsStr('Champagne & Gold, White & Rose');
    setCitiesStr(settings.serviceCities.join(', '));
    setEditingService({
      id: `srv-${Date.now()}`,
      title: '',
      slug: '',
      category: 'birthday',
      shortDescription: '',
      fullDescription: '',
      coverImage: '/src/assets/images/birthday_balloon_setup_1791540816181.jpg',
      galleryImages: ['/src/assets/images/birthday_balloon_setup_1791540816181.jpg'],
      packages: [
        {
          id: `pkg-${Date.now()}-1`,
          name: 'Basic Classic',
          tagline: 'Refined single arch setup',
          price: 2999,
          setupHours: 2,
          features: ['Single focal arch frame', 'Organic balloon garland (2 colors)', 'Standard neon rental', 'Tear down service']
        },
        {
          id: `pkg-${Date.now()}-2`,
          name: 'Standard Opulence',
          tagline: 'Bespoke double arch with florals',
          price: 5499,
          setupHours: 3,
          isPopular: true,
          features: ['Double circular frame', 'High-density organic balloons', 'Custom neon sign', 'Fluted cylinder plinths']
        }
      ],
      availableAddOns: [
        { id: `add-${Date.now()}-1`, name: 'Marquee Illuminated Numbers', description: 'Giant 3ft bulb digits', price: 999 }
      ],
      minimumNoticeDays: 2,
      popularThemeColors: ['Champagne & Gold', 'White & Rose'],
      isActive: true,
      isFeatured: false,
      citiesAvailable: settings.serviceCities,
      startingPrice: 2999
    });
  };

  const openEditService = (s: DecorationService) => {
    setIsNew(false);
    setEditingService(s);
    setTitle(s.title);
    setCategory(s.category);
    setShortDescription(s.shortDescription);
    setFullDescription(s.fullDescription);
    setCoverImage(s.coverImage);
    setMinimumNoticeDays(s.minimumNoticeDays);
    setStartingPrice(s.startingPrice);
    setIsActive(s.isActive);
    setIsFeatured(s.isFeatured);
    setThemeColorsStr(s.popularThemeColors.join(', '));
    setCitiesStr(s.citiesAvailable.join(', '));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    const colorsArray = themeColorsStr.split(',').map(s => s.trim()).filter(Boolean);
    const citiesArray = citiesStr.split(',').map(s => s.trim()).filter(Boolean);
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const updated: DecorationService = {
      ...editingService,
      title,
      slug,
      category,
      shortDescription,
      fullDescription,
      coverImage,
      minimumNoticeDays,
      startingPrice,
      isActive,
      isFeatured,
      popularThemeColors: colorsArray.length ? colorsArray : ['Custom Palette'],
      citiesAvailable: citiesArray.length ? citiesArray : settings.serviceCities
    };

    addOrUpdateService(updated);
    setEditingService(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E0D7CC] pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1715]">
            Decoration Services & Packages Management
          </h1>
          <p className="text-xs text-[#7A6F62] mt-1">
            Create, update prices, manage packages, and publish decoration curations directly to the live customer catalog.
          </p>
        </div>

        <button
          onClick={openNewServiceModal}
          className="px-5 py-2.5 bg-[#1A1715] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#2F2923] flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Decoration Service</span>
        </button>
      </div>

      {/* Services Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div
            key={service.id}
            className={`bg-white border transition-all flex flex-col justify-between ${
              service.isActive ? 'border-[#DFD6C9]' : 'border-zinc-300 opacity-60'
            }`}
          >
            <div>
              <div className="relative aspect-[16/9] overflow-hidden bg-[#EAE2D8]">
                <img
                  src={service.coverImage}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 bg-[#FAF8F5]/90 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 text-[#1A1715]">
                  {service.category.replace('_', ' ')}
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${
                    service.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-200 text-zinc-700'
                  }`}>
                    {service.isActive ? 'Active' : 'Disabled'}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-serif font-bold text-lg text-[#1A1715]">
                  {service.title}
                </h3>
                <p className="text-xs text-[#6B6156] line-clamp-2">
                  {service.shortDescription}
                </p>

                <div className="pt-2 border-t border-[#F0EAE2] space-y-1 text-xs text-[#52493E]">
                  <p>Starting Price: <strong className="font-serif font-bold tabular-nums">{settings.currencySymbol}{service.startingPrice}</strong></p>
                  <p>Packages: <strong>{service.packages.length} tiers</strong> · Add-ons: <strong>{service.availableAddOns.length} items</strong></p>
                  <p>Notice Period: <strong>{service.minimumNoticeDays} business days</strong></p>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-[#F2ECE3] flex items-center justify-between gap-2">
              <button
                onClick={() => openEditService(service)}
                className="flex-1 py-2 text-xs font-semibold uppercase tracking-wider border border-[#D5CABB] text-[#1A1715] hover:bg-[#FAF8F5] flex items-center justify-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Service</span>
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete service "${service.title}"?`)) {
                    deleteService(service.id);
                  }
                }}
                className="p-2 border border-red-200 text-red-600 hover:bg-red-50 text-xs"
                title="Delete Service"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#3E3831] p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-[#EAE2D8] pb-3">
              <h2 className="font-serif font-bold text-2xl text-[#1A1715]">
                {isNew ? 'Create New Decoration Service' : `Edit: ${editingService.title}`}
              </h2>
              <button
                onClick={() => setEditingService(null)}
                className="text-[#8C8074] hover:text-[#1A1715] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6 text-xs text-[#3D352B]">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 border border-[#D5CABB]"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                    className="w-full p-2.5 border border-[#D5CABB]"
                  >
                    <option value="birthday">Birthday Decoration</option>
                    <option value="anniversary">Anniversary Decoration</option>
                    <option value="room">Romantic Room Decoration</option>
                    <option value="proposal">Marriage Proposal Decoration</option>
                    <option value="baby_shower">Baby Shower Decoration</option>
                    <option value="engagement">Engagement & Ring Ceremony</option>
                    <option value="other">Other / Custom Event</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Short Description (Cards) *</label>
                <input
                  type="text"
                  required
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full p-2.5 border border-[#D5CABB]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Full Description *</label>
                <textarea
                  rows={3}
                  required
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  className="w-full p-2.5 border border-[#D5CABB]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Cover Image URL *</label>
                  <input
                    type="text"
                    required
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full p-2.5 border border-[#D5CABB]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Starting Price ({settings.currencySymbol})</label>
                  <input
                    type="number"
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(Number(e.target.value))}
                    className="w-full p-2.5 border border-[#D5CABB]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Min Notice (Days)</label>
                  <input
                    type="number"
                    value={minimumNoticeDays}
                    onChange={(e) => setMinimumNoticeDays(Number(e.target.value))}
                    className="w-full p-2.5 border border-[#D5CABB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Theme Colors (comma separated)</label>
                  <input
                    type="text"
                    value={themeColorsStr}
                    onChange={(e) => setThemeColorsStr(e.target.value)}
                    className="w-full p-2.5 border border-[#D5CABB]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Available Cities (comma separated)</label>
                  <input
                    type="text"
                    value={citiesStr}
                    onChange={(e) => setCitiesStr(e.target.value)}
                    className="w-full p-2.5 border border-[#D5CABB]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="accent-[#1A1715]"
                  />
                  <span className="font-semibold">Service Active & Visible on Website</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="accent-[#1A1715]"
                  />
                  <span className="font-semibold">Feature on Homepage</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#EAE2D8] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-5 py-2.5 border border-[#D5CABB] text-xs uppercase font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 bg-[#1A1715] text-white text-xs uppercase tracking-wider font-semibold"
                >
                  Save Service
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
