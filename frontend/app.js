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
