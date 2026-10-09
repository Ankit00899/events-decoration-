import { DecorationService, Booking, Customer, GalleryItem, BusinessSettings, CustomerEnquiry } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_luxury_decor_1791540796509.jpg';
export const BIRTHDAY_IMAGE = '/src/assets/images/birthday_balloon_setup_1791540816181.jpg';
export const ROOM_IMAGE = '/src/assets/images/romantic_room_decor_1791540830513.jpg';
export const PROPOSAL_IMAGE = '/src/assets/images/proposal_terrace_decor_1791540848885.jpg';
export const BABY_SHOWER_IMAGE = '/src/assets/images/baby_shower_decor_1791540864113.jpg';

export const DELHI_NCR_CITIES = [
  'New Delhi',
  'Shadipur & West Delhi',
  'Central Delhi',
  'South Delhi',
  'Dwarka',
  'Noida',
  'Gurugram'
];

export const INITIAL_SERVICES: DecorationService[] = [
  {
    id: 'srv-birthday-luxury',
    title: 'Grand Birthday Balloon & Floral Arch Styling',
    slug: 'grand-birthday-balloon-floral-arch',
    category: 'birthday',
    shortDescription: 'Double circular gold arch, organic pastel and chrome balloon garland, bespoke acrylic neon name sign, and designer plinths.',
    fullDescription: 'Make birthday celebrations truly unforgettable with our signature Grand Arch setup in Delhi NCR. Featuring premium double-walled biodegradable latex balloons, metallic gold accents, customized LED neon name signs, cylindrical cake plinths, and bespoke floral arrangements designed to create picture-perfect moments.',
    coverImage: BIRTHDAY_IMAGE,
    galleryImages: [BIRTHDAY_IMAGE, HERO_IMAGE],
    minimumNoticeDays: 2,
    popularThemeColors: ['Champagne & Blush', 'White & Chrome Gold', 'Midnight Navy & Silver', 'Eucalyptus Sage & Cream'],
    isActive: true,
    isFeatured: true,
    citiesAvailable: DELHI_NCR_CITIES,
    startingPrice: 2999,
    packages: [
      {
        id: 'pkg-bday-basic',
        name: 'Basic Classic Arch',
        tagline: 'Refined celebration backdrop for cozy intimate gatherings',
        price: 2999,
        setupHours: 2,
        features: [
          '6-foot single gold circular arch frame',
          'Organic balloon garland (up to 2 colors)',
          'Standard "Happy Birthday" neon sign rental',
          'Single cylindrical cake pedestal',
          '2 hours on-site artisan setup & takedown'
        ]
      },
      {
        id: 'pkg-bday-std',
        name: 'Standard Opulence',
        tagline: 'Our most popular setup for milestone birthdays and private suites',
        price: 5499,
        setupHours: 3,
        isPopular: true,
        features: [
          '8-foot dual layered arch with textured drape',
          'Full organic garland with chrome metallic accents',
          'Customized personalized LED name neon sign',
          'Trio of fluted white & gold cylinder plinths',
          'Faux silk floral clusters & pampas accents',
          'LED ground uplights & ambient spot illumination',
          'Full setup, tear down & cleanup included'
        ]
      },
      {
        id: 'pkg-bday-prem',
        name: 'Royale Imperial Extravaganza',
        tagline: 'Showstopper runway experience for luxury milestones (18th, 25th, 50th)',
        price: 9999,
        setupHours: 4.5,
        features: [
          '10-foot monumental circular & spiral organic installation',
          'Fresh premium hydrangeas, peonies & dried pampas foliage',
          '3-foot giant 3D marquee lighted age numbers',
          'Custom acrylic mirror welcome board with easel',
          'Set of 4 luxury fluted cake & champagne pedestals',
          'Complimentary low-smoke dry ice effect for cake cutting',
          'Dedicated on-site decor supervisor throughout the event'
        ]
      }
    ],
    availableAddOns: [
      { id: 'add-marquee-num', name: 'Giant 3ft Marquee LED Numbers', description: 'Illuminated warm-white bulb numerals for milestones', price: 999 },
      { id: 'add-smoke-fog', name: 'Dry Ice Ground Fog Effect (Cake Cutting)', description: 'Low lying cloud effect for photos', price: 1499 },
      { id: 'add-welcome-easel', name: 'Personalized Acrylic Welcome Easel', description: 'Mirror gold lettering with floral spray', price: 699 },
      { id: 'add-fresh-roses-bday', name: 'Fresh Rose Bouquet (50 Stems)', description: 'Arranged in luxury ceramic cylinder vase', price: 1299 }
    ]
  },
  {
    id: 'srv-romantic-room',
    title: 'Pure Romance Candlelit Canopy & Rose Petal Suite',
    slug: 'romantic-room-candlelit-canopy',
    category: 'room',
    shortDescription: 'Intimate private suite transformation with hundreds of flickering candles, sheer canopy draping, warm fairy lights, and fragrant red rose petals.',
    fullDescription: 'Turn your bedroom, hotel suite, or private apartment into a breathtaking romantic sanctuary across Delhi NCR. Our artisan decor team silently prepares a mesmerizing pathway of real crimson rose petals, warm flameless safety candles in hurricane glass, flowing sheer ceiling drapes with fairy lights, and customized greetings.',
    coverImage: ROOM_IMAGE,
    galleryImages: [ROOM_IMAGE, HERO_IMAGE],
    minimumNoticeDays: 1,
    popularThemeColors: ['Crimson Red & Warm Gold', 'Ivory & Blush Pink', 'Deep Burgundy & Champagne'],
    isActive: true,
    isFeatured: true,
    citiesAvailable: DELHI_NCR_CITIES,
    startingPrice: 2499,
    packages: [
      {
        id: 'pkg-room-basic',
        name: 'Intimate Glow',
        tagline: 'Sensual subtle surprise for spontaneous anniversaries',
        price: 2499,
        setupHours: 1.5,
        features: [
          '500+ fresh red rose petals on bed and bedside',
          '30 LED warm flickering pillar candles in safety glass',
          'Subtle curtain warm fairy light string waterfall',
          'Helium ceiling balloons with curling satin ribbons (20 pcs)',
          'Express 1.5-hour quiet setup'
        ]
      },
      {
        id: 'pkg-room-std',
        name: 'The Lovers Sanctuary',
        tagline: 'Complete bedroom fairytale with rose petal carpet and canopy',
        price: 4499,
        setupHours: 2.5,
        isPopular: true,
        features: [
          '2,000+ fresh fragrant rose petals covering carpet path & bed',
          'Canopy four-poster or ceiling draped sheer fairy light curtain',
          '60 illuminated candles in glass hurricane holders',
          'Bespoke neon sign ("Better Together" / "Love You Always")',
          'Silver wine bucket with glasses & display staging',
          'Heart-shaped balloon bouquet with custom greeting tag'
        ]
      },
      {
        id: 'pkg-room-prem',
        name: 'Presidential Romance Luxury Suite',
        tagline: '5-star hotel level surprise makeover across New Delhi & NCR',
        price: 8499,
        setupHours: 3.5,
        features: [
          '5,000 fresh fragrant rose petals spanning entrance to bed',
          '100+ hurricane lanterns and floating candle glass cylinders',
          'Luxury silk canopy styling with suspended warm starlight grid',
          '100 premium ruby red and pearl helium ceiling balloons with photo cards',
          'Chilled non-alcoholic sparkling bottle & crystal flutes',
          'Gourmet artisanal chocolate & strawberry platter staging',
          'Next-morning discreet cleanup service included'
        ]
      }
    ],
    availableAddOns: [
      { id: 'add-polaroid-hangings', name: 'Polaroid Memory Hanging Streamers (25 Photos)', description: 'Printed photos tied with satin ribbons to helium balloons', price: 699 },
      { id: 'add-choc-strawberries', name: 'Artisan Chocolate Box & Treats', description: 'Gourmet hand-crafted luxury box', price: 599 },
      { id: 'add-live-guitar', name: 'Private Acoustic Guitarist (30 mins at arrival)', description: 'Romantic serenade at suite entrance', price: 2499 },
      { id: 'add-morning-cleanup', name: 'Next-Day Professional Packdown & Cleanup', description: 'Zero stress packup for hotels and homes', price: 799 }
    ]
  },
  {
    id: 'srv-proposal-terrace',
    title: '"Marry Me" Skyline Terrace & Lantern Runway',
    slug: 'marry-me-skyline-terrace-lantern-runway',
    category: 'proposal',
    shortDescription: 'Giant 4-foot illuminated MARRY ME marquee letters, lavish floral arch of white hydrangeas, red velvet runner, and lantern-lined walkway.',
    fullDescription: 'The ultimate proposal of a lifetime in New Delhi. Orchestrated with absolute precision so she says YES without hesitation. From rooftop terraces with twinkling city views to private lawns, we create a cinematic setting featuring bold illuminated marquee letters, hundreds of lanterns, fresh floral arches, and discreet timing.',
    coverImage: PROPOSAL_IMAGE,
    galleryImages: [PROPOSAL_IMAGE, HERO_IMAGE],
    minimumNoticeDays: 3,
    popularThemeColors: ['Pure White & Gold', 'Eucalyptus & Cream', 'Romantic Blush & Rose Gold'],
    isActive: true,
    isFeatured: true,
    citiesAvailable: DELHI_NCR_CITIES,
    startingPrice: 5999,
    packages: [
      {
        id: 'pkg-prop-basic',
        name: 'Classic Proposal Arch',
        tagline: 'Romantic floral arch and lantern walkway',
        price: 5999,
        setupHours: 2.5,
        features: [
          'Full round or square white floral arch with hydrangeas & roses',
          'Glowing neon "Will You Marry Me?" sign',
          'Red or ivory aisle carpet runner (20 feet)',
          '16 hurricane glass candle lanterns flanking aisle',
          'Rose petals dusting along the runner',
          'Discreet arrival cue timing coordination'
        ]
      },
      {
        id: 'pkg-prop-std',
        name: 'The Grand Marquee YES',
        tagline: 'Our signature illuminated 4ft letters with cold fireworks & roses',
        price: 9999,
        setupHours: 3.5,
        isPopular: true,
        features: [
          '4-foot tall giant warm-white illuminated "MARRY ME" letters',
          'Lavish floral arch with cascading flowers & greens',
          '30-foot plush velvet red or white aisle runner',
          '30 glass candle cylinders with floating wicks',
          'Cold spark pyro fountain machine (2 safe triggers for the big moment)',
          'Ring presentation pedestal with velvet cushion',
          'Dedicated decor coordinator on-site until proposal completes'
        ]
      },
      {
        id: 'pkg-prop-prem',
        name: 'Billionaire Skyline Fairytale',
        tagline: 'The ultimate all-inclusive cinematic proposal production',
        price: 16999,
        setupHours: 5,
        features: [
          'Full panoramic floral gazebo or double cascading arch',
          'Illuminated 4ft MARRY ME letters + custom couple initials neon',
          '4 cold spark firework blast machines (safe indoors/outdoors)',
          'Heavy low-smoke cloud effect as you kneel down',
          '50 glass hurricane lanterns and 1,000 fresh rose petals',
          'Cake & drink bar setup with crystal glasses',
          'Professional photographer for 1 hour included (40 edited photos)',
          'Full venue liaison, logistics coordination & sound system for your song'
        ]
      }
    ],
    availableAddOns: [
      { id: 'add-cold-sparks', name: 'Cold Spark Pyro Fountains (Pair)', description: 'Safe, smoke-free indoor/outdoor golden spark jets', price: 1799 },
      { id: 'add-photo-pro', name: 'Professional Proposal Photographer (1 Hr)', description: 'Discreet capture + 35 retouched high-res photos', price: 2999 },
      { id: 'add-acoustic-guitar', name: 'Acoustic Guitarist / Singer for Entry', description: 'Live performance during arrival and ring moment', price: 2499 },
      { id: 'add-ring-box-led', name: 'Luxury Velvet Ring Box with Interior Spotlight', description: 'Illuminates the diamond in dark evening light', price: 499 }
    ]
  },
  {
    id: 'srv-baby-shower-chic',
    title: 'Whimsical Teddy & Pampas Baby Shower Garland',
    slug: 'whimsical-teddy-pampas-baby-shower',
    category: 'baby_shower',
    shortDescription: 'Organic neutral balloon arch in sage, beige and ivory with plush oversized teddy bears, custom wooden welcome easel, and boho florals.',
    fullDescription: 'Welcome your bundle of joy with a breathtaking, Instagram-ready aesthetic baby shower or welcome baby installation in Delhi NCR. Designed with soft earthy tones, dried botanicals, fluffy pampas grass, custom name signs, and plush styling that creates the warmest family memories.',
    coverImage: BABY_SHOWER_IMAGE,
    galleryImages: [BABY_SHOWER_IMAGE, HERO_IMAGE],
    minimumNoticeDays: 2,
    popularThemeColors: ['Sage Green, Cream & Tan', 'Dusty Rose, Peach & Ivory', 'Sky Blue, Sand & White', 'Warm Caramel & Honey'],
    isActive: true,
    isFeatured: true,
    citiesAvailable: DELHI_NCR_CITIES,
    startingPrice: 2999,
    packages: [
      {
        id: 'pkg-baby-basic',
        name: 'Sweet Welcome',
        tagline: 'Delicate home or private dining backdrop',
        price: 2999,
        setupHours: 2,
        features: [
          'Organic 7ft balloon demi-arch (up to 3 matte colors)',
          'Custom acrylic easel with baby name / "Welcome Baby"',
          'Plush 3ft sitting teddy bear display',
          'Baby block boxes filled with coordinating mini balloons',
          '2 hours setup and subsequent removal'
        ]
      },
      {
        id: 'pkg-baby-std',
        name: 'The Boho Pampas Sanctuary',
        tagline: 'Full arch with florals, luxury plinths and giant bear',
        price: 5299,
        setupHours: 3,
        isPopular: true,
        features: [
          'Complete 8ft curved organic balloon arch installation',
          'Dried pampas grass, eucalyptus & beige silk roses',
          'Giant 4.5ft cuddly plush statement bear',
          'Custom wooden easel with 3D acrylic calligraphy',
          'Pair of cylindrical textured pedestals for cake & gifts',
          'Woven seagrass baskets with wrapped presentation florals'
        ]
      },
      {
        id: 'pkg-baby-prem',
        name: 'Celestial Royal Nursery Showcase',
        tagline: 'Monumental venue transformation for 50+ guests',
        price: 8999,
        setupHours: 4,
        features: [
          'Multi-dimensional double arch with suspended floating cloud balloons',
          'Illuminated LED "Oh Baby" or custom baby name neon',
          'Velvet luxury sofa lounge photo area for expectant mother',
          'Trio of ribbed fluted dessert plinths with floral crowns',
          'Customized personalized guest favor display styling',
          'Complimentary polaroid camera station with guestbook album'
        ]
      }
    ],
    availableAddOns: [
      { id: 'add-baby-neon', name: 'Bespoke "Oh Baby" Warm LED Neon Sign', description: 'Mounted directly within balloon arch', price: 699 },
      { id: 'add-guest-easel', name: 'Guestbook Audio Phone or Polaroid Station', description: 'Table setup with display signage and film packs', price: 1299 },
      { id: 'add-giant-bear-keep', name: 'Giant 5ft Plush Teddy Bear (Yours to Keep)', description: 'Brand new luxury keepsake toy for baby room', price: 1499 }
    ]
  },
  {
    id: 'srv-anniversary-suite',
    title: 'Luxury Milestone Anniversary Gala & Dining Styling',
    slug: 'luxury-milestone-anniversary-gala',
    category: 'anniversary',
    shortDescription: 'Opulent gold-framed floral canopy, table styling with fine tapered candles, customized photo gallery walkway, and ambient glow.',
    fullDescription: 'Celebrate enduring love with a sophisticated anniversary setup. Whether celebrating 1st anniversary, 10th, 25th silver jubilee, or 50th golden jubilee in Delhi NCR, our bespoke stylings feature curated tablescapes, custom photo timelines, crystal taper candleholders, and cascading flower garlands.',
    coverImage: HERO_IMAGE,
    galleryImages: [HERO_IMAGE, ROOM_IMAGE],
    minimumNoticeDays: 2,
    popularThemeColors: ['Champagne & Black Velvet', 'Silver & Pearl White', 'Burgundy & Antique Brass'],
    isActive: true,
    isFeatured: false,
    citiesAvailable: DELHI_NCR_CITIES,
    startingPrice: 3499,
    packages: [
      {
        id: 'pkg-anni-basic',
        name: 'Silver Grace',
        tagline: 'Intimate dining table & backdrop for two or small family',
        price: 3499,
        setupHours: 2,
        features: [
          'Full dining table tablescape styling for up to 6 guests',
          'Crystal taper candleholders with dripless champagne candles',
          'Petal runners and eucalyptus garland centerpieces',
          'Personalized framed anniversary date print',
          'Backdrop drape with warm fairy lights'
        ]
      },
      {
        id: 'pkg-anni-std',
        name: 'Golden Jubilee Elegance',
        tagline: 'Monumental backdrop with timeline photo memory wall',
        price: 6499,
        setupHours: 3.5,
        isPopular: true,
        features: [
          'Bespoke gold circular arch with fresh white roses and foliage',
          'Custom LED neon "Happy Anniversary [Names]"',
          'Illuminated photo memory wall displaying 20 couple milestone photos',
          'Dining table centerpiece styling with gold charger plates and candles',
          'Complimentary pair of personalized champagne flutes engraved with initials'
        ]
      },
      {
        id: 'pkg-anni-prem',
        name: 'Diamond Royale Celebration',
        tagline: 'Banquet hall or farmhouse full event design',
        price: 11999,
        setupHours: 5,
        features: [
          'Monumental ceiling fairy light star canopy installation',
          'Dual arch entrance tunnel with fresh floral fragrances',
          'Giant 3D marquee number representing the anniversary years',
          'Full dining room tablescapes for up to 24 guests',
          'On-site event staging director during event duration'
        ]
      }
    ],
    availableAddOns: [
      { id: 'add-timeline-frame', name: 'Curated 20-Photo Vintage Memory Wall', description: 'Gold frames with fairy lights and custom captions', price: 999 },
      { id: 'add-cake-stage', name: 'Luxury Elevated Cake Display with Spotlights', description: 'Fluted velvet plinth with gold trim', price: 799 }
    ]
  },
  {
    id: 'srv-engagement-backdrop',
    title: 'Intimate Engagement & Ring Ceremony Backdrop',
    slug: 'intimate-engagement-ring-ceremony',
    category: 'engagement',
    shortDescription: 'Geometric gold hexagonal arch, lush fresh floral clusters, neon signage, and romantic candlelit ring ceremony staging.',
    fullDescription: 'The perfect stage to exchange rings and celebrate your union in Delhi NCR. Designed for intimate family venues, farmhouses, or banquet halls with rich textures, brass backdrops, lush roses, and soft accent lighting.',
    coverImage: HERO_IMAGE,
    galleryImages: [HERO_IMAGE, PROPOSAL_IMAGE],
    minimumNoticeDays: 3,
    popularThemeColors: ['Champagne & Emerald Green', 'Blush & Rose Gold', 'Royal Blue & Ivory'],
    isActive: true,
    isFeatured: false,
    citiesAvailable: DELHI_NCR_CITIES,
    startingPrice: 3999,
    packages: [
      {
        id: 'pkg-eng-basic',
        name: 'Ring Glow',
        tagline: 'Simple elegant ring exchange stage backdrop',
        price: 3999,
        setupHours: 2.5,
        features: [
          'Hexagonal gold steel arch with drape fabric',
          'Silk and fresh floral arrangements on top corners',
          'Neon "Engaged" sign',
          'Ring ceremony pedestal with velvet box display',
          '2 hours setup & 1 hour packdown'
        ]
      },
      {
        id: 'pkg-eng-std',
        name: 'The Majestic Vow',
        tagline: 'Double layered backdrop with fresh botanicals and ground floral meadow',
        price: 7499,
        setupHours: 3.5,
        isPopular: true,
        features: [
          '7-foot dual geometric arch layered with ivory chiffon drapes',
          'Extensive fresh rose and hydrangea floral clusters',
          'Floor floral meadow framing the ring pedestal',
          'Personalized acrylic name board on gold easel',
          '4 warm LED spotlights for video and photographer clarity'
        ]
      }
    ],
    availableAddOns: [
      { id: 'add-meadow-florals', name: 'Floor Floral Meadow Runner (10 Feet)', description: 'Fresh roses and pampas running alongside stage', price: 1599 },
      { id: 'add-dry-ice-rings', name: 'Ring Exchange Low Fog Cloud Effect', description: 'Atmospheric mist at the moment of exchange', price: 1499 }
    ]
  },
  {
    id: 'srv-home-cocktail-party',
    title: 'Chic Bohemian Home Cocktail & Lounge Party',
    slug: 'chic-bohemian-home-cocktail-party',
    category: 'other',
    shortDescription: 'Living room and patio transformation with velvet cushions, low cocktail tables, warm pendant globes, and organic greenery.',
    fullDescription: 'Elevate your private gathering at home in Delhi. From housewarming parties, graduation soirees, to festive celebrations, our decorators transform living rooms, rooftops, and backyards into chic designer lounges.',
    coverImage: HERO_IMAGE,
    galleryImages: [HERO_IMAGE, BIRTHDAY_IMAGE],
    minimumNoticeDays: 2,
    popularThemeColors: ['Boho Rust & Terracotta', 'Monochrome Black & White', 'Olive & Gold'],
    isActive: true,
    isFeatured: false,
    citiesAvailable: DELHI_NCR_CITIES,
    startingPrice: 3299,
    packages: [
      {
        id: 'pkg-home-basic',
        name: 'Lounge Vibe',
        tagline: 'Cocktail corner backdrop and ambient lighting',
        price: 3299,
        setupHours: 2,
        features: [
          'Cocktail bar backdrop banner with balloon organic flair',
          'Fairy light globe strings across ceiling or pergola',
          'Table styling for bar and food display',
          'Welcome sign with party theme name'
        ]
      },
      {
        id: 'pkg-home-std',
        name: 'Full Home Transformation',
        tagline: 'Living room and patio styled for 25+ guests',
        price: 5999,
        setupHours: 3.5,
        isPopular: true,
        features: [
          'Photo-op installation with personalized neon sign',
          'Full ceiling or pergola festoon lighting and paper lantern clusters',
          'Bar cart styling with floral urns and display menus',
          'Low picnic floor lounge with rugs, poufs, and tables for 12 guests'
        ]
      }
    ],
    availableAddOns: [
      { id: 'add-festoon-lights', name: '50-Foot Commercial Festoon Warm Bulb Canopy', description: 'Weatherproof Edison bulbs strung overhead', price: 899 },
      { id: 'add-custom-cocktail-menu', name: 'Printed Acrylic Bar Menu & Glass Decanters', description: 'Custom styled bar top display', price: 499 }
    ]
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'AUR-2026-8910',
    serviceId: 'srv-proposal-terrace',
    serviceTitle: '"Marry Me" Skyline Terrace & Lantern Runway',
    packageId: 'pkg-prop-std',
    packageName: 'The Grand Marquee YES',
    packagePrice: 9999,
    selectedAddOns: [
      { id: 'add-photo-pro', name: 'Professional Proposal Photographer (1 Hr)', price: 2999 },
      { id: 'add-cold-sparks', name: 'Cold Spark Pyro Fountains (Pair)', price: 1799 }
    ],
    totalPrice: 14797,
    advancePaid: 4500,
    remainingBalance: 10297,
    eventDate: '2026-10-18',
    eventTimeSlot: 'Evening (18:00 - 22:00)',
    venueAddress: 'Rooftop Lounge, Connaught Place, Block M',
    city: 'Central Delhi',
    locality: 'Connaught Place',
    landmark: 'Opposite Metro Gate 4',
    themeColor: 'Pure White & Gold',
    specialInstructions: 'Will arrive around 19:30 exactly. Please ensure photographer is positioned behind the floral arch.',
    customerName: 'Aman Sharma',
    customerPhone: '+91 98112 34567',
    customerEmail: 'aman.sharma@example.com',
    customerId: 'cust-101',
    status: 'confirmed',
    internalNotes: 'Cold spark operator confirmed. Photographer Dave briefed on discreet hiding spot. Ring box tested.',
    createdAt: '2026-10-06T14:30:00Z',
    updatedAt: '2026-10-07T10:00:00Z'
  },
  {
    id: 'AUR-2026-8914',
    serviceId: 'srv-romantic-room',
    serviceTitle: 'Pure Romance Candlelit Canopy & Rose Petal Suite',
    packageId: 'pkg-room-std',
    packageName: 'The Lovers Sanctuary',
    packagePrice: 4499,
    selectedAddOns: [
      { id: 'add-choc-strawberries', name: 'Artisan Chocolate Box & Treats', price: 599 },
      { id: 'add-polaroid-hangings', name: 'Polaroid Memory Hanging Streamers (25 Photos)', price: 699 }
    ],
    totalPrice: 5797,
    advancePaid: 1800,
    remainingBalance: 3997,
    eventDate: '2026-10-21',
    eventTimeSlot: 'Late Night Surprise (22:00 - 01:00)',
    venueAddress: 'Plot 42, Baljeet Nagar, Near Metro Pillar 218',
    city: 'Shadipur & West Delhi',
    locality: 'Shadipur',
    landmark: 'Near Shadipur Metro Station',
    themeColor: 'Crimson Red & Warm Gold',
    specialInstructions: 'Family will grant room key at 20:00. Please complete candles by 21:30 before our dinner finishes.',
    customerName: 'Priya Mehra',
    customerPhone: '+91 97110 88219',
    customerEmail: 'priya.mehra@example.com',
    customerId: 'cust-102',
    status: 'pending',
    internalNotes: 'LED safety candles preferred. Check floral petal availability with Shadipur mandi supplier.',
    createdAt: '2026-10-08T09:15:00Z',
    updatedAt: '2026-10-08T09:15:00Z'
  },
  {
    id: 'AUR-2026-8892',
    serviceId: 'srv-birthday-luxury',
    serviceTitle: 'Grand Birthday Balloon & Floral Arch Styling',
    packageId: 'pkg-bday-std',
    packageName: 'Standard Opulence',
    packagePrice: 5499,
    selectedAddOns: [
      { id: 'add-marquee-num', name: 'Giant 3ft Marquee LED Numbers', price: 999 }
    ],
    totalPrice: 6498,
    advancePaid: 6498,
    remainingBalance: 0,
    eventDate: '2026-10-04',
    eventTimeSlot: 'Afternoon (14:00 - 18:00)',
    venueAddress: 'B-12, Sector 14, Dwarka',
    city: 'Dwarka',
    locality: 'Dwarka Sector 14',
    landmark: 'Near Vegas Mall',
    themeColor: 'Champagne & Blush',
    specialInstructions: 'Neon sign should read "Riya Turns 25". Cake delivery arrives at 15:00.',
    customerName: 'Riya Kapoor',
    customerPhone: '+91 98991 44550',
    customerEmail: 'riya.k@example.com',
    customerId: 'cust-103',
    status: 'completed',
    internalNotes: 'Completed flawlessly. Client loved the fluted plinths.',
    createdAt: '2026-09-28T11:00:00Z',
    updatedAt: '2026-10-04T19:00:00Z'
  },
  {
    id: 'AUR-2026-8920',
    serviceId: 'srv-baby-shower-chic',
    serviceTitle: 'Whimsical Teddy & Pampas Baby Shower Garland',
    packageId: 'pkg-baby-std',
    packageName: 'The Boho Pampas Sanctuary',
    packagePrice: 5299,
    selectedAddOns: [
      { id: 'add-baby-neon', name: 'Bespoke "Oh Baby" Warm LED Neon Sign', price: 699 }
    ],
    totalPrice: 5998,
    advancePaid: 1800,
    remainingBalance: 4198,
    eventDate: '2026-10-24',
    eventTimeSlot: 'Morning (09:00 - 13:00)',
    venueAddress: 'The Garden Deck, Club South Delhi, Greater Kailash 1',
    city: 'South Delhi',
    locality: 'Greater Kailash',
    landmark: 'M-Block Market Lane',
    themeColor: 'Sage Green, Cream & Tan',
    specialInstructions: 'Setup must be ready by 10:30 AM before brunch guests arrive.',
    customerName: 'Neha Verma',
    customerPhone: '+91 99102 77810',
    customerEmail: 'neha.verma@example.com',
    customerId: 'cust-104',
    status: 'confirmed',
    internalNotes: 'Teddy bear and dried pampas packed in bin #4. Green arch frames inspected.',
    createdAt: '2026-10-07T16:20:00Z',
    updatedAt: '2026-10-08T11:30:00Z'
  },
  {
    id: 'AUR-2026-8885',
    serviceId: 'srv-anniversary-suite',
    serviceTitle: 'Luxury Milestone Anniversary Gala & Dining Styling',
    packageId: 'pkg-anni-basic',
    packageName: 'Silver Grace',
    packagePrice: 3499,
    selectedAddOns: [],
    totalPrice: 3499,
    advancePaid: 0,
    remainingBalance: 3499,
    eventDate: '2026-10-02',
    eventTimeSlot: 'Evening (18:00 - 22:00)',
    venueAddress: 'Sector 54, Golf Course Road',
    city: 'Gurugram',
    locality: 'Golf Course Road',
    landmark: 'Near DLF Phase 5',
    themeColor: 'Silver & Pearl White',
    specialInstructions: 'Client requested cancellation due to family travel reschedule.',
    customerName: 'Vikram Malhotra',
    customerPhone: '+91 98101 23456',
    customerEmail: 'vikram.m@example.com',
    customerId: 'cust-105',
    status: 'cancelled',
    cancellationReason: 'Client requested cancellation due to travel. No penalty charged.',
    createdAt: '2026-09-25T10:00:00Z',
    updatedAt: '2026-09-29T14:00:00Z'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-101',
    name: 'Aman Sharma',
    email: 'aman.sharma@example.com',
    phone: '+91 98112 34567',
    address: 'Block M, Connaught Place',
    city: 'Central Delhi',
    registeredAt: '2026-10-05',
    notes: 'Terrace proposal client, communication via WhatsApp preferred.'
  },
  {
    id: 'cust-102',
    name: 'Priya Mehra',
    email: 'priya.mehra@example.com',
    phone: '+91 97110 88219',
    address: 'Plot 42, Baljeet Nagar, Shadipur',
    city: 'Shadipur & West Delhi',
    registeredAt: '2026-10-07',
    notes: 'Very detail-oriented on floral scents and candle safety standards.'
  },
  {
    id: 'cust-103',
    name: 'Riya Kapoor',
    email: 'riya.k@example.com',
    phone: '+91 98991 44550',
    address: 'B-12, Sector 14, Dwarka',
    city: 'Dwarka',
    registeredAt: '2026-09-26',
    notes: 'Hosted 25th birthday. High referral potential across West Delhi.'
  },
  {
    id: 'cust-104',
    name: 'Neha Verma',
    email: 'neha.verma@example.com',
    phone: '+91 99102 77810',
    address: 'Greater Kailash 1, M-Block',
    city: 'South Delhi',
    registeredAt: '2026-10-06',
    notes: 'Baby shower host. Inquired about first birthday package later next year.'
  },
  {
    id: 'cust-105',
    name: 'Vikram Malhotra',
    email: 'vikram.m@example.com',
    phone: '+91 98101 23456',
    address: 'DLF Phase 5, Golf Course Road',
    city: 'Gurugram',
    registeredAt: '2026-09-24',
    notes: 'Rescheduling for winter anniversary celebration.'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Riya’s 25th Birthday Gold & Blush Arch',
    category: 'birthday',
    imageUrl: BIRTHDAY_IMAGE,
    caption: 'Double circular arch with organic balloon styling and custom neon nameplate at Dwarka.',
    isFeatured: true,
    eventDate: '2026-10-04',
    city: 'Dwarka'
  },
  {
    id: 'gal-2',
    title: 'Delhi Skyline Rooftop Proposal',
    category: 'proposal',
    imageUrl: PROPOSAL_IMAGE,
    caption: 'Bespoke 4ft MARRY ME marquee letters with fresh hydrangea arch and candlelit red runner.',
    isFeatured: true,
    eventDate: '2026-09-19',
    city: 'Central Delhi'
  },
  {
    id: 'gal-3',
    title: 'The Lovers Canopy Bedroom Surprise',
    category: 'room',
    imageUrl: ROOM_IMAGE,
    caption: '2,000 real rose petals, glowing hurricane candles, and warm starlight ceiling drapes in Shadipur.',
    isFeatured: true,
    eventDate: '2026-09-28',
    city: 'Shadipur & West Delhi'
  },
  {
    id: 'gal-4',
    title: 'Baby Shower Boho Sage & Pampas Styling',
    category: 'baby_shower',
    imageUrl: BABY_SHOWER_IMAGE,
    caption: 'Custom wooden welcome easel, oversized plush teddy bear, and neutral balloon arch in South Delhi.',
    isFeatured: true,
    eventDate: '2026-09-12',
    city: 'South Delhi'
  },
  {
    id: 'gal-5',
    title: 'Grand Ballroom Floral Arch Gala',
    category: 'anniversary',
    imageUrl: HERO_IMAGE,
    caption: 'Grand ballroom canopy with twinkling fairy light curtain and cascading rose arch.',
    isFeatured: true,
    eventDate: '2026-08-30',
    city: 'New Delhi'
  }
];

