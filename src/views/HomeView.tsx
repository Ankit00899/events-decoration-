import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Sparkles, Check, Star, ShieldCheck, Heart, Calendar, Clock, ChevronDown } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { services, settings, setActiveView, gallery } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const featuredServices = services.filter(s => s.isFeatured).slice(0, 4);

  const faqs = [
    {
      q: 'How far in advance do I need to book my event decoration?',
      a: 'We recommend reserving at least 3 to 14 days in advance to secure custom neon signage, bespoke florals, and your preferred setup time slot. However, for romantic room setups and surprise suites, express reservations within 24 to 48 hours are often possible based on crew availability.'
    },
    {
      q: 'Do you come to private homes, villas, and hotel rooms?',
      a: 'Yes! We frequently style hotel suites, rooftop penthouses, private backyards, banquet halls, and residential living rooms. For hotel suites, our team coordinates with the hotel front desk or concierge to ensure seamless and discreet room access.'
    },
    {
      q: 'How does payment work? Is there an advance deposit?',
      a: 'A 30% advance deposit secures your date on our calendar and reserves all custom decor materials. The remaining 70% balance is settled after on-site setup inspection before your celebration begins.'
    },
    {
      q: 'Are the balloons and materials environmentally conscious and safe?',
      a: 'Absolutely. We use 100% natural, biodegradable organic latex balloons free from harsh chemicals. For romantic candlelit setups, we offer both real flameless safety hurricane LED candles and enclosed dripless wax candles complying with luxury hotel regulations.'
    },
    {
      q: 'Can you customize the colors and theme to match my specific ideas?',
      a: 'Every single event setup is customized to your preferred palette, florals, and personal names. When booking, you can select from our popular palettes or enter your exact color moodboard.'
    }
  ];

  return (
    <div className="space-y-24">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-[#161412] text-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 z-10">
              <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-[#C5A880]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bespoke Luxury Event Styling</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#F5EFEB] leading-[1.12] tracking-tight">
                {settings.heroTitle}
              </h1>

              <p className="text-base sm:text-lg text-[#C7BCB0] max-w-xl font-light leading-relaxed">
                {settings.heroSubtitle}
              </p>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setActiveView('book')}
                  className="px-8 py-3.5 text-xs uppercase tracking-widest font-semibold bg-[#FAF8F5] text-[#1A1715] hover:bg-[#EAE2D7] transition-all shadow-md flex items-center gap-2"
                >
                  <span>Book an Installation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveView('services')}
                  className="px-6 py-3.5 text-xs uppercase tracking-widest font-semibold text-[#FAF8F5] border border-[#63574A] hover:border-[#FAF8F5] transition-all"
                >
                  Browse All Collections
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-[#2F2923] flex flex-wrap items-center gap-6 text-xs text-[#9E9182]">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#C5A880]" />
                  <span>Real Artisan Craftsmanship</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#C5A880]" />
                  <span>Discreet White-Glove Setup</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#C5A880]" />
                  <span>Date Lock Guarantee</span>
                </div>
              </div>
            </div>

            {/* Hero Image Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] overflow-hidden border border-[#3A332B] shadow-2xl">
                <img
                  src={services[0]?.coverImage || '/src/assets/images/hero_luxury_decor_1791540796509.jpg'}
                  alt="Luxury Event Decoration Setup"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161412]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#1E1B18]/90 backdrop-blur-sm border border-[#3E3831] text-xs">
                  <p className="text-[#C5A880] font-semibold uppercase tracking-wider text-[11px]">
                    Signature Curation
                  </p>
                  <p className="text-[#FAF8F5] font-serif text-base font-medium mt-0.5">
                    Private Ballroom & Romantic Suite Transformation
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Reassurance Metrics Strip (Zero-Pill, Tabular Numbers) */}
        <div className="border-t border-[#2B2621] bg-[#110F0E] py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
              <div>
                <div className="text-3xl font-serif font-bold text-[#F5EFEB] tabular-nums">1,250+</div>
                <p className="text-xs text-[#9E9182] uppercase tracking-wider mt-1">Celebrations Styled</p>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-[#F5EFEB] tabular-nums">4.9 ★</div>
                <p className="text-xs text-[#9E9182] uppercase tracking-wider mt-1">Client Satisfaction</p>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-[#F5EFEB] tabular-nums">100%</div>
                <p className="text-xs text-[#9E9182] uppercase tracking-wider mt-1">On-Time Execution</p>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-[#F5EFEB] tabular-nums">6</div>
                <p className="text-xs text-[#9E9182] uppercase tracking-wider mt-1">Metro Service Areas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Services Bento Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-[#EAE2D8] pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#9E7749] font-semibold">
              Signature Collections
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1715] mt-1">
              Curated Event Experiences
            </h2>
          </div>
          <button
            onClick={() => setActiveView('services')}
            className="text-xs uppercase tracking-widest font-semibold text-[#1A1715] hover:text-[#9E7749] flex items-center gap-1.5 transition-colors self-start md:self-auto"
          >
            <span>Explore All 10 Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service, idx) => (
            <div
              key={service.id}
              className="group bg-white border border-[#E7DFD4] hover:border-[#9E7749] transition-all flex flex-col overflow-hidden shadow-sm hover:shadow-md cursor-pointer"
              onClick={() => setActiveView('service-detail', { serviceId: service.id })}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F2EDE6]">
                <img
                  src={service.coverImage}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-[#1A1715] uppercase tracking-wider">
                  {service.category.replace('_', ' ')}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1A1715] group-hover:text-[#9E7749] transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#6B6156] mt-2 line-clamp-2 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0EAE2] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#8C8074]">From </span>
                    <strong className="text-sm font-serif font-bold text-[#1A1715] tabular-nums">
                      {settings.currencySymbol}{service.startingPrice}
                    </strong>
                  </div>
                  <span className="font-semibold text-[#9E7749] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Details →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. The Bespoke Process */}
      <section className="bg-[#F5EFEB] py-20 border-y border-[#E2D8CC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#9E7749] font-semibold">
              Frictionless Concierge
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1715]">
              How Our Service Operates
            </h2>
            <p className="text-sm text-[#665D52]">
              From initial theme consultation to complete post-event teardown, we handle every detail with discreet perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Select Style & Date',
                desc: 'Browse our curated decoration services, customize balloon & floral themes, and select your date and setup window.'
              },
              {
                step: '02',
                title: 'Artisan Review',
                desc: 'Our lead event coordinator verifies venue logistics, ceiling clearance, and schedule availability before confirming.'
              },
              {
                step: '03',
                title: 'Bespoke Fabrication',
                desc: 'Custom neon signage, organic balloons, imported floral arrangements, and prop plinths are prepared specifically for you.'
              },
              {
                step: '04',
                title: 'White-Glove Setup',
                desc: 'Our on-site crew arrives promptly, transforms the space quietly, and conducts a thorough pre-event walkthrough.'
              }
            ].map((p) => (
              <div key={p.step} className="bg-[#FAF8F5] p-6 border border-[#E5DDD2] space-y-3">
                <span className="font-serif text-3xl font-bold text-[#C5A880] tabular-nums">
                  {p.step}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#1A1715]">
                  {p.title}
                </h3>
                <p className="text-xs text-[#6B6156] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setActiveView('book')}
              className="px-8 py-3.5 text-xs uppercase tracking-widest font-semibold bg-[#1A1715] text-white hover:bg-[#2F2923] transition-colors"
            >
              Start Your Booking Request
            </button>
          </div>
        </div>
      </section>

      {/* 4. Real Client Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#9E7749] font-semibold">
            Client Words
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1715]">
            Celebrated by Couples & Families
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "The 4-foot marquee letters on our terrace made the proposal breathtaking. My fiancée was in tears the moment she walked onto the red carpet. Ankit and his team handled timing with absolute perfection!",
              name: 'Aman Sharma',
              event: 'Skyline Terrace Proposal · Central Delhi',
              rating: 5
            },
            {
              quote: "The candlelit surprise suite transformation in Shadipur was out of a fairytale. Over 2,000 real rose petals and the canopy fairy lights created an unforgettable anniversary evening.",
              name: 'Priya Mehra',
              event: 'Anniversary Suite Setup · Shadipur, New Delhi',
              rating: 5
            },
            {
              quote: "Riya’s 25th birthday balloon arch was the highlight of the night. Everyone took photos in front of the gold double arch and custom neon. The team handled setup and packdown effortlessly.",
              name: 'Riya & Kunal Kapoor',
              event: 'Grand 25th Birthday · Dwarka, New Delhi',
              rating: 5
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-7 border border-[#EAE2D8] flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#9E7749]">
                  {[...Array(item.rating)].map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#4A4238] italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F2ECE3]">
                <strong className="block text-sm font-serif font-bold text-[#1A1715]">
                  {item.name}
                </strong>
                <span className="text-xs text-[#8C8074]">
                  {item.event}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Frequently Asked Questions Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#9E7749] font-semibold">
            Common Inquiries
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#1A1715]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="border border-[#E2D8CC] bg-white">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
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
      </section>

      {/* 6. Custom Quotation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1A1715] text-[#FAF8F5] p-8 sm:p-14 border border-[#3E3831] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
              Unique Theme or Large Venue?
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5EFEB]">
              Request a Bespoke Quotation & Moodboard
            </h2>
            <p className="text-xs sm:text-sm text-[#BDB2A6] leading-relaxed">
              Have a specific inspiration photo from Pinterest or need custom 3D architectural styling? Share your vision and our senior decorator will prepare a personalized rate sheet within 4 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => setActiveView('quote')}
              className="w-full sm:w-auto px-7 py-3.5 text-xs uppercase tracking-widest font-semibold bg-[#FAF8F5] text-[#1A1715] hover:bg-[#E8DFD8] transition-colors text-center"
            >
              Request Custom Quote
            </button>
            <button
              onClick={() => {
                const phone = settings.whatsappNumber.replace(/[^0-9]/g, '');
                window.open(`https://wa.me/${phone}?text=Hello%20Aura%20Luxe,%20I%20have%20a%20custom%20event%20decoration%20concept%20I%20would%20like%20to%20discuss.`, '_blank');
              }}
              className="w-full sm:w-auto px-6 py-3.5 text-xs uppercase tracking-widest font-semibold text-[#FAF8F5] border border-[#6B5F52] hover:border-[#FAF8F5] transition-colors text-center"
            >
              WhatsApp Concierge
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
