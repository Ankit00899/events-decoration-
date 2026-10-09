import React from 'react';
import { useApp } from '../context/AppContext';
import { Check, Sparkles, Clock, ArrowRight } from 'lucide-react';

export const PackagesPricingView: React.FC = () => {
  const { settings, setActiveView, services } = useApp();

  const tiers = [
    {
      name: 'Basic Classic',
      badge: 'Essential Charm',
      startingPrice: 2499,
      setupTime: '1.5 – 2.0 Hours',
      description: 'Ideal for intimate home celebrations, cozy hotel surprises, and small family gatherings.',
      features: [
        'Single arch or focal backdrop installation',
        'Standard organic balloon garland (up to 2 colors)',
        'Warm fairy lighting & subtle drape styling',
        'Standard LED neon sign rental (e.g. Happy Birthday / Love)',
        'Single cake pedestal or cocktail display table',
        'Complete on-site artisan setup and standard teardown'
      ],
      popular: false
    },
    {
      name: 'Standard Opulence',
      badge: 'Most Popular',
      startingPrice: 4999,
      setupTime: '2.5 – 3.5 Hours',
      description: 'Our signature bespoke setup for milestone birthdays, romantic suites, and private dining rooms.',
      features: [
        'Multi-layered gold circular or geometric arch frames',
        'High-density organic balloon garlands with chrome metallics',
        'Faux botanical clusters & dried pampas foliage',
        'Personalized custom LED neon sign or acrylic easel board',
        'Set of 2–3 cylindrical fluted plinths & pedestals',
        'Overhead helium balloon cluster or rose petal carpet path',
        'Dedicated event coordinator on standby throughout celebration'
      ],
      popular: true
    },
    {
      name: 'Royale Imperial',
      badge: 'Bespoke Masterpiece',
      startingPrice: 9999,
      setupTime: '3.5 – 5.0 Hours',
      description: 'Grand luxury production for skyline proposals, ballroom galas, and VIP landmark milestones.',
      features: [
        'Monumental double cascading arch or gazebo structure',
        'Fresh premium floral arrangements (hydrangeas, roses, eucalyptus)',
        '4-foot giant warm-bulb illuminated 3D marquee letters or numbers',
        'Dramatic atmospheric special effects (cold spark jets or low-lying fog)',
        'Full room ambiance styling with 60+ glass hurricane candle lanterns',
        'Complimentary bottle service staging with chilled champagne & flutes',
        'Discreet photographer coverage (1 hr) or live acoustic soloist',
        'White-glove priority packdown & post-event venue restoration'
      ],
      popular: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#9E7749] font-semibold">
          Transparent Tiers
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#1A1715]">
          Packages & Investment Guide
        </h1>
        <p className="text-sm sm:text-base text-[#6E6356] leading-relaxed">
          We pride ourselves on transparent, all-inclusive pricing. No hidden travel fees, surprise fabrication costs, or last-minute setup charges.
        </p>
      </div>

      {/* Tiers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`p-8 border flex flex-col justify-between relative transition-all ${
              tier.popular 
                ? 'bg-white border-[#1A1715] shadow-xl ring-2 ring-[#1A1715]' 
                : 'bg-[#FAF8F5] border-[#DFD6C9] hover:border-[#9E7749]'
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#9E7749] text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1">
                {tier.badge}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#8C8074] uppercase tracking-wider block">
                  {tier.badge}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1A1715] mt-1">
                  {tier.name}
                </h3>
                <p className="text-xs text-[#6B6156] mt-2 leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#EAE2D8]">
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-[#8C8074]">Starting at</span>
                  <span className="text-4xl font-serif font-bold text-[#1A1715] tabular-nums">
                    {settings.currencySymbol}{tier.startingPrice}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#7A6F62] mt-1">
                  <Clock className="w-3.5 h-3.5 text-[#9E7749]" />
                  <span>Setup Time: {tier.setupTime}</span>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1715] block">
                  What’s Included:
                </span>
                <ul className="space-y-3 text-xs text-[#4A4237]">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#9E7749] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={() => setActiveView('book')}
                className={`w-full py-3.5 text-xs uppercase tracking-widest font-semibold transition-all ${
                  tier.popular 
                    ? 'bg-[#1A1715] text-white hover:bg-[#2F2923] shadow-md' 
                    : 'border border-[#1A1715] text-[#1A1715] hover:bg-[#1A1715] hover:text-white'
                }`}
              >
                Book This Package
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Quote Notice */}
      <div className="bg-[#1A1715] text-[#FAF8F5] p-8 sm:p-10 border border-[#3E3831] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="font-serif text-2xl font-bold text-[#F5EFEB]">Need a Custom Scope or Mega Installation?</h3>
          <p className="text-xs sm:text-sm text-[#C4B8AB] max-w-xl">
            We regularly service corporate galas, celebrity surprise parties, and luxury destination weddings requiring architectural trussing and custom stage construction.
          </p>
        </div>
        <button
          onClick={() => setActiveView('quote')}
          className="px-6 py-3 bg-[#FAF8F5] text-[#1A1715] text-xs uppercase tracking-widest font-semibold hover:bg-[#EAE2D8] whitespace-nowrap shrink-0"
        >
          Request Custom Proposal
        </button>
      </div>
    </div>
  );
};
