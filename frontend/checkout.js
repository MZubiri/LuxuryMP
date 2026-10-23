/**
 * LUXURY MACHUPICCHU PERU — CULQI CHECKOUT INTEGRATION SCRIPT
 * Version 4 SDK Implementation with Real-Time Charge Processing
 */

const checkoutState = {
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
  isProcessing: false
};

document.addEventListener('DOMContentLoaded', async () => {
  parseQueryParams();
  await loadPaymentConfig();
  renderCheckoutSummary();
  initCulqiGlobalCallback();
});

// ============================================================================
// 1. LEER PARÁMETROS DE LA URL & DETERMINACIÓN INTELIGENTE DE MONEDA
// ============================================================================
function parseQueryParams() {
  const params = new URLSearchParams(window.location.search);

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

  // Regla tributaria y financiera estricta:
  // - PASAPORTE -> Tarifa y cobro oficial en DÓLARES (USD $) sin IGV (D.L. 919).
  // - CUALQUIER OTRO DOCUMENTO (DNI, CE, RUC) -> Tarifa y cobro oficial en SOLES (PEN S/.) con +18% IGV.
  if (checkoutState.docType) {
    if (checkoutState.docType === 'PASSPORT' || checkoutState.docType === 'PASAPORTE') {
      checkoutState.currency = 'USD';
    } else {
      checkoutState.currency = 'PEN';
    }
  } else if (params.has('currency')) {
    const cur = params.get('currency').toUpperCase();
    if (cur === 'USD' || cur === 'PEN') {
      checkoutState.currency = cur;
    }
  }

  // Sincronizar montos bidireccionales con tipo de cambio
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

  if (params.has('email')) {
    checkoutState.guestEmail = params.get('email');
  }

  if (params.has('name')) {
    checkoutState.guestName = params.get('name');
  }

  if (params.has('phone')) {
    checkoutState.guestPhone = params.get('phone');
  }

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
// 2. OBTENER CONFIGURACIÓN PÚBLICA DEL SERVIDOR
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

// ============================================================================
// 3. RENDERIZAR RESUMEN DE PAGO & CONVERSIÓN DINÁMICA DE MONEDA
// ============================================================================
function renderCheckoutSummary() {
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

  if (journeyTitleEl) journeyTitleEl.textContent = `Pago Seguro: ${checkoutState.title}`;
  if (previewTourNameEl) previewTourNameEl.textContent = checkoutState.title;
  if (previewRefCodeEl) {
    previewRefCodeEl.textContent = `Referencia: ${checkoutState.referenceCode || checkoutState.prefId} • Concierge Atelier`;
  }
  if (summaryPrefIdEl) summaryPrefIdEl.textContent = checkoutState.referenceCode || checkoutState.prefId;

  const symbol = checkoutState.currency === 'USD' ? '$' : 'S/.';
  const formattedAmount = `${symbol} ${Number(checkoutState.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${checkoutState.currency}`;

  if (summaryTotalDisplayEl) summaryTotalDisplayEl.textContent = formattedAmount;
  if (btnPayTextEl) btnPayTextEl.textContent = `Pagar ${formattedAmount} con Culqi`;
}

function handleCurrencyChange(newCurrency) {
  if (!newCurrency) return;
  const targetCurrency = newCurrency.toUpperCase();
  if (targetCurrency === checkoutState.currency) return;

  checkoutState.currency = targetCurrency;

  // CONVERSIÓN REAL DEL MONTO
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
// 4. INICIAR CULQI CHECKOUT V4 MODAL
// ============================================================================
function initiateCulqiPayment() {
  const form = document.getElementById('clientDetailsForm');
  const nameInput = document.getElementById('clientFullName');
  const emailInput = document.getElementById('clientEmail');
  const phoneInput = document.getElementById('clientPhone');

  // Validaciones mínimas
  if (!emailInput || !emailInput.value.trim() || !emailInput.checkValidity()) {
    showAlert('Por favor ingrese un correo electrónico válido para emitir su voucher de pago.', 'error');
    if (emailInput) emailInput.focus();
    return;
  }

  if (!nameInput || !nameInput.value.trim()) {
    showAlert('Por favor ingrese el nombre del titular de la reserva.', 'error');
    if (nameInput) nameInput.focus();
    return;
  }

  hideAlert();

  checkoutState.guestName = nameInput.value.trim();
  checkoutState.guestEmail = emailInput.value.trim();
  checkoutState.guestPhone = phoneInput ? phoneInput.value.trim() : '';

  // Verificar que la librería Culqi esté cargada
  if (typeof Culqi === 'undefined') {
    showAlert('El módulo de seguridad de Culqi está terminando de cargar. Por favor intente en unos segundos.', 'info');
    return;
  }

  // Monto en céntimos para Culqi (ej: $1050.00 -> 105000)
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
      lang: 'es',
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

    // Abrir Modal Culqi
    Culqi.open();
  } catch (err) {
    console.error('Error al inicializar Culqi:', err);
    showAlert('No se pudo abrir la ventana de pago seguro. Verifique su conexión.', 'error');
  }
}

// ============================================================================
// 5. CALLBACK GLOBAL DE CULQI (window.culqi)
// ============================================================================
function initCulqiGlobalCallback() {
  window.culqi = async function() {
    if (Culqi.token) {
      // Token generado exitosamente por Culqi (tarjeta o yape)
      const token = Culqi.token.id;
      const cardBrand = Culqi.token.iin?.card_brand || Culqi.token.card_brand || 'Tarjeta';
      const lastFour = Culqi.token.last_four || '';

      await processBackendCharge(token, cardBrand, lastFour);
    } else if (Culqi.order) {
      // Manejo de orden si se habilitase pago en efectivo / agente
      const order = Culqi.order;
      console.log('Culqi Order generada:', order);
    } else {
      // Error retornado por Culqi
      console.error('Culqi error callback:', Culqi.error);
      const errorMsg = Culqi.error?.user_message || Culqi.error?.merchant_message || 'Transacción cancelada o declinada por la entidad emisora.';
      showAlert(errorMsg, 'error');
      setProcessingState(false);
    }
  };
}

// ============================================================================
// 6. ENVIAR TOKEN AL BACKEND (/api/payments/charge)
// ============================================================================
async function processBackendCharge(tokenId, cardBrand = '', lastFour = '') {
  setProcessingState(true, 'Verificando con la entidad bancaria y emitiendo autorización...');

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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.success) {
      console.warn('[Culqi Charge Declined / Error Details]:', data);
      const detailMsg = data.message || data.merchant_message || data.error || 'La entidad bancaria no aprobó la transacción.';
      throw new Error(detailMsg);
    }

    // Éxito: Mostrar Voucher
    showSuccessVoucher(data);
  } catch (err) {
    console.error('Error al procesar el cargo:', err);
    showAlert(`Error en el pago: ${err.message}`, 'error');
    setProcessingState(false);
  }
}

