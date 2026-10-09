import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  DollarSign, 
  Users, 
  Sparkles, 
  ArrowUpRight, 
  Check, 
  X,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const { 
    bookings, 
    services, 
    enquiries, 
    customers, 
    settings, 
    setActiveView, 
    updateBookingStatus 
  } = useApp();

  // Metrics
  const totalBookings = bookings.length;
  const pendingRequests = bookings.filter(b => b.status === 'pending');
  const confirmedEvents = bookings.filter(b => b.status === 'confirmed');
  const inProgressEvents = bookings.filter(b => b.status === 'in_progress');
  const completedEvents = bookings.filter(b => b.status === 'completed');
  const cancelledEvents = bookings.filter(b => b.status === 'cancelled');

  // Total recorded revenue: Advance paid + completed totals
  const totalRevenue = bookings.reduce((sum, b) => sum + b.advancePaid, 0);
  const pendingBalanceToCollect = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'in_progress')
    .reduce((sum, b) => sum + b.remainingBalance, 0);

  // Upcoming in next 14 days
  const todayStr = new Date().toISOString().split('T')[0];
  const upcomingEvents = bookings
    .filter(b => (b.status === 'confirmed' || b.status === 'pending') && b.eventDate >= todayStr)
    .sort((a, b) => a.eventDate.localeCompare(b.eventDate))
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Welcome Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E0D7CC] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#9E7749]">
            <ShieldCheck className="w-4 h-4" />
            <span>Master Control & Logistics</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1715] mt-1">
            Owner Business Dashboard
          </h1>
          <p className="text-xs text-[#7A6F62] mt-0.5">
            Real-time management for {settings.businessName} events, revenues, crew schedules, and enquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('admin-bookings')}
            className="px-4 py-2.5 bg-[#1A1715] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#2F2923] transition-colors"
          >
            Manage All Bookings ({totalBookings})
          </button>
          <button
            onClick={() => setActiveView('admin-services')}
            className="px-4 py-2.5 border border-[#1A1715] text-[#1A1715] text-xs uppercase tracking-wider font-semibold hover:bg-[#1A1715] hover:text-white transition-colors"
          >
            + Add New Service
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 border border-[#DFD6C9] space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-[#8C8074] font-semibold block">New Requests</span>
          <div className="text-3xl font-serif font-bold text-[#9E7749] tabular-nums">
            {pendingRequests.length}
          </div>
          <span className="text-[11px] text-[#7A6F62]">Requires owner review</span>
        </div>

        <div className="bg-white p-5 border border-[#DFD6C9] space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-[#8C8074] font-semibold block">Confirmed Events</span>
          <div className="text-3xl font-serif font-bold text-[#1A1715] tabular-nums">
            {confirmedEvents.length + inProgressEvents.length}
          </div>
          <span className="text-[11px] text-[#7A6F62]">Ready on calendar</span>
        </div>

        <div className="bg-white p-5 border border-[#DFD6C9] space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-[#8C8074] font-semibold block">Total Revenue Recorded</span>
          <div className="text-3xl font-serif font-bold text-emerald-800 tabular-nums">
            {settings.currencySymbol}{totalRevenue.toLocaleString()}
          </div>
          <span className="text-[11px] text-[#7A6F62]">Collected advances</span>
        </div>

        <div className="bg-white p-5 border border-[#DFD6C9] space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-[#8C8074] font-semibold block">Pending Balance</span>
          <div className="text-3xl font-serif font-bold text-amber-800 tabular-nums">
            {settings.currencySymbol}{pendingBalanceToCollect.toLocaleString()}
          </div>
          <span className="text-[11px] text-[#7A6F62]">Due on setup completion</span>
        </div>
      </div>

      {/* Secondary Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-[#FAF8F5] p-4 border border-[#E5DDD2] flex items-center justify-between">
          <span className="text-[#6B6156]">Completed Events</span>
          <strong className="text-base font-serif font-bold text-[#1A1715] tabular-nums">{completedEvents.length}</strong>
        </div>
        <div className="bg-[#FAF8F5] p-4 border border-[#E5DDD2] flex items-center justify-between">
          <span className="text-[#6B6156]">Cancelled / Refunded</span>
          <strong className="text-base font-serif font-bold text-[#1A1715] tabular-nums">{cancelledEvents.length}</strong>
        </div>
        <div className="bg-[#FAF8F5] p-4 border border-[#E5DDD2] flex items-center justify-between">
          <span className="text-[#6B6156]">Active Services</span>
          <strong className="text-base font-serif font-bold text-[#1A1715] tabular-nums">{services.filter(s => s.isActive).length}</strong>
        </div>
        <div className="bg-[#FAF8F5] p-4 border border-[#E5DDD2] flex items-center justify-between">
          <span className="text-[#6B6156]">Registered Clients</span>
          <strong className="text-base font-serif font-bold text-[#1A1715] tabular-nums">{customers.length}</strong>
        </div>
      </div>

      {/* Main Grid: Pending Booking Requests & Upcoming Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Pending Requests Requiring Approval */}
        <div className="lg:col-span-7 bg-white p-6 border border-[#DFD6C9] shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#EAE2D8] pb-3">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#1A1715]">
                Pending Customer Requests ({pendingRequests.length})
              </h3>
              <p className="text-xs text-[#7A6F62]">Review date availability and confirm with customer</p>
            </div>
            <button
              onClick={() => setActiveView('admin-bookings')}
              className="text-xs text-[#9E7749] hover:underline font-semibold"
            >
              View All →
            </button>
          </div>

          {pendingRequests.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#8C8074]">
              No pending booking requests. All events have been processed!
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map(b => (
                <div key={b.id} className="p-4 bg-[#FAF8F5] border border-[#E5DCD0] space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-[#1A1715]">{b.serviceTitle}</span>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-amber-100 text-amber-900">
                          {b.id}
                        </span>
                      </div>
                      <p className="text-xs text-[#6B6156] mt-0.5">
                        Client: <strong>{b.customerName}</strong> ({b.customerPhone}) · {b.city}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-serif font-bold text-[#1A1715] tabular-nums">
                        {settings.currencySymbol}{b.totalPrice}
                      </span>
                      <p className="text-[10px] text-[#8C8074]">{b.packageName}</p>
                    </div>
                  </div>

                  <div className="text-xs text-[#52493E] bg-white p-2.5 border border-[#EAE2D8]">
                    <p>Date: <strong>{b.eventDate}</strong> · Slot: <strong>{b.eventTimeSlot}</strong></p>
                    <p className="text-[#7A6F62] truncate">Venue: {b.venueAddress}, {b.locality}</p>
                    {b.specialInstructions && (
                      <p className="text-[11px] text-[#9E7749] italic mt-1">Note: "{b.specialInstructions}"</p>
                    )}
                  </div>

                  {/* Quick Action buttons */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => setActiveView('admin-bookings')}
                      className="text-xs text-[#9E7749] underline"
                    >
                      Inspect & Edit Details
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const reason = prompt('Enter rejection reason for customer notification:', 'Artisan team already fully committed on this date');
                          if (reason !== null) {
                            updateBookingStatus(b.id, 'rejected', reason);
                          }
                        }}
                        className="px-3 py-1.5 border border-red-300 text-red-700 hover:bg-red-50 text-xs font-semibold uppercase"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => updateBookingStatus(b.id, 'confirmed')}
                        className="px-4 py-1.5 bg-[#1A1715] text-white hover:bg-[#2F2923] text-xs font-semibold uppercase tracking-wider"
                      >
                        Accept & Confirm
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Events Calendar List */}
        <div className="lg:col-span-5 bg-white p-6 border border-[#DFD6C9] shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#EAE2D8] pb-3">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#1A1715]">
                Upcoming Scheduled Events
              </h3>
              <p className="text-xs text-[#7A6F62]">Nearest installations on the calendar</p>
            </div>
          </div>

          <div className="space-y-3">
            {upcomingEvents.length === 0 ? (
              <p className="text-xs text-[#8C8074] py-8 text-center">No upcoming events scheduled.</p>
            ) : (
              upcomingEvents.map(event => (
                <div key={event.id} className="p-3 border border-[#EAE2D8] flex items-center justify-between hover:bg-[#FAF8F5] transition-colors">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold text-[#9E7749] uppercase tracking-wider block">
                      {event.eventDate} · {event.eventTimeSlot.split(' ')[0]}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-[#1A1715]">
                      {event.serviceTitle}
                    </h4>
                    <p className="text-[11px] text-[#7A6F62]">
                      {event.customerName} · {event.city}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 bg-emerald-100 text-emerald-800">
                      {event.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick Enquiries Card */}
          <div className="pt-4 border-t border-[#EAE2D8] space-y-3">
            <h4 className="font-serif font-bold text-base text-[#1A1715]">Recent Custom Enquiries ({enquiries.length})</h4>
            <div className="space-y-2">
              {enquiries.slice(0, 3).map(enq => (
                <div key={enq.id} className="p-2.5 bg-[#FAF8F5] border border-[#EFEAE2] text-xs">
                  <div className="flex justify-between font-semibold text-[#1A1715]">
                    <span>{enq.name} ({enq.phone})</span>
                    <span>{settings.currencySymbol}{enq.estimatedBudget}</span>
                  </div>
                  <p className="text-[#6B6156] text-[11px] truncate mt-0.5">{enq.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
