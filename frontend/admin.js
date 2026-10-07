/**
 * LUXURY MACHUPICCHU PERU — ATELIER CONCIERGE & DIRECTOR SUITE
 * Haute Couture Frontend Management Script
 */

// Estado Global del Backoffice
const adminState = {
  token: localStorage.getItem('lmp_admin_token') || null,
  currentUser: null,
  currentCurrency: localStorage.getItem('lmp_admin_currency') || 'USD',
  sidebarCollapsed: localStorage.getItem('lmp_admin_sidebar_collapsed') === 'true',
  activeView: 'dashboard',
  exchangeRateUsdToPen: 3.80,
  
  // Datos
  dashboardStats: null,
  bookings: [],
  totalBookingsCount: 0,
  currentPage: 1,
  pageSize: 15,
  totalPages: 1,
  
  // Filtros de Reservas
  bookingsFilter: {
    search: '',
    status: '',
    fromDate: '',
    toDate: ''
  },
  
  // Catálogo de Tours
  tours: [],
  selectedTourId: null,
  
  // Solicitudes Concierge
  conciergeRequests: [],
  
  // Modal de Detalle
  currentBookingDetail: null,
  pendingDeleteAction: null
};

// Variable para el debounce del buscador
let searchDebounceTimeout = null;

// ============================================================================
// INICIALIZACIÓN
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initSidebarCollapse();
  initCurrencyUI();
  updateDashboardGreeting();

  if (adminState.token) {
    checkAuthSession();
  } else {
    showLoginScreen();
  }
});

// ============================================================================
// COLAPSO Y EXPANSIÓN DEL MENÚ LATERAL (SIDEBAR TOGGLE)
// ============================================================================
function initSidebarCollapse() {
  const isCollapsed = localStorage.getItem('lmp_admin_sidebar_collapsed') === 'true';
  adminState.sidebarCollapsed = isCollapsed;
  applySidebarCollapse(isCollapsed);

  // Atajo de teclado: Ctrl + B o Cmd + B para alternar el menú
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (activeTag !== 'input' && activeTag !== 'textarea' && activeTag !== 'select') {
        e.preventDefault();
        toggleSidebarCollapse();
      }
    }
  });
}

function toggleSidebarCollapse() {
  const layout = document.getElementById('adminAppLayout') || document.querySelector('.admin-app-layout');
  const isCurrentlyCollapsed = layout ? layout.classList.contains('sidebar-collapsed') : false;
  const newState = !isCurrentlyCollapsed;
  
  applySidebarCollapse(newState);
  localStorage.setItem('lmp_admin_sidebar_collapsed', newState ? 'true' : 'false');
  adminState.sidebarCollapsed = newState;

  if (newState) {
    showToast('Menú lateral colapsado (Espacio ampliado)', 'info');
  } else {
    showToast('Menú lateral expandido', 'info');
  }
}

function applySidebarCollapse(collapsed) {
  const layout = document.getElementById('adminAppLayout') || document.querySelector('.admin-app-layout');
  const sidebarToggleBtn = document.getElementById('btnSidebarCollapse');
  const headerToggleBtn = document.getElementById('btnHeaderCollapseToggle');

  if (!layout) return;

  if (collapsed) {
    layout.classList.add('sidebar-collapsed');
    if (sidebarToggleBtn) {
      sidebarToggleBtn.title = "Expandir menú (Ctrl+B)";
      sidebarToggleBtn.setAttribute('aria-expanded', 'false');
    }
    if (headerToggleBtn) {
      headerToggleBtn.classList.add('active');
      headerToggleBtn.title = "Expandir menú lateral (Ctrl+B)";
      headerToggleBtn.setAttribute('aria-expanded', 'false');
    }
  } else {
    layout.classList.remove('sidebar-collapsed');
    if (sidebarToggleBtn) {
      sidebarToggleBtn.title = "Colapsar menú (Ctrl+B)";
      sidebarToggleBtn.setAttribute('aria-expanded', 'true');
    }
    if (headerToggleBtn) {
      headerToggleBtn.classList.remove('active');
      headerToggleBtn.title = "Colapsar menú lateral (Ctrl+B)";
      headerToggleBtn.setAttribute('aria-expanded', 'true');
    }
  }
}

// Helper de Saludo y Fecha
function updateDashboardGreeting() {
  const el = document.getElementById('dashboardDateGreeting');
  if (!el) return;
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formatted = now.toLocaleDateString('es-PE', options);
  el.textContent = `Operaciones & Curation Desk • ${formatted.charAt(0).toUpperCase() + formatted.slice(1)}`;
}

// ============================================================================
// CONEXIÓN CON LA API (FETCH WRAPPER CON SOPORTE JWT Y FALLBACK)
// ============================================================================
async function apiFetch(endpoint, options = {}) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : '/' + endpoint;
  const headers = options.headers ? { ...options.headers } : {};

  // Headers de contenido por defecto si no es FormData
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  // Inyectar Token JWT
  if (adminState.token) {
    headers['Authorization'] = `Bearer ${adminState.token}`;
  }

  options.headers = headers;

  const runRequest = async (baseUrl) => {
    return await fetch(`${baseUrl}${cleanEndpoint}`, options);
  };

  try {
    let res;
    const isLocalDevCustomPort = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') &&
                                  window.location.port !== '' && window.location.port !== '80' && window.location.port !== '443' && window.location.port !== '5000';

    if (isLocalDevCustomPort || window.location.protocol === 'file:') {
      res = await runRequest('http://localhost:5000/api');
    } else {
      res = await runRequest('/api');
      if ((res.status === 404 || res.status === 405) && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
        res = await runRequest('http://localhost:5000/api');
      }
    }

    // Manejo de expiración de sesión (401 Unauthorized)
    if (res.status === 401) {
      if (adminState.token) {
        showToast('Su sesión de Concierge ha expirado. Por favor ingrese nuevamente.', 'error');
        handleLogout();
      }
      throw new Error('Unauthorized');
    }

    return res;
  } catch (err) {
    // Fallback directo en red local si la conexión relativa falló a nivel red
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:') {
      try {
        const res = await runRequest('http://localhost:5000/api');
        if (res.status === 401) {
          handleLogout();
          throw new Error('Unauthorized');
        }
        return res;
      } catch (innerErr) {
        setApiOffline();
        throw innerErr;
      }
    }
    setApiOffline();
    throw err;
  }
}

function setApiOnline() {
  const indicator = document.getElementById('apiStatusIndicator');
  if (indicator) {
    indicator.innerHTML = '<span class="api-pulse"></span> Backend API Conectado (.NET 9)';
    indicator.style.color = '#85CE61';
  }
}

function setApiOffline() {
  const indicator = document.getElementById('apiStatusIndicator');
  if (indicator) {
    indicator.innerHTML = '<span class="api-pulse" style="background:#F56C6C; box-shadow:0 0 8px #F56C6C;"></span> Conexión al Backend Interrumpida';
    indicator.style.color = '#F56C6C';
  }
}

