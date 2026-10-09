import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, MessageSquare, Printer, ArrowRight, Clock, MapPin, Calendar, AlertCircle } from 'lucide-react';

export const BookingConfirmationView: React.FC = () => {
  const { bookings, latestBookingId, settings, setActiveView, generateWhatsAppLink } = useApp();

  const booking = bookings.find(b => b.id === latestBookingId) || bookings[0];

  if (!booking) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="font-serif text-2xl">No active booking found.</p>
        <button
          onClick={() => setActiveView('services')}
          className="mt-4 px-6 py-2 bg-[#1A1715] text-white text-xs uppercase"
        >
          Browse Services
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsApp = () => {
    const url = generateWhatsAppLink({
      bookingId: booking.id,
      serviceTitle: booking.serviceTitle,
      packageTitle: booking.packageName,
      date: booking.eventDate,
      city: booking.city,
      budget: booking.totalPrice
    });
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Success banner */}
      <div className="bg-[#FAF8F5] border border-[#D5CABB] p-8 text-center space-y-3">
        <div className="w-12 h-12 bg-[#1A1715] text-[#F5EFEB] flex items-center justify-center mx-auto rounded-none">
          <CheckCircle2 className="w-6 h-6 text-[#C5A880]" />
        </div>
        <span className="text-xs uppercase tracking-widest text-[#9E7749] font-semibold block">
          Booking Request Received
        </span>
        <h1 className="text-3xl font-serif font-bold text-[#1A1715]">
          Thank You, {booking.customerName}
        </h1>
        <p className="text-xs sm:text-sm text-[#665D52] max-w-lg mx-auto leading-relaxed">
          Your reservation request has been registered in our schedule. Our business lead is currently reviewing artisan availability and venue logistics.
        </p>

        <div className="inline-block bg-[#1A1715] text-[#FAF8F5] px-6 py-2.5 mt-2">
          <span className="text-[11px] text-[#C5A880] uppercase tracking-wider block">Booking Reference Number</span>
          <span className="text-xl font-serif font-bold tracking-widest tabular-nums">{booking.id}</span>
        </div>
      </div>

      {/* Official Voucher / Summary Card */}
      <div className="bg-white border border-[#DFD6C9] p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[#EAE2D8] pb-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1A1715]">{settings.businessName}</h2>
            <p className="text-[11px] text-[#8C8074]">Official Reservation Voucher</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 bg-amber-100 text-amber-900">
              Status: {booking.status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Key Event Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-[#8C8074] uppercase tracking-wider text-[10px]">Service Curation</span>
            <p className="font-bold text-sm text-[#1A1715]">{booking.serviceTitle}</p>
            <p className="text-[#6B6156]">Package Tier: {booking.packageName}</p>
          </div>

          <div className="space-y-1">
            <span className="text-[#8C8074] uppercase tracking-wider text-[10px]">Event Date & Time</span>
            <p className="font-bold text-sm text-[#1A1715]">{booking.eventDate}</p>
            <p className="text-[#6B6156]">{booking.eventTimeSlot}</p>
          </div>

          <div className="space-y-1 sm:col-span-2 pt-2 border-t border-[#F2ECE3]">
            <span className="text-[#8C8074] uppercase tracking-wider text-[10px]">Venue Address</span>
            <p className="font-medium text-[#1A1715]">{booking.venueAddress}, {booking.locality}, {booking.city}</p>
            {booking.landmark && (
              <p className="text-[#8C8074] text-[11px]">Access notes: {booking.landmark}</p>
            )}
          </div>

          <div className="space-y-1 pt-2 border-t border-[#F2ECE3]">
            <span className="text-[#8C8074] uppercase tracking-wider text-[10px]">Theme Palette</span>
            <p className="font-medium text-[#1A1715]">{booking.themeColor}</p>
          </div>

          <div className="space-y-1 pt-2 border-t border-[#F2ECE3]">
            <span className="text-[#8C8074] uppercase tracking-wider text-[10px]">Contact Person</span>
            <p className="font-medium text-[#1A1715]">{booking.customerName} ({booking.customerPhone})</p>
          </div>
        </div>

        {/* Inclusions & Addons breakdown */}
        <div className="border-t border-[#EAE2D8] pt-4 space-y-2 text-xs">
          <span className="text-[#8C8074] uppercase tracking-wider text-[10px]">Financial Breakdown</span>
          <div className="flex justify-between text-[#5C5348]">
            <span>{booking.packageName} Package base:</span>
            <span className="tabular-nums">{settings.currencySymbol}{booking.packagePrice}</span>
          </div>

          {booking.selectedAddOns.map(a => (
            <div key={a.id} className="flex justify-between text-[#5C5348]">
              <span>+ Add-on: {a.name}</span>
              <span className="tabular-nums">+{settings.currencySymbol}{a.price}</span>
            </div>
          ))}

          <div className="pt-2 border-t border-[#F2ECE3] flex justify-between font-bold text-sm text-[#1A1715]">
            <span>Agreed Total:</span>
            <span className="tabular-nums font-serif text-lg">{settings.currencySymbol}{booking.totalPrice}</span>
          </div>

          <div className="flex justify-between text-xs text-[#8C8074]">
            <span>Advance Deposit Required ({settings.depositPercentage}%):</span>
            <span className="tabular-nums font-medium text-[#9E7749]">
              {settings.currencySymbol}{Math.round(booking.totalPrice * (settings.depositPercentage / 100))} (Due upon approval)
            </span>
          </div>
        </div>

        {/* Next step notice */}
        <div className="p-4 bg-[#FAF8F5] border border-[#E5DDD2] text-xs text-[#61574D] flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-[#9E7749] shrink-0 mt-0.5" />
          <p>
            A representative will call or WhatsApp message you within 4 hours to verify ceiling height, entrance gate access, and custom name signs. You can also monitor real-time updates in your customer account.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
        <button
          onClick={handleWhatsApp}
          className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span>Message Concierge on WhatsApp</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-initial px-5 py-3 border border-[#D5CABB] text-[#1A1715] hover:bg-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
          <button
            onClick={() => setActiveView('my-bookings')}
            className="flex-1 sm:flex-initial px-6 py-3 bg-[#1A1715] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#2F2923] flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>View My Bookings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
