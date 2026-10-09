import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Check, Clock, MapPin, Sparkles, ArrowLeft, MessageSquare, ShieldCheck } from 'lucide-react';

export const ServiceDetailView: React.FC = () => {
  const { services, selectedServiceId, settings, setActiveView, generateWhatsAppLink } = useApp();

  const service = services.find(s => s.id === selectedServiceId) || services[0];

  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    service?.packages.find(p => p.isPopular)?.id || service?.packages[0]?.id || ''
  );
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>(service?.popularThemeColors[0] || 'Custom Theme');

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="font-serif text-2xl">Service not found.</p>
        <button
          onClick={() => setActiveView('services')}
          className="mt-4 px-6 py-2 bg-[#1A1715] text-white text-xs uppercase"
        >
          Back to Services
        </button>
      </div>
    );
  }

  const selectedPkg = service.packages.find(p => p.id === selectedPackageId) || service.packages[0];

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const calculatedAddOnsTotal = service.availableAddOns
    .filter(a => selectedAddOnIds.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);

  const totalCalculatedPrice = (selectedPkg?.price || 0) + calculatedAddOnsTotal;
  const depositRequired = Math.round(totalCalculatedPrice * (settings.depositPercentage / 100));

  const handleBookNow = () => {
    // Navigate to booking wizard with preselected service and package
    setActiveView('book', { serviceId: service.id });
  };

  const handleWhatsAppEnquiry = () => {
    const url = generateWhatsAppLink({
      serviceTitle: service.title,
      packageTitle: selectedPkg?.name,
      budget: totalCalculatedPrice,
      city: service.citiesAvailable[0]
    });
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back Button */}
      <div>
        <button
          onClick={() => setActiveView('services')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#665D52] hover:text-[#1A1715] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Collections</span>
        </button>
      </div>

      {/* Hero Service Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Photos Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] bg-[#EFE9E0] border border-[#DCD3C6] overflow-hidden shadow-sm">
            <img
              src={service.coverImage}
              alt={service.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-[#1A1715]/90 text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 backdrop-blur-sm">
              {service.category.replace('_', ' ')}
            </div>
          </div>

          {/* Secondary Gallery Previews */}
          {service.galleryImages.length > 1 && (
            <div className="grid grid-cols-3 gap-3">
              {service.galleryImages.map((img, i) => (
                <div key={i} className="aspect-[4/3] border border-[#E0D7CC] overflow-hidden bg-[#F2EDE6]">
                  <img
                    src={img}
                    alt={`${service.title} sample ${i + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info & Booking Quick Action */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-widest text-[#9E7749] font-semibold">
              Bespoke Artisan Experience
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1715] leading-tight">
              {service.title}
            </h1>
          </div>

          <p className="text-sm text-[#5C5347] leading-relaxed">
            {service.fullDescription}
          </p>

          {/* Logistics specs */}
          <div className="p-4 bg-[#F5EFEB] border border-[#E5DCD0] space-y-2 text-xs text-[#52493F]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#9E7749]" />
              <span>Minimum Booking Notice: <strong>{service.minimumNoticeDays} business days</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#9E7749]" />
              <span>Available in: <strong>{service.citiesAvailable.join(', ')}</strong></span>
            </div>
          </div>

          {/* Theme Color Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1715]">
              Curated Color Palettes
            </label>
            <div className="flex flex-wrap gap-2">
              {service.popularThemeColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1.5 text-xs border transition-all ${
                    selectedColor === color
                      ? 'border-[#1A1715] bg-[#1A1715] text-white font-medium'
                      : 'border-[#D5CABB] bg-white text-[#52493E] hover:border-[#1A1715]'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Estimated Total Calculation Box */}
          <div className="bg-[#FAF8F5] p-5 border border-[#DFD5C7] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#7A6F62]">
              <span>Selected Package ({selectedPkg?.name}):</span>
              <span className="font-semibold text-[#1A1715] tabular-nums">{settings.currencySymbol}{selectedPkg?.price}</span>
            </div>
            {calculatedAddOnsTotal > 0 && (
              <div className="flex items-center justify-between text-xs text-[#7A6F62]">
                <span>Selected Add-ons ({selectedAddOnIds.length}):</span>
                <span className="font-semibold text-[#1A1715] tabular-nums">+{settings.currencySymbol}{calculatedAddOnsTotal}</span>
              </div>
            )}
            <div className="pt-2 border-t border-[#EAE2D7] flex items-baseline justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#1A1715]">Estimated Investment:</span>
                <p className="text-[11px] text-[#8C8074]">Includes full on-site setup & tear down</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-serif font-bold text-[#1A1715] tabular-nums">
                  {settings.currencySymbol}{totalCalculatedPrice}
                </span>
                <p className="text-[11px] text-[#9E7749] font-medium">
                  {settings.depositPercentage}% Deposit: {settings.currencySymbol}{depositRequired}
                </p>
              </div>
            </div>

            <div className="pt-3 flex flex-col gap-2">
              <button
                onClick={handleBookNow}
                className="w-full py-3 text-xs uppercase tracking-widest font-semibold bg-[#1A1715] text-white hover:bg-[#2F2923] transition-colors shadow-sm"
              >
                Proceed to Book This Service
              </button>
              <button
                onClick={handleWhatsAppEnquiry}
                className="w-full py-2.5 text-xs uppercase tracking-wider font-semibold border border-[#D5CABB] text-[#1A1715] hover:bg-[#F2EDE5] transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                Inquire via WhatsApp
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Package Inclusions Comparison */}
      <section className="pt-10 border-t border-[#EAE2D8] space-y-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#9E7749] font-semibold">
            Transparent Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1715]">
            Choose Your Package Tier
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6155] mt-1">
            Every package is executed with professional-grade materials and artisan styling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.packages.map((pkg) => {
            const isSelected = selectedPackageId === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackageId(pkg.id)}
                className={`p-6 border transition-all cursor-pointer flex flex-col justify-between relative ${
                  isSelected 
                    ? 'border-[#1A1715] bg-white ring-2 ring-[#1A1715] shadow-md' 
                    : 'border-[#E2D8CC] bg-[#FAF8F5] hover:border-[#9E7749]'
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3 left-6 bg-[#9E7749] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5">
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#1A1715]">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-[#7A6E60] mt-0.5">
                        {pkg.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="text-3xl font-serif font-bold text-[#1A1715] tabular-nums">
                    {settings.currencySymbol}{pkg.price}
                  </div>

                  <div className="text-[11px] text-[#7A6F62] flex items-center gap-1.5 pb-2 border-b border-[#EFEAE2]">
                    <Clock className="w-3.5 h-3.5 text-[#9E7749]" />
                    <span>Est. Setup Time: {pkg.setupHours} hours</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 text-xs text-[#4A4237]">
                    {pkg.features.map((feat, fi) => (
                      <li key={fi} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#9E7749] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    className={`w-full py-2.5 text-xs uppercase tracking-wider font-semibold transition-all ${
                      isSelected 
                        ? 'bg-[#1A1715] text-white' 
                        : 'border border-[#D0C4B5] text-[#1A1715] hover:bg-[#1A1715] hover:text-white'
                    }`}
                  >
                    {isSelected ? 'Selected Tier' : 'Select This Tier'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Available Add-Ons */}
      {service.availableAddOns.length > 0 && (
        <section className="pt-8 border-t border-[#EAE2D8] space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#9E7749] font-semibold">
              Bespoke Enhancements
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#1A1715]">
              Optional Celebration Add-Ons
            </h2>
            <p className="text-xs text-[#6B6155] mt-1">
              Select optional enhancements to elevate your visual styling and create memorable moments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.availableAddOns.map((addon) => {
              const isAdded = selectedAddOnIds.includes(addon.id);
              return (
                <div
                  key={addon.id}
                  onClick={() => toggleAddOn(addon.id)}
                  className={`p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                    isAdded 
                      ? 'border-[#1A1715] bg-[#F2EDE5] ring-1 ring-[#1A1715]' 
                      : 'border-[#E2D8CC] bg-white hover:border-[#9E7749]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-sm text-[#1A1715]">
                        {addon.name}
                      </h4>
                      <input
                        type="checkbox"
                        checked={isAdded}
                        onChange={() => {}}
                        className="rounded-none text-[#1A1715] accent-[#1A1715]"
                      />
                    </div>
                    <p className="text-[11px] text-[#6B6155] leading-relaxed">
                      {addon.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#EFEAE2] flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-[#1A1715] tabular-nums">
                      +{settings.currencySymbol}{addon.price}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9E7749]">
                      {isAdded ? 'Added' : '+ Add Item'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
