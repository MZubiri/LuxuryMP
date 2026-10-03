/**
 * LUXURY MACHUPICCHU PERU - FRONTEND APPLICATION
 * Haute Couture Andean Travel & Belmond-Inspired Experience
 */

// Application State
const appState = {
  currentLang: 'en',
  currentCurrency: 'USD',
  exchangeRateUsdToPen: 3.80,
  activeCategory: 'all',
  selectedTour: null,
  tours: []
};

// Bilingual Dictionary (EN / ES)
const translations = {
  en: {
    topBarTag: "OFFICIAL LICENSED OPERATOR",
    topBarRuc: "RUC: 20601622492",
    topBarLic: "GERCETUR CERTIFIED • MINCETUR AUTHORIZED • ESNNA COMPLIANT",
    navExpeditions: "Expeditions",
    navRail: "Hiram Bingham Rail",
    navPhilosophy: "The Belmond Distinction",
    navChronicles: "Guest Chronicles",
    navContact: "Concierge",
    btnBespokeInquiry: "Bespoke Inquiry",
    heroBadge: "HAUTE COUTURE ANDEAN TRAVEL • EST. 2016",
    heroHeadline: "The Art of Andean Wonder",
    heroSubhead: "Bespoke journeys aboard the Belmond Hiram Bingham, private tours led by certified master archaeologists, and handcrafted luxury across the Inca empire.",
    btnHeroExplore: "Explore Our Journeys",
    btnHeroConcierge: "Consult Private Concierge",
    cred1: "Tailor-Made Private Journeys",
    cred2: "Belmond Preferred Access & Priority Logistics",
    cred3: "Dedicated In-Country Concierge",
    plannerJourneyLabel: "JOURNEY EXPERIENCE",
    plannerDateLabel: "TRAVEL DATE",
    plannerGuestsLabel: "GUESTS",
    btnPlannerSubmit: "CHECK AVAILABILITY",
    optAllJourneys: "All Curated Journeys",
    optHb: "Belmond Hiram Bingham Signature",
    optSanctuary: "Sanctuary Privé & Sunrise Access",
    optValley: "Sacred Valley & Shamanic Ritual",
    optAndean: "Belmond Andean Explorer Sleeper",
    optGlamping: "Inca Trail VIP Glamping",
    kickerExpeditions: "OUR CURATED EXPEDITIONS",
    titleExpeditions: "The Andean Collections",
    introExpeditions: "Each journey is meticulously orchestrated down to the finest nuance: private collector train carriages, world-renowned Andean culinary pairings, and exclusive sanctuary entries.",
    catAll: "All Expeditions",
    catRail: "Luxury Rail",
    catSanctuary: "Sanctuary Privé",
    catValley: "Sacred Valley & Mysticism",
    catGlamping: "VIP Glamping",
    kickerPhilosophy: "THE HAUTE COUTURE DIFFERENCE",
    titlePhilosophy: "Unrivalled Exclusivity in the Cloud Forest",
    bodyPhilosophy1: "While standard tourism subjects travelers to exhausting queues and crowded buses, Luxury Machupicchu Peru choreographs every arrival with seamless distinction.",
    bodyPhilosophy2: "From the polished mahogany observation cars of the Belmond Hiram Bingham to champagne toasts at the private panoramic terraces of Belmond Sanctuary Lodge, our guests experience the ancient citadel in supreme tranquility.",
    pillar1Title: "Private Archaeologist Curation",
    pillar1Desc: "Certified master historians and archaeologists who reveal the architectural genius, sacred astronomy, and hidden symbolism in an unhurried private tour.",
    pillar2Title: "Michelin-Caliber Gastronomy",
    pillar2Desc: "Degustation menus crafted with organic high-altitude harvests, paired with exceptional South American vintages.",
    pillar3Title: "Uncompromised Compliance",
    pillar3Desc: "Licensed under RUC 20601622492, verified by GERCETUR and protected by full in-country operational permits.",
    spotlightBadge: "FEATURED SIGNATURE RAIL JOURNEY",
    spotlightTitle: "The Belmond Hiram Bingham Experience",
    spotlightDesc: "Named after the explorer who reintroduced the citadel to the world, this train embodies the glamorous golden age of 1920s travel. Bar cars with baby grand pianos, fine wines, and privileged citadel access.",
    btnViewHiramBingham: "View Complete Itinerary",
    btnBookHiramBingham: "Reserve This Train",
    kickerChronicles: "GUEST CHRONICLES",
    titleChronicles: "Words from Discerning Travelers",
    review1Text: "\"The Hiram Bingham excursion organized by Luxury Machupicchu was an absolute triumph. Having our own private archaeologist made the ancient stone structures come alive without a moment in queues.\"",
    review2Text: "\"Every single detail was breathtaking—from the bespoke champagne greeting at our Sacred Valley hotel to the private Q'ero shaman blessing. True haute couture travel.\"",
    review3Text: "\"The glamping setup on the Inca Trail exceeded five-star hotel standards. Hot showers, heated dome beds, and a private chef serving duck magret at 3,600 meters.\"",
    kickerConcierge: "BESPOKE ATELIER",
    titleConcierge: "Design Your Private Journey",
    descConcierge: "Allow our travel architects in Cusco to orchestrate a private itinerary calibrated to your specific desires, schedules, and travel party.",
    conciergeDesk: "Private Concierge Desk",
    conciergeDirectLine: "VIP Direct Line & WhatsApp",
    conciergeEmail: "Official Inquiries",
    formTitle: "Request Private Consultation",
    formSubtitle: "A senior travel architect will reply within 4 hours.",
    labelFullName: "Full Name *",
    labelEmail: "Email Address *",
    labelPhone: "Phone / WhatsApp *",
    labelDest: "Preferred Journey Focus",
    labelTravelers: "Number of Travelers",
    labelDuration: "Estimated Duration",
    labelNotes: "Special Wishes or Preferences",
    btnSubmitConcierge: "DISPATCH VIP INQUIRY",
    footerDesc: "Official luxury travel atelier dedicated to private, bespoke expeditions through the Sacred Valley, Machu Picchu Sanctuary, and the High Andes.",
    footerExpeditions: "Expeditions",
    footerCertifications: "Certifications",
    footerConciergeDirect: "Direct Contact",
    waTooltip: "VIP Concierge 24/7",
    btnViewItinerary: "View Itinerary",
    btnReserve: "Reserve",
    pricePerPerson: "From",
    drawerPretitle: "RESERVATION DESK",
    drawerDefaultTitle: "Reserve Your Journey",
    lblPerPerson: "Price per Traveler:",
    lblEstimatedTotal: "Estimated Total:",
    tagTaxInclusive: "Includes all luxury rail permits, sanctuary entries & private archaeologist",
    labelTravelDate: "Preferred Travel Date *",
    labelGuestsCount: "Travelers *",
    labelTrainService: "Train Service Preference",
    labelSpecialRequests: "Bespoke Requirements / Dietary",
    btnConfirmWhatsApp: "CONFIRM WITH CONCIERGE VIA WHATSAPP",
    btnPayDeposit: "HOLD WITH 30% DEPOSIT",
    modalDayPrefix: "Day",
    modalDining: "Gourmet Dining",
    modalTransfer: "Private Transfer",
    modalIncludedTitle: "Curated Inclusions",
    modalReserveBtn: "Reserve This Journey With Concierge"
  },
  es: {
    topBarTag: "OPERADOR OFICIAL AUTORIZADO",
    topBarRuc: "RUC: 20601622492",
    topBarLic: "CERTIFICADO GERCETUR • AUTORIZADO POR MINCETUR • CÓDIGO ESNNA",
    navExpeditions: "Expediciones",
    navRail: "Tren Hiram Bingham",
    navPhilosophy: "La Distinción Belmond",
    navChronicles: "Crónicas de Huéspedes",
    navContact: "Concierge",
    btnBespokeInquiry: "Consulta a Medida",
    heroBadge: "ALTA COSTURA EN VIAJES ANDINOS • EST. 2016",
    heroHeadline: "El Arte del Asombro Andino",
    heroSubhead: "Travesías a medida a bordo del Belmond Hiram Bingham, recorridos privados con arqueólogos certificados y hospitalidad de lujo en el imperio inca.",
    btnHeroExplore: "Explorar Expediciones",
    btnHeroConcierge: "Consultar a Concierge",
    cred1: "Viajes 100% a Medida",
    cred2: "Logística y Abordaje Preferencial Belmond",
    cred3: "Concierge Dedicado en Destino 24/7",
    plannerJourneyLabel: "EXPERIENCIA DE VIAJE",
    plannerDateLabel: "FECHA ESTIMADA",
    plannerGuestsLabel: "VIAJEROS",
    btnPlannerSubmit: "VERIFICAR DISPONIBILIDAD",
    optAllJourneys: "Todas las Expediciones",
    optHb: "Belmond Hiram Bingham Signature",
    optSanctuary: "Santuario Privé y Amanecer Sagrado",
    optValley: "Valle Sagrado y Ritual Chamánico",
    optAndean: "Belmond Andean Explorer Sleeper",
    optGlamping: "Camino Inca VIP Glamping",
    kickerExpeditions: "NUESTRAS EXPEDICIONES DE AUTOR",
    titleExpeditions: "Colecciones Andinas",
    introExpeditions: "Cada travesía se orquesta con absoluta sofisticación: vagones de colección privada, maridajes de alta cocina andina y accesos preferenciales al santuario.",
    catAll: "Todas las Expediciones",
    catRail: "Trenes de Lujo",
    catSanctuary: "Santuario Privé",
    catValley: "Valle Sagrado y Misticismo",
    catGlamping: "Glamping VIP",
    kickerPhilosophy: "LA DIFERENCIA DE ALTA COSTURA",
    titlePhilosophy: "Exclusividad Absoluta en el Bosque de Nubes",
    bodyPhilosophy1: "Mientras el turismo convencional enfrenta largas colas y transportes saturados, Luxury Machupicchu Peru programa cada llegada con distinción impecable.",
    bodyPhilosophy2: "Desde los vagones mirador de caoba pulida del Belmond Hiram Bingham hasta exclusivas catas de champagne en las terrazas privadas del Belmond Sanctuary Lodge, disfrute la ciudadela en plena serenidad.",
    pillar1Title: "Curaduría Arqueológica Privada",
    pillar1Desc: "Historiadores y arqueólogos colegiados que revelan la genialidad arquitectónica, astronomía sagrada y simbolismo andino en un recorrido privado sin prisas.",
    pillar2Title: "Gastronomía Calibre Michelin",
    pillar2Desc: "Menús de degustación elaborados con insumos andinos orgánicos maridados con etiquetas selectas.",
    pillar3Title: "Garantía & Cumplimiento Legal",
    pillar3Desc: "RUC 20601622492, acreditación GERCETUR Cusco y cobertura integral de permisos en sitio.",
    spotlightBadge: "TRAVESÍA FERROVIARIA EMBLEMÁTICA",
    spotlightTitle: "La Experiencia Belmond Hiram Bingham",
    spotlightDesc: "Inspirado en la época dorada de los viajes en los años 1920. Vagón bar con piano acústico, cócteles de autor, alta cocina y acceso prioritario al santuario.",
    btnViewHiramBingham: "Ver Itinerario Completo",
    btnBookHiramBingham: "Reservar Este Tren",
    kickerChronicles: "CRÓNICAS DE HUÉSPEDES",
    titleChronicles: "Testimonios de Viajeros Distinguidos",
    review1Text: "\"La excursión en el Hiram Bingham organizada por Luxury Machupicchu fue un triunfo absoluto. Tener nuestro propio arqueólogo privado hizo que la historia cobrara vida sin esperas.\"",
    review2Text: "\"Cada detalle fue insuperable: desde la copa de champaña en el hotel hasta la bendición del chamán Q'ero en el Valle Sagrado. Auténtico viaje de alta costura.\"",
    review3Text: "\"El glamping en el Camino Inca superó el estándar de hoteles cinco estrellas. Domos climatizados, duchas calientes y chef privado sirviendo magret de pato a 3,600 metros.\"",
    kickerConcierge: "ATELIER A MEDIDA",
    titleConcierge: "Diseñe su Travesía Privada",
    descConcierge: "Permita que nuestros arquitectos de viajes en Cusco organicen un itinerario exclusivo calibrado a sus fechas y preferencias personales.",
    conciergeDesk: "Mesa de Concierge Privado",
    conciergeDirectLine: "Línea VIP Directa & WhatsApp",
    conciergeEmail: "Consultas Oficiales",
    formTitle: "Solicitar Consulta Privada",
    formSubtitle: "Un concierge senior responderá en menos de 4 horas.",
    labelFullName: "Nombre Completo *",
    labelEmail: "Correo Electrónico *",
    labelPhone: "Teléfono / WhatsApp *",
    labelDest: "Destino o Foco Principal",
    labelTravelers: "Número de Viajeros",
    labelDuration: "Duración Estimada",
    labelNotes: "Deseos Especiales o Preferencias",
    btnSubmitConcierge: "ENVIAR SOLICITUD VIP",
    footerDesc: "Atelier de viajes de lujo dedicado a expediciones privadas por el Valle Sagrado, Machu Picchu y los Altos Andes.",
    footerExpeditions: "Expediciones",
    footerCertifications: "Certificaciones",
    footerConciergeDirect: "Contacto Directo",
    waTooltip: "Concierge VIP 24/7",
    btnViewItinerary: "Ver Itinerario",
    btnReserve: "Reservar",
    pricePerPerson: "Desde",
    drawerPretitle: "MESA DE RESERVAS",
    drawerDefaultTitle: "Reserve su Travesía",
    lblPerPerson: "Precio por Viajero:",
    lblEstimatedTotal: "Total Estimado:",
    tagTaxInclusive: "Incluye permisos de tren de lujo, accesos al santuario y arqueólogo privado",
    labelTravelDate: "Fecha de Viaje Deseada *",
    labelGuestsCount: "Viajeros *",
    labelTrainService: "Servicio de Tren Preferido",
    labelSpecialRequests: "Requerimientos Especiales / Dieta",
    btnConfirmWhatsApp: "CONFIRMAR CON CONCIERGE VÍA WHATSAPP",
    btnPayDeposit: "RESERVAR CON DEPÓSITO DEL 30%",
    modalDayPrefix: "Día",
    modalDining: "Alta Gastronomía",
    modalTransfer: "Traslado Privado",
    modalIncludedTitle: "Inclusiones Exclusivas",
    modalReserveBtn: "Reservar Esta Expedición con Concierge"
  }
};

