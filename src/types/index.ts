export type ServiceCategory = 
  | 'birthday' 
  | 'anniversary' 
  | 'room' 
  | 'proposal' 
  | 'baby_shower' 
  | 'engagement'
  | 'other';

export interface Package {
  id: string;
  name: string; // e.g. 'Basic', 'Standard', 'Premium', 'Royale'
  tagline: string;
  price: number;
  setupHours: number;
  features: string[];
  isPopular?: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  category?: string;
}

export interface DecorationService {
  id: string;
  title: string;
  slug: string;
  category: ServiceCategory;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  galleryImages: string[];
  packages: Package[];
  availableAddOns: AddOn[];
  minimumNoticeDays: number;
  popularThemeColors: string[];
  isActive: boolean;
  isFeatured: boolean;
  citiesAvailable: string[];
  startingPrice: number;
}

export type BookingStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'rejected' 
  | 'in_progress' 
  | 'completed' 
  | 'cancelled';

export interface Booking {
  id: string; // e.g., "AUR-2026-9182"
  serviceId: string;
  serviceTitle: string;
  packageId: string;
  packageName: string;
  packagePrice: number;
  selectedAddOns: {
    id: string;
    name: string;
    price: number;
  }[];
  totalPrice: number;
  advancePaid: number;
  remainingBalance: number;
  eventDate: string; // YYYY-MM-DD
  eventTimeSlot: string; // e.g. "Evening (18:00 - 22:00)"
  venueAddress: string;
  city: string;
  locality: string;
  landmark?: string;
  themeColor: string;
  specialInstructions?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerId: string;
  status: BookingStatus;
  rejectionReason?: string;
  cancellationReason?: string;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerEnquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  serviceCategory: string;
  estimatedBudget: number;
  eventDate: string;
  city: string;
  message: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  registeredAt: string;
  notes?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: ServiceCategory;
  imageUrl: string;
  caption: string;
  isFeatured: boolean;
  eventDate: string;
  city: string;
}

export interface BusinessSettings {
  businessName: string;
  tagline: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  serviceCities: string[];
  workingHours: string;
  currencySymbol: string;
  depositPercentage: number;
  bannerText: string;
  announcementActive: boolean;
  heroTitle: string;
  heroSubtitle: string;
  cancellationPolicy: string;
  paymentPolicy: string;
  instagramHandle: string;
  facebookUrl: string;
  pinterestUrl: string;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'customer';
}
