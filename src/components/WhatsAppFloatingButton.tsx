import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const { settings, services, generateWhatsAppLink } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(services[0]?.title || 'Bespoke Celebration');
  const [selectedPackage, setSelectedPackage] = useState('Standard Opulence');
  const [eventDate, setEventDate] = useState('');
  const [city, setCity] = useState(settings.serviceCities[0] || 'New Delhi');
  const [budget, setBudget] = useState(3500);

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const url = generateWhatsAppLink({
      serviceTitle: selectedService,
      packageTitle: selectedPackage,
      date: eventDate || 'Date to be confirmed',
      city,
      budget
    });
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div id="whatsapp-float" className="fixed bottom-6 right-6 z-50 flex flex-col items-end no-print">
      {/* Expanded Quick Enquiry Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-[#FAF8F5] border border-[#DCD3C7] shadow-2xl rounded-none p-5 text-[#1E1B18] animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between border-b border-[#EAE2D7] pb-3 mb-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#9E7749]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant WhatsApp Concierge</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-[#1A1715] mt-0.5">
                Quick Event Enquiry
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#8C8074] hover:text-[#1A1715] p-1"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSendWhatsApp} className="space-y-3 text-xs">
            <div>
              <label className="block text-[#5C5349] font-medium mb-1">Select Decoration Service</label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-white border border-[#D5C9BD] p-2 text-xs focus:outline-none focus:border-[#1A1715]"
              >
                {services.map(s => (
                  <option key={s.id} value={s.title}>{s.title}</option>
                ))}
                <option value="Custom Event Styling">Custom Themed Celebration</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[#5C5349] font-medium mb-1">Target Date</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-white border border-[#D5C9BD] p-2 text-xs focus:outline-none focus:border-[#1A1715]"
                />
              </div>
              <div>
                <label className="block text-[#5C5349] font-medium mb-1">Location / City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-white border border-[#D5C9BD] p-2 text-xs focus:outline-none focus:border-[#1A1715]"
                >
                  {settings.serviceCities.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[#5C5349] font-medium mb-1">Desired Package</label>
                <select
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                  className="w-full bg-white border border-[#D5C9BD] p-2 text-xs focus:outline-none focus:border-[#1A1715]"
                >
                  <option value="Basic Classic">Basic Package</option>
                  <option value="Standard Opulence">Standard Package</option>
                  <option value="Royale Imperial">Royale Premium</option>
                  <option value="Custom Tailored">Custom Proposal</option>
                </select>
              </div>
              <div>
                <label className="block text-[#5C5349] font-medium mb-1">Approx Budget ({settings.currencySymbol})</label>
                <input
                  type="number"
                  min="1000"
                  step="500"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full bg-white border border-[#D5C9BD] p-2 text-xs focus:outline-none focus:border-[#1A1715]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#25D366] hover:bg-[#20BE5B] text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                Send via WhatsApp ({settings.whatsappNumber})
              </button>
            </div>
            <p className="text-[11px] text-[#8C8074] text-center">
              Direct connection to our senior artisan lead.
            </p>
          </form>
        </div>
      )}

      {/* Floating Button Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl hover:shadow-2xl transition-all duration-200 group"
        aria-label="Contact Concierge on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-xs font-semibold tracking-wide hidden sm:inline">
          {isOpen ? 'Close Concierge' : 'WhatsApp Concierge'}
        </span>
      </button>
    </div>
  );
};
