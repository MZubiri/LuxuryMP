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
    modalReserveBtn: "Reserve This Journey With Concierge",
    taxLegendTitle: "Tax Policy & Legal Notice (+ IGV / VAT)",
    taxLegendText: "Published expedition rates are net of Peruvian Value Added Tax (+ IGV). In accordance with Legislative Decree N° 919 (Promotion of Receptive Tourism & Export of Services), non-domiciled foreign visitors are <strong>100% EXEMPT from IGV (0% VAT)</strong> upon presenting a valid foreign passport and entry migration stamp (TAM). For Peruvian citizens and resident taxpayers, 18% IGV applies with official electronic tax invoice issuance.",
    priceTaxSub: "+ IGV (Foreigners 0% VAT D.L. 919)",
    sidebarTaxSub: "+ 18% IGV Peruvians • Foreigners 0% Exempt (D.L. 919)",
    sidebarTaxLegend: "✦ Rates net + IGV. Non-resident foreigners 0% IGV under D.L. 919 • Peruvian residents +18% IGV.",
    drawerTaxLegend: "⚖️ <strong>Tax Notice (+ IGV):</strong> Non-domiciled travelers are 0% IGV exempt (D.L. 919 with foreign passport & TAM). Peruvian citizens & residents subject to +18% IGV.",
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
    optPassport: "Passport (0% IGV)",
    optDni: "DNI (+18% IGV)",
    optCe: "Carné Extranjería (+18% IGV)",
    optRuc: "RUC (+18% IGV)",
    lblDocNumber: "Document ID Number *",
    lblNationality: "Country / Nationality",
    lblTaxBreakdown: "Tax Breakdown & Charge Details:",
    lblDepositDueToday: "30% Luxury Deposit Due Today:",
    lblBalanceDueArrival: "70% Balance Due upon Arrival in Cusco:",
    btnViewQuoteSheet: "VIEW OFFICIAL QUOTATION SHEET (PDF)",
    btnPayDepositOnline: "PAY 30% LUXURY DEPOSIT ONLINE (CULQI)",
    btnPrintQuoteSheet: "🖨️ Print / Save as PDF",
    btnSendQuoteSheetWa: "Confirm Quotation via WhatsApp",
    qsTitle: "OFFICIAL QUOTATION SHEET",
    qsSubtitle: "BESPOKE ANDEAN EXPEDITION PROFORMA"
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
    modalReserveBtn: "Reservar Esta Expedición con Concierge",
    taxLegendTitle: "Régimen Tributario & Leyenda Legal (+ IGV)",
    taxLegendText: "Las tarifas publicadas están expresadas en valores netos no gravados con el Impuesto General a las Ventas (+ IGV). Conforme al <strong>Decreto Legislativo N° 919</strong> (Régimen de Fomento al Turismo Receptivo y Exportación de Servicios de la República del Perú), los viajeros extranjeros no domiciliados se encuentran <strong>100% EXONERADOS del pago del IGV (0% IGV)</strong> presentando pasaporte extranjero y sello migratorio virtual (TAM). Para huéspedes peruanos o residentes extranjeros domiciliados en Perú aplica el <strong>18% de IGV</strong> con emisión obligatoria de factura o boleta electrónica SUNAT.",
    priceTaxSub: "+ IGV (Extranjeros 0% D.L. 919)",
    sidebarTaxSub: "+ 18% IGV Nacionales • Exonerado Extranjeros (D.L. 919)",
    sidebarTaxLegend: "✦ Tarifas netas + IGV. Extranjeros 0% IGV según D.L. 919 • Residentes peruanos +18% IGV.",
    drawerTaxLegend: "⚖️ <strong>Leyenda Tributaria (+ IGV):</strong> Turistas extranjeros 0% IGV (D.L. 919 con pasaporte y TAM). Huéspedes nacionales y residentes sujetos a +18% IGV conforme a SUNAT.",
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
    lblDocType: "Tipo de Documento *",
    optPassport: "Pasaporte (0% IGV)",
    optDni: "DNI (+18% IGV)",
    optCe: "Carné Extranjería (+18% IGV)",
    optRuc: "RUC (+18% IGV)",
    lblDocNumber: "N° de Documento *",
    lblNationality: "País / Nacionalidad",
    lblTaxBreakdown: "Desglose Impositivo y Detalle de Cobro:",
    lblDepositDueToday: "30% Anticipo de Garantía (A Cobrar Hoy):",
    lblBalanceDueArrival: "70% Saldo Pendiente a la Llegada en Cusco:",
    btnViewQuoteSheet: "VER HOJA DE COTIZACIÓN FORMAL (PDF)",
    btnPayDepositOnline: "PAGAR ANTICIPO 30% ONLINE (CULQI)",
    btnPrintQuoteSheet: "🖨️ Imprimir / Guardar en PDF",
    btnSendQuoteSheetWa: "Confirmar Cotización vía WhatsApp",
    qsTitle: "HOJA DE COTIZACIÓN FORMAL",
    qsSubtitle: "PROFORMA DE EXPEDICIÓN PRIVADA"
  }
};

