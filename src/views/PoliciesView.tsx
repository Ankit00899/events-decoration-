import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const PoliciesView: React.FC<{ initialTab?: 'cancellation' | 'terms' | 'privacy' }> = ({ initialTab = 'cancellation' }) => {
  const { settings } = useApp();
  const [activeTab, setActiveTab] = useState<'cancellation' | 'terms' | 'privacy'>(initialTab);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-widest text-[#9E7749] font-semibold">
          Legal & Service Guidelines
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1715]">
          Customer Policies & Terms
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E0D7CC] gap-4">
        <button
          onClick={() => setActiveTab('cancellation')}
          className={`pb-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all ${
            activeTab === 'cancellation' ? 'border-[#1A1715] text-[#1A1715]' : 'border-transparent text-[#7A6E61] hover:text-[#1A1715]'
          }`}
        >
          Cancellation & Refund
        </button>
        <button
          onClick={() => setActiveTab('terms')}
          className={`pb-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all ${
            activeTab === 'terms' ? 'border-[#1A1715] text-[#1A1715]' : 'border-transparent text-[#7A6E61] hover:text-[#1A1715]'
          }`}
        >
          Terms and Conditions
        </button>
        <button
          onClick={() => setActiveTab('privacy')}
          className={`pb-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all ${
            activeTab === 'privacy' ? 'border-[#1A1715] text-[#1A1715]' : 'border-transparent text-[#7A6E61] hover:text-[#1A1715]'
          }`}
        >
          Privacy Policy
        </button>
      </div>

      {/* Content */}
      <div className="bg-white p-8 sm:p-10 border border-[#DFD6C9] text-xs sm:text-sm text-[#4F463C] leading-relaxed space-y-6">
        {activeTab === 'cancellation' && (
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#1A1715]">
              Cancellation & Refund Policy
            </h2>
            <p>
              {settings.cancellationPolicy}
            </p>
            <h3 className="font-serif text-lg font-bold text-[#1A1715] pt-2">Rescheduling Guidelines</h3>
            <p>
              Events may be rescheduled to another available date within 90 days with at least 72 hours prior notice at no additional penalty. Date changes subject to crew calendar availability.
            </p>
            <h3 className="font-serif text-lg font-bold text-[#1A1715] pt-2">Weather & Outdoor Venues</h3>
            <p>
              For outdoor terrace, lawn, or beach setups, client is responsible for providing a covered or indoor backup space in the event of severe wind or rain. Custom florals and illuminated marquee letters cannot be exposed to active rainfall.
            </p>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#1A1715]">
              Terms & Conditions of Service
            </h2>
            <p>
              By submitting a booking request with {settings.businessName}, you agree to the following operational terms:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Venue Access:</strong> The client is responsible for securing necessary venue permissions, parking permits, and elevator/gate access for our crew.
              </li>
              <li>
                <strong>Setup Time:</strong> Client agrees to grant uninterrupted access during the agreed setup window prior to event guest arrival.
              </li>
              <li>
                <strong>Rental Props:</strong> Backdrops, neon signs, fluted plinths, and marquee letters remain the property of {settings.businessName} and will be collected at teardown.
              </li>
              <li>
                <strong>Payment Terms:</strong> {settings.paymentPolicy}
              </li>
            </ul>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#1A1715]">
              Privacy & Discretion Policy
            </h2>
            <p>
              {settings.businessName} takes client confidentiality with the highest priority, especially for high-profile surprise proposals, anniversary suites, and VIP residence celebrations.
            </p>
            <p>
              We do not share your contact details, venue address, or private photos with third-party advertising platforms. Event photos are only featured in our portfolio gallery with explicit customer permission.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
