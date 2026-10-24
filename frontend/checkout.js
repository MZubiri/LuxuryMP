/**
 * LUXURY MACHUPICCHU PERU — CULQI CHECKOUT INTEGRATION SCRIPT
 * Version 4 SDK Implementation with Real-Time Charge Processing,
 * Multilingual Support (EN/ES), Dynamic Tour Preview, Track Intent, and 1-Click PDF.
 */

const I18N = {
  es: {
    pageTitle: "Portal de Pago Seguro • Culqi | Luxury Machupicchu Peru",
    secSsl: "Cifrado Bancario SSL 256-Bit",
    secAuthorized: "Culqi Authorized Merchant",
    brandSub: "Portal de Pago y Depósito Seguro",
    backToWeb: "Volver a la Web",
    cardKicker: "INFORMACIÓN DEL PASAJERO & VIAJE",
    cardTitle: "Confirmación de Reserva Exclusiva",
    badgeVip: "Ultra-Lujo Privado",
    tourCategoryTag: "Expedición de Alta Gama",
    labelRef: "Referencia:",
    conciergeAtelier: "Concierge Atelier",
    pillSanctuary: "✓ Permisos Santuario",
    pillTrain: "✓ Tren de Gran Lujo",
    pillGuide: "✓ Guía Privado Exclusivo",
    labelFullName: "Nombre Completo del Titular *",
    phFullName: "Ej. Lord Arthur Hastings",
    labelEmail: "Correo Electrónico (para voucher) *",
    phEmail: "arthur@domain.com",
    labelPhone: "Teléfono / WhatsApp Internacional *",
    phPhone: "+1 (555) 019-2834",
    labelCurrency: "Moneda de Pago",
    optUsd: "Dólares Americanos (USD $)",
    optPen: "Soles Peruanos (PEN S/.)",
    labelNotes: "Observaciones o Solicitud Especial (Opcional)",
    phNotes: "Dietas especiales, suite contigua, horarios de tren...",
    disclaimerText: "Al procesar su pago, se generará de inmediato una confirmación electrónica vinculada al sistema de Concierge y se actualizará su reserva en tiempo real.",
    summaryTitle: "Resumen de Pago",
    summaryConceptLabel: "Concepto",
    summaryConceptVal: "Depósito de Reserva (30%)",
    summaryRefLabel: "Referencia de Pago",
    summaryGatewayLabel: "Pasarela de Pago",
    summaryTypeLabel: "Tipo de Transacción",
    summaryTypeVal: "Depósito Oficial",
    summaryTotalLabel: "Total a Pagar",
    btnPayText: "Pagar con Tarjeta o Yape",
    btnPayAction: "Pagar {amount} con Culqi",
    paymentMethodsLabel: "Tarjetas & Billeteras Aceptadas",
    voucherDocTitle: "COMPROBANTE OFICIAL DE RESERVA Y PAGO BANCARIO",
    voucherTitle: "¡Transacción Exitosa!",
    voucherSub: "Su depósito de viaje ha sido procesado de manera segura a través de Culqi.",
    voucherSentTo: "Comprobante oficial emitido y enviado a:",
    voucherConciergeCopy: "Copia enviada a Atelier Concierge 24/7.",
    voucherItemExpedition: "Expedición Seleccionada",
    voucherItemGuest: "Titular de la Reserva",
    voucherItemRef: "Referencia de Reserva",
    voucherItemAmount: "Monto Pagado",
    voucherItemCard: "Método / Tarjeta",
    voucherItemChargeId: "Código de Cargo (Culqi)",
    voucherItemAuthCode: "Código de Autorización",
    voucherItemDate: "Fecha y Hora",
    voucherItemStatus: "Estado de la Transacción",
    voucherStatusPaid: "✓ Aprobado / Liquidado",
    voucherPrintFoot1: "Este comprobante certifica la confirmación de su pago seguro procesado bajo estándares PCI-DSS Nivel 1 a través de Culqi.",
    btnNotifyConcierge: "Notificar a mi Concierge Personal",
    btnDownloadPdf: "Descargar PDF Oficial",
    btnPrintVoucher: "Imprimir / Guardar Voucher",
    linkLicenses: "Licencias & MINCETUR",
    linkTerms: "Términos & Condiciones",
    linkPrivacy: "Política de Privacidad",
    linkClaims: "Libro de Reclamaciones",
    complianceFootnote: "Portal Oficial de Pagos y Reservas • Pasarela Bancaria Integrada con Culqi (PCI-DSS Nivel 1 Compliant)",
    errEmail: "Por favor ingrese un correo electrónico válido para emitir su voucher de pago.",
    errName: "Por favor ingrese el nombre del titular de la reserva.",
    errCulqiLoading: "El módulo de seguridad de Culqi está terminando de cargar. Por favor intente en unos segundos.",
    errCulqiInit: "No se pudo abrir la ventana de pago seguro. Verifique su conexión.",
    errCulqiDeclined: "Transacción cancelada o declinada por la entidad emisora.",
    msgProcessing: "Verificando con la entidad bancaria y emitiendo comprobante...",
    msgSuccess: "✓ ¡Pago Exitoso! Su transacción fue aprobada por la entidad bancaria y su comprobante oficial ha sido emitido.",
    waGreeting: "Hola Concierge de Luxury Machupicchu Peru, acabo de realizar mi depósito de reserva:\n\n",
    waTour: "• Expedición:",
    waRef: "• Referencia:",
    waGuest: "• Titular:",
    waAmount: "• Monto Pagado:",
    waCharge: "• Código Culqi:",
    waAuth: "• Autorización:",
    waClosing: "Por favor confirmar recepción y detalles de itinerario."
  },
  en: {
    pageTitle: "Secure Payment Portal • Culqi | Luxury Machupicchu Peru",
    secSsl: "256-Bit SSL Banking Encryption",
    secAuthorized: "Culqi Authorized Merchant",
    brandSub: "Official Payment & Booking Deposit Portal",
    backToWeb: "Return to Website",
    cardKicker: "PASSENGER & EXPEDITION DETAILS",
    cardTitle: "Exclusive Journey Confirmation",
    badgeVip: "Ultra-Luxury Private",
    tourCategoryTag: "Haute Couture Expedition",
    labelRef: "Reference:",
    conciergeAtelier: "Concierge Atelier",
    pillSanctuary: "✓ Sanctuary Permits",
    pillTrain: "✓ Luxury Train Service",
    pillGuide: "✓ Private Exclusive Guide",
    labelFullName: "Lead Traveler Full Name *",
    phFullName: "e.g. Lord Arthur Hastings",
    labelEmail: "Email Address (for official voucher) *",
    phEmail: "arthur@domain.com",
    labelPhone: "International Phone / WhatsApp *",
    phPhone: "+1 (555) 019-2834",
    labelCurrency: "Payment Currency",
    optUsd: "US Dollars (USD $)",
    optPen: "Peruvian Soles (PEN S/.)",
    labelNotes: "Special Requests or Dietary Requirements (Optional)",
    phNotes: "Dietary requests, adjacent suites, preferred train schedule...",
    disclaimerText: "Upon processing your payment, an official electronic confirmation is immediately routed to our 24/7 Concierge Atelier and your itinerary is confirmed in real time.",
    summaryTitle: "Payment Summary",
    summaryConceptLabel: "Concept",
    summaryConceptVal: "Reservation Deposit (30%)",
    summaryRefLabel: "Payment Reference",
    summaryGatewayLabel: "Payment Gateway",
    summaryTypeLabel: "Transaction Type",
    summaryTypeVal: "Official Deposit",
    summaryTotalLabel: "Total Amount Due",
    btnPayText: "Pay with Card or Yape",
    btnPayAction: "Pay {amount} with Culqi",
    paymentMethodsLabel: "Accepted Payment Methods",
    voucherDocTitle: "OFFICIAL JOURNEY RESERVATION & BANKING RECEIPT",
    voucherTitle: "Transaction Approved!",
    voucherSub: "Your luxury journey deposit has been securely confirmed via Culqi Banking Gateway.",
    voucherSentTo: "Official confirmation dispatched to:",
    voucherConciergeCopy: "Copy routed to Private Concierge Atelier 24/7.",
    voucherItemExpedition: "Selected Journey",
    voucherItemGuest: "Lead Guest Name",
    voucherItemRef: "Booking Reference",
    voucherItemAmount: "Amount Settled",
    voucherItemCard: "Payment Method / Card",
    voucherItemChargeId: "Charge ID (Culqi)",
    voucherItemAuthCode: "Authorization Code",
    voucherItemDate: "Date & Timestamp",
    voucherItemStatus: "Transaction Status",
    voucherStatusPaid: "✓ Approved / Settled",
    voucherPrintFoot1: "This document certifies confirmation of your secure payment processed under PCI-DSS Level 1 standards via Culqi.",
    btnNotifyConcierge: "Notify My Private Concierge",
    btnDownloadPdf: "Download Official PDF",
    btnPrintVoucher: "Print / Save Voucher",
    linkLicenses: "Official Licenses & MINCETUR",
    linkTerms: "Terms & Conditions",
    linkPrivacy: "Privacy Policy",
    linkClaims: "Complaints Book",
    complianceFootnote: "Official Booking & Payment Gateway • Secured via Culqi PCI-DSS Level 1 Banking Infrastructure",
    errEmail: "Please provide a valid email address to issue your official journey voucher.",
    errName: "Please enter the lead traveler's full name.",
    errCulqiLoading: "Culqi security module is loading. Please retry in a few moments.",
    errCulqiInit: "Unable to launch secure payment modal. Please check your internet connection.",
    errCulqiDeclined: "Transaction cancelled or declined by issuing bank.",
    msgProcessing: "Verifying with issuing bank and issuing official voucher...",
    msgSuccess: "✓ Payment Successful! Your transaction has been approved by your bank and your official voucher is issued.",
    waGreeting: "Hello Concierge at Luxury Machupicchu Peru, I have just completed my journey deposit:\n\n",
    waTour: "• Expedition:",
    waRef: "• Reference:",
    waGuest: "• Lead Guest:",
    waAmount: "• Amount Paid:",
    waCharge: "• Culqi Charge ID:",
    waAuth: "• Authorization:",
    waClosing: "Kindly confirm reception and provide initial itinerary briefing."
  }
};

