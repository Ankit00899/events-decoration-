import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Customer } from '../../types';
import { Search, User, Phone, Mail, MapPin, Calendar, MessageSquare, DollarSign, X } from 'lucide-react';

export const AdminCustomersView: React.FC = () => {
  const { customers, bookings, settings, generateWhatsAppLink } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.city && c.city.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E0D7CC] pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1715]">
            Customer Directory & CRM
          </h1>
          <p className="text-xs text-[#7A6F62] mt-1">
            Access client contact records, lifetime booking frequency, total spend, and personalized event notes.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 border border-[#DFD6C9]">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-[#8C8074] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search customers by name, phone, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-[#D5CABB] pl-9 pr-3 py-2 text-xs text-[#1A1715] focus:outline-none focus:border-[#1A1715]"
          />
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="bg-white border border-[#DFD6C9] overflow-x-auto shadow-sm">
        <table className="w-full text-left text-xs text-[#4F463C] border-collapse">
          <thead>
            <tr className="bg-[#FAF8F5] border-b border-[#E0D7CC] text-[11px] uppercase tracking-wider text-[#7A6F62] font-semibold">
              <th className="p-4">Customer</th>
              <th className="p-4">Contact Details</th>
              <th className="p-4">Location</th>
              <th className="p-4">Total Bookings</th>
              <th className="p-4">Lifetime Spend</th>
              <th className="p-4">Registered Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFEAE2]">
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-10 text-center text-xs text-[#8C8074]">
                  No customers found matching search.
                </td>
              </tr>
            ) : (
              filteredCustomers.map(customer => {
                const userBookings = bookings.filter(b => 
                  b.customerEmail.toLowerCase() === customer.email.toLowerCase() ||
                  b.customerId === customer.id
                );
                const lifetimeSpend = userBookings.reduce((sum, b) => sum + b.totalPrice, 0);

                return (
                  <tr key={customer.id} className="hover:bg-[#F9F7F4] transition-colors">
                    <td className="p-4">
                      <strong className="block text-[#1A1715] font-semibold text-sm">{customer.name}</strong>
                      {customer.notes && (
                        <span className="text-[11px] text-[#8C8074] italic truncate max-w-xs block">{customer.notes}</span>
                      )}
                    </td>
                    <td className="p-4 space-y-0.5 whitespace-nowrap">
                      <p className="flex items-center gap-1.5 text-[#1A1715]">
                        <Phone className="w-3 h-3 text-[#9E7749]" />
                        <span>{customer.phone}</span>
                      </p>
                      <p className="flex items-center gap-1.5 text-[#7A6F62]">
                        <Mail className="w-3 h-3 text-[#9E7749]" />
                        <span>{customer.email}</span>
                      </p>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      {customer.city || 'Standard Area'}
                    </td>
                    <td className="p-4 whitespace-nowrap font-semibold tabular-nums text-[#1A1715]">
                      {userBookings.length} events
                    </td>
                    <td className="p-4 whitespace-nowrap font-serif font-bold text-sm text-[#1A1715] tabular-nums">
                      {settings.currencySymbol}{lifetimeSpend}
                    </td>
                    <td className="p-4 whitespace-nowrap text-[#7A6F62]">
                      {customer.registeredAt}
                    </td>
                    <td className="p-4 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="px-3 py-1 bg-[#1A1715] text-white hover:bg-[#2F2923] text-xs uppercase font-semibold tracking-wider"
                      >
                        History
                      </button>
                      <button
                        onClick={() => {
                          const url = generateWhatsAppLink({
                            text: `Hello ${customer.name}! Reaching out from ${settings.businessName} regarding your event decoration.`
                          });
                          window.open(url, '_blank');
                        }}
                        className="p-1.5 bg-[#25D366] text-white hover:bg-[#20ba59] inline-block"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Customer Detail Drawer */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-[#3E3831] shadow-2xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-start justify-between border-b border-[#EAE2D8] pb-4">
              <div>
                <h2 className="font-serif font-bold text-2xl text-[#1A1715]">{selectedCustomer.name}</h2>
                <p className="text-xs text-[#7A6F62]">{selectedCustomer.email} · {selectedCustomer.phone}</p>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="text-[#8C8074] hover:text-[#1A1715]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#FAF8F5] p-4 border border-[#E5DDD2] space-y-2 text-xs">
              <span className="font-bold text-[#9E7749] uppercase tracking-wider text-[10px]">Client Address & Notes</span>
              <p>Address: {selectedCustomer.address || 'Not specified'}</p>
              <p>City: {selectedCustomer.city || 'Standard'}</p>
              {selectedCustomer.notes && (
                <p className="italic text-[#706456] pt-1">Internal note: "{selectedCustomer.notes}"</p>
              )}
            </div>

            {/* Booking History */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-lg text-[#1A1715]">
                Booking History with {settings.businessName}
              </h4>
              {(() => {
                const hist = bookings.filter(b => 
                  b.customerEmail.toLowerCase() === selectedCustomer.email.toLowerCase() ||
                  b.customerId === selectedCustomer.id
                );
                if (hist.length === 0) {
                  return <p className="text-xs text-[#8C8074]">No event bookings recorded yet.</p>;
                }
                return (
                  <div className="space-y-3">
                    {hist.map(b => (
                      <div key={b.id} className="p-3 border border-[#EAE2D8] text-xs flex justify-between items-center">
                        <div>
                          <div className="flex items-center gap-2">
                            <strong className="text-[#1A1715] font-serif text-sm">{b.serviceTitle}</strong>
                            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-stone-100">{b.id}</span>
                          </div>
                          <p className="text-[#6B6156]">{b.eventDate} ({b.eventTimeSlot}) · {b.packageName}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-serif font-bold text-sm text-[#1A1715] tabular-nums">{settings.currencySymbol}{b.totalPrice}</span>
                          <span className="block text-[10px] uppercase font-bold text-[#9E7749]">{b.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            <div className="pt-4 border-t border-[#EAE2D8] flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 bg-[#1A1715] text-white text-xs uppercase font-semibold"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
