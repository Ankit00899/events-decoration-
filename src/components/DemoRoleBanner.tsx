import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, User, RefreshCw, LayoutDashboard, Globe } from 'lucide-react';

export const DemoRoleBanner: React.FC = () => {
  const { currentUser, loginAs, setActiveView, activeView, resetToDemoData } = useApp();
  const isAdmin = currentUser?.role === 'admin';

  return (
    <div className="bg-[#1E1B18] text-[#E8DFD8] text-xs border-b border-[#34302B] py-2 px-4 no-print select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[#BCA388] font-medium tracking-wide">AI Studio Live Preview</span>
          <span className="text-[#595249]">·</span>
          <span>Role: <strong className="text-white font-semibold">{isAdmin ? 'Business Owner (Admin)' : `${currentUser?.name || 'Customer'}`}</strong></span>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin ? (
            <button
              onClick={() => {
                loginAs('customer', {
                  id: 'cust-103',
                  name: 'Riya Kapoor',
                  email: 'riya.k@example.com',
                  phone: '+91 98991 44550'
                });
                setActiveView('home');
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2D2924] hover:bg-[#3D3832] text-[#E8DFD8] transition-colors"
              title="Switch to customer website browsing"
            >
              <Globe className="w-3.5 h-3.5 text-[#BCA388]" />
              <span>Switch to Customer View</span>
            </button>
          ) : (
            <button
              onClick={() => loginAs('admin')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#9E7749] hover:bg-[#8A673E] text-white font-medium transition-colors"
              title="Access Owner Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Enter Owner Admin Panel</span>
            </button>
          )}

          {isAdmin && (
            <button
              onClick={() => setActiveView(activeView.startsWith('admin') ? 'home' : 'admin-dashboard')}
              className="text-[#D3C4B4] hover:text-white underline transition-colors"
            >
              {activeView.startsWith('admin') ? 'View Live Site' : 'Back to Dashboard'}
            </button>
          )}

          <button
            onClick={() => {
              if (window.confirm('Reset all bookings, services and gallery to default sample data?')) {
                resetToDemoData();
              }
            }}
            className="flex items-center gap-1 text-[#9E9182] hover:text-[#E8DFD8] transition-colors"
            title="Reset to default seed data"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset Seed</span>
          </button>
        </div>
      </div>
    </div>
  );
};
