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

// Tour Normalizer for data fetched strictly from .NET 9 / MySQL Database
function normalizeTourDetail(t) {
  if (!t) return null;
  return {
    id: t.id,
    slug: t.slug,
    categoryId: t.categoryId,
    categorySlug: t.categorySlug || '',
    categoryName: t.categoryName || '',
    categoryNameEn: t.categoryNameEn || '',
    categoryNameEs: t.categoryNameEs || '',
    styleTag: t.styleTag || 'Ultra-Luxury',
    title: t.title || '',
    titleEn: t.titleEn || t.title || '',
    titleEs: t.titleEs || t.title || '',
    subtitle: t.subtitle || '',
    subtitleEn: t.subtitleEn || t.subtitle || '',
    subtitleEs: t.subtitleEs || t.subtitle || '',
    narrativeEn: t.descriptionEn || t.description || '',
    narrativeEs: t.descriptionEs || t.description || '',
    descriptionEn: t.descriptionEn || t.description || '',
    descriptionEs: t.descriptionEs || t.description || '',
    duration: t.duration || '',
    durationEn: t.durationEn || t.duration || '',
    durationEs: t.durationEs || t.duration || '',
    durationDays: t.durationDays || 1,
    priceUsd: Number(t.priceUsd) || 0,
    pricePen: Number(t.pricePen) || (Number(t.priceUsd) * 3.80),
    difficulty: t.difficulty || '',
    difficultyEn: t.difficultyEn || t.difficulty || '',
    difficultyEs: t.difficultyEs || t.difficulty || '',
    altitudeMax: t.altitudeMax || '',
    startingPoint: t.startingPoint || '',
    featured: Boolean(t.featured),
    isActive: t.isActive !== false,
    displayOrder: t.displayOrder || 0,
    mainImageUrl: t.mainImageUrl || '',
    galleryImages: Array.isArray(t.galleryImages) && t.galleryImages.length > 0 ? t.galleryImages : [t.mainImageUrl],
    highlightsEn: Array.isArray(t.highlightsEn) && t.highlightsEn.length > 0 ? t.highlightsEn : (Array.isArray(t.highlights) ? t.highlights : []),
    highlightsEs: Array.isArray(t.highlightsEs) && t.highlightsEs.length > 0 ? t.highlightsEs : (Array.isArray(t.highlights) ? t.highlights : []),
    highlights: Array.isArray(t.highlights) ? t.highlights : [],
    inclusionsEn: Array.isArray(t.includedEn) && t.includedEn.length > 0 ? t.includedEn : (Array.isArray(t.included) ? t.included : []),
    inclusionsEs: Array.isArray(t.includedEs) && t.includedEs.length > 0 ? t.includedEs : (Array.isArray(t.included) ? t.included : []),
    exclusionsEn: Array.isArray(t.notIncludedEn) && t.notIncludedEn.length > 0 ? t.notIncludedEn : (Array.isArray(t.notIncluded) ? t.notIncluded : []),
    exclusionsEs: Array.isArray(t.notIncludedEs) && t.notIncludedEs.length > 0 ? t.notIncludedEs : (Array.isArray(t.notIncluded) ? t.notIncluded : []),
    locations: Array.isArray(t.locations) && t.locations.length > 0 ? t.locations : ['cusco', 'mp'],
    altitudeProfile: t.altitudeProfile || null,
    itineraries: (t.itineraries || []).map(day => ({
      id: day.id,
      dayNumber: day.dayNumber,
      titleEn: day.titleEn || day.title,
      titleEs: day.titleEs || day.title,
      title: day.title,
      descEn: day.descriptionEn || day.description,
      descEs: day.descriptionEs || day.description,
      descriptionEn: day.descriptionEn || day.description,
      descriptionEs: day.descriptionEs || day.description,
      diningEn: day.gourmetDiningEn || day.gourmetDining,
      diningEs: day.gourmetDiningEs || day.gourmetDining,
      transferEn: day.privateTransferEn || day.privateTransfer,
      transferEs: day.privateTransferEs || day.privateTransfer
    }))
  };
}

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

