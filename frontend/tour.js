/**
 * LUXURY MACHUPICCHU PERU - DEDICATED TOUR DETAIL APPLICATION
 * Haute Couture Andean Travel & Belmond-Inspired Experience
 */

// Application State
const appState = {
  currentLang: localStorage.getItem('luxury_lang') || 'en',
  currentCurrency: localStorage.getItem('luxury_currency') || 'USD',
  exchangeRateUsdToPen: 3.80,
  tour: null,
  allTours: []
};

// Bilingual Translations Dictionary
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
    bcHome: "Home",
    bcExpeditions: "Expeditions",
    lblDuration: "DURATION",
    lblAltitude: "MAX ALTITUDE",
    lblPace: "PACE & COMFORT",
    lblGuiding: "GUIDING CURATION",
    valGuiding: "Certified Archaeologist",
    lblCulinary: "GASTRONOMY",
    valCulinary: "Degustation & Wine Pairing",
    titleOverview: "Expedition Narrative & Highlights",
    titleHighlights: "Key Expedition Privileges",
    titleGallery: "Photographic Chronicle",
    titleItinerary: "Day-by-Day Curated Itinerary",
    titleInclusions: "Curated Inclusions & Transparency",
    titleCuratedInclusions: "Included Privileges",
    titleDiscretionary: "Traveler Discretion",
    titleHotels: "Curated Partner Hotel Collection",
    descHotels: "Elevate your Andean stay with our handpicked sanctuary and historic partner properties, where our guests receive preferred check-in, room upgrades subject to availability, and private concierge coordination:",
    titleAdvisory: "Travel Advisory & High-Altitude Guidelines",
    dossierTitle: "Private Expedition Dossier (PDF)",
    dossierSubtitle: "Generate an elegant, printable dossier of this itinerary with daily schedules, logistical specifications, and partner properties.",
    btnDossierPrint: "Print / Download Dossier (PDF)",
    sidebarPriceFrom: "From / Per Traveler",
    sidebarGuaranteed: "✓ Guaranteed 100% Private Departure",
    labelTravelDate: "Preferred Travel Date *",
    labelGuestsCount: "Travelers *",
    lblCarriage: "Preferred Service / Carriage",
    labelFullName: "Lead Traveler Name *",
    labelPhone: "WhatsApp / Mobile *",
    labelSpecialRequests: "Special Wishes / Dietary",
    lblEstimatedTotal: "Estimated Total:",
    btnConfirmWhatsApp: "CONFIRM WITH CONCIERGE VIA WHATSAPP",
    btnRequestBespoke: "Request Bespoke Customization",
    g1: "100% Tailor-Made Private Departures",
    g2: "Pre-Reserved Official Ministry Tickets",
    g3: "GERCETUR Certified • RUC: 20601622492",
    g4: "24/7 Dedicated In-Country Concierge",
    kickerRelated: "CURATED ALTERNATIVES",
    titleRelated: "Complementary Andean Collections",
    footerDesc: "Official luxury travel atelier dedicated to private, bespoke expeditions through the Sacred Valley, Machu Picchu Sanctuary, and the High Andes.",
    footerExpeditions: "Expeditions",
    footerCertifications: "Certifications",
    footerConciergeDirect: "Direct Contact",
    waTooltip: "VIP Concierge 24/7",
    btnViewItinerary: "View Expedition",
    pricePerPerson: "From",
    dayPrefix: "Day",
    modalDining: "Gourmet Dining",
    modalTransfer: "Private Logistics",
    titleGeoAltitude: "Geographic Location & Altitude Profile",
    descGeoAltitude: "Destinations included in this journey, featuring elevation above sea level and ambient oxygen saturation.",
    tagPeruCircuit: "PERU LUXURY CORRIDOR",
    titleMapCard: "Expedition Location & Geographic Map",
    tagAltitudeProfile: "PHYSIOLOGICAL COMFORT",
    titleAltitudeCard: "Altitude Profile & Acclimatization",
    lblStartingAlt: "Starting Altitude",
    lblMaxAlt: "Peak Altitude",
    lblSleepingAlt: "Sleeping Altitude",
    lblElevationScale: "Elevation Comparison & Oxygen Levels",
    lblAcclimatizationProtocol: "VIP Acclimatization Advisory",
    perkOxygenTitle: "Oxygen-Enriched Suites:",
    perkOxygenDesc: "Available at partner properties (Belmond Palacio Nazarenas, Monasterio & Andean Explorer).",
    perkMedicalTitle: "24/7 Medical Concierge:",
    perkMedicalDesc: "Private vehicles carry certified supplemental oxygen concentrators and pulse oximeters.",
    perkInfusionsTitle: "Ancestral Teas:",
    perkInfusionsDesc: "Complimentary sacred Coca and Muña (Andean mint) infusions served upon arrival to soothe digestion.",
    circuitHighlight: "Active Expedition Corridor",
    destAll: "Perú (Overview)",
    destCusco: "Cusco",
    destMp: "Machu Picchu",
    destArq: "Arequipa",
    destPuno: "Puno (Titicaca)",
    destQuitos: "Iquitos (Amazon)",
    destLima: "Lima (Coast)",
    oxygenVsSeaLevel: "Oxygen vs Sea Level",
    effectiveOxygen: "Effective Oxygen",
    elevationMeters: "Elevation",
    statusInTour: "✦ INCLUDED IN THIS TOUR",
    statusExtension: "Available on Custom Extensions",
    climateLabel: "Atmosphere & Climate",
    highlightsLabel: "Signature Highlights",
    interactiveMapHint: "Click any destination or chip to inspect regional altitude, atmosphere, and expedition details."
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
    bcHome: "Inicio",
    bcExpeditions: "Expediciones",
    lblDuration: "DURACIÓN",
    lblAltitude: "ALTITUD MÁXIMA",
    lblPace: "RITMO Y CONFORT",
    lblGuiding: "CURADURÍA DE GUÍA",
    valGuiding: "Arqueólogo Colegiado",
    lblCulinary: "GASTRONOMÍA",
    valCulinary: "Degustación y Maridaje",
    titleOverview: "Narrativa de la Expedición y Destacados",
    titleHighlights: "Privilegios Clave de la Expedición",
    titleGallery: "Crónica Fotográfica",
    titleItinerary: "Itinerario Detallado Día por Día",
    titleInclusions: "Inclusiones Exclusivas y Transparencia",
    titleCuratedInclusions: "Inclusiones Exclusivas",
    titleDiscretionary: "A Discreción del Viajero",
    titleHotels: "Colección de Hoteles de Lujo Asociados",
    descHotels: "Eleve su estadía andina con nuestra selección de hoteles históricos y santuarios asociados, donde nuestros viajeros reciben check-in preferencial, upgrades de habitación sujetos a disponibilidad y atención personalizada de concierge:",
    titleAdvisory: "Recomendaciones de Viaje y Protocolo de Altitud",
    dossierTitle: "Dossier Privado de la Expedición (PDF)",
    dossierSubtitle: "Genere un documento elegante e imprimible con el cronograma diario completo, especificaciones logísticas y propiedades asociadas.",
    btnDossierPrint: "Imprimir / Descargar Dossier (PDF)",
    sidebarPriceFrom: "Desde / Por Viajero",
    sidebarGuaranteed: "✓ Salida 100% Privada Garantizada",
    labelTravelDate: "Fecha de Viaje Deseada *",
    labelGuestsCount: "Viajeros *",
    lblCarriage: "Servicio o Vagón Preferido",
    labelFullName: "Nombre del Viajero Titular *",
    labelPhone: "WhatsApp / Teléfono Móvil *",
    labelSpecialRequests: "Deseos Especiales / Dieta",
    lblEstimatedTotal: "Total Estimado:",
    btnConfirmWhatsApp: "CONFIRMAR CON CONCIERGE VÍA WHATSAPP",
    btnRequestBespoke: "Solicitar Personalización a Medida",
    g1: "Salidas 100% Privadas a Medida",
    g2: "Boletos Oficiales del Ministerio Pre-Reservados",
    g3: "Certificación GERCETUR • RUC: 20601622492",
    g4: "Concierge Dedicado en Destino 24/7",
    kickerRelated: "ALTERNATIVAS DE AUTOR",
    titleRelated: "Colecciones Andinas Complementarias",
    footerDesc: "Atelier de viajes de lujo dedicado a expediciones privadas por el Valle Sagrado, Machu Picchu y los Altos Andes.",
    footerExpeditions: "Expediciones",
    footerCertifications: "Certificaciones",
    footerConciergeDirect: "Contacto Directo",
    waTooltip: "Concierge VIP 24/7",
    btnViewItinerary: "Ver Expedición",
    pricePerPerson: "Desde",
    dayPrefix: "Día",
    modalDining: "Alta Gastronomía",
    modalTransfer: "Logística Privada",
    titleGeoAltitude: "Ubicación Geográfica y Perfil de Altura",
    descGeoAltitude: "Destinos comprendidos en esta expedición, con información de altitud sobre el nivel del mar y nivel de oxígeno.",
    tagPeruCircuit: "CORREDOR DE LUJO EN PERÚ",
    titleMapCard: "Ubicación Geográfica y Mapa de la Expedición",
    tagAltitudeProfile: "CONFORT FISIOLÓGICO",
    titleAltitudeCard: "Perfil de Altura y Aclimatación",
    lblStartingAlt: "Altitud Inicial",
    lblMaxAlt: "Altitud Máxima",
    lblSleepingAlt: "Altitud de Pernocte",
    lblElevationScale: "Comparativa de Altitud y Niveles de Oxígeno",
    lblAcclimatizationProtocol: "Asesoría VIP de Aclimatación",
    perkOxygenTitle: "Suites Enriquecidas con Oxígeno:",
    perkOxygenDesc: "Disponibles en hoteles asociados (Belmond Palacio Nazarenas, Monasterio y Andean Explorer).",
    perkMedicalTitle: "Concierge Médico 24/7:",
    perkMedicalDesc: "Nuestros vehículos privados cuentan con concentradores de oxígeno medicinal y oxímetros digitales.",
    perkInfusionsTitle: "Infusiones Ancestrales:",
    perkInfusionsDesc: "Infusiones sagradas de Coca y Muña andina servidas a la llegada para favorecer la digestión y oxigenación.",
    circuitHighlight: "Corredor Activo de la Expedición",
    destAll: "Perú (General)",
    destCusco: "Cusco",
    destMp: "Machu Picchu",
    destArq: "Arequipa",
    destPuno: "Puno (Titicaca)",
    destQuitos: "Iquitos (Amazonía)",
    destLima: "Lima (Costa)",
    oxygenVsSeaLevel: "Oxígeno respecto al nivel del mar",
    effectiveOxygen: "Oxígeno Efectivo",
    elevationMeters: "Elevación",
    statusInTour: "✦ INCLUIDO EN ESTE TOUR",
    statusExtension: "Disponible en Extensiones a Medida",
    climateLabel: "Atmósfera y Clima",
    highlightsLabel: "Atractivos Destacados",
    interactiveMapHint: "Haga clic en cualquier destino o botón para consultar altitud, clima y detalles de la expedición."
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
    narrativeEn: 'Board the polished mahogany and brass carriages of the vintage Belmond Hiram Bingham. As the train winds alongside the roaring Urubamba River, savor a gourmet four-course brunch paired with fine South American wines while live acoustic musicians perform. Upon arrival at Aguas Calientes, ascend directly to the ancient citadel via private VIP transfer, meeting your licensed archaeologist for an unhurried, deeply intimate twilight exploration of Machu Picchu’s royal sectors and celestial observatories.',
    narrativeEs: 'Suba a los vagones de caoba pulida y detalles en bronce del tren vintage Belmond Hiram Bingham. Mientras el tren serpentea junto al río Urubamba, saboree un brunch gourmet de cuatro tiempos maridado con selectos vinos sudamericanos y música en vivo. Al llegar a Aguas Calientes, ascienda a la ciudadela en transporte preferencial para iniciar un recorrido íntimo con su arqueólogo privado colegiado por los templos y observatorios solares.',
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
      'Roundtrip vintage Belmond Hiram Bingham luxury rail tickets with private observatory car',
      'Four-course degustation brunch and gala dinner banquets with premium open bar',
      'Exclusive Afternoon Tea at Belmond Sanctuary Lodge adjacent to the citadel',
      'Private licensed master archaeologist guide with pre-reserved official circuit entries'
    ],
    highlightsEs: [
      'Boletos ida y vuelta a bordo del legendario tren de lujo Belmond Hiram Bingham',
      'Brunch gourmet de 4 tiempos y cena de gala con barra libre de vinos selectos',
      'Afternoon Tea exclusivo en los jardines de Belmond Sanctuary Lodge',
      'Arqueólogo privado colegiado y boletos oficiales pre-reservados ante el Ministerio'
    ],
    inclusionsEn: [
      'Roundtrip Belmond Hiram Bingham luxury train tickets (Poroy / Ollantaytambo to Aguas Calientes)',
      'All gourmet meals on board: 4-course brunch, 4-course dinner banquet, and cocktails',
      'Afternoon Tea and gourmet luncheon at Belmond Sanctuary Lodge',
      'Official Ministry of Culture entrance permits for Circuit 1 & 2',
      'Exclusive roundtrip Consettur VIP shuttle transfers to the citadel entrance',
      'Dedicated private certified archaeologist for personalized sanctuary interpretation',
      'Private executive chauffeur transfers between your Cusco hotel and train station',
      '24/7 in-country concierge assistance, luggage transfer and emergency medical oxygen'
    ],
    inclusionsEs: [
      'Boletos de ida y vuelta en el tren de lujo Belmond Hiram Bingham',
      'Todos los banquetes gourmet a bordo: brunch de 4 tiempos, cena de gala y coctelería de autor',
      'Afternoon Tea y almuerzo exclusivo en Belmond Sanctuary Lodge',
      'Boletos oficiales del Ministerio de Cultura para Circuitos 1 y 2',
      'Transporte VIP en bus Consettur ida y vuelta al ingreso de la ciudadela',
      'Arqueólogo privado colegiado durante todo el recorrido del santuario',
      'Traslados ejecutivos en vehículo privado entre su hotel en Cusco y la estación',
      'Asistencia personalizada de concierge 24/7, traslado de equipaje y oxígeno medicinal'
    ],
    exclusionsEn: [
      'International flights arriving to / departing from Peru',
      'Domestic flights (Lima - Cusco - Lima)',
      'Discretionary gratuities for train crew, private guides, and chauffeurs',
      'Personal travel insurance (comprehensive cancellation & medical coverage recommended)'
    ],
    exclusionsEs: [
      'Vuelos internacionales de ingreso y salida del Perú',
      'Vuelos domésticos (Lima - Cusco - Lima)',
      'Propinas discrecionales para tripulación del tren, guías y choferes',
      'Seguro de viaje personal (se recomienda cobertura médica y de cancelación)'
    ],
    itineraries: [
      {
        dayNumber: 1,
        titleEn: 'Boarding the Legend & Sunset at the Citadel',
        titleEs: 'Abordaje de Leyenda y Atardecer en la Ciudadela',
        descEn: 'Morning private transfer from your Cusco or Sacred Valley suite to the train station. Embark on the Belmond Hiram Bingham. Enjoy welcome cocktails, live Andean acoustic rhythms, and a four-course gourmet brunch. Arrive in Aguas Calientes and proceed directly to the citadel via VIP shuttle for a private guided exploration in late-afternoon golden light. Unwind with Afternoon Tea on the orchid terraces of Belmond Sanctuary Lodge.',
        descEs: 'Traslado privado matutino desde su suite a la estación. Abordaje del Belmond Hiram Bingham con cóctel de bienvenida, música acústica y brunch de cuatro tiempos. Llegada a Aguas Calientes y traslado en bus VIP a la ciudadela para una visita guiada privada en la serena luz dorada del atardecer. Disfrute del Afternoon Tea en las terrazas de orquídeas de Belmond Sanctuary Lodge.',
        diningEn: '4-Course Champagne Brunch & Belmond Afternoon Tea',
        diningEs: 'Brunch de 4 tiempos con Champaña y Té Belmond',
        transferEn: 'Private executive sedan to station + VIP citadel shuttle',
        transferEs: 'Sedán ejecutivo privado a estación + Bus VIP al santuario'
      },
      {
        dayNumber: 2,
        titleEn: 'Sunrise Citadel Solitude & Return Gala Dinner',
        titleEs: 'Amanecer Místico y Cena de Gala de Retorno',
        descEn: 'Early morning second access to the sanctuary to witness dawn mist lifting above the Temple of the Sun and the Intihuatana stone. Optional ascent to Huayna Picchu or Huchuy Picchu peak. Following lunch at Sanctuary Lodge, board the evening Hiram Bingham train for a festive return celebration featuring live music and a four-course dinner banquet before private hotel transfer.',
        descEs: 'Segundo ingreso matutino temprano para contemplar la neblina disipándose sobre el Templo del Sol y el Intihuatana. Ascenso opcional a Huayna Picchu o Huchuy Picchu. Tras un almuerzo en Sanctuary Lodge, aborde el tren Hiram Bingham de retorno con orquesta en vivo y cena de gala de cuatro tiempos antes de su traslado privado al hotel.',
        diningEn: 'Sanctuary Lodge gourmet lunch & 4-Course Gala Dinner on Train',
        diningEs: 'Almuerzo en Sanctuary Lodge y Cena de gala en el tren',
        transferEn: 'Private executive chauffeur to your hotel in Cusco',
        transferEs: 'Chofer ejecutivo privado a su hotel en Cusco'
      }
    ],
    locations: ['cusco', 'mp'],
    altitudeProfile: {
      startMeters: 3400,
      peakMeters: 3400,
      sleepMeters: 2430,
      oxygenPercent: 76,
      circuitEn: 'Cusco ➔ Machu Picchu',
      circuitEs: 'Cusco ➔ Machu Picchu',
      tipEn: 'Descent Strategy: Following your departure from Cusco (3,400m), you descend to Machu Picchu (2,430m) which provides 15% more effective oxygen, allowing restorative sleep and effortless vitality.',
      tipEs: 'Estrategia de Descenso: Tras salir de Cusco (3,400 msnm), el tren desciende a Machu Picchu (2,430 msnm), donde el oxígeno disponible es notablemente mayor, favoreciendo un descanso profundo y placentero.'
    }
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
    narrativeEn: 'Immerse your senses in the timeless spiritual heartland of the Incas. In an executive Mercedes-Benz Sprinter equipped with oxygen and bespoke amenities, journey through dramatic Andean landscapes to the concentric agricultural research terraces of Moray and the cascading pink salt pools of Maras. In the tranquil gardens of a private estate, participate in an authentic Haywarikuy (Pachamama offering) led by a revered Q\'ero Pampamesayoc elder, followed by an exquisite private luncheon at historic Hacienda Huayoccari.',
    narrativeEs: 'Adéntrese en el corazón espiritual de los Andes. En una Mercedes-Benz Sprinter ejecutiva equipada con oxígeno y atenciones especiales, recorra los andenes concéntricos de Moray y las salineras milenarias de Maras. En los jardines de una hacienda privada, participe en una auténtica ofrenda a la Pachamama (Haywarikuy) guiada por un maestro chamán Q\'ero Pampamesayoc, culminando con un almuerzo de autor en la emblemática Hacienda Huayoccari.',
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
      'Executive Mercedes-Benz Sprinter with private chauffeur and cold towels',
      'Authentic private Andean ceremony with a genuine Q\'ero Pampamesayoc master',
      'Private multi-course luncheon at Hacienda Huayoccari paired with reserve wines',
      'Private demonstration of Peruvian Paso Horses and traditional marinera dance'
    ],
    highlightsEs: [
      'Mercedes-Benz Sprinter ejecutiva con chofer privado y toallas aromatizadas',
      'Ceremonia privada auténtica con sabio maestro chamán Q\'ero de la alta montaña',
      'Almuerzo privado de varios tiempos en Hacienda Huayoccari con maridaje de vinos',
      'Demostración privada de caballos peruanos de paso y marinera tradicional'
    ],
    inclusionsEn: [
      'Private executive transportation in Mercedes-Benz Sprinter with dedicated chauffeur',
      'Certified master Andean anthropologist & licensed private guide',
      'All entry passes to Moray archaeological site and Maras Salt Pans',
      'Authentic Q\'ero elder ritual materials, sacred coca kintus, and incense offerings',
      'Gourmet 4-course lunch at Hacienda Huayoccari with wine pairing',
      'Private access to folk art museum and Peruvian Paso Horse presentation',
      'Supplemental oxygen concentrators, spring water, and organic Andean snacks'
    ],
    inclusionsEs: [
      'Transporte ejecutivo exclusivo en Mercedes-Benz Sprinter con chofer dedicado',
      'Guía privado colegiado especialista en antropología andina',
      'Todos los boletos de ingreso a Moray y las Salineras de Maras',
      'Materiales rituales tradicionales, hojas sagradas de coca e incienso ceremonial',
      'Almuerzo gourmet de 4 tiempos en Hacienda Huayoccari con maridaje de vinos',
      'Acceso privado a la colección de arte virreinal y exhibición de caballos de paso',
      'Oxígeno medicinal a bordo, agua de manantial y bocadillos orgánicos locales'
    ],
    exclusionsEn: [
      'Accommodations in Cusco or the Sacred Valley (available upon request)',
      'Gratuities for driver, guide, and ritual shamans',
      'Personal purchases and alcoholic beverages outside the included pairing'
    ],
    exclusionsEs: [
      'Alojamiento en Cusco o Valle Sagrado (disponible a solicitud)',
      'Propinas para chofer, guía y maestro chamán',
      'Compras personales y bebidas fuera del maridaje estipulado'
    ],
    itineraries: [
      {
        dayNumber: 1,
        titleEn: 'Inca Agricultural Wonders & Ancestral Blessing',
        titleEs: 'Laboratorios Agrícolas y Ceremonia a la Tierra',
        descEn: 'Depart your hotel for Moray’s dramatic amphitheater terraces. Walk the rim with your anthropologist, discovering how the Incas created unique microclimates. Continue to the pink salt pans of Maras, where thousands of hand-carved pools have produced mineral-rich salt since pre-Inca times. In secluded private gardens, join a Q\'ero elder for a profound blessing of gratitude to Mother Earth. Conclude with a lavish feast at Hacienda Huayoccari overlooking the Vilcanota range.',
        descEs: 'Salida hacia los anfiteatros agrícolas de Moray para comprender la ingeniería inca de microclimas. Continuación a las salineras rosadas de Maras, donde miles de pozas artesanales producen sal mineral desde tiempos preincaicos. En los jardines privados de una hacienda, participe en la bendición ancestral a la Pachamama con el maestro Q\'ero. Finalice con un banquete en Hacienda Huayoccari con vistas panorámicas al valle.',
        diningEn: 'Artisanal 4-course Andean lunch at Hacienda Huayoccari',
        diningEs: 'Almuerzo artesanal de 4 tiempos en Hacienda Huayoccari',
        transferEn: 'Mercedes-Benz Executive Sprinter with oxygen & amenities',
        transferEs: 'Mercedes-Benz Sprinter ejecutiva con oxígeno y amenities'
      }
    ],
    locations: ['cusco', 'mp'],
    altitudeProfile: {
      startMeters: 2870,
      peakMeters: 3400,
      sleepMeters: 2870,
      oxygenPercent: 74,
      circuitEn: 'Cusco ➔ Sacred Valley ➔ Machu Picchu',
      circuitEs: 'Cusco ➔ Valle Sagrado ➔ Machu Picchu',
      tipEn: 'Valley First Sanctuary Protocol: By landing in Cusco and descending directly to Urubamba (2,870m), your body acclimatizes smoothly while resting in private Relais & Châteaux casitas.',
      tipEs: 'Protocolo de Valle Primero: Al llegar a Cusco y descender de inmediato a Urubamba (2,870 msnm), su organismo se aclimata gradualmente disfrutando de casitas privadas Relais & Châteaux.'
    }
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
    narrativeEn: 'Step into the golden age of sleeper rail travel aboard the Belmond Andean Explorer. Featuring handcrafted timber panelling, delicate alpaca textiles, and private en-suite bathrooms, this transcendent voyage crosses the great Altiplano between Cusco and Puno. Toast with champagne at La Raya pass (4,319 meters) as snow-dusted Andean giants tower above, listen to live melodies in the piano bar, and awaken to dawn sunlight spreading across the mystical azure waters of Lake Titicaca.',
    narrativeEs: 'Suba al Belmond Andean Explorer, el tren dormitorio de lujo más distinguido de Sudamérica. Con finos acabados en madera, textiles de alpaca y elegantes baños privados en cada cabina, este viaje cruza el majestuoso altiplano entre Cusco y Puno. Brinde con champaña en el paso de La Raya (4,319 msnm), disfrute del piano bar en el vagón mirador y despierte con la luz dorada reflejándose en las aguas sagradas del Lago Titicaca.',
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
      'Private suite cabin with en-suite shower and fine linens aboard Belmond Andean Explorer',
      'Observation car cocktail lounge with open-air viewing terrace and grand piano',
      'Sunset champagne toast at La Raya mountain pass (4,319m elevation)',
      'Private luxury yacht charter on Lake Titicaca to secluded reed islands and Taquile'
    ],
    highlightsEs: [
      'Suite privada con baño completo y ropa de cama de lujo en Belmond Andean Explorer',
      'Vagón observatorio con terraza abierta panorámica y cócteles de autor',
      'Brindis de gala al atardecer en el abra de La Raya a 4,319 metros sobre el nivel del mar',
      'Navegación en yate privado por el Lago Titicaca hacia islas de los Uros y Taquile'
    ],
    inclusionsEn: [
      '1 Night accommodation in private luxury suite cabin on Belmond Andean Explorer',
      'All gourmet meals, afternoon teas, and gala dinners curated by Chef Diego Muñoz',
      'Open bar including fine South American reserve wines and artisanal spirits',
      'En-route excursions to the archaeological site of Raqch\'i and La Raya',
      'Private yacht charter on Lake Titicaca with expert cultural specialist guide',
      'Private barbecue luncheon on Taquile island overlooking the royal blue lake',
      'VIP luggage porterage, hotel transfers, and dedicated butler service on board'
    ],
    inclusionsEs: [
      '1 Noche de alojamiento en suite privada con baño en Belmond Andean Explorer',
      'Todas las comidas gourmet, tés de la tarde y cenas de gala del chef Diego Muñoz',
      'Barra libre con selectos vinos sudamericanos y cócteles exclusivos',
      'Excursiones guiadas privadas en el templo inca de Raqch\'i y el paso de La Raya',
      'Yate privado en el Lago Titicaca con especialista cultural y guía privado',
      'Almuerzo privado en la isla de Taquile frente al horizonte del lago',
      'Manejo preferencial de equipaje, traslados privados y mayordomo a bordo'
    ],
    exclusionsEn: [
      'Airfare between Lima, Cusco, and Juliaca/Puno',
      'Pre- or post-journey hotel accommodations (Belmond Monasterio / Titilaka available on request)',
      'Discretionary gratuities for train crew and private yacht skippers'
    ],
    exclusionsEs: [
      'Vuelos comerciales entre Lima, Cusco y Juliaca/Puno',
      'Hoteles antes o después del viaje (Belmond Monasterio / Titilaka a solicitud)',
      'Propinas para personal de servicio a bordo y tripulación del yate'
    ],
    itineraries: [
      {
        dayNumber: 1,
        titleEn: 'Cusco to the High Altiplano Plateau',
        titleEs: 'De Cusco hacia el Altiplano Sagrado',
        descEn: 'Board at Wanchaq station in Cusco. Settle into your handcrafted suite cabin before savoring an exquisite three-course lunch as the train ascends the Vilcanota valley. Stop to explore the grand Inca Temple of Raqch\'i. As twilight settles, gather on the observation deck at La Raya (4,319m) for a sunset champagne celebration followed by a seasonal gala dinner banquet.',
        descEs: 'Embarque en la estación Wanchaq de Cusco. Acomódese en su suite privada y disfrute de un almuerzo gourmet mientras el tren asciende el valle de Vilcanota. Descienda para una visita guiada privada al templo inca de Raqch\'i. Al caer la tarde, reúnase en la terraza mirador de La Raya (4,319 m) para un brindis con champaña y una cena de gala estacional.',
        diningEn: 'Degustation menus by celebrated Chef Diego Muñoz',
        diningEs: 'Menús de autor diseñados por el chef Diego Muñoz',
        transferEn: 'Train station VIP reception and private porterage',
        transferEs: 'Recepción VIP en estación y manejo privado de equipaje'
      },
      {
        dayNumber: 2,
        titleEn: 'Sunrise on Lake Titicaca & Private Island Navigation',
        titleEs: 'Amanecer en el Titicaca y Navegación Privada',
        descEn: 'Awaken to sunrise breaking over Lake Titicaca. After breakfast served in the dining car, embark on a private yacht excursion across the high-altitude waters. Discover the centuries-old reed construction traditions of the Uros people, followed by a private cultural encounter on Taquile island with an open-air barbecue banquet featuring fresh lake trout.',
        descEs: 'Despierte con los primeros rayos del sol sobre el Lago Titicaca. Tras un desayuno a la carta en el vagón comedor, aborde un yate privado para surcar las aguas más altas del mundo. Descubra las técnicas ancestrales de las islas flotantes de los Uros y disfrute de un almuerzo campestre privado en Taquile con trucha fresca del lago.',
        diningEn: 'Gourmet lakeside barbecue in Taquile with fresh trout',
        diningEs: 'Almuerzo campestre con trucha fresca del lago en Taquile',
        transferEn: 'Private yacht charter on Lake Titicaca',
        transferEs: 'Yate privado exclusivo en el Lago Titicaca'
      }
    ],
    locations: ['cusco', 'puno', 'arq'],
    altitudeProfile: {
      startMeters: 3400,
      peakMeters: 4319,
      sleepMeters: 3812,
      oxygenPercent: 64,
      circuitEn: 'Cusco ➔ Puno (Lake Titicaca) ➔ Arequipa',
      circuitEs: 'Cusco ➔ Puno (Lago Titicaca) ➔ Arequipa',
      tipEn: 'High Altiplano Comfort: Belmond Andean Explorer sleeper cars offer discreet cabin oxygen enrichment, calming herbal infusions, and relaxed railway rhythm as you traverse the highest rail pass in South America.',
      tipEs: 'Confort en el Altiplano: Los coches cama del Belmond Andean Explorer cuentan con inyección discreta de oxígeno en cabina, infusiones medicinales relajantes y ritmo pausado a través del paso ferroviario más alto de Sudamérica.'
    }
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
    narrativeEn: 'Trek the legendary stone highways of the Incas without surrendering the sublime comforts of five-star hospitality. Our royal expedition brigade precedes you to construct heated geodesic dome bedrooms outfitted with elevated raised beds, goose-down duvets, hot shower privacy tents, and eco-friendly private sanitary facilities. Accompanied by a master expedition archaeologist, an on-trail wellness physiotherapist, and a private expedition chef serving four-course hot meals, arrive at the Sun Gate (Inti Punku) in regal triumph.',
    narrativeEs: 'Recorra la legendaria calzada de piedra de los incas sin renunciar a las comodidades de la alta hospitalidad. Nuestra brigada de expedición real se adelanta para montar domos geodésicos calefaccionados con camas de verdad, edredones de pluma, carpa de duchas calientes y baños privados. Acompañado por un arqueólogo de montaña, un terapeuta masajista para recuperación muscular y chef privado en ruta, ingrese por la Puerta del Sol (Inti Punku) con distinción absoluta.',
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
      'Heated private geodesic dome suites with real raised mattresses and goose-down duvets',
      'Private hot shower tent set up every single afternoon at secluded camp locations',
      'Dedicated on-trail physiotherapist and massage therapist for daily muscle recovery',
      'Gourmet 3-course hot meals prepared on-site by our private Andean expedition chef'
    ],
    highlightsEs: [
      'Domos geodésicos privados calefaccionados con camas altas y edredones de pluma',
      'Carpa de ducha caliente instalada al culminar cada jornada en campamentos exclusivos',
      'Fisioterapeuta y masajista dedicado en ruta para recuperación física al final del día',
      'Cocina caliente de 3 tiempos elaborada en sitio por chef privado de expedición'
    ],
    inclusionsEn: [
      'Official Inca Trail trekking permits pre-reserved directly with SERNANP & Ministry of Culture',
      'Private camp crew: elite porters, camp master, waiters, and equipment crew',
      'Heated dome suites with real beds, thermal duvets, nightstands, and slippers',
      'Private hot shower tent and clean private chemical toilet facilities',
      'Dedicated private on-trail massage therapist for post-trek recovery sessions',
      'Private expedition chef preparing breakfast, hot lunch, afternoon tea, and 3-course dinner',
      'Return journey aboard the luxury Belmond Hiram Bingham train with gala dinner',
      'Licensed master mountain archaeologist guide equipped with satellite communications and oxygen'
    ],
    inclusionsEs: [
      'Permisos oficiales del Camino Inca pre-reservados ante SERNANP y Ministerio de Cultura',
      'Equipo completo de apoyo: porteadores élite, mayordomos de campamento y personal de logística',
      'Domos calefaccionados con camas altas, edredones térmicos, lámparas de noche y calzado de descanso',
      'Carpa de ducha caliente privada y servicios higiénicos químicos exclusivos',
      'Masajista / terapeuta dedicado para masajes relajantes tras cada caminata',
      'Chef privado de expedición con desayuno a la carta, almuerzo caliente, merienda y cena de 3 tiempos',
      'Retorno triunfal en el tren de lujo Belmond Hiram Bingham con cena de gala',
      'Guía arqueólogo de montaña colegiado con teléfono satelital, botiquín y oxígeno medicinal'
    ],
    exclusionsEn: [
      'Personal trekking gear (hiking boots, trekking poles, breathable layers)',
      'Pre-trek accommodation in Cusco or Ollantaytambo',
      'Voluntary gratuities for porters, camp assistants, and chefs'
    ],
    exclusionsEs: [
      'Equipo personal de trekking (botas de montaña, bastones, ropa técnica)',
      'Alojamiento previo en Cusco u Ollantaytambo',
      'Propinas voluntarias para la brigada de porteadores, cocineros y guías'
    ],
    itineraries: [
      {
        dayNumber: 1,
        titleEn: 'Valley of Patallacta & Gentle Ascent',
        titleEs: 'Valle de Patallacta y Ascenso Suave',
        descEn: 'Private 4x4 transfer to Km 82 trailhead. Gentle trek along the Urubamba river, overlooking Patallacta archaeological site. Arrival at private luxury camp with welcome massage and hot herbal infusions.',
        descEs: 'Inicio en el Km 82 tras traslado en 4x4. Caminata suave junto al río con vistas panorámicas a Patallacta. Llegada al campamento exclusivo con masaje de bienvenida y té caliente.',
        diningEn: 'Hot 3-course organic lunch and dinner in heated dining tent',
        diningEs: 'Almuerzo y cena caliente de 3 tiempos en carpa comedor',
        transferEn: 'Private 4x4 overland from Cusco to trailhead',
        transferEs: 'Transporte privado 4x4 desde Cusco al punto de inicio'
      },
      {
        dayNumber: 2,
        titleEn: 'Dead Woman\'s Pass (Warmiwañusqa - 4,215m)',
        titleEs: 'Paso de la Mujer Muerta (4,215 msnm)',
        descEn: 'Ascent to the highest pass with personal porters and hyperbaric oxygen chambers on standby. Rewarding descent to Pacaymayo private camp for hot showers and restorative massage.',
        descEs: 'Ascenso al paso más alto con apoyo continuo de porteadores y oxígeno medicinal. Descenso reconfortante al campamento privado de Pacaymayo con duchas calientes y sesión de masaje.',
        diningEn: 'High-energy gourmet trail cuisine and hot herbal infusions',
        diningEs: 'Cocina energética de alta montaña y calientes infusiones',
        transferEn: 'Porterage brigade carrying all personal luggage',
        transferEs: 'Brigada de porteadores transportando todo el equipaje'
      },
      {
        dayNumber: 3,
        titleEn: 'Cloud Forests of Wiñay Wayna',
        titleEs: 'Bosque de Nubes y Wiñay Wayna',
        descEn: 'Traverse magnificent Inca staircases, tunnel passages, and orchid forests to the terraces of Wiñay Wayna. Gala celebration dinner crafted by your private chef in the high cloud forest.',
        descEs: 'Paso por escalinatas incas, túneles tallados en roca y orquídeas hacia Wiñay Wayna. Cena de gala de celebración preparada por su chef privado en medio del bosque nuboso.',
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
    ],
    locations: ['cusco', 'mp'],
    altitudeProfile: {
      startMeters: 2600,
      peakMeters: 4215,
      sleepMeters: 2430,
      oxygenPercent: 62,
      circuitEn: 'Cusco ➔ Inca Trail ➔ Inti Punku (MP)',
      circuitEs: 'Cusco ➔ Camino Inca ➔ Inti Punku (MP)',
      tipEn: 'VIP Glamping Pacing: Accompanied by private Andean porters, personal massage therapists, and portable hyperbaric chambers. Measured breathing and unhurried pacing ensure majestic passage through high mountain passes.',
      tipEs: 'Ritmo de Glamping VIP: Acompañado por porteadores privados, masajistas y cámaras hiperbáricas portátiles. Un ritmo pausado y respiración armónica garantizan una travesía inolvidable por los pasos de montaña.'
    }
  }
];