export const INITIAL_ENQUIRIES: CustomerEnquiry[] = [
  {
    id: 'enq-501',
    name: 'Karan Mehra',
    phone: '+91 96502 46245',
    email: 'ankitkumarkarn211@gmail.com',
    serviceCategory: 'proposal',
    estimatedBudget: 12000,
    eventDate: '2026-11-05',
    city: 'New Delhi',
    message: 'Looking for a private terrace proposal with city skyline views. Would love cold sparks and live guitarist.',
    status: 'new',
    createdAt: '2026-10-08T18:40:00Z'
  },
  {
    id: 'enq-502',
    name: 'Sneha Gupta',
    phone: '+91 98112 00412',
    email: 'sneha.gupta@example.com',
    serviceCategory: 'baby_shower',
    estimatedBudget: 6000,
    eventDate: '2026-11-14',
    city: 'South Delhi',
    message: 'Expecting twin boys! We want a cloud and moon theme with soft blue and beige balloons.',
    status: 'quoted',
    createdAt: '2026-10-07T12:15:00Z'
  }
];

export const INITIAL_SETTINGS: BusinessSettings = {
  businessName: 'Aura Luxe Events',
  tagline: 'Artisan Event Styling & Luxury Surprise Transformations',
  phone: '+91 9650246245',
  whatsappNumber: '919650246245',
  email: 'ankitkumarkarn211@gmail.com',
  address: 'Shadipur, Baljeet Nagar, New Delhi - 110008',
  serviceCities: DELHI_NCR_CITIES,
  workingHours: 'Mon - Sun: 08:00 AM – 10:00 PM (Surprise setups 24/7 by appointment)',
  currencySymbol: '₹',
  depositPercentage: 30,
  bannerText: 'Now Booking 2026 & 2027 Celebrations Across Delhi NCR · Direct WhatsApp Support on +91 9650246245',
  announcementActive: true,
  heroTitle: 'Curating Unforgettable Celebrations & Breathtaking Moments in Delhi NCR',
  heroSubtitle: 'From romantic candlelit suites and skyline proposals to milestone birthdays and celestial baby showers, our artisan team in Shadipur, New Delhi crafts bespoke installations that captivate.',
  cancellationPolicy: 'Cancellations made 7+ days prior to event date receive a 100% refund of advance deposit minus a ₹500 custom materials fabrication fee. Cancellations made 3–6 days prior may reschedule without penalty or receive a 50% deposit credit. Due to custom florals and balloon prep, cancellations within 48 hours forfeit the advance deposit.',
  paymentPolicy: 'A 30% advance deposit is required upon booking confirmation to secure your date and reserve materials. The remaining balance (70%) is due upon completion of on-site setup inspection before the event starts. We accept UPI, Google Pay, PhonePe, Paytm, IMPS / Net Banking, and cash.',
  instagramHandle: '@auraluxe.delhi',
  facebookUrl: 'https://facebook.com/auraluxeevents',
  pinterestUrl: 'https://pinterest.com/auraluxeevents'
};
