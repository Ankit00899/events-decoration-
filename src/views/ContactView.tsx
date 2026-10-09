import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { settings, submitEnquiry, generateWhatsAppLink } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitEnquiry({
      name,
      phone,
      email,
      serviceCategory: 'Direct Contact Message',
      estimatedBudget: 500,
      eventDate: 'TBD',
      city: settings.serviceCities[0] || 'Manhattan',
      message
    });
    setSent(true);
  };

  const handleWhatsAppChat = () => {
    const url = generateWhatsAppLink({
      text: `Hello ${settings.businessName} Concierge! I have a question regarding decoration services and availability.`
    });
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#9E7749] font-semibold">
          Get In Touch
        </span>
        <h1 className="text-4xl font-serif font-bold text-[#1A1715]">
          Contact Our Concierge
        </h1>
        <p className="text-sm text-[#6E6356] leading-relaxed">
          Have questions about an upcoming celebration, venue restrictions, or custom dates? Our team is available 7 days a week.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info Column */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[#FAF8F5] p-8 border border-[#DFD6C9] space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#1A1715]">
              Studio Information
            </h3>

            <div className="space-y-4 text-xs text-[#52493E]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#9E7749] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1A1715] font-semibold">Design Studio & Workshop</strong>
                  <span>{settings.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#9E7749] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1A1715] font-semibold">Concierge Line</strong>
                  <span>{settings.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#9E7749] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1A1715] font-semibold">Direct Email</strong>
                  <span>{settings.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#9E7749] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1A1715] font-semibold">Service Hours</strong>
                  <span>{settings.workingHours}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EAE2D8]">
              <button
                onClick={handleWhatsAppChat}
                className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Chat via WhatsApp ({settings.whatsappNumber})</span>
              </button>
            </div>
          </div>

          <div className="p-6 bg-white border border-[#E5DDD2] space-y-2">
            <h4 className="font-serif font-bold text-base text-[#1A1715]">Coverage Cities</h4>
            <p className="text-xs text-[#6B6156]">
              We provide prompt white-glove setup and delivery across: {settings.serviceCities.join(', ')}. Custom travel to neighboring destinations is available upon request.
            </p>
          </div>
        </div>

        {/* Interactive Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 border border-[#DFD6C9] shadow-sm">
          {sent ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#9E7749] mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-[#1A1715]">Message Received</h3>
              <p className="text-xs sm:text-sm text-[#6B6156] max-w-sm mx-auto">
                Thank you, {name}. A member of our concierge team will reach out promptly to assist with your inquiry.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-4 px-6 py-2 border border-[#D5CABB] text-xs uppercase font-semibold"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#1A1715]">Send a Direct Message</h3>
                <p className="text-xs text-[#7A6F62] mt-1">We respond within 2 hours during normal operating hours.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D352B] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#D5CABA] p-3 text-xs text-[#1A1715] focus:outline-none focus:border-[#1A1715]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D352B] mb-1.5">
                      Phone Number *
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
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D352B] mb-1.5">
                    Your Message or Inquiry *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the event date, venue location, or any questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#D5CABA] p-3 text-xs text-[#1A1715] focus:outline-none focus:border-[#1A1715]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#1A1715] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#2F2923] transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