// Curated Partner Hotel Collection Data (Improvement 4)
const partnerHotelsData = [
  {
    name: "Belmond Sanctuary Lodge",
    locationEn: "Machu Picchu Citadel Gates",
    locationEs: "Ingreso al Santuario de Machu Picchu",
    tagEn: "Sanctuary Exclusive",
    tagEs: "Exclusivo en el Santuario",
    descEn: "The only hotel adjacent to the citadel entrance. Features private orchid gardens, panoramic terraces, and unparalleled sunrise access before day visitors arrive.",
    descEs: "El único hotel ubicado junto al ingreso de la ciudadela. Jardines de orquídeas privadas, terraza panorámica y acceso privilegiado al amanecer sin aglomeraciones."
  },
  {
    name: "Belmond Palacio Nazarenas",
    locationEn: "Cusco Historic District",
    locationEs: "Centro Histórico de Cusco",
    tagEn: "Oxygen-Enriched Suites",
    tagEs: "Suites Enriquecidas con Oxígeno",
    descEn: "A restored 16th-century convent with Inca stone walls, private butler service, Cusco’s only outdoor heated swimming pool, and oxygen-enriched air systems.",
    descEs: "Antiguo convento del siglo XVI con muros incas, mayordomo privado, la única piscina temperada al aire libre de Cusco y suites climatizadas con oxígeno enriquecido."
  },
  {
    name: "Tambo del Inka Resort & Spa",
    locationEn: "Sacred Valley - Urubamba",
    locationEs: "Valle Sagrado - Urubamba",
    tagEn: "Private Train Platform",
    tagEs: "Estación Privada de Tren",
    descEn: "Riverside luxury sanctuary with its own private railway station boarding directly to Machu Picchu. Acclaimed Kallpa Spa and artisanal Andean gastronomy.",
    descEs: "Resort de lujo junto al río Vilcanota con su propio andén ferroviario para abordar directamente a Machu Picchu. Spa Kallpa y alta gastronomía andina."
  },
  {
    name: "Sol y Luna - Relais & Châteaux",
    locationEn: "Sacred Valley - Urubamba",
    locationEs: "Valle Sagrado - Urubamba",
    tagEn: "Relais & Châteaux Casitas",
    tagEs: "Casitas Relais & Châteaux",
    descEn: "Charming circular private casitas surrounded by flowering gardens and snow-capped Andean peaks, celebrating Peruvian folk art, equestrian mastery, and Michelin-style dining.",
    descEs: "Exclusivas casitas circulares rodeadas de jardines floridos y picos nevados, rindiendo homenaje al arte popular peruano, caballos de paso y gastronomía de autor."
  }
];

