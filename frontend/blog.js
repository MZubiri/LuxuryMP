/**
 * LUXURY MACHUPICCHU PERU - BLOG APPLICATION
 * Haute Couture Andean Travel Gazette & Interactive Reader
 */

const blogState = {
  currentLang: localStorage.getItem('luxury_lang') || 'en',
  currentCurrency: localStorage.getItem('luxury_currency') || 'USD',
  activeCategory: 'all',
  searchQuery: '',
  activePostSlug: null
};

// UI Translations Dictionary for Blog Shell
const blogTranslations = {
  en: {
    topBarTag: "OFFICIAL LICENSED OPERATOR",
    topBarRuc: "RUC: 20601622492",
    topBarLic: "GERCETUR CERTIFIED • MINCETUR AUTHORIZED • ESNNA COMPLIANT",
    navHome: "Home",
    navExpeditions: "Experiences",
    navRail: "Hiram Bingham Rail",
    navPhilosophy: "The Belmond Distinction",
    navChronicles: "Guest Chronicles",
    navContact: "Concierge",
    navBlog: "Blog & Guide",
    navBuildPackage: "✦ Build Your Package",
    btnBespokeInquiry: "Bespoke Inquiry",
    heroKicker: "ANDEAN GAZETTE & OFFICIAL EXPERIENCE CHRONICLES",
    heroTitle: "The Luxury Peru Travel Guide",
    heroSubtitle: "Curated insights by certified master historians and private concierges: optimal travel seasons, entry regulations, ancient wonders, and bespoke high-altitude journeys.",
    searchPlaceholder: "Search climate, visas, Machu Picchu, Amazon, traditions...",
    catAll: "All Articles",
    featuredBadge: "FEATURED EXPERIENCE DOSSIER",
    btnReadArticle: "Read Complete Article",
    btnBackToBlog: "← Back to All Guides",
    readTimeSuffix: "min read",
    authorPrefix: "Curated by",
    shareTitle: "Share this Guide:",
    linkCopied: "Link copied to clipboard!",
    noResultsTitle: "No articles found",
    noResultsText: "Try adjusting your search query or choosing a different category.",
    relatedTitle: "Curated Experiences for this Journey",
    relatedKicker: "RECOMMENDED HAUTE COUTURE EXPERIENCES",
    btnExploreTour: "Explore Experience Itinerary →",
    conciergeBannerTitle: "Planning this Journey with Private Distinction?",
    conciergeBannerText: "Our senior travel architects in Cusco will tailor every detail to your schedule: luxury rail, certified archaeologists, and 5-star sanctuary access.",
    btnConciergeWa: "Consult In-Country Concierge via WhatsApp",
    btnInquireForm: "Request Private Consultation",
    footerDesc: "Official luxury travel atelier dedicated to private, bespoke experiences through the Sacred Valley, Machu Picchu Sanctuary, and the High Andes."
  },
  es: {
    topBarTag: "OPERADOR OFICIAL AUTORIZADO",
    topBarRuc: "RUC: 20601622492",
    topBarLic: "CERTIFICADO GERCETUR • AUTORIZADO POR MINCETUR • CÓDIGO ESNNA",
    navHome: "Inicio",
    navExpeditions: "Experiencias",
    navRail: "Tren Hiram Bingham",
    navPhilosophy: "La Distinción Belmond",
    navChronicles: "Crónicas de Huéspedes",
    navContact: "Concierge",
    navBlog: "Blog & Guías",
    navBuildPackage: "✦ Arma tu Paquete",
    btnBespokeInquiry: "Consulta a Medida",
    heroKicker: "GACETA ANDINA & CRÓNICAS OFICIALES DE VIAJES",
    heroTitle: "Guía Exclusiva de Viajes por Perú",
    heroSubtitle: "Conocimiento experto curado por historiadores y concierges en Cusco: temporadas climáticas, requisitos migratorios, maravillas ancestrales y travesías de alta costura.",
    searchPlaceholder: "Buscar clima, visas, Machu Picchu, Amazonía, tradiciones...",
    catAll: "Todos los Artículos",
    featuredBadge: "DOSSIER DESTACADO DE AUTOR",
    btnReadArticle: "Leer Artículo Completo",
    btnBackToBlog: "← Volver a Todas las Guías",
    readTimeSuffix: "min de lectura",
    authorPrefix: "Curado por",
    shareTitle: "Compartir esta Guía:",
    linkCopied: "¡Enlace copiado al portapapeles!",
    noResultsTitle: "No se encontraron artículos",
    noResultsText: "Intente con otros términos de búsqueda o seleccione otra categoría.",
    relatedTitle: "Experiencias de Autor Recomendadas",
    relatedKicker: "EXPERIENCIAS DE ALTA GAMA VINCULADAS",
    btnExploreTour: "Ver Itinerario de la Experiencia →",
    conciergeBannerTitle: "¿Desea Planificar esta Travesía con Total Distinción?",
    conciergeBannerText: "Nuestros arquitectos de viaje en Cusco diseñarán cada detalle a su medida: trenes de lujo, arqueólogos privados y acceso exclusivo al santuario.",
    btnConciergeWa: "Consultar a Concierge en Destino vía WhatsApp",
    btnInquireForm: "Solicitar Consulta Privada",
    footerDesc: "Atelier oficial de viajes de alta costura especializado en experiencias privadas al Valle Sagrado, Machu Picchu y el Altiplano andino."
  }
};