const checkoutState = {
  lang: 'es',
  publicKey: 'pk_test_fU8KVWEiNbyyLHNt',
  amount: 241.00,
  currency: 'USD',
  amountUsd: 241.00,
  amountPen: 915.00,
  docType: 'PASSPORT',
  rate: 3.80,
  bookingId: null,
  prefId: '',
  referenceCode: '',
  title: 'Expedición Privada Machu Picchu',
  guestEmail: '',
  guestName: '',
  guestPhone: '',
  tourImage: 'assets/images/hiram_bingham_main.jpg',
  isProcessing: false,
  lastChargeData: null
};

document.addEventListener('DOMContentLoaded', async () => {
  parseQueryParams();
  await loadPaymentConfig();
  await fetchBookingSummaryIfPresent();
  setLanguage(checkoutState.lang);
  renderCheckoutSummary();
  initCulqiGlobalCallback();

  const params = new URLSearchParams(window.location.search);
  if (params.has('previewVoucher') || params.has('testVoucher')) {
    showSuccessVoucher({
      success: true,
      chargeId: 'chr_test_' + Date.now().toString(36),
      authorizationCode: 'AUTH' + Math.floor(100000 + Math.random() * 900000),
      amount: checkoutState.amount || 500,
      currency: checkoutState.currency || 'USD',
      cardBrand: 'Visa',
      cardLastFour: '4111',
      referenceCode: checkoutState.referenceCode || 'RES-LMP-TEST',
      transactionDate: Date.now(),
      customerName: checkoutState.guestName || 'Lord Arthur Hastings',
      customerEmail: checkoutState.guestEmail || 'arthur@domain.com'
    });
  }
});