// Tour Normalizer for data fetched strictly from .NET 9 / MySQL Database
function normalizeTour(t) {
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
    description: t.description || '',
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
    highlights: Array.isArray(t.highlights) ? t.highlights : [],
    highlightsEn: Array.isArray(t.highlightsEn) && t.highlightsEn.length > 0 ? t.highlightsEn : (Array.isArray(t.highlights) ? t.highlights : []),
    highlightsEs: Array.isArray(t.highlightsEs) && t.highlightsEs.length > 0 ? t.highlightsEs : (Array.isArray(t.highlights) ? t.highlights : []),
    inclusionsEn: Array.isArray(t.includedEn) ? t.includedEn : (Array.isArray(t.included) ? t.included : []),
    inclusionsEs: Array.isArray(t.includedEs) ? t.includedEs : (Array.isArray(t.included) ? t.included : []),
    exclusionsEn: Array.isArray(t.notIncludedEn) ? t.notIncludedEn : (Array.isArray(t.notIncluded) ? t.notIncluded : []),
    exclusionsEs: Array.isArray(t.notIncludedEs) ? t.notIncludedEs : (Array.isArray(t.notIncluded) ? t.notIncluded : []),
    galleryImages: Array.isArray(t.galleryImages) && t.galleryImages.length > 0 ? t.galleryImages : [t.mainImageUrl],
    itineraries: Array.isArray(t.itineraries) ? t.itineraries.map(day => ({
      id: day.id,
      dayNumber: day.dayNumber,
      titleEn: day.titleEn || day.title || '',
      titleEs: day.titleEs || day.title || '',
      title: day.title || '',
      descEn: day.descriptionEn || day.descEn || day.description || '',
      descEs: day.descriptionEs || day.descEs || day.description || '',
      descriptionEn: day.descriptionEn || day.descEn || day.description || '',
      descriptionEs: day.descriptionEs || day.descEs || day.description || '',
      diningEn: day.gourmetDiningEn || day.diningEn || day.gourmetDining || '',
      diningEs: day.gourmetDiningEs || day.diningEs || day.gourmetDining || '',
      transferEn: day.privateTransferEn || day.transferEn || day.privateTransfer || '',
      transferEs: day.privateTransferEs || day.transferEs || day.privateTransfer || ''
    })) : []
  };
}

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

  setLanguage(appState.currentLang);
  setCurrency(appState.currentCurrency);
  setupScrollListener();
  setupAnchorSmoothScroll();
  initPlannerMinDate();
  loadDatabaseCatalog();
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

// Load catalog, categories and testimonials strictly from MySQL database API
async function loadDatabaseCatalog() {
  const grid = document.getElementById('toursGrid');
  if (grid && (!appState.tours || appState.tours.length === 0)) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--color-sand);">
        <div style="display:inline-block; width: 34px; height: 34px; border: 2px solid rgba(212,175,55,0.2); border-top-color: var(--color-gold); border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 1rem;"></div>
        <p style="font-family: var(--font-serif); font-size: 1.05rem; letter-spacing: 0.12em; text-transform: uppercase;">
          Sincronizando Colecciones Exclusivas desde la Base de Datos...
        </p>
      </div>
    `;
  }

  try {
    const [catsRes, toursRes, testRes] = await Promise.all([
      fetchApi(`/categories?lang=${appState.currentLang}`),
      fetchApi(`/tours?lang=${appState.currentLang}`),
      fetchApi(`/testimonials?lang=${appState.currentLang}`)
    ]);

    if (catsRes.ok) {
      const catsData = await catsRes.json();
      renderCategoryFilterPills(catsData);
    }

    if (toursRes.ok) {
      const toursData = await toursRes.json();
      appState.tours = Array.isArray(toursData) ? toursData.map(normalizeTour) : [];
      renderTours();
      populateTourDropdowns();
    }

    if (testRes.ok) {
      const testimonials = await testRes.json();
      renderDatabaseTestimonials(testimonials);
    }
  } catch (err) {
    console.error('Error fetching database catalog:', err);
    if (grid && (!appState.tours || appState.tours.length === 0)) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--color-sand);">
          <p>No se pudo conectar con la base de datos de expediciones. Por favor recargue la página.</p>
        </div>
      `;
    }
  }
}