// Available Curated Tours mapping for related cards
const TOURS_CATALOG = {
  "belmond-hiram-bingham-pinnacle": {
    title: {
      en: "Belmond Hiram Bingham Pinnacle & Citadel Sanctuary",
      es: "Belmond Hiram Bingham Pinnacle & Santuario Sagrado"
    },
    image: "assets/images/hiram_bingham_main.jpg",
    slug: "belmond-hiram-bingham-pinnacle"
  },
  "sacred-valley-prive-shamanic-ritual": {
    title: {
      en: "Sacred Valley Privé & Ancestral Q'ero Shamanic Ritual",
      es: "Valle Sagrado Privé & Ritual Chamánico de Altura"
    },
    image: "assets/images/sacred_valley_moray.jpg",
    slug: "sacred-valley-prive-shamanic-ritual"
  },
  "belmond-andean-explorer-cusco-titicaca": {
    title: {
      en: "Belmond Andean Explorer Luxury Sleeper (Cusco to Lake Titicaca)",
      es: "Tren Cama Belmond Andean Explorer (Cusco a Lago Titicaca)"
    },
    image: "assets/images/andean_explorer_main.jpg",
    slug: "belmond-andean-explorer-cusco-titicaca"
  },
  "classic-inca-trail-vip-glamping": {
    title: {
      en: "Classic Inca Trail VIP Luxury Glamping Experience",
      es: "Camino Inca Clásico VIP Glamping de Lujo"
    },
    image: "assets/images/inca_trail_main.jpg",
    slug: "classic-inca-trail-vip-glamping"
  }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initBlogApp();
});

function initBlogApp() {
  // Read URL query parameters
  const params = new URLSearchParams(window.location.search);
  const slugParam = params.get('slug') || params.get('article');
  const catParam = params.get('category');
  const langParam = params.get('lang');

  if (langParam === 'en' || langParam === 'es') {
    blogState.currentLang = langParam;
    localStorage.setItem('luxury_lang', langParam);
  }

  if (catParam) {
    blogState.activeCategory = catParam;
  }

  // Setup reading progress indicator
  window.addEventListener('scroll', handleReadingProgress);

  // Setup search input listener
  const searchInput = document.getElementById('blogSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      blogState.searchQuery = e.target.value.toLowerCase().trim();
      renderBlogList();
    });
  }

  // Handle browser back/forward buttons
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.slug) {
      openArticle(e.state.slug, false);
    } else {
      showBlogList(false);
    }
  });

  // Apply initial language
  applyBlogLanguage(blogState.currentLang);

  // If URL has specific slug, open that article directly
  if (slugParam && BLOG_POSTS.some(p => p.slug === slugParam)) {
    openArticle(slugParam, false);
  } else {
    showBlogList(false);
  }
}

