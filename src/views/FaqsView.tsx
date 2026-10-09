import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronDown, MessageSquare } from 'lucide-react';

export const FaqsView: React.FC = () => {
  const { setActiveView, settings, generateWhatsAppLink } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = [
    {
      category: 'Booking & Reservations',
      items: [
        {
          q: 'How does the booking process work?',
          a: 'Select your preferred decoration collection and package, choose your event date, time slot, and venue address, and submit your booking request. Our lead artisan reviews the venue details and schedule. Once approved, you will receive a confirmation alert and payment instructions for the 30% advance deposit.'
        },
        {
          q: 'Why does my booking start in "Pending" status?',
          a: 'Unlike retail products, decoration installations require real-world artisan availability, ceiling height confirmation, travel time, and bespoke material preparation. We never auto-confirm a date until our team confirms that our crew can deliver 100% excellence.'
        },
        {
          q: 'How far in advance should I reserve?',
          a: 'We recommend 7–14 days in advance for milestone birthdays and proposals to ensure custom neon signs and fresh floral imports are ready. However, we often accommodate express romantic room setups within 24–48 hours depending on calendar availability.'
        }
      ]
    },
    {
      category: 'Venue & Hotel Setup',
      items: [
        {
          q: 'Can you set up in a hotel room while we are away at dinner?',
          a: 'Yes, this is our specialty! We regularly coordinate with hotel front desks, concierges, or trusted friends to gain access. We quietly set up hundreds of candles, rose petals, and canopy fairy lights so you return to a magical surprise.'
        },
        {
          q: 'Are your candles fire-safe for hotels and venues?',
          a: 'Yes. We provide both high-end flameless LED safety hurricane lanterns that flicker realistically (complying with all strict hotel safety codes) and enclosed safety glass pillar candles where venues permit.'
        },
        {
          q: 'Do you take down the decorations after the event?',
          a: 'Yes! All packages include teardown and packdown service. For hotel suites and morning-after venues, we also offer express next-morning packdown add-ons.'
        }
      ]
    },
    {
      category: 'Payments & Customization',
      items: [
        {
          q: 'What is your payment structure?',
          a: 'A 30% advance deposit is payable upon booking confirmation to secure your date and materials. The remaining 70% balance is settled after on-site installation inspection before your event starts.'
        },
        {
          q: 'Can I customize colors, neon signs, and floral types?',
          a: 'Yes! Every booking allows you to specify customized color palettes, custom neon names or numbers, and special requests. We tailor each element to your aesthetic.'
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#9E7749] font-semibold">
          Help & Answers
        </span>
        <h1 className="text-4xl font-serif font-bold text-[#1A1715]">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-[#6E6356] leading-relaxed">
          Everything you need to know about our luxury decoration installations, venue logistics, timing, and policies.
        </p>
      </div>

      <div className="space-y-10">
        {faqItems.map((cat, catIdx) => (
          <div key={catIdx} className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#1A1715] border-b border-[#EAE2D8] pb-2">
              {cat.category}
            </h2>
            <div className="space-y-3">
              {cat.items.map((faq, itemIdx) => {
                const uniqueKey = catIdx * 10 + itemIdx;
                const isOpen = openIndex === uniqueKey;
                return (
                  <div key={itemIdx} className="border border-[#E2D8CC] bg-white">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : uniqueKey)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-semibold text-[#1A1715] hover:text-[#9E7749] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#9E7749]' : 'text-[#8C8074]'}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-[#5C5349] leading-relaxed border-t border-[#F5EFEB] pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 bg-[#FAF8F5] border border-[#DFD6C9] text-center space-y-4">
        <h3 className="font-serif text-2xl font-bold text-[#1A1715]">Still have a specific question?</h3>
        <p className="text-xs sm:text-sm text-[#6B6156] max-w-md mx-auto">
          Our team is available 7 days a week via WhatsApp to discuss your venue, dimensions, and custom ideas.
        </p>
        <button
          onClick={() => {
            const url = generateWhatsAppLink({ text: 'Hello Aura Luxe! I have a question regarding event decoration options.' });
            window.open(url, '_blank');
          }}
          className="px-6 py-3 bg-[#25D366] text-white text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span>Chat on WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