// Curated Travel Advisory FAQs Data (Improvement 3)
const travelAdvisoryData = [
  {
    icon: "🧳",
    titleEn: "Belmond Rail Luggage Regulations",
    titleEs: "Normativa de Equipaje en Tren Belmond",
    bodyEn: "To maintain vintage Pullman carriage elegance and safety, passenger cars permit one piece of hand luggage up to 5 kg (11 lbs) per traveler. Luxury Machupicchu Peru coordinates seamless private transfer of your principal suitcases directly between your suites in Cusco and the Sacred Valley.",
    bodyEs: "Para mantener el confort y la elegancia en los vagones Pullman, se permite una pieza de equipaje de mano de hasta 5 kg (11 lbs) por persona. Luxury Machupicchu Peru coordina el traslado privado de sus maletas principales directamente entre sus hoteles de Cusco y el Valle Sagrado."
  },
  {
    icon: "🏔️",
    titleEn: "High Altitude Adaptation Protocol",
    titleEs: "Protocolo de Adaptación a la Altitud",
    bodyEn: "While Cusco rests at 3,400m (11,150 ft), Machu Picchu is pleasantly lower at 2,430m (7,972 ft). We recommend arriving via the lower Sacred Valley (2,870m) to acclimatize gently. Our vehicles and partner suites are equipped with supplemental medical oxygen concentrators.",
    bodyEs: "Cusco se ubica a 3,400 msnm, mientras que la ciudadela de Machu Picchu está a 2,430 msnm. Recomendamos iniciar la estancia en el Valle Sagrado (2,870 msnm) para una aclimatación óptima. Todos nuestros vehículos y suites asociadas disponen de concentradores de oxígeno medicinal."
  },
  {
    icon: "☀️",
    titleEn: "Seasonality & Microclimates",
    titleEs: "Estacionalidad y Climas Andinos",
    bodyEn: "The Andean winter dry season (May to October) brings brilliant sapphire skies, crisp sunny days, and cooler starry evenings. The green emerald season (November to April) offers mystical cloud-forest mists, fewer crowds, and flourishing wild orchids. Machu Picchu is open year-round.",
    bodyEs: "La temporada seca andina (mayo a octubre) ofrece cielos despejados, sol radiante y noches estrelladas frescas. La temporada verde (noviembre a abril) brinda místicas brumas en el bosque de nubes, menor afluencia y orquídeas en flor. El santuario está abierto los 365 días del año."
  },
  {
    icon: "🛡️",
    titleEn: "Official Ministry Permits & Circuits",
    titleEs: "Permisos Oficiales y Circuitos Regulados",
    bodyEn: "The Peruvian Ministry of Culture enforces strictly regulated daily capacities across designated circuits. All entrance permits require exact legal names and passport numbers. Our atelier pre-reserves your priority circuits well in advance to guarantee an unhurried, panoramic visit.",
    bodyEs: "El Ministerio de Cultura del Perú aplica cupos diarios estrictos en circuitos predeterminados. Todos los boletos son nominativos e intransferibles con pasaporte físico. Nuestro atelier pre-reserva sus circuitos preferenciales con antelación para asegurar un recorrido fluido y panorámico."
  }
];