// Reading progress bar calculation
function handleReadingProgress() {
  const progressBar = document.getElementById('blogReadingProgress');
  if (!progressBar) return;

  const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
  progressBar.style.width = `${scrolled}%`;
}

// Language Switcher
function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'es') return;
  blogState.currentLang = lang;
  localStorage.setItem('luxury_lang', lang);

  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('data-lang', lang);

  document.querySelectorAll('#btnLangEn, #drawerBtnLangEn').forEach(b => b.classList.toggle('active', lang === 'en'));
  document.querySelectorAll('#btnLangEs, #drawerBtnLangEs').forEach(b => b.classList.toggle('active', lang === 'es'));

  applyBlogLanguage(lang);

  if (blogState.activePostSlug) {
    renderArticleReader(blogState.activePostSlug);
  } else {
    renderCategoryFilters();
    renderBlogList();
  }
}

// Currency Switcher
function setCurrency(curr) {
  if (curr !== 'USD' && curr !== 'PEN') return;
  blogState.currentCurrency = curr;
  localStorage.setItem('luxury_currency', curr);

  document.documentElement.setAttribute('data-currency', curr);
  document.getElementById('btnUsd')?.classList.toggle('active', curr === 'USD');
  document.getElementById('btnPen')?.classList.toggle('active', curr === 'PEN');
}