// Default Authentic High-End Expeditions Portfolio
const defaultTours = [
  {
    id: 1,
    slug: 'belmond-hiram-bingham-pinnacle',
    categoryId: 'luxury-rail-journeys',
    styleTag: 'Belmond Hiram Bingham Signature',
    titleEn: 'Belmond Hiram Bingham: The Pinnacle of Machu Picchu',
    titleEs: 'Belmond Hiram Bingham: La Cúspide de Machu Picchu',
    subtitleEn: 'The ultimate 1920s Pullman rail luxury, private sanctuary entry and five-star Andean gastronomy.',
    subtitleEs: 'El máximo lujo ferroviario estilo Pullman años 20, entrada privada al santuario y alta gastronomía andina.',
    durationEn: '2 Days / 1 Night',
    durationEs: '2 Días / 1 Noche',
    priceUsd: 2150.00,
    pricePen: 8170.00,
    difficultyEn: 'Leisure & Refined',
    difficultyEs: 'Placentero y Exclusivo',
    altitudeMax: '2,430 m / 7,972 ft',
    mainImageUrl: 'assets/images/hiram_bingham_main.jpg',
    galleryImages: [
      'assets/images/hiram_bingham_main.jpg',
      'assets/images/hiram_bingham_musicians.jpg',
      'assets/images/hiram_bingham_valley.jpg'
    ],
    highlightsEn: [
      'Roundtrip tickets aboard the vintage Belmond Hiram Bingham',
      'Gourmet 4-course brunch & dinner paired with vintage wines',
      'Exclusive Afternoon Tea at Belmond Sanctuary Lodge',
      'Private licensed archaeologist guide with pre-reserved priority entry'
    ],
    highlightsEs: [
      'Boletos ida y vuelta a bordo del tren Belmond Hiram Bingham',
      'Brunch gourmet de 4 tiempos y cena de gala con vinos selectos',
      'Afternoon Tea exclusivo en los jardines de Belmond Sanctuary Lodge',
      'Guía arqueólogo privado colegiado y boletos oficiales pre-reservados'
    ],
    itineraries: [
      {
        dayNumber: 1,
        titleEn: 'Boarding the Legend & Sunset at the Citadel',
        titleEs: 'Abordaje de Leyenda y Atardecer en la Ciudadela',
        descEn: 'Morning departure from Poroy/Ollantaytambo. Gourmet brunch served on board with live acoustic music. Private citadel exploration with your archaeologist at twilight. Sunset tea at Belmond Sanctuary Lodge.',
        descEs: 'Salida matutina hacia Aguas Calientes con brunch gourmet y música en vivo. Llegada con bus VIP y recorrido privado de la ciudadela al atardecer. Té de gala en Belmond Sanctuary Lodge.',
        diningEn: '4-Course Champagne Brunch & Belmond Afternoon Tea',
        diningEs: 'Brunch de 4 tiempos con Champaña y Té Belmond',
        transferEn: 'Private luxury sedan to train station + VIP citadel shuttle',
        transferEs: 'Sedán de lujo a estación + Bus VIP al santuario'
      },
      {
        dayNumber: 2,
        titleEn: 'Sunrise Citadel Solitude & Return Gala Dinner',
        titleEs: 'Amanecer Místico y Cena de Gala de Retorno',
        descEn: 'Early morning second entry to witness dawn mist parting over the Sun Temple. Optional Huayna Picchu ascent. Return journey aboard Hiram Bingham with live band and four-course dinner banquet.',
        descEs: 'Segundo ingreso matutino temprano para presenciar el amanecer sobre el Templo del Sol. Subida opcional a Huayna Picchu. Retorno festivo en el Hiram Bingham con orquesta y cena de gala.',
        diningEn: 'Sanctuary Lodge gourmet lunch & 4-Course Gala Dinner on Train',
        diningEs: 'Almuerzo en Sanctuary Lodge y Cena de gala en el tren',
        transferEn: 'Private executive chauffeur to your hotel in Cusco',
        transferEs: 'Chofer ejecutivo privado a su hotel en Cusco'
      }
    ]
  },
  {
    id: 2,
    slug: 'sacred-valley-prive-shamanic-ritual',
    categoryId: 'sacred-valley-mysticism',
    styleTag: 'Heritage & High Gastronomy',
    titleEn: 'Sacred Valley Privé: Maras, Moray & Q\'ero Shamanic Blessing',
    titleEs: 'Valle Sagrado Privé: Maras, Moray y Bendición Chamánica Q\'ero',
    subtitleEn: 'Private haciendas, ancestral pink salt pans, and an intimate Pachamama blessing with an Andean master.',
    subtitleEs: 'Haciendas privadas, salineras rosadas y pago a la Pachamama con un sabio maestro Q\'ero.',
    durationEn: 'Full Day (8 Hours)',
    durationEs: 'Día Completo (8 Horas)',
    priceUsd: 680.00,
    pricePen: 2584.00,
    difficultyEn: 'Gentle & Inspiring',
    difficultyEs: 'Suave y Reparador',
    altitudeMax: '3,500 m / 11,480 ft',
    mainImageUrl: 'assets/images/sacred_valley_maras_main.jpg',
    galleryImages: [
      'assets/images/sacred_valley_maras_main.jpg',
      'assets/images/sacred_valley_moray.jpg',
      'assets/images/sacred_valley_qero.jpg'
    ],
    highlightsEn: [
      'Executive Mercedes-Benz Sprinter with private chauffeur',
      'Authentic Andean blessing by a genuine Q\'ero Pampamesayoc',
      'Private luncheon at Hacienda Huayoccari with wine pairing',
      'Peruvian Paso Horse private demonstration'
    ],
    highlightsEs: [
      'Mercedes-Benz Sprinter ejecutiva con chofer privado',
      'Ceremonia ancestral auténtica con maestro chamán Q\'ero',
      'Almuerzo privado en Hacienda Huayoccari con maridaje',
      'Demostración privada de caballos peruanos de paso'
    ],
    itineraries: [
      {
        dayNumber: 1,
        titleEn: 'Inca Agricultural Wonders & Ancestral Blessing',
        titleEs: 'Laboratorios Agrícolas y Ceremonia a la Tierra',
        descEn: 'Private transfer to Moray circular terraces and Maras salt pans. Intimate Pachamama ceremony in private estate gardens. Multi-course lunch at historic Hacienda Huayoccari surrounded by folk art treasures.',
        descEs: 'Traslado privado a los andenes concéntricos de Moray y salineras de Maras. Ceremonia íntima de agradecimiento a la tierra en jardines privados. Banquete en Hacienda Huayoccari.',
        diningEn: 'Artisanal 4-course Andean lunch at Hacienda Huayoccari',
        diningEs: 'Almuerzo artesanal de 4 tiempos en Hacienda Huayoccari',
        transferEn: 'Mercedes-Benz Executive Sprinter with oxygen & amenities',
        transferEs: 'Mercedes-Benz Sprinter ejecutiva con oxígeno y amenities'
      }
    ]
  },
  {
    id: 3,
    slug: 'belmond-andean-explorer-cusco-titicaca',
    categoryId: 'luxury-rail-journeys',
    styleTag: 'Belmond Sleeper Train',
    titleEn: 'Belmond Andean Explorer: High Altiplano to Lake Titicaca',
    titleEs: 'Belmond Andean Explorer: Del Altiplano al Lago Titicaca',
    subtitleEn: 'South America\'s premier luxury sleeper train across high plateaus and private island sanctuaries.',
    subtitleEs: 'El primer tren de lujo con suites dormitorio de Sudamérica a través del altiplano y el Titicaca.',
    durationEn: '2 Days / 1 Night',
    durationEs: '2 Días / 1 Noche',
    priceUsd: 3450.00,
    pricePen: 13110.00,
    difficultyEn: 'Ultra-Luxury Leisure',
    difficultyEs: 'Lujo Pleno & Contemplativo',
    altitudeMax: '4,319 m / 14,170 ft (La Raya)',
    mainImageUrl: 'assets/images/andean_explorer_main.jpg',
    galleryImages: [
      'assets/images/andean_explorer_main.jpg',
      'assets/images/andean_explorer_titicaca.jpg',
      'assets/images/andean_explorer_laraya.jpg'
    ],
    highlightsEn: [
      'Private suite cabin with en-suite bath on Belmond Andean Explorer',
      'Observation car cocktail lounge with open-air terrace',
      'Champagne toast at La Raya mountain pass (4,319m)',
      'Private yacht charter to floating Uros and secluded Taquile beach'
    ],
    highlightsEs: [
      'Suite privada con baño en el tren Belmond Andean Explorer',
      'Vagón observatorio y piano bar con terraza al aire libre',
      'Brindis con champaña en el abra de La Raya a 4,319 msnm',
      'Yate privado en el Lago Titicaca hacia Uros y playa exclusiva en Taquile'
    ],
    itineraries: [
      {
        dayNumber: 1,
        titleEn: 'Cusco to the High Altiplano Plateau',
        titleEs: 'De Cusco hacia el Altiplano Sagrado',
        descEn: 'Board at Wanchaq station. Scenic lunch while crossing the Vilcanota valley. Afternoon stop at Raqch\'i Inca temple. Sunset champagne celebration at La Raya.',
        descEs: 'Embarque en la estación Wanchaq. Almuerzo gourmet cruzando el valle de Vilcanota. Visita al templo de Raqch\'i y brindis al atardecer en La Raya.',
        diningEn: 'Degustation menus by celebrated Chef Diego Muñoz',
        diningEs: 'Menús de autor diseñados por el chef Diego Muñoz',
        transferEn: 'Train station VIP reception and private porterage',
        transferEs: 'Recepción VIP en estación y manejo privado de equipaje'
      },
      {
        dayNumber: 2,
        titleEn: 'Sunrise on Lake Titicaca & Private Island Navigation',
        titleEs: 'Amanecer en el Titicaca y Navegación Privada',
        descEn: 'Wake up to the sun rising over Lake Titicaca. Board a private yacht to visit traditional reed islands of Uros and a private cultural encounter on Taquile island.',
        descEs: 'Despierte con el sol sobre el lago navegable más alto del mundo. Traslado en yate privado a las islas flotantes de los Uros y almuerzo frente a la bahía de Taquile.',
        diningEn: 'Gourmet lakeside barbecue in Taquile with fresh trout',
        diningEs: 'Almuerzo campestre con trucha fresca del lago en Taquile',
        transferEn: 'Private yacht charter on Lake Titicaca',
        transferEs: 'Yate privado exclusivo en el Lago Titicaca'
      }
    ]
  },
  {
    id: 4,
    slug: 'classic-inca-trail-vip-glamping',
    categoryId: 'vip-glamping-expeditions',
    styleTag: 'VIP Glamping & Wellness',
    titleEn: 'Classic Inca Trail VIP Glamping: The Royal Route',
    titleEs: 'Camino Inca Clásico VIP Glamping: La Ruta Real',
    subtitleEn: 'Conquer the ancient stone path with heated dome suites, on-trail massage therapist, and private chef.',
    subtitleEs: 'Camine la mítica calzada inca con domos calefaccionados, masajista y chef gourmet en ruta.',
    durationEn: '4 Days / 3 Nights',
    durationEs: '4 Días / 3 Noches',
    priceUsd: 2890.00,
    pricePen: 10982.00,
    difficultyEn: 'Challenging with Elite Support',
    difficultyEs: 'Exigente con Soporte Élite',
    altitudeMax: '4,215 m / 13,828 ft',
    mainImageUrl: 'assets/images/inca_trail_main.jpg',
    galleryImages: [
      'assets/images/inca_trail_main.jpg',
      'assets/images/inca_trail_winay_wayna.jpg',
      'assets/images/inca_trail_sungate.jpg'
    ],
    highlightsEn: [
      'Spacious heated geodesic domes with real beds and warm duvets',
      'Private hot shower tent set up every single afternoon',
      'Dedicated on-trail massage therapist for daily muscle recovery',
      'Private entry through the Sun Gate (Inti Punku) in solitude'
    ],
    highlightsEs: [
      'Amplios domos geodésicos calefaccionados con camas de verdad',
      'Carpa de ducha caliente instalada al final de cada jornada',
      'Masajista / fisioterapeuta privado para recuperación diaria',
      'Ingreso triunfal por la Puerta del Sol (Inti Punku) sin aglomeraciones'
    ],
    itineraries: [
      {
        dayNumber: 1,
        titleEn: 'Valley of Patallacta & Gentle Ascent',
        titleEs: 'Valle de Patallacta y Ascenso Suave',
        descEn: 'Scenic drive to Km 82. Easy trek along the Urubamba river, overlooking Patallacta archaeological site. Arrival at private luxury camp with welcome massage.',
        descEs: 'Inicio en el Km 82. Caminata suave junto al río con vistas a Patallacta. Llegada al campamento exclusivo con masaje de bienvenida y té caliente.',
        diningEn: 'Hot 3-course organic lunch and dinner in heated dining tent',
        diningEs: 'Almuerzo y cena caliente de 3 tiempos en carpa comedor',
        transferEn: 'Private 4x4 overland from Cusco to trailhead',
        transferEs: 'Transporte privado 4x4 desde Cusco al punto de inicio'
      },
      {
        dayNumber: 2,
        titleEn: 'Dead Woman\'s Pass (Warmiwañusqa)',
        titleEs: 'Paso de la Mujer Muerta (4,215 msnm)',
        descEn: 'Ascent to the highest pass with personal porters and hyperbaric oxygen chambers on standby. Rewarding descent to Pacaymayo private camp.',
        descEs: 'Ascenso al paso más alto con apoyo continuo de porteadores y oxígeno medicinal. Descenso reconfortante al campamento privado de Pacaymayo.',
        diningEn: 'High-energy gourmet trail cuisine and hot herbal infusions',
        diningEs: 'Cocina energética de alta montaña y calientes infusiones',
        transferEn: 'Porterage brigade carrying all personal luggage',
        transferEs: 'Brigada de porteadores transportando todo el equipaje'
      },
      {
        dayNumber: 3,
        titleEn: 'Cloud Forests of Wiñay Wayna',
        titleEs: 'Bosque de Nubes y Wiñay Wayna',
        descEn: 'Traverse magnificent Inca staircases, tunnel passages, and orchid forests to the terraces of Wiñay Wayna. Gala celebration dinner crafted by your private chef.',
        descEs: 'Paso por escalinatas incas, túneles tallados en roca y orquídeas hacia Wiñay Wayna. Cena de gala de celebración preparada por su chef privado.',
        diningEn: 'Gala trail celebration feast with chef\'s specialty Andean lamb',
        diningEs: 'Cena de gala en la montaña con especialidad de cordero andino',
        transferEn: 'Private camp setup with hot showers',
        transferEs: 'Campamento privado exclusivo con duchas calientes'
      },
      {
        dayNumber: 4,
        titleEn: 'Inti Punku Sun Gate & Machu Picchu Sanctuary',
        titleEs: 'Puerta del Sol (Inti Punku) y Machu Picchu',
        descEn: 'Sunrise hike to the Sun Gate for the iconic first glimpse of Machu Picchu. Private tour of the Citadel followed by luxury return on the Hiram Bingham.',
        descEs: 'Llegada al amanecer a la Puerta del Sol con vista panorámica de la ciudadela. Tour privado completo y retorno en el tren de lujo Hiram Bingham.',
        diningEn: 'Celebration lunch at Sanctuary Lodge & dinner on train',
        diningEs: 'Almuerzo en Sanctuary Lodge y cena en el tren de lujo',
        transferEn: 'Luxury Hiram Bingham train return to Cusco',
        transferEs: 'Retorno en el tren Belmond Hiram Bingham a Cusco'
      }
    ]
  }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('luxury_lang');
  if (savedLang === 'en' || savedLang === 'es') {
    appState.currentLang = savedLang;
  }
  const savedCurr = localStorage.getItem('luxury_currency');
  if (savedCurr === 'USD' || savedCurr === 'PEN') {
    appState.currentCurrency = savedCurr;
  }

  appState.tours = defaultTours;
  renderTours();
  setLanguage(appState.currentLang);
  setCurrency(appState.currentCurrency);
  setupScrollListener();
  setupAnchorSmoothScroll();
  initPlannerMinDate();
  tryFetchToursFromBackend();
});

