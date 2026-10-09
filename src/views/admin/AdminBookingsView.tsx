import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking, BookingStatus } from '../../types';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  MessageSquare, 
  Printer, 
  Edit3, 
  Save, 
  X,
  FileText
} from 'lucide-react';

export const AdminBookingsView: React.FC = () => {
  const { 
    bookings, 
    settings, 
    updateBookingStatus, 
    updateBookingDetails, 
    recordPayment, 
    checkBookingConflict, 
    generateWhatsAppLink 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Edit modal state
  const [isEditing, setIsEditing] = useState(false);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editAdvance, setEditAdvance] = useState<number>(0);
  const [editStatus, setEditStatus] = useState<BookingStatus>('pending');
  const [editInternalNotes, setEditInternalNotes] = useState<string>('');
  const [cancelReason, setCancelReason] = useState<string>('');

  const filteredBookings = bookings.filter(b => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesSearch = 
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerPhone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const openBookingModal = (b: Booking) => {
    setSelectedBooking(b);
    setEditPrice(b.totalPrice);
    setEditAdvance(b.advancePaid);
    setEditStatus(b.status);
    setEditInternalNotes(b.internalNotes || '');
    setCancelReason(b.cancellationReason || '');
    setIsEditing(false);
  };

  const handleSaveEdits = () => {
    if (!selectedBooking) return;

    const newBalance = Math.max(0, editPrice - editAdvance);
    updateBookingDetails(selectedBooking.id, {
      totalPrice: editPrice,
      advancePaid: editAdvance,
      remainingBalance: newBalance,
      status: editStatus,
      internalNotes: editInternalNotes,
      cancellationReason: editStatus === 'cancelled' ? cancelReason : undefined
    });

    // Refresh selected booking
    setSelectedBooking(prev => prev ? {
      ...prev,
      totalPrice: editPrice,
      advancePaid: editAdvance,
      remainingBalance: newBalance,
      status: editStatus,
      internalNotes: editInternalNotes,
      cancellationReason: editStatus === 'cancelled' ? cancelReason : undefined
    } : null);

    setIsEditing(false);
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800">Confirmed</span>;
      case 'pending':
        return <span className="px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider bg-amber-100 text-amber-900">Pending Review</span>;
      case 'in_progress':
        return <span className="px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider bg-blue-100 text-blue-800">In Progress</span>;
      case 'completed':
        return <span className="px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider bg-stone-200 text-stone-700">Completed</span>;
      case 'rejected':
        return <span className="px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider bg-red-100 text-red-800">Rejected</span>;
      case 'cancelled':
        return <span className="px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider bg-zinc-200 text-zinc-700">Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E0D7CC] pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1715]">
            Booking Management
          </h1>
          <p className="text-xs text-[#7A6F62] mt-1">
            Track customer booking requests, verify date conflicts, record payments, and manage event operations.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 border border-[#DFD6C9] flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#8C8074] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer, phone, or Ref ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-[#D5CABB] pl-9 pr-3 py-2 text-xs text-[#1A1715] focus:outline-none focus:border-[#1A1715]"
          />
        </div>

        {/* Status filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {['all', 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                statusFilter === st 
                  ? 'bg-[#1A1715] text-white' 
                  : 'bg-[#F2ECE3] text-[#5C5246] hover:bg-[#E5DDD2]'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white border border-[#DFD6C9] overflow-x-auto shadow-sm">
        <table className="w-full text-left text-xs text-[#4F463C] border-collapse">
          <thead>
            <tr className="bg-[#FAF8F5] border-b border-[#E0D7CC] text-[11px] uppercase tracking-wider text-[#7A6F62] font-semibold">
              <th className="p-4">Ref Code</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Decoration Service</th>
              <th className="p-4">Event Date & Slot</th>
              <th className="p-4">City</th>
              <th className="p-4">Total / Advance</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFEAE2]">
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-10 text-center text-xs text-[#8C8074]">
                  No bookings found matching filters.
                </td>
              </tr>
            ) : (
              filteredBookings.map(b => (
                <tr key={b.id} className="hover:bg-[#F9F7F4] transition-colors">
                  <td className="p-4 font-mono font-bold text-[#1A1715] whitespace-nowrap">
                    {b.id}
                  </td>
                  <td className="p-4">
                    <strong className="block text-[#1A1715] font-semibold">{b.customerName}</strong>
                    <span className="text-[11px] text-[#7A6F62]">{b.customerPhone}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-[#1A1715] block max-w-xs truncate">{b.serviceTitle}</span>
                    <span className="text-[11px] text-[#8C8074]">{b.packageName}</span>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <span className="font-semibold text-[#1A1715] block">{b.eventDate}</span>
                    <span className="text-[11px] text-[#7A6F62]">{b.eventTimeSlot.split(' ')[0]}</span>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {b.city}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <span className="font-bold text-[#1A1715] tabular-nums block">
                      {settings.currencySymbol}{b.totalPrice}
                    </span>
                    <span className="text-[11px] text-emerald-800 tabular-nums">
                      Adv: {settings.currencySymbol}{b.advancePaid}
                    </span>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {getStatusBadge(b.status)}
                  </td>
                  <td className="p-4 text-right whitespace-nowrap space-x-2">
                    <button
                      onClick={() => openBookingModal(b)}
                      className="px-3 py-1 bg-[#1A1715] text-white hover:bg-[#2F2923] text-xs font-semibold uppercase tracking-wider"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Comprehensive Booking Drawer / Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#3E3831] shadow-2xl p-6 sm:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#EAE2D8] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-2xl text-[#1A1715]">Booking {selectedBooking.id}</span>
                  {getStatusBadge(selectedBooking.status)}
                </div>
                <p className="text-xs text-[#7A6F62] mt-0.5">
                  Requested on {new Date(selectedBooking.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-[#8C8074] hover:text-[#1A1715] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conflict Alert Check */}
            {(() => {
              const conflict = checkBookingConflict(
                selectedBooking.eventDate, 
                selectedBooking.eventTimeSlot, 
                selectedBooking.city, 
                selectedBooking.id
              );
              if (conflict.hasConflict) {
                return (
                  <div className="p-4 bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Calendar Conflict Alert:</strong> {conflict.message}
                    </div>
                  </div>
                );
              }
              return (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No conflicting confirmed bookings on {selectedBooking.eventDate} during {selectedBooking.eventTimeSlot} in {selectedBooking.city}.</span>
                </div>
              );
            })()}

            {/* Customer & Venue Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs bg-[#FAF8F5] p-4 border border-[#E5DDD2]">
              <div className="space-y-1">
                <span className="text-[#9E7749] font-bold uppercase tracking-wider text-[10px]">Client Information</span>
                <p className="font-semibold text-sm text-[#1A1715]">{selectedBooking.customerName}</p>
                <p>Phone: {selectedBooking.customerPhone}</p>
                <p>Email: {selectedBooking.customerEmail}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[#9E7749] font-bold uppercase tracking-wider text-[10px]">Venue Location</span>
                <p className="font-medium text-[#1A1715]">{selectedBooking.venueAddress}</p>
                <p>{selectedBooking.locality}, {selectedBooking.city}</p>
                {selectedBooking.landmark && <p className="text-[#8C8074]">Note: {selectedBooking.landmark}</p>}
              </div>
              <div className="space-y-1">
                <span className="text-[#9E7749] font-bold uppercase tracking-wider text-[10px]">Event Timing</span>
                <p className="font-medium text-[#1A1715]">{selectedBooking.eventDate}</p>
                <p>{selectedBooking.eventTimeSlot}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[#9E7749] font-bold uppercase tracking-wider text-[10px]">Theme Palette</span>
                <p className="font-medium text-[#1A1715]">{selectedBooking.themeColor}</p>
                {selectedBooking.specialInstructions && (
                  <p className="text-[11px] text-[#7A6F62] italic">"{selectedBooking.specialInstructions}"</p>
                )}
              </div>
            </div>

            {/* Inclusions & Addons */}
            <div className="border border-[#EAE2D8] p-4 space-y-2 text-xs">
              <span className="text-[#9E7749] font-bold uppercase tracking-wider text-[10px]">Service & Add-Ons</span>
              <p className="font-semibold text-sm text-[#1A1715]">{selectedBooking.serviceTitle} ({selectedBooking.packageName})</p>
              {selectedBooking.selectedAddOns.length > 0 ? (
                <ul className="list-disc pl-4 space-y-1 text-[#665D52]">
                  {selectedBooking.selectedAddOns.map(a => (
                    <li key={a.id}>
                      {a.name} — +{settings.currencySymbol}{a.price}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#8C8074]">No optional add-ons selected.</p>
              )}
            </div>

            {/* Editable Pricing & Status Section */}
            <div className="border border-[#1A1715] p-5 bg-white space-y-4">
              <div className="flex items-center justify-between border-b border-[#EAE2D8] pb-2">
                <h4 className="font-serif font-bold text-base text-[#1A1715]">
                  Financial Accounting & Status Control
                </h4>
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-xs text-[#9E7749] font-semibold underline flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'Cancel Edit' : 'Modify Pricing & Status'}</span>
                </button>
              </div>

              {isEditing ? (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-semibold mb-1">Total Agreed Price ({settings.currencySymbol})</label>
                      <input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(Number(e.target.value))}
                        className="w-full p-2 border border-[#D5CABB]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Advance Deposit Paid ({settings.currencySymbol})</label>
                      <input
                        type="number"
                        value={editAdvance}
                        onChange={(e) => setEditAdvance(Number(e.target.value))}
                        className="w-full p-2 border border-[#D5CABB]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Booking Status</label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value as BookingStatus)}
                        className="w-full p-2 border border-[#D5CABB]"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {editStatus === 'cancelled' && (
                    <div>
                      <label className="block font-semibold mb-1 text-red-700">Cancellation Reason</label>
                      <input
                        type="text"
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                        placeholder="Reason for cancellation..."
                        className="w-full p-2 border border-red-300"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block font-semibold mb-1">Internal Artisan Preparation Notes</label>
                    <textarea
                      rows={3}
                      value={editInternalNotes}
                      onChange={(e) => setEditInternalNotes(e.target.value)}
                      placeholder="e.g., Helium tanks packed; hotel service manager briefed..."
                      className="w-full p-2 border border-[#D5CABB]"
                    />
                  </div>

                  <button
                    onClick={handleSaveEdits}
                    className="px-6 py-2.5 bg-[#1A1715] text-white font-semibold uppercase text-xs flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Booking Updates</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <span className="text-[#8C8074]">Total Price:</span>
                      <p className="font-serif font-bold text-lg text-[#1A1715] tabular-nums">
                        {settings.currencySymbol}{selectedBooking.totalPrice}
                      </p>
                    </div>
                    <div>
                      <span className="text-[#8C8074]">Advance Collected:</span>
                      <p className="font-serif font-bold text-lg text-emerald-800 tabular-nums">
                        {settings.currencySymbol}{selectedBooking.advancePaid}
                      </p>
                    </div>
                    <div>
                      <span className="text-[#8C8074]">Remaining Balance:</span>
                      <p className="font-serif font-bold text-lg text-amber-800 tabular-nums">
                        {settings.currencySymbol}{selectedBooking.remainingBalance}
                      </p>
                    </div>
                  </div>

                  {selectedBooking.internalNotes && (
                    <div className="p-3 bg-[#FAF8F5] border border-[#E5DCD0]">
                      <strong className="block text-[#1A1715]">Artisan Preparation Notes:</strong>
                      <p className="text-[#6B6156] mt-0.5">{selectedBooking.internalNotes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Actions Footer */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#EAE2D8]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const url = generateWhatsAppLink({
                      bookingId: selectedBooking.id,
                      serviceTitle: selectedBooking.serviceTitle,
                      date: selectedBooking.eventDate,
                      text: `Hello ${selectedBooking.customerName}! Reaching out regarding your event decoration booking (${selectedBooking.id}) for ${selectedBooking.eventDate}.`
                    });
                    window.open(url, '_blank');
                  }}
                  className="px-4 py-2 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp Customer</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 border border-[#D5CABB] text-[#1A1715] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Work Order</span>
                </button>
              </div>

              {selectedBooking.status === 'pending' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      updateBookingStatus(selectedBooking.id, 'confirmed');
                      setSelectedBooking(prev => prev ? { ...prev, status: 'confirmed' } : null);
                    }}
                    className="px-5 py-2 bg-[#1A1715] text-white text-xs font-semibold uppercase tracking-wider"
                  >
                    Confirm Booking
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