// ============================================================================
// 1. LEER PARÁMETROS DE LA URL & DETERMINACIÓN INTELIGENTE DE IDIOMA Y MONEDA
// ============================================================================
function parseQueryParams() {
  const params = new URLSearchParams(window.location.search);

  // Detección de idioma inicial
  if (params.has('lang')) {
    const l = params.get('lang').toLowerCase();
    if (l === 'en' || l === 'es') checkoutState.lang = l;
  } else {
    const savedLang = localStorage.getItem('lmp_checkout_lang');
    if (savedLang === 'en' || savedLang === 'es') {
      checkoutState.lang = savedLang;
    } else if (navigator.language && navigator.language.startsWith('en')) {
      checkoutState.lang = 'en';
    }
  }

  if (params.has('rate')) {
    const r = parseFloat(params.get('rate'));
    if (!isNaN(r) && r > 0) checkoutState.rate = r;
  }

  if (params.has('docType')) {
    checkoutState.docType = params.get('docType').toUpperCase();
  }

  let parsedAmount = 0;
  if (params.has('amount')) {
    const a = parseFloat(params.get('amount'));
    if (!isNaN(a) && a > 0) parsedAmount = a;
  }

  if (params.has('amountUsd')) {
    const u = parseFloat(params.get('amountUsd'));
    if (!isNaN(u) && u > 0) checkoutState.amountUsd = u;
  }

  if (params.has('amountPen')) {
    const p = parseFloat(params.get('amountPen'));
    if (!isNaN(p) && p > 0) checkoutState.amountPen = p;
  }

  // Determinación de Moneda
  if (checkoutState.docType) {
    if (checkoutState.docType === 'PASSPORT' || checkoutState.docType === 'PASAPORTE') {
      checkoutState.currency = 'USD';
      // Pasaporte internacional: por defecto experiencia en inglés si no se forzó español
      if (!params.has('lang') && !localStorage.getItem('lmp_checkout_lang')) {
        checkoutState.lang = 'en';
      }
    } else {
      checkoutState.currency = 'PEN';
      if (!params.has('lang') && !localStorage.getItem('lmp_checkout_lang')) {
        checkoutState.lang = 'es';
      }
    }
  } else if (params.has('currency')) {
    const cur = params.get('currency').toUpperCase();
    if (cur === 'USD' || cur === 'PEN') {
      checkoutState.currency = cur;
    }
  }

  // Sincronizar montos
  if (checkoutState.currency === 'PEN') {
    if (checkoutState.amountPen) {
      checkoutState.amount = checkoutState.amountPen;
    } else if (parsedAmount > 0) {
      checkoutState.amount = parsedAmount;
      checkoutState.amountPen = parsedAmount;
    } else if (checkoutState.amountUsd) {
      checkoutState.amountPen = Number((checkoutState.amountUsd * checkoutState.rate).toFixed(2));
      checkoutState.amount = checkoutState.amountPen;
    }
    if (!checkoutState.amountUsd && checkoutState.amountPen) {
      checkoutState.amountUsd = Number((checkoutState.amountPen / checkoutState.rate).toFixed(2));
    }
  } else {
    // USD
    if (checkoutState.amountUsd) {
      checkoutState.amount = checkoutState.amountUsd;
    } else if (parsedAmount > 0) {
      checkoutState.amount = parsedAmount;
      checkoutState.amountUsd = parsedAmount;
    } else if (checkoutState.amountPen) {
      checkoutState.amountUsd = Number((checkoutState.amountPen / checkoutState.rate).toFixed(2));
      checkoutState.amount = checkoutState.amountUsd;
    }
    if (!checkoutState.amountPen && checkoutState.amountUsd) {
      checkoutState.amountPen = Number((checkoutState.amountUsd * checkoutState.rate).toFixed(2));
    }
  }

  if (params.has('bookingId')) {
    const bId = parseInt(params.get('bookingId'), 10);
    if (!isNaN(bId)) {
      checkoutState.bookingId = bId;
      checkoutState.referenceCode = `RES-${String(bId).padStart(4, '0')}`;
    }
  }

  if (params.has('pref')) {
    checkoutState.prefId = params.get('pref');
    if (!checkoutState.referenceCode) {
      checkoutState.referenceCode = checkoutState.prefId;
    }
  } else {
    checkoutState.prefId = 'LMP-DEP-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    if (!checkoutState.referenceCode) {
      checkoutState.referenceCode = checkoutState.prefId;
    }
  }

  if (params.has('title')) {
    checkoutState.title = params.get('title');
  }

  if (params.has('email')) checkoutState.guestEmail = params.get('email');
  if (params.has('name')) checkoutState.guestName = params.get('name');
  if (params.has('phone')) checkoutState.guestPhone = params.get('phone');

  updateTourImageFromTitle(checkoutState.title);

  // Llenar inputs si vinieron en la URL
  const nameInput = document.getElementById('clientFullName');
  const emailInput = document.getElementById('clientEmail');
  const phoneInput = document.getElementById('clientPhone');
  const curSelect = document.getElementById('clientCurrency');

  if (nameInput && checkoutState.guestName) nameInput.value = checkoutState.guestName;
  if (emailInput && checkoutState.guestEmail) emailInput.value = checkoutState.guestEmail;
  if (phoneInput && checkoutState.guestPhone) phoneInput.value = checkoutState.guestPhone;
  if (curSelect) curSelect.value = checkoutState.currency;
}