// Apply Language strings to DOM elements
function applyBlogLanguage(lang) {
  const dict = blogTranslations[lang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  const searchInput = document.getElementById('blogSearchInput');
  if (searchInput && dict.searchPlaceholder) {
    searchInput.placeholder = dict.searchPlaceholder;
  }
}

// Render Category Filter Buttons
function renderCategoryFilters() {
  const container = document.getElementById('blogCategoryFilters');
  if (!container) return;

  const lang = blogState.currentLang;
  const dict = blogTranslations[lang];

  // Distinct categories from data
  const categoriesMap = new Map();
  BLOG_POSTS.forEach(post => {
    if (!categoriesMap.has(post.category)) {
      categoriesMap.set(post.category, {
        id: post.category,
        label: post.categoryLabel[lang] || post.category,
        count: 0
      });
    }
    categoriesMap.get(post.category).count++;
  });

  let html = `
    <button class="blog-category-btn ${blogState.activeCategory === 'all' ? 'active' : ''}" onclick="selectCategory('all')">
      <span>${dict.catAll}</span>
      <span class="blog-category-count">(${BLOG_POSTS.length})</span>
    </button>
  `;

  categoriesMap.forEach(cat => {
    const isActive = blogState.activeCategory === cat.id;
    html += `
      <button class="blog-category-btn ${isActive ? 'active' : ''}" onclick="selectCategory('${cat.id}')">
        <span>${cat.label}</span>
        <span class="blog-category-count">(${cat.count})</span>
      </button>
    `;
  });

  container.innerHTML = html;
}

function selectCategory(catId) {
  blogState.activeCategory = catId;
  renderCategoryFilters();
  renderBlogList();
}

// Render Blog Listing (Featured + Grid)
function renderBlogList() {
  const lang = blogState.currentLang;
  const dict = blogTranslations[lang];
  const query = blogState.searchQuery;

  // Filter posts based on category and search query
  const filtered = BLOG_POSTS.filter(post => {
    const matchesCategory = blogState.activeCategory === 'all' || post.category === blogState.activeCategory;
    if (!matchesCategory) return false;

    if (!query) return true;

    const titleText = (post.title[lang] || '').toLowerCase();
    const summaryText = (post.summary[lang] || '').toLowerCase();
    const tagMatch = post.tags.some(t => t.toLowerCase().includes(query));
    return titleText.includes(query) || summaryText.includes(query) || tagMatch;
  });

  const featuredContainer = document.getElementById('blogFeaturedContainer');
  const gridContainer = document.getElementById('blogGridContainer');
  const noResultsContainer = document.getElementById('blogNoResults');

  if (filtered.length === 0) {
    if (featuredContainer) featuredContainer.innerHTML = '';
    if (gridContainer) gridContainer.innerHTML = '';
    if (noResultsContainer) {
      noResultsContainer.style.display = 'block';
      noResultsContainer.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem;">
          <h3 style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--color-obsidian); margin-bottom: 0.5rem;">${dict.noResultsTitle}</h3>
          <p style="color: var(--color-text-muted);">${dict.noResultsText}</p>
        </div>
      `;
    }
    return;
  }

  if (noResultsContainer) noResultsContainer.style.display = 'none';

  // If there is no search query and category is 'all', show featured card first
  let remainingPosts = [...filtered];
  if (featuredContainer) {
    if (!query && blogState.activeCategory === 'all') {
      const featuredPost = filtered.find(p => p.featured) || filtered[0];
      remainingPosts = filtered.filter(p => p.id !== featuredPost.id);

      featuredContainer.innerHTML = `
        <article class="blog-featured-card" onclick="openArticle('${featuredPost.slug}')" role="button" tabindex="0">
          <div class="featured-img-wrap">
            <img src="${featuredPost.heroImage}" alt="${featuredPost.title[lang]}" onerror="this.src='${featuredPost.localHeroFallback}'" loading="lazy">
            <span class="featured-badge-pill">${dict.featuredBadge}</span>
          </div>
          <div class="featured-content-wrap">
            <div class="blog-meta-row">
              <span>${featuredPost.categoryLabel[lang]}</span>
              <span class="meta-dot">•</span>
              <span>${featuredPost.readTime} ${dict.readTimeSuffix}</span>
            </div>
            <h2 class="featured-title">${featuredPost.title[lang]}</h2>
            <p class="featured-excerpt">${featuredPost.summary[lang]}</p>
            <a href="javascript:void(0)" class="btn-read-article" onclick="event.stopPropagation(); openArticle('${featuredPost.slug}')">
              <span>${dict.btnReadArticle}</span>
              <span>→</span>
            </a>
          </div>
        </article>
      `;
    } else {
      featuredContainer.innerHTML = '';
    }
  }

  // Render remaining in Grid
  if (gridContainer) {
    gridContainer.innerHTML = remainingPosts.map(post => {
      return `
        <article class="blog-card" onclick="openArticle('${post.slug}')" role="button" tabindex="0">
          <div class="blog-card-media">
            <img src="${post.heroImage}" alt="${post.title[lang]}" onerror="this.src='${post.localHeroFallback}'" loading="lazy">
            <span class="blog-card-category-tag">${post.categoryLabel[lang]}</span>
          </div>
          <div class="blog-card-body">
            <div class="blog-card-meta">
              <span>${post.readTime} ${dict.readTimeSuffix}</span>
              <span class="meta-dot">•</span>
              <span>${post.publishDate}</span>
            </div>
            <h3 class="blog-card-title">${post.title[lang]}</h3>
            <p class="blog-card-summary">${post.summary[lang]}</p>
            <div class="blog-card-footer">
              <span class="blog-card-readlink">
                ${dict.btnReadArticle} →
              </span>
              <span class="blog-card-readtime">${post.author.name}</span>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }
}

// Open Specific Article in Deep Reader View
function openArticle(slug, updateHistory = true) {
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) return;

  blogState.activePostSlug = slug;

  // Toggle view visibility
  const listView = document.getElementById('blogListView');
  const readerView = document.getElementById('blogReaderView');

  if (listView) listView.style.display = 'none';
  if (readerView) {
    readerView.style.display = 'block';
    readerView.classList.add('active');
  }

  // Scroll to top of reading container
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Render Reader Content
  renderArticleReader(slug);

  // Update browser URL without reload
  if (updateHistory) {
    const newUrl = `${window.location.pathname}?slug=${slug}`;
    window.history.pushState({ slug }, post.title[blogState.currentLang], newUrl);
  }

  // Update SEO Document title
  document.title = `${post.title[blogState.currentLang]} | Luxury Machupicchu Peru`;
}

