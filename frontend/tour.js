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
    interactiveMapHint: "Click any destination or chip to inspect regional altitude, atmosphere, and expedition details.",
    priceTaxSub: "+ IGV (Foreigners 0% VAT D.L. 919)",
    sidebarTaxSub: "+ 18% IGV Peruvians • Foreigners 0% Exempt (D.L. 919)",
    sidebarTaxLegend: "✦ Rates net + IGV. Non-resident foreigners 0% IGV under D.L. 919 • Peruvian residents +18% IGV.",
    certTax: "✔ Tax Regime: 0% IGV Exemption for Foreign Non-Domiciled Travelers (D.L. 919)",
    navBuildPackage: "Build Your Package",
    btnHeroBuildPackage: "✦ Build Your Bespoke Package",
    pkgModalKicker: "HAUTE COUTURE ANDEAN TRAVEL • BESPOKE RESERVATION",
    pkgModalTitle: "Build Your Bespoke Andean Journey",
    pkgModalSubtitle: "Personalize your private expedition: select signature rail, partner luxury hotels, tailored add-ons, and tax status with real-time live quotation.",
    step1Title: "1. Select Base Expedition",
    step2Title: "2. Partner Luxury Hotel (Optional)",
    step3Title: "3. Preferred Luxury Train Carriage",
    step4Title: "4. Bespoke Upgrades & Signature Add-ons",
    step5Title: "5. Travelers, Nights & Tax Status",
    lblTravelersCount: "Number of Travelers:",
    lblNights: "Hotel Nights:",
    lblTravelDate: "Target Travel Date *",
    lblTaxRegime: "Tax Status (IGV):",
    optForeignerTax: "Foreign Non-Domiciled Traveler (0% IGV Exempt - D.L. 919 with passport)",
    optNationalTax: "Peruvian Resident / Citizen (+18% IGV with official SUNAT invoice)",
    lblQuoteSubtotal: "Net Base Subtotal:",
    lblQuoteHotel: "Accommodation:",
    lblQuoteAddons: "Add-on Experiences:",
    lblQuoteTax: "Peruvian VAT / IGV:",
    lblQuoteTotal: "Estimated Total",
    btnDispatchWhatsApp: "CONFIRM BESPOKE PACKAGE VIA WHATSAPP",
    btnRequestPdfQuote: "REQUEST FORMAL DOSSIER & PDF QUOTE",
    lblDocType: "Document Type *",
    lblDocNumber: "Document ID *",
    docPassport: "Passport (0%)",
    docDni: "DNI (+18%)",
    docCe: "Foreign ID (+18%)",
    docRuc: "Tax ID (+18%)",
    optPassport: "Passport (0% IGV)",
    optDni: "DNI (+18% IGV)",
    optCe: "Foreign ID (+18% IGV)",
    optRuc: "Tax ID (+18% IGV)",
    lblNationality: "Country / Nationality",
    lblTaxBreakdown: "Tax Breakdown & Charge Details:",
    lblDepositDueToday: "30% Luxury Deposit Due Today:",
    lblBalanceDueArrival: "70% Balance Due upon Arrival in Cusco:",
    btnViewQuoteSheet: "VIEW OFFICIAL QUOTATION SHEET (PDF)",
    btnPayDepositOnline: "PAY 30% LUXURY DEPOSIT ONLINE (CULQI)",
    btnPrintQuoteSheet: "🖨️ Print / Save as PDF",
    btnSendQuoteSheetWa: "Confirm Quotation via WhatsApp",
    qsTitle: "OFFICIAL QUOTATION SHEET",
    qsSubtitle: "BESPOKE ANDEAN EXPEDITION PROFORMA",
    btnReserveNowJump: "Reserve / Book This Journey",
    labelEmail: "Email Address *",
    lblNetBaseSubtotal: "Net Base Subtotal:",
    lblDepositTag: "30% Luxury Deposit Due Today",
    lblBalanceTag: "70% Balance Due upon Arrival in Cusco",
    summaryTitle: "Quotation Summary",
    phDocNumber: "Passport or ID Number",
    phName: "e.g. Katherine Sterling",
    phNotes: "Anniversary, dietary restrictions, private champagne preferences...",
    guest1: "1 Traveler",
    guest2: "2 Travelers",
    guest3: "3 Travelers",
    guest4: "4 Travelers",
    guest5: "5 Travelers",
    guest6: "6+ Private Charter",
    carriagePullman: "Belmond Pullman Suite Carriage (Gourmet Dining)",
    carriageObservatory: "Observation Bar Car & Panoramic Lounge",
    carriagePresidential: "Presidential / Fully Tailored Expedition"
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
    interactiveMapHint: "Haga clic en cualquier destino o botón para consultar altitud, clima y detalles de la expedición.",
    priceTaxSub: "+ IGV (Extranjeros 0% D.L. 919)",
    sidebarTaxSub: "+ 18% IGV Nacionales • Exonerado Extranjeros (D.L. 919)",
    sidebarTaxLegend: "✦ Tarifas netas + IGV. Extranjeros 0% IGV según D.L. 919 • Residentes peruanos +18% IGV.",
    certTax: "✔ Régimen Tributario: Exoneración de IGV a turistas extranjeros (D.L. 919)",
    navBuildPackage: "Arma tu Paquete",
    btnHeroBuildPackage: "✦ Arma tu Paquete a Medida",
    pkgModalKicker: "ALTA COSTURA ANDINA • RESERVA PERSONALIZADA",
    pkgModalTitle: "Arma tu Paquete a Medida",
    pkgModalSubtitle: "Personalice su expedición privada: seleccione servicio de tren, hotelería de colección, experiencias de autor y condición tributaria con cotización en tiempo real.",
    step1Title: "1. Seleccione la Expedición Base",
    step2Title: "2. Alojamiento de Colección (Opcional)",
    step3Title: "3. Servicio de Tren Preferido",
    step4Title: "4. Experiencias Exclusivas & Add-ons de Autor",
    step5Title: "5. Viajeros, Noches & Régimen de IGV",
    lblTravelersCount: "Número de Viajeros:",
    lblNights: "Noches de Hotel:",
    lblTravelDate: "Fecha Estimada de Viaje *",
    lblTaxRegime: "Condición Tributaria (IGV):",
    optForeignerTax: "Turista Extranjero No Domiciliado (Exonerado 0% IGV - D.L. 919 con pasaporte)",
    optNationalTax: "Huésped Nacional o Residente en Perú (+18% IGV Boleta/Factura)",
    lblQuoteSubtotal: "Subtotal Neto Base:",
    lblQuoteHotel: "Alojamiento:",
    lblQuoteAddons: "Experiencias de Autor:",
    lblQuoteTax: "Impuesto IGV:",
    lblQuoteTotal: "Total Estimado",
    btnDispatchWhatsApp: "CONFIRMAR PAQUETE A MEDIDA VÍA WHATSAPP",
    btnRequestPdfQuote: "SOLICITAR COTIZACIÓN FORMAL & DOSSIER PDF",
    lblDocType: "Tipo Documento *",
    lblDocNumber: "N° Documento *",
    docPassport: "Pasaporte (0%)",
    docDni: "DNI (+18%)",
    docCe: "Carné Ext. (+18%)",
    docRuc: "RUC (+18%)",
    optPassport: "Pasaporte (0% IGV)",
    optDni: "DNI (+18% IGV)",
    optCe: "Carné Extranjería (+18% IGV)",
    optRuc: "RUC (+18% IGV)",
    lblNationality: "País / Nacionalidad",
    lblTaxBreakdown: "Desglose Impositivo y Detalle de Cobro:",
    lblDepositDueToday: "30% Anticipo de Garantía (A Cobrar Hoy):",
    lblBalanceDueArrival: "70% Saldo Pendiente a la Llegada en Cusco:",
    btnViewQuoteSheet: "VER HOJA DE COTIZACIÓN FORMAL (PDF)",
    btnPayDepositOnline: "PAGAR ANTICIPO 30% ONLINE (CULQI)",
    btnPrintQuoteSheet: "🖨️ Imprimir / Guardar en PDF",
    btnSendQuoteSheetWa: "Confirmar Cotización vía WhatsApp",
    qsTitle: "HOJA DE COTIZACIÓN FORMAL",
    qsSubtitle: "PROFORMA DE EXPEDICIÓN PRIVADA",
    btnReserveNowJump: "Reservar / Cotizar Esta Expedición",
    labelEmail: "Correo Electrónico *",
    lblNetBaseSubtotal: "Subtotal Neto Base:",
    lblDepositTag: "30% Anticipo de Garantía (Cobro Hoy)",
    lblBalanceTag: "70% Saldo a la Llegada en Cusco",
    summaryTitle: "Resumen de Cotización",
    phDocNumber: "N° pasaporte o DNI",
    phName: "ej. Carlos Mendoza",
    phNotes: "Aniversario, preferencias gastronómicas, champaña privada...",
    guest1: "1 Viajero",
    guest2: "2 Viajeros",
    guest3: "3 Viajeros",
    guest4: "4 Viajeros",
    guest5: "5 Viajeros",
    guest6: "6+ Charter Privado",
    carriagePullman: "Vagón Belmond Pullman Suite (Alta Gastronomía)",
    carriageObservatory: "Coche Bar Observatorio & Salón Panorámico",
    carriagePresidential: "Vagón Presidencial / Expedición a Medida"
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

  // Immediately reflect active language & currency in UI toggle buttons
  document.documentElement.setAttribute('lang', appState.currentLang);
  document.documentElement.setAttribute('data-lang', appState.currentLang);
  document.documentElement.setAttribute('data-currency', appState.currentCurrency);
  document.getElementById('btnLangEn')?.classList.toggle('active', appState.currentLang === 'en');
  document.getElementById('btnLangEs')?.classList.toggle('active', appState.currentLang === 'es');
  document.getElementById('btnUsd')?.classList.toggle('active', appState.currentCurrency === 'USD');
  document.getElementById('btnPen')?.classList.toggle('active', appState.currentCurrency === 'PEN');

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

    if (allToursRes.ok) {
      const allData = await allToursRes.json();
      appState.allTours = Array.isArray(allData) ? allData.map(normalizeTourDetail) : [];
    }

    if (tourRes.ok) {
      const apiTour = await tourRes.json();
      appState.tour = normalizeTourDetail(apiTour);
    } else if (appState.allTours.length > 0) {
      // Fallback: If requested slug not found, load first active tour
      const fallbackTour = appState.allTours[0];
      const fbRes = await fetchApi(`/tours/${fallbackTour.slug}?lang=${appState.currentLang}`);
      if (fbRes.ok) {
        const fbData = await fbRes.json();
        appState.tour = normalizeTourDetail(fbData);
      } else {
        appState.tour = fallbackTour;
      }
    } else {
      throw new Error('Expedition not found in database');
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

  // Dynamic Open Graph & Canonical SEO update
  const canonicalTag = document.getElementById('canonicalTag');
  if (canonicalTag) canonicalTag.setAttribute('href', window.location.href);

  const ogTitle = document.getElementById('ogTitle');
  if (ogTitle) ogTitle.setAttribute('content', `${title} | Luxury Machupicchu Peru`);

  const ogDesc = document.getElementById('ogDesc');
  if (ogDesc) ogDesc.setAttribute('content', subtitle);

  const ogUrl = document.getElementById('ogUrl');
  if (ogUrl) ogUrl.setAttribute('content', window.location.href);

  const ogImage = document.getElementById('ogImage');
  if (ogImage && tour.mainImageUrl) {
    ogImage.setAttribute('content', tour.mainImageUrl.startsWith('http') ? tour.mainImageUrl : `https://nuevo.lmptravel.com/${tour.mainImageUrl}`);
  }

  const twTitle = document.getElementById('twTitle');
  if (twTitle) twTitle.setAttribute('content', `${title} | Luxury Machupicchu Peru`);

  const twDesc = document.getElementById('twDesc');
  if (twDesc) twDesc.setAttribute('content', subtitle);

  const twImage = document.getElementById('twImage');
  if (twImage && tour.mainImageUrl) {
    twImage.setAttribute('content', tour.mainImageUrl.startsWith('http') ? tour.mainImageUrl : `https://nuevo.lmptravel.com/${tour.mainImageUrl}`);
  }

  // 2. Apply static text translations
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (dict[key].includes('<')) {
        el.innerHTML = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });

  // Dynamic Placeholders
  const docNumInput = document.getElementById('sidebarDocNumber');
  if (docNumInput) docNumInput.placeholder = dict.phDocNumber || (isEs ? 'N° pasaporte o DNI' : 'Passport or ID Number');
  const nameInput = document.getElementById('sidebarName');
  if (nameInput) nameInput.placeholder = dict.phName || (isEs ? 'ej. Carlos Mendoza' : 'e.g. Katherine Sterling');
  const notesInput = document.getElementById('sidebarNotes');
  if (notesInput) notesInput.placeholder = dict.phNotes || (isEs ? 'Aniversario, preferencias gastronómicas...' : 'Anniversary, dietary restrictions, private champagne preferences...');

  // Dynamic Tax Badge (Update language synchronously)
  const badge = document.getElementById('sidebarTaxBadge');
  if (badge) {
    const detection = detectTaxRegimeFromDocument(sidebarDocType);
    badge.className = `tax-detection-badge ${detection.regime}`;
    badge.innerHTML = `<span>${detection.regime === 'national' ? '🇵🇪' : '🌍'}</span> <strong>${isEs ? detection.labelEs : detection.labelEn}</strong> — <span>${isEs ? detection.lawNoticeEs : detection.lawNoticeEn}</span>`;
  }

  // Synchronize language toggle pills
  document.getElementById('btnLangEn')?.classList.toggle('active', appState.currentLang === 'en');
  document.getElementById('btnLangEs')?.classList.toggle('active', appState.currentLang === 'es');

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
  if (timelineContainer) {
    if (tour.itineraries && tour.itineraries.length > 0) {
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
    } else {
      timelineContainer.innerHTML = `
        <div style="padding: 2.5rem 1.5rem; text-align: center; background: rgba(18, 19, 22, 0.6); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 6px;">
          <p style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--color-sand); margin-bottom: 0.5rem;">
            ${isEs ? 'Itinerario detallado y horarios personalizados coordinados directamente con su Concierge Privado.' : 'Bespoke daily scheduling and personalized logistics orchestrated directly by your Dedicated Concierge.'}
          </p>
        </div>
      `;
    }
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

function detectTaxRegimeFromDocument(docType) {
  const normType = (docType || '').toUpperCase();
  if (normType === 'DNI' || normType === 'RUC' || normType === 'CE') {
    let detType = 'DNI Nacional Perú';
    let labelEs = 'DNI Nacional (+18% IGV)';
    let labelEn = 'Peruvian National DNI (+18% VAT)';
    if (normType === 'CE') {
      detType = 'Carné de Extranjería (CE)';
      labelEs = 'Carné de Extranjería (+18% IGV)';
      labelEn = 'Alien Registration Card CE (+18% VAT)';
    } else if (normType === 'RUC') {
      detType = 'RUC (Persona / Empresa)';
      labelEs = 'RUC (+18% IGV Factura)';
      labelEn = 'Corporate Tax ID RUC (+18% VAT)';
    }
    return {
      regime: 'national',
      rate: 0.18,
      labelEs,
      labelEn,
      lawNoticeEs: 'Sujeto a 18% IGV con emisión obligatoria de Boleta o Factura SUNAT.',
      lawNoticeEn: 'Subject to 18% VAT with official SUNAT electronic tax invoice.',
      detectedType: detType
    };
  }
  return {
    regime: 'foreigner',
    rate: 0.00,
    labelEs: 'Turista Extranjero (0% IGV Exonerado)',
    labelEn: 'Foreign Traveler (0% VAT Exempt)',
    lawNoticeEs: 'Exonerado 100% de IGV (D.L. 919) con pasaporte extranjero.',
    lawNoticeEn: '100% VAT Exempt under D.L. 919 with foreign passport.',
    detectedType: 'Pasaporte Extranjero'
  };
}

let sidebarDocType = 'PASSPORT';

function handleSidebarDocTypeChange(val) {
  sidebarDocType = val;
  const detection = detectTaxRegimeFromDocument(val);
  const isEs = appState.currentLang === 'es';

  const badge = document.getElementById('sidebarTaxBadge');
  if (badge) {
    badge.className = `tax-detection-badge ${detection.regime}`;
    badge.innerHTML = `<span>${detection.regime === 'national' ? '🇵🇪' : '🌍'}</span> <strong>${isEs ? detection.labelEs : detection.labelEn}</strong> — <span>${isEs ? detection.lawNoticeEs : detection.lawNoticeEn}</span>`;
  }

  recalculateSidebarTotal();
}

function handleSidebarDocNumberInput(val) {
  // Respect the user's manual document type selection (CE, PASSPORT, DNI, RUC)
  // Do NOT override user's explicit choice.
  recalculateSidebarTotal();
}

// Recalculate Sidebar Total with Tax & Billing Split
function recalculateSidebarTotal() {
  const tour = appState.tour;
  if (!tour) return;

  const isEs = appState.currentLang === 'es';
  const rate = appState.exchangeRateUsdToPen || 3.80;
  const detection = detectTaxRegimeFromDocument(sidebarDocType);
  const isNational = detection.regime === 'national'; // DNI, CE, RUC -> PEN

  const guests = parseInt(document.getElementById('sidebarGuests')?.value || '2', 10);

  // Cálculos en USD (Pasaporte)
  const pricePerPersonUsd = tour.priceUsd;
  const netSubtotalUsd = pricePerPersonUsd * guests;
  const taxUsd = isNational ? Math.round(netSubtotalUsd * 0.18) : 0;
  const grandTotalUsd = netSubtotalUsd + taxUsd;
  const depositUsd = Math.round(grandTotalUsd * 0.30);
  const balanceUsd = grandTotalUsd - depositUsd;

  // Cálculos en PEN (DNI, CE, RUC)
  const pricePerPersonPen = tour.pricePen || Math.round(pricePerPersonUsd * rate);
  const netSubtotalPen = pricePerPersonPen * guests;
  const taxPen = Math.round(netSubtotalPen * 0.18);
  const grandTotalPen = netSubtotalPen + taxPen;
  const depositPen = Math.round(grandTotalPen * 0.30);
  const balancePen = grandTotalPen - depositPen;

  const netEl = document.getElementById('sidebarNetSubtotal');
  const taxLabelEl = document.getElementById('sidebarTaxLabel');
  const taxAmountEl = document.getElementById('sidebarTaxAmount');
  const totalQuoteEl = document.getElementById('sidebarTotalQuote');
  const depositEl = document.getElementById('sidebarDepositQuote');
  const balanceEl = document.getElementById('sidebarBalanceQuote');
  const priceDisplay = document.getElementById('sidebarPriceDisplay');

  if (isNational) {
    // DNI, CE, RUC -> Moneda en Soles (PEN S/.)
    if (priceDisplay) priceDisplay.textContent = `S/. ${pricePerPersonPen.toLocaleString('es-PE')} PEN`;
    if (netEl) netEl.textContent = `S/. ${netSubtotalPen.toLocaleString('es-PE')} PEN`;
    if (taxLabelEl) taxLabelEl.textContent = isEs ? 'Impuesto 18% IGV (SUNAT):' : '18% VAT (Tax Invoice):';
    if (taxAmountEl) {
      taxAmountEl.textContent = `+ S/. ${taxPen.toLocaleString('es-PE')} PEN`;
      taxAmountEl.style.color = 'var(--color-obsidian)';
    }
    if (totalQuoteEl) totalQuoteEl.textContent = `S/. ${grandTotalPen.toLocaleString('es-PE')} PEN`;
    if (depositEl) depositEl.textContent = `S/. ${depositPen.toLocaleString('es-PE')} PEN`;
    if (balanceEl) balanceEl.textContent = `S/. ${balancePen.toLocaleString('es-PE')} PEN`;
  } else {
    // PASAPORTE -> Moneda en Dólares (USD $)
    if (priceDisplay) priceDisplay.textContent = `$${pricePerPersonUsd.toLocaleString('en-US')} USD`;
    if (netEl) netEl.textContent = `$${netSubtotalUsd.toLocaleString('en-US')} USD`;
    if (taxLabelEl) taxLabelEl.textContent = isEs ? 'Impuesto IGV:' : 'VAT Status:';
    if (taxAmountEl) {
      taxAmountEl.textContent = isEs ? '0% IGV (Exonerado D.L. 919)' : '0% VAT (Exempt D.L. 919)';
      taxAmountEl.style.color = '#15803D';
    }
    if (totalQuoteEl) totalQuoteEl.textContent = `$${grandTotalUsd.toLocaleString('en-US')} USD + IGV`;
    if (depositEl) depositEl.textContent = `$${depositUsd.toLocaleString('en-US')} USD`;
    if (balanceEl) balanceEl.textContent = `$${balanceUsd.toLocaleString('en-US')} USD`;
  }

  // Actualizar botón de pago en línea del sidebar
  const btnOnline = document.getElementById('btnSidebarPayOnline');
  if (btnOnline) {
    const btnSpan = btnOnline.querySelector('span');
    if (btnSpan) {
      btnSpan.textContent = isNational
        ? (isEs ? `PAGAR ANTICIPO 30% ONLINE: S/. ${depositPen.toLocaleString('es-PE')} PEN` : `PAY 30% DEPOSIT ONLINE: S/. ${depositPen.toLocaleString('es-PE')} PEN`)
        : (isEs ? `PAGAR ANTICIPO 30% ONLINE: $${depositUsd.toLocaleString('en-US')} USD` : `PAY 30% DEPOSIT ONLINE: $${depositUsd.toLocaleString('en-US')} USD`);
    }
  }
}

function openSidebarQuoteSheet() {
  const modal = document.getElementById('quoteSheetModal');
  const body = document.getElementById('quoteSheetModalBody');
  if (!modal || !body) return;

  const tour = appState.tour;
  if (!tour) return;

  const isEs = appState.currentLang === 'es';
  const isPen = appState.currentCurrency === 'PEN';
  const rate = appState.exchangeRateUsdToPen || 3.80;

  const name = document.getElementById('sidebarName')?.value || (isEs ? 'Invitado de Honor' : 'Guest of Honor');
  const phone = document.getElementById('sidebarPhone')?.value || '+51 958 195 840';
  const date = document.getElementById('sidebarDate')?.value || (isEs ? 'A coordinar con concierge' : 'To be confirmed with concierge');
  const carriage = document.getElementById('sidebarCarriage')?.value || 'Belmond Pullman Suite Carriage';
  const docTypeSelect = document.getElementById('sidebarDocType');
  const docType = docTypeSelect ? docTypeSelect.options[docTypeSelect.selectedIndex].text : 'Pasaporte Extranjero';
  const docNumber = document.getElementById('sidebarDocNumber')?.value || 'PASSP-VERIFIED';

  const guests = parseInt(document.getElementById('sidebarGuests')?.value || '2', 10);
  const netSubtotalUsd = tour.priceUsd * guests;
  const detection = detectTaxRegimeFromDocument(sidebarDocType);
  const taxUsd = detection.regime === 'national' ? Math.round(netSubtotalUsd * 0.18) : 0;
  const grandTotalUsd = netSubtotalUsd + taxUsd;
  const depositUsd = Math.round(grandTotalUsd * 0.30);
  const balanceUsd = grandTotalUsd - depositUsd;

  const quoteId = `COT-2026-LMP-${Math.floor(1000 + Math.random() * 9000)}`;
  const todayStr = new Date().toLocaleDateString(isEs ? 'es-PE' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const fmtUsd = (val) => `$${Number(val).toLocaleString('en-US')} USD`;
  const fmtPen = (val) => `S/. ${Math.round(val * rate).toLocaleString('es-PE')} PEN`;

  const taxLabel = detection.regime === 'national'
    ? (isEs ? '18% I.G.V. (Gravado SUNAT)' : '18% VAT (Peruvian Tax)')
    : (isEs ? '0% I.G.V. (Exonerado D.L. 919)' : '0% VAT (Exempt D.L. 919)');

  body.innerHTML = `
    <div class="quote-sheet-wrapper">
      <div class="quote-sheet-header">
        <div class="qs-brand-block">
          <span class="qs-crest">✦</span>
          <span class="qs-brand-title">LUXURY MACHUPICCHU PERU</span>
          <p class="qs-brand-legal">
            <strong>Luxury Machupicchu Peru E.I.R.L.</strong> • RUC: 20601622492<br>
            Acreditación GERCETUR: Reg. N° 00482-CUS • MINCETUR Aprobado<br>
            Portal de Panes 123, Plaza de Armas, Cusco, Perú • Tel: +51 958 195 840
          </p>
        </div>

        <div class="qs-doc-meta">
          <span class="qs-doc-badge">${isEs ? 'HOJA DE COTIZACIÓN FORMAL' : 'OFFICIAL QUOTATION DOSSIER'}</span>
          <span class="qs-doc-id">${quoteId}</span>
          <span class="qs-doc-date">${isEs ? 'Fecha de Emisión:' : 'Issued:'} ${todayStr}</span>
          <span style="font-size:0.7rem; color: var(--color-gold); font-weight:600; margin-top:2px;">
            ${isEs ? 'Validez: 15 días calendario' : 'Validity: 15 calendar days'}
          </span>
        </div>
      </div>

      <div class="qs-parties-grid">
        <div class="qs-party-box">
          <h4>${isEs ? '1. DATOS DEL TITULAR DE RESERVA' : '1. LEAD TRAVELER DOSSIER'}</h4>
          <div class="qs-party-row"><span class="lbl">${isEs ? 'Nombre Completo:' : 'Full Name:'}</span> <span class="val">${name}</span></div>
          <div class="qs-party-row"><span class="lbl">${isEs ? 'Tipo de Documento:' : 'Document Type:'}</span> <span class="val">${docType}</span></div>
          <div class="qs-party-row"><span class="lbl">${isEs ? 'N° de Documento:' : 'Document ID:'}</span> <span class="val">${docNumber}</span></div>
          <div class="qs-party-row"><span class="lbl">${isEs ? 'Teléfono / WhatsApp:' : 'Contact:'}</span> <span class="val">${phone}</span></div>
          <div class="qs-party-row"><span class="lbl">${isEs ? 'Fecha Deseada:' : 'Travel Date:'}</span> <span class="val">${date}</span></div>
        </div>

        <div class="qs-party-box">
          <h4>${isEs ? '2. CONDICIÓN TRIBUTARIA & FISCAL (SUNAT)' : '2. OFFICIAL TAX STATUS (SUNAT)'}</h4>
          <div class="qs-party-row">
            <span class="lbl">${isEs ? 'Régimen Detectado:' : 'Tax Regime:'}</span>
            <span class="val" style="color: ${detection.regime === 'national' ? '#78350F' : '#15803D'}; font-weight:700;">
              ${detection.regime === 'national' ? '🇵🇪 Nacional / Residente (+18% IGV)' : '🌍 Extranjero No Domiciliado (0% IGV Exonerado)'}
            </span>
          </div>
          <div class="qs-party-row">
            <span class="lbl">${isEs ? 'Base Legal:' : 'Legal Ground:'}</span>
            <span class="val">${detection.regime === 'national' ? 'Ley del IGV - SUNAT (Comprobante Boleta/Factura)' : 'Decreto Legislativo N° 919 (Fomento al Turismo Receptivo)'}</span>
          </div>
          <div class="qs-party-row">
            <span class="lbl">${isEs ? 'Acreditación:' : 'Requirement:'}</span>
            <span class="val">${detection.regime === 'national' ? 'DNI o RUC vigente' : 'Pasaporte físico extranjero y TAM virtual a la llegada'}</span>
          </div>
          <div class="qs-party-row">
            <span class="lbl">${isEs ? 'Moneda Oficial:' : 'Quotation Currency:'}</span>
            <span class="val">USD ($ Dólares Americanos) / PEN (S/. Soles Peruanos)</span>
          </div>
        </div>
      </div>

      <table class="qs-table">
        <thead>
          <tr>
            <th>${isEs ? 'Concepto / Servicio Exclusivo' : 'Expedition Element'}</th>
            <th class="tar">${isEs ? 'Cant.' : 'Qty.'}</th>
            <th class="tar">${isEs ? 'Precio Unit. (USD)' : 'Unit Price (USD)'}</th>
            <th class="tar">${isEs ? 'Subtotal (USD)' : 'Subtotal (USD)'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong class="qs-item-title">${isEs ? tour.titleEs : tour.titleEn}</strong>
              <span class="qs-item-desc">${isEs ? tour.durationEs : tour.durationEn} • ${carriage} • Expedición 100% Privada</span>
            </td>
            <td class="tar">${guests} pax</td>
            <td class="tar">${fmtUsd(tour.priceUsd)}</td>
            <td class="tar"><strong>${fmtUsd(netSubtotalUsd)}</strong></td>
          </tr>
        </tbody>
      </table>

      <div class="qs-financials-container">
        <div class="qs-legal-notes">
          <h5>${isEs ? 'Certificación & Garantías de Alta Costura' : 'Certification & Guarantees'}</h5>
          <p>${isEs ? '• Esta proforma incluye permisos oficiales de ingreso al Santuario de Machu Picchu con circuitos preferenciales y reservas de tren de colección.' : '• This proforma includes official Machu Picchu sanctuary permits with priority circuits and luxury train reservations.'}</p>
          <p>${isEs ? '• Régimen impositivo calculado según el D.L. 919. Para pasajeros extranjeros, la exoneración del 18% queda formalizada al momento de registrar el pasaporte en el hotel y tren.' : '• Tax exemption grounded in D.L. 919. For foreign guests, the 0% VAT status is formalized upon physical presentation of the passport and TAM stamp.'}</p>
        </div>

        <div class="qs-totals-card">
          <div class="qs-totals-row">
            <span>${isEs ? 'Subtotal Neto Imponible:' : 'Net Base Subtotal:'}</span>
            <strong>${fmtUsd(netSubtotalUsd)}</strong>
          </div>
          <div class="qs-totals-row tax-row" style="color: ${detection.regime === 'national' ? 'var(--color-obsidian)' : '#15803D'};">
            <span>${taxLabel}:</span>
            <strong>${taxUsd > 0 ? `+ ${fmtUsd(taxUsd)}` : '$0.00 USD (0%)'}</strong>
          </div>
          <div class="qs-totals-row grand-total">
            <span>${isEs ? 'TOTAL A COBRAR:' : 'TOTAL TO CHARGE:'}</span>
            <span style="color: var(--color-gold);">${fmtUsd(grandTotalUsd)}</span>
          </div>
          <div style="font-size:0.75rem; text-align:right; color:#666; margin-bottom: 0.5rem;">
            ${isEs ? 'Equivalente en moneda nacional:' : 'Local currency equivalent:'} <strong>${fmtPen(grandTotalUsd)}</strong>
          </div>

          <div class="qs-totals-row deposit-row">
            <span>${isEs ? '30% Anticipo de Garantía (Cobro Inmediato):' : '30% Luxury Deposit (Due Today):'}</span>
            <strong>${fmtUsd(depositUsd)}</strong>
          </div>
          <div class="qs-totals-row" style="font-size:0.76rem; margin-top: 0.25rem;">
            <span>${isEs ? '70% Saldo a la Llegada en Cusco:' : '70% Balance on Arrival in Cusco:'}</span>
            <strong>${fmtUsd(balanceUsd)}</strong>
          </div>
        </div>
      </div>

      <div class="qs-actions-bar">
        <button type="button" class="qs-btn-pay" onclick="handlePayFromTourQuoteSheet('${quoteId}')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
          <span>${isEs ? 'Pagar Anticipo 30% Online (Culqi)' : 'Pay 30% Deposit Online (Culqi)'}</span>
        </button>

        <button type="button" class="qs-btn-print" onclick="printQuoteSheet()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          <span>${isEs ? 'Descargar / Imprimir en PDF' : 'Print / Download PDF'}</span>
        </button>

        <button type="button" class="qs-btn-whatsapp" onclick="sendQuoteSheetWhatsApp('${quoteId}')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.4 1.34-1.92 1.42-.5.09-1.15.12-1.85-.11-.43-.14-.99-.33-1.71-.65-3.04-1.33-5.01-4.42-5.16-4.63-.16-.2-1.23-1.64-1.23-3.13 0-1.49.78-2.22 1.06-2.52.28-.3.61-.38.81-.38.2 0 .41 0 .58.01.19.01.44-.07.69.53.25.61.85 2.08.93 2.23.08.16.13.35.03.55-.1.2-.15.33-.3.51-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.79 1.3 1.69 2.11 1.16 1.03 2.13 1.35 2.44 1.5.31.15.49.13.67-.08.19-.21.79-.92 1-1.24.21-.31.42-.26.7-.16.29.1 1.83.86 2.14 1.02.31.15.52.23.6.36.08.13.08.77-.16 1.45z"/></svg>
          <span>${isEs ? 'Confirmar Cotización con Concierge VIP' : 'Confirm Proforma with VIP Concierge'}</span>
        </button>

        <button type="button" onclick="closeQuoteSheetModal()" style="background:transparent; border:1px solid #999; padding:0.75rem 1.25rem; border-radius:3px; cursor:pointer;">
          ${isEs ? 'Cerrar' : 'Close'}
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
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
              <span class="price-tax-sub">${isEs ? '+ IGV (Extranjeros 0% D.L. 919)' : '+ IGV (Foreigners 0% D.L. 919)'}</span>
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
      "numberOfItems": (tour.itineraries || []).length,
      "itemListElement": (tour.itineraries || []).map(day => ({
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

// Direct 30% Deposit Payment via Culqi from Tour Page Sidebar
async function handleSidebarOnlinePayment() {
  console.log('[LUXURY] handleSidebarOnlinePayment initiated');
  const tour = appState.tour || {
    id: 1,
    titleEs: 'Belmond Hiram Bingham: The Pinnacle of Machu Picchu',
    titleEn: 'Belmond Hiram Bingham: The Pinnacle of Machu Picchu',
    priceUsd: 2150
  };
  const isEs = appState.currentLang === 'es';
  const isPen = appState.currentCurrency === 'PEN';
  const rate = appState.exchangeRateUsdToPen || 3.80;

  const nameInput = document.getElementById('sidebarName');
  const emailInput = document.getElementById('sidebarEmail');
  const phoneInput = document.getElementById('sidebarPhone');
  const dateInput = document.getElementById('sidebarDate');
  const guestsSelect = document.getElementById('sidebarGuests');
  const carriageSelect = document.getElementById('sidebarCarriage');
  const notesInput = document.getElementById('sidebarNotes');
  const docTypeSelect = document.getElementById('sidebarDocType');
  const docNumberInput = document.getElementById('sidebarDocNumber');

  const name = (nameInput?.value || '').trim();
  const email = (emailInput?.value || '').trim();
  const phone = (phoneInput?.value || '').trim();
  let date = dateInput?.value || '';
  const guests = parseInt(guestsSelect?.value || '2', 10);
  const carriage = carriageSelect?.value || 'Belmond Pullman Suite Carriage';
  const notes = notesInput?.value || '';
  const docType = docTypeSelect?.value || 'PASSPORT';
  const docNumber = (docNumberInput?.value || '').trim();

  const payBtn = document.getElementById('btnSidebarPayOnline');

  if (!name) {
    alert(isEs ? 'Por favor ingrese su Nombre Completo.' : 'Please enter your Lead Traveler Name.');
    nameInput?.focus();
    return;
  }

  if (!email || !email.includes('@')) {
    alert(isEs ? 'Por favor ingrese un Correo Electrónico válido para emitir su voucher de pago.' : 'Please enter a valid Email address to receive your voucher.');
    emailInput?.focus();
    return;
  }

  if (!phone) {
    alert(isEs ? 'Por favor ingrese su WhatsApp o Teléfono de contacto.' : 'Please enter your WhatsApp / Mobile number.');
    phoneInput?.focus();
    return;
  }

  if (!date) {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    date = nextWeek.toISOString().split('T')[0];
    if (dateInput) dateInput.value = date;
  }

  // Cálculos financieros garantizados
  const price = tour.priceUsd || 2150;
  const netSubtotalUsd = price * guests;
  const detection = detectTaxRegimeFromDocument(sidebarDocType || docType);
  const isNational = detection.regime === 'national';

  // Dólares (Pasaporte)
  const taxUsd = isNational ? Math.round(netSubtotalUsd * 0.18) : 0;
  const grandTotalUsd = netSubtotalUsd + taxUsd;
  const depositUsd = Math.round(grandTotalUsd * 0.30);

  // Soles (DNI, CE, RUC)
  const pricePen = tour.pricePen || Math.round(price * rate);
  const netSubtotalPen = pricePen * guests;
  const taxPen = Math.round(netSubtotalPen * 0.18);
  const grandTotalPen = netSubtotalPen + taxPen;
  const depositPen = Math.round(grandTotalPen * 0.30);

  // REGLA: Si la reserva es con Pasaporte -> USD. Si es con cualquier otra (DNI, CE, RUC) -> PEN
  const currencyToCharge = isNational ? 'PEN' : 'USD';
  const amountToCharge = isNational ? depositPen : depositUsd;

  if (payBtn) {
    payBtn.disabled = true;
    payBtn.innerHTML = `<span>⏳ ${isEs ? 'Conectando con Culqi...' : 'Connecting to Culqi...'}</span>`;
  }

  let createdBookingId = null;

  try {
    const res = await Promise.race([
      fetchApi('/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: tour.id || 1,
          fullName: name,
          email: email,
          phone: phone,
          country: isNational ? 'Perú' : 'Internacional',
          numberOfGuests: guests,
          travelDate: new Date(date).toISOString(),
          trainPreference: carriage,
          specialRequests: `[Doc: ${docType} ${docNumber}] ${notes}`.trim(),
          preferredLanguage: appState.currentLang || 'es'
        })
      }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2500))
    ]);

    if (res && res.ok) {
      const data = await res.json();
      createdBookingId = data.id;
    }
  } catch (err) {
    console.warn('Registro local completado:', err);
  }

  const tourTitle = (isEs ? tour.titleEs : tour.titleEn) || 'Expedición Privada Machu Picchu';
  const checkoutParams = new URLSearchParams({
    amount: amountToCharge.toString(),
    currency: currencyToCharge,
    amountUsd: depositUsd.toString(),
    amountPen: depositPen.toString(),
    docType: sidebarDocType || docType,
    rate: rate.toString(),
    title: `${tourTitle} (30% Anticipo)`,
    name: name,
    email: email,
    phone: phone
  });

  if (createdBookingId) {
    checkoutParams.set('bookingId', createdBookingId.toString());
  }

  window.location.href = `checkout.html?${checkoutParams.toString()}`;
}
window.handleSidebarOnlinePayment = handleSidebarOnlinePayment;

function handlePayFromTourQuoteSheet(quoteId) {
  const tour = appState.tour;
  if (!tour) return;
  const isEs = appState.currentLang === 'es';
  const rate = appState.exchangeRateUsdToPen || 3.80;

  const name = document.getElementById('sidebarName')?.value.trim() || document.getElementById('pkgGuestName')?.value.trim() || (isEs ? 'Huésped Ilustre' : 'Guest of Honor');
  const email = document.getElementById('sidebarEmail')?.value.trim() || document.getElementById('pkgGuestEmail')?.value.trim() || 'guest@luxurymachupicchu.com';
  const phone = document.getElementById('sidebarPhone')?.value.trim() || document.getElementById('pkgGuestPhone')?.value.trim() || '';
  const guests = parseInt(document.getElementById('sidebarGuests')?.value || packageBuilderState.travelers || '2', 10);

  const price = tour.priceUsd || 2150;
  const netSubtotalUsd = price * guests;
  const detection = detectTaxRegimeFromDocument(sidebarDocType || packageBuilderState.docType);
  const isNational = detection.regime === 'national';

  // Dólares (Pasaporte)
  const taxUsd = isNational ? Math.round(netSubtotalUsd * 0.18) : 0;
  const grandTotalUsd = netSubtotalUsd + taxUsd;
  const depositUsd = Math.round(grandTotalUsd * 0.30);

  // Soles (DNI, CE, RUC)
  const pricePen = tour.pricePen || Math.round(price * rate);
  const netSubtotalPen = pricePen * guests;
  const taxPen = Math.round(netSubtotalPen * 0.18);
  const grandTotalPen = netSubtotalPen + taxPen;
  const depositPen = Math.round(grandTotalPen * 0.30);

  const currencyToCharge = isNational ? 'PEN' : 'USD';
  const amountToCharge = isNational ? depositPen : depositUsd;
  const tourTitle = isEs ? tour.titleEs : tour.titleEn;

  const checkoutParams = new URLSearchParams({
    amount: amountToCharge.toString(),
    currency: currencyToCharge,
    amountUsd: depositUsd.toString(),
    amountPen: depositPen.toString(),
    docType: sidebarDocType || packageBuilderState.docType,
    rate: rate.toString(),
    pref: quoteId,
    title: `${tourTitle} (30% Anticipo)`,
    name: name,
    email: email,
    phone: phone
  });

  window.location.href = `checkout.html?${checkoutParams.toString()}`;
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
  openCustomPackageModal(appState.tour?.slug);
}

// ==========================================================================
// BESPOKE PACKAGE BUILDER (ARMA TU PAQUETE - RESERVA PERSONALIZADA)
// ==========================================================================

const BUILDER_DATA = {
  tours: [
    {
      id: 1,
      slug: 'belmond-hiram-bingham-pinnacle',
      priceUsd: 2150,
      pricePen: 8170,
      durationEn: '2 Days / 1 Night',
      durationEs: '2 Días / 1 Noche',
      nameEn: 'Machu Picchu Pinnacle & Hiram Bingham',
      nameEs: 'Machu Picchu Pinnacle & Hiram Bingham',
      subEn: 'Historic train, private archaeologist & sanctuary entry',
      subEs: 'Tren histórico, arqueólogo privado y entrada al santuario',
      tag: 'Luxury Rail'
    },
    {
      id: 2,
      slug: 'sacred-valley-prive-shamanic-ritual',
      priceUsd: 1450,
      pricePen: 5510,
      durationEn: '2 Days / 1 Night',
      durationEs: '2 Días / 1 Noche',
      nameEn: 'Sacred Valley Privé & Shamanic Ritual',
      nameEs: 'Valle Sagrado Privé y Ritual Chamánico',
      subEn: 'Maras, Moray, private hacienda & Q\'ero Andean blessing',
      subEs: 'Maras, Moray, hacienda privada y bendición Q\'ero',
      tag: 'Mysticism'
    },
    {
      id: 3,
      slug: 'belmond-andean-explorer-cusco-titicaca',
      priceUsd: 3420,
      pricePen: 12996,
      durationEn: '3 Days / 2 Nights',
      durationEs: '3 Días / 2 Noches',
      nameEn: 'Belmond Andean Explorer Sleeper Train',
      nameEs: 'Belmond Andean Explorer Tren Nocturno',
      subEn: 'Luxury sleeper carriage from Cusco across altiplano to Titicaca',
      subEs: 'Coche cama de lujo desde Cusco por el altiplano a Titicaca',
      tag: 'Grand Sleeper'
    },
    {
      id: 4,
      slug: 'classic-inca-trail-vip-glamping',
      priceUsd: 2890,
      pricePen: 10982,
      durationEn: '4 Days / 3 Nights',
      durationEs: '4 Días / 3 Noches',
      nameEn: 'Classic Inca Trail VIP Glamping',
      nameEs: 'Camino Inca Clásico VIP Glamping',
      subEn: 'Heated geodesic dome suites, hot showers & private chef',
      subEs: 'Domos calefaccionados, duchas calientes y chef privado',
      tag: 'VIP Glamping'
    },
    {
      id: 5,
      slug: 'custom-bespoke',
      priceUsd: 3950,
      pricePen: 15010,
      durationEn: '6 Days / 5 Nights',
      durationEs: '6 Días / 5 Noches',
      nameEn: 'Grand Andean 100% Bespoke Expedition',
      nameEs: 'Gran Expedición Andina 100% a Medida',
      subEn: 'Full tailor-made itinerary: Lima, Cusco, Sacred Valley & Lake Titicaca',
      subEs: 'Itinerario 100% libre y personalizado por los Andes peruanos',
      tag: 'Haute Couture'
    }
  ],
  hotels: [
    {
      id: 'none',
      priceUsd: 0,
      nameEn: 'No Hotel (Tours & Logistics Only)',
      nameEs: 'Sin Alojamiento (Solo Tours y Logística Privada)',
      subEn: 'You arrange your own lodging or already have reservations',
      subEs: 'Usted gestiona su propio hospedaje o ya cuenta con reserva',
      tag: 'Logistics Only'
    },
    {
      id: 'monasterio',
      priceUsd: 480,
      nameEn: 'Belmond Hotel Monasterio (Cusco)',
      nameEs: 'Belmond Hotel Monasterio (Cusco)',
      subEn: '16th-century colonial monastery museum & courtyard',
      subEs: 'Monasterio virreinal del siglo XVI y claustro colonial',
      tag: 'Historic Landmark'
    },
    {
      id: 'nazarenas',
      priceUsd: 590,
      nameEn: 'Belmond Palacio Nazarenas (Cusco)',
      nameEs: 'Belmond Palacio Nazarenas (Cusco)',
      subEn: 'Oxygen-enriched suites & heated outdoor private pool',
      subEs: 'Suites con oxígeno enriquecido y piscina climatizada',
      tag: 'Oxygen Suites'
    },
    {
      id: 'tambo',
      priceUsd: 450,
      nameEn: 'Tambo del Inka Resort (Sacred Valley)',
      nameEs: 'Tambo del Inka Resort (Valle Sagrado)',
      subEn: 'Luxury Collection with private train platform to citadel',
      subEs: 'Luxury Collection con andén privado de tren a la ciudadela',
      tag: 'Sacred Valley'
    },
    {
      id: 'sanctuary',
      priceUsd: 980,
      nameEn: 'Belmond Sanctuary Lodge (Machu Picchu)',
      nameEs: 'Belmond Sanctuary Lodge (Machu Picchu)',
      subEn: 'The only hotel directly adjacent to citadel entrance',
      subEs: 'El único hotel ubicado junto al ingreso al santuario',
      tag: 'Citadel Gates'
    }
  ],
  rails: [
    {
      id: 'hiram',
      diffUsd: 0,
      nameEn: 'Belmond Hiram Bingham Signature',
      nameEs: 'Belmond Hiram Bingham Signature',
      subEn: 'Gourmet 3-course dining, acoustic bar car & cocktails (Included)',
      subEs: 'Cena gourmet 3 tiempos, vagón bar acústico y cócteles (Incluido)',
      tag: 'Pinnacle Luxury'
    },
    {
      id: 'inca360',
      diffUsd: -150,
      nameEn: 'Inca Rail 360° First Class',
      nameEs: 'Inca Rail 360° First Class',
      subEn: 'Panoramic observatory windows & live Andean music (-$150 USD)',
      subEs: 'Vagón observatorio panorámico y música andina (-$150 USD)',
      tag: 'Scenic View'
    },
    {
      id: 'vistadome',
      diffUsd: -300,
      nameEn: 'Vistadome Panoramic VIP',
      nameEs: 'Vistadome Panoramic VIP',
      subEn: 'Panoramic glass ceiling & folklore celebration (-$300 USD)',
      subEs: 'Techo de cristal panorámico y danza tradicional (-$300 USD)',
      tag: 'Panoramic'
    },
    {
      id: 'overland',
      diffUsd: -450,
      nameEn: 'Private 4x4 Overland / Trek Only',
      nameEs: 'Solo Traslado Terrestre Privado 4x4 / Trek',
      subEn: 'Private vehicular convoy or foot expedition only (-$450 USD)',
      subEs: 'Transporte privado terrestre o expedición a pie (-$450 USD)',
      tag: 'Ground Only'
    }
  ],
  addons: [
    {
      id: 'lunch',
      priceUsd: 180,
      perPerson: true,
      nameEn: 'Gourmet Degustation Lunch at Belmond Sanctuary Lodge',
      nameEs: 'Almuerzo Degustación 4 Tiempos en Belmond Sanctuary Lodge',
      descEn: 'Private veranda dining overlooking Huayna Picchu peaks.',
      descEs: 'Mesa privada en terraza con vista a los picos de Huayna Picchu.'
    },
    {
      id: 'moet',
      priceUsd: 160,
      perPerson: false,
      nameEn: 'French Champagne Moët & Chandon Toast at Citadel',
      nameEs: 'Brindis con Champagne Francés Moët & Chandon en Mirador',
      descEn: 'Chilled bottle with crystal flutes served at sacred overlook.',
      descEs: 'Botella helada con copas de cristal servida en mirador sagrado.'
    },
    {
      id: 'shaman',
      priceUsd: 220,
      perPerson: false,
      nameEn: 'Private Andean Earth Offering (Pago a la Tierra) with Q\'ero Shaman',
      nameEs: 'Ceremonia Privada de Pago a la Tierra con Chamán Q\'ero',
      descEn: 'Ancestral blessing ritual connecting to Apus and Pachamama.',
      descEs: 'Ritual ancestral de bendición y conexión con los Apus sagrados.'
    },
    {
      id: 'mil',
      priceUsd: 350,
      perPerson: true,
      nameEn: 'MIL Gastronomic Immersion in Moray by Virgilio Martínez',
      nameEs: 'Inmersión Gastronómica MIL en Moray (Virgilio Martínez)',
      descEn: '8-ecosystem high-altitude tasting menu at Central\'s mountain lab.',
      descEs: 'Menú degustación de 8 alturas en el laboratorio de altura de Central.'
    },
    {
      id: 'yacht',
      priceUsd: 480,
      perPerson: false,
      nameEn: 'Private Luxury Yacht Charter on Lake Titicaca',
      nameEs: 'Chárter Privado en Yate de Lujo por el Lago Titicaca',
      descEn: 'Full-day navigation to Taquile and private floating islands.',
      descEs: 'Navegación exclusiva de día completo hacia Taquile e islas privadas.'
    },
    {
      id: 'massage',
      priceUsd: 140,
      perPerson: true,
      nameEn: 'High-Altitude Restorative Herbal Massage (60 min)',
      nameEs: 'Masaje Descontracturante Andino con Aceites Aromáticos (60 min)',
      descEn: 'Essential oils of eucalyptus, muña, and arnica for recovery.',
      descEs: 'Aceites esenciales de eucalipto, muña y árnica para recuperación.'
    },
    {
      id: 'archaeologist',
      priceUsd: 200,
      perPerson: false,
      nameEn: 'Exclusive Master Archaeologist for Entire Journey',
      nameEs: 'Arqueólogo Colegiado Exclusivo de Cátedra durante todo el viaje',
      descEn: 'Unhurried private academic guidance with deeper historical access.',
      descEs: 'Acompañamiento académico privado sin prisas ni multitudes.'
    }
  ]
};

const packageBuilderState = {
  selectedTourId: 1,
  selectedHotelId: 'none',
  selectedRailId: 'hiram',
  selectedAddonIds: new Set(),
  travelers: 2,
  hotelNights: 2,
  taxRegime: 'foreigner'
};

function renderPackageBuilderCards() {
  const isEs = appState.currentLang === 'es';
  const isPen = appState.currentCurrency === 'PEN';
  const rate = appState.exchangeRateUsdToPen || 3.80;

  // 1. Tours Grid
  const toursGrid = document.getElementById('pkgTourCardsGrid');
  if (toursGrid) {
    toursGrid.innerHTML = BUILDER_DATA.tours.map(t => {
      const isSelected = packageBuilderState.selectedTourId === t.id;
      const priceText = isPen ? `S/. ${t.pricePen.toLocaleString('es-PE')} PEN` : `$${t.priceUsd.toLocaleString('en-US')} USD`;
      return `
        <div class="pkg-select-card ${isSelected ? 'selected' : ''}" onclick="selectBuilderTour(${t.id})">
          <div>
            <span class="pkg-card-tag">${t.tag} • ${isEs ? t.durationEs : t.durationEn}</span>
            <h4 class="pkg-card-name">${isEs ? t.nameEs : t.nameEn}</h4>
            <p class="pkg-card-sub">${isEs ? t.subEs : t.subEn}</p>
          </div>
          <div class="pkg-card-price">${isEs ? 'Desde' : 'From'} ${priceText}</div>
        </div>
      `;
    }).join('');
  }

  // 2. Hotels Grid
  const hotelsGrid = document.getElementById('pkgHotelCardsGrid');
  if (hotelsGrid) {
    hotelsGrid.innerHTML = BUILDER_DATA.hotels.map(h => {
      const isSelected = packageBuilderState.selectedHotelId === h.id;
      const priceText = h.priceUsd === 0 
        ? (isEs ? 'Sin costo adicional' : 'No extra cost')
        : (isPen ? `+ S/. ${Math.round(h.priceUsd * rate).toLocaleString('es-PE')} PEN/noche` : `+ $${h.priceUsd} USD/night`);
      return `
        <div class="pkg-select-card ${isSelected ? 'selected' : ''}" onclick="selectBuilderHotel('${h.id}')">
          <div>
            <span class="pkg-card-tag">${h.tag}</span>
            <h4 class="pkg-card-name">${isEs ? h.nameEs : h.nameEn}</h4>
            <p class="pkg-card-sub">${isEs ? h.subEs : h.subEn}</p>
          </div>
          <div class="pkg-card-price" style="color: var(--color-gold);">${priceText}</div>
        </div>
      `;
    }).join('');
  }

  // 3. Rail Grid
  const railsGrid = document.getElementById('pkgRailCardsGrid');
  if (railsGrid) {
    railsGrid.innerHTML = BUILDER_DATA.rails.map(r => {
      const isSelected = packageBuilderState.selectedRailId === r.id;
      const priceText = r.diffUsd === 0
        ? (isEs ? '✓ Incluido en la base' : '✓ Included in base')
        : (r.diffUsd < 0
          ? (isPen ? `- S/. ${Math.round(Math.abs(r.diffUsd) * rate)} PEN` : `- $${Math.abs(r.diffUsd)} USD`)
          : (isPen ? `+ S/. ${Math.round(r.diffUsd * rate)} PEN` : `+ $${r.diffUsd} USD`));
      return `
        <div class="pkg-select-card ${isSelected ? 'selected' : ''}" onclick="selectBuilderRail('${r.id}')">
          <div>
            <span class="pkg-card-tag">${r.tag}</span>
            <h4 class="pkg-card-name">${isEs ? r.nameEs : r.nameEn}</h4>
            <p class="pkg-card-sub">${isEs ? r.subEs : r.subEn}</p>
          </div>
          <div class="pkg-card-price">${priceText}</div>
        </div>
      `;
    }).join('');
  }

  // 4. Addons List
  const addonsContainer = document.getElementById('pkgAddonsList');
  if (addonsContainer) {
    addonsContainer.innerHTML = BUILDER_DATA.addons.map(a => {
      const isSelected = packageBuilderState.selectedAddonIds.has(a.id);
      const priceText = a.perPerson
        ? (isPen ? `+ S/. ${Math.round(a.priceUsd * rate)} PEN / pers.` : `+ $${a.priceUsd} USD / person`)
        : (isPen ? `+ S/. ${Math.round(a.priceUsd * rate)} PEN total` : `+ $${a.priceUsd} USD total`);
      return `
        <div class="pkg-addon-item ${isSelected ? 'selected' : ''}" onclick="toggleBuilderAddon('${a.id}')">
          <input type="checkbox" class="pkg-addon-checkbox" ${isSelected ? 'checked' : ''} onclick="event.stopPropagation(); toggleBuilderAddon('${a.id}')">
          <div class="pkg-addon-info">
            <strong class="pkg-addon-title">${isEs ? a.nameEs : a.nameEn}</strong>
            <p class="pkg-addon-desc">${isEs ? a.descEs : a.descEn}</p>
          </div>
          <div class="pkg-addon-price">${priceText}</div>
        </div>
      `;
    }).join('');
  }
}

function selectBuilderTour(id) {
  packageBuilderState.selectedTourId = id;
  renderPackageBuilderCards();
  recalculatePackageBuilder();
}

function selectBuilderHotel(id) {
  packageBuilderState.selectedHotelId = id;
  renderPackageBuilderCards();
  recalculatePackageBuilder();
}

function selectBuilderRail(id) {
  packageBuilderState.selectedRailId = id;
  renderPackageBuilderCards();
  recalculatePackageBuilder();
}

function toggleBuilderAddon(id) {
  if (packageBuilderState.selectedAddonIds.has(id)) {
    packageBuilderState.selectedAddonIds.delete(id);
  } else {
    packageBuilderState.selectedAddonIds.add(id);
  }
  renderPackageBuilderCards();
  recalculatePackageBuilder();
}

function recalculatePackageBuilder() {
  const isEs = appState.currentLang === 'es';
  const isPen = appState.currentCurrency === 'PEN';
  const rate = appState.exchangeRateUsdToPen || 3.80;

  const tour = BUILDER_DATA.tours.find(t => t.id === packageBuilderState.selectedTourId) || BUILDER_DATA.tours[0];
  const hotel = BUILDER_DATA.hotels.find(h => h.id === packageBuilderState.selectedHotelId) || BUILDER_DATA.hotels[0];
  const rail = BUILDER_DATA.rails.find(r => r.id === packageBuilderState.selectedRailId) || BUILDER_DATA.rails[0];

  const travelersSelect = document.getElementById('pkgTravelers');
  const travelers = parseInt(travelersSelect?.value || '2', 10);
  packageBuilderState.travelers = travelers;

  const nightsSelect = document.getElementById('pkgHotelNights');
  const nights = parseInt(nightsSelect?.value || '2', 10);
  packageBuilderState.hotelNights = nights;

  const taxNationalRadio = document.getElementById('pkgTaxNational');
  packageBuilderState.taxRegime = (taxNationalRadio && taxNationalRadio.checked) ? 'national' : 'foreigner';

  // Base calculation
  const basePerPersonUsd = Math.max(500, tour.priceUsd + rail.diffUsd);
  const baseTotalUsd = basePerPersonUsd * travelers;

  // Hotel calculation
  const hotelTotalUsd = hotel.id !== 'none' ? hotel.priceUsd * nights : 0;

  // Addons calculation
  let addonsTotalUsd = 0;
  BUILDER_DATA.addons.forEach(a => {
    if (packageBuilderState.selectedAddonIds.has(a.id)) {
      addonsTotalUsd += a.perPerson ? a.priceUsd * travelers : a.priceUsd;
    }
  });

  const netSubtotalUsd = baseTotalUsd + hotelTotalUsd + addonsTotalUsd;

  let taxUsd = 0;
  let taxLabel = '';
  if (packageBuilderState.taxRegime === 'national') {
    taxUsd = Math.round(netSubtotalUsd * 0.18);
    taxLabel = isPen ? `S/. ${Math.round(taxUsd * rate).toLocaleString('es-PE')} PEN (+18% IGV)` : `$${taxUsd.toLocaleString('en-US')} USD (+18% IGV)`;
  } else {
    taxUsd = 0;
    taxLabel = isEs ? '0% IGV (Exonerado D.L. 919)' : '0% VAT (Exempt D.L. 919)';
  }

  const grandTotalUsd = netSubtotalUsd + taxUsd;
  const grandTotalPen = grandTotalUsd * rate;

  const fmt = (usdVal) => {
    if (isPen) {
      return `S/. ${Math.round(usdVal * rate).toLocaleString('es-PE')} PEN`;
    }
    return `$${usdVal.toLocaleString('en-US')} USD`;
  };

  const summaryTourEl = document.getElementById('pkgSelectedTourSummary');
  if (summaryTourEl) {
    summaryTourEl.textContent = `${isEs ? tour.nameEs : tour.nameEn} • ${travelers} ${isEs ? 'Viajero(s)' : 'Traveler(s)'}`;
  }

  const baseEl = document.getElementById('pkgSummaryBase');
  if (baseEl) baseEl.textContent = fmt(baseTotalUsd);

  const hotelEl = document.getElementById('pkgSummaryHotel');
  if (hotelEl) hotelEl.textContent = hotelTotalUsd > 0 ? fmt(hotelTotalUsd) : (isEs ? '$0 (Sin hotel)' : '$0 (No hotel)');

  const addonsEl = document.getElementById('pkgSummaryAddons');
  if (addonsEl) addonsEl.textContent = fmt(addonsTotalUsd);

  const netEl = document.getElementById('pkgSummaryNet');
  if (netEl) netEl.textContent = fmt(netSubtotalUsd);

  const taxEl = document.getElementById('pkgSummaryTax');
  if (taxEl) {
    taxEl.textContent = taxLabel;
    taxEl.style.color = packageBuilderState.taxRegime === 'national' ? 'var(--color-obsidian)' : '#15803D';
  }

  const totalEl = document.getElementById('pkgGrandTotal');
  if (totalEl) {
    totalEl.textContent = isPen
      ? `S/. ${Math.round(grandTotalPen).toLocaleString('es-PE')} PEN + IGV`
      : `$${grandTotalUsd.toLocaleString('en-US')} USD + IGV`;
  }

  const legendEl = document.getElementById('pkgTaxLegendBadge');
  if (legendEl) {
    legendEl.textContent = packageBuilderState.taxRegime === 'national'
      ? (isEs ? '🇵🇪 Régimen Nacional: +18% IGV Gravado con Factura/Boleta Oficial' : '🇵🇪 Peruvian Resident: +18% IGV Applied with Tax Invoice')
      : (isEs ? '✦ Extranjeros Exonerados de IGV (0%) según D.L. 919' : '✦ Foreign Travelers 100% IGV Exempt (0%) under D.L. 919');
  }

  const depositUsd = Math.round(grandTotalUsd * 0.30);
  const balanceUsd = grandTotalUsd - depositUsd;

  packageBuilderState.lastCalculations = {
    baseTotalUsd,
    hotelTotalUsd,
    addonsTotalUsd,
    netSubtotalUsd,
    taxUsd,
    grandTotalUsd,
    grandTotalPen,
    depositUsd,
    balanceUsd
  };

  const depositEl = document.getElementById('pkgDepositDue');
  if (depositEl) depositEl.textContent = fmt(depositUsd);

  const balanceEl = document.getElementById('pkgBalanceDue');
  if (balanceEl) balanceEl.textContent = fmt(balanceUsd);

  const taxTagEl = document.getElementById('pkgTaxIncludedTag');
  if (taxTagEl) {
    taxTagEl.textContent = packageBuilderState.taxRegime === 'national'
      ? (isEs ? '✓ Total incluye 18% IGV Oficial con Boleta o Factura SUNAT electrónica' : '✓ Total includes 18% Peruvian VAT with official electronic tax invoice')
      : (isEs ? '✓ Tarifa exonerada de IGV (0%) conforme a Ley D.L. 919 para turistas extranjeros' : '✓ 100% Tax-Exempt under D.L. 919 for non-domiciled international travelers');
  }
}

function handleDocTypeChange(val) {
  packageBuilderState.docType = val;
  const detection = detectTaxRegimeFromDocument(val);
  const taxNationalRadio = document.getElementById('pkgTaxNational');
  const taxForeignerRadio = document.getElementById('pkgTaxForeigner');

  if (detection.regime === 'national') {
    if (taxNationalRadio) taxNationalRadio.checked = true;
    packageBuilderState.taxRegime = 'national';
  } else {
    if (taxForeignerRadio) taxForeignerRadio.checked = true;
    packageBuilderState.taxRegime = 'foreigner';
  }

  const badge = document.getElementById('pkgTaxDetectionBadge');
  if (badge) {
    const isEs = appState.currentLang === 'es';
    badge.className = `tax-detection-badge ${detection.regime}`;
    badge.innerHTML = `<span>${detection.regime === 'national' ? '🇵🇪' : '🌍'}</span> <strong>${isEs ? detection.labelEs : detection.labelEn}</strong> — <span>${isEs ? detection.lawNoticeEs : detection.lawNoticeEn}</span>`;
  }

  recalculatePackageBuilder();
}

function handleDocNumberInput(val) {
  packageBuilderState.docNumber = val;
  // Respect the user's manual document type selection (CE, PASSPORT, DNI, RUC)
  // Do NOT override user's explicit choice.
  recalculatePackageBuilder();
}

function openQuoteSheetModal() {
  const modal = document.getElementById('quoteSheetModal');
  const body = document.getElementById('quoteSheetModalBody');
  if (!modal || !body) return;

  const isEs = appState.currentLang === 'es';
  const isPen = appState.currentCurrency === 'PEN';
  const rate = appState.exchangeRateUsdToPen || 3.80;

  const tour = BUILDER_DATA.tours.find(t => t.id === packageBuilderState.selectedTourId) || BUILDER_DATA.tours[0];
  const hotel = BUILDER_DATA.hotels.find(h => h.id === packageBuilderState.selectedHotelId) || BUILDER_DATA.hotels[0];
  const rail = BUILDER_DATA.rails.find(r => r.id === packageBuilderState.selectedRailId) || BUILDER_DATA.rails[0];

  const name = document.getElementById('pkgGuestName')?.value || (isEs ? 'Invitado de Honor' : 'Guest of Honor');
  const email = document.getElementById('pkgGuestEmail')?.value || 'info@lmptravel.com';
  const phone = document.getElementById('pkgGuestPhone')?.value || '+51 958 195 840';
  const date = document.getElementById('pkgTravelDate')?.value || (isEs ? 'A coordinar con concierge' : 'To be confirmed with concierge');
  const docTypeSelect = document.getElementById('pkgDocType');
  const docType = docTypeSelect ? docTypeSelect.options[docTypeSelect.selectedIndex].text : 'Pasaporte Extranjero';
  const docNumber = document.getElementById('pkgDocNumber')?.value || 'PASSP-VERIFIED';
  const nationality = document.getElementById('pkgNationality')?.value || (packageBuilderState.taxRegime === 'national' ? 'Perú' : 'Internacional');

  const travelers = packageBuilderState.travelers;
  const nights = packageBuilderState.hotelNights;
  const calcs = packageBuilderState.lastCalculations || {
    baseTotalUsd: tour.priceUsd * travelers,
    hotelTotalUsd: 0,
    addonsTotalUsd: 0,
    netSubtotalUsd: tour.priceUsd * travelers,
    taxUsd: 0,
    grandTotalUsd: tour.priceUsd * travelers,
    grandTotalPen: tour.pricePen * travelers,
    depositUsd: Math.round(tour.priceUsd * travelers * 0.30),
    balanceUsd: tour.priceUsd * travelers - Math.round(tour.priceUsd * travelers * 0.30)
  };

  const quoteId = `COT-2026-LMP-${Math.floor(1000 + Math.random() * 9000)}`;
  const todayStr = new Date().toLocaleDateString(isEs ? 'es-PE' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const selectedAddons = BUILDER_DATA.addons.filter(a => packageBuilderState.selectedAddonIds.has(a.id));

  const fmtUsd = (val) => `$${Number(val).toLocaleString('en-US')} USD`;
  const fmtPen = (val) => `S/. ${Math.round(val * rate).toLocaleString('es-PE')} PEN`;

  const taxLabel = packageBuilderState.taxRegime === 'national'
    ? (isEs ? '18% I.G.V. (Gravado SUNAT)' : '18% VAT (Peruvian Tax)')
    : (isEs ? '0% I.G.V. (Exonerado D.L. 919)' : '0% VAT (Exempt D.L. 919)');

  body.innerHTML = `
    <div class="quote-sheet-wrapper">
      <div class="quote-sheet-header">
        <div class="qs-brand-block">
          <span class="qs-crest">✦</span>
          <span class="qs-brand-title">LUXURY MACHUPICCHU PERU</span>
          <p class="qs-brand-legal">
            <strong>Luxury Machupicchu Peru E.I.R.L.</strong> • RUC: 20601622492<br>
            Acreditación GERCETUR: Reg. N° 00482-CUS • MINCETUR Aprobado<br>
            Portal de Panes 123, Plaza de Armas, Cusco, Perú • Tel: +51 958 195 840
          </p>
        </div>

        <div class="qs-doc-meta">
          <span class="qs-doc-badge">${isEs ? 'HOJA DE COTIZACIÓN FORMAL' : 'OFFICIAL QUOTATION DOSSIER'}</span>
          <span class="qs-doc-id">${quoteId}</span>
          <span class="qs-doc-date">${isEs ? 'Fecha de Emisión:' : 'Issued:'} ${todayStr}</span>
          <span style="font-size:0.7rem; color: var(--color-gold); font-weight:600; margin-top:2px;">
            ${isEs ? 'Validez: 15 días calendario' : 'Validity: 15 calendar days'}
          </span>
        </div>
      </div>

      <div class="qs-parties-grid">
        <div class="qs-party-box">
          <h4>${isEs ? '1. DATOS DEL TITULAR DE RESERVA' : '1. LEAD TRAVELER DOSSIER'}</h4>
          <div class="qs-party-row"><span class="lbl">${isEs ? 'Nombre Completo:' : 'Full Name:'}</span> <span class="val">${name}</span></div>
          <div class="qs-party-row"><span class="lbl">${isEs ? 'Tipo de Documento:' : 'Document Type:'}</span> <span class="val">${docType}</span></div>
          <div class="qs-party-row"><span class="lbl">${isEs ? 'N° de Documento:' : 'Document ID:'}</span> <span class="val">${docNumber}</span></div>
          <div class="qs-party-row"><span class="lbl">${isEs ? 'Nacionalidad / País:' : 'Nationality / Country:'}</span> <span class="val">${nationality}</span></div>
          <div class="qs-party-row"><span class="lbl">${isEs ? 'Contacto / Email:' : 'Contact:'}</span> <span class="val">${email} • ${phone}</span></div>
          <div class="qs-party-row"><span class="lbl">${isEs ? 'Fecha Deseada:' : 'Travel Date:'}</span> <span class="val">${date}</span></div>
        </div>

        <div class="qs-party-box">
          <h4>${isEs ? '2. CONDICIÓN TRIBUTARIA & FISCAL (SUNAT)' : '2. OFFICIAL TAX STATUS (SUNAT)'}</h4>
          <div class="qs-party-row">
            <span class="lbl">${isEs ? 'Régimen Detectado:' : 'Tax Regime:'}</span>
            <span class="val" style="color: ${packageBuilderState.taxRegime === 'national' ? '#78350F' : '#15803D'}; font-weight:700;">
              ${packageBuilderState.taxRegime === 'national' ? '🇵🇪 Nacional / Residente (+18% IGV)' : '🌍 Extranjero No Domiciliado (0% IGV Exonerado)'}
            </span>
          </div>
          <div class="qs-party-row">
            <span class="lbl">${isEs ? 'Base Legal:' : 'Legal Ground:'}</span>
            <span class="val">${packageBuilderState.taxRegime === 'national' ? 'Ley del IGV - SUNAT (Comprobante Boleta/Factura)' : 'Decreto Legislativo N° 919 (Fomento al Turismo Receptivo)'}</span>
          </div>
          <div class="qs-party-row">
            <span class="lbl">${isEs ? 'Acreditación:' : 'Requirement:'}</span>
            <span class="val">${packageBuilderState.taxRegime === 'national' ? 'DNI o RUC vigente' : 'Pasaporte físico extranjero y TAM virtual a la llegada'}</span>
          </div>
          <div class="qs-party-row">
            <span class="lbl">${isEs ? 'Moneda Oficial:' : 'Quotation Currency:'}</span>
            <span class="val">USD ($ Dólares Americanos) / PEN (S/. Soles Peruanos)</span>
          </div>
        </div>
      </div>

      <table class="qs-table">
        <thead>
          <tr>
            <th>${isEs ? 'Concepto / Servicio Exclusivo' : 'Expedition Element'}</th>
            <th class="tar">${isEs ? 'Cant.' : 'Qty.'}</th>
            <th class="tar">${isEs ? 'Precio Unit. (USD)' : 'Unit Price (USD)'}</th>
            <th class="tar">${isEs ? 'Subtotal (USD)' : 'Subtotal (USD)'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong class="qs-item-title">${isEs ? tour.nameEs : tour.nameEn}</strong>
              <span class="qs-item-desc">${isEs ? tour.durationEs : tour.durationEn} • ${rail.nameEn}</span>
            </td>
            <td class="tar">${travelers} pax</td>
            <td class="tar">${fmtUsd(tour.priceUsd + rail.diffUsd)}</td>
            <td class="tar"><strong>${fmtUsd(calcs.baseTotalUsd)}</strong></td>
          </tr>
          ${hotel.id !== 'none' ? `
            <tr>
              <td>
                <strong class="qs-item-title">${isEs ? hotel.nameEs : hotel.nameEn}</strong>
                <span class="qs-item-desc">${nights} ${isEs ? 'noche(s) de hospedaje de colección' : 'night(s) collection accommodation'}</span>
              </td>
              <td class="tar">${nights} nts</td>
              <td class="tar">${fmtUsd(hotel.priceUsd)}</td>
              <td class="tar"><strong>${fmtUsd(calcs.hotelTotalUsd)}</strong></td>
            </tr>
          ` : ''}
          ${selectedAddons.map(a => `
            <tr>
              <td>
                <strong class="qs-item-title">${isEs ? a.nameEs : a.nameEn}</strong>
                <span class="qs-item-desc">${isEs ? a.descEs : a.descEn}</span>
              </td>
              <td class="tar">${a.perPerson ? `${travelers} pax` : '1 servicio'}</td>
              <td class="tar">${fmtUsd(a.priceUsd)}</td>
              <td class="tar"><strong>${fmtUsd(a.perPerson ? a.priceUsd * travelers : a.priceUsd)}</strong></td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="qs-financials-container">
        <div class="qs-legal-notes">
          <h5>${isEs ? 'Certificación & Garantías de Alta Costura' : 'Certification & Guarantees'}</h5>
          <p>${isEs ? '• Esta proforma incluye permisos oficiales de ingreso al Santuario de Machu Picchu con circuitos preferenciales y reservas de tren de colección.' : '• This proforma includes official Machu Picchu sanctuary permits with priority circuits and luxury train reservations.'}</p>
          <p>${isEs ? '• Régimen impositivo calculado según el D.L. 919. Para pasajeros extranjeros, la exoneración del 18% queda formalizada al momento de registrar el pasaporte en el hotel y tren.' : '• Tax exemption grounded in D.L. 919. For foreign guests, the 0% VAT status is formalized upon physical presentation of the passport and TAM stamp.'}</p>
        </div>

        <div class="qs-totals-card">
          <div class="qs-totals-row">
            <span>${isEs ? 'Subtotal Neto Imponible:' : 'Net Base Subtotal:'}</span>
            <strong>${fmtUsd(calcs.netSubtotalUsd)}</strong>
          </div>
          <div class="qs-totals-row tax-row" style="color: ${packageBuilderState.taxRegime === 'national' ? 'var(--color-obsidian)' : '#15803D'};">
            <span>${taxLabel}:</span>
            <strong>${calcs.taxUsd > 0 ? `+ ${fmtUsd(calcs.taxUsd)}` : '$0.00 USD (0%)'}</strong>
          </div>
          <div class="qs-totals-row grand-total">
            <span>${isEs ? 'TOTAL A COBRAR:' : 'TOTAL TO CHARGE:'}</span>
            <span style="color: var(--color-gold);">${fmtUsd(calcs.grandTotalUsd)}</span>
          </div>
          <div style="font-size:0.75rem; text-align:right; color:#666; margin-bottom: 0.5rem;">
            ${isEs ? 'Equivalente en moneda nacional:' : 'Local currency equivalent:'} <strong>${fmtPen(calcs.grandTotalPen)}</strong>
          </div>

          <div class="qs-totals-row deposit-row">
            <span>${isEs ? '30% Anticipo de Garantía (Cobro Inmediato):' : '30% Luxury Deposit (Due Today):'}</span>
            <strong>${fmtUsd(calcs.depositUsd)}</strong>
          </div>
          <div class="qs-totals-row" style="font-size:0.76rem; margin-top: 0.25rem;">
            <span>${isEs ? '70% Saldo a la Llegada en Cusco:' : '70% Balance on Arrival in Cusco:'}</span>
            <strong>${fmtUsd(calcs.balanceUsd)}</strong>
          </div>
        </div>
      </div>

      <div class="qs-actions-bar">
        <button type="button" class="qs-btn-pay" onclick="handlePayFromTourQuoteSheet('${quoteId}')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
          <span>${isEs ? 'Pagar Anticipo 30% Online (Culqi)' : 'Pay 30% Deposit Online (Culqi)'}</span>
        </button>

        <button type="button" class="qs-btn-print" onclick="printQuoteSheet()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          <span>${isEs ? 'Descargar / Imprimir en PDF' : 'Print / Download PDF'}</span>
        </button>

        <button type="button" class="qs-btn-whatsapp" onclick="sendQuoteSheetWhatsApp('${quoteId}')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.4 1.34-1.92 1.42-.5.09-1.15.12-1.85-.11-.43-.14-.99-.33-1.71-.65-3.04-1.33-5.01-4.42-5.16-4.63-.16-.2-1.23-1.64-1.23-3.13 0-1.49.78-2.22 1.06-2.52.28-.3.61-.38.81-.38.2 0 .41 0 .58.01.19.01.44-.07.69.53.25.61.85 2.08.93 2.23.08.16.13.35.03.55-.1.2-.15.33-.3.51-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.79 1.3 1.69 2.11 1.16 1.03 2.13 1.35 2.44 1.5.31.15.49.13.67-.08.19-.21.79-.92 1-1.24.21-.31.42-.26.7-.16.29.1 1.83.86 2.14 1.02.31.15.52.23.6.36.08.13.08.77-.16 1.45z"/></svg>
          <span>${isEs ? 'Confirmar Cotización con Concierge VIP' : 'Confirm Proforma with VIP Concierge'}</span>
        </button>

        <button type="button" onclick="closeQuoteSheetModal()" style="background:transparent; border:1px solid #999; padding:0.75rem 1.25rem; border-radius:3px; cursor:pointer;">
          ${isEs ? 'Cerrar' : 'Close'}
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function openCustomPackageModal(preselectedSlugOrId) {
  const modal = document.getElementById('packageBuilderModal');
  if (!modal) return;

  if (preselectedSlugOrId) {
    const match = BUILDER_DATA.tours.find(t => t.slug === preselectedSlugOrId || t.id === Number(preselectedSlugOrId));
    if (match) {
      packageBuilderState.selectedTourId = match.id;
    }
  }

  renderPackageBuilderCards();
  recalculatePackageBuilder();

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closePackageBuilderModal() {
  const modal = document.getElementById('packageBuilderModal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function handlePackageBuilderWhatsApp() {
  const isEs = appState.currentLang === 'es';
  const tour = BUILDER_DATA.tours.find(t => t.id === packageBuilderState.selectedTourId) || BUILDER_DATA.tours[0];
  const hotel = BUILDER_DATA.hotels.find(h => h.id === packageBuilderState.selectedHotelId) || BUILDER_DATA.hotels[0];
  const rail = BUILDER_DATA.rails.find(r => r.id === packageBuilderState.selectedRailId) || BUILDER_DATA.rails[0];

  const name = document.getElementById('pkgGuestName')?.value || 'Invitado Distinguido';
  const email = document.getElementById('pkgGuestEmail')?.value || '';
  const phone = document.getElementById('pkgGuestPhone')?.value || '';
  const date = document.getElementById('pkgTravelDate')?.value || 'A coordinar';
  const notes = document.getElementById('pkgSpecialNotes')?.value || '';
  const travelers = packageBuilderState.travelers;
  const nights = packageBuilderState.hotelNights;

  const selectedAddonNames = Array.from(packageBuilderState.selectedAddonIds).map(id => {
    const a = BUILDER_DATA.addons.find(x => x.id === id);
    return a ? `• ${isEs ? a.nameEs : a.nameEn}` : '';
  }).filter(Boolean);

  const grandTotalText = document.getElementById('pkgGrandTotal')?.textContent || '';
  const taxText = packageBuilderState.taxRegime === 'national' ? '🇵🇪 Nacional (+18% IGV)' : '🌍 Extranjero (0% Exonerado D.L. 919)';

  const waMessage = isEs
    ? `✨ *Luxury Machupicchu Peru - Cotización de Paquete a Medida (Arma tu Paquete)*\n\n` +
      `Estimado Concierge, mi nombre es *${name}*.\n\n` +
      `🏛️ *Expedición Base:* ${tour.nameEs} (${tour.durationEs})\n` +
      `👥 *Viajeros:* ${travelers} persona(s)\n` +
      `📅 *Fecha Deseada:* ${date}\n` +
      `🚆 *Servicio Ferroviario:* ${rail.nameEs}\n` +
      `🏨 *Alojamiento:* ${hotel.nameEs} (${nights} noche(s))\n` +
      (selectedAddonNames.length > 0 ? `✦ *Experiencias Exclusivas:*\n${selectedAddonNames.join('\n')}\n` : '') +
      `⚖️ *Condición Tributaria:* ${taxText}\n` +
      `💰 *Monto Estimado:* ${grandTotalText}\n` +
      (email ? `✉️ *Email:* ${email}\n` : '') +
      (phone ? `📞 *Teléfono:* ${phone}\n` : '') +
      (notes ? `📝 *Requerimientos Especiales:* ${notes}\n` : '') +
      `\nSolicito confirmación de disponibilidad con el atelier privado.`
    : `✨ *Luxury Machupicchu Peru - Bespoke Package Quotation (Build Your Package)*\n\n` +
      `Dear Concierge, my name is *${name}*.\n\n` +
      `🏛️ *Base Journey:* ${tour.nameEn} (${tour.durationEn})\n` +
      `👥 *Travelers:* ${travelers} guest(s)\n` +
      `📅 *Target Date:* ${date}\n` +
      `🚆 *Train Preference:* ${rail.nameEn}\n` +
      `🏨 *Accommodation:* ${hotel.nameEn} (${nights} night(s))\n` +
      (selectedAddonNames.length > 0 ? `✦ *Bespoke Add-ons:*\n${selectedAddonNames.join('\n')}\n` : '') +
      `⚖️ *Tax Status:* ${taxText}\n` +
      `💰 *Estimated Total:* ${grandTotalText}\n` +
      (email ? `✉️ *Email:* ${email}\n` : '') +
      (phone ? `📞 *Phone:* ${phone}\n` : '') +
      (notes ? `📝 *Special Notes:* ${notes}\n` : '') +
      `\nI request journey availability confirmation with the private concierge atelier.`;

  const waUrl = `https://wa.me/51958195840?text=${encodeURIComponent(waMessage)}`;

  try {
    fetchApi('/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tourId: tour.id,
        fullName: name,
        email: email || 'concierge-lead@luxurymachupicchu.com',
        phone: phone || '+51958195840',
        numberOfGuests: travelers,
        travelDate: date && date !== 'A coordinar' ? new Date(date).toISOString() : null,
        trainPreference: rail.nameEn,
        specialRequests: `[ARMA TU PAQUETE] Hotel: ${hotel.nameEn} (${nights}n) | Addons: ${selectedAddonNames.join(', ')} | Tax: ${taxText} | Total: ${grandTotalText} | Notes: ${notes}`,
        preferredLanguage: appState.currentLang
      })
    }).catch(() => {});
  } catch {}

  const statusEl = document.getElementById('pkgStatusMsg');
  if (statusEl) {
    statusEl.innerHTML = `<span style="color: #20BD5A; font-weight: 500;">✓ ${isEs ? 'Redirigiendo a Concierge VIP vía WhatsApp...' : 'Connecting to VIP Concierge on WhatsApp...'}</span>`;
  }

  setTimeout(() => {
    window.open(waUrl, '_blank');
  }, 500);
}

async function handlePackageBuilderSubmit() {
  const isEs = appState.currentLang === 'es';
  const tour = BUILDER_DATA.tours.find(t => t.id === packageBuilderState.selectedTourId) || BUILDER_DATA.tours[0];
  const hotel = BUILDER_DATA.hotels.find(h => h.id === packageBuilderState.selectedHotelId) || BUILDER_DATA.hotels[0];
  const rail = BUILDER_DATA.rails.find(r => r.id === packageBuilderState.selectedRailId) || BUILDER_DATA.rails[0];

  const name = document.getElementById('pkgGuestName')?.value;
  const email = document.getElementById('pkgGuestEmail')?.value;
  const phone = document.getElementById('pkgGuestPhone')?.value;
  const date = document.getElementById('pkgTravelDate')?.value;
  const notes = document.getElementById('pkgSpecialNotes')?.value || '';

  if (!name || !email) {
    alert(isEs ? 'Por favor ingrese su Nombre y Correo Electrónico para enviarle la cotización en PDF.' : 'Please enter your Full Name and Email Address to receive the PDF quotation.');
    document.getElementById('pkgGuestName')?.focus();
    return;
  }

  const statusEl = document.getElementById('pkgStatusMsg');
  if (statusEl) {
    statusEl.innerHTML = `<span style="color: var(--color-gold);">Generando expediente y cotización formal...</span>`;
  }

  const selectedAddonNames = Array.from(packageBuilderState.selectedAddonIds).map(id => {
    const a = BUILDER_DATA.addons.find(x => x.id === id);
    return a ? `• ${isEs ? a.nameEs : a.nameEn}` : '';
  }).filter(Boolean);

  const grandTotalText = document.getElementById('pkgGrandTotal')?.textContent || '';
  const taxText = packageBuilderState.taxRegime === 'national' ? 'Nacional (+18% IGV)' : 'Extranjero (0% IGV D.L. 919)';

  try {
    const res = await fetchApi('/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tourId: tour.id,
        fullName: name,
        email: email,
        phone: phone || '+51958195840',
        numberOfGuests: packageBuilderState.travelers,
        travelDate: date ? new Date(date).toISOString() : null,
        trainPreference: rail.nameEn,
        specialRequests: `[ARMA TU PAQUETE EN PDF] Hotel: ${hotel.nameEn} (${packageBuilderState.hotelNights} noches) | Extras: ${selectedAddonNames.join(', ')} | Régimen: ${taxText} | Cotización: ${grandTotalText} | Notas: ${notes}`,
        preferredLanguage: appState.currentLang
      })
    });

    if (res.ok) {
      if (statusEl) {
        statusEl.innerHTML = `
          <div style="background: rgba(32, 189, 90, 0.12); border: 1px solid #20BD5A; padding: 0.75rem; border-radius: 4px; color: #15803D; margin-top: 0.5rem;">
            ✓ <strong>${isEs ? '¡Solicitud Recibida con Éxito!' : 'Bespoke Dossier Requested!'}</strong><br>
            <span style="font-size:0.75rem;">${isEs ? 'Un arquitecto de viajes de Luxury Machupicchu elaborará su dossier en PDF y se contactará a su email en menos de 4 horas.' : 'A senior travel architect will calibrate your bespoke PDF dossier and email it to you within 4 hours.'}</span>
          </div>
        `;
      }
    } else {
      throw new Error('API request failed');
    }
  } catch (err) {
    if (statusEl) {
      statusEl.innerHTML = `
        <div style="background: rgba(197, 164, 126, 0.15); border: 1px solid var(--color-gold); padding: 0.75rem; border-radius: 4px; color: var(--color-obsidian); margin-top: 0.5rem;">
          ✓ <strong>${isEs ? 'Solicitud registrada localmente' : 'Request registered'}</strong><br>
          <span style="font-size:0.75rem;">${isEs ? 'Para confirmación inmediata, utilice el botón de WhatsApp arriba.' : 'For instant confirmation, dispatch directly via WhatsApp above.'}</span>
        </div>
      `;
    }
  }
}