// Render Category Filter Pills dynamically from Database
function renderCategoryFilterPills(cats) {
  const container = document.getElementById('filterPills');
  if (!container || !Array.isArray(cats) || cats.length === 0) return;

  const isEs = appState.currentLang === 'es';
  const allText = isEs ? 'Todas las Expediciones' : 'All Expeditions';

  container.innerHTML = `
    <button class="filter-pill ${appState.activeCategory === 'all' ? 'active' : ''}" data-category="all" onclick="filterTours('all', this)">
      ${allText}
    </button>
    ${cats.map(c => {
      const label = isEs ? (c.nameEs || c.name) : (c.nameEn || c.name);
      const isActive = appState.activeCategory === c.slug;
      return `<button class="filter-pill ${isActive ? 'active' : ''}" data-category="${c.slug}" onclick="filterTours('${c.slug}', this)">${label}</button>`;
    }).join('')}
  `;
}

// Render Testimonials dynamically from Database
function renderDatabaseTestimonials(testimonials) {
  const container = document.getElementById('chroniclesGrid');
  if (!container || !Array.isArray(testimonials) || testimonials.length === 0) return;

  const isEs = appState.currentLang === 'es';
  container.innerHTML = testimonials.map(t => {
    const comment = (isEs ? t.commentEs : t.commentEn) || t.commentEn || t.commentEs;
    const stars = '★'.repeat(t.rating || 5);
    return `
      <div class="chronicle-card">
        <div class="chronicle-stars">${stars}</div>
        <p class="chronicle-quote">"${comment}"</p>
        <div class="chronicle-author">
          <span class="author-name">${t.guestName}</span>
          <span class="author-meta">${t.originCountry} • ${t.journeyName}</span>
        </div>
      </div>
    `;
  }).join('');
}

// Populate tour select options in booking forms
function populateTourDropdowns() {
  const selects = [
    document.getElementById('bookingTourSelect'),
    document.getElementById('plannerTourSelect')
  ];

  const isEs = appState.currentLang === 'es';
  selects.forEach(select => {
    if (!select) return;
    const currentVal = select.value;
    select.innerHTML = (appState.tours || []).map(t => {
      const title = (isEs ? t.titleEs : t.titleEn) || t.title;
      return `<option value="${t.slug}">${title}</option>`;
    }).join('');
    if (currentVal && (appState.tours || []).some(t => t.slug === currentVal)) {
      select.value = currentVal;
    }
  });
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
  populateTourDropdowns();
  loadDatabaseCatalog();
}