// Render Article Reader UI
function renderArticleReader(slug) {
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) return;

  const lang = blogState.currentLang;
  const dict = blogTranslations[lang];
  const container = document.getElementById('blogReaderContent');
  if (!container) return;

  const currentUrl = window.location.href;

  container.innerHTML = `
    <!-- Top Bar Controls -->
    <div class="reader-header-bar">
      <div class="reader-header-container">
        <button type="button" class="btn-reader-back" onclick="showBlogList()">
          ${dict.btnBackToBlog}
        </button>

        <div class="reader-share-actions">
          <span style="font-family: var(--font-sans); font-size: 0.72rem; color: var(--color-text-muted); text-transform: uppercase;">
            ${dict.shareTitle}
          </span>
          <button type="button" class="reader-share-btn" onclick="shareWhatsApp('${post.slug}')" title="WhatsApp" aria-label="Share via WhatsApp">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.4 1.34-1.92 1.42-.5.09-1.15.12-1.85-.11-.43-.14-.99-.33-1.71-.65-3.04-1.33-5.01-4.42-5.16-4.63-.16-.2-1.23-1.64-1.23-3.13 0-1.49.78-2.22 1.06-2.52.28-.3.61-.38.81-.38.2 0 .41 0 .58.01.19.01.44-.07.69.53.25.61.85 2.08.93 2.23.08.16.13.35.03.55-.1.2-.15.33-.3.51-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.79 1.3 1.69 2.11 1.16 1.03 2.13 1.35 2.44 1.5.31.15.49.13.67-.08.19-.21.79-.92 1-1.24.21-.31.42-.26.7-.16.29.1 1.83.86 2.14 1.02.31.15.52.23.6.36.08.13.08.77-.16 1.45z"/></svg>
          </button>
          <button type="button" class="reader-share-btn" onclick="copyArticleLink()" title="Copy Link" aria-label="Copy link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Header & Hero Details -->
    <div class="reader-hero-wrapper">
      <div class="reader-breadcrumb">
        <a href="index.html">${dict.navHome}</a> &gt; 
        <a href="javascript:void(0)" onclick="showBlogList()">${dict.navBlog}</a> &gt; 
        <span>${post.categoryLabel[lang]}</span>
      </div>

      <h1 class="reader-title">${post.title[lang]}</h1>

      <div class="reader-author-strip">
        <img src="${post.author.avatar}" alt="${post.author.name}" class="reader-author-avatar">
        <div class="reader-author-info">
          <strong>${post.author.name}</strong>
          <span>${post.author.title} • ${post.readTime} ${dict.readTimeSuffix} • ${post.publishDate}</span>
        </div>
      </div>
    </div>

    <!-- Main Featured Media -->
    <div class="reader-featured-media">
      <img src="${post.heroImage}" alt="${post.title[lang]}" onerror="this.src='${post.localHeroFallback}'">
    </div>

    <!-- Article Content -->
    <article class="reader-article-container">
      ${post.content[lang]}
    </article>

    <!-- Related Curated Expeditions -->
    <section class="reader-related-expeditions">
      <div class="related-expeditions-container">
        <div class="related-header">
          <span class="related-kicker">${dict.relatedKicker}</span>
          <h3 class="related-title">${dict.relatedTitle}</h3>
        </div>
        <div class="related-cards-grid">
          ${renderRelatedTours(post)}
        </div>
      </div>
    </section>

    <!-- Bottom Concierge Consultation Banner -->
    <div class="reader-concierge-banner">
      <div class="reader-concierge-container">
        <h3 class="reader-concierge-title">${dict.conciergeBannerTitle}</h3>
        <p class="reader-concierge-text">${dict.conciergeBannerText}</p>
        <div class="reader-concierge-actions">
          <a href="https://wa.me/51958195840?text=${encodeURIComponent('Hello Luxury Machupicchu Concierge, I was reading your guide: ' + post.title[lang] + '. I would like to plan a bespoke journey.')}" target="_blank" rel="noopener" class="btn-concierge-wa">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.4 1.34-1.92 1.42-.5.09-1.15.12-1.85-.11-.43-.14-.99-.33-1.71-.65-3.04-1.33-5.01-4.42-5.16-4.63-.16-.2-1.23-1.64-1.23-3.13 0-1.49.78-2.22 1.06-2.52.28-.3.61-.38.81-.38.2 0 .41 0 .58.01.19.01.44-.07.69.53.25.61.85 2.08.93 2.23.08.16.13.35.03.55-.1.2-.15.33-.3.51-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.79 1.3 1.69 2.11 1.16 1.03 2.13 1.35 2.44 1.5.31.15.49.13.67-.08.19-.21.79-.92 1-1.24.21-.31.42-.26.7-.16.29.1 1.83.86 2.14 1.02.31.15.52.23.6.36.08.13.08.77-.16 1.45z"/></svg>
            <span>${dict.btnConciergeWa}</span>
          </a>
          <a href="index.html#contact" class="btn-read-article">
            <span>${dict.btnInquireForm}</span>
          </a>
        </div>
      </div>
    </div>
  `;
}