// ==========================================================================
// GEOGRAPHIC LOCATIONS & STATIC ALTITUDE PROFILE
// ==========================================================================

const STATIC_LOCATIONS = {
  cusco: {
    id: 'cusco',
    nameEn: 'Cusco',
    nameEs: 'Cusco',
    image: 'assets/images/Cusco.jpg',
    altitude: '3,400 msnm / 11,152 ft',
    oxygenEn: '~68% (vs sea level)',
    oxygenEs: '~68% (vs nivel del mar)'
  },
  mp: {
    id: 'mp',
    nameEn: 'Machu Picchu',
    nameEs: 'Machu Picchu',
    image: 'assets/images/MachuPicchu.jpg',
    altitude: '2,430 msnm / 7,972 ft',
    oxygenEn: '~76% (vs sea level)',
    oxygenEs: '~76% (vs nivel del mar)'
  },
  arq: {
    id: 'arq',
    nameEn: 'Arequipa',
    nameEs: 'Arequipa',
    image: 'assets/images/Arequipa.jpg',
    altitude: '2,325 msnm / 7,628 ft',
    oxygenEn: '~77% (vs sea level)',
    oxygenEs: '~77% (vs nivel del mar)'
  },
  puno: {
    id: 'puno',
    nameEn: 'Puno & Lake Titicaca',
    nameEs: 'Puno y Lago Titicaca',
    image: 'assets/images/Puno.jpg',
    altitude: '3,812 msnm / 12,506 ft',
    oxygenEn: '~64% (vs sea level)',
    oxygenEs: '~64% (vs nivel del mar)'
  },
  quitos: {
    id: 'quitos',
    nameEn: 'Iquitos (Amazon)',
    nameEs: 'Iquitos (Amazonía)',
    image: 'assets/images/Iquitos.jpg',
    altitude: '106 msnm / 348 ft',
    oxygenEn: '100% (sea level)',
    oxygenEs: '100% (nivel del mar)'
  },
  iquitos: {
    id: 'iquitos',
    nameEn: 'Iquitos (Amazon)',
    nameEs: 'Iquitos (Amazonía)',
    image: 'assets/images/Iquitos.jpg',
    altitude: '106 msnm / 348 ft',
    oxygenEn: '100% (sea level)',
    oxygenEs: '100% (nivel del mar)'
  }
};

