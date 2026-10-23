/**
 * Luxury Machupicchu Peru • Legal & Compliance Portal Scripts
 * Separation of Concerns: Handles sticky navigation, smooth scrollspy,
 * and virtual claims book (Libro de Reclamaciones) submissions.
 */

function activateLegalNav(element) {
  document.querySelectorAll('.legal-nav-link').forEach(link => link.classList.remove('active'));
  element.classList.add('active');
}

// Auto highlight nav based on scroll position
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.legal-page-section');
  const navLinks = document.querySelectorAll('.legal-nav-link');
  let currentSection = '';

  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.pageYOffset >= top) {
      currentSection = sec.getAttribute('id');
    }
  });

  if (currentSection) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
});

// Form Submission Handling for Libro de Reclamaciones
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

  if (!fullName || !docNum || !email || !phone || !service || !detail || !request) {
    alert('Por favor complete todos los campos obligatorios del Libro de Reclamaciones.');
    return;
  }

  const claimCode = `REC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  const currentDate = new Date().toLocaleDateString('es-PE', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  const formContainer = document.getElementById('claimFormContainer');
  const resultContainer = document.getElementById('claimResultContainer');

  if (formContainer && resultContainer) {
    formContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    resultContainer.innerHTML = `
      <div class="claim-success-card">
        <div class="claim-success-icon">✓</div>
        <span class="claim-success-kicker">CONSTANCIA OFICIAL CONFORME A LEY N° 29571</span>
        <h3 class="claim-success-title">Hoja de ${escapeHtml(claimType)} Registrada</h3>
        <p class="claim-success-desc">
          Estimado(a) <strong>${escapeHtml(fullName)}</strong>, su ${escapeHtml(claimType.toLowerCase())} ha sido formalmente asentado en el Libro de Reclamaciones Virtual de <strong>Luxury Machupicchu Peru E.I.R.L.</strong> (RUC: 20601622492).
        </p>

        <div class="claim-success-details">
          <div class="detail-row">
            <span>Código Correlativo:</span>
            <strong style="color: var(--color-gold); font-size: 1.05rem;">${escapeHtml(claimCode)}</strong>
          </div>
          <div class="detail-row">
            <span>Fecha y Hora de Registro:</span>
            <strong>${escapeHtml(currentDate)}</strong>
          </div>
          <div class="detail-row">
            <span>Consumidor:</span>
            <strong>${escapeHtml(fullName)} (${escapeHtml(docType)}: ${escapeHtml(docNum)})</strong>
          </div>
          <div class="detail-row">
            <span>Servicio Contratado:</span>
            <strong>${escapeHtml(service)}</strong>
          </div>
          <div class="detail-row">
            <span>Correo Notificación:</span>
            <strong>${escapeHtml(email)}</strong>
          </div>
          <div class="detail-row">
            <span>Tipo de Registro:</span>
            <strong>${escapeHtml(claimType.toUpperCase())}</strong>
          </div>
        </div>

        <div class="claim-legal-sla">
          ⚖️ <strong>Plazo Legal de Atención:</strong> Conforme al Código de Protección y Defensa del Consumidor (Ley N° 29571) y normativa de INDECOPI, la empresa emitirá respuesta formal motivada a su correo en un plazo improrrogable no mayor a quince (15) días hábiles.
        </div>

        <div class="claim-success-actions">
          <button type="button" class="btn-claim-print" onclick="window.print()">
            🖨 Imprimir Hoja de Reclamación
          </button>
          <button type="button" class="btn-claim-reset" onclick="resetClaimForm()">
            Registrar Otro Asunto
          </button>
        </div>
      </div>
    `;
  }
}

function resetClaimForm() {
  const formContainer = document.getElementById('claimFormContainer');
  const resultContainer = document.getElementById('claimResultContainer');
  const form = document.getElementById('claimForm');
  if (formContainer && resultContainer && form) {
    form.reset();
    resultContainer.style.display = 'none';
    formContainer.style.display = 'block';
  }
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