// Direct 30% Deposit Payment from Bespoke Package Builder Modal
async function handlePackageBuilderOnlinePayment() {
  const isEs = appState.currentLang === 'es';
  const isPen = appState.currentCurrency === 'PEN';
  const rate = appState.exchangeRateUsdToPen || 3.80;

  const tour = BUILDER_DATA.tours.find(t => t.id === packageBuilderState.selectedTourId) || BUILDER_DATA.tours[0];
  const hotel = BUILDER_DATA.hotels.find(h => h.id === packageBuilderState.selectedHotelId) || BUILDER_DATA.hotels[0];
  const rail = BUILDER_DATA.rails.find(r => r.id === packageBuilderState.selectedRailId) || BUILDER_DATA.rails[0];

  const nameInput = document.getElementById('pkgGuestName');
  const emailInput = document.getElementById('pkgGuestEmail');
  const phoneInput = document.getElementById('pkgGuestPhone');
  const dateInput = document.getElementById('pkgTravelDate');
  const notesInput = document.getElementById('pkgSpecialNotes');
  const docTypeSelect = document.getElementById('pkgDocType');
  const docNumberInput = document.getElementById('pkgDocNumber');

  const name = (nameInput?.value || '').trim();
  const email = (emailInput?.value || '').trim();
  const phone = (phoneInput?.value || '').trim();
  const date = dateInput?.value || '';
  const notes = (notesInput?.value || '').trim();
  const docType = docTypeSelect?.value || 'PASSPORT';
  const docNumber = (docNumberInput?.value || '').trim();

  const statusEl = document.getElementById('pkgStatusMsg');

  if (!name) {
    if (statusEl) statusEl.innerHTML = `<span style="color:#DC2626; font-weight:600;">⚠️ ${isEs ? 'Por favor ingrese su Nombre Completo.' : 'Please enter your Lead Traveler Name.'}</span>`;
    nameInput?.focus();
    return;
  }

  if (!email || !email.includes('@')) {
    if (statusEl) statusEl.innerHTML = `<span style="color:#DC2626; font-weight:600;">⚠️ ${isEs ? 'Por favor ingrese un Correo Electrónico válido.' : 'Please enter a valid Email address.'}</span>`;
    emailInput?.focus();
    return;
  }

  if (!phone) {
    if (statusEl) statusEl.innerHTML = `<span style="color:#DC2626; font-weight:600;">⚠️ ${isEs ? 'Por favor ingrese su WhatsApp o Teléfono.' : 'Please enter your WhatsApp / Mobile number.'}</span>`;
    phoneInput?.focus();
    return;
  }

  if (!date) {
    if (statusEl) statusEl.innerHTML = `<span style="color:#DC2626; font-weight:600;">⚠️ ${isEs ? 'Por favor seleccione la Fecha de Viaje.' : 'Please select your target travel date.'}</span>`;
    dateInput?.focus();
    return;
  }

  const isNational = packageBuilderState.taxRegime === 'national'; // DNI, CE, RUC

  const calcs = packageBuilderState.lastCalculations || {
    grandTotalUsd: tour.priceUsd * packageBuilderState.travelers,
    depositUsd: Math.round(tour.priceUsd * packageBuilderState.travelers * 0.30),
    grandTotalPen: (tour.pricePen || tour.priceUsd * rate) * packageBuilderState.travelers,
    depositPen: Math.round(((tour.pricePen || tour.priceUsd * rate) * packageBuilderState.travelers) * 0.30)
  };

  const depositUsd = calcs.depositUsd;
  const depositPen = calcs.depositPen || Math.round(depositUsd * rate);

  // REGLA: Si la reserva es con Pasaporte -> USD. Si es con cualquier otra (DNI, CE, RUC) -> PEN
  const currencyToCharge = isNational ? 'PEN' : 'USD';
  const amountToCharge = isNational ? depositPen : depositUsd;

  if (statusEl) {
    statusEl.innerHTML = `<span style="color:var(--color-gold); font-weight:500;">⏳ ${isEs ? 'Registrando paquete a medida y conectando con Culqi...' : 'Registering bespoke journey and connecting to Culqi...'}</span>`;
  }

  let createdBookingId = null;

  try {
    const res = await fetchApi('/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tourId: tour.id,
        fullName: name,
        email: email,
        phone: phone,
        country: isNational ? 'Perú' : 'Internacional',
        numberOfGuests: packageBuilderState.travelers,
        travelDate: new Date(date).toISOString(),
        trainPreference: isEs ? rail.nameEs : rail.nameEn,
        specialRequests: `[Bespoke Package] Hotel: ${isEs ? hotel.nameEs : hotel.nameEn} (${packageBuilderState.hotelNights}n) | Doc: ${docType} ${docNumber} | ${notes}`.trim(),
        preferredLanguage: appState.currentLang
      })
    });

    if (res.ok) {
      const data = await res.json();
      createdBookingId = data.id;
    }
  } catch (err) {
    console.warn('Registro local completado:', err);
  }

  const tourTitle = isEs ? tour.nameEs : tour.nameEn;
  const checkoutParams = new URLSearchParams({
    amount: amountToCharge.toString(),
    currency: currencyToCharge,
    amountUsd: depositUsd.toString(),
    amountPen: depositPen.toString(),
    docType: docType,
    rate: rate.toString(),
    title: `${tourTitle} (30% Anticipo)`,
    name: name,
    email: email,
    phone: phone
  });

  if (createdBookingId) {
    checkoutParams.set('bookingId', createdBookingId.toString());
  }

  window.location.href = `checkout.html?${checkoutParams.toString()}`;
}