// ============================================================================
// 2. SOPORTE MULTI-IDIOMA (BILINGÜE EN / ES)
// ============================================================================
function setLanguage(lang) {
  if (lang !== 'es' && lang !== 'en') lang = 'es';
  checkoutState.lang = lang;
  localStorage.setItem('lmp_checkout_lang', lang);
  document.documentElement.lang = lang;

  // Toggle active class en botones
  const btnEs = document.getElementById('langBtnEs');
  const btnEn = document.getElementById('langBtnEn');
  if (btnEs) btnEs.classList.toggle('active', lang === 'es');
  if (btnEn) btnEn.classList.toggle('active', lang === 'en');

  const dict = I18N[lang];
  document.title = dict.pageTitle;

  // Actualizar textos data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Actualizar placeholders data-i18n-ph
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  renderCheckoutSummary();

  // Si el voucher está activo, actualizar WhatsApp link con el nuevo idioma
  if (checkoutState.lastChargeData) {
    updateVoucherWhatsAppLink(checkoutState.lastChargeData);
  }
}

// ============================================================================
// 3. OBTENER CONFIGURACIÓN PÚBLICA DEL SERVIDOR Y DETALLES DEL BOOKING
// ============================================================================
async function loadPaymentConfig() {
  try {
    const res = await fetch('/api/payments/config');
    if (res.ok) {
      const config = await res.json();
      if (config.publicKey) {
        checkoutState.publicKey = config.publicKey;
      }
    }
  } catch (err) {
    console.warn('Usando llave pública de Culqi configurada por defecto:', err);
  }
}