// ============================================================================
// AUTENTICACIÓN & CONTROL DE ACCESO
// ============================================================================
function showLoginScreen() {
  const screen = document.getElementById('adminLoginScreen');
  if (screen) screen.style.display = 'flex';
}

function hideLoginScreen() {
  const screen = document.getElementById('adminLoginScreen');
  if (screen) screen.style.display = 'none';
}

function autofillDemoCredentials() {
  document.getElementById('loginUsername').value = 'admin';
  document.getElementById('loginPassword').value = 'MachuPicchuLuxury2026!';
}

async function handleLoginSubmit(event) {
  event.preventDefault();
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  const alertBox = document.getElementById('loginErrorAlert');
  const submitBtn = document.getElementById('btnLoginSubmit');

  if (alertBox) alertBox.style.display = 'none';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Verificando Credenciales...';
  }

  try {
    const res = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || 'Credenciales inválidas');
    }

    const data = await res.json();
    adminState.token = data.token;
    localStorage.setItem('lmp_admin_token', data.token);

    adminState.currentUser = {
      username: data.username,
      fullName: data.fullName || 'Luxury Machupicchu Concierge Director',
      role: data.role || 'Administrator'
    };

    updateUserUI();
    hideLoginScreen();
    setApiOnline();
    showToast(`Bienvenido al Atelier, ${adminState.currentUser.fullName}`, 'success');
    
    // Iniciar vistas
    await initAdminApp();
  } catch (err) {
    if (alertBox) {
      alertBox.textContent = err.message || 'Credenciales no autorizadas. Verifique usuario o contraseña.';
      alertBox.style.display = 'block';
    }
    showToast('Acceso no autorizado al Atelier.', 'error');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Ingresar al Atelier';
    }
  }
}

async function checkAuthSession() {
  try {
    const res = await apiFetch('/auth/me');
    if (!res.ok) throw new Error('Invalid token');
    const data = await res.json();
    
    adminState.currentUser = {
      username: data.username,
      fullName: data.fullName,
      role: data.role
    };

    updateUserUI();
    hideLoginScreen();
    setApiOnline();
    await initAdminApp();
  } catch (err) {
    console.warn('Session expired or invalid, requesting login:', err);
    handleLogout();
  }
}

function handleLogout() {
  adminState.token = null;
  adminState.currentUser = null;
  localStorage.removeItem('lmp_admin_token');
  showLoginScreen();
  showToast('Sesión de Concierge finalizada de forma segura.', 'info');
}

function updateUserUI() {
  if (!adminState.currentUser) return;
  const nameEl = document.getElementById('adminUserDisplayName');
  const roleEl = document.getElementById('adminUserRole');
  const avatarEl = document.getElementById('adminUserAvatar');

  if (nameEl) nameEl.textContent = adminState.currentUser.fullName;
  if (roleEl) roleEl.textContent = adminState.currentUser.role;
  if (avatarEl) {
    const initials = adminState.currentUser.fullName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    avatarEl.textContent = initials || 'CD';
  }
}

// Inicializar todas las vistas tras login exitoso
async function initAdminApp() {
  await Promise.all([
    loadDashboardData(),
    loadBookingsData(),
    loadToursData(),
    loadConciergeData()
  ]);
}

// ============================================================================
// GESTIÓN DE MONEDA & FORMATEO DE PRECIOS
// ============================================================================
function setAdminCurrency(currency) {
  adminState.currentCurrency = currency;
  localStorage.setItem('lmp_admin_currency', currency);
  initCurrencyUI();

  // Refrescar vistas activas
  if (adminState.activeView === 'dashboard') loadDashboardData();
  if (adminState.activeView === 'bookings') renderBookingsTable();
  if (adminState.activeView === 'payments') updatePaymentsBanner();
  if (adminState.activeView === 'itineraries' && adminState.selectedTourId) {
    renderTourDetail(adminState.selectedTourId);
  }

  showToast(`Moneda visual configurada en ${currency}`, 'info');
}

function initCurrencyUI() {
  const btnUsd = document.getElementById('btnAdminUsd');
  const btnPen = document.getElementById('btnAdminPen');
  if (btnUsd && btnPen) {
    if (adminState.currentCurrency === 'USD') {
      btnUsd.classList.add('active');
      btnPen.classList.remove('active');
    } else {
      btnPen.classList.add('active');
      btnUsd.classList.remove('active');
    }
  }
}

function formatMoney(amountUsd, amountPen = null) {
  const isPen = adminState.currentCurrency === 'PEN';
  let val = isPen ? (amountPen !== null ? amountPen : (amountUsd * adminState.exchangeRateUsdToPen)) : amountUsd;
  val = Number(val) || 0;

  const symbol = isPen ? 'S/.' : '$';
  return `${symbol} ${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${adminState.currentCurrency}`;
}

