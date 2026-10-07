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
  currentTourDetail: null,
  tourSearch: '',
  tourDetailLang: 'es',
  
  // Solicitudes Concierge
  conciergeRequests: [],
  
  // Gestión de Usuarios & Roles
  users: [],
  editingUserId: null,

  // Cotizador Bespoke
  quotationItems: [],
  
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
  initTourImageDropzoneEvents();

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

  applyRolePermissionsUI();
}

function applyRolePermissionsUI() {
  const isEditor = adminState.currentUser?.role === 'Editor';
  const navBtnUsers = document.getElementById('navBtn-users');

  if (navBtnUsers) {
    navBtnUsers.style.display = isEditor ? 'none' : 'flex';
  }

  if (isEditor && adminState.activeView === 'users') {
    switchAdminView('dashboard');
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
  if (adminState.activeView === 'users') loadUsersData();
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
  // Proteger vista de usuarios para el rol Editor
  if (viewName === 'users' && adminState.currentUser?.role === 'Editor') {
    showToast('Acceso restringido: Se requieren privilegios de Administrador para gestionar usuarios.', 'error');
    return;
  }

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
  if (viewName === 'users') loadUsersData();
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

            <!-- Eliminar (Solo Administrator) -->
            ${adminState.currentUser?.role !== 'Editor' ? `
              <button type="button" class="btn-table-action btn-table-delete" onclick="promptDeleteBooking(${b.id}, '${escapeHtml(b.fullName)}')" title="Eliminar Cotización">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            ` : ''}
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

    const isEditor = adminState.currentUser?.role === 'Editor';
    const statusSelect = document.getElementById('modalEditStatus');
    const noteTextarea = document.getElementById('modalConciergeNote');
    const saveBtn = document.getElementById('btnSaveBookingStatus');
    const noticeEl = document.getElementById('bookingEditorRestrictedNotice');

    if (noticeEl) noticeEl.style.display = isEditor ? 'block' : 'none';
    if (statusSelect) statusSelect.disabled = isEditor;
    if (noteTextarea) noteTextarea.disabled = isEditor;
    if (saveBtn) {
      saveBtn.disabled = isEditor;
      saveBtn.style.display = isEditor ? 'none' : 'inline-flex';
    }

    openAdminModal('bookingModal');
  } catch (err) {
    showToast('Error al cargar la información del cliente.', 'error');
  }
}

