import React from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setActiveView, loginAs } = useApp();

  return (
    <footer className="bg-[#161412] text-[#C4B7A9] border-t border-[#2B2621] pt-16 pb-12 mt-20 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#28231E]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-serif text-[#F2ECE3] font-semibold tracking-wider">
              {settings.businessName}
            </h2>
            <p className="text-sm text-[#9E9182] leading-relaxed max-w-sm">
              {settings.tagline}. Handcrafting awe-inspiring balloon installations, candlelit romantic sanctuaries, skyline proposals, and celebratory backdrops tailored to your story.
            </p>
            <div className="pt-2 text-xs text-[#877A6C] space-y-1">
              <p>Service Locations: {settings.serviceCities.join(', ')}</p>
              <p>Operating Hours: {settings.workingHours}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-[#E8DFD8] font-semibold">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setActiveView('services')} className="hover:text-white transition-colors">
                  All Services
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('packages')} className="hover:text-white transition-colors">
                  Packages & Pricing
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('gallery')} className="hover:text-white transition-colors">
                  Our Work Gallery
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('about')} className="hover:text-white transition-colors">
                  About Our Artisans
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('contact')} className="hover:text-white transition-colors">
                  Contact & Location
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('faqs')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Event Categories */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-[#E8DFD8] font-semibold">
              Curations
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setActiveView('services', { category: 'birthday' })} className="hover:text-white transition-colors">
                  Birthday Celebrations
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('services', { category: 'room' })} className="hover:text-white transition-colors">
                  Romantic Room Decor
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('services', { category: 'proposal' })} className="hover:text-white transition-colors">
                  Marriage Proposals
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('services', { category: 'baby_shower' })} className="hover:text-white transition-colors">
                  Baby Showers & Welcome
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('services', { category: 'anniversary' })} className="hover:text-white transition-colors">
                  Anniversary Milestones
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('quote')} className="hover:text-white transition-colors">
                  Custom Themed Request
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Concierge Contact */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-[#E8DFD8] font-semibold">
              Private Concierge
            </h3>
            <div className="space-y-2.5 text-sm text-[#B0A395]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#9E7749] shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">{settings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#9E7749] shrink-0" />
                <span className="text-xs">{settings.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#9E7749] shrink-0" />
                <span className="text-xs">{settings.email}</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => {
                    const phone = settings.whatsappNumber.replace(/[^0-9]/g, '');
                    window.open(`https://wa.me/${phone}?text=Hello%20Aura%20Luxe%20Concierge,%20I%20would%20like%20to%20enquire%20about%20event%20decorations.`, '_blank');
                  }}
                  className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 bg-[#25211D] border border-[#3A332C] hover:border-[#9E7749] text-[#E8DFD8] rounded transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                  Chat on WhatsApp
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A6E61]">
          <p>© {new Date().getFullYear()} {settings.businessName}. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center gap-6">
            <button onClick={() => setActiveView('cancellation')} className="hover:text-[#D1C5B7] transition-colors">
              Cancellation & Refund Policy
            </button>
            <button onClick={() => setActiveView('terms')} className="hover:text-[#D1C5B7] transition-colors">
              Terms & Conditions
            </button>
            <button onClick={() => setActiveView('privacy')} className="hover:text-[#D1C5B7] transition-colors">
              Privacy Policy
            </button>
            <button
              onClick={() => loginAs('admin')}
              className="text-[#9E7749] hover:text-[#C5A880] flex items-center gap-1 font-medium transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Owner Portal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
