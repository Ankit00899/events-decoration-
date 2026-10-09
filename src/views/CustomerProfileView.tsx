import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Mail, Phone, MapPin, Calendar, CheckCircle } from 'lucide-react';

export const CustomerProfileView: React.FC = () => {
  const { currentUser, bookings, setActiveView, loginAs } = useApp();
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [saved, setSaved] = useState(false);

  const userBookings = bookings.filter(b => 
    b.customerEmail.toLowerCase() === (currentUser?.email || '').toLowerCase()
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs('customer', { name, email, phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-widest text-[#9E7749] font-semibold">
          Customer Account
        </span>
        <h1 className="text-3xl font-serif font-bold text-[#1A1715]">
          My Profile & Preferences
        </h1>
        <p className="text-xs text-[#7A6F62]">
          Manage your contact credentials and view past event celebrations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Profile Card */}
        <div className="bg-[#FAF8F5] p-6 border border-[#E0D7CC] space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-[#1A1715] text-[#F5EFEB] rounded-full mx-auto flex items-center justify-center font-serif text-2xl font-bold">
              {currentUser?.name?.charAt(0) || 'C'}
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1A1715]">{currentUser?.name}</h3>
            <p className="text-xs text-[#8C8074]">{currentUser?.email}</p>
          </div>

          <div className="pt-4 border-t border-[#EAE2D8] space-y-2 text-xs">
            <div className="flex justify-between text-[#6B6156]">
              <span>Role:</span>
              <strong className="text-[#1A1715] capitalize">{currentUser?.role || 'Customer'}</strong>
            </div>
            <div className="flex justify-between text-[#6B6156]">
              <span>Registered Events:</span>
              <strong className="text-[#1A1715] tabular-nums">{userBookings.length}</strong>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setActiveView('my-bookings')}
              className="w-full py-2.5 bg-[#1A1715] text-white text-xs uppercase font-semibold tracking-wider hover:bg-[#2F2923]"
            >
              View My Bookings ({userBookings.length})
            </button>
          </div>
        </div>

        {/* Edit Form */}
        <div className="md:col-span-2 bg-white p-6 sm:p-8 border border-[#DFD6C9] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#EAE2D8] pb-3">
            <h3 className="font-serif font-bold text-xl text-[#1A1715]">
              Contact Details
            </h3>
            {saved && (
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Updated!
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs text-[#3D352B]">
            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 border border-[#D5CABB]"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 border border-[#D5CABB]"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1">Phone Number (WhatsApp)</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 border border-[#D5CABB]"
              />
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1A1715] text-white text-xs uppercase font-semibold tracking-wider hover:bg-[#2F2923]"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