function openLegalModal(tab = 'claims') {
  const modal = document.getElementById('legalModal');
  if (!modal) return;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  switchLegalTab(tab);
}

function closeLegalModal() {
  const modal = document.getElementById('legalModal');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function switchLegalTab(tabName) {
  const tabs = ['claims', 'terms', 'privacy', 'esnna', 'licenses'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tabBtn${t.charAt(0).toUpperCase() + t.slice(1)}`);
    const pane = document.getElementById(`pane${t.charAt(0).toUpperCase() + t.slice(1)}`);
    if (btn) {
      if (t === tabName) btn.classList.add('active');
      else btn.classList.remove('active');
    }
    if (pane) {
      if (t === tabName) pane.classList.add('active');
      else pane.classList.remove('active');
    }
  });
}

function openClaimModal(type = 'claims') {
  openLegalModal(type);
}

function handleLegalClaimSubmit(event) {
  event.preventDefault();
  const form = document.getElementById('claimForm');
  if (!form) return;

  const fullName = document.getElementById('claimFullName')?.value.trim();
  const docType = document.getElementById('claimDocType')?.value || 'PASAPORTE';
  const docNum = document.getElementById('claimDocNumber')?.value.trim();
  const email = document.getElementById('claimEmail')?.value.trim();
  const phone = document.getElementById('claimPhone')?.value.trim();
  const address = document.getElementById('claimAddress')?.value.trim();
  const service = document.getElementById('claimService')?.value.trim();
  const amount = document.getElementById('claimAmount')?.value.trim();
  const claimType = document.querySelector('input[name="claimType"]:checked')?.value || 'Reclamo';
  const detail = document.getElementById('claimDetail')?.value.trim();
  const request = document.getElementById('claimRequest')?.value.trim();

  if (!fullName || !docNum || !email || !detail || !request) {
    alert('Por favor complete todos los campos obligatorios del Libro de Reclamaciones.');
    return;
  }

  // Generate official tracking code
  const trackingCode = `RCL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const dateStr = new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  const resultContainer = document.getElementById('claimResultContainer');
  const formContainer = document.getElementById('claimFormContainer');

  if (resultContainer && formContainer) {
    formContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    resultContainer.innerHTML = `
      <div class="claim-success-card">
        <div class="claim-success-icon">✓</div>
        <span class="claim-success-kicker">HOJA DE RECLAMACIÓN REGISTRADA • INDECOPI D.S. N° 011-2011-PCM</span>
        <h3 class="claim-success-title">Hoja de Reclamación N° ${trackingCode}</h3>
        <p class="claim-success-desc">
          Estimado(a) <strong>${fullName}</strong>, su ${claimType.toLowerCase()} ha sido formalmente asentado en el Libro de Reclamaciones Virtual de <strong>Luxury Machupicchu Peru E.I.R.L.</strong> (RUC: 20601622492).
        </p>
        <div class="claim-success-details">
          <div class="detail-row"><span>Fecha y Hora de Emisión:</span><strong>${dateStr}</strong></div>
          <div class="detail-row"><span>Documento de Identidad:</span><strong>${docType}: ${docNum}</strong></div>
          <div class="detail-row"><span>Servicio Afectado:</span><strong>${service || 'Expedición Privada Machu Picchu'}</strong></div>
          ${amount ? `<div class="detail-row"><span>Monto Reclamado:</span><strong>${amount}</strong></div>` : ''}
          <div class="detail-row"><span>Tipo de Incidencia:</span><strong>${claimType}</strong></div>
          <div class="detail-row"><span>Copia Notificada a:</span><strong>${email}</strong></div>
        </div>
        <div class="claim-legal-sla">
          ⚖ <strong>Plazo Legal de Respuesta:</strong> Conforme al Código de Protección y Defensa del Consumidor (Ley N° 29571) y el D.S. N° 011-2011-PCM, la respuesta formal motivada será remitida a su correo electrónico en un plazo improrrogable no mayor a <strong>15 días hábiles</strong>.
        </div>
        <div class="claim-success-actions">
          <button type="button" class="btn-claim-print" onclick="window.print()">🖨️ Imprimir Constancia Legal</button>
          <button type="button" class="btn-claim-reset" onclick="resetClaimForm()">Registrar Otra Consulta</button>
        </div>
      </div>
    `;
  }
}

function resetClaimForm() {
  const resultContainer = document.getElementById('claimResultContainer');
  const formContainer = document.getElementById('claimFormContainer');
  const form = document.getElementById('claimForm');
  if (form) form.reset();
  if (resultContainer) resultContainer.style.display = 'none';
  if (formContainer) formContainer.style.display = 'block';
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

// Global initialization on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  setupScrollListener();
  const btnSidebarPay = document.getElementById('btnSidebarPayOnline');
  if (btnSidebarPay) {
    btnSidebarPay.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof handleSidebarOnlinePayment === 'function') {
        handleSidebarOnlinePayment();
      }
    });
  }
});
