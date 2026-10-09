import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  DecorationService, 
  Booking, 
  Customer, 
  GalleryItem, 
  BusinessSettings, 
  CustomerEnquiry, 
  UserSession,
  BookingStatus,
  ServiceCategory
} from '../types';
import {
  INITIAL_SERVICES,
  INITIAL_BOOKINGS,
  INITIAL_CUSTOMERS,
  INITIAL_GALLERY,
  INITIAL_ENQUIRIES,
  INITIAL_SETTINGS
} from '../data/initialData';

interface AppContextType {
  services: DecorationService[];
  bookings: Booking[];
  customers: Customer[];
  enquiries: CustomerEnquiry[];
  gallery: GalleryItem[];
  settings: BusinessSettings;
  currentUser: UserSession | null;
  activeView: string;
  selectedServiceId: string | null;
  latestBookingId: string | null;
  selectedCategory: ServiceCategory | 'all';
  setActiveView: (view: string, params?: { serviceId?: string; bookingId?: string; category?: ServiceCategory | 'all' }) => void;
  loginAs: (role: 'admin' | 'customer', customerData?: Partial<Customer>) => void;
  logout: () => void;
  checkBookingConflict: (eventDate: string, eventTimeSlot: string, city: string, excludeBookingId?: string) => { hasConflict: boolean; conflictingBooking?: Booking; message: string };
  createBooking: (bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Booking;
  updateBookingStatus: (bookingId: string, status: BookingStatus, noteOrReason?: string) => void;
  recordPayment: (bookingId: string, advanceAmount?: number, balanceAmount?: number) => void;
  updateBookingDetails: (bookingId: string, updates: Partial<Booking>) => void;
  addOrUpdateService: (service: DecorationService) => void;
  deleteService: (serviceId: string) => void;
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (itemId: string) => void;
  submitEnquiry: (enquiry: Omit<CustomerEnquiry, 'id' | 'createdAt' | 'status'>) => CustomerEnquiry;
  updateSettings: (newSettings: Partial<BusinessSettings>) => void;
  resetToDemoData: () => void;
  generateWhatsAppLink: (details: { 
    text?: string; 
    serviceTitle?: string; 
    date?: string; 
    packageTitle?: string; 
    budget?: number; 
    city?: string;
    bookingId?: string;
  }) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SERVICES: 'aura_decor_services_v4_inr',
  BOOKINGS: 'aura_decor_bookings_v4_inr',
  CUSTOMERS: 'aura_decor_customers_v4_inr',
  ENQUIRIES: 'aura_decor_enquiries_v4_inr',
  GALLERY: 'aura_decor_gallery_v4_inr',
  SETTINGS: 'aura_decor_settings_v4_inr',
  USER: 'aura_decor_user_v4_inr'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or initial seed
  const [services, setServices] = useState<DecorationService[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
    } catch {
      return INITIAL_CUSTOMERS;
    }
  });

  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
    } catch {
      return INITIAL_ENQUIRIES;
    }
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
      return saved ? JSON.parse(saved) : INITIAL_GALLERY;
    } catch {
      return INITIAL_GALLERY;
    }
  });

  const [settings, setSettings] = useState<BusinessSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [currentUser, setCurrentUser] = useState<UserSession | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      if (saved) return JSON.parse(saved);
      // Default initial session: Customer Riya to allow immediate testing
      return {
        id: 'cust-103',
        name: 'Riya Kapoor',
        email: 'riya.k@example.com',
        phone: '+91 98991 44550',
        role: 'customer'
      };
    } catch {
      return null;
    }
  });

  const [activeView, setActiveViewState] = useState<string>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [latestBookingId, setLatestBookingId] = useState<string | null>('AUR-2026-8910');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');

  // Sync to local storage
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services)); } catch {}
  }, [services]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings)); } catch {}
  }, [bookings]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers)); } catch {}
  }, [customers]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries)); } catch {}
  }, [enquiries]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery)); } catch {}
  }, [gallery]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings)); } catch {}
  }, [settings]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch {}
  }, [currentUser]);

  const setActiveView = (
    view: string, 
    params?: { serviceId?: string; bookingId?: string; category?: ServiceCategory | 'all' }
  ) => {
    if (params?.serviceId) setSelectedServiceId(params.serviceId);
    if (params?.bookingId) setLatestBookingId(params.bookingId);
    if (params?.category) setSelectedCategory(params.category);
    setActiveViewState(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loginAs = (role: 'admin' | 'customer', customerData?: Partial<Customer>) => {
    if (role === 'admin') {
      setCurrentUser({
        id: 'admin-owner',
        name: 'Ankit Kumar Karn (Owner)',
        email: 'ankitkumarkarn211@gmail.com',
        phone: '+91 9650246245',
        role: 'admin'
      });
      setActiveView('admin-dashboard');
    } else {
      const user: UserSession = {
        id: customerData?.id || 'cust-103',
        name: customerData?.name || 'Riya Kapoor',
        email: customerData?.email || 'riya.k@example.com',
        phone: customerData?.phone || '+91 98991 44550',
        role: 'customer'
      };
      setCurrentUser(user);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveView('home');
  };

  // Conflict detection: Checks if the artisan crew is already committed on this day, slot and city
  const checkBookingConflict = (
    eventDate: string, 
    eventTimeSlot: string, 
    city: string, 
    excludeBookingId?: string
  ): { hasConflict: boolean; conflictingBooking?: Booking; message: string } => {
    const existing = bookings.find(b => 
      b.id !== excludeBookingId &&
      (b.status === 'confirmed' || b.status === 'in_progress') &&
      b.eventDate === eventDate &&
      b.eventTimeSlot === eventTimeSlot &&
      b.city.toLowerCase() === city.toLowerCase()
    );

    if (existing) {
      return {
        hasConflict: true,
        conflictingBooking: existing,
        message: `Notice: A confirmed installation is already scheduled for ${city} during ${eventTimeSlot} on ${eventDate}. Scheduling overlapping custom events may require additional crew confirmation.`
      };
    }

    return {
      hasConflict: false,
      message: 'Date and time slot currently available.'
    };
  };

  const createBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Booking => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      ...bookingData,
      id: `AUR-2026-${randomCode}`,
      status: 'pending', // Bookings strictly start as Pending until verified by business owner
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setBookings(prev => [newBooking, ...prev]);

    // Also register or update customer record if not exists
    setCustomers(prev => {
      const exists = prev.find(c => c.email.toLowerCase() === newBooking.customerEmail.toLowerCase());
      if (exists) return prev;
      return [
        ...prev,
        {
          id: newBooking.customerId || `cust-${Date.now()}`,
          name: newBooking.customerName,
          email: newBooking.customerEmail,
          phone: newBooking.customerPhone,
          address: newBooking.venueAddress,
          city: newBooking.city,
          registeredAt: new Date().toISOString().split('T')[0]
        }
      ];
    });

    setLatestBookingId(newBooking.id);
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus, noteOrReason?: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id !== bookingId) return b;
      const updated: Booking = {
        ...b,
        status,
        updatedAt: new Date().toISOString()
      };
      if (status === 'rejected') updated.rejectionReason = noteOrReason;
      if (status === 'cancelled') updated.cancellationReason = noteOrReason;
      if (noteOrReason && status !== 'rejected' && status !== 'cancelled') {
        updated.internalNotes = noteOrReason;
      }
      return updated;
    }));
  };

  const recordPayment = (bookingId: string, advanceAmount?: number, balanceAmount?: number) => {
    setBookings(prev => prev.map(b => {
      if (b.id !== bookingId) return b;
      let newAdvance = b.advancePaid;
      let newBalance = b.remainingBalance;

      if (typeof advanceAmount === 'number') {
        newAdvance = advanceAmount;
        newBalance = Math.max(0, b.totalPrice - newAdvance);
      }
      if (typeof balanceAmount === 'number') {
        newBalance = balanceAmount;
      }

      return {
        ...b,
        advancePaid: newAdvance,
        remainingBalance: newBalance,
        updatedAt: new Date().toISOString()
      };
    }));
  };

  const updateBookingDetails = (bookingId: string, updates: Partial<Booking>) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, ...updates, updatedAt: new Date().toISOString() } : b));
  };

  const addOrUpdateService = (service: DecorationService) => {
    setServices(prev => {
      const idx = prev.findIndex(s => s.id === service.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = service;
        return copy;
      }
      return [service, ...prev];
    });
  };

  const deleteService = (serviceId: string) => {
    setServices(prev => prev.filter(s => s.id !== serviceId));
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`
    };
    setGallery(prev => [newItem, ...prev]);
  };

  const deleteGalleryItem = (itemId: string) => {
    setGallery(prev => prev.filter(g => g.id !== itemId));
  };

  const submitEnquiry = (enquiryData: Omit<CustomerEnquiry, 'id' | 'createdAt' | 'status'>): CustomerEnquiry => {
    const newEnquiry: CustomerEnquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    setEnquiries(prev => [newEnquiry, ...prev]);
    return newEnquiry;
  };

  const updateSettings = (newSettings: Partial<BusinessSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetToDemoData = () => {
    setServices(INITIAL_SERVICES);
    setBookings(INITIAL_BOOKINGS);
    setCustomers(INITIAL_CUSTOMERS);
    setGallery(INITIAL_GALLERY);
    setEnquiries(INITIAL_ENQUIRIES);
    setSettings(INITIAL_SETTINGS);
    setCurrentUser({
      id: 'cust-103',
      name: 'Riya Kapoor',
      email: 'riya.k@example.com',
      phone: '+91 98991 44550',
      role: 'customer'
    });
    localStorage.clear();
  };

  // WhatsApp click-to-chat helper with structured luxury message
  const generateWhatsAppLink = ({
    text,
    serviceTitle,
    date,
    packageTitle,
    budget,
    city,
    bookingId
  }: {
    text?: string;
    serviceTitle?: string;
    date?: string;
    packageTitle?: string;
    budget?: number;
    city?: string;
    bookingId?: string;
  }) => {
    const phone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    let msg = text;

    if (!msg) {
      msg = `Hello ${settings.businessName} Concierge Team! ✨\n`;
      if (bookingId) {
        msg += `I am reaching out regarding my booking ref: *${bookingId}*.\n`;
      }
      if (serviceTitle) {
        msg += `• Service: *${serviceTitle}*\n`;
      }
      if (packageTitle) {
        msg += `• Package: *${packageTitle}*\n`;
      }
      if (date) {
        msg += `• Event Date: *${date}*\n`;
      }
      if (city) {
        msg += `• Location: *${city}*\n`;
      }
      if (budget) {
        msg += `• Estimated Budget: *${settings.currencySymbol}${budget}*\n`;
      }
      msg += `\nI would love to check availability and discuss custom theme styling details. Thank you!`;
    }

    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <AppContext.Provider
      value={{
        services,
        bookings,
        customers,
        enquiries,
        gallery,
        settings,
        currentUser,
        activeView,
        selectedServiceId,
        latestBookingId,
        selectedCategory,
        setActiveView,
        loginAs,
        logout,
        checkBookingConflict,
        createBooking,
        updateBookingStatus,
        recordPayment,
        updateBookingDetails,
        addOrUpdateService,
        deleteService,
        addGalleryItem,
        deleteGalleryItem,
        submitEnquiry,
        updateSettings,
        resetToDemoData,
        generateWhatsAppLink
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