// ============================================================================
// NAVEGACIÓN ENTRE VISTAS DEL PANEL
// ============================================================================
function switchAdminView(viewName) {
  adminState.activeView = viewName;

  // Actualizar botones del Sidebar
  document.querySelectorAll('.nav-item-btn').forEach(btn => btn.classList.remove('active'));
  const targetNavBtn = document.getElementById(`navBtn-${viewName}`);
  if (targetNavBtn) targetNavBtn.classList.add('active');

  // Actualizar Secciones de Contenido
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  const targetViewSec = document.getElementById(`view-${viewName}`);
  if (targetViewSec) targetViewSec.classList.add('active');

  // Acciones específicas al entrar a una vista
  if (viewName === 'dashboard') loadDashboardData();
  if (viewName === 'bookings') loadBookingsData();
  if (viewName === 'itineraries') loadToursData();
  if (viewName === 'concierge') loadConciergeData();
  if (viewName === 'payments') {
    loadBookingsData().then(() => updatePaymentsBanner());
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================================
// VISTA 1: DASHBOARD PRINCIPAL
// ============================================================================
async function loadDashboardData() {
  try {
    const res = await apiFetch('/dashboard/stats');
    if (!res.ok) throw new Error('Error al cargar métricas del dashboard');
    
    const stats = await res.json();
    adminState.dashboardStats = stats;

    renderDashboardKPIs(stats);
    renderDashboardTopTours(stats.topRequestedTours || []);
    renderDashboardRecentBookings(stats.recentBookings || []);
    setApiOnline();
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
    showToast('No se pudieron sincronizar las métricas del dashboard.', 'error');
  }
}

function renderDashboardKPIs(stats) {
  // KPIs Principales
  const kpiTotal = document.getElementById('kpiTotalBookings');
  const kpiPendingSub = document.getElementById('kpiPendingBookingsHighlight');
  const kpiConfirmedRev = document.getElementById('kpiConfirmedRevenue');
  const kpiPipelineRev = document.getElementById('kpiPipelineRevenue');
  const kpiConcierge = document.getElementById('kpiConciergeCount');
  const kpiConciergeSub = document.getElementById('kpiConciergePendingSub');

  if (kpiTotal) kpiTotal.textContent = (stats.totalBookings || 0).toLocaleString();
  if (kpiPendingSub) kpiPendingSub.textContent = `${stats.pendingBookings || 0} pendientes de atención`;

  if (kpiConfirmedRev) {
    kpiConfirmedRev.textContent = formatMoney(stats.confirmedRevenueUsd, stats.confirmedRevenuePen);
  }
  if (kpiPipelineRev) {
    kpiPipelineRev.textContent = formatMoney(stats.pipelineRevenueUsd, stats.pipelineRevenuePen);
  }

  if (kpiConcierge) kpiConcierge.textContent = (stats.totalConciergeRequests || 0).toLocaleString();
  if (kpiConciergeSub) {
    kpiConciergeSub.textContent = `${stats.pendingConciergeRequests || 0} requieren atención inmediata`;
  }

  // Contadores de Estado
  const countPending = document.getElementById('countStatusPending');
  const countContacted = document.getElementById('countStatusContacted');
  const countConfirmed = document.getElementById('countStatusConfirmed');
  const countPaid = document.getElementById('countStatusPaid');
  const countCancelled = document.getElementById('countStatusCancelled');

  if (countPending) countPending.textContent = stats.pendingBookings || 0;
  if (countContacted) countContacted.textContent = stats.contactedBookings || 0;
  if (countConfirmed) countConfirmed.textContent = stats.confirmedBookings || 0;
  if (countPaid) countPaid.textContent = stats.paidBookings || 0;
  if (countCancelled) countCancelled.textContent = stats.cancelledBookings || 0;

  // Actualizar badges en sidebar
  const sbBookings = document.getElementById('sidebarBookingsCount');
  const sbConcierge = document.getElementById('sidebarConciergePendingCount');
  if (sbBookings) sbBookings.textContent = stats.totalBookings || 0;
  if (sbConcierge) sbConcierge.textContent = stats.pendingConciergeRequests || 0;
}

function renderDashboardTopTours(topTours) {
  const container = document.getElementById('dashboardTopToursList');
  if (!container) return;

  if (!topTours || topTours.length === 0) {
    container.innerHTML = '<p style="color:var(--admin-text-dim); font-size:0.8rem;">No hay expediciones cotizadas aún.</p>';
    return;
  }

  const maxCount = Math.max(...topTours.map(t => t.inquiryCount), 1);

  container.innerHTML = topTours.map(tour => {
    const percent = Math.round((tour.inquiryCount / maxCount) * 100);
    const volumeFormatted = formatMoney(tour.totalEstimatedUsd);

    return `
      <div class="top-tour-item">
        <div class="top-tour-info">
          <div class="top-tour-title" title="${escapeHtml(tour.title)}">${escapeHtml(tour.title)}</div>
          <div class="top-tour-bar-wrap">
            <div class="top-tour-bar-fill" style="width: ${percent}%;"></div>
          </div>
        </div>
        <div class="top-tour-stats">
          <div class="top-tour-count">${tour.inquiryCount} cotiz.</div>
          <div class="top-tour-volume">${volumeFormatted}</div>
        </div>
      </div>
    `;
  }).join('');
}

function renderDashboardRecentBookings(recentBookings) {
  const container = document.getElementById('dashboardRecentBookingsList');
  if (!container) return;

  if (!recentBookings || recentBookings.length === 0) {
    container.innerHTML = '<p style="color:var(--admin-text-dim); font-size:0.8rem;">No hay actividad reciente registrada.</p>';
    return;
  }

  container.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:0.75rem;">
      ${recentBookings.map(b => {
        const statusClass = getStatusClass(b.status);
        const amount = formatMoney(b.estimatedTotalUsd, b.estimatedTotalPen);
        const dateStr = formatDate(b.createdAt);

        return `
          <div style="background:rgba(10,11,14,0.4); border:1px solid var(--admin-border-light); padding:0.75rem 1rem; border-radius:2px; display:flex; align-items:center; justify-content:space-between; gap:0.75rem;">
            <div style="min-width:0;">
              <div style="font-weight:600; font-size:0.84rem; color:#FFFFFF; margin-bottom:2px;">
                ${escapeHtml(b.fullName)}
                <span style="font-size:0.68rem; color:var(--admin-gold); font-weight:normal;">(${escapeHtml(b.country || 'VIP')})</span>
              </div>
              <div style="font-size:0.72rem; color:var(--admin-text-muted); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">
                ${escapeHtml(b.tourTitle)} • ${dateStr}
              </div>
            </div>
            <div style="text-align:right; flex-shrink:0;">
              <div style="font-family:'Cormorant Garamond', serif; font-size:1.1rem; font-weight:600; color:var(--admin-gold-bright);">${amount}</div>
              <span class="status-pill ${statusClass}" style="font-size:0.58rem; padding:0.15rem 0.45rem;">${b.status}</span>
            </div>
            <div style="display:flex; gap:0.35rem;">
              ${b.whatsAppUrl ? `
                <a href="${b.whatsAppUrl}" target="_blank" class="btn-table-action btn-table-whatsapp" title="WhatsApp VIP">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.4 1.34-1.92 1.42-.5.09-1.15.12-1.85-.11-.43-.14-.99-.33-1.71-.65-3.04-1.33-5.01-4.42-5.16-4.63-.16-.2-1.23-1.64-1.23-3.13 0-1.49.78-2.22 1.06-2.52.28-.3.61-.38.81-.38.2 0 .41 0 .58.01.19.01.44-.07.69.53.25.61.85 2.08.93 2.23.08.16.13.35.03.55-.1.2-.15.33-.3.51-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.79 1.3 1.69 2.11 1.16 1.03 2.13 1.35 2.44 1.5.31.15.49.13.67-.08.19-.21.79-.92 1-1.24.21-.31.42-.26.7-.16.29.1 1.83.86 2.14 1.02.31.15.52.23.6.36.08.13.08.77-.16 1.45z"/></svg>
                </a>
              ` : ''}
              <button type="button" class="btn-table-action" onclick="openBookingDetail(${b.id})" title="Ver Ficha">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function filterBookingsByStatusQuick(status) {
  document.getElementById('bookingStatusFilter').value = status;
  adminState.bookingsFilter.status = status;
  switchAdminView('bookings');
}

// ============================================================================
// VISTA 2: GESTIÓN DE RESERVAS VIP
// ============================================================================
async function loadBookingsData(page = 1) {
  adminState.currentPage = page;

  const params = new URLSearchParams();
  params.append('page', page);
  params.append('pageSize', adminState.pageSize);

  if (adminState.bookingsFilter.search) {
    params.append('search', adminState.bookingsFilter.search);
  }
  if (adminState.bookingsFilter.status) {
    params.append('status', adminState.bookingsFilter.status);
  }
  if (adminState.bookingsFilter.fromDate) {
    params.append('fromDate', adminState.bookingsFilter.fromDate);
  }
  if (adminState.bookingsFilter.toDate) {
    params.append('toDate', adminState.bookingsFilter.toDate);
  }

  try {
    const res = await apiFetch(`/bookings?${params.toString()}`);
    if (!res.ok) throw new Error('Error al listar reservas');

    const data = await res.json();
    adminState.bookings = data.items || [];
    adminState.totalBookingsCount = data.totalItems || 0;
    adminState.totalPages = data.totalPages || 1;

    renderBookingsTable();
    renderBookingsPagination();
  } catch (err) {
    console.error('Error fetching bookings:', err);
    showToast('Error al conectar con la base de datos de reservas.', 'error');
  }
}

function renderBookingsTable() {
  const tbody = document.getElementById('bookingsTableBody');
  if (!tbody) return;

  if (adminState.bookings.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; color: var(--admin-text-dim); padding: 3rem;">
          No se encontraron reservas con los filtros seleccionados.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = adminState.bookings.map(b => {
    const statusClass = getStatusClass(b.status);
    const quoteMain = formatMoney(b.estimatedTotalUsd, b.estimatedTotalPen);
    const dateCreated = formatDate(b.createdAt);
    const travelDateStr = b.travelDate ? formatDate(b.travelDate) : 'Por Definir';

    return `
      <tr>
        <!-- Ref & Creación -->
        <td>
          <div style="font-family:'Montserrat', sans-serif; font-size:0.75rem; font-weight:700; color:var(--admin-gold);">#LMP-${b.id}</div>
          <div style="font-size:0.68rem; color:var(--admin-text-dim);">${dateCreated}</div>
        </td>

        <!-- Huésped VIP -->
        <td>
          <div class="guest-primary">${escapeHtml(b.fullName)}</div>
          <div class="guest-meta">
            <span class="guest-country-tag">${escapeHtml(b.country || 'Intl')}</span>
            <span>${escapeHtml(b.email)}</span>
          </div>
          <div style="font-size:0.68rem; color:var(--admin-text-dim); margin-top:2px;">
            ${escapeHtml(b.phone)}
          </div>
        </td>

        <!-- Expedición & Tren -->
        <td>
          <div class="tour-cell-title">${escapeHtml(b.tourTitle)}</div>
          <div class="tour-cell-train">${escapeHtml(b.trainPreference || 'Belmond Hiram Bingham')}</div>
        </td>

        <!-- Fecha / Pasajeros -->
        <td>
          <div style="font-size:0.82rem; font-weight:600; color:#FFFFFF;">${travelDateStr}</div>
          <div style="font-size:0.7rem; color:var(--admin-text-muted);">${b.numberOfGuests} Pasajero(s) VIP</div>
        </td>

        <!-- Cotización -->
        <td>
          <div class="quote-amount-main">${quoteMain}</div>
        </td>

        <!-- Estado -->
        <td>
          <span class="status-pill ${statusClass}">
            <span class="status-indicator-dot ${statusClass}"></span>
            ${b.status}
          </span>
        </td>

        <!-- Acciones -->
        <td style="text-align: right;">
          <div class="table-actions-cell" style="justify-content: flex-end;">
            <!-- Ficha / Editar -->
            <button type="button" class="btn-table-action" onclick="openBookingDetail(${b.id})" title="Ver y Modificar Detalle">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>

            <!-- WhatsApp Directo -->
            ${b.whatsAppUrl ? `
              <a href="${b.whatsAppUrl}" target="_blank" class="btn-table-action btn-table-whatsapp" title="Abrir WhatsApp VIP">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.4 1.34-1.92 1.42-.5.09-1.15.12-1.85-.11-.43-.14-.99-.33-1.71-.65-3.04-1.33-5.01-4.42-5.16-4.63-.16-.2-1.23-1.64-1.23-3.13 0-1.49.78-2.22 1.06-2.52.28-.3.61-.38.81-.38.2 0 .41 0 .58.01.19.01.44-.07.69.53.25.61.85 2.08.93 2.23.08.16.13.35.03.55-.1.2-.15.33-.3.51-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.79 1.3 1.69 2.11 1.16 1.03 2.13 1.35 2.44 1.5.31.15.49.13.67-.08.19-.21.79-.92 1-1.24.21-.31.42-.26.7-.16.29.1 1.83.86 2.14 1.02.31.15.52.23.6.36.08.13.08.77-.16 1.45z"/></svg>
              </a>
            ` : ''}

            <!-- Voucher -->
            <button type="button" class="btn-table-action" onclick="openVoucherForBookingId(${b.id})" title="Generar Voucher Oficial">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            </button>

            <!-- Eliminar -->
            <button type="button" class="btn-table-action btn-table-delete" onclick="promptDeleteBooking(${b.id}, '${escapeHtml(b.fullName)}')" title="Eliminar Cotización">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function renderBookingsPagination() {
  const summaryEl = document.getElementById('paginationSummaryText');
  const controlsEl = document.getElementById('paginationControls');

  const start = (adminState.currentPage - 1) * adminState.pageSize + 1;
  const end = Math.min(adminState.currentPage * adminState.pageSize, adminState.totalBookingsCount);

  if (summaryEl) {
    summaryEl.textContent = adminState.totalBookingsCount > 0
      ? `Mostrando ${start} a ${end} de ${adminState.totalBookingsCount} reservas registradas`
      : 'Sin resultados disponibles';
  }

  if (!controlsEl) return;

  if (adminState.totalPages <= 1) {
    controlsEl.innerHTML = '';
    return;
  }

  let html = `
    <button type="button" class="btn-page-nav" ${adminState.currentPage === 1 ? 'disabled' : ''} onclick="loadBookingsData(${adminState.currentPage - 1})">
      Anterior
    </button>
  `;

  for (let p = 1; p <= adminState.totalPages; p++) {
    html += `
      <button type="button" class="btn-page-nav ${p === adminState.currentPage ? 'active' : ''}" onclick="loadBookingsData(${p})">
        ${p}
      </button>
    `;
  }

  html += `
    <button type="button" class="btn-page-nav" ${adminState.currentPage === adminState.totalPages ? 'disabled' : ''} onclick="loadBookingsData(${adminState.currentPage + 1})">
      Siguiente
    </button>
  `;

  controlsEl.innerHTML = html;
}

// Búsqueda y Filtros
function handleBookingSearchInput() {
  clearTimeout(searchDebounceTimeout);
  searchDebounceTimeout = setTimeout(() => {
    adminState.bookingsFilter.search = document.getElementById('bookingSearchInput').value.trim();
    loadBookingsData(1);
  }, 350);
}

function handleBookingFilterChange() {
  adminState.bookingsFilter.status = document.getElementById('bookingStatusFilter').value;
  adminState.bookingsFilter.fromDate = document.getElementById('bookingFromDate').value;
  adminState.bookingsFilter.toDate = document.getElementById('bookingToDate').value;
  loadBookingsData(1);
}

function resetBookingFilters() {
  document.getElementById('bookingSearchInput').value = '';
  document.getElementById('bookingStatusFilter').value = '';
  document.getElementById('bookingFromDate').value = '';
  document.getElementById('bookingToDate').value = '';

  adminState.bookingsFilter = { search: '', status: '', fromDate: '', toDate: '' };
  loadBookingsData(1);
}

// ============================================================================
// MODAL: FICHA DE RESERVA Y ACTUALIZACIÓN DE ESTADOS
// ============================================================================
async function openBookingDetail(id) {
  try {
    const res = await apiFetch(`/bookings/${id}`);
    if (!res.ok) throw new Error('No se pudo obtener el detalle de la reserva');

    const booking = await res.json();
    adminState.currentBookingDetail = booking;

    document.getElementById('modalBookingId').value = booking.id;
    document.getElementById('modalBookingRef').textContent = `COTIZACIÓN VIP #LMP-${booking.id}`;
    document.getElementById('modalBookingGuest').textContent = booking.fullName;
    document.getElementById('modalBookingExpedition').textContent = booking.tourTitle;

    document.getElementById('modalDisplayEmail').textContent = booking.email;
    document.getElementById('modalDisplayPhone').textContent = booking.phone;
    document.getElementById('modalDisplayCountry').textContent = booking.country || 'Internacional';

    const travelDateFormatted = booking.travelDate ? formatDate(booking.travelDate) : 'Por coordinar';
    document.getElementById('modalDisplayTravel').textContent = `${travelDateFormatted} • ${booking.numberOfGuests} huésped(es)`;
    document.getElementById('modalDisplayTrain').textContent = booking.trainPreference || 'Belmond Hiram Bingham';
    document.getElementById('modalDisplayPrice').textContent = formatMoney(booking.estimatedTotalUsd, booking.estimatedTotalPen);

    document.getElementById('modalDisplayRequests').textContent = booking.specialRequests || 'Sin requerimientos especiales registrados.';
    document.getElementById('modalEditStatus').value = booking.status;
    document.getElementById('modalConciergeNote').value = '';

    const btnWa = document.getElementById('modalBtnWhatsApp');
    if (btnWa) {
      if (booking.whatsAppUrl) {
        btnWa.href = booking.whatsAppUrl;
        btnWa.style.display = 'inline-flex';
      } else {
        btnWa.style.display = 'none';
      }
    }

    openAdminModal('bookingModal');
  } catch (err) {
    showToast('Error al cargar la información del cliente.', 'error');
  }
}

async function handleSaveBookingStatus(event) {
  event.preventDefault();
  const id = document.getElementById('modalBookingId').value;
  const newStatus = document.getElementById('modalEditStatus').value;
  const note = document.getElementById('modalConciergeNote').value.trim();

  try {
    const res = await apiFetch(`/bookings/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({
        status: newStatus,
        notes: note || null
      })
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || 'Error al actualizar el estado de la reserva');
    }

    const updated = await res.json();
    adminState.currentBookingDetail = updated;

    closeAdminModal('bookingModal');
    showToast(`Estado de reserva #${id} actualizado a [${newStatus}]`, 'success');

    // Refrescar vistas
    await Promise.all([
      loadBookingsData(adminState.currentPage),
      loadDashboardData()
    ]);
  } catch (err) {
    showToast(err.message || 'Error al guardar el estado.', 'error');
  }
}

// Eliminación de Reserva
function promptDeleteBooking(id, guestName) {
  const msgEl = document.getElementById('deleteModalMessage');
  if (msgEl) {
    msgEl.innerHTML = `¿Está seguro de que desea eliminar la cotización <strong>#LMP-${id}</strong> de <strong>${escapeHtml(guestName)}</strong>? Esta acción no se puede deshacer.`;
  }

  const btnConfirm = document.getElementById('btnConfirmDeleteAction');
  if (btnConfirm) {
    btnConfirm.onclick = async () => {
      try {
        const res = await apiFetch(`/bookings/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Error al eliminar la reserva');

        closeAdminModal('deleteModal');
        showToast(`Cotización #${id} eliminada con éxito.`, 'success');
        await Promise.all([loadBookingsData(adminState.currentPage), loadDashboardData()]);
      } catch (err) {
        showToast('No se pudo eliminar la cotización.', 'error');
      }
    };
  }

  openAdminModal('deleteModal');
}

// ============================================================================
// VISTA 3: ITINERARIOS & EXPEDICIONES
// ============================================================================
async function loadToursData() {
  try {
    const res = await apiFetch('/tours/admin/all');
    if (!res.ok) throw new Error('Error al cargar tours');

    const tours = await res.json();
    adminState.tours = tours;

    renderToursSidebar(tours);

    if (tours.length > 0 && !adminState.selectedTourId) {
      selectTourForDetail(tours[0].id);
    } else if (adminState.selectedTourId) {
      selectTourForDetail(adminState.selectedTourId);
    }
  } catch (err) {
    console.error('Error fetching tours catalog:', err);
    showToast('Error al cargar catálogo de expediciones.', 'error');
  }
}

function renderToursSidebar(tours) {
  const container = document.getElementById('toursCatalogSidebar');
  if (!container) return;

  if (tours.length === 0) {
    container.innerHTML = '<p style="color:var(--admin-text-dim); font-size:0.8rem;">No hay expediciones en el catálogo.</p>';
    return;
  }

  container.innerHTML = tours.map(tour => {
    const isActiveTour = tour.id === adminState.selectedTourId;
    const priceFormatted = formatMoney(tour.priceUsd, tour.pricePen);

    return `
      <div class="tour-card-selector ${isActiveTour ? 'active' : ''}" onclick="selectTourForDetail(${tour.id})">
        <div class="tour-selector-header">
          <span class="tour-selector-cat">${escapeHtml(tour.categoryNameEn || tour.categoryName || 'Expedition')}</span>
          <span style="font-size:0.68rem; color:var(--admin-gold);">${tour.durationEn || tour.duration || ''}</span>
        </div>
        <div class="tour-selector-title">${escapeHtml(tour.titleEn || tour.title || 'Untitled Tour')}</div>
        <div class="tour-selector-price">Desde ${priceFormatted}</div>
        <div class="tour-selector-badges">
          <span class="badge-tag-mini ${tour.isActive ? 'badge-active' : 'badge-inactive'}">
            ${tour.isActive ? 'Activo' : 'Inactivo'}
          </span>
          ${tour.featured ? '<span class="badge-tag-mini badge-featured">Destacado</span>' : ''}
          <span class="badge-tag-mini" style="background:rgba(255,255,255,0.06); color:#FFF;">
            ${tour.inquiriesCount || 0} Cotizaciones
          </span>
        </div>
      </div>
    `;
  }).join('');
}

async function selectTourForDetail(tourId) {
  adminState.selectedTourId = tourId;
  renderToursSidebar(adminState.tours);

  const container = document.getElementById('tourDetailContainer');
  if (!container) return;

  container.innerHTML = '<div style="text-align:center; padding:3rem; color:var(--admin-text-dim);">Cargando especificaciones e itinerario completo...</div>';

  try {
    const res = await apiFetch(`/tours/admin/${tourId}`);
    if (!res.ok) throw new Error('Error al cargar detalle del tour');

    const tour = await res.json();
    renderTourDetail(tour);
  } catch (err) {
    container.innerHTML = '<div style="color:#F56C6C; padding:2rem;">No se pudieron cargar los datos de la expedición.</div>';
  }
}

function renderTourDetail(tour) {
  const container = document.getElementById('tourDetailContainer');
  if (!container) return;

  const priceUsdStr = `$ ${Number(tour.priceUsd).toLocaleString('en-US', { minimumFractionDigits: 2 })} USD`;
  const pricePenStr = `S/. ${Number(tour.pricePen).toLocaleString('en-US', { minimumFractionDigits: 2 })} PEN`;

  const oxygenPercent = tour.altitudeProfile?.oxygenPercentage || 85;
  const maxAlt = tour.altitudeProfile?.maxAltitude || tour.altitudeMax || '2,430 m';
  const startAlt = tour.altitudeProfile?.startingAltitude || '3,400 m';

  container.innerHTML = `
    <!-- Hero Banner -->
    <div class="tour-detail-hero">
      <img src="${tour.mainImageUrl || 'assets/images/MachuPicchu.jpg'}" alt="${escapeHtml(tour.titleEn)}" class="tour-detail-hero-img" onerror="this.src='assets/images/MachuPicchu.jpg'">
      <div class="tour-detail-hero-overlay">
        <span class="tour-detail-subline">${escapeHtml(tour.categoryNameEn || 'Haute Couture Journey')} • ${tour.durationEn}</span>
        <h2 class="tour-detail-main-title">${escapeHtml(tour.titleEn)}</h2>
        <div style="font-size:0.8rem; color:#EAE4D5; font-style:italic;">${escapeHtml(tour.titleEs)}</div>
      </div>
    </div>

    <!-- Specs Bar -->
    <div class="tour-specs-bar">
      <div class="tour-spec-item">
        <span class="tour-spec-label">Tarifa Oficial USD</span>
        <span class="tour-spec-val" style="color:var(--admin-gold-bright); font-size:1rem;">${priceUsdStr}</span>
      </div>
      <div class="tour-spec-item">
        <span class="tour-spec-label">Tarifa Oficial PEN</span>
        <span class="tour-spec-val" style="color:var(--admin-gold);">${pricePenStr}</span>
      </div>
      <div class="tour-spec-item">
        <span class="tour-spec-label">Dificultad</span>
        <span class="tour-spec-val">${escapeHtml(tour.difficultyEn || 'Exclusive Leisure')}</span>
      </div>
      <div class="tour-spec-item">
        <span class="tour-spec-label">Punto de Partida</span>
        <span class="tour-spec-val">${escapeHtml(tour.startingPoint || 'Cusco Private Atelier')}</span>
      </div>
    </div>

    <!-- Perfil de Altitud & Oxigenación -->
    <div style="background:rgba(10,11,14,0.6); border:1px solid var(--admin-border); border-radius:2px; padding:1.25rem; margin-bottom:1.75rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
        <span style="font-family:'Montserrat', sans-serif; font-size:0.68rem; letter-spacing:0.1em; color:var(--admin-gold); text-transform:uppercase;">
          Perfil de Altitud & Protocolo de Aclimatación
        </span>
        <span style="font-size:0.75rem; color:#85CE61; font-weight:600;">
          Oxigenación Atmosférica: ~${oxygenPercent}%
        </span>
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem; font-size:0.8rem;">
        <div>
          <span style="color:var(--admin-text-dim);">Altitud de Salida:</span>
          <strong style="color:#FFF;"> ${startAlt}</strong>
        </div>
        <div>
          <span style="color:var(--admin-text-dim);">Punto Más Elevado:</span>
          <strong style="color:var(--admin-gold);"> ${maxAlt}</strong>
        </div>
        <div style="grid-column: 1 / -1; color:var(--admin-text-muted); font-size:0.75rem; border-top:1px dashed var(--admin-border-light); padding-top:0.5rem; margin-top:0.25rem;">
          ${escapeHtml(tour.altitudeProfile?.acclimatizationTip || 'Monitoreo médico privado disponible con tanques portátiles de oxígeno medicinal y té de muña andina.')}
        </div>
      </div>
    </div>

    <!-- Itinerario Día por Día -->
    <div class="panel-header" style="margin-top:2rem;">
      <h3 class="panel-title">Cronograma de Itinerario Día por Día</h3>
      <span style="font-size:0.72rem; color:var(--admin-gold);">
        ${(tour.itineraries || []).length} Días de Experiencia Exclusiva
      </span>
    </div>

    <div class="itinerary-timeline">
      ${(tour.itineraries && tour.itineraries.length > 0) ? tour.itineraries.map(day => `
        <div class="itinerary-day-card">
          <div class="itinerary-day-header">
            <span class="day-badge">Día ${day.dayNumber}</span>
            <span class="day-title">${escapeHtml(day.titleEn || day.title)}</span>
          </div>
          <p class="day-desc">${escapeHtml(day.descriptionEn || day.description)}</p>
          <div class="day-amenities">
            ${day.gourmetDiningEn ? `
              <span class="amenity-tag">
                🍽️ <strong>Gourmet:</strong> ${escapeHtml(day.gourmetDiningEn)}
              </span>
            ` : ''}
            ${day.privateTransferEn ? `
              <span class="amenity-tag">
                🚆 <strong>Transporte:</strong> ${escapeHtml(day.privateTransferEn)}
              </span>
            ` : ''}
          </div>
        </div>
      `).join('') : `
        <p style="color:var(--admin-text-dim); font-size:0.85rem;">No se han desglosado itinerarios diarios para esta expedición.</p>
      `}
    </div>

    <!-- Controles Rápidos de Tour -->
    <div class="tour-admin-toggles">
      <button type="button" class="btn-toggle-action" onclick="toggleTourActive(${tour.id})">
        ${tour.isActive ? '🔴 Desactivar Tour' : '🟢 Publicar en Catálogo'}
      </button>

      <button type="button" class="btn-toggle-action" onclick="toggleTourFeatured(${tour.id})">
        ${tour.featured ? '⭐ Quitar de Destacados' : '🌟 Marcar como Destacado'}
      </button>

      <a href="tour.html?slug=${tour.slug}" target="_blank" class="btn-table-action" style="padding:0.6rem 1rem;">
        Ver en Página de Clientes ↗
      </a>
    </div>
  `;
}

async function toggleTourActive(tourId) {
  try {
    const res = await apiFetch(`/tours/${tourId}/toggle-status`, { method: 'PATCH' });
    if (!res.ok) throw new Error('Error al cambiar visibilidad');

    showToast('Estado de catálogo actualizado.', 'success');
    await loadToursData();
  } catch (err) {
    showToast('No se pudo actualizar el estado de la expedición.', 'error');
  }
}

async function toggleTourFeatured(tourId) {
  try {
    const res = await apiFetch(`/tours/${tourId}/toggle-featured`, { method: 'PATCH' });
    if (!res.ok) throw new Error('Error al conmutar destacado');

    showToast('Estado destacado actualizado.', 'success');
    await loadToursData();
  } catch (err) {
    showToast('No se pudo cambiar el estado destacado.', 'error');
  }
}

// ============================================================================
// VISTA 4: CONCIERGE BESPOKE (SOLICITUDES PRIVADAS)
// ============================================================================
async function loadConciergeData() {
  const filter = document.getElementById('conciergeFilterSelect')?.value || 'all';

  try {
    const res = await apiFetch('/concierge');
    if (!res.ok) throw new Error('Error al consultar solicitudes de concierge');

    const data = await res.json();
    const requests = Array.isArray(data) ? data : (data.items || data.Items || []);
    adminState.conciergeRequests = requests;

    renderConciergeGrid(requests, filter);
  } catch (err) {
    console.error('Error fetching concierge inquiries:', err);
    showToast('Error al sincronizar solicitudes bespoke.', 'error');
  }
}

function renderConciergeGrid(requests, filter) {
  const container = document.getElementById('conciergeRequestsGrid');
  if (!container) return;

  const list = Array.isArray(requests) ? requests : [];
  let filtered = list;
  if (filter === 'pending') {
    filtered = list.filter(r => !r.isAddressed);
  } else if (filter === 'addressed') {
    filtered = list.filter(r => r.isAddressed);
  }

  if (filtered.length === 0) {
    container.innerHTML = '<p style="color:var(--admin-text-dim); font-size:0.8rem;">No hay solicitudes de viaje bespoke en este filtro.</p>';
    return;
  }

  container.innerHTML = filtered.map(r => {
    const dateFormatted = formatDate(r.createdAt);

    return `
      <div class="concierge-card">
        <div class="concierge-card-header">
          <div>
            <div class="concierge-guest-name">${escapeHtml(r.guestName)}</div>
            <div style="font-size:0.75rem; color:var(--admin-gold);">${escapeHtml(r.destinationFocus || 'Machu Picchu Privé')}</div>
          </div>
          <div style="text-align: right;">
            <span class="badge-tag-mini ${r.isAddressed ? 'badge-active' : 'badge-inactive'}">
              ${r.isAddressed ? '✓ Atendido' : '● Pendiente'}
            </span>
            <div class="concierge-date" style="margin-top: 4px;">${dateFormatted}</div>
          </div>
        </div>

        <div class="concierge-details-list">
          <div class="concierge-detail-row">
            <span class="concierge-detail-label">Email:</span>
            <span class="concierge-detail-val">${escapeHtml(r.email)}</span>
          </div>
          <div class="concierge-detail-row">
            <span class="concierge-detail-label">WhatsApp:</span>
            <span class="concierge-detail-val">${escapeHtml(r.whatsApp)}</span>
          </div>
          <div class="concierge-detail-row">
            <span class="concierge-detail-label">Duración Deseada:</span>
            <span class="concierge-detail-val">${escapeHtml(r.journeyDuration || 'A coordinar')}</span>
          </div>
          <div class="concierge-detail-row">
            <span class="concierge-detail-label">Viajeros:</span>
            <span class="concierge-detail-val">${r.travelersCount} persona(s)</span>
          </div>
          <div class="concierge-detail-row">
            <span class="concierge-detail-label">Presupuesto:</span>
            <span class="concierge-detail-val" style="color:var(--admin-gold);">${escapeHtml(r.budgetTier || 'Ultra-Luxury')}</span>
          </div>
        </div>

        ${r.bespokeNotes ? `
          <div class="concierge-notes-box">
            "${escapeHtml(r.bespokeNotes)}"
          </div>
        ` : ''}

        <div class="concierge-actions">
          ${r.whatsAppUrl ? `
            <a href="${r.whatsAppUrl}" target="_blank" class="btn-table-action btn-table-whatsapp" title="Chatear con el Huésped por WhatsApp">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              WhatsApp Concierge
            </a>
          ` : ''}

          <button type="button" class="btn-table-action" onclick="toggleConciergeStatus(${r.id}, ${!r.isAddressed})">
            ${r.isAddressed ? 'Marcar Pendiente' : 'Marcar Atendido'}
          </button>

          <button type="button" class="btn-table-action btn-table-delete" onclick="deleteConciergeInquiry(${r.id})" title="Descartar Solicitud">
            ✕
          </button>
        </div>
      </div>
    `;
  }).join('');
}

async function toggleConciergeStatus(id, newStatus) {
  try {
    const res = await apiFetch(`/concierge/${id}/addressed`, {
      method: 'PUT',
      body: JSON.stringify({ isAddressed: newStatus })
    });
    if (!res.ok) throw new Error('Error al actualizar');

    showToast('Estado de solicitud actualizado.', 'success');
    await Promise.all([loadConciergeData(), loadDashboardData()]);
  } catch (err) {
    showToast('No se pudo actualizar la solicitud bespoke.', 'error');
  }
}

async function deleteConciergeInquiry(id) {
  if (!confirm(`¿Desea descartar la solicitud de concierge #${id}?`)) return;

  try {
    const res = await apiFetch(`/concierge/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error al eliminar');

    showToast('Solicitud eliminada.', 'info');
    await Promise.all([loadConciergeData(), loadDashboardData()]);
  } catch (err) {
    showToast('No se pudo eliminar la solicitud.', 'error');
  }
}

// ============================================================================
// VISTA 5: ESTADOS DE PAGO, DEPÓSITOS & VOUCHERS
// ============================================================================
function updatePaymentsBanner() {
  const stats = adminState.dashboardStats;
  if (!stats) return;

  const payPaid = document.getElementById('payBannerPaid');
  const payConfirmed = document.getElementById('payBannerConfirmed');
  const payDeposit = document.getElementById('payBannerDepositPending');

  if (payPaid) {
    payPaid.textContent = formatMoney(stats.confirmedRevenueUsd, stats.confirmedRevenuePen);
  }
  if (payConfirmed) {
    const pendingDifference = Math.max(0, stats.pipelineRevenueUsd - stats.confirmedRevenueUsd);
    payConfirmed.textContent = formatMoney(pendingDifference);
  }
  if (payDeposit) {
    const depositEstimate = (stats.pipelineRevenueUsd || 0) * 0.30;
    payDeposit.textContent = formatMoney(depositEstimate);
  }

  // Poblar dropdown de selección de reservas para depósito
  populateDepositBookingsSelect();
}

function populateDepositBookingsSelect() {
  const select = document.getElementById('depositSelectBooking');
  if (!select) return;

  select.innerHTML = '<option value="">-- Seleccionar cotización existente --</option>' + 
    adminState.bookings.map(b => {
      return `<option value="${b.id}" data-usd="${b.estimatedTotalUsd}" data-pen="${b.estimatedTotalPen}" data-email="${escapeHtml(b.email)}" data-tour="${escapeHtml(b.tourTitle)}">
        #LMP-${b.id} • ${escapeHtml(b.fullName)} (${escapeHtml(b.tourTitle)}) - $${b.estimatedTotalUsd} USD
      </option>`;
    }).join('');
}

function handleSelectBookingForDeposit() {
  const select = document.getElementById('depositSelectBooking');
  const selectedOpt = select.options[select.selectedIndex];
  if (!selectedOpt || !selectedOpt.value) return;

  const usd = selectedOpt.getAttribute('data-usd');
  const email = selectedOpt.getAttribute('data-email');

  document.getElementById('depositTotalAmount').value = usd || '0';
  document.getElementById('depositGuestEmail').value = email || '';
  recalcDepositValues();
}

function recalcDepositValues() {
  const total = Number(document.getElementById('depositTotalAmount').value) || 0;
  const currency = document.getElementById('depositCurrency').value || 'USD';
  const deposit = total * 0.30;

  const totalEl = document.getElementById('calcDisplayTotal');
  const depEl = document.getElementById('calcDisplayDeposit');

  if (totalEl) totalEl.textContent = `${currency === 'USD' ? '$' : 'S/.'} ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })} ${currency}`;
  if (depEl) depEl.textContent = `${currency === 'USD' ? '$' : 'S/.'} ${deposit.toLocaleString('en-US', { minimumFractionDigits: 2 })} ${currency}`;
}

async function handleGenerateDepositPreference(event) {
  event.preventDefault();
  const select = document.getElementById('depositSelectBooking');
  const bookingId = select ? select.value : 0;
  const tourTitle = select?.options[select.selectedIndex]?.getAttribute('data-tour') || 'Luxury Andean Journey';
  const total = Number(document.getElementById('depositTotalAmount').value) || 0;
  const currency = document.getElementById('depositCurrency').value || 'USD';
  const email = document.getElementById('depositGuestEmail').value.trim();

  try {
    const res = await apiFetch('/payments/create-deposit-preference', {
      method: 'POST',
      body: JSON.stringify({
        tourId: Number(bookingId) || 1,
        tourTitle,
        totalAmount: total,
        currency,
        guestEmail: email
      })
    });

    if (!res.ok) throw new Error('Error al crear preferencia de depósito');

    const data = await res.json();
    const resultBox = document.getElementById('checkoutLinkResult');
    const prefIdEl = document.getElementById('resultPrefId');
    const urlInput = document.getElementById('resultCheckoutUrl');
    const testLink = document.getElementById('resultTestLink');

    if (prefIdEl) prefIdEl.textContent = data.preferenceId;
    if (urlInput) {
      const fullUrl = `${window.location.origin}${data.checkoutUrl}`;
      urlInput.value = fullUrl;
      if (testLink) testLink.href = fullUrl;
    }

    if (resultBox) resultBox.style.display = 'block';
    showToast(`Preferencia generada: ${data.preferenceId}`, 'success');
  } catch (err) {
    showToast('No se pudo generar la preferencia de pago.', 'error');
  }
}

function copyCheckoutUrl() {
  const urlInput = document.getElementById('resultCheckoutUrl');
  if (!urlInput) return;

  urlInput.select();
  navigator.clipboard.writeText(urlInput.value).then(() => {
    showToast('Enlace de pago copiado al portapapeles.', 'success');
  }).catch(() => {
    showToast('Enlace seleccionado para copiar.', 'info');
  });
}

// ============================================================================
// VOUCHER DE VIAJE VIP (PRINT-READY)
// ============================================================================
function openVoucherForCurrentBooking() {
  if (adminState.currentBookingDetail) {
    renderVoucherModal(adminState.currentBookingDetail);
  }
}

async function openVoucherForBookingId(id) {
  try {
    const res = await apiFetch(`/bookings/${id}`);
    if (!res.ok) throw new Error('Error');
    const booking = await res.json();
    renderVoucherModal(booking);
  } catch (err) {
    showToast('Error al generar voucher.', 'error');
  }
}

function renderVoucherModal(b) {
  document.getElementById('vouchCodeNumber').textContent = `LMP-2026-${String(b.id).padStart(4, '0')}`;
  document.getElementById('vouchGuestName').textContent = b.fullName;
  document.getElementById('vouchGuestContact').textContent = `${b.email} • ${b.phone} (${b.country || 'VIP'})`;
  document.getElementById('vouchTourTitle').textContent = b.tourTitle;
  document.getElementById('vouchTrainService').textContent = b.trainPreference || 'Belmond Hiram Bingham Signature';
  document.getElementById('vouchTravelDate').textContent = b.travelDate ? formatDate(b.travelDate) : 'Coordinado con Concierge';
  document.getElementById('vouchGuestsCount').textContent = `${b.numberOfGuests} Pasajero(s) de Alta Distinción`;

  const totalFormatted = `$ ${Number(b.estimatedTotalUsd).toLocaleString('en-US', { minimumFractionDigits: 2 })} USD`;
  const depositFormatted = `$ ${Number(b.estimatedTotalUsd * 0.30).toLocaleString('en-US', { minimumFractionDigits: 2 })} USD`;

  document.getElementById('vouchEstimatedTotal').textContent = totalFormatted;
  document.getElementById('vouchDepositAmount').textContent = depositFormatted;
  document.getElementById('vouchStatusTag').textContent = b.status;
  document.getElementById('vouchIssueDate').textContent = new Date().toLocaleDateString('es-PE');

  openAdminModal('voucherModal');
}

// ============================================================================
// HELPERS GENERALES (MODALES, TOASTS, FECHAS, FORMATOS)
// ============================================================================
function openAdminModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

function closeAdminModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
  toast.innerHTML = `<span style="font-weight:700;">${icon}</span> <span>${escapeHtml(message)}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function getStatusClass(status) {
  const s = String(status).toLowerCase();
  if (s.includes('pend')) return 'pending';
  if (s.includes('contact')) return 'contacted';
  if (s.includes('confirm')) return 'confirmed';
  if (s.includes('paid') || s.includes('paga')) return 'paid';
  if (s.includes('cancel')) return 'cancelled';
  return 'pending';
}

function formatDate(isoStr) {
  if (!isoStr) return '—';
  try {
    const d = new Date(isoStr);
    return d.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return isoStr;
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