async function fetchBookingSummaryIfPresent() {
  if (!checkoutState.bookingId) return;

  try {
    const res = await fetch(`/api/payments/booking-summary/${checkoutState.bookingId}`);
    if (res.ok) {
      const data = await res.json();
      if (data) {
        if (data.guestName && !checkoutState.guestName) checkoutState.guestName = data.guestName;
        if (data.guestEmail && !checkoutState.guestEmail) checkoutState.guestEmail = data.guestEmail;
        if (data.guestPhone && !checkoutState.guestPhone) checkoutState.guestPhone = data.guestPhone;
        if (data.tourTitle) checkoutState.title = data.tourTitle;
        if (data.referenceCode) checkoutState.referenceCode = data.referenceCode;

        if (data.tourImage) {
          checkoutState.tourImage = data.tourImage;
          const imgEl = document.getElementById('previewTourImg');
          if (imgEl) imgEl.src = data.tourImage;
        }

        if (checkoutState.currency === 'PEN' && data.depositAmountPen > 0) {
          checkoutState.amount = data.depositAmountPen;
          checkoutState.amountPen = data.depositAmountPen;
        } else if (data.depositAmountUsd > 0) {
          checkoutState.amount = data.depositAmountUsd;
          checkoutState.amountUsd = data.depositAmountUsd;
        }

        const nameInput = document.getElementById('clientFullName');
        const emailInput = document.getElementById('clientEmail');
        const phoneInput = document.getElementById('clientPhone');
        if (nameInput && checkoutState.guestName) nameInput.value = checkoutState.guestName;
        if (emailInput && checkoutState.guestEmail) emailInput.value = checkoutState.guestEmail;
        if (phoneInput && checkoutState.guestPhone) phoneInput.value = checkoutState.guestPhone;
      }
    }
  } catch (e) {
    console.info('No se pudo precargar booking summary:', e);
  }
}

function updateTourImageFromTitle(title) {
  const t = (title || '').toLowerCase();
  let img = 'assets/images/hiram_bingham_main.jpg';

  if (t.includes('inca') || t.includes('trail') || t.includes('camino')) {
    img = 'assets/images/inca_trail_main.jpg';
  } else if (t.includes('andean') || t.includes('explorer') || t.includes('titicaca') || t.includes('puno')) {
    img = 'assets/images/andean_explorer_main.jpg';
  } else if (t.includes('sacred') || t.includes('sagrado') || t.includes('moray') || t.includes('maras')) {
    img = 'assets/images/sacred_valley_moray.jpg';
  } else if (t.includes('sanctuary') || t.includes('lodge') || t.includes('machu')) {
    img = 'assets/images/hero_machu_picchu.jpg';
  }

  checkoutState.tourImage = img;
  const imgEl = document.getElementById('previewTourImg');
  if (imgEl) imgEl.src = img;
}

// ============================================================================
// 4. RENDERIZAR RESUMEN DE PAGO & CONVERSIÓN DINÁMICA DE MONEDA
// ============================================================================
function renderCheckoutSummary() {
  const dict = I18N[checkoutState.lang] || I18N.es;
  const journeyTitleEl = document.getElementById('checkoutJourneyTitle');
  const previewTourNameEl = document.getElementById('previewTourName');
  const previewRefCodeEl = document.getElementById('previewRefCode');
  const summaryPrefIdEl = document.getElementById('summaryPrefId');
  const summaryTotalDisplayEl = document.getElementById('summaryTotalDisplay');
  const btnPayTextEl = document.getElementById('btnPayText');
  const curSelect = document.getElementById('clientCurrency');

  if (curSelect && curSelect.value !== checkoutState.currency) {
    curSelect.value = checkoutState.currency;
  }

  if (journeyTitleEl) {
    journeyTitleEl.textContent = checkoutState.lang === 'en'
      ? `Secure Checkout: ${checkoutState.title}`
      : `Pago Seguro: ${checkoutState.title}`;
  }
  if (previewTourNameEl) previewTourNameEl.textContent = checkoutState.title;
  if (previewRefCodeEl) {
    const ref = checkoutState.referenceCode || checkoutState.prefId;
    previewRefCodeEl.innerHTML = `${dict.labelRef} <span class="ref-highlight">${ref}</span> • ${dict.conciergeAtelier}`;
  }
  if (summaryPrefIdEl) summaryPrefIdEl.textContent = checkoutState.referenceCode || checkoutState.prefId;

  const symbol = checkoutState.currency === 'USD' ? '$' : 'S/.';
  const formattedAmount = `${symbol} ${Number(checkoutState.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${checkoutState.currency}`;

  if (summaryTotalDisplayEl) summaryTotalDisplayEl.textContent = formattedAmount;
  if (btnPayTextEl) {
    btnPayTextEl.textContent = dict.btnPayAction.replace('{amount}', formattedAmount);
  }
}