// Render Related Tours helper
function renderRelatedTours(post) {
  const lang = blogState.currentLang;
  const dict = blogTranslations[lang];

  // Specific mapping based on post
  let selectedTours = ["belmond-hiram-bingham-pinnacle", "sacred-valley-prive-shamanic-ritual"];
  if (post.id === 'peru-a-country-of-ancient-traditions') {
    selectedTours = ["belmond-hiram-bingham-pinnacle", "belmond-andean-explorer-cusco-titicaca", "classic-inca-trail-vip-glamping"];
  } else if (post.id === 'inkaterra-hacienda-concepcion') {
    selectedTours = ["belmond-hiram-bingham-pinnacle", "sacred-valley-prive-shamanic-ritual"];
  }

  return selectedTours.map(slug => {
    const tour = TOURS_CATALOG[slug];
    if (!tour) return '';
    return `
      <div class="related-tour-card">
        <div class="related-tour-img">
          <img src="${tour.image}" alt="${tour.title[lang]}" loading="lazy">
        </div>
        <div class="related-tour-body">
          <h4 class="related-tour-title">${tour.title[lang]}</h4>
          <a href="tour.html?slug=${tour.slug}" class="related-tour-link">
            ${dict.btnExploreTour}
          </a>
        </div>
      </div>
    `;
  }).join('');
}

// Return back to blog list
function showBlogList(updateHistory = true) {
  blogState.activePostSlug = null;

  const listView = document.getElementById('blogListView');
  const readerView = document.getElementById('blogReaderView');

  if (readerView) {
    readerView.style.display = 'none';
    readerView.classList.remove('active');
  }
  if (listView) listView.style.display = 'block';

  renderCategoryFilters();
  renderBlogList();

  if (updateHistory) {
    const newUrl = window.location.pathname;
    window.history.pushState({}, 'Luxury Machupicchu Peru Blog', newUrl);
  }

  document.title = `${blogTranslations[blogState.currentLang].heroTitle} | Luxury Machupicchu Peru`;
}

// Share Functions
function shareWhatsApp(slug) {
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) return;
  const url = `${window.location.origin}${window.location.pathname}?slug=${slug}`;
  const text = `${post.title[blogState.currentLang]} - ${url}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

function copyArticleLink() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    showToast(blogTranslations[blogState.currentLang].linkCopied);
  });
}

function showToast(msg) {
  let toast = document.getElementById('blogToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'blogToast';
    toast.className = 'blog-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// Mobile drawer navigation toggle
function toggleMenu() {
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  if (drawer && backdrop) {
    drawer.classList.toggle('active');
    backdrop.classList.toggle('active');
  }
}