// Setup minimum date on inputs to today + 2 days
function initPlannerMinDate() {
  const dateInput = document.getElementById('plannerDate');
  const bookingDateInput = document.getElementById('bookingDate');
  const future = new Date();
  future.setDate(future.getDate() + 2);
  const minStr = future.toISOString().split('T')[0];
  if (dateInput) dateInput.min = minStr;
  if (bookingDateInput) bookingDateInput.min = minStr;
}

// Robust API fetch helper: In Coolify/Docker/Nginx uses relative /api, in split local dev falls back to :5000
async function fetchApi(endpoint, options = {}) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : '/' + endpoint;
  try {
    const res = await fetch(`/api${cleanEndpoint}`, options);
    if (res.ok) return res;
    if (res.status === 404 && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      return await fetch(`http://localhost:5000/api${cleanEndpoint}`, options);
    }
    return res;
  } catch (err) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return await fetch(`http://localhost:5000/api${cleanEndpoint}`, options);
    }
    throw err;
  }
}

// Fetch live tours from .NET 9 API if online
async function tryFetchToursFromBackend() {
  try {
    const res = await fetchApi(`/tours?lang=${appState.currentLang}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        console.log('Synchronized tours from .NET 9 backend:', data);
        // Map backend DTOs to local state if needed
      }
    }
  } catch {
    console.log('Operating in standalone mode with cached luxury catalog.');
  }
}

// Language Switcher
function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'es') return;
  appState.currentLang = lang;
  localStorage.setItem('luxury_lang', lang);

  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('data-lang', lang);

  document.getElementById('btnLangEn')?.classList.toggle('active', lang === 'en');
  document.getElementById('btnLangEs')?.classList.toggle('active', lang === 'es');

  applyLanguage(lang);
  renderTours();
}

function applyLanguage(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Re-render open modals or drawer summaries if active
  if (appState.selectedTour) {
    updateDrawerTourTitle();
  }
}

// Currency Switcher
function setCurrency(currency) {
  if (currency !== 'USD' && currency !== 'PEN') return;
  appState.currentCurrency = currency;
  localStorage.setItem('luxury_currency', currency);

  document.documentElement.setAttribute('data-currency', currency);
  document.getElementById('btnUsd')?.classList.toggle('active', currency === 'USD');
  document.getElementById('btnPen')?.classList.toggle('active', currency === 'PEN');

  renderTours();
  recalculateDrawerTotal();
}

// Format Price
function formatPrice(usdPrice, penPrice) {
  if (appState.currentCurrency === 'USD') {
    return `$${usdPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} USD`;
  } else {
    const penVal = penPrice || (usdPrice * appState.exchangeRateUsdToPen);
    return `S/. ${penVal.toLocaleString('es-PE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} PEN`;
  }
}

// Filter Tours by Category
function filterTours(category, triggerBtn) {
  appState.activeCategory = category;

  if (triggerBtn) {
    document.querySelectorAll('.filter-pill').forEach(btn => btn.classList.remove('active'));
    triggerBtn.classList.add('active');
  }

  renderTours();
}

// Render Tours Grid
function renderTours() {
  const container = document.getElementById('toursGrid');
  if (!container) return;

  const isEs = appState.currentLang === 'es';
  const dict = translations[appState.currentLang];

  const filtered = appState.activeCategory === 'all'
    ? appState.tours
    : appState.tours.filter(t => t.categoryId === appState.activeCategory);

  container.innerHTML = filtered.map(tour => {
    const title = isEs ? tour.titleEs : tour.titleEn;
    const subtitle = isEs ? tour.subtitleEs : tour.subtitleEn;
    const duration = isEs ? tour.durationEs : tour.durationEn;
    const highlights = isEs ? tour.highlightsEs : tour.highlightsEn;
    const priceDisplay = formatPrice(tour.priceUsd, tour.pricePen);

    return `
      <article class="tour-card" id="tour-card-${tour.id}">
        <div class="tour-card-media">
          <img src="${tour.mainImageUrl}" alt="${title}" class="tour-card-img" loading="lazy">
          <span class="tour-style-badge">${tour.styleTag}</span>
        </div>
        <div class="tour-card-body">
          <div class="tour-meta-row">
            <span>${duration}</span>
            <span>${tour.altitudeMax}</span>
          </div>
          <h3 class="tour-title">${title}</h3>
          <p class="tour-subtitle">${subtitle}</p>

          <ul class="tour-highlights-list">
            ${highlights.slice(0, 3).map(h => `<li><span>✦</span> ${h}</li>`).join('')}
          </ul>

          <div class="tour-pricing-footer">
            <div class="price-box">
              <span class="price-from">${dict.pricePerPerson}</span>
              <span class="price-value">${priceDisplay}</span>
            </div>
            <div class="tour-actions">
              <a href="tour.html?slug=${tour.slug}" class="btn-itinerary-link" style="text-decoration:none; display:inline-flex; align-items:center; justify-content:center;">
                ${dict.btnViewItinerary}
              </a>
              <button class="btn-card-reserve" onclick="openBookingDrawerForTour('${tour.slug}')">
                ${dict.btnReserve}
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Modal Deep Dive Controller
function openTourModalBySlug(slug) {
  const tour = appState.tours.find(t => t.slug === slug);
  if (!tour) return;

  const modal = document.getElementById('tourModal');
  const body = document.getElementById('tourModalBody');
  const isEs = appState.currentLang === 'es';
  const dict = translations[appState.currentLang];

  const title = isEs ? tour.titleEs : tour.titleEn;
  const subtitle = isEs ? tour.subtitleEs : tour.subtitleEn;
  const duration = isEs ? tour.durationEs : tour.durationEn;
  const difficulty = isEs ? tour.difficultyEs : tour.difficultyEn;
  const priceDisplay = formatPrice(tour.priceUsd, tour.pricePen);

  body.innerHTML = `
    <div class="modal-header-banner" style="background-image: url('${tour.mainImageUrl}');">
      <div class="modal-header-overlay">
        <span class="tour-style-badge" style="position:static; display:inline-block; margin-bottom: 0.5rem;">${tour.styleTag}</span>
        <h2>${title}</h2>
        <p>${subtitle}</p>
      </div>
    </div>

    <div class="modal-body-content">
      <div class="modal-stats-bar">
        <div class="modal-stat-box">
          <span>${isEs ? 'DURACIÓN' : 'DURATION'}</span>
          <strong>${duration}</strong>
        </div>
        <div class="modal-stat-box">
          <span>${isEs ? 'ALTITUD MÁX' : 'MAX ALTITUDE'}</span>
          <strong>${tour.altitudeMax}</strong>
        </div>
        <div class="modal-stat-box">
          <span>${isEs ? 'RITMO' : 'PACE'}</span>
          <strong>${difficulty}</strong>
        </div>
        <div class="modal-stat-box">
          <span>${isEs ? 'TARIFA EXCLUSIVA' : 'PRICE PER PERSON'}</span>
          <strong style="color: var(--color-gold);">${priceDisplay}</strong>
        </div>
      </div>

      ${tour.galleryImages && tour.galleryImages.length > 0 ? `
        <div style="margin-bottom: 2rem;">
          <h4 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: 0.75rem; color: var(--color-obsidian);">
            ${isEs ? 'Galería Fotográfica de la Expedición' : 'Expedition Photographic Chronicle'}
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem;">
            ${tour.galleryImages.map(img => `
              <div style="border-radius: 6px; overflow: hidden; height: 140px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); background: #121316;">
                <img src="${img}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" onmouseover="this.style.transform='scale(1.06)'" onmouseout="this.style.transform='scale(1)'">
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <h3 style="font-family: var(--font-serif); font-size: 1.8rem; margin-bottom: 1.25rem;">
        ${isEs ? 'Itinerario Detallado Día por Día' : 'Day-by-Day Curated Itinerary'}
      </h3>

      <div class="itinerary-days-container">
        ${tour.itineraries.map(day => `
          <div class="itinerary-day-card">
            <span class="itinerary-day-num">${dict.modalDayPrefix} ${day.dayNumber}</span>
            <h4 class="itinerary-day-title">${isEs ? day.titleEs : day.titleEn}</h4>
            <p class="itinerary-day-desc">${isEs ? day.descEs : day.descEn}</p>
            <div class="itinerary-perks">
              <div><span>${dict.modalDining}:</span> <strong>${isEs ? day.diningEs : day.diningEn}</strong></div>
              <div><span>${dict.modalTransfer}:</span> <strong>${isEs ? day.transferEs : day.transferEn}</strong></div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="modal-actions-footer">
        <div>
          <span style="font-size: 0.85rem; color: var(--color-text-muted);">${dict.pricePerPerson}</span>
          <div style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--color-obsidian); font-weight: 600;">
            ${priceDisplay}
          </div>
        </div>
        <button class="btn-hero-gold" onclick="closeTourModal(); openBookingDrawerForTour('${tour.slug}')">
          ${dict.modalReserveBtn}
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeTourModal() {
  const modal = document.getElementById('tourModal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

// Booking Drawer Controller
function openBookingDrawerForTour(slug) {
  const tour = appState.tours.find(t => t.slug === slug) || appState.tours[0];
  appState.selectedTour = tour;

  const drawer = document.getElementById('bookingDrawer');
  const tourIdInput = document.getElementById('bookingTourId');
  if (tourIdInput) tourIdInput.value = tour.id;

  updateDrawerTourTitle();
  recalculateDrawerTotal();

  drawer.classList.add('active');
  drawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function updateDrawerTourTitle() {
  if (!appState.selectedTour) return;
  const isEs = appState.currentLang === 'es';
  const drawerTitle = document.getElementById('drawerTourTitle');
  if (drawerTitle) {
    drawerTitle.textContent = isEs ? appState.selectedTour.titleEs : appState.selectedTour.titleEn;
  }
}

function recalculateDrawerTotal() {
  if (!appState.selectedTour) return;

  const guestsSelect = document.getElementById('bookingGuests');
  const guests = parseInt(guestsSelect?.value || '2', 10);

  const pricePerPerson = appState.selectedTour.priceUsd;
  const pricePenPerPerson = appState.selectedTour.pricePen;

  const totalUsd = pricePerPerson * guests;
  const totalPen = pricePenPerPerson * guests;

  const summaryPrice = document.getElementById('summaryPricePerPerson');
  const summaryTotal = document.getElementById('summaryTotalQuote');

  if (summaryPrice) {
    summaryPrice.textContent = formatPrice(pricePerPerson, pricePenPerPerson);
  }

  if (summaryTotal) {
    summaryTotal.textContent = formatPrice(totalUsd, totalPen);
  }
}

function closeBookingDrawer() {
  const drawer = document.getElementById('bookingDrawer');
  if (drawer) {
    drawer.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

// Handle Direct Booking Submission (Posts to API and dispatches to VIP WhatsApp)
async function handleBookingFormSubmit(event) {
  event.preventDefault();
  const tour = appState.selectedTour || appState.tours[0];
  const isEs = appState.currentLang === 'es';

  const name = document.getElementById('bookingFullName').value;
  const email = document.getElementById('bookingEmail').value;
  const phone = document.getElementById('bookingPhone').value;
  const date = document.getElementById('bookingDate').value;
  const guests = document.getElementById('bookingGuests').value;
  const train = document.getElementById('bookingTrain').value;
  const notes = document.getElementById('bookingSpecialRequests').value;

  const totalUsd = tour.priceUsd * parseInt(guests, 10);
  const totalPen = tour.pricePen * parseInt(guests, 10);
  const totalFormatted = formatPrice(totalUsd, totalPen);

  const statusBox = document.getElementById('bookingStatusBox');
  statusBox.innerHTML = '<span style="color: var(--color-gold);">Generating VIP WhatsApp dispatch...</span>';

  // 1. Send to .NET 9 Web API in background
  try {
    fetchApi('/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tourId: tour.id,
        fullName: name,
        email: email,
        phone: phone,
        numberOfGuests: parseInt(guests, 10),
        travelDate: date ? new Date(date).toISOString() : null,
        trainPreference: train,
        specialRequests: notes,
        preferredLanguage: appState.currentLang
      })
    }).catch(() => {});
  } catch {}

  // 2. Format WhatsApp direct dispatch to Luxury Machupicchu Concierge (+51 958 195 840)
  const tourTitle = isEs ? tour.titleEs : tour.titleEn;
  const waNumber = '51958195840';

  const waMessage = isEs
    ? `✨ *Luxury Machupicchu Peru - Solicitud de Reserva VIP*\n\n` +
      `Estimado Concierge, mi nombre es *${name}*.\n\n` +
      `🏛️ *Expedición:* ${tourTitle}\n` +
      `👥 *Viajeros:* ${guests} persona(s)\n` +
      `📅 *Fecha Deseada:* ${date || 'A coordinar'}\n` +
      `🚆 *Servicio Ferroviario:* ${train}\n` +
      `💰 *Monto Estimado:* ${totalFormatted}\n` +
      (notes ? `✉️ *Notas Especiales:* ${notes}\n` : '') +
      `\nSolicito confirmación de disponibilidad y reserva oficial de boletos al santuario.`
    : `✨ *Luxury Machupicchu Peru - VIP Journey Booking Request*\n\n` +
      `Dear Concierge, my name is *${name}*.\n\n` +
      `🏛️ *Expedition:* ${tourTitle}\n` +
      `👥 *Guests:* ${guests} traveler(s)\n` +
      `📅 *Target Date:* ${date || 'To be confirmed'}\n` +
      `🚆 *Rail Service:* ${train}\n` +
      `💰 *Estimated Total:* ${totalFormatted}\n` +
      (notes ? `✉️ *Special Notes:* ${notes}\n` : '') +
      `\nI request journey availability confirmation and official sanctuary reservations verification.`;

  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  statusBox.innerHTML = `
    <span style="color: #20BD5A; font-weight: 500;">
      ✓ ${isEs ? 'Redirigiendo a Concierge WhatsApp...' : 'Connecting to VIP Concierge WhatsApp...'}
    </span>
  `;

  setTimeout(() => {
    window.open(waUrl, '_blank');
  }, 600);
}

// Handle 30% Deposit Checkout Simulation
function handleDepositCheckout() {
  const tour = appState.selectedTour || appState.tours[0];
  const guests = parseInt(document.getElementById('bookingGuests')?.value || '2', 10);
  const totalUsd = tour.priceUsd * guests;
  const depositUsd = Math.round(totalUsd * 0.30);
  const isEs = appState.currentLang === 'es';

  const statusBox = document.getElementById('bookingStatusBox');
  statusBox.innerHTML = `
    <div style="background: var(--color-parchment); padding: 1rem; border-radius: 3px; border: 1px solid var(--color-gold-border);">
      <p style="font-weight: 600; color: var(--color-obsidian); margin-bottom: 0.3rem;">
        ${isEs ? 'Reserva Garantizada con 30% de Depósito' : 'Hold Confirmed with 30% Luxury Deposit'}
      </p>
      <p style="font-size: 0.85rem; color: var(--color-text-muted);">
        ${isEs ? `Monto de depósito: $${depositUsd} USD. Un concierge se comunicará para formalizar la pasarela de pago seguro (Mercado Pago / Transferencia Internacional BCP).` : `Deposit amount: $${depositUsd} USD. A dedicated concierge will contact you with the secure payment link.`}
      </p>
    </div>
  `;
}

// Handle Bespoke Concierge Form
async function handleConciergeSubmit(event) {
  event.preventDefault();
  const isEs = appState.currentLang === 'es';
  const name = document.getElementById('conciergeName').value;
  const email = document.getElementById('conciergeEmail').value;
  const phone = document.getElementById('conciergePhone').value;
  const dest = document.getElementById('conciergeDestination').value;
  const travelers = document.getElementById('conciergeTravelers').value;
  const duration = document.getElementById('conciergeDuration').value;
  const notes = document.getElementById('conciergeNotes').value;

  const statusEl = document.getElementById('formStatus');
  statusEl.className = 'form-status success';
  statusEl.textContent = isEs ? 'Enviando solicitud al Atelier de Concierge...' : 'Dispatching request to the Concierge Atelier...';

  // Format WhatsApp message
  const waNumber = '51958195840';
  const waText = isEs
    ? `🎩 *Luxury Machupicchu Peru - Solicitud de Atelier Privé*\n\n` +
      `Nombre: *${name}*\n` +
      `Email: ${email}\n` +
      `Destino de Interés: *${dest}*\n` +
      `Viajeros: *${travelers}*\n` +
      `Duración: *${duration}*\n` +
      (notes ? `Peticiones Especiales: ${notes}\n` : '') +
      `\nDeseo coordinar una travesía exclusiva a medida.`
    : `🎩 *Luxury Machupicchu Peru - Bespoke Atelier Inquiry*\n\n` +
      `Name: *${name}*\n` +
      `Email: ${email}\n` +
      `Focus: *${dest}*\n` +
      `Guests: *${travelers}*\n` +
      `Duration: *${duration}*\n` +
      (notes ? `Special Notes: ${notes}\n` : '') +
      `\nI wish to orchestrate a custom private journey.`;

  setTimeout(() => {
    statusEl.textContent = isEs ? '✓ Solicitud canalizada con éxito.' : '✓ Inquiry successfully dispatched.';
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`, '_blank');
  }, 500);
}

// Booking Planner Bar submission handler
function handlePlannerSubmit() {
  const journey = document.getElementById('plannerJourney').value;
  const date = document.getElementById('plannerDate').value;
  const guests = document.getElementById('plannerGuests').value;

  if (journey === 'all') {
    scrollToSection('expeditions');
    return;
  }

  // Find matching tour
  let matchedSlug = 'belmond-hiram-bingham-pinnacle';
  if (journey === 'sanctuary-prive') matchedSlug = 'belmond-hiram-bingham-pinnacle';
  if (journey === 'sacred-valley') matchedSlug = 'sacred-valley-prive-shamanic-ritual';
  if (journey === 'andean-explorer') matchedSlug = 'belmond-andean-explorer-cusco-titicaca';
  if (journey === 'inca-trail-glamping') matchedSlug = 'classic-inca-trail-vip-glamping';

  openBookingDrawerForTour(matchedSlug);

  const dateInput = document.getElementById('bookingDate');
  if (dateInput && date) dateInput.value = date;

  const guestsSelect = document.getElementById('bookingGuests');
  if (guestsSelect && guests) {
    guestsSelect.value = guests;
    recalculateDrawerTotal();
  }
}

// Navigation helpers with dynamic header offset
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const nav = document.getElementById('luxuryHeader');
    const navHeight = nav ? nav.offsetHeight : 54;
    const targetY = el.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
    window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
  }
}

function setupAnchorSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        scrollToSection(targetId);
        if (history.pushState) {
          history.pushState(null, null, '#' + targetId);
        }
      }
    });
  });
}

function toggleMenu() {
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  if (drawer) {
    const isOpen = drawer.classList.toggle('active');
    if (backdrop) {
      backdrop.classList.toggle('active', isOpen);
    }
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
}

function openConciergeModal() {
  scrollToSection('contact');
}

function openClaimModal(type) {
  alert(type === 'claims'
    ? 'Libro de Reclamaciones Virtual - Luxury Machupicchu Peru E.I.R.L (RUC: 20601622492). Conforme al Código de Protección y Defensa del Consumidor.'
    : 'All client data is strictly handled under Supreme Privacy and Personal Data Protection laws of Peru.');
}

// Header scroll effect
function setupScrollListener() {
  const header = document.getElementById('luxuryHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });
}