function renderGeoAndAltitude(tour) {
  const container = document.getElementById('tourLocationsStaticGrid');
  if (!container || !tour) return;

  const isEs = appState.currentLang === 'es';
  let tourLocations = tour.locations;
  if (!tourLocations || !Array.isArray(tourLocations) || tourLocations.length === 0) {
    if (tour.slug && tour.slug.includes('andean')) {
      tourLocations = ['cusco', 'puno', 'arq'];
    } else {
      tourLocations = ['cusco', 'mp'];
    }
  }

  container.innerHTML = tourLocations.map(code => {
    const key = String(code).toLowerCase().trim();
    const loc = STATIC_LOCATIONS[key];
    if (!loc) return '';

    const name = isEs ? loc.nameEs : loc.nameEn;
    const oxygen = isEs ? loc.oxygenEs : loc.oxygenEn;
    const altLabel = isEs ? 'Altura' : 'Altitude';
    const oxLabel = isEs ? 'Nivel de Oxígeno' : 'Oxygen Level';
    const badgeText = isEs ? '✦ Destino del Tour' : '✦ Journey Destination';

    return `
      <article class="static-location-card">
        <div class="static-location-media">
          <img src="${loc.image}" alt="${name}" class="static-location-img" loading="lazy">
        </div>
        <div class="static-location-body">
          <div class="static-location-header">
            <h3 class="static-location-name">${name}</h3>
            <span class="static-location-badge">${badgeText}</span>
          </div>
          <div class="static-location-metrics">
            <div class="static-metric-box">
              <span class="static-metric-label">${altLabel}</span>
              <strong class="static-metric-value">${loc.altitude}</strong>
            </div>
            <div class="static-metric-box">
              <span class="static-metric-label">${oxLabel}</span>
              <strong class="static-metric-value">${oxygen}</strong>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Initialize Tour Page on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  appState.allTours = defaultTours;

  // Sync language & currency from localStorage or query
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  if (langParam === 'en' || langParam === 'es') {
    appState.currentLang = langParam;
    localStorage.setItem('luxury_lang', langParam);
  }

  const currParam = urlParams.get('curr');
  if (currParam === 'USD' || currParam === 'PEN') {
    appState.currentCurrency = currParam;
    localStorage.setItem('luxury_currency', currParam);
  }

  // Identify active tour from slug
  const slug = urlParams.get('slug') || 'belmond-hiram-bingham-pinnacle';
  appState.tour = defaultTours.find(t => t.slug === slug) || defaultTours[0];

  // Set min date on date input (today + 2 days)
  const dateInput = document.getElementById('sidebarDate');
  if (dateInput) {
    const future = new Date();
    future.setDate(future.getDate() + 2);
    dateInput.min = future.toISOString().split('T')[0];
    dateInput.value = future.toISOString().split('T')[0];
  }

  // Render complete tour view immediately
  renderTourPage();
  setupScrollListener();

  // Background fetch from Backend API for live database data sync
  fetchApi(`/tours/${slug}?lang=${appState.currentLang}`)
    .then(res => res.ok ? res.json() : null)
    .then(apiTour => {
      if (apiTour && appState.tour) {
        if (apiTour.locations && apiTour.locations.length > 0) {
          appState.tour.locations = apiTour.locations;
        }
        if (apiTour.altitudeProfile) {
          appState.tour.altitudeProfile = apiTour.altitudeProfile;
        }
        renderTourPage();
      }
    })
    .catch(() => {
      // Backend offline or unreachable, default fallback is seamlessly active
    });
});

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

// Format Price
function formatPrice(usdPrice, penPrice) {
  if (appState.currentCurrency === 'USD') {
    return `$${usdPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} USD + IGV`;
  } else {
    const penVal = penPrice || (usdPrice * appState.exchangeRateUsdToPen);
    return `S/. ${penVal.toLocaleString('es-PE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} PEN + IGV`;
  }
}

// Switch Language
function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'es') return;
  appState.currentLang = lang;
  localStorage.setItem('luxury_lang', lang);

  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('data-lang', lang);

  document.getElementById('btnLangEn')?.classList.toggle('active', lang === 'en');
  document.getElementById('btnLangEs')?.classList.toggle('active', lang === 'es');

  renderTourPage();
}

// Switch Currency
function setCurrency(curr) {
  if (curr !== 'USD' && curr !== 'PEN') return;
  appState.currentCurrency = curr;
  localStorage.setItem('luxury_currency', curr);

  document.documentElement.setAttribute('data-currency', curr);
  document.getElementById('btnUsd')?.classList.toggle('active', curr === 'USD');
  document.getElementById('btnPen')?.classList.toggle('active', curr === 'PEN');

  recalculateSidebarTotal();
  renderRelatedExpeditions();
}

// Main Render Function
function renderTourPage() {
  const tour = appState.tour;
  if (!tour) return;

  const isEs = appState.currentLang === 'es';
  const dict = translations[appState.currentLang];

  // 1. Update Document Title & Meta Description
  const title = isEs ? tour.titleEs : tour.titleEn;
  const subtitle = isEs ? tour.subtitleEs : tour.subtitleEn;
  const narrative = isEs ? tour.narrativeEs : tour.narrativeEn;
  const duration = isEs ? tour.durationEs : tour.durationEn;
  const difficulty = isEs ? tour.difficultyEs : tour.difficultyEn;
  const highlights = isEs ? tour.highlightsEs : tour.highlightsEn;
  const inclusions = isEs ? tour.inclusionsEs : tour.inclusionsEn;
  const exclusions = isEs ? tour.exclusionsEs : tour.exclusionsEn;

  document.title = `${title} | Luxury Machupicchu Peru`;
  const metaDesc = document.getElementById('pageMetaDesc');
  if (metaDesc) metaDesc.setAttribute('content', subtitle);

  // 2. Apply static text translations
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // 3. Breadcrumb & Hero
  document.getElementById('breadcrumbCurrentTitle').textContent = title;
  document.getElementById('heroStyleTag').textContent = tour.styleTag;
  document.getElementById('heroTourTitle').textContent = title;
  document.getElementById('heroTourSubtitle').textContent = subtitle;
  document.getElementById('heroDuration').textContent = duration;
  document.getElementById('heroAltitude').textContent = tour.altitudeMax;
  document.getElementById('heroPace').textContent = difficulty;

  const heroSection = document.getElementById('tourHero');
  if (heroSection) {
    heroSection.style.backgroundImage = `url('${tour.mainImageUrl}')`;
  }

  // 4. Narrative & Highlights
  document.getElementById('tourLongNarrative').textContent = narrative;

  const highlightsContainer = document.getElementById('tourHighlightsList');
  if (highlightsContainer) {
    highlightsContainer.innerHTML = highlights.map(h => `
      <li><span>✦</span> <strong>${h}</strong></li>
    `).join('');
  }

  // 5. Gallery Grid
  const galleryGrid = document.getElementById('tourGalleryGrid');
  if (galleryGrid && tour.galleryImages) {
    galleryGrid.innerHTML = tour.galleryImages.map(img => `
      <div class="gallery-thumbnail-card">
        <img src="${img}" alt="${title}" loading="lazy">
      </div>
    `).join('');
  }

  // 6. Day-by-Day Timeline
  const timelineContainer = document.getElementById('tourItineraryTimeline');
  if (timelineContainer && tour.itineraries) {
    timelineContainer.innerHTML = tour.itineraries.map(day => `
      <article class="itinerary-timeline-day">
        <div class="itinerary-day-badge-row">
          <span class="itinerary-day-badge">${dict.dayPrefix} ${day.dayNumber}</span>
        </div>
        <h3 class="itinerary-day-heading">${isEs ? day.titleEs : day.titleEn}</h3>
        <p class="itinerary-day-narrative">${isEs ? day.descEs : day.descEn}</p>
        <div class="itinerary-day-meta-grid">
          <div class="meta-item">
            <strong>${dict.modalDining}</strong>
            <span>${isEs ? day.diningEs : day.diningEn}</span>
          </div>
          <div class="meta-item">
            <strong>${dict.modalTransfer}</strong>
            <span>${isEs ? day.transferEs : day.transferEn}</span>
          </div>
        </div>
      </article>
    `).join('');
  }

  // 7. Inclusions & Exclusions Lists
  const incList = document.getElementById('curatedInclusionsList');
  if (incList) {
    incList.innerHTML = inclusions.map(item => `
      <li><span class="inc-icon">✔</span> ${item}</li>
    `).join('');
  }

  const excList = document.getElementById('discretionaryExclusionsList');
  if (excList) {
    excList.innerHTML = exclusions.map(item => `
      <li><span class="not-inc-icon">✕</span> ${item}</li>
    `).join('');
  }

  // 8. Partner Hotels Showcase (Improvement 4)
  const hotelsGrid = document.getElementById('hotelsShowcaseGrid');
  if (hotelsGrid) {
    hotelsGrid.innerHTML = partnerHotelsData.map(hotel => `
      <div class="hotel-showcase-card">
        <span class="hotel-tag">${isEs ? hotel.tagEs : hotel.tagEn}</span>
        <h4 class="hotel-name">${hotel.name}</h4>
        <p style="font-size: 0.78rem; color: var(--color-gold); font-weight: 500; margin-bottom: 0.5rem;">
          📍 ${isEs ? hotel.locationEs : hotel.locationEn}
        </p>
        <p class="hotel-desc">${isEs ? hotel.descEs : hotel.descEn}</p>
      </div>
    `).join('');
  }

  // 9. Travel Advisory Cards (Improvement 3)
  const advisoryGrid = document.getElementById('advisoryCardsGrid');
  if (advisoryGrid) {
    advisoryGrid.innerHTML = travelAdvisoryData.map(adv => `
      <div class="advisory-card">
        <div class="advisory-card-header">
          <span class="advisory-icon">${adv.icon}</span>
          <h4 class="advisory-card-title">${isEs ? adv.titleEs : adv.titleEn}</h4>
        </div>
        <p class="advisory-card-body">${isEs ? adv.bodyEs : adv.bodyEn}</p>
      </div>
    `).join('');
  }

  // 10. Sidebar Pricing & Calculation
  const sidebarPriceNum = document.getElementById('sidebarPriceDisplay');
  if (sidebarPriceNum) {
    sidebarPriceNum.textContent = formatPrice(tour.priceUsd, tour.pricePen);
  }
  recalculateSidebarTotal();

  // 11. Related Expeditions
  renderRelatedExpeditions();

  // 12. Dynamic Schema.org JSON-LD (Improvement 5)
  injectSchemaJsonLd(tour);

  // 13. Geographic Corridor Map & Altitude Profile
  renderGeoAndAltitude(tour);
}

// Recalculate Sidebar Total
function recalculateSidebarTotal() {
  const tour = appState.tour;
  if (!tour) return;

  const guests = parseInt(document.getElementById('sidebarGuests')?.value || '2', 10);
  const totalUsd = tour.priceUsd * guests;
  const totalPen = tour.pricePen * guests;

  const totalQuoteEl = document.getElementById('sidebarTotalQuote');
  if (totalQuoteEl) {
    totalQuoteEl.textContent = formatPrice(totalUsd, totalPen);
  }

  const priceDisplay = document.getElementById('sidebarPriceDisplay');
  if (priceDisplay) {
    priceDisplay.textContent = formatPrice(tour.priceUsd, tour.pricePen);
  }
}

// Render Related Expeditions (The other 3 tours)
function renderRelatedExpeditions() {
  const container = document.getElementById('relatedExpeditionsGrid');
  if (!container) return;

  const isEs = appState.currentLang === 'es';
  const dict = translations[appState.currentLang];
  const related = appState.allTours.filter(t => t.id !== appState.tour.id).slice(0, 3);

  container.innerHTML = related.map(tour => {
    const title = isEs ? tour.titleEs : tour.titleEn;
    const duration = isEs ? tour.durationEs : tour.durationEn;
    const priceDisplay = formatPrice(tour.priceUsd, tour.pricePen);

    return `
      <article class="tour-card">
        <div class="tour-card-media">
          <img src="${tour.mainImageUrl}" alt="${title}" class="tour-card-img" loading="lazy">
          <span class="tour-style-badge">${tour.styleTag}</span>
        </div>
        <div class="tour-card-body">
          <div class="tour-meta-row">
            <span>${duration}</span>
            <span>${tour.altitudeMax}</span>
          </div>
          <h3 class="tour-title" style="font-size: 1.4rem;">${title}</h3>
          <p class="tour-subtitle" style="font-size: 0.88rem; margin-bottom: 1.5rem;">${isEs ? tour.subtitleEs : tour.subtitleEn}</p>

          <div class="tour-pricing-footer">
            <div class="price-box">
              <span class="price-from">${dict.pricePerPerson}</span>
              <span class="price-value">${priceDisplay}</span>
            </div>
            <a href="tour.html?slug=${tour.slug}" class="btn-itinerary-link" style="text-decoration:none; display:inline-flex; align-items:center; justify-content:center;">
              ${dict.btnViewItinerary}
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Dynamic Schema.org JSON-LD (Improvement 5)
function injectSchemaJsonLd(tour) {
  const isEs = appState.currentLang === 'es';
  const schemaScript = document.getElementById('tourSchemaJson');
  if (!schemaScript) return;

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": isEs ? tour.titleEs : tour.titleEn,
    "description": isEs ? tour.subtitleEs : tour.subtitleEn,
    "image": `http://localhost:4173/${tour.mainImageUrl}`,
    "touristType": ["Haute Couture Travel", "Cultural Heritage", "Private Expeditions"],
    "offers": {
      "@type": "Offer",
      "price": tour.priceUsd.toString(),
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2026-01-01"
    },
    "provider": {
      "@type": "TravelAgency",
      "name": "Luxury Machupicchu Peru",
      "telephone": "+51958195840",
      "url": "http://localhost:4173/",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Portal de Panes 123, Plaza de Armas",
        "addressLocality": "Cusco",
        "addressRegion": "Cusco",
        "postalCode": "08002",
        "addressCountry": "PE"
      }
    },
    "itinerary": {
      "@type": "ItemList",
      "numberOfItems": tour.itineraries.length,
      "itemListElement": tour.itineraries.map(day => ({
        "@type": "ListItem",
        "position": day.dayNumber,
        "item": {
          "@type": "TouristAttraction",
          "name": `${isEs ? 'Día' : 'Day'} ${day.dayNumber}: ${isEs ? day.titleEs : day.titleEn}`,
          "description": isEs ? day.descEs : day.descEn
        }
      }))
    }
  };

  schemaScript.textContent = JSON.stringify(schema, null, 2);
}

// Handle Sidebar Reservation Form (WhatsApp VIP Dispatch)
function handleSidebarBookingSubmit(event) {
  event.preventDefault();
  const tour = appState.tour;
  const isEs = appState.currentLang === 'es';

  const date = document.getElementById('sidebarDate').value;
  const guests = document.getElementById('sidebarGuests').value;
  const carriage = document.getElementById('sidebarCarriage').value;
  const name = document.getElementById('sidebarName').value;
  const phone = document.getElementById('sidebarPhone').value;
  const notes = document.getElementById('sidebarNotes').value;

  const totalUsd = tour.priceUsd * parseInt(guests, 10);
  const totalPen = tour.pricePen * parseInt(guests, 10);
  const totalFormatted = formatPrice(totalUsd, totalPen);

  const tourTitle = isEs ? tour.titleEs : tour.titleEn;
  const waNumber = '51958195840';

  const waMessage = isEs
    ? `✨ *Luxury Machupicchu Peru - Solicitud de Reserva VIP*\n\n` +
      `Estimado Concierge, mi nombre es *${name}*.\n\n` +
      `🏛️ *Expedición:* ${tourTitle}\n` +
      `👥 *Viajeros:* ${guests} persona(s)\n` +
      `📅 *Fecha Deseada:* ${date || 'A coordinar'}\n` +
      `🚆 *Preferencia de Servicio:* ${carriage}\n` +
      `📞 *Teléfono / Contacto:* ${phone}\n` +
      `💰 *Presupuesto Estimado:* ${totalFormatted}\n` +
      (notes ? `✉️ *Deseos Especiales:* ${notes}\n` : '') +
      `\nSolicito confirmación de disponibilidad para esta salida 100% privada.`
    : `✨ *Luxury Machupicchu Peru - VIP Journey Booking Request*\n\n` +
      `Dear Concierge, my name is *${name}*.\n\n` +
      `🏛️ *Expedition:* ${tourTitle}\n` +
      `👥 *Guests:* ${guests} traveler(s)\n` +
      `📅 *Target Date:* ${date || 'To be confirmed'}\n` +
      `🚆 *Preferred Carriage:* ${carriage}\n` +
      `📞 *Phone / Mobile:* ${phone}\n` +
      `💰 *Estimated Quote:* ${totalFormatted}\n` +
      (notes ? `✉️ *Special Wishes:* ${notes}\n` : '') +
      `\nI request journey availability confirmation for this 100% private departure.`;

  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;
  window.open(waUrl, '_blank');
}

// Navigation helpers
function scrollToBookingCard() {
  const el = document.getElementById('bookingSection');
  if (el) {
    const nav = document.getElementById('luxuryHeader');
    const navHeight = nav ? nav.offsetHeight : 54;
    const targetY = el.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
    window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
  }
}

function openConciergeModal() {
  scrollToBookingCard();
}

function openClaimModal(type) {
  alert(type === 'claims'
    ? 'Libro de Reclamaciones Virtual - Luxury Machupicchu Peru E.I.R.L (RUC: 20601622492). Conforme al Código de Protección y Defensa del Consumidor.'
    : 'All client data is strictly handled under Supreme Privacy and Personal Data Protection laws of Peru.');
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