function handleCurrencyChange(newCurrency) {
  if (!newCurrency) return;
  const targetCurrency = newCurrency.toUpperCase();
  if (targetCurrency === checkoutState.currency) return;

  checkoutState.currency = targetCurrency;

  if (targetCurrency === 'PEN') {
    checkoutState.amount = checkoutState.amountPen || Number((checkoutState.amountUsd * checkoutState.rate).toFixed(2));
  } else {
    checkoutState.amount = checkoutState.amountUsd || Number((checkoutState.amountPen / checkoutState.rate).toFixed(2));
  }

  renderCheckoutSummary();
}

function sanitizeCulqiDescription(referenceCode) {
  const ref = (referenceCode || '').replace(/[^a-zA-Z0-9\-_]/g, '').trim() || 'RESERVA';
  return `Reserva ${ref} - Luxury Machupicchu Peru`.substring(0, 80);
}

// ============================================================================
// 5. INICIAR CULQI CHECKOUT V4 MODAL & TRACK INTENT (RECUPERACIÓN DE CARRITO)
// ============================================================================
async function trackCheckoutIntent() {
  try {
    const payload = {
      guestName: checkoutState.guestName,
      guestEmail: checkoutState.guestEmail,
      guestPhone: checkoutState.guestPhone,
      amount: checkoutState.amount,
      currency: checkoutState.currency,
      referenceCode: checkoutState.referenceCode || checkoutState.prefId,
      bookingId: checkoutState.bookingId,
      tourTitle: checkoutState.title,
      notes: document.getElementById('clientNotes')?.value || ''
    };

    fetch('/api/payments/track-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => {});
  } catch (_) {}
}

function initiateCulqiPayment() {
  const dict = I18N[checkoutState.lang] || I18N.es;
  const nameInput = document.getElementById('clientFullName');
  const emailInput = document.getElementById('clientEmail');
  const phoneInput = document.getElementById('clientPhone');

  // Validaciones
  if (!emailInput || !emailInput.value.trim() || !emailInput.checkValidity()) {
    showAlert(dict.errEmail, 'error');
    if (emailInput) emailInput.focus();
    return;
  }

  if (!nameInput || !nameInput.value.trim()) {
    showAlert(dict.errName, 'error');
    if (nameInput) nameInput.focus();
    return;
  }

  hideAlert();

  checkoutState.guestName = nameInput.value.trim();
  checkoutState.guestEmail = emailInput.value.trim();
  checkoutState.guestPhone = phoneInput ? phoneInput.value.trim() : '';

  // Disparar tracking de intención de pago (recuperación de carrito)
  trackCheckoutIntent();

  if (typeof Culqi === 'undefined') {
    showAlert(dict.errCulqiLoading, 'info');
    return;
  }

  const amountInCents = Math.round(checkoutState.amount * 100);

  try {
    Culqi.publicKey = checkoutState.publicKey;

    Culqi.settings({
      title: 'Luxury Machupicchu Peru',
      currency: checkoutState.currency,
      amount: amountInCents,
      description: sanitizeCulqiDescription(checkoutState.referenceCode)
    });

    Culqi.options({
      lang: checkoutState.lang === 'en' ? 'en' : 'es',
      modal: true,
      installments: false,
      paymentMethods: {
        tarjeta: true,
        yape: true,
        billetera: true,
        bancaMovil: false,
        agente: false,
        cuotealo: false
      },
      style: {
        logo: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=150&auto=format&fit=crop&q=80',
        bannerColor: '#121316',
        buttonBackground: '#C5A47E',
        menuColor: '#1A1C20',
        linksColor: '#C5A47E',
        buttonTextColor: '#0E0F12',
        priceColor: '#C5A47E'
      }
    });

    Culqi.open();
  } catch (err) {
    console.error('Error al inicializar Culqi:', err);
    showAlert(dict.errCulqiInit, 'error');
  }
}

// ============================================================================
// 6. CALLBACK GLOBAL DE CULQI (window.culqi)
// ============================================================================
function closeCulqiModal() {
  try {
    if (window.Culqi && typeof window.Culqi.close === 'function') {
      window.Culqi.close();
    }
  } catch (e) {
    console.warn('Culqi.close() note:', e);
  }

  setTimeout(() => {
    try {
      const culqiElements = document.querySelectorAll(
        'iframe[src*="culqi.com"], iframe[src*="checkoutview"], #culqi-container, .culqi-checkout-container, .culqi-backdrop, [class*="culqi-overlay"], [id*="culqi-overlay"]'
      );
      culqiElements.forEach(el => {
        el.style.setProperty('display', 'none', 'important');
        el.style.setProperty('visibility', 'hidden', 'important');
      });
    } catch (_) {}
  }, 250);
}

function initCulqiGlobalCallback() {
  window.culqi = async function() {
    const dict = I18N[checkoutState.lang] || I18N.es;
    if (Culqi.token) {
      closeCulqiModal();
      const token = Culqi.token.id;
      const cardBrand = Culqi.token.iin?.card_brand || Culqi.token.card_brand || 'Tarjeta';
      const lastFour = Culqi.token.last_four || '';

      await processBackendCharge(token, cardBrand, lastFour);
    } else if (Culqi.order) {
      console.log('Culqi Order:', Culqi.order);
    } else {
      console.error('Culqi error callback:', Culqi.error);
      const errorMsg = Culqi.error?.user_message || Culqi.error?.merchant_message || dict.errCulqiDeclined;
      showAlert(errorMsg, 'error');
      setProcessingState(false);
    }
  };
}

// ============================================================================
// 7. ENVIAR TOKEN AL BACKEND (/api/payments/charge)
// ============================================================================
async function processBackendCharge(tokenId, cardBrand = '', lastFour = '') {
  const dict = I18N[checkoutState.lang] || I18N.es;
  setProcessingState(true, dict.msgProcessing);

  try {
    const payload = {
      tokenId: tokenId,
      email: checkoutState.guestEmail,
      amount: checkoutState.amount,
      currency: checkoutState.currency,
      bookingId: checkoutState.bookingId,
      customerName: checkoutState.guestName,
      customerPhone: checkoutState.guestPhone,
      referenceCode: checkoutState.referenceCode,
      description: sanitizeCulqiDescription(checkoutState.referenceCode)
    };

    const res = await fetch('/api/payments/charge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.success) {
      console.warn('[Culqi Charge Declined Details]:', data);
      let detailMsg = data.message || data.merchant_message || data.error || dict.errCulqiDeclined;
      if (data.actionCode === 'REVIEW' || (detailMsg && detailMsg.includes('autenticarse'))) {
        detailMsg = checkoutState.lang === 'en'
          ? 'This test card triggers 3DS Challenge authentication. For instant approved testing, use Visa: 4111 1111 1111 1111 (exp: 09/30, CVV: 123) or Mastercard: 5111 1111 1111 1118.'
          : 'Esta tarjeta de prueba requiere desafío 3DS. Para aprobación directa de prueba, utiliza Visa: 4111 1111 1111 1111 (exp: 09/30, CVV: 123).';
      }
      throw new Error(detailMsg);
    }

    closeCulqiModal();
    showAlert(dict.msgSuccess, 'success');
    showSuccessVoucher(data);
  } catch (err) {
    console.error('Error al procesar el cargo:', err);
    closeCulqiModal();
    showAlert(`${err.message}`, 'error');
    setProcessingState(false);
  }
}

// ============================================================================
// 8. MOSTRAR VOUCHER DE CONFIRMACIÓN & BOTONES DE ACCIÓN
// ============================================================================
function showSuccessVoucher(chargeData) {
  closeCulqiModal();
  checkoutState.lastChargeData = chargeData;

  const formSection = document.getElementById('checkoutFormSection');
  const voucherSection = document.getElementById('checkoutVoucherSection');

  if (formSection) formSection.style.display = 'none';
  if (voucherSection) voucherSection.style.display = 'block';

  const tourTitleEl = document.getElementById('voucherTourTitle');
  if (tourTitleEl) tourTitleEl.textContent = checkoutState.title || 'Expedición Privada Machu Picchu';

  const guestNameEl = document.getElementById('voucherGuestName');
  if (guestNameEl) guestNameEl.textContent = checkoutState.guestName || (chargeData.customerName || 'Huésped Distinguido');

  const noticeEmailEl = document.getElementById('voucherNoticeEmail');
  if (noticeEmailEl) noticeEmailEl.textContent = checkoutState.guestEmail || (chargeData.customerEmail || 'su correo registrado');

  document.getElementById('voucherChargeId').textContent = chargeData.chargeId || '—';
  document.getElementById('voucherAuthCode').textContent = chargeData.authorizationCode || 'APROBADO';
  
  const symbol = chargeData.currency === 'USD' ? '$' : 'S/.';
  document.getElementById('voucherAmount').textContent = `${symbol} ${Number(chargeData.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })} ${chargeData.currency}`;
  
  const cardInfo = chargeData.cardBrand ? `${chargeData.cardBrand} •••• ${chargeData.cardLastFour || ''}` : 'Culqi Card / Billetera';
  document.getElementById('voucherCard').textContent = cardInfo;
  
  document.getElementById('voucherRefCode').textContent = chargeData.referenceCode || checkoutState.referenceCode;
  
  const now = new Date(chargeData.transactionDate || Date.now());
  const locale = checkoutState.lang === 'en' ? 'en-US' : 'es-PE';
  document.getElementById('voucherDate').textContent = now.toLocaleString(locale, { dateStyle: 'medium', timeStyle: 'short' });

  updateVoucherWhatsAppLink(chargeData);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateVoucherWhatsAppLink(chargeData) {
  const waBtn = document.getElementById('btnVoucherWhatsApp');
  if (!waBtn) return;

  const dict = I18N[checkoutState.lang] || I18N.es;
  const symbol = chargeData.currency === 'USD' ? '$' : 'S/.';
  const ref = chargeData.referenceCode || checkoutState.referenceCode;

  const waText = encodeURIComponent(
    `${dict.waGreeting}` +
    `${dict.waTour} ${checkoutState.title}\n` +
    `${dict.waRef} ${ref}\n` +
    `${dict.waGuest} ${checkoutState.guestName}\n` +
    `${dict.waAmount} ${symbol} ${chargeData.amount} ${chargeData.currency}\n` +
    `${dict.waCharge} ${chargeData.chargeId}\n` +
    `${dict.waAuth} ${chargeData.authorizationCode}\n\n` +
    `${dict.waClosing}`
  );

  waBtn.href = `https://wa.me/51958195840?text=${waText}`;
}

// ============================================================================
// 9. DESCARGA DIRECTA DE PDF EN 1 CLIC
// ============================================================================
function downloadVoucherPDF() {
  const element = document.getElementById('checkoutVoucherSection');
  if (!element) return;

  const pdfBtn = document.getElementById('btnVoucherPdf');
  const originalText = pdfBtn ? pdfBtn.innerHTML : '';
  if (pdfBtn) {
    pdfBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
      <span>Generando PDF...</span>
    `;
    pdfBtn.disabled = true;
  }

  const ref = (document.getElementById('voucherRefCode')?.textContent || 'LMP-VOUCHER').replace(/[^a-zA-Z0-9\-_]/g, '');
  const opt = {
    margin: [10, 10, 10, 10],
    filename: `LuxuryMachupicchu_Voucher_${ref}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  if (typeof html2pdf !== 'undefined') {
    html2pdf().set(opt).from(element).save().then(() => {
      if (pdfBtn) {
        pdfBtn.innerHTML = originalText;
        pdfBtn.disabled = false;
      }
    }).catch(err => {
      console.error('Error generating PDF:', err);
      if (pdfBtn) {
        pdfBtn.innerHTML = originalText;
        pdfBtn.disabled = false;
      }
      // Fallback nativo
      window.print();
    });
  } else {
    // Si html2pdf no estuviese disponible, fallback a print nativo
    window.print();
    if (pdfBtn) {
      pdfBtn.innerHTML = originalText;
      pdfBtn.disabled = false;
    }
  }
}

// ============================================================================
// 10. UTILITARIOS DE UI & ALERTAS
// ============================================================================
function setProcessingState(processing, message = '') {
  checkoutState.isProcessing = processing;
  const payBtn = document.getElementById('btnPayWithCulqi');
  const btnText = document.getElementById('btnPayText');
  const dict = I18N[checkoutState.lang] || I18N.es;

  if (payBtn) payBtn.disabled = processing;
  if (btnText) {
    if (processing) {
      btnText.textContent = message || dict.msgProcessing;
    } else {
      const symbol = checkoutState.currency === 'USD' ? '$' : 'S/.';
      const formatted = `${symbol} ${checkoutState.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} ${checkoutState.currency}`;
      btnText.textContent = dict.btnPayAction.replace('{amount}', formatted);
    }
  }
}

function showAlert(message, type = 'error') {
  const alertEl = document.getElementById('checkoutAlert');
  if (!alertEl) return;

  alertEl.className = `checkout-alert alert-${type}`;
  alertEl.textContent = message;
  alertEl.style.display = 'flex';
  alertEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideAlert() {
  const alertEl = document.getElementById('checkoutAlert');
  if (alertEl) alertEl.style.display = 'none';
}