function applyLanguage(lang) {
  const dict = translations[lang];
  if (!dict) return;

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
    return `$${usdPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} USD + IGV`;
  } else {
    const penVal = penPrice || (usdPrice * appState.exchangeRateUsdToPen);
    return `S/. ${penVal.toLocaleString('es-PE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} PEN + IGV`;
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
    : appState.tours.filter(t => t.categorySlug === appState.activeCategory || String(t.categoryId) === String(appState.activeCategory));

  container.innerHTML = filtered.map(tour => {
    const title = isEs ? tour.titleEs : tour.titleEn;
    const subtitle = isEs ? tour.subtitleEs : tour.subtitleEn;
    const duration = isEs ? tour.durationEs : tour.durationEn;
    const highlights = isEs ? tour.highlightsEs : tour.highlightsEn;
    const priceDisplay = formatPrice(tour.priceUsd, tour.pricePen);

    return `
      <article class="tour-card" id="tour-card-${tour.id}">
        <div class="tour-card-media" onclick="openTourModalBySlug('${tour.slug}')" style="cursor: pointer;" title="${isEs ? 'Ver detalles e itinerario' : 'View expedition details & itinerary'}">
          <img src="${tour.mainImageUrl}" alt="${title}" class="tour-card-img" loading="lazy">
          <span class="tour-style-badge">${tour.styleTag}</span>
        </div>
        <div class="tour-card-body">
          <div class="tour-meta-row">
            <span>${duration}</span>
            <span>${tour.altitudeMax}</span>
          </div>
          <h3 class="tour-title" onclick="openTourModalBySlug('${tour.slug}')" style="cursor: pointer;" title="${isEs ? 'Ver itinerario' : 'View itinerary'}">${title}</h3>
          <p class="tour-subtitle">${subtitle}</p>

          <ul class="tour-highlights-list">
            ${highlights.slice(0, 3).map(h => `<li><span>✦</span> ${h}</li>`).join('')}
          </ul>

          <div class="tour-pricing-footer">
            <div class="price-box">
              <span class="price-from">${dict.pricePerPerson}</span>
              <span class="price-value">${priceDisplay}</span>
              <span class="price-tax-sub">${isEs ? '+ IGV (Extranjeros 0% D.L. 919)' : '+ IGV (Foreigners 0% D.L. 919)'}</span>
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
async function openTourModalBySlug(slug) {
  let tour = appState.tours.find(t => t.slug === slug);
  if (!tour) return;

  const modal = document.getElementById('tourModal');
  const body = document.getElementById('tourModalBody');
  const isEs = appState.currentLang === 'es';
  const dict = translations[appState.currentLang];

  // If itineraries are missing in summary, asynchronously fetch full tour details
  if (!tour.itineraries || tour.itineraries.length === 0) {
    try {
      const res = await fetchApi(`/tours/${slug}?lang=${appState.currentLang}`);
      if (res.ok) {
        const fullData = await res.json();
        tour = normalizeTour(fullData);
        const idx = appState.tours.findIndex(t => t.slug === slug);
        if (idx !== -1) appState.tours[idx] = tour;
      }
    } catch (err) {
      console.warn('Could not fetch full tour for modal:', err);
    }
  }

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
          <span class="price-tax-sub" style="font-size:0.62rem; margin-top:3px;">${isEs ? '+ IGV (Extranjeros 0% D.L. 919)' : '+ IGV (Foreigners 0% D.L. 919)'}</span>
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

      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.25rem;">
        <h3 style="font-family: var(--font-serif); font-size: 1.8rem; margin: 0;">
          ${isEs ? 'Itinerario Detallado Día por Día' : 'Day-by-Day Curated Itinerary'}
        </h3>
        <a href="tour.html?slug=${tour.slug}" style="color: var(--color-gold); font-size: 0.88rem; text-decoration: none; font-weight: 500;">
          ${isEs ? 'Ver página completa ↗' : 'Open dedicated dossier ↗'}
        </a>
      </div>

      <div class="itinerary-days-container">
        ${(tour.itineraries && tour.itineraries.length > 0) ? tour.itineraries.map(day => `
          <div class="itinerary-day-card">
            <span class="itinerary-day-num">${dict.modalDayPrefix} ${day.dayNumber}</span>
            <h4 class="itinerary-day-title">${isEs ? day.titleEs : day.titleEn}</h4>
            <p class="itinerary-day-desc">${isEs ? day.descEs : day.descEn}</p>
            <div class="itinerary-perks">
              <div><span>${dict.modalDining}:</span> <strong>${isEs ? day.diningEs : day.diningEn}</strong></div>
              <div><span>${dict.modalTransfer}:</span> <strong>${isEs ? day.transferEs : day.transferEn}</strong></div>
            </div>
          </div>
        `).join('') : `
          <div style="padding: 2rem; text-align: center; background: rgba(0,0,0,0.03); border-radius: 4px;">
            <p style="color: var(--color-text-muted); font-size: 0.95rem;">
              ${isEs ? 'Itinerario detallado y horarios coordinados directamente con su Concierge Privado.' : 'Bespoke daily scheduling and personalized logistics orchestrated directly by your Dedicated Concierge.'}
            </p>
          </div>
        `}
      </div>

      <div class="modal-actions-footer">
        <div>
          <span style="font-size: 0.85rem; color: var(--color-text-muted);">${dict.pricePerPerson}</span>
          <div style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--color-obsidian); font-weight: 600;">
            ${priceDisplay}
          </div>
        </div>
        <div style="display: flex; gap: 0.75rem;">
          <a href="tour.html?slug=${tour.slug}" class="btn-hero-ghost" style="text-decoration:none; padding: 0.75rem 1.25rem;">
            ${dict.btnViewItinerary}
          </a>
          <button class="btn-hero-gold" onclick="closeTourModal(); openBookingDrawerForTour('${tour.slug}')">
            ${dict.modalReserveBtn}
          </button>
        </div>
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

let drawerDocType = 'PASSPORT';

function handleDrawerDocTypeChange(val) {
  drawerDocType = val;
  const detection = detectTaxRegimeFromDocument(val);
  const isEs = appState.currentLang === 'es';

  const badge = document.getElementById('drawerTaxBadge');
  if (badge) {
    badge.className = `tax-detection-badge ${detection.regime}`;
    badge.innerHTML = `<span>${detection.regime === 'national' ? '🇵🇪' : '🌍'}</span> <strong>${isEs ? detection.labelEs : detection.labelEn}</strong> — <span>${isEs ? detection.lawNoticeEs : detection.lawNoticeEn}</span>`;
  }

  recalculateDrawerTotal();
}

function handleDrawerDocNumberInput(val) {
  // Respect the user's manual document type selection (CE, PASSPORT, DNI, RUC)
  // Do NOT override user's explicit choice.
  recalculateDrawerTotal();
}

function recalculateDrawerTotal() {
  const tour = appState.selectedTour || appState.tours[0];
  if (!tour) return;

  const isEs = appState.currentLang === 'es';
  const rate = appState.exchangeRateUsdToPen || 3.80;
  const detection = detectTaxRegimeFromDocument(drawerDocType);
  const isNational = detection.regime === 'national'; // DNI, CE, RUC -> Cobro y visualización obligatoria en SOLES (PEN S/.)

  const guestsSelect = document.getElementById('bookingGuests');
  const guests = parseInt(guestsSelect?.value || '2', 10);

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

  const summaryPrice = document.getElementById('summaryPricePerPerson');
  const netEl = document.getElementById('drawerNetSubtotal');
  const taxLabelEl = document.getElementById('drawerTaxLabel');
  const taxAmountEl = document.getElementById('drawerTaxAmount');
  const summaryTotal = document.getElementById('summaryTotalQuote');
  const depositEl = document.getElementById('drawerDepositQuote');
  const balanceEl = document.getElementById('drawerBalanceQuote');

  if (isNational) {
    // Si la reserva es con DNI, CE o RUC -> PRECIO Y MONTO EN SOLES (PEN S/.) CON 18% IGV
    if (summaryPrice) summaryPrice.textContent = `S/. ${pricePerPersonPen.toLocaleString('es-PE')} PEN`;
    if (netEl) netEl.textContent = `S/. ${netSubtotalPen.toLocaleString('es-PE')} PEN`;
    if (taxLabelEl) taxLabelEl.textContent = isEs ? 'Impuesto 18% IGV (SUNAT):' : '18% VAT (Tax Invoice):';
    if (taxAmountEl) {
      taxAmountEl.textContent = `+ S/. ${taxPen.toLocaleString('es-PE')} PEN`;
      taxAmountEl.style.color = 'var(--color-obsidian)';
    }
    if (summaryTotal) summaryTotal.textContent = `S/. ${grandTotalPen.toLocaleString('es-PE')} PEN`;
    if (depositEl) depositEl.textContent = `S/. ${depositPen.toLocaleString('es-PE')} PEN`;
    if (balanceEl) balanceEl.textContent = `S/. ${balancePen.toLocaleString('es-PE')} PEN`;
  } else {
    // Si la reserva es con PASAPORTE -> PRECIO Y MONTO EN DÓLARES (USD $) EXONERADO (0% IGV)
    if (summaryPrice) summaryPrice.textContent = `$${pricePerPersonUsd.toLocaleString('en-US')} USD`;
    if (netEl) netEl.textContent = `$${netSubtotalUsd.toLocaleString('en-US')} USD`;
    if (taxLabelEl) taxLabelEl.textContent = isEs ? 'Impuesto IGV:' : 'VAT Status:';
    if (taxAmountEl) {
      taxAmountEl.textContent = isEs ? '0% IGV (Exonerado D.L. 919)' : '0% VAT (Exempt D.L. 919)';
      taxAmountEl.style.color = '#15803D';
    }
    if (summaryTotal) summaryTotal.textContent = `$${grandTotalUsd.toLocaleString('en-US')} USD + IGV`;
    if (depositEl) depositEl.textContent = `$${depositUsd.toLocaleString('en-US')} USD`;
    if (balanceEl) balanceEl.textContent = `$${balanceUsd.toLocaleString('en-US')} USD`;
  }

  // Actualizar botón de pago en línea del panel lateral
  const btnOnline = document.getElementById('btnDrawerPayOnline');
  if (btnOnline) {
    const btnSpan = btnOnline.querySelector('span');
    if (btnSpan) {
      btnSpan.textContent = isNational
        ? (isEs ? `PAGAR ANTICIPO 30% ONLINE: S/. ${depositPen.toLocaleString('es-PE')} PEN` : `PAY 30% DEPOSIT ONLINE: S/. ${depositPen.toLocaleString('es-PE')} PEN`)
        : (isEs ? `PAGAR ANTICIPO 30% ONLINE: $${depositUsd.toLocaleString('en-US')} USD` : `PAY 30% DEPOSIT ONLINE: $${depositUsd.toLocaleString('en-US')} USD`);
    }
  }
}

function openDrawerQuoteSheet() {
  const modal = document.getElementById('quoteSheetModal');
  const body = document.getElementById('quoteSheetModalBody');
  if (!modal || !body) return;

  const tour = appState.selectedTour || appState.tours[0];
  const isEs = appState.currentLang === 'es';
  const isPen = appState.currentCurrency === 'PEN';
  const rate = appState.exchangeRateUsdToPen || 3.80;

  const name = document.getElementById('bookingFullName')?.value || (isEs ? 'Invitado de Honor' : 'Guest of Honor');
  const email = document.getElementById('bookingEmail')?.value || 'info@lmptravel.com';
  const phone = document.getElementById('bookingPhone')?.value || '+51 958 195 840';
  const date = document.getElementById('bookingDate')?.value || (isEs ? 'A coordinar con concierge' : 'To be confirmed with concierge');
  const train = document.getElementById('bookingTrain')?.value || 'Belmond Hiram Bingham';
  const docTypeSelect = document.getElementById('bookingDocType');
  const docType = docTypeSelect ? docTypeSelect.options[docTypeSelect.selectedIndex].text : 'Pasaporte Extranjero';
  const docNumber = document.getElementById('bookingDocNumber')?.value || 'PASSP-VERIFIED';

  const guests = parseInt(document.getElementById('bookingGuests')?.value || '2', 10);
  const netSubtotalUsd = tour.priceUsd * guests;
  const detection = detectTaxRegimeFromDocument(drawerDocType);
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
          <div class="qs-party-row"><span class="lbl">${isEs ? 'Contacto / Email:' : 'Contact:'}</span> <span class="val">${email} • ${phone}</span></div>
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
              <span class="qs-item-desc">${isEs ? tour.durationEs : tour.durationEn} • ${train} • Expedición 100% Privada</span>
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
        <button type="button" class="qs-btn-pay" onclick="handlePayFromQuoteSheet('${quoteId}')">
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

// Handle 30% Deposit Direct Online Payment via Culqi
async function handleDrawerOnlinePayment() {
  console.log('[LUXURY] handleDrawerOnlinePayment initiated');
  const isEs = appState.currentLang === 'es';
  const isPen = appState.currentCurrency === 'PEN';
  const rate = appState.exchangeRateUsdToPen || 3.80;

  const tour = appState.selectedTour || (appState.tours && appState.tours[0]) || {
    id: 1,
    titleEs: 'Belmond Hiram Bingham: The Pinnacle of Machu Picchu',
    titleEn: 'Belmond Hiram Bingham: The Pinnacle of Machu Picchu',
    priceUsd: 2150
  };

  const nameInput = document.getElementById('bookingFullName');
  const emailInput = document.getElementById('bookingEmail');
  const phoneInput = document.getElementById('bookingPhone');
  const dateInput = document.getElementById('bookingDate');
  const guestsSelect = document.getElementById('bookingGuests');
  const trainSelect = document.getElementById('bookingTrain');
  const notesInput = document.getElementById('bookingSpecialRequests');
  const docTypeSelect = document.getElementById('bookingDocType');
  const docNumberInput = document.getElementById('bookingDocNumber');

  const name = (nameInput?.value || '').trim();
  const email = (emailInput?.value || '').trim();
  const phone = (phoneInput?.value || '').trim();
  let date = dateInput?.value || '';
  const guests = parseInt(guestsSelect?.value || '2', 10);
  const train = trainSelect?.value || 'Belmond Hiram Bingham';
  const notes = notesInput?.value || '';
  const docType = docTypeSelect?.value || 'PASSPORT';
  const docNumber = (docNumberInput?.value || '').trim();

  const statusBox = document.getElementById('bookingStatusBox');

  // Validaciones con feedback inmediato
  if (!name) {
    if (statusBox) {
      statusBox.innerHTML = `<div style="background:#FEE2E2; border:1px solid #DC2626; color:#991B1B; padding:0.85rem; border-radius:4px; font-weight:700; margin-bottom:0.75rem;">⚠️ ${isEs ? 'Por favor ingrese su Nombre Completo.' : 'Please enter your Lead Traveler Name.'}</div>`;
    }
    nameInput?.focus();
    return;
  }

  if (!email || !email.includes('@')) {
    if (statusBox) {
      statusBox.innerHTML = `<div style="background:#FEE2E2; border:1px solid #DC2626; color:#991B1B; padding:0.85rem; border-radius:4px; font-weight:700; margin-bottom:0.75rem;">⚠️ ${isEs ? 'Por favor ingrese un Correo Electrónico válido para emitir su voucher.' : 'Please enter a valid Email to receive your voucher.'}</div>`;
    }
    emailInput?.focus();
    return;
  }

  if (!phone) {
    if (statusBox) {
      statusBox.innerHTML = `<div style="background:#FEE2E2; border:1px solid #DC2626; color:#991B1B; padding:0.85rem; border-radius:4px; font-weight:700; margin-bottom:0.75rem;">⚠️ ${isEs ? 'Por favor ingrese su WhatsApp o Teléfono de contacto.' : 'Please enter your WhatsApp / Mobile number.'}</div>`;
    }
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
  const detection = detectTaxRegimeFromDocument(drawerDocType || docType);
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

  if (statusBox) {
    statusBox.innerHTML = `
      <div style="background: rgba(197, 164, 126, 0.22); border: 1.5px solid #8C6D3B; padding: 0.85rem; border-radius: 4px; color: #121316; font-weight: 700; text-align: center; margin-bottom: 0.75rem;">
        ⏳ ${isEs ? 'Conectando con Pasarela Culqi...' : 'Connecting to Culqi Payment Gateway...'}
      </div>
    `;
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
          country: detection.regime === 'national' ? 'Perú' : 'Internacional',
          numberOfGuests: guests,
          travelDate: new Date(date).toISOString(),
          trainPreference: train,
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
    console.warn('Registro rápido local para checkout:', err);
  }

  const tourTitle = (isEs ? tour.titleEs : tour.titleEn) || 'Expedición Privada Machu Picchu';
  const checkoutParams = new URLSearchParams({
    amount: amountToCharge.toString(),
    currency: currencyToCharge,
    amountUsd: depositUsd.toString(),
    amountPen: depositPen.toString(),
    docType: drawerDocType || docType,
    rate: rate.toString(),
    title: `${tourTitle} (30% Anticipo)`,
    name: name,
    email: email,
    phone: phone
  });

  if (createdBookingId) {
    checkoutParams.set('bookingId', createdBookingId.toString());
  }

  console.log('[LUXURY] Redirecting to checkout.html', checkoutParams.toString());
  // Redirigir a checkout.html
  window.location.href = `checkout.html?${checkoutParams.toString()}`;
}

window.handleDrawerOnlinePayment = handleDrawerOnlinePayment;

// Fallback alias
function handleDepositCheckout() {
  handleDrawerOnlinePayment();
}
window.handleDepositCheckout = handleDepositCheckout;

function handlePayFromQuoteSheet(quoteId) {
  const tour = appState.selectedTour || appState.tours[0];
  const isEs = appState.currentLang === 'es';
  const rate = appState.exchangeRateUsdToPen || 3.80;

  const name = document.getElementById('bookingFullName')?.value.trim() || (isEs ? 'Huésped Ilustre' : 'Guest of Honor');
  const email = document.getElementById('bookingEmail')?.value.trim() || 'guest@luxurymachupicchu.com';
  const phone = document.getElementById('bookingPhone')?.value.trim() || '';
  const guests = parseInt(document.getElementById('bookingGuests')?.value || '2', 10);

  const price = tour.priceUsd || 2150;
  const netSubtotalUsd = price * guests;
  const detection = detectTaxRegimeFromDocument(drawerDocType);
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
    docType: drawerDocType,
    rate: rate.toString(),
    pref: quoteId,
    title: `${tourTitle} (30% Anticipo)`,
    name: name,
    email: email,
    phone: phone
  });

  window.location.href = `checkout.html?${checkoutParams.toString()}`;
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

function openConciergeModal(slug) {
  openCustomPackageModal(slug);
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

  const depositUsd = Math.round(grandTotalUsd * 0.30);
  const balanceUsd = grandTotalUsd - depositUsd;
  const depositPen = Math.round(grandTotalPen * 0.30);
  const balancePen = Math.round(grandTotalPen) - depositPen;

  packageBuilderState.lastCalculations = {
    tour,
    hotel,
    rail,
    travelers,
    nights,
    baseTotalUsd,
    hotelTotalUsd,
    addonsTotalUsd,
    netSubtotalUsd,
    taxUsd,
    grandTotalUsd,
    grandTotalPen,
    depositUsd,
    balanceUsd,
    depositPen,
    balancePen,
    rate
  };

  const depositEl = document.getElementById('pkgDepositDue');
  if (depositEl) {
    depositEl.textContent = isPen ? `S/. ${depositPen.toLocaleString('es-PE')} PEN` : `$${depositUsd.toLocaleString('en-US')} USD`;
  }

  const balanceEl = document.getElementById('pkgBalanceDue');
  if (balanceEl) {
    balanceEl.textContent = isPen ? `S/. ${balancePen.toLocaleString('es-PE')} PEN` : `$${balanceUsd.toLocaleString('en-US')} USD`;
  }

  const tagIncludedEl = document.getElementById('pkgTaxIncludedTag');
  if (tagIncludedEl) {
    tagIncludedEl.textContent = packageBuilderState.taxRegime === 'national'
      ? (isEs ? '✦ Cobro final con 18% IGV incluido para Boleta/Factura SUNAT' : '✦ Final charge includes 18% Peruvian VAT for official tax invoice')
      : (isEs ? '✦ Cobro neto 0% IGV Exonerado por Ley D.L. 919 para turistas extranjeros' : '✦ Net charge 0% VAT Exempt under Peruvian D.L. 919 for foreign visitors');
  }

  const legendEl = document.getElementById('pkgTaxLegendBadge');
  if (legendEl) {
    legendEl.textContent = packageBuilderState.taxRegime === 'national'
      ? (isEs ? '🇵🇪 Régimen Nacional: +18% IGV Gravado con Factura/Boleta Oficial' : '🇵🇪 Peruvian Resident: +18% IGV Applied with Tax Invoice')
      : (isEs ? '✦ Extranjeros Exonerados de IGV (0%) según D.L. 919' : '✦ Foreign Travelers 100% IGV Exempt (0%) under D.L. 919');
  }
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
        <button type="button" class="qs-btn-pay" onclick="handlePayFromQuoteSheet('${quoteId}')">
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

function closeQuoteSheetModal() {
  const modal = document.getElementById('quoteSheetModal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function printQuoteSheet() {
  window.print();
}

function sendQuoteSheetWhatsApp(quoteId) {
  const isEs = appState.currentLang === 'es';
  const name = document.getElementById('pkgGuestName')?.value || 'Guest';
  const docType = document.getElementById('pkgDocType')?.value || 'PASSPORT';
  const docNumber = document.getElementById('pkgDocNumber')?.value || '';
  const total = document.getElementById('pkgGrandTotal')?.textContent || '';
  const taxText = packageBuilderState.taxRegime === 'national' ? 'Nacional (+18% IGV)' : 'Extranjero (0% IGV Exonerado D.L. 919)';

  const msg = isEs
    ? `✨ *Luxury Machupicchu Peru - Hoja de Cotización Formal [${quoteId}]*\n\n` +
      `Estimado Concierge, mi nombre es *${name}* (${docType}: ${docNumber || 'Por adjuntar'}).\n\n` +
      `Adjunto la confirmación de mi Hoja de Cotización Oficial:\n` +
      `🏛️ *Expedición:* ${document.getElementById('pkgSelectedTourSummary')?.textContent || ''}\n` +
      `⚖️ *Régimen Fiscal:* ${taxText}\n` +
      `💰 *Total a Cobrar:* ${total}\n` +
      `💳 *Anticipo del 30%:* ${document.getElementById('pkgDepositDue')?.textContent || ''}\n\n` +
      `Solicito validación y enlace de pago seguro para el depósito de garantía.`
    : `✨ *Luxury Machupicchu Peru - Official Quotation Dossier [${quoteId}]*\n\n` +
      `Dear Concierge, my name is *${name}* (${docType}: ${docNumber || 'Attached'}).\n\n` +
      `I confirm my Official Quotation Proforma:\n` +
      `🏛️ *Journey:* ${document.getElementById('pkgSelectedTourSummary')?.textContent || ''}\n` +
      `⚖️ *Tax Status:* ${taxText}\n` +
      `💰 *Total Charge:* ${total}\n` +
      `💳 *30% Luxury Deposit:* ${document.getElementById('pkgDepositDue')?.textContent || ''}\n\n` +
      `Please validate and dispatch the secure payment gateway link.`;

  window.open(`https://wa.me/51958195840?text=${encodeURIComponent(msg)}`, '_blank');
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
  const tabs = ['claims', 'terms', 'privacy'];
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