// ============================================================================
// 7. MOSTRAR VOUCHER DE CONFIRMACIÓN
// ============================================================================
function showSuccessVoucher(chargeData) {
  const formSection = document.getElementById('checkoutFormSection');
  const voucherSection = document.getElementById('checkoutVoucherSection');

  if (formSection) formSection.style.display = 'none';
  if (voucherSection) voucherSection.style.display = 'block';

  document.getElementById('voucherChargeId').textContent = chargeData.chargeId || '—';
  document.getElementById('voucherAuthCode').textContent = chargeData.authorizationCode || 'APROBADO';
  
  const symbol = chargeData.currency === 'USD' ? '$' : 'S/.';
  document.getElementById('voucherAmount').textContent = `${symbol} ${Number(chargeData.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })} ${chargeData.currency}`;
  
  const cardInfo = chargeData.cardBrand ? `${chargeData.cardBrand} •••• ${chargeData.cardLastFour || ''}` : 'Culqi Card / Billetera';
  document.getElementById('voucherCard').textContent = cardInfo;
  
  document.getElementById('voucherRefCode').textContent = chargeData.referenceCode || checkoutState.referenceCode;
  
  const now = new Date(chargeData.transactionDate || Date.now());
  document.getElementById('voucherDate').textContent = now.toLocaleString('es-PE', { dateStyle: 'medium', timeStyle: 'short' });

  // Botón de WhatsApp para el Concierge
  const waBtn = document.getElementById('btnVoucherWhatsApp');
  if (waBtn) {
    const waText = encodeURIComponent(
      `Hola Concierge de Luxury Machupicchu Peru, acabo de realizar mi depósito de reserva:\n\n` +
      `• Expedición: ${checkoutState.title}\n` +
      `• Referencia: ${chargeData.referenceCode || checkoutState.referenceCode}\n` +
      `• Titular: ${checkoutState.guestName}\n` +
      `• Monto Pagado: ${symbol} ${chargeData.amount} ${chargeData.currency}\n` +
      `• Código Culqi: ${chargeData.chargeId}\n` +
      `• Autorización: ${chargeData.authorizationCode}\n\n` +
      `Por favor confirmar recepción y detalles de itinerario.`
    );
    waBtn.href = `https://wa.me/51958195840?text=${waText}`;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================================
// UTILITARIOS DE UI
// ============================================================================
function setProcessingState(processing, message = '') {
  checkoutState.isProcessing = processing;
  const payBtn = document.getElementById('btnPayWithCulqi');
  const btnText = document.getElementById('btnPayText');

  if (payBtn) payBtn.disabled = processing;
  if (btnText) {
    if (processing) {
      btnText.textContent = message || 'Procesando pago seguro...';
    } else {
      const symbol = checkoutState.currency === 'USD' ? '$' : 'S/.';
      btnText.textContent = `Pagar ${symbol} ${checkoutState.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} con Culqi`;
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
