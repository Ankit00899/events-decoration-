import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Booking, BookingStatus } from '../types';
import { Clock, Calendar, MapPin, CheckCircle, AlertTriangle, XCircle, MessageSquare, ArrowRight, User } from 'lucide-react';

export const MyBookingsView: React.FC = () => {
  const { bookings, currentUser, loginAs, updateBookingStatus, settings, setActiveView, generateWhatsAppLink } = useApp();
  const [cancellingBookingId, setCancellingBookingId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  // Find bookings for the current customer (or show all customer bookings in demo mode)
  const customerEmail = currentUser?.email || 'sophia.m@example.com';
  const customerBookings = bookings.filter(b => 
    b.customerEmail.toLowerCase() === customerEmail.toLowerCase() ||
    b.customerId === currentUser?.id
  );

  // If no bookings match, fallback to showing all recent bookings in demo mode with a banner
  const displayBookings = customerBookings.length > 0 ? customerBookings : bookings;

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800">Confirmed & Scheduled</span>;
      case 'pending':
        return <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-amber-100 text-amber-800">Pending Artisan Review</span>;
      case 'in_progress':
        return <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-blue-100 text-blue-800">Crew On-Site / In Progress</span>;
      case 'completed':
        return <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-stone-200 text-stone-800">Completed & Celebrated</span>;
      case 'rejected':
        return <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-red-100 text-red-800">Unavailable / Rejected</span>;
      case 'cancelled':
        return <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-zinc-200 text-zinc-700">Booking Cancelled</span>;
      default:
        return null;
    }
  };

  const handleConfirmCancel = (id: string) => {
    if (!cancelReason.trim()) {
      alert('Please specify a brief cancellation reason.');
      return;
    }
    updateBookingStatus(id, 'cancelled', cancelReason);
    setCancellingBookingId(null);
    setCancelReason('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Account Header */}
      <div className="bg-[#FAF8F5] p-6 sm:p-8 border border-[#E0D6C8] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#9E7749]">
            <User className="w-3.5 h-3.5" />
            <span>Customer Account Portal</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1715] mt-1">
            My Event Bookings
          </h1>
          <p className="text-xs sm:text-sm text-[#665D52] mt-1">
            Logged in as <strong>{currentUser?.name || 'Guest Customer'}</strong> ({currentUser?.email || 'No email'})
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveView('book')}
            className="px-5 py-2.5 bg-[#1A1715] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#2F2923] transition-colors"
          >
            + Book Another Event
          </button>
          <button
            onClick={() => {
              loginAs('customer', {
                id: 'cust-101',
                name: 'Marcus Vance',
                email: 'marcus.vance@example.com',
                phone: '+1 (555) 392-8812'
              });
            }}
            className="px-3 py-2 border border-[#D5CABB] text-xs text-[#52493E] hover:bg-white"
            title="Switch demo customer"
          >
            Switch to Marcus
          </button>
          <button
            onClick={() => {
              loginAs('customer', {
                id: 'cust-103',
                name: 'Sophia Montgomery',
                email: 'sophia.m@example.com',
                phone: '+1 (555) 819-2041'
              });
            }}
            className="px-3 py-2 border border-[#D5CABB] text-xs text-[#52493E] hover:bg-white"
            title="Switch demo customer"
          >
            Switch to Sophia
          </button>
        </div>
      </div>

      {/* Bookings List */}
      {displayBookings.length === 0 ? (
        <div className="text-center py-20 bg-white border border-[#EAE2D8] p-8 space-y-4">
          <Calendar className="w-10 h-10 text-[#C5A880] mx-auto" />
          <h3 className="font-serif text-2xl text-[#1A1715]">No Active Bookings Found</h3>
          <p className="text-xs text-[#7A6E61] max-w-sm mx-auto">
            You do not have any registered event reservations yet. Explore our bespoke collections to begin your celebration.
          </p>
          <button
            onClick={() => setActiveView('services')}
            className="px-6 py-3 bg-[#1A1715] text-white text-xs uppercase tracking-wider font-semibold"
          >
            Browse Collections
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {displayBookings.map((booking) => {
            const isCancelling = cancellingBookingId === booking.id;

            return (
              <div
                key={booking.id}
                className="bg-white border border-[#DFD6C9] shadow-sm hover:border-[#9E7749] transition-all p-6 sm:p-8 space-y-6"
              >
                {/* Header bar of the booking card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFEAE2] pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-serif font-bold text-lg text-[#1A1715] tracking-wide tabular-nums">
                        Ref: {booking.id}
                      </span>
                      {getStatusBadge(booking.status)}
                    </div>
                    <p className="text-xs text-[#8C8074]">
                      Requested on {new Date(booking.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-2xl font-serif font-bold text-[#1A1715] tabular-nums">
                      {settings.currencySymbol}{booking.totalPrice}
                    </span>
                    <p className="text-[11px] text-[#7A6F62]">
                      Advance Paid: <strong className="text-emerald-700">{settings.currencySymbol}{booking.advancePaid}</strong> · Remaining: <strong className="text-[#1A1715]">{settings.currencySymbol}{booking.remainingBalance}</strong>
                    </p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#4A4237]">
                  <div className="space-y-1.5">
                    <span className="text-[#9E7749] uppercase tracking-wider text-[10px] font-semibold">Service Details</span>
                    <h4 className="font-serif font-bold text-base text-[#1A1715]">{booking.serviceTitle}</h4>
                    <p>Package: <strong>{booking.packageName}</strong></p>
                    {booking.selectedAddOns.length > 0 && (
                      <p className="text-[#6B6156]">
                        Add-ons: {booking.selectedAddOns.map(a => a.name).join(', ')}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[#9E7749] uppercase tracking-wider text-[10px] font-semibold">Event Timing</span>
                    <p className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1715]">
                      <Calendar className="w-4 h-4 text-[#9E7749]" />
                      <span>{booking.eventDate}</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-[#6B6156]">
                      <Clock className="w-4 h-4 text-[#9E7749]" />
                      <span>{booking.eventTimeSlot}</span>
                    </p>
                    <p className="text-[11px]">Theme: <strong>{booking.themeColor}</strong></p>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[#9E7749] uppercase tracking-wider text-[10px] font-semibold">Venue Location</span>
                    <p className="flex items-start gap-1.5">
                      <MapPin className="w-4 h-4 text-[#9E7749] shrink-0 mt-0.5" />
                      <span>{booking.venueAddress}, {booking.locality}, {booking.city}</span>
                    </p>
                    {booking.specialInstructions && (
                      <p className="text-[11px] text-[#706456] italic pt-1">
                        "{booking.specialInstructions}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Internal notes or cancellation notices */}
                {booking.status === 'cancelled' && booking.cancellationReason && (
                  <div className="p-3 bg-zinc-100 border border-zinc-300 text-xs text-zinc-700">
                    <strong>Recorded Cancellation Reason:</strong> {booking.cancellationReason}
                  </div>
                )}

                {booking.status === 'rejected' && booking.rejectionReason && (
                  <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700">
                    <strong>Notice from Decorator:</strong> {booking.rejectionReason}
                  </div>
                )}

                {/* Cancellation prompt form */}
                {isCancelling && (
                  <div className="p-4 bg-[#FAF8F5] border border-amber-300 space-y-3">
                    <h5 className="font-serif font-bold text-sm text-[#1A1715]">
                      Confirm Booking Cancellation Request
                    </h5>
                    <p className="text-xs text-[#6B6156]">
                      Per our policy, advance deposits for cancellations made 7+ days prior are fully refunded minus materials preparation. Please state your reason below:
                    </p>
                    <input
                      type="text"
                      placeholder="Reason for cancellation (e.g., date rescheduled, venue change)..."
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      className="w-full p-2 bg-white border border-[#D5CABB] text-xs text-[#1A1715]"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleConfirmCancel(booking.id)}
                        className="px-4 py-2 bg-red-700 text-white text-xs font-semibold uppercase tracking-wider"
                      >
                        Confirm Cancellation
                      </button>
                      <button
                        onClick={() => setCancellingBookingId(null)}
                        className="px-4 py-2 border border-[#D5CABB] text-xs text-[#52493E]"
                      >
                        Keep Booking
                      </button>
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="pt-4 border-t border-[#F2ECE3] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const url = generateWhatsAppLink({
                          bookingId: booking.id,
                          serviceTitle: booking.serviceTitle,
                          date: booking.eventDate
                        });
                        window.open(url, '_blank');
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-[#25D366] text-white hover:bg-[#20ba59] transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      <span>WhatsApp Coordinator</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {booking.status !== 'cancelled' && booking.status !== 'completed' && !isCancelling && (
                      <button
                        onClick={() => setCancellingBookingId(booking.id)}
                        className="text-xs text-red-600 hover:text-red-800 underline transition-colors"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
