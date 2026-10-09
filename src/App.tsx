import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { DemoRoleBanner } from './components/DemoRoleBanner';

// Customer views
import { HomeView } from './views/HomeView';
import { ServicesView } from './views/ServicesView';
import { ServiceDetailView } from './views/ServiceDetailView';
import { PackagesPricingView } from './views/PackagesPricingView';
import { GalleryView } from './views/GalleryView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { FaqsView } from './views/FaqsView';
import { RequestQuoteView } from './views/RequestQuoteView';
import { BookServiceView } from './views/BookServiceView';
import { BookingConfirmationView } from './views/BookingConfirmationView';
import { MyBookingsView } from './views/MyBookingsView';
import { CustomerProfileView } from './views/CustomerProfileView';
import { PoliciesView } from './views/PoliciesView';

// Admin views
import { AdminDashboardView } from './views/admin/AdminDashboardView';
import { AdminBookingsView } from './views/admin/AdminBookingsView';
import { AdminServicesView } from './views/admin/AdminServicesView';
import { AdminCustomersView } from './views/admin/AdminCustomersView';
import { AdminGalleryView } from './views/admin/AdminGalleryView';
import { AdminSettingsView } from './views/admin/AdminSettingsView';

const MainContent: React.FC = () => {
  const { activeView } = useApp();

  const renderCurrentView = () => {
    switch (activeView) {
      // Customer Views
      case 'home':
        return <HomeView />;
      case 'services':
        return <ServicesView />;
      case 'service-detail':
        return <ServiceDetailView />;
      case 'packages':
        return <PackagesPricingView />;
      case 'gallery':
        return <GalleryView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'faqs':
        return <FaqsView />;
      case 'quote':
        return <RequestQuoteView />;
      case 'book':
        return <BookServiceView />;
      case 'booking-confirmed':
        return <BookingConfirmationView />;
      case 'my-bookings':
        return <MyBookingsView />;
      case 'profile':
        return <CustomerProfileView />;
      case 'cancellation':
        return <PoliciesView initialTab="cancellation" />;
      case 'terms':
        return <PoliciesView initialTab="terms" />;
      case 'privacy':
        return <PoliciesView initialTab="privacy" />;

      // Owner Admin Views
      case 'admin-dashboard':
        return <AdminDashboardView />;
      case 'admin-bookings':
        return <AdminBookingsView />;
      case 'admin-services':
        return <AdminServicesView />;
      case 'admin-customers':
        return <AdminCustomersView />;
      case 'admin-gallery':
        return <AdminGalleryView />;
      case 'admin-settings':
        return <AdminSettingsView />;

      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E1B18]">
      <DemoRoleBanner />
      <Navbar />
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
