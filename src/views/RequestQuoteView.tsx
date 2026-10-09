import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Send, CheckCircle2, MessageSquare, Sparkles, MapPin, Calendar } from 'lucide-react';

export const RequestQuoteView: React.FC = () => {
  const { settings, submitEnquiry, generateWhatsAppLink } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceCategory, setServiceCategory] = useState('Custom Event Decoration');
  const [estimatedBudget, setEstimatedBudget] = useState(6000);
  const [eventDate, setEventDate] = useState('');
  const [city, setCity] = useState(settings.serviceCities[0] || 'New Delhi');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitEnquiry({
      name,
      phone,
      email,
      serviceCategory,
      estimatedBudget,
      eventDate: eventDate || 'TBD',
      city,
      message
    });
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const url = generateWhatsAppLink({
      serviceTitle: serviceCategory,
      date: eventDate,
      city,
      budget: estimatedBudget,
      text: `Hello ${settings.businessName}! ✨ I would like a custom quotation for *${serviceCategory}*.\n• Target Date: ${eventDate || 'Flexible'}\n• City: ${city}\n• Estimated Budget: ${settings.currencySymbol}${estimatedBudget}\n• Details: ${message || 'Looking for bespoke styling.'}\nFrom: ${name} (${phone})`
    });
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#9E7749] font-semibold">
          Tailored Quotation
        </span>
        <h1 className="text-4xl font-serif font-bold text-[#1A1715]">
          Request a Custom Event Quotation
        </h1>
        <p className="text-sm text-[#6B6155] leading-relaxed">
          Planning a high-concept celebration, destination surprise, or large venue installation? Provide your vision and our senior creative director will assemble a bespoke concept board and transparent quote.
        </p>
      </div>

      {submitted ? (
        <div className="bg-[#FAF8F5] border border-[#D5CABB] p-10 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-[#9E7749] mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-[#1A1715]">Quotation Request Received!</h2>
          <p className="text-xs sm:text-sm text-[#6B6156] max-w-md mx-auto">
            Thank you, {name}. Our creative lead will review your specifications and reply via email and WhatsApp with a moodboard and rate card within 4 business hours.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={handleWhatsApp}
              className="px-6 py-3 bg-[#25D366] text-white text-xs uppercase tracking-wider font-semibold flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Fast-Track via WhatsApp</span>
            </button>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-3 border border-[#D5CABB] text-[#1A1715] text-xs uppercase tracking-wider font-semibold"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-10 border border-[#DFD6C9] shadow-sm space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D352B] mb-1.5">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Marcus Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D5CABA] p-3 text-xs text-[#1A1715] focus:outline-none focus:border-[#1A1715]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D352B] mb-1.5">
                Contact Phone (WhatsApp) *
              </label>
              <input
                type="tel"
                required
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D5CABA] p-3 text-xs text-[#1A1715] focus:outline-none focus:border-[#1A1715]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D352B] mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D5CABA] p-3 text-xs text-[#1A1715] focus:outline-none focus:border-[#1A1715]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D352B] mb-1.5">
                Event Category *
              </label>
              <select
                value={serviceCategory}
                onChange={(e) => setServiceCategory(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D5CABA] p-3 text-xs text-[#1A1715] focus:outline-none focus:border-[#1A1715]"
              >
                <option value="Birthday Extravaganza">Birthday Extravaganza</option>
                <option value="Romantic Room Surprise">Romantic Room Surprise</option>
                <option value="Marriage Proposal Production">Marriage Proposal Production</option>
                <option value="Baby Shower / Welcome Baby">Baby Shower / Welcome Baby</option>
                <option value="Milestone Anniversary">Milestone Anniversary</option>
                <option value="Engagement & Ring Ceremony">Engagement & Ring Ceremony</option>
                <option value="Corporate / Luxury Gala">Corporate / Luxury Gala</option>
                <option value="Custom Bespoke Concept">Other Custom Theme</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D352B] mb-1.5">
                Target Date
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D5CABA] p-3 text-xs text-[#1A1715] focus:outline-none focus:border-[#1A1715]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D352B] mb-1.5">
                Target Location / City
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D5CABA] p-3 text-xs text-[#1A1715] focus:outline-none focus:border-[#1A1715]"
              >
                {settings.serviceCities.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D352B] mb-1.5">
                Estimated Budget ({settings.currencySymbol})
              </label>
              <input
                type="number"
                min="1000"
                step="500"
                value={estimatedBudget}
                onChange={(e) => setEstimatedBudget(Number(e.target.value))}
                className="w-full bg-[#FAF8F5] border border-[#D5CABA] p-3 text-xs text-[#1A1715] focus:outline-none focus:border-[#1A1715]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D352B] mb-1.5">
              Event Vision, Venue Type, Theme Colors & Links
            </label>
            <textarea
              rows={4}
              required
              placeholder="Describe your desired theme, venue details (e.g. penthouse, hotel, private garden), color preferences, or paste links to Pinterest moodboards..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#D5CABA] p-3 text-xs text-[#1A1715] focus:outline-none focus:border-[#1A1715]"
            />
          </div>

          <div className="pt-4 border-t border-[#EAE2D8] flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="w-full sm:w-auto px-6 py-3 border border-[#25D366] text-[#1E7E34] hover:bg-[#25D366] hover:text-white text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Send Instantly via WhatsApp</span>
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#1A1715] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#2F2923] transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>Submit Quotation Request</span>
            </button>
          </div>

        </form>
      )}
    </div>
  );
};