// Initialize Tour Page on DOM Load strictly from .NET 9 / MySQL Database
document.addEventListener('DOMContentLoaded', async () => {
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

  // Set min date on date input (today + 2 days)
  const dateInput = document.getElementById('sidebarDate');
  if (dateInput) {
    const future = new Date();
    future.setDate(future.getDate() + 2);
    dateInput.min = future.toISOString().split('T')[0];
    dateInput.value = future.toISOString().split('T')[0];
  }

  setupScrollListener();

  // Identify active tour from slug or ID parameter
  const slug = urlParams.get('slug') || urlParams.get('id') || 'belmond-hiram-bingham-pinnacle';

  showTourLoadingState();

  try {
    const [tourRes, allToursRes] = await Promise.all([
      fetchApi(`/tours/${slug}?lang=${appState.currentLang}`),
      fetchApi(`/tours?lang=${appState.currentLang}`)
    ]);

    if (!tourRes.ok) {
      throw new Error('Expedition not found in database');
    }

    const apiTour = await tourRes.json();
    appState.tour = normalizeTourDetail(apiTour);

    if (allToursRes.ok) {
      const allData = await allToursRes.json();
      appState.allTours = Array.isArray(allData) ? allData.map(normalizeTourDetail) : [];
    }

    renderTourPage();
  } catch (err) {
    console.error('Error fetching tour from database:', err);
    showTourNotFoundState();
  }
});

function showTourLoadingState() {
  const heading = document.getElementById('heroTourTitle');
  if (heading) heading.textContent = 'Sincronizando Expedición...';
  const narrative = document.getElementById('tourLongNarrative');
  if (narrative) {
    narrative.innerHTML = '<span style="color:var(--color-sand);">Cargando información oficial desde la base de datos de Luxury Machupicchu...</span>';
  }
}

function showTourNotFoundState() {
  const isEs = appState.currentLang === 'es';
  const heading = document.getElementById('heroTourTitle');
  if (heading) heading.textContent = isEs ? 'Expedición No Encontrada' : 'Expedition Not Found';
  const narrative = document.getElementById('tourLongNarrative');
  if (narrative) {
    narrative.innerHTML = `
      <div style="padding: 2.5rem 1.5rem; background: rgba(18, 19, 22, 0.85); border: 1px solid var(--color-gold); border-radius: 6px; text-align: center;">
        <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: #fff; margin-bottom: 1rem;">
          ${isEs ? 'Expedición no disponible en el catálogo activo' : 'Expedition unavailable in active catalog'}
        </h3>
        <p style="color: var(--color-sand); font-size: 0.95rem; margin-bottom: 1.5rem;">
          ${isEs ? 'La expedición que busca puede haber sido actualizada o archivada en el Atelier Central.' : 'The expedition you requested may have been archived or updated in our Central Atelier.'}
        </p>
        <a href="index.html#expeditions" class="btn-hero-gold" style="display: inline-block; text-decoration: none; padding: 0.75rem 1.8rem;">
          ${isEs ? 'Explorar Colección de Expediciones' : 'Explore Expeditions Collection'}
        </a>
      </div>
    `;
  }
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

// Handle Sidebar Reservation Form (Persists to Database & Dispatches VIP WhatsApp)
function handleSidebarBookingSubmit(event) {
  event.preventDefault();
  const tour = appState.tour;
  if (!tour) return;
  const isEs = appState.currentLang === 'es';

  const date = document.getElementById('sidebarDate').value;
  const guests = document.getElementById('sidebarGuests').value;
  const carriage = document.getElementById('sidebarCarriage').value;
  const name = document.getElementById('sidebarName').value;
  const phone = document.getElementById('sidebarPhone').value;
  const notes = document.getElementById('sidebarNotes').value;

  // Persist directly to .NET 9 / MySQL database
  try {
    fetchApi('/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tourId: tour.id,
        fullName: name,
        email: 'guest.' + Date.now() + '@luxuryclient.com',
        phone: phone,
        numberOfGuests: parseInt(guests, 10),
        travelDate: date ? new Date(date).toISOString() : null,
        trainPreference: carriage,
        specialRequests: notes,
        preferredLanguage: appState.currentLang
      })
    }).catch(() => {});
  } catch {}

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
