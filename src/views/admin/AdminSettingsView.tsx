import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Save, CheckCircle, RefreshCw, MessageSquare } from 'lucide-react';

export const AdminSettingsView: React.FC = () => {
  const { settings, updateSettings, resetToDemoData } = useApp();
  const [formData, setFormData] = useState(settings);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleChange = (field: keyof typeof settings, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E0D7CC] pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1715]">
            Business Settings & Brand Configuration
          </h1>
          <p className="text-xs text-[#7A6F62] mt-1">
            Configure your brand identity, WhatsApp integration number, service areas, and policy copy.
          </p>
        </div>

        {savedNotice && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <CheckCircle className="w-4 h-4" />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 text-xs text-[#3D352B]">
        
        {/* Brand & Contact */}
        <div className="bg-white p-6 sm:p-8 border border-[#DFD6C9] shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-xl text-[#1A1715] border-b border-[#EAE2D8] pb-3">
            Brand Identity & Direct Communication
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1">Business Name *</label>
              <input
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => handleChange('businessName', e.target.value)}
                className="w-full p-2.5 border border-[#D5CABB]"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1">Tagline *</label>
              <input
                type="text"
                required
                value={formData.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full p-2.5 border border-[#D5CABB]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1">Phone Number *</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full p-2.5 border border-[#D5CABB]"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1 text-[#25D366]">
                WhatsApp Business Number (digits only) *
              </label>
              <input
                type="text"
                required
                value={formData.whatsappNumber}
                onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                className="w-full p-2.5 border border-[#D5CABB] font-mono"
              />
              <span className="text-[11px] text-[#8C8074] mt-0.5 block">Used for all customer click-to-chat links</span>
            </div>
            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1">Contact Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full p-2.5 border border-[#D5CABB]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider mb-1">Physical Studio Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full p-2.5 border border-[#D5CABB]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1">Currency Symbol</label>
              <input
                type="text"
                value={formData.currencySymbol}
                onChange={(e) => handleChange('currencySymbol', e.target.value)}
                className="w-full p-2.5 border border-[#D5CABB] font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1">Required Advance Deposit (%)</label>
              <input
                type="number"
                min="10"
                max="100"
                value={formData.depositPercentage}
                onChange={(e) => handleChange('depositPercentage', Number(e.target.value))}
                className="w-full p-2.5 border border-[#D5CABB]"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1">Operating & Setup Hours</label>
              <input
                type="text"
                value={formData.workingHours}
                onChange={(e) => handleChange('workingHours', e.target.value)}
                className="w-full p-2.5 border border-[#D5CABB]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider mb-1">Service Cities / Coverage Areas</label>
            <input
              type="text"
              value={formData.serviceCities.join(', ')}
              onChange={(e) => handleChange('serviceCities', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
              className="w-full p-2.5 border border-[#D5CABB]"
            />
          </div>
        </div>

        {/* Homepage Texts & Announcement */}
        <div className="bg-white p-6 sm:p-8 border border-[#DFD6C9] shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-xl text-[#1A1715] border-b border-[#EAE2D8] pb-3">
            Homepage Hero & Announcement Bar
          </h3>

          <div>
            <label className="block font-semibold uppercase tracking-wider mb-1">Hero Main Title</label>
            <input
              type="text"
              value={formData.heroTitle}
              onChange={(e) => handleChange('heroTitle', e.target.value)}
              className="w-full p-2.5 border border-[#D5CABB]"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider mb-1">Hero Subtitle</label>
            <textarea
              rows={2}
              value={formData.heroSubtitle}
              onChange={(e) => handleChange('heroSubtitle', e.target.value)}
              className="w-full p-2.5 border border-[#D5CABB]"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider mb-1">Top Announcement Banner Text</label>
            <input
              type="text"
              value={formData.bannerText}
              onChange={(e) => handleChange('bannerText', e.target.value)}
              className="w-full p-2.5 border border-[#D5CABB]"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.announcementActive}
              onChange={(e) => handleChange('announcementActive', e.target.checked)}
              className="accent-[#1A1715]"
            />
            <span className="font-semibold">Enable Announcement Banner on Website</span>
          </label>
        </div>

        {/* Policies */}
        <div className="bg-white p-6 sm:p-8 border border-[#DFD6C9] shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-xl text-[#1A1715] border-b border-[#EAE2D8] pb-3">
            Cancellation & Payment Policy Copy
          </h3>

          <div>
            <label className="block font-semibold uppercase tracking-wider mb-1">Cancellation & Refund Terms</label>
            <textarea
              rows={3}
              value={formData.cancellationPolicy}
              onChange={(e) => handleChange('cancellationPolicy', e.target.value)}
              className="w-full p-2.5 border border-[#D5CABB]"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider mb-1">Payment Schedule Policy</label>
            <textarea
              rows={3}
              value={formData.paymentPolicy}
              onChange={(e) => handleChange('paymentPolicy', e.target.value)}
              className="w-full p-2.5 border border-[#D5CABB]"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={() => {
              if (confirm('Reset entire application (services, bookings, customers) to default sample seed data?')) {
                resetToDemoData();
              }
            }}
            className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Database to Initial Sample Seed</span>
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-[#1A1715] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#2F2923] flex items-center justify-center gap-2 shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Save All Settings</span>
          </button>
        </div>

      </form>
    </div>
  );
};
