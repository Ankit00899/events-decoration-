import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Check, AlertCircle, Clock, MapPin, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export const BookServiceView: React.FC = () => {
  const { 
    services, 
    settings, 
    currentUser, 
    selectedServiceId, 
    checkBookingConflict, 
    createBooking, 
    setActiveView 
  } = useApp();

  const initialService = services.find(s => s.id === selectedServiceId) || services[0];
  const [serviceId, setServiceId] = useState(initialService?.id || '');
  const activeService = services.find(s => s.id === serviceId) || initialService;

  const [packageId, setPackageId] = useState(
    activeService?.packages.find(p => p.isPopular)?.id || activeService?.packages[0]?.id || ''
  );
  const activePackage = activeService?.packages.find(p => p.id === packageId) || activeService?.packages[0];

  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [eventDate, setEventDate] = useState(() => {
    // Default to 5 days from today
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toISOString().split('T')[0];
  });
  const [eventTimeSlot, setEventTimeSlot] = useState('Evening (18:00 - 22:00)');
  const [city, setCity] = useState(activeService?.citiesAvailable[0] || settings.serviceCities[0] || 'New Delhi');
  const [venueAddress, setVenueAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [landmark, setLandmark] = useState('');
  const [themeColor, setThemeColor] = useState(activeService?.popularThemeColors[0] || 'Champagne & Gold');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Customer contact details
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');

  // Conflict state
  const [conflictAlert, setConflictAlert] = useState<{ hasConflict: boolean; message: string }>({ hasConflict: false, message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // When service changes, update packages & theme colors
  useEffect(() => {
    if (activeService) {
      if (!activeService.packages.some(p => p.id === packageId)) {
        setPackageId(activeService.packages[0]?.id || '');
      }
      setSelectedAddOnIds([]);
      if (!activeService.popularThemeColors.includes(themeColor)) {
        setThemeColor(activeService.popularThemeColors[0] || 'Custom Palette');
      }
      if (!activeService.citiesAvailable.includes(city) && activeService.citiesAvailable.length > 0) {
        setCity(activeService.citiesAvailable[0]);
      }
    }
  }, [serviceId]);

  // Check availability when date, time, or city changes
  useEffect(() => {
    if (eventDate && eventTimeSlot && city) {
      const res = checkBookingConflict(eventDate, eventTimeSlot, city);
      setConflictAlert(res);
    }
  }, [eventDate, eventTimeSlot, city]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const selectedAddOnsObjects = (activeService?.availableAddOns || [])
    .filter(a => selectedAddOnIds.includes(a.id))
    .map(a => ({ id: a.id, name: a.name, price: a.price }));

  const addOnsTotal = selectedAddOnsObjects.reduce((acc, curr) => acc + curr.price, 0);
  const totalPrice = (activePackage?.price || 0) + addOnsTotal;
  const advanceRequired = Math.round(totalPrice * (settings.depositPercentage / 100));
  const remainingBalance = totalPrice - advanceRequired;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim() || !customerPhone.trim() || !customerEmail.trim()) {
      setErrorMsg('Please enter customer full name, contact phone, and email.');
      return;
    }
    if (!venueAddress.trim() || !locality.trim()) {
      setErrorMsg('Please specify the complete venue address and locality/neighborhood.');
      return;
    }
    if (!eventDate) {
      setErrorMsg('Please select an event date.');
      return;
    }

    setSubmitting(true);

    try {
      const newBooking = createBooking({
        serviceId: activeService.id,
        serviceTitle: activeService.title,
        packageId: activePackage.id,
        packageName: activePackage.name,
        packagePrice: activePackage.price,
        selectedAddOns: selectedAddOnsObjects,
        totalPrice,
        advancePaid: 0, // Unconfirmed until verified by owner
        remainingBalance: totalPrice,
        eventDate,
        eventTimeSlot,
        venueAddress,
        city,
        locality,
        landmark,
        themeColor,
        specialInstructions,
        customerName,
        customerPhone,
        customerEmail,
        customerId: currentUser?.id || `cust-${Date.now()}`
      });

      // Navigate to confirmation page
      setActiveView('booking-confirmed', { bookingId: newBooking.id });
    } catch (err: any) {
      setErrorMsg('An error occurred creating the booking request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const timeSlots = [
    'Morning (09:00 - 13:00)',
    'Afternoon (14:00 - 18:00)',
    'Evening (18:00 - 22:00)',
    'Late Night Surprise (22:00 - 01:00)'
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-widest text-[#9E7749] font-semibold">
          Reservation Request
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1715]">
          Book an Event Decoration Installation
        </h1>
        <p className="text-xs sm:text-sm text-[#695F54] leading-relaxed">
          Configure your service, select package options, and submit your date request. Our lead artisan reviews availability before confirming.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* Step 1: Service & Package Selection */}
        <div className="bg-white p-6 sm:p-8 border border-[#DFD6C9] shadow-sm space-y-6">
          <div className="border-b border-[#EAE2D8] pb-3">
            <span className="text-xs font-semibold text-[#9E7749] uppercase tracking-wider">Step 1</span>
            <h2 className="font-serif text-xl font-bold text-[#1A1715]">Select Decoration Service & Package</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D352B] mb-1.5">
                Event Decoration Service
              </label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D5CABA] p-3 text-xs text-[#1A1715] font-medium focus:outline-none focus:border-[#1A1715]"
              >
                {services.map(s => (
                  <option key={s.id} value={s.id}>{s.title} ({s.category})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D352B] mb-1.5">
                Package Tier
              </label>
              <select
                value={packageId}
                onChange={(e) => setPackageId(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D5CABA] p-3 text-xs text-[#1A1715] font-medium focus:outline-none focus:border-[#1A1715]"
              >
                {activeService?.packages.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {settings.currencySymbol}{p.price} ({p.setupHours} hrs setup)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Package Inclusions Preview */}
          {activePackage && (
            <div className="p-4 bg-[#F7F3EE] border border-[#E5DCD0] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-serif font-bold text-sm text-[#1A1715]">{activePackage.name} Package Features:</span>
                <span className="font-serif font-bold text-base text-[#1A1715] tabular-nums">
                  {settings.currencySymbol}{activePackage.price}
                </span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#52493E]">
                {activePackage.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#9E7749] shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Optional Add-Ons */}
          {activeService?.availableAddOns && activeService.availableAddOns.length > 0 && (
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D352B]">
                Optional Add-Ons for this Service
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeService.availableAddOns.map(addon => {
                  const isChecked = selectedAddOnIds.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`p-3 border flex items-center justify-between cursor-pointer transition-colors ${
                        isChecked ? 'border-[#1A1715] bg-[#F4EFE7]' : 'border-[#E2D8CC] bg-white hover:border-[#9E7749]'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAddOn(addon.id)}
                          className="mt-0.5 accent-[#1A1715]"
                        />
                        <div>
                          <p className="text-xs font-bold text-[#1A1715]">{addon.name}</p>
                          <p className="text-[11px] text-[#706456]">{addon.description}</p>
                        </div>
                      </div>
                      <span className="text-xs font-serif font-bold text-[#1A1715] tabular-nums shrink-0 ml-2">
                        +{settings.currencySymbol}{addon.price}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Date, Slot & Venue Logistics with Conflict Checking */}
        <div className="bg-white p-6 sm:p-8 border border-[#DFD6C9] shadow-sm space-y-6">
          <div className="border-b border-[#EAE2D8] pb-3">
            <span className="text-xs font-semibold text-[#9E7749] uppercase tracking-wider">Step 2</span>
            <h2 className="font-serif text-xl font-bold text-[#1A1715]">Date, Time Slot & Venue Details</h2>
          </div>

          {/* Conflict Alert Banner */}
          {conflictAlert.hasConflict && (
            <div className="p-4 bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>High Demand Notice:</strong> {conflictAlert.message}
                <p className="mt-1 text-[11px] text-amber-800">
                  You may still submit your request. Our owner will review custom crew allocation to accommodate you.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D352B] mb-1.5">
                Event Date *
              </label>
              <input
                type="date"
                required
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D5CABA] p-3 text-xs text-[#1A1715] focus:outline-none focus:border-[#1A1715]"
              />
              <span className="text-[11px] text-[#8C8074] mt-1 block">
                Min {activeService?.minimumNoticeDays || 2} days advance required
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D352B] mb-1.5">
                Setup & Event Window *
              </label>
              <select
                value={eventTimeSlot}
                onChange={(e) => setEventTimeSlot(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D5CABA] p-3 text-xs text-[#1A1715] focus:outline-none focus:border-[#1A1715]"
              >
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D352B] mb-1.5">
                City / Metropolitan Area *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D5CABA] p-3 text-xs text-[#1A1715] focus:outline-none focus:border-[#1A1715]"
              >
                {(activeService?.citiesAvailable.length ? activeService.citiesAvailable : settings.serviceCities).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D352B] mb-1.5">
                Exact Venue Address (Apartment, Hotel Room, or Hall) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Flat 402, Block C, Shadipur or Sector 14, Dwarka"
                value={venueAddress}
                onChange={(e) => setVenueAddress(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D5CABA] p-3 text-xs text-[#1A1715] focus:outline-none focus:border-[#1A1715]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D352B] mb-1.5">
                Locality / District *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Shadipur, Patel Nagar, Connaught Place, Dwarka"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D5CABA] p-3 text-xs text-[#1A1715] focus:outline-none focus:border-[#1A1715]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D352B] mb-1.5">
              Landmark or Access Instructions (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., Near Shadipur Metro Pillar 218 or Main Market"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#D5CABA] p-3 text-xs text-[#1A1715] focus:outline-none focus:border-[#1A1715]"
            />
          </div>
        </div>

        {/* Step 3: Customization & Customer Info */}
        <div className="bg-white p-6 sm:p-8 border border-[#DFD6C9] shadow-sm space-y-6">
          <div className="border-b border-[#EAE2D8] pb-3">
            <span className="text-xs font-semibold text-[#9E7749] uppercase tracking-wider">Step 3</span>
            <h2 className="font-serif text-xl font-bold text-[#1A1715]">Theme Customization & Contact</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D352B] mb-1.5">
                Preferred Color Palette *
              </label>
              <input
                type="text"
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
                placeholder="e.g. Champagne & Blush Gold"
                className="w-full bg-[#FAF8F5] border border-[#D5CABA] p-3 text-xs text-[#1A1715] focus:outline-none focus:border-[#1A1715]"
              />
              <span className="text-[11px] text-[#8C8074] mt-1 block">
                Popular: {activeService?.popularThemeColors.join(', ')}
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D352B] mb-1.5">
                Contact Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Aman Sharma"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D5CABA] p-3 text-xs text-[#1A1715] focus:outline-none focus:border-[#1A1715]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D352B] mb-1.5">
                Phone Number (WhatsApp Preferred) *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 96502 46245"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D5CABA] p-3 text-xs text-[#1A1715] focus:outline-none focus:border-[#1A1715]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D352B] mb-1.5">
                Email Address for Confirmation *
              </label>
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D5CABA] p-3 text-xs text-[#1A1715] focus:outline-none focus:border-[#1A1715]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D352B] mb-1.5">
                Special Surprise Instructions & Names for Signs
              </label>
              <input
                type="text"
                placeholder="e.g. Neon text: 'Sophia 30', surprise arrival at 19:30 sharp"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D5CABA] p-3 text-xs text-[#1A1715] focus:outline-none focus:border-[#1A1715]"
              />
            </div>
          </div>
        </div>

        {/* Pricing Summary & Submission */}
        <div className="bg-[#FAF8F5] p-6 sm:p-8 border-2 border-[#1A1715] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E0D7CC] pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#9E7749] font-semibold">Financial Summary</span>
              <h3 className="font-serif text-2xl font-bold text-[#1A1715]">Transparent Price Calculation</h3>
            </div>
            <div className="text-right">
              <span className="text-3xl font-serif font-bold text-[#1A1715] tabular-nums">
                {settings.currencySymbol}{totalPrice}
              </span>
              <p className="text-xs text-[#7A6F62]">All materials, crew travel & teardown included</p>
            </div>
          </div>

          {/* Line Items */}
          <div className="space-y-2 text-xs text-[#4F463C]">
            <div className="flex justify-between">
              <span>{activeService?.title} ({activePackage?.name})</span>
              <span className="font-medium tabular-nums">{settings.currencySymbol}{activePackage?.price}</span>
            </div>
            {selectedAddOnsObjects.map(a => (
              <div key={a.id} className="flex justify-between text-[#6B6156]">
                <span>+ Add-on: {a.name}</span>
                <span className="tabular-nums">+{settings.currencySymbol}{a.price}</span>
              </div>
            ))}
            <div className="pt-3 border-t border-[#EAE2D8] flex justify-between font-semibold text-[#1A1715]">
              <span>Advance Deposit ({settings.depositPercentage}% to confirm after approval):</span>
              <span className="tabular-nums text-[#9E7749]">{settings.currencySymbol}{advanceRequired}</span>
            </div>
            <div className="flex justify-between text-[#7A6F62]">
              <span>Remaining Balance (Due after on-site inspection):</span>
              <span className="tabular-nums">{settings.currencySymbol}{remainingBalance}</span>
            </div>
          </div>

          {/* Submission Notice */}
          <div className="p-3 bg-[#F0EAE1] text-xs text-[#524A40] space-y-1">
            <p className="font-semibold">Important Booking Policy:</p>
            <p>
              Your booking will be recorded with status <strong className="text-[#1A1715]">Pending</strong>. Our business owner will review the date schedule, venue clearance, and material availability before officially confirming. No advance payment is charged until confirmed.
            </p>
          </div>

          {errorMsg && (
            <p className="text-xs font-semibold text-red-600 bg-red-50 p-2.5 border border-red-200">
              {errorMsg}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-[#706456]">
              By submitting, you agree to our <button type="button" onClick={() => setActiveView('cancellation')} className="underline">Cancellation & Refund Policy</button>.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-10 py-4 text-xs uppercase tracking-widest font-semibold bg-[#1A1715] text-white hover:bg-[#2F2923] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
            >
              <span>{submitting ? 'Creating Request...' : 'Submit Booking Request'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </form>
    </div>
  );
};