async function handleSaveBookingStatus(event) {
  event.preventDefault();

  if (adminState.currentUser?.role === 'Editor') {
    showToast('Acceso restringido: El rol Editor no tiene permisos para modificar reservas.', 'error');
    return;
  }

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
  if (adminState.currentUser?.role === 'Editor') {
    showToast('Acceso restringido: El rol Editor no tiene permisos para eliminar reservas.', 'error');
    return;
  }

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
    ensureCategoriesLoaded(); // Precarga categorías en paralelo para el modal
    const res = await apiFetch('/tours/admin/all');
    if (!res.ok) throw new Error('Error al cargar tours');

    const tours = await res.json();
    adminState.tours = tours;

    const counterPill = document.getElementById('adminCatalogCounterPill');
    if (counterPill) {
      counterPill.textContent = `${tours.length} Expediciones`;
    }

    renderToursSidebar();

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

function handleTourSearchInput() {
  const input = document.getElementById('adminTourSearchInput');
  adminState.tourSearch = (input ? input.value : '').trim().toLowerCase();
  renderToursSidebar();
}

function renderToursSidebar() {
  const container = document.getElementById('toursCatalogSidebar');
  if (!container) return;

  const filtered = (adminState.tours || []).filter(t => {
    if (!adminState.tourSearch) return true;
    const term = adminState.tourSearch;
    const titleEn = (t.titleEn || t.title || '').toLowerCase();
    const titleEs = (t.titleEs || '').toLowerCase();
    const cat = (t.categoryNameEn || t.categoryName || '').toLowerCase();
    return titleEn.includes(term) || titleEs.includes(term) || cat.includes(term);
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--admin-text-dim); padding: 2.5rem 1rem; font-size: 0.78rem;">
        No se encontraron expediciones que coincidan con "${escapeHtml(adminState.tourSearch)}".
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(tour => {
    const isActiveTour = tour.id === adminState.selectedTourId;
    const priceFormatted = formatMoney(tour.priceUsd, tour.pricePen);
    const catName = escapeHtml(tour.categoryNameEn || tour.categoryName || 'Expedition');
    const title = escapeHtml(tour.titleEn || tour.title || 'Untitled Tour');
    const duration = escapeHtml(tour.durationEn || tour.duration || '');
    const imgUrl = tour.mainImageUrl || 'assets/images/MachuPicchu.jpg';

    return `
      <div class="admin-tour-card ${isActiveTour ? 'active' : ''}" onclick="selectTourForDetail(${tour.id})">
        <div class="admin-tour-card-thumb-wrap">
          <img src="${imgUrl}" alt="${title}" class="admin-tour-card-thumb" onerror="this.src='assets/images/MachuPicchu.jpg'">
          <span class="admin-tour-card-status-dot ${tour.isActive ? 'active' : 'inactive'}" title="${tour.isActive ? 'Público' : 'Oculto'}"></span>
        </div>
        <div class="admin-tour-card-body">
          <div class="admin-tour-card-header">
            <span class="admin-tour-card-cat">${catName}</span>
            <span class="admin-tour-card-duration">${duration}</span>
          </div>
          <div class="admin-tour-card-title">${title}</div>
          <div class="admin-tour-card-price">Desde ${priceFormatted}</div>
          <div class="admin-tour-card-badges">
            <span class="badge-tag-mini ${tour.isActive ? 'badge-active' : 'badge-inactive'}">
              ${tour.isActive ? 'Activo' : 'Oculto'}
            </span>
            ${tour.featured ? '<span class="badge-tag-mini badge-featured">★ Destacado</span>' : ''}
            <span class="badge-tag-mini badge-inquiries">
              ${tour.inquiriesCount || 0} Cotizaciones
            </span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

async function selectTourForDetail(tourId) {
  adminState.selectedTourId = tourId;
  renderToursSidebar();

  const container = document.getElementById('tourDetailContainer');
  if (!container) return;

  container.innerHTML = `
    <div style="text-align:center; padding:5rem 2rem; color:var(--admin-text-dim);">
      <div style="display:inline-block; width:28px; height:28px; border:2px solid var(--admin-border); border-top-color:var(--admin-gold); border-radius:50%; animation:spin 0.8s linear infinite; margin-bottom:1rem;"></div>
      <div>Cargando expediente técnico e itinerario de alta costura...</div>
    </div>
  `;

  try {
    const res = await apiFetch(`/tours/admin/${tourId}`);
    if (!res.ok) throw new Error('Error al cargar detalle del tour');

    const tour = await res.json();
    adminState.currentTourDetail = tour;
    renderTourDetail(tour);
  } catch (err) {
    container.innerHTML = '<div style="color:#F56C6C; padding:3rem; text-align:center;">No se pudieron cargar los datos de la expedición.</div>';
  }
}

function setTourDetailLang(lang) {
  adminState.tourDetailLang = lang;
  if (adminState.currentTourDetail) {
    renderTourDetail(adminState.currentTourDetail);
  }
}

function renderTourDetail(tour) {
  const container = document.getElementById('tourDetailContainer');
  if (!container) return;

  const isEs = adminState.tourDetailLang === 'es';
  const title = isEs ? (tour.titleEs || tour.titleEn) : (tour.titleEn || tour.titleEs);
  const altTitle = isEs ? tour.titleEn : tour.titleEs;
  const subtitle = isEs ? (tour.subtitleEs || tour.subtitleEn) : (tour.subtitleEn || tour.subtitleEs);
  const description = isEs ? (tour.descriptionEs || tour.descriptionEn) : (tour.descriptionEn || tour.descriptionEs);
  const duration = isEs ? (tour.durationEs || tour.durationEn) : (tour.durationEn || tour.durationEs);
  const difficulty = isEs ? (tour.difficultyEs || tour.difficultyEn) : (tour.difficultyEn || tour.difficultyEs);
  const categoryName = isEs ? (tour.categoryNameEs || tour.categoryNameEn) : (tour.categoryNameEn || tour.categoryNameEs);

  const priceUsdStr = `$ ${Number(tour.priceUsd).toLocaleString('en-US', { minimumFractionDigits: 2 })} USD`;
  const pricePenStr = `S/. ${Number(tour.pricePen).toLocaleString('en-US', { minimumFractionDigits: 2 })} PEN`;

  // Parse Altitude Profile JSON safely
  let altProfile = {};
  if (tour.altitudeProfileJson && typeof tour.altitudeProfileJson === 'string') {
    try {
      altProfile = JSON.parse(tour.altitudeProfileJson);
    } catch (e) {
      altProfile = {};
    }
  } else if (tour.altitudeProfile && typeof tour.altitudeProfile === 'object') {
    altProfile = tour.altitudeProfile;
  }

  const oxygenPercent = altProfile.oxygenPercentage || 85;
  const maxAlt = altProfile.maxAltitude || tour.altitudeMax || '2,430 m / 7,972 ft';
  const startAlt = altProfile.startingAltitude || '3,400 m / 11,152 ft';
  const sleepAlt = altProfile.sleepingAltitude || '2,040 m / 6,692 ft';
  const acclimatizationTip = isEs
    ? (altProfile.tipEs || altProfile.tipEn || 'Monitoreo médico privado disponible con tanques portátiles de oxígeno medicinal y té de muña andina.')
    : (altProfile.tipEn || altProfile.tipEs || 'Private medical monitoring with portable oxygen tanks and Andean muña tea available 24/7.');

  const highlightsList = (isEs ? (tour.highlightsEs || tour.highlightsEn) : (tour.highlightsEn || tour.highlightsEs)) || [];
  const includedList = (isEs ? (tour.includedEs || tour.includedEn) : (tour.includedEn || tour.includedEs)) || [];
  const notIncludedList = (isEs ? (tour.notIncludedEs || tour.notIncludedEn) : (tour.notIncludedEn || tour.notIncludedEs)) || [];
  const itineraries = tour.itineraries || [];

  container.innerHTML = `
    <!-- Top Bar del Dossier -->
    <div class="admin-dossier-topbar">
      <div class="admin-dossier-ref">
        <span class="dossier-badge-id">#EXP-${tour.id}</span>
        <span class="dossier-badge-slug">${escapeHtml(tour.slug)}</span>
        ${tour.styleTag ? `<span class="dossier-badge-style">✨ ${escapeHtml(tour.styleTag)}</span>` : ''}
      </div>

      <div class="admin-dossier-actions">
        <!-- Selector de Idioma de Ficha -->
        <div class="admin-dossier-lang-toggle">
          <button type="button" class="btn-dossier-lang ${isEs ? 'active' : ''}" onclick="setTourDetailLang('es')">ES Español</button>
          <button type="button" class="btn-dossier-lang ${!isEs ? 'active' : ''}" onclick="setTourDetailLang('en')">EN English</button>
        </div>

        <button type="button" class="btn-dossier-toggle ${tour.isActive ? 'is-active' : 'is-inactive'}" onclick="toggleTourActive(${tour.id})">
          <span class="toggle-dot"></span>
          ${tour.isActive ? 'Publicado' : 'Oculto'}
        </button>

        <button type="button" class="btn-dossier-toggle ${tour.featured ? 'is-featured' : ''}" onclick="toggleTourFeatured(${tour.id})">
          ${tour.featured ? '★ Destacado' : '☆ Marcar Destacado'}
        </button>

        <button type="button" class="btn-dossier-action btn-dossier-edit" onclick="openTourEditModal(${tour.id})" title="Editar especificaciones e itinerario completo">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          Editar Tour
        </button>

        <button type="button" class="btn-dossier-action btn-dossier-delete" onclick="promptDeleteTour(${tour.id}, '${escapeHtml(title).replace(/'/g, "\\'")}')" title="Eliminar o desactivar expedición">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          Eliminar
        </button>

        <a href="tour.html?slug=${tour.slug}" target="_blank" class="btn-dossier-preview" title="Abrir ficha pública en nueva pestaña">
          Ver en Web ↗
        </a>
      </div>
    </div>

    <!-- Hero Banner Panorámico -->
    <div class="admin-dossier-hero tour-detail-hero">
      <img src="${tour.mainImageUrl || 'assets/images/MachuPicchu.jpg'}" alt="${escapeHtml(title)}" class="admin-dossier-hero-img" onerror="this.src='assets/images/MachuPicchu.jpg'">
      <div class="admin-dossier-hero-overlay">
        <div class="admin-dossier-hero-pill-row">
          <span class="admin-dossier-cat-pill">${escapeHtml(categoryName || 'Haute Couture Journey')}</span>
          <span class="admin-dossier-duration-pill">⏱️ ${escapeHtml(duration)}</span>
          <span class="admin-dossier-inquiries-pill">💼 ${tour.inquiriesCount || 0} Cotizaciones VIP</span>
        </div>
        <h2 class="admin-dossier-title tour-detail-main-title">${escapeHtml(title)}</h2>
        <div class="admin-dossier-subtitle">${escapeHtml(subtitle || altTitle || '')}</div>
      </div>
    </div>

    <!-- Tarjetas de Especificaciones Comerciales (5 KPIs) -->
    <div class="admin-dossier-specs-grid tour-specs-bar">
      <div class="admin-spec-card tour-spec-item">
        <span class="admin-spec-label tour-spec-label">Tarifa Oficial USD</span>
        <span class="admin-spec-num gold-bright">${priceUsdStr}</span>
        <span class="admin-spec-sub">Base por pasajero</span>
      </div>
      <div class="admin-spec-card tour-spec-item">
        <span class="admin-spec-label tour-spec-label">Tarifa Oficial PEN</span>
        <span class="admin-spec-num gold-regular">${pricePenStr}</span>
        <span class="admin-spec-sub">TC Aprox S/. 3.80</span>
      </div>
      <div class="admin-spec-card tour-spec-item">
        <span class="admin-spec-label tour-spec-label">Duración</span>
        <span class="admin-spec-val">${escapeHtml(duration)}</span>
        <span class="admin-spec-sub">${tour.durationDays || 1} Día(s) de Expedición</span>
      </div>
      <div class="admin-spec-card tour-spec-item">
        <span class="admin-spec-label tour-spec-label">Nivel de Confort</span>
        <span class="admin-spec-val">${escapeHtml(difficulty)}</span>
        <span class="admin-spec-sub">Servicio Concierge Privado</span>
      </div>
      <div class="admin-spec-card tour-spec-item">
        <span class="admin-spec-label tour-spec-label">Punto de Salida</span>
        <span class="admin-spec-val tour-spec-val">${escapeHtml(tour.startingPoint || 'Cusco Private Atelier')}</span>
        <span class="admin-spec-sub">Pick-up exclusivo</span>
      </div>
    </div>

    <!-- Narrativa & Manifiesto de la Expedición -->
    <div class="admin-dossier-narrative-card">
      <div class="admin-dossier-section-kicker">MANIFIESTO DE LA EXPERIENCIA</div>
      <p class="admin-dossier-narrative-text">${escapeHtml(description || 'Sin descripción registrada.')}</p>
    </div>

    <!-- Perfil Altimétrico Andino & Monitoreo Médico -->
    <div class="admin-altitude-command-center">
      <div class="altitude-header-row">
        <div class="altitude-title-wrap">
          <span class="altitude-kicker">PERFIL ALTIMÉTRICO ANDINO & MONITOREO MÉDICO</span>
          <h4 class="altitude-main-heading">Gradiente de Altitud & Protocolo de Oxigenación</h4>
        </div>
        <div class="altitude-oxygen-gauge">
          <span class="oxygen-val-text">Oxigenación Atmosférica: <strong>~${oxygenPercent}%</strong></span>
          <div class="oxygen-bar-track">
            <div class="oxygen-bar-fill" style="width: ${oxygenPercent}%;"></div>
          </div>
        </div>
      </div>

      <div class="altitude-metrics-grid">
        <div class="altitude-metric-item">
          <span class="alt-metric-icon">🛫</span>
          <div>
            <span class="alt-metric-label">Altitud de Salida</span>
            <strong class="alt-metric-val">${startAlt}</strong>
            <span class="alt-metric-place">Cusco Private Atelier</span>
          </div>
        </div>
        <div class="altitude-metric-item">
          <span class="alt-metric-icon">🌿</span>
          <div>
            <span class="alt-metric-label">Descanso / Aclimatación</span>
            <strong class="alt-metric-val">${sleepAlt}</strong>
            <span class="alt-metric-place">Valle Sagrado / Aguas Calientes</span>
          </div>
        </div>
        <div class="altitude-metric-item">
          <span class="alt-metric-icon">🏔️</span>
          <div>
            <span class="alt-metric-label">Punto Más Elevado</span>
            <strong class="alt-metric-val gold-bright tour-spec-val">${maxAlt}</strong>
            <span class="alt-metric-place">Ciudadela Machu Picchu</span>
          </div>
        </div>
      </div>

      <div class="altitude-protocol-note">
        <div class="protocol-icon">🩺</div>
        <div class="protocol-text">
          <strong>Protocolo Médico Preventivo:</strong> ${escapeHtml(acclimatizationTip)}
        </div>
      </div>
    </div>

    <!-- Puntos Culminantes & Servicios Incluidos (2 Columnas) -->
    <div class="admin-dossier-two-col">
      <div class="admin-dossier-list-card">
        <div class="dossier-list-header">
          <span class="dossier-list-kicker">PUNTOS CULMINANTES</span>
          <h4 class="dossier-list-title">Momentos Clave & Highlights</h4>
        </div>
        <ul class="admin-dossier-ul">
          ${highlightsList.length > 0 ? highlightsList.map(h => `
            <li><span class="bullet-gold">✦</span> <span>${escapeHtml(h)}</span></li>
          `).join('') : '<li style="color:var(--admin-text-dim);">Sin highlights especificados.</li>'}
        </ul>
      </div>

      <div class="admin-dossier-list-card">
        <div class="dossier-list-header">
          <span class="dossier-list-kicker">SERVICIOS INTEGRADOS</span>
          <h4 class="dossier-list-title">Inclusiones de Ultra-Lujo</h4>
        </div>
        <ul class="admin-dossier-ul">
          ${includedList.length > 0 ? includedList.map(inc => `
            <li><span class="bullet-check">✓</span> <span>${escapeHtml(inc)}</span></li>
          `).join('') : '<li style="color:var(--admin-text-dim);">Sin inclusiones especificadas.</li>'}
        </ul>
        ${notIncludedList.length > 0 ? `
          <div class="admin-dossier-exclusions">
            <span class="exclusions-label">No incluido (A discreción del huésped):</span>
            <p class="exclusions-text">${notIncludedList.map(n => escapeHtml(n)).join(' • ')}</p>
          </div>
        ` : ''}
      </div>
    </div>

    <!-- Cronograma de Itinerario Día por Día -->
    <div class="admin-itinerary-section">
      <div class="itinerary-section-header">
        <div>
          <span class="itinerary-section-kicker">PROGRAMACIÓN DÍA POR DÍA</span>
          <h3 class="itinerary-section-title">Itinerario Técnico & Trazabilidad de Paradas</h3>
        </div>
        <span class="itinerary-days-count-pill">${itineraries.length} Días de Experiencia</span>
      </div>

      <div class="admin-itinerary-timeline itinerary-timeline">
        ${itineraries.length > 0 ? itineraries.map((day, idx) => {
          const dayTitle = isEs ? (day.titleEs || day.titleEn || day.title) : (day.titleEn || day.titleEs || day.title);
          const dayDesc = isEs ? (day.descriptionEs || day.descriptionEn || day.description) : (day.descriptionEn || day.descriptionEs || day.description);
          const gourmet = isEs ? (day.gourmetDiningEs || day.gourmetDiningEn || day.gourmetDining) : (day.gourmetDiningEn || day.gourmetDiningEs || day.gourmetDining);
          const transfer = isEs ? (day.privateTransferEs || day.privateTransferEn || day.privateTransfer) : (day.privateTransferEn || day.privateTransferEs || day.privateTransfer);

          return `
            <div class="admin-itinerary-day-card itinerary-day-card">
              <div class="admin-day-sidebar">
                <span class="admin-day-number day-badge">DÍA ${String(day.dayNumber || (idx + 1)).padStart(2, '0')}</span>
                <span class="admin-day-connector"></span>
              </div>
              <div class="admin-day-content">
                <h4 class="admin-day-heading day-title">${escapeHtml(dayTitle)}</h4>
                <p class="admin-day-narrative day-desc">${escapeHtml(dayDesc)}</p>

                <div class="admin-day-amenities-row day-amenities">
                  ${gourmet ? `
                    <div class="admin-amenity-chip dining amenity-tag">
                      <span class="chip-icon">🍽️</span>
                      <div>
                        <span class="chip-label">Gastronomía:</span>
                        <span class="chip-val">${escapeHtml(gourmet)}</span>
                      </div>
                    </div>
                  ` : ''}
                  ${transfer ? `
                    <div class="admin-amenity-chip transfer amenity-tag">
                      <span class="chip-icon">🚆</span>
                      <div>
                        <span class="chip-label">Transporte:</span>
                        <span class="chip-val">${escapeHtml(transfer)}</span>
                      </div>
                    </div>
                  ` : ''}
                </div>
              </div>
            </div>
          `;
        }).join('') : `
          <div class="admin-itinerary-empty">
            No se han registrado días de itinerario para esta expedición.
          </div>
        `}
      </div>
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
// CRUD TOURS & ITINERARIOS: CREACIÓN, EDICIÓN Y ELIMINACIÓN HAUTE COUTURE
// ============================================================================

async function ensureCategoriesLoaded() {
  if (adminState.categories && adminState.categories.length > 0) {
    return adminState.categories;
  }
  try {
    const res = await apiFetch('/categories');
    if (res.ok) {
      adminState.categories = await res.json();
    }
  } catch (err) {
    console.error('Error fetching categories for tour editor:', err);
  }
  return adminState.categories || [];
}

function populateCategoriesSelect(selectedId) {
  const select = document.getElementById('tourFormCategory');
  if (!select) return;
  const cats = adminState.categories || [];
  select.innerHTML = cats.map(c => `
    <option value="${c.id}" ${Number(selectedId) === Number(c.id) ? 'selected' : ''}>
      ${escapeHtml(c.name || c.nameEn || 'Categoría #' + c.id)}
    </option>
  `).join('');
}

function switchTourEditorTab(tabKey) {
  const tabKeys = ['general', 'pricing-alt', 'content', 'itinerary'];
  tabKeys.forEach(key => {
    const btn = document.getElementById(`tabBtn-${key}`);
    const pane = document.getElementById(`pane-tab-${key}`);
    if (btn) btn.classList.toggle('active', key === tabKey);
    if (pane) {
      if (key === tabKey) {
        pane.style.display = 'block';
        pane.classList.add('active');
      } else {
        pane.style.display = 'none';
        pane.classList.remove('active');
      }
    }
  });
}

function handleUsdPriceChange() {
  const usdInput = document.getElementById('tourFormPriceUsd');
  const penInput = document.getElementById('tourFormPricePen');
  if (!usdInput || !penInput) return;
  const usd = parseFloat(usdInput.value);
  if (!isNaN(usd) && usd > 0 && (!penInput.value || parseFloat(penInput.value) === 0)) {
    penInput.value = (Math.round(usd * 3.80)).toFixed(2);
  }
}

function syncDurationTextFromDays() {
  const daysInput = document.getElementById('tourFormDurationDays');
  const esInput = document.getElementById('tourFormDurationEs');
  const enInput = document.getElementById('tourFormDurationEn');
  if (!daysInput || !esInput || !enInput) return;

  const days = parseInt(daysInput.value, 10) || 1;
  const nights = Math.max(0, days - 1);
  if (days === 1) {
    if (!esInput.value || esInput.value.includes('Día')) esInput.value = 'Día Completo';
    if (!enInput.value || enInput.value.includes('Day')) enInput.value = 'Full Day';
  } else {
    esInput.value = `${days} Días / ${nights} Noche${nights > 1 ? 's' : ''}`;
    enInput.value = `${days} Days / ${nights} Night${nights > 1 ? 's' : ''}`;
  }
}

// ============================================================================
// CARGA Y COMPRESIÓN DE FOTOGRAFÍAS EN ALTA RESOLUCIÓN (CLIENT-SIDE WEBP HD)
// ============================================================================

function triggerMainImageUpload() {
  const fileInput = document.getElementById('tourFormImageFileInput');
  if (fileInput) fileInput.click();
}

function handleTourImageFileSelected(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  // Reset input value so re-selecting the same file triggers change
  event.target.value = '';
  processAndUploadTourImage(file);
}

function clearMainImage() {
  const input = document.getElementById('tourFormMainImage');
  const wrap = document.getElementById('tourImagePreviewWrap');
  const img = document.getElementById('tourImagePreview');
  const specs = document.getElementById('tourImagePreviewSpecs');
  const urlTxt = document.getElementById('tourImagePreviewUrl');

  if (input) input.value = '';
  if (img) img.src = '';
  if (wrap) wrap.style.display = 'none';
  if (specs) specs.textContent = 'WebP • HD Optimizado';
  if (urlTxt) urlTxt.textContent = '';
  showToast('Fotografía removida del formulario', 'info');
}

function formatFileSize(bytes) {
  if (!bytes || bytes <= 0) return '0 B';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

/**
 * Comprime inteligentemente imágenes pesadas (cámaras/smartphones 10MB-25MB+)
 * Escalando proporcionalmente a máximo 2048px en su lado mayor y exportando
 * a WebP con calidad 0.85 (alta fidelidad visual y 90-97% menor peso).
 */
function compressImageFile(file, maxWidth = 2048, maxHeight = 1365, quality = 0.85) {
  return new Promise((resolve, reject) => {
    if (!file.type || !file.type.startsWith('image/')) {
      return reject(new Error('El archivo seleccionado no es una imagen válida'));
    }

    const originalSize = file.size;
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('No se pudo leer el archivo'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Error al decodificar la imagen'));
      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        // Calcular escala preservando proporción exacta
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d', { alpha: false });

        if (!ctx) {
          return reject(new Error('Canvas 2D context no disponible'));
        }

        // Renderizado suavizado de alta calidad
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Intentar compresión a WebP (con fallback a JPEG si el browser no soporta WebP)
        const mimeType = 'image/webp';
        canvas.toBlob((blob) => {
          if (!blob) {
            // Fallback a JPEG
            canvas.toBlob((fallbackBlob) => {
              if (!fallbackBlob) {
                return reject(new Error('Error al generar blob comprimido'));
              }
              const dataUrl = canvas.toDataURL('image/jpeg', quality);
              resolve({
                blob: fallbackBlob,
                dataUrl,
                width,
                height,
                format: 'jpeg',
                originalSize,
                compressedSize: fallbackBlob.size
              });
            }, 'image/jpeg', quality);
            return;
          }

          const dataUrl = canvas.toDataURL(mimeType, quality);
          resolve({
            blob,
            dataUrl,
            width,
            height,
            format: 'webp',
            originalSize,
            compressedSize: blob.size
          });
        }, mimeType, quality);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Procesa la imagen seleccionada, comprime y sube a /api/media/upload
 */
async function processAndUploadTourImage(file) {
  const statusEl = document.getElementById('tourImageCompressionStatus');
  const infoText = document.getElementById('compressionInfoText');
  const mainInput = document.getElementById('tourFormMainImage');
  const previewWrap = document.getElementById('tourImagePreviewWrap');
  const previewImg = document.getElementById('tourImagePreview');
  const previewSpecs = document.getElementById('tourImagePreviewSpecs');
  const previewUrl = document.getElementById('tourImagePreviewUrl');

  try {
    if (statusEl) {
      statusEl.style.display = 'flex';
      if (infoText) {
        infoText.innerHTML = `<strong>Optimizando imagen (${formatFileSize(file.size)})...</strong><br><span style="color:var(--admin-gold); font-size:0.7rem;">Escalando a 2048px WebP Ultra-HD sin pérdida perceptible de calidad...</span>`;
      }
    }

    const startTime = performance.now();
    const result = await compressImageFile(file, 2048, 1365, 0.85);
    const duration = ((performance.now() - startTime) / 1000).toFixed(2);

    const savingPercent = Math.max(0, Math.round(((result.originalSize - result.compressedSize) / result.originalSize) * 100));

    if (infoText) {
      infoText.innerHTML = `<strong>Comprimido con éxito (${duration}s)</strong><br><span style="color:#85CE61; font-size:0.7rem;">De ${formatFileSize(result.originalSize)} a ${formatFileSize(result.compressedSize)} (${savingPercent}% de ahorro). Transmitiendo al servidor...</span>`;
    }

    // Subir al endpoint /api/media/upload
    const ext = result.format === 'webp' ? 'webp' : 'jpg';
    const uploadFileName = `${file.name.replace(/\.[^/.]+$/, "")}.${ext}`;

    const formData = new FormData();
    formData.append('file', result.blob, uploadFileName);

    let uploadRes = await fetch('/api/media/upload', {
      method: 'POST',
      headers: adminState.token ? { 'Authorization': `Bearer ${adminState.token}` } : {},
      body: formData
    });

    // Si fallara multipart, fallback a upload-base64
    if (!uploadRes.ok) {
      uploadRes = await fetch('/api/media/upload-base64', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(adminState.token ? { 'Authorization': `Bearer ${adminState.token}` } : {})
        },
        body: JSON.stringify({
          fileName: uploadFileName,
          base64Data: result.dataUrl
        })
      });
    }

    if (!uploadRes.ok) {
      const errData = await uploadRes.json().catch(() => ({}));
      throw new Error(errData.message || 'Error en la subida al servidor');
    }

    const uploaded = await uploadRes.json();
    const serverUrl = uploaded.url;

    // Actualizar campo del formulario
    if (mainInput) {
      mainInput.value = serverUrl;
    }

    // Actualizar preview visual
    if (previewImg) {
      previewImg.src = serverUrl;
    }
    if (previewSpecs) {
      previewSpecs.textContent = `${result.format.toUpperCase()} • ${result.width}x${result.height} • ${formatFileSize(result.compressedSize)} (-${savingPercent}%)`;
    }
    if (previewUrl) {
      previewUrl.textContent = serverUrl;
      previewUrl.title = serverUrl;
    }
    if (previewWrap) {
      previewWrap.style.display = 'flex';
    }

    showToast(`Fotografía procesada y guardada con éxito (${savingPercent}% optimizada)`, 'success');
  } catch (error) {
    console.error('Error al procesar/subir imagen:', error);
    showToast(`Error al subir imagen: ${error.message}`, 'error');
  } finally {
    if (statusEl) {
      setTimeout(() => {
        statusEl.style.display = 'none';
      }, 1500);
    }
  }
}

function previewTourMainImage() {
  const input = document.getElementById('tourFormMainImage');
  const wrap = document.getElementById('tourImagePreviewWrap');
  const img = document.getElementById('tourImagePreview');
  const specs = document.getElementById('tourImagePreviewSpecs');
  const urlTxt = document.getElementById('tourImagePreviewUrl');
  if (!input || !wrap || !img) return;

  const url = input.value.trim();
  if (url) {
    img.src = url;
    img.onerror = () => { wrap.style.display = 'none'; };
    img.onload = () => {
      wrap.style.display = 'flex';
      if (specs && (!specs.textContent || specs.textContent === 'WebP • HD Optimizado')) {
        specs.textContent = `${img.naturalWidth}x${img.naturalHeight} px`;
      }
      if (urlTxt) {
        urlTxt.textContent = url;
        urlTxt.title = url;
      }
    };
  } else {
    wrap.style.display = 'none';
  }
}

function initTourImageDropzoneEvents() {
  const dropzone = document.getElementById('tourMainImageDropzone');
  if (!dropzone) return;

  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('drag-active');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('drag-active');
    }, false);
  });

  dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt && dt.files;
    if (files && files.length > 0) {
      processAndUploadTourImage(files[0]);
    }
  }, false);
}

function reindexItineraryDays() {
  const container = document.getElementById('itineraryDaysContainer');
  if (!container) return;
  const cards = container.querySelectorAll('.itinerary-editor-card');
  cards.forEach((card, index) => {
    const dayNum = index + 1;
    card.setAttribute('data-day', dayNum);
    const badge = card.querySelector('.day-number-badge');
    if (badge) badge.textContent = `Día ${dayNum}`;
  });

  const daysInput = document.getElementById('tourFormDurationDays');
  if (daysInput && cards.length > 0) {
    daysInput.value = cards.length;
    syncDurationTextFromDays();
  }
}

function addItineraryDayRow(item = {}) {
  const container = document.getElementById('itineraryDaysContainer');
  if (!container) return;

  const currentCount = container.querySelectorAll('.itinerary-editor-card').length;
  const dayNum = item.dayNumber || (currentCount + 1);

  const card = document.createElement('div');
  card.className = 'itinerary-editor-card';
  card.setAttribute('data-day', dayNum);
  card.innerHTML = `
    <div class="itinerary-editor-card-header">
      <div>
        <span class="day-number-badge">Día ${dayNum}</span>
        <span class="day-number-label">Jornada Andina</span>
      </div>
      <button type="button" class="btn-delete-day" onclick="removeItineraryDayRow(this)" title="Eliminar este día de itinerario">
        🗑️ Eliminar Día
      </button>
    </div>

    <div class="form-grid-2col">
      <div class="modal-field">
        <label class="modal-label">Título del Día (Español)</label>
        <input type="text" class="admin-form-input input-day-title-es" value="${escapeHtml(item.titleEs || '')}" placeholder="Ej: Abordaje de Leyenda y Atardecer en la Ciudadela">
      </div>
      <div class="modal-field">
        <label class="modal-label">Day Title (English)</label>
        <input type="text" class="admin-form-input input-day-title-en" value="${escapeHtml(item.titleEn || '')}" placeholder="Ej: Boarding the Legend & Sunset at the Citadel">
      </div>
    </div>

    <div class="form-grid-2col">
      <div class="modal-field">
        <label class="modal-label">Descripción de la Jornada (Español)</label>
        <textarea class="admin-form-textarea input-day-desc-es" rows="2" placeholder="Narrativa de actividades, hitos y paisajes en español...">${escapeHtml(item.descriptionEs || '')}</textarea>
      </div>
      <div class="modal-field">
        <label class="modal-label">Day Description (English)</label>
        <textarea class="admin-form-textarea input-day-desc-en" rows="2" placeholder="Chronological day narrative and exclusive highlights in English...">${escapeHtml(item.descriptionEn || '')}</textarea>
      </div>
    </div>

    <div class="form-grid-2col">
      <div class="modal-field">
        <label class="modal-label">Carta Gastronómica Gourmet (ES)</label>
        <input type="text" class="admin-form-input input-day-dining-es" value="${escapeHtml(item.gourmetDiningEs || item.gourmetDining || '')}" placeholder="Ej: Brunch de 4 Tiempos con Champaña y Té de la Tarde">
      </div>
      <div class="modal-field">
        <label class="modal-label">Gourmet Dining (EN)</label>
        <input type="text" class="admin-form-input input-day-dining-en" value="${escapeHtml(item.gourmetDiningEn || item.gourmetDining || '')}" placeholder="Ej: 4-Course Champagne Brunch & Belmond Afternoon Tea">
      </div>
    </div>

    <div class="form-grid-2col">
      <div class="modal-field">
        <label class="modal-label">Traslado Privado Concierge (ES)</label>
        <input type="text" class="admin-form-input input-day-transfer-es" value="${escapeHtml(item.privateTransferEs || item.privateTransfer || '')}" placeholder="Ej: Sedán ejecutivo privado a estación + Bus VIP al santuario">
      </div>
      <div class="modal-field">
        <label class="modal-label">Private Transfer (EN)</label>
        <input type="text" class="admin-form-input input-day-transfer-en" value="${escapeHtml(item.privateTransferEn || item.privateTransfer || '')}" placeholder="Ej: Private executive transfer to station + VIP citadel shuttle">
      </div>
    </div>
  `;

  container.appendChild(card);
  reindexItineraryDays();
}

function removeItineraryDayRow(btn) {
  const container = document.getElementById('itineraryDaysContainer');
  if (!container) return;
  const cards = container.querySelectorAll('.itinerary-editor-card');
  if (cards.length <= 1) {
    showToast('Toda expedición debe contener al menos 1 día de itinerario.', 'info');
    return;
  }
  const card = btn.closest('.itinerary-editor-card');
  if (card) {
    card.remove();
    reindexItineraryDays();
  }
}

async function openTourCreateModal() {
  await ensureCategoriesLoaded();
  populateCategoriesSelect(1);

  document.getElementById('tourFormId').value = '';
  document.getElementById('tourModalKicker').textContent = 'NUEVA EXPEDICIÓN • ALTA COSTURA';
  document.getElementById('tourModalTitle').textContent = 'Crear Nueva Expedición Privada';
  document.getElementById('tourModalSubtitle').textContent = 'Defina las especificaciones, perfil altimétrico e itinerario de una nueva travesía andina.';
  document.getElementById('btnSaveTourSubmit').textContent = '💾 Registrar Expedición';

  // Limpiar campos
  document.getElementById('tourFormTitleEs').value = '';
  document.getElementById('tourFormTitleEn').value = '';
  document.getElementById('tourFormSubtitleEs').value = '';
  document.getElementById('tourFormSubtitleEn').value = '';
  document.getElementById('tourFormSlug').value = '';
  document.getElementById('tourFormStyleTag').value = 'Signature Andean Expedition';
  document.getElementById('tourFormDifficultyEs').value = 'Placentero y Exclusivo';
  document.getElementById('tourFormDifficultyEn').value = 'Leisure & Refined';
  document.getElementById('tourFormDisplayOrder').value = (adminState.tours ? adminState.tours.length + 1 : 1);
  document.getElementById('tourFormMainImage').value = 'assets/images/MachuPicchu.jpg';
  document.getElementById('tourFormIsActive').checked = true;
  document.getElementById('tourFormFeatured').checked = false;

  document.getElementById('tourFormPriceUsd').value = '1850.00';
  document.getElementById('tourFormPricePen').value = '7030.00';
  document.getElementById('tourFormDurationDays').value = '2';
  document.getElementById('tourFormDurationEs').value = '2 Días / 1 Noche';
  document.getElementById('tourFormDurationEn').value = '2 Days / 1 Night';
  document.getElementById('tourFormStartingPoint').value = 'Cusco / Valle Sagrado';
  document.getElementById('tourFormAltitudeMax').value = '2,430 m / 7,972 ft';

  document.getElementById('tourFormAltStart').value = '3,400 m / 11,152 ft';
  document.getElementById('tourFormAltSleep').value = '2,430 m / 7,972 ft';
  document.getElementById('tourFormOxygenPercent').value = '85';
  document.getElementById('tourFormTipEs').value = 'Monitoreo médico privado disponible con tanques portátiles de oxígeno medicinal y té de muña andina.';
  document.getElementById('tourFormTipEn').value = 'Private medical monitoring with portable oxygen tanks and Andean muña tea available 24/7.';

  document.getElementById('tourFormDescEs').value = '';
  document.getElementById('tourFormDescEn').value = '';
  document.getElementById('tourFormHighlightsEs').value = '';
  document.getElementById('tourFormHighlightsEn').value = '';
  document.getElementById('tourFormIncludedEs').value = '';
  document.getElementById('tourFormIncludedEn').value = '';
  document.getElementById('tourFormNotIncludedEs').value = '';
  document.getElementById('tourFormNotIncludedEn').value = '';

  const container = document.getElementById('itineraryDaysContainer');
  if (container) {
    container.innerHTML = '';
    addItineraryDayRow({
      dayNumber: 1,
      titleEs: 'Bienvenida y Acogida Privada en los Andes',
      titleEn: 'Private Andean Welcome & Sacred Valley Arrival',
      descriptionEs: 'Recepción privada por su Concierge en Cusco o Valle Sagrado.',
      descriptionEn: 'Private arrival greeting by your personal Andean Concierge.',
      gourmetDiningEs: 'Almuerzo gourmet andino de bienvenida',
      gourmetDiningEn: 'Welcome gourmet Andean lunch',
      privateTransferEs: 'Sedán ejecutivo privado Mercedes-Benz',
      privateTransferEn: 'Private luxury executive chauffeur'
    });
  }

  previewTourMainImage();
  switchTourEditorTab('general');
  openAdminModal('tourEditorModal');
}

async function openTourEditModal(tourId) {
  try {
    showToast('Cargando expediente completo para edición...', 'info');
    await ensureCategoriesLoaded();

    const res = await apiFetch(`/tours/admin/${tourId}`);
    if (!res.ok) throw new Error('No se pudo obtener el expediente técnico');
    const tour = await res.json();

    document.getElementById('tourFormId').value = tour.id;
    populateCategoriesSelect(tour.categoryId);

    document.getElementById('tourModalKicker').textContent = `EXPEDIENTE #EXP-${tour.id} • CURADURÍA`;
    document.getElementById('tourModalTitle').textContent = `Modificar: ${tour.titleEs || tour.titleEn}`;
    document.getElementById('tourModalSubtitle').textContent = 'Actualice en tiempo real especificaciones técnicas, cartas de menú y cronograma día por día.';
    document.getElementById('btnSaveTourSubmit').textContent = '💾 Actualizar Expedición';

    // Rellenar datos
    document.getElementById('tourFormTitleEs').value = tour.titleEs || '';
    document.getElementById('tourFormTitleEn').value = tour.titleEn || '';
    document.getElementById('tourFormSubtitleEs').value = tour.subtitleEs || '';
    document.getElementById('tourFormSubtitleEn').value = tour.subtitleEn || '';
    document.getElementById('tourFormSlug').value = tour.slug || '';
    document.getElementById('tourFormStyleTag').value = tour.styleTag || '';
    document.getElementById('tourFormDifficultyEs').value = tour.difficultyEs || '';
    document.getElementById('tourFormDifficultyEn').value = tour.difficultyEn || '';
    document.getElementById('tourFormDisplayOrder').value = tour.displayOrder || 1;
    document.getElementById('tourFormMainImage').value = tour.mainImageUrl || '';
    document.getElementById('tourFormIsActive').checked = Boolean(tour.isActive);
    document.getElementById('tourFormFeatured').checked = Boolean(tour.featured);

    document.getElementById('tourFormPriceUsd').value = tour.priceUsd;
    document.getElementById('tourFormPricePen').value = tour.pricePen;
    document.getElementById('tourFormDurationDays').value = tour.durationDays || 1;
    document.getElementById('tourFormDurationEs').value = tour.durationEs || '';
    document.getElementById('tourFormDurationEn').value = tour.durationEn || '';
    document.getElementById('tourFormStartingPoint').value = tour.startingPoint || '';
    document.getElementById('tourFormAltitudeMax').value = tour.altitudeMax || '';

    // Perfil altimétrico
    let alt = {};
    try {
      alt = typeof tour.altitudeProfileJson === 'string'
        ? JSON.parse(tour.altitudeProfileJson)
        : (tour.altitudeProfile || {});
    } catch (e) {
      alt = {};
    }
    document.getElementById('tourFormAltStart').value = alt.startingAltitude || '3,400 m / 11,152 ft';
    document.getElementById('tourFormAltSleep').value = alt.sleepingAltitude || '2,430 m / 7,972 ft';
    document.getElementById('tourFormOxygenPercent').value = alt.oxygenPercentage || 85;
    document.getElementById('tourFormTipEs').value = alt.tipEs || '';
    document.getElementById('tourFormTipEn').value = alt.tipEn || '';

    // Narrativa y listas
    document.getElementById('tourFormDescEs').value = tour.descriptionEs || '';
    document.getElementById('tourFormDescEn').value = tour.descriptionEn || '';
    document.getElementById('tourFormHighlightsEs').value = (tour.highlightsEs || []).join('\n');
    document.getElementById('tourFormHighlightsEn').value = (tour.highlightsEn || []).join('\n');
    document.getElementById('tourFormIncludedEs').value = (tour.includedEs || []).join('\n');
    document.getElementById('tourFormIncludedEn').value = (tour.includedEn || []).join('\n');
    document.getElementById('tourFormNotIncludedEs').value = (tour.notIncludedEs || []).join('\n');
    document.getElementById('tourFormNotIncludedEn').value = (tour.notIncludedEn || []).join('\n');

    // Días de itinerario
    const container = document.getElementById('itineraryDaysContainer');
    if (container) {
      container.innerHTML = '';
      if (tour.itineraries && tour.itineraries.length > 0) {
        tour.itineraries.forEach(day => addItineraryDayRow(day));
      } else {
        addItineraryDayRow({ dayNumber: 1 });
      }
    }

    previewTourMainImage();
    switchTourEditorTab('general');
    openAdminModal('tourEditorModal');
  } catch (err) {
    console.error('Error opening tour edit modal:', err);
    showToast('No se pudo abrir el editor de expedición.', 'error');
  }
}

async function handleTourFormSubmit(event) {
  event.preventDefault();

  const idVal = document.getElementById('tourFormId').value;
  const isEdit = Boolean(idVal);
  const tourId = isEdit ? parseInt(idVal, 10) : null;

  const btnSubmit = document.getElementById('btnSaveTourSubmit');
  const originalText = btnSubmit ? btnSubmit.textContent : 'Guardar';
  if (btnSubmit) {
    btnSubmit.disabled = true;
    btnSubmit.textContent = '⏳ Guardando expedición...';
  }

  try {
    const titleEs = document.getElementById('tourFormTitleEs').value.trim();
    const titleEn = document.getElementById('tourFormTitleEn').value.trim();
    const categoryId = parseInt(document.getElementById('tourFormCategory').value, 10);
    const priceUsd = parseFloat(document.getElementById('tourFormPriceUsd').value) || 0;
    const pricePen = parseFloat(document.getElementById('tourFormPricePen').value) || 0;
    const durationDays = parseInt(document.getElementById('tourFormDurationDays').value, 10) || 1;

    if (!titleEs || !titleEn) {
      throw new Error('Debe ingresar el título bilingüe (Español e Inglés).');
    }
    if (!categoryId) {
      throw new Error('Debe seleccionar una categoría andina válida.');
    }

    // Perfil altimétrico serializado en JSON limpio
    const altitudeProfile = {
      startingAltitude: document.getElementById('tourFormAltStart').value.trim(),
      maxAltitude: document.getElementById('tourFormAltitudeMax').value.trim(),
      sleepingAltitude: document.getElementById('tourFormAltSleep').value.trim(),
      oxygenPercentage: parseInt(document.getElementById('tourFormOxygenPercent').value, 10) || 85,
      tipEs: document.getElementById('tourFormTipEs').value.trim(),
      tipEn: document.getElementById('tourFormTipEn').value.trim()
    };

    // Listas formateadas
    const splitLines = (id) => (document.getElementById(id)?.value || '')
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const highlightsEs = splitLines('tourFormHighlightsEs');
    const highlightsEn = splitLines('tourFormHighlightsEn');
    const includedEs = splitLines('tourFormIncludedEs');
    const includedEn = splitLines('tourFormIncludedEn');
    const notIncludedEs = splitLines('tourFormNotIncludedEs');
    const notIncludedEn = splitLines('tourFormNotIncludedEn');

    // Desglose de días
    const itineraries = [];
    const dayCards = document.querySelectorAll('#itineraryDaysContainer .itinerary-editor-card');
    dayCards.forEach((card, index) => {
      const num = index + 1;
      const dTitleEs = card.querySelector('.input-day-title-es')?.value.trim() || `Día ${num}`;
      const dTitleEn = card.querySelector('.input-day-title-en')?.value.trim() || `Day ${num}`;
      const dDescEs = card.querySelector('.input-day-desc-es')?.value.trim() || '';
      const dDescEn = card.querySelector('.input-day-desc-en')?.value.trim() || '';
      const dDiningEs = card.querySelector('.input-day-dining-es')?.value.trim() || '';
      const dDiningEn = card.querySelector('.input-day-dining-en')?.value.trim() || '';
      const dTransferEs = card.querySelector('.input-day-transfer-es')?.value.trim() || '';
      const dTransferEn = card.querySelector('.input-day-transfer-en')?.value.trim() || '';

      itineraries.push({
        dayNumber: num,
        titleEs: dTitleEs,
        titleEn: dTitleEn,
        descriptionEs: dDescEs,
        descriptionEn: dDescEn,
        gourmetDiningEs: dDiningEs,
        gourmetDiningEn: dDiningEn,
        privateTransferEs: dTransferEs,
        privateTransferEn: dTransferEn
      });
    });

    const payload = {
      titleEs,
      titleEn,
      slug: document.getElementById('tourFormSlug').value.trim() || null,
      subtitleEs: document.getElementById('tourFormSubtitleEs').value.trim(),
      subtitleEn: document.getElementById('tourFormSubtitleEn').value.trim(),
      descriptionEs: document.getElementById('tourFormDescEs').value.trim(),
      descriptionEn: document.getElementById('tourFormDescEn').value.trim(),
      categoryId,
      durationEs: document.getElementById('tourFormDurationEs').value.trim() || 'Día Completo',
      durationEn: document.getElementById('tourFormDurationEn').value.trim() || 'Full Day',
      durationDays,
      priceUsd,
      pricePen,
      difficultyEs: document.getElementById('tourFormDifficultyEs').value.trim() || 'Exclusivo / Suave',
      difficultyEn: document.getElementById('tourFormDifficultyEn').value.trim() || 'Leisure',
      altitudeMax: document.getElementById('tourFormAltitudeMax').value.trim() || '2,430 m / 7,972 ft',
      startingPoint: document.getElementById('tourFormStartingPoint').value.trim() || 'Cusco / Sacred Valley',
      styleTag: document.getElementById('tourFormStyleTag').value.trim() || 'Ultra-Luxury',
      featured: document.getElementById('tourFormFeatured').checked,
      isActive: document.getElementById('tourFormIsActive').checked,
      displayOrder: parseInt(document.getElementById('tourFormDisplayOrder').value, 10) || 1,
      mainImageUrl: document.getElementById('tourFormMainImage').value.trim() || 'assets/images/MachuPicchu.jpg',
      highlightsEs,
      highlightsEn,
      includedEs,
      includedEn,
      notIncludedEs,
      notIncludedEn,
      altitudeProfileJson: JSON.stringify(altitudeProfile),
      itineraries
    };

    let res;
    if (isEdit) {
      res = await apiFetch(`/tours/${tourId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      res = await apiFetch('/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || (isEdit ? 'Error al actualizar expedición' : 'Error al crear expedición'));
    }

    const savedData = await res.json();
    const finalTourId = savedData.id || tourId;

    closeAdminModal('tourEditorModal');
    showToast(isEdit ? `Expedición #${finalTourId} actualizada con éxito.` : `¡Nueva expedición registrada exitosamente!`, 'success');

    adminState.selectedTourId = finalTourId;
    await loadToursData();
    if (finalTourId) {
      selectTourForDetail(finalTourId);
    }
  } catch (err) {
    console.error('Error saving tour:', err);
    showToast(err.message || 'Error al guardar la expedición.', 'error');
  } finally {
    if (btnSubmit) {
      btnSubmit.disabled = false;
      btnSubmit.textContent = originalText;
    }
  }
}

function promptDeleteTour(tourId, tourTitle) {
  const desc = document.getElementById('deleteModalMessage') || document.getElementById('deleteModalDesc');
  const btn = document.getElementById('btnConfirmDeleteAction');

  if (desc) {
    desc.textContent = `¿Está seguro que desea eliminar la expedición "${tourTitle}" (#EXP-${tourId})? Si cuenta con cotizaciones asociadas, se desactivará de manera segura para preservar la integridad contable y el historial.`;
  }

  if (btn) {
    btn.onclick = async () => {
      btn.disabled = true;
      btn.textContent = 'Eliminando...';
      try {
        const res = await apiFetch(`/tours/${tourId}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Error al procesar la eliminación');
        const data = await res.json();

        closeAdminModal('deleteModal');
        showToast(data.message || `Expedición #${tourId} procesada exitosamente.`, 'success');

        adminState.selectedTourId = null;
        await loadToursData();
      } catch (err) {
        console.error('Error deleting tour:', err);
        showToast('No se pudo eliminar la expedición.', 'error');
      } finally {
        btn.disabled = false;
        btn.textContent = 'Eliminar Permanentemente';
      }
    };
  }

  openAdminModal('deleteModal');
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

          <!-- Cotizador Bespoke (Disponible para Admin y Editor) -->
          <button type="button" class="btn-table-action" onclick="openBespokeQuotationModal(${r.id})" title="Abrir Cotizador Bespoke con IGV y Generador de PDF" style="color:var(--admin-gold); border-color:rgba(200,169,107,0.4);">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Cotizar Bespoke
          </button>

          <!-- Acciones restringidas (Solo Administrator) -->
          ${adminState.currentUser?.role !== 'Editor' ? `
            <button type="button" class="btn-table-action" onclick="toggleConciergeStatus(${r.id}, ${!r.isAddressed})">
              ${r.isAddressed ? 'Marcar Pendiente' : 'Marcar Atendido'}
            </button>

            <button type="button" class="btn-table-action btn-table-delete" onclick="deleteConciergeInquiry(${r.id})" title="Descartar Solicitud">
              ✕
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

async function toggleConciergeStatus(id, newStatus) {
  if (adminState.currentUser?.role === 'Editor') {
    showToast('Acceso restringido: El rol Editor no tiene permisos para modificar solicitudes de concierge.', 'error');
    return;
  }

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
  if (adminState.currentUser?.role === 'Editor') {
    showToast('Acceso restringido: El rol Editor no tiene permisos para eliminar solicitudes de concierge.', 'error');
    return;
  }

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
// VISTA 6: GESTIÓN DE USUARIOS & ROLES (CRUD ADMINISTRATOR)
// ============================================================================
async function loadUsersData() {
  if (adminState.currentUser?.role === 'Editor') {
    showToast('Acceso restringido: Se requieren privilegios de Administrador para gestionar usuarios.', 'error');
    switchAdminView('dashboard');
    return;
  }

  const tbody = document.getElementById('usersTableBody');
  if (tbody) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center; padding: 2.5rem; color: var(--admin-text-dim);">Cargando usuarios del Atelier...</td></tr>';
  }

  try {
    const res = await apiFetch('/users');
    if (!res.ok) throw new Error('Error al consultar usuarios');
    const users = await res.json();
    adminState.users = Array.isArray(users) ? users : [];
    renderUsersTable(adminState.users);
  } catch (err) {
    console.error('Error fetching users:', err);
    showToast('No se pudieron cargar los usuarios del atelier.', 'error');
    if (tbody) {
      tbody.innerHTML = '<tr><td colspan="9" style="text-align:center; padding: 2.5rem; color: #ff6b6b;">Error al cargar la lista de usuarios.</td></tr>';
    }
  }
}

function renderUsersTable(users) {
  const tbody = document.getElementById('usersTableBody');
  if (!tbody) return;

  if (!users || users.length === 0) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center; padding: 2.5rem; color: var(--admin-text-dim);">No hay usuarios registrados.</td></tr>';
    return;
  }

  tbody.innerHTML = users.map(u => {
    const roleBadge = u.role === 'Administrator' 
      ? '<span class="badge-tag-mini badge-role-admin">Administrator</span>'
      : '<span class="badge-tag-mini badge-role-editor">Editor</span>';

    const statusBadge = u.isActive
      ? '<span class="badge-tag-mini badge-status-active">● Activo</span>'
      : '<span class="badge-tag-mini badge-status-inactive">✕ Inactivo</span>';

    const isCurrent = adminState.currentUser?.username === u.username;

    return `
      <tr>
        <td style="color: var(--admin-text-dim); font-size: 0.8rem;">#${u.id}</td>
        <td>
          <strong style="color: #FFFFFF; font-size: 0.85rem;">${escapeHtml(u.username)}</strong>
          ${isCurrent ? '<span style="font-size:0.7rem; color:var(--admin-gold); margin-left:4px;">(Tú)</span>' : ''}
        </td>
        <td style="color: var(--admin-text-main); font-size: 0.85rem;">${escapeHtml(u.fullName || '—')}</td>
        <td style="color: var(--admin-text-muted); font-size: 0.82rem;">${escapeHtml(u.email)}</td>
        <td>${roleBadge}</td>
        <td>${statusBadge}</td>
        <td style="color: var(--admin-text-dim); font-size: 0.78rem;">${formatDate(u.createdAt)}</td>
        <td style="color: var(--admin-text-dim); font-size: 0.78rem;">${u.lastLoginAt ? formatDate(u.lastLoginAt) : 'Nunca'}</td>
        <td style="text-align: right;">
          <div style="display: flex; gap: 0.35rem; justify-content: flex-end;">
            <button type="button" class="btn-table-action" onclick="openUserEditModal(${u.id})" title="Editar Credenciales y Permisos">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </button>
            ${!isCurrent ? `
              <button type="button" class="btn-table-action btn-table-delete" onclick="deleteUserPrompt(${u.id}, '${escapeHtml(u.username)}')" title="Eliminar Usuario">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function openUserCreateModal() {
  adminState.editingUserId = null;
  document.getElementById('userFormId').value = '';
  document.getElementById('userFormFullName').value = '';
  document.getElementById('userFormUsername').value = '';
  document.getElementById('userFormUsername').disabled = false;
  document.getElementById('userFormEmail').value = '';
  document.getElementById('userFormRole').value = 'Editor';
  document.getElementById('userFormIsActive').checked = true;
  document.getElementById('userFormPassword').value = '';
  document.getElementById('userFormPassword').required = true;
  document.getElementById('userFormPasswordLabel').textContent = 'Contraseña *';
  document.getElementById('userFormPasswordHelp').textContent = 'Mínimo 6 caracteres para autenticación segura.';
  document.getElementById('userModalTitle').textContent = 'Crear Nuevo Usuario';
  document.getElementById('btnSaveUserSubmit').textContent = '💾 Crear Usuario';

  openAdminModal('userEditorModal');
}

function openUserEditModal(id) {
  const user = adminState.users.find(u => u.id === id);
  if (!user) {
    showToast('Usuario no encontrado', 'error');
    return;
  }

  adminState.editingUserId = id;
  document.getElementById('userFormId').value = user.id;
  document.getElementById('userFormFullName').value = user.fullName || '';
  document.getElementById('userFormUsername').value = user.username;
  document.getElementById('userFormUsername').disabled = true; // username inmutable
  document.getElementById('userFormEmail').value = user.email;
  document.getElementById('userFormRole').value = user.role;
  document.getElementById('userFormIsActive').checked = user.isActive;
  document.getElementById('userFormPassword').value = '';
  document.getElementById('userFormPassword').required = false;
  document.getElementById('userFormPasswordLabel').textContent = 'Nueva Contraseña (Opcional)';
  document.getElementById('userFormPasswordHelp').textContent = 'Deje en blanco si desea conservar la contraseña actual.';
  document.getElementById('userModalTitle').textContent = `Editar Usuario: ${user.username}`;
  document.getElementById('btnSaveUserSubmit').textContent = '💾 Guardar Cambios';

  openAdminModal('userEditorModal');
}

async function handleUserFormSubmit(event) {
  event.preventDefault();
  const id = document.getElementById('userFormId').value;
  const fullName = document.getElementById('userFormFullName').value.trim();
  const username = document.getElementById('userFormUsername').value.trim();
  const email = document.getElementById('userFormEmail').value.trim();
  const role = document.getElementById('userFormRole').value;
  const isActive = document.getElementById('userFormIsActive').checked;
  const password = document.getElementById('userFormPassword').value;

  const btn = document.getElementById('btnSaveUserSubmit');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Guardando...';

  try {
    let res;
    if (id) {
      // Editar
      const payload = {
        fullName,
        email,
        role,
        isActive,
        password: password || null
      };
      res = await apiFetch(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
    } else {
      // Crear
      const payload = {
        username,
        email,
        fullName,
        password,
        role,
        isActive
      };
      res = await apiFetch('/users', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    }

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Error al procesar la solicitud');
    }

    closeAdminModal('userEditorModal');
    showToast(id ? 'Usuario actualizado exitosamente.' : 'Usuario registrado exitosamente.', 'success');
    await loadUsersData();
  } catch (err) {
    console.error('Error saving user:', err);
    showToast(err.message || 'Error al guardar usuario.', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

async function deleteUserPrompt(id, username) {
  if (!confirm(`¿Está seguro de que desea eliminar al usuario "${username}" (#${id})? Esta acción revocará todos sus accesos de manera inmediata.`)) {
    return;
  }

  try {
    const res = await apiFetch(`/users/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Error al eliminar usuario');
    }

    showToast(`Usuario "${username}" eliminado.`, 'info');
    await loadUsersData();
  } catch (err) {
    console.error('Error deleting user:', err);
    showToast(err.message || 'No se pudo eliminar el usuario.', 'error');
  }
}

// ============================================================================
// COTIZADOR INTERACTIVO BESPOKE (SOLICITUDES PERSONALIZADAS) & GENERADOR DE PDF
// ============================================================================
function openBespokeQuotationModal(requestId) {
  const req = adminState.conciergeRequests.find(r => r.id === requestId);
  if (!req) {
    showToast('Solicitud bespoke no encontrada.', 'error');
    return;
  }

  // Jalar datos del cliente que ya fueron registrados
  document.getElementById('quoteRequestId').value = req.id;
  const quoteCode = `COT-2026-${String(req.id).padStart(4, '0')}`;
  document.getElementById('quoteCodeNumber').value = quoteCode;
  document.getElementById('quoteModalTitle').textContent = `Cotizador Bespoke: ${req.guestName}`;

  document.getElementById('quoteGuestName').value = req.guestName || '';
  document.getElementById('quoteEmail').value = req.email || '';
  document.getElementById('quotePhone').value = req.whatsApp || '';
  document.getElementById('quoteDestination').value = req.destinationFocus || 'Machu Picchu & Valle Sagrado Privé';
  document.getElementById('quoteTravelers').value = req.travelersCount || 2;
  document.getElementById('quoteDuration').value = req.journeyDuration || '4 Días / 3 Noches';
  document.getElementById('quoteNotes').value = req.bespokeNotes || '';

  // Determinar si es nacional o extranjero
  const isPeruvianPhone = req.whatsApp && (req.whatsApp.startsWith('+51') || req.whatsApp.startsWith('51') || (req.whatsApp.startsWith('9') && req.whatsApp.length === 9));
  if (isPeruvianPhone) {
    document.getElementById('taxRegimeNational').checked = true;
  } else {
    document.getElementById('taxRegimeNational').checked = true; // Por defecto nacional para visibilizar IGV, modificable con 1 click
  }

  handleTaxRegimeChange();

  // Precargar desglose de experiencias de alta gama
  const tbody = document.getElementById('quotationItemsTableBody');
  tbody.innerHTML = '';

  const travelers = req.travelersCount || 2;
  const destName = req.destinationFocus || 'Machu Picchu Privé';

  addQuotationItemRow(`Expedición Privada: ${destName} (Logística Bespoke & Guía Arqueólogo Privado)`, travelers, 1650);
  addQuotationItemRow(`Boleto Belmond Hiram Bingham (Ida & Retorno Clase Lujo)`, travelers, 950);
  addQuotationItemRow(`Pernocte en Hotel 5★ Gran Lujo (Suite con Desayuno Andino Gourmet)`, 2, 850);

  recalcQuotationTotals();
  openAdminModal('conciergeQuotationModal');
}

function addQuotationItemRow(description = '', quantity = 1, unitPrice = 0) {
  const tbody = document.getElementById('quotationItemsTableBody');
  if (!tbody) return;

  const tr = document.createElement('tr');
  tr.className = 'quote-item-row';
  tr.innerHTML = `
    <td>
      <input type="text" class="modal-input quote-item-desc" style="padding: 0.4rem 0.6rem; font-size: 0.82rem;" placeholder="Detalle de experiencia o servicio bespoke" value="${escapeHtml(description)}">
    </td>
    <td style="text-align: center;">
      <input type="number" class="modal-input quote-item-qty" style="padding: 0.4rem 0.5rem; text-align: center; font-size: 0.82rem;" min="1" max="999" value="${quantity}" oninput="recalcQuotationTotals()">
    </td>
    <td style="text-align: right;">
      <input type="number" class="modal-input quote-item-price" style="padding: 0.4rem 0.5rem; text-align: right; font-size: 0.82rem;" min="0" step="10" value="${unitPrice}" oninput="recalcQuotationTotals()">
    </td>
    <td style="text-align: right; font-weight: 600; color: #FFFFFF; font-size: 0.85rem;" class="quote-item-subtotal">
      $0.00
    </td>
    <td style="text-align: center;">
      <button type="button" class="btn-table-action btn-table-delete" onclick="removeQuotationItemRow(this)" title="Quitar Fila" style="padding: 2px 6px;">✕</button>
    </td>
  `;

  tbody.appendChild(tr);
  recalcQuotationTotals();
}

function removeQuotationItemRow(btn) {
  const row = btn.closest('tr');
  if (row) {
    row.remove();
    recalcQuotationTotals();
  }
}

function handleTaxRegimeChange() {
  const isNational = document.getElementById('taxRegimeNational')?.checked;
  const badge = document.getElementById('taxRegimeBadge');

  if (badge) {
    if (isNational) {
      badge.textContent = '+18% IGV Aplicado (Huésped Nacional)';
      badge.style.background = 'rgba(230, 162, 60, 0.2)';
      badge.style.color = '#ECC38B';
    } else {
      badge.textContent = 'Exonerado 0% IGV (Extranjero D.L. 919)';
      badge.style.background = 'rgba(46, 204, 113, 0.15)';
      badge.style.color = '#2ECC71';
    }
  }

  recalcQuotationTotals();
}

function recalcQuotationTotals() {
  const rows = document.querySelectorAll('#quotationItemsTableBody tr.quote-item-row');
  let netSubtotalUsd = 0;

  rows.forEach(tr => {
    const qtyInput = tr.querySelector('.quote-item-qty');
    const priceInput = tr.querySelector('.quote-item-price');
    const subtotalCell = tr.querySelector('.quote-item-subtotal');

    const qty = Math.max(0, Number(qtyInput?.value) || 0);
    const unitPrice = Math.max(0, Number(priceInput?.value) || 0);
    const rowSubtotal = qty * unitPrice;

    netSubtotalUsd += rowSubtotal;

    if (subtotalCell) {
      subtotalCell.textContent = `$${rowSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  });

  const isNational = document.getElementById('taxRegimeNational')?.checked;
  const taxRate = isNational ? 0.18 : 0.00;
  const taxAmountUsd = netSubtotalUsd * taxRate;
  const grandTotalUsd = netSubtotalUsd + taxAmountUsd;
  const exchangeRate = 3.80;
  const grandTotalPen = grandTotalUsd * exchangeRate;
  const depositHoldUsd = grandTotalUsd * 0.30;

  const subtotalEl = document.getElementById('quoteDisplaySubtotal');
  const taxLabelEl = document.getElementById('quoteDisplayTaxLabel');
  const taxAmountEl = document.getElementById('quoteDisplayTaxAmount');
  const grandTotalEl = document.getElementById('quoteDisplayGrandTotal');
  const penEquivEl = document.getElementById('quoteDisplayPenEquiv');
  const depositEl = document.getElementById('quoteDisplayDeposit');

  if (subtotalEl) subtotalEl.textContent = `$${netSubtotalUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
  if (taxLabelEl) taxLabelEl.textContent = isNational ? 'IGV (18% Nacional Perú):' : 'IGV (0% Exonerado D.L. 919):';
  if (taxAmountEl) taxAmountEl.textContent = `$${taxAmountUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
  if (grandTotalEl) grandTotalEl.textContent = `$${grandTotalUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
  if (penEquivEl) penEquivEl.textContent = `Equiv: S/. ${grandTotalPen.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PEN`;
  if (depositEl) depositEl.textContent = `$${depositHoldUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
}

function handleQuotationFormSubmit(event) {
  event.preventDefault();
  generateQuotationPrintPreview();
}

function generateQuotationPrintPreview() {
  const code = document.getElementById('quoteCodeNumber')?.value || 'COT-2026-0001';
  const guestName = document.getElementById('quoteGuestName')?.value.trim() || 'Huésped Distinguido';
  const email = document.getElementById('quoteEmail')?.value.trim() || '—';
  const phone = document.getElementById('quotePhone')?.value.trim() || '—';
  const dest = document.getElementById('quoteDestination')?.value.trim() || 'Machu Picchu Privé';
  const travelers = document.getElementById('quoteTravelers')?.value || '2';
  const duration = document.getElementById('quoteDuration')?.value.trim() || '4 Días / 3 Noches';
  const terms = document.getElementById('quoteTerms')?.value || '';
  const isNational = document.getElementById('taxRegimeNational')?.checked;

  const printCode = document.getElementById('printQuoteCode');
  const printDate = document.getElementById('printQuoteDate');
  const printGuest = document.getElementById('printQuoteGuest');
  const printContact = document.getElementById('printQuoteContact');
  const printDest = document.getElementById('printQuoteDest');
  const printTravelers = document.getElementById('printQuoteTravelers');
  const printDuration = document.getElementById('printQuoteDuration');
  const printTaxRegime = document.getElementById('printQuoteTaxRegime');
  const printTerms = document.getElementById('printQuoteTerms');
  const printLegalNotice = document.getElementById('printQuoteLegalNotice');

  if (printCode) printCode.textContent = code;
  if (printDate) printDate.textContent = new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' });
  if (printGuest) printGuest.textContent = guestName;
  if (printContact) printContact.textContent = `${email} • WhatsApp: ${phone}`;
  if (printDest) printDest.textContent = dest;
  if (printTravelers) printTravelers.textContent = `${travelers} Pasajero(s) de Alta Distinción`;
  if (printDuration) printDuration.textContent = duration;

  if (printTaxRegime) {
    printTaxRegime.textContent = isNational 
      ? '🇵🇪 Régimen Nacional (+18% IGV Gravado)' 
      : '🌎 Régimen No Domiciliado (Exonerado D.L. 919 - Turismo Receptivo)';
    printTaxRegime.style.color = isNational ? '#C8A96B' : '#2ECC71';
  }

  if (printTerms) {
    printTerms.innerHTML = escapeHtml(terms).replace(/\n/g, '<br>');
  }

  if (printLegalNotice) {
    printLegalNotice.textContent = isNational
      ? 'Aviso Legal: Operación gravada sujeta a Factura / Boleta electrónica con aplicación del 18% del Impuesto General a las Ventas (IGV) de conformidad con el Texto Único Ordenado de la Ley del IGV e ISC del Perú.'
      : 'Aviso Legal: De conformidad con el Decreto Legislativo N° 919 y normatividad tributaria de la República del Perú, la prestación de servicios turísticos a sujetos no domiciliados califica como exportación de servicios, encontrándose EXONERADA del Impuesto General a las Ventas (IGV 0%). Requiere presentación de pasaporte y TAM virtual vigente.';
  }

  const printTbody = document.getElementById('printQuoteTableBody');
  if (printTbody) {
    const rows = document.querySelectorAll('#quotationItemsTableBody tr.quote-item-row');
    let netSubtotalUsd = 0;
    let index = 1;

    printTbody.innerHTML = Array.from(rows).map(tr => {
      const desc = tr.querySelector('.quote-item-desc')?.value.trim() || 'Servicio Turístico Bespoke';
      const qty = Math.max(0, Number(tr.querySelector('.quote-item-qty')?.value) || 0);
      const unitPrice = Math.max(0, Number(tr.querySelector('.quote-item-price')?.value) || 0);
      const rowSubtotal = qty * unitPrice;
      netSubtotalUsd += rowSubtotal;

      return `
        <tr>
          <td style="text-align: center; color: #888888;">${index++}</td>
          <td>
            <strong>${escapeHtml(desc)}</strong>
          </td>
          <td style="text-align: center;">${qty}</td>
          <td style="text-align: right;">$${unitPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
          <td style="text-align: right; font-weight: 700;">$${rowSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
        </tr>
      `;
    }).join('');

    const taxRate = isNational ? 0.18 : 0.00;
    const taxAmountUsd = netSubtotalUsd * taxRate;
    const grandTotalUsd = netSubtotalUsd + taxAmountUsd;
    const exchangeRate = 3.80;
    const grandTotalPen = grandTotalUsd * exchangeRate;
    const depositHoldUsd = grandTotalUsd * 0.30;

    document.getElementById('printQuoteSubtotal').textContent = `$${netSubtotalUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD`;
    document.getElementById('printQuoteTaxLabel').textContent = isNational ? 'IGV (18% Régimen Nacional):' : 'IGV (0% Exonerado D.L. 919):';
    document.getElementById('printQuoteTax').textContent = `$${taxAmountUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD`;
    document.getElementById('printQuoteGrandTotal').textContent = `$${grandTotalUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD`;
    document.getElementById('printQuotePenTotal').textContent = `S/. ${grandTotalPen.toLocaleString('es-PE', { minimumFractionDigits: 2 })} PEN`;
    document.getElementById('printQuoteDeposit').textContent = `$${depositHoldUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD`;
  }

  openAdminModal('quotationPrintModal');
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
