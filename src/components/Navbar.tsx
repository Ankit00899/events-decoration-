import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Menu, X, Calendar, User, Shield, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeView, setActiveView, settings, currentUser, loginAs, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = currentUser?.role === 'admin';
  const isAdminView = activeView.startsWith('admin');

  const navLinks = [
    { label: 'Services', view: 'services' },
    { label: 'Packages', view: 'packages' },
    { label: 'Gallery', view: 'gallery' },
    { label: 'About', view: 'about' },
    { label: 'Contact', view: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE2D8] transition-colors">
      {settings.announcementActive && settings.bannerText && !isAdminView && (
        <div className="bg-[#1A1715] text-[#D8CEBE] text-center text-xs py-1.5 px-4 tracking-wider uppercase">
          {settings.bannerText}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Wordmark brand in luxury serif */}
          <button
            onClick={() => setActiveView(isAdminView ? 'admin-dashboard' : 'home')}
            className="text-2xl sm:text-3xl font-serif text-[#1A1715] font-semibold tracking-wider hover:opacity-90 transition-opacity text-left whitespace-nowrap shrink-0"
          >
            {settings.businessName}
          </button>

          {/* Zone 2: 4-5 clean single-line nav links */}
          {!isAdminView ? (
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-[#4D453C]">
              {navLinks.map((item) => {
                const isActive = activeView === item.view;
                return (
                  <button
                    key={item.view}
                    onClick={() => setActiveView(item.view)}
                    className={`whitespace-nowrap transition-colors py-1 relative ${
                      isActive 
                        ? 'text-[#1A1715] font-semibold' 
                        : 'hover:text-[#1A1715]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9E7749]" />
                    )}
                  </button>
                );
              })}
              <button
                onClick={() => setActiveView('my-bookings')}
                className={`whitespace-nowrap transition-colors py-1 relative ${
                  activeView === 'my-bookings' ? 'text-[#1A1715] font-semibold' : 'hover:text-[#1A1715]'
                }`}
              >
                My Bookings
              </button>
            </nav>
          ) : (
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium tracking-wide text-[#4D453C]">
              <button
                onClick={() => setActiveView('admin-dashboard')}
                className={`whitespace-nowrap py-1 ${activeView === 'admin-dashboard' ? 'text-[#1A1715] font-semibold underline' : 'hover:text-[#1A1715]'}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveView('admin-bookings')}
                className={`whitespace-nowrap py-1 ${activeView === 'admin-bookings' ? 'text-[#1A1715] font-semibold underline' : 'hover:text-[#1A1715]'}`}
              >
                Bookings
              </button>
              <button
                onClick={() => setActiveView('admin-services')}
                className={`whitespace-nowrap py-1 ${activeView === 'admin-services' ? 'text-[#1A1715] font-semibold underline' : 'hover:text-[#1A1715]'}`}
              >
                Services
              </button>
              <button
                onClick={() => setActiveView('admin-customers')}
                className={`whitespace-nowrap py-1 ${activeView === 'admin-customers' ? 'text-[#1A1715] font-semibold underline' : 'hover:text-[#1A1715]'}`}
              >
                Customers
              </button>
              <button
                onClick={() => setActiveView('admin-gallery')}
                className={`whitespace-nowrap py-1 ${activeView === 'admin-gallery' ? 'text-[#1A1715] font-semibold underline' : 'hover:text-[#1A1715]'}`}
              >
                Gallery
              </button>
              <button
                onClick={() => setActiveView('admin-settings')}
                className={`whitespace-nowrap py-1 ${activeView === 'admin-settings' ? 'text-[#1A1715] font-semibold underline' : 'hover:text-[#1A1715]'}`}
              >
                Settings
              </button>
            </nav>
          )}

          {/* Zone 3: 1 primary action */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {isAdminView ? (
              <button
                onClick={() => setActiveView('home')}
                className="px-5 py-2.5 text-xs tracking-wider uppercase font-semibold text-[#1A1715] border border-[#1A1715] rounded-none hover:bg-[#1A1715] hover:text-white transition-all whitespace-nowrap"
              >
                View Customer Site
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveView('quote')}
                  className="px-4 py-2 text-xs tracking-wider uppercase font-medium text-[#4D453C] hover:text-[#1A1715] transition-colors whitespace-nowrap"
                >
                  Request Quote
                </button>
                <button
                  onClick={() => setActiveView('book')}
                  className="px-6 py-2.5 text-xs tracking-widest uppercase font-semibold text-white bg-[#1A1715] hover:bg-[#2F2923] transition-all whitespace-nowrap shadow-sm"
                >
                  Book Event
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1A1715] hover:text-[#9E7749] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#E0D5C7] px-6 py-5 space-y-4">
          {!isAdminView ? (
            <>
              {navLinks.map((item) => (
                <button
                  key={item.view}
                  onClick={() => {
                    setActiveView(item.view);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-base font-medium text-[#2F2923] py-2 border-b border-[#EFEAE2]"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setActiveView('my-bookings');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-base font-medium text-[#2F2923] py-2 border-b border-[#EFEAE2]"
              >
                My Bookings & Status
              </button>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setActiveView('quote');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2.5 text-xs uppercase tracking-wider font-semibold border border-[#1A1715] text-[#1A1715]"
                >
                  Request a Quote
                </button>
                <button
                  onClick={() => {
                    setActiveView('book');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-3 text-xs uppercase tracking-widest font-semibold bg-[#1A1715] text-white"
                >
                  Book Event Setup
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => { setActiveView('admin-dashboard'); setMobileMenuOpen(false); }}
                className="block w-full text-left py-2 font-medium"
              >
                Admin Dashboard
              </button>
              <button
                onClick={() => { setActiveView('admin-bookings'); setMobileMenuOpen(false); }}
                className="block w-full text-left py-2 font-medium"
              >
                Manage Bookings
              </button>
              <button
                onClick={() => { setActiveView('admin-services'); setMobileMenuOpen(false); }}
                className="block w-full text-left py-2 font-medium"
              >
                Manage Services & Pricing
              </button>
              <button
                onClick={() => { setActiveView('admin-customers'); setMobileMenuOpen(false); }}
                className="block w-full text-left py-2 font-medium"
              >
                Customer Directory
              </button>
              <button
                onClick={() => { setActiveView('admin-gallery'); setMobileMenuOpen(false); }}
                className="block w-full text-left py-2 font-medium"
              >
                Gallery Manager
              </button>
              <button
                onClick={() => { setActiveView('admin-settings'); setMobileMenuOpen(false); }}
                className="block w-full text-left py-2 font-medium"
              >
                Business Settings
              </button>
              <button
                onClick={() => { setActiveView('home'); setMobileMenuOpen(false); }}
                className="block w-full text-center py-2 text-xs uppercase font-semibold bg-[#1A1715] text-white mt-4"
              >
                Exit to Website
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
