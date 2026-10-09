import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Shield, Heart, Award, ArrowRight } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { settings, setActiveView } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#9E7749] font-semibold">
          The Artisan Story
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#1A1715]">
          Crafting Unforgettable Atmospheres
        </h1>
        <p className="text-sm sm:text-base text-[#6E6356] leading-relaxed">
          Founded with a singular passion: to transform ordinary spaces into magical, heart-stirring celebrations where memories are etched for a lifetime.
        </p>
      </div>

      {/* Story split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative aspect-[4/3] border border-[#DFD6C9] overflow-hidden shadow-lg bg-[#EAE2D7]">
          <img
            src="/src/assets/images/hero_luxury_decor_1791540796509.jpg"
            alt="Artisans at work"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="lg:col-span-6 space-y-5 text-xs sm:text-sm text-[#52493E] leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1715]">
            From Intimate Surprises to Grand Milestones
          </h2>
          <p>
            {settings.businessName} was established to solve a common event frustration: lack of reliability, cheap plastic props, and uninspired cookie-cutter balloons. We envisioned a luxury bespoke styling studio where architectural framing, organic balloon textures, and fragrant fresh botanicals combine into pure artistry.
          </p>
          <p>
            Whether executing an unannounced romantic suite surprise for an anniversary, orchestrating 4-foot marquee letters on a rooftop at twilight for a proposal, or framing a double-arch baby shower, our team works with precision, punctuality, and total discretion.
          </p>
          <div className="pt-2 flex items-center gap-6">
            <div>
              <span className="font-serif text-3xl font-bold text-[#1A1715] tabular-nums">100%</span>
              <p className="text-xs text-[#8C8074]">Biodegradable Balloons</p>
            </div>
            <div className="h-10 w-px bg-[#E2D8CC]" />
            <div>
              <span className="font-serif text-3xl font-bold text-[#1A1715] tabular-nums">Zero</span>
              <p className="text-xs text-[#8C8074]">Stress for Clients</p>
            </div>
            <div className="h-10 w-px bg-[#E2D8CC]" />
            <div>
              <span className="font-serif text-3xl font-bold text-[#1A1715] tabular-nums">24/7</span>
              <p className="text-xs text-[#8C8074]">Surprise Setup Windows</p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
        {[
          {
            icon: Shield,
            title: 'White-Glove Discretion',
            desc: 'We coordinate quietly with hotel front desks, banquet managers, and keyholders so that your surprise remains a complete secret until the grand reveal.'
          },
          {
            icon: Sparkles,
            title: 'Master Artisan Craftsmanship',
            desc: 'Every balloon garland is custom inflated on-site using organic textures and high-grade matte finishes that remain vibrant for 48+ hours.'
          },
          {
            icon: Award,
            title: 'Safety & Eco-Conscious Standards',
            desc: 'Our LED candle lanterns adhere to 5-star hotel fire codes, and our balloons are manufactured from 100% natural tree latex.'
          }
        ].map((v, i) => (
          <div key={i} className="p-8 bg-white border border-[#E5DDD2] space-y-3">
            <v.icon className="w-8 h-8 text-[#9E7749]" />
            <h3 className="font-serif text-xl font-bold text-[#1A1715]">{v.title}</h3>
            <p className="text-xs text-[#6B6156] leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center pt-8">
        <button
          onClick={() => setActiveView('book')}
          className="px-8 py-3.5 bg-[#1A1715] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#2F2923] transition-colors"
        >
          Book Your Event With Us
        </button>
      </div>
    </div>
  );
};
