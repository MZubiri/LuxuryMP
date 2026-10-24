/**
 * LUXURY MACHUPICCHU PERU - BLOG & TRAVEL GUIDE DATASET
 * Curated content grounded in official guides from lmptravel.com
 * Bilingual (EN / ES) with complete itineraries, climate matrices, and tips
 */

const BLOG_POSTS = [
  {
    id: "when-to-go-peru",
    slug: "when-to-go-peru",
    category: "climate",
    categoryLabel: {
      en: "Planning & Climate",
      es: "Planificación & Clima"
    },
    readTime: 5,
    publishDate: "2025-04-11",
    updatedDate: "2026-07-05",
    author: {
      name: "LMP TRAVEL Concierge",
      title: "Senior Andean Travel Architect",
      avatar: "assets/images/logo-travel.png"
    },
    heroImage: "https://lmptravel.com/wp-content/uploads/2022/12/machupicchu-nublado.jpg",
    localHeroFallback: "assets/images/hero_machu_picchu.jpg",
    gallery: [
      "https://lmptravel.com/wp-content/uploads/2025/04/airport-1822133_640-600x439.jpg",
      "assets/images/Cusco.jpg",
      "assets/images/MachuPicchu.jpg"
    ],
    title: {
      en: "When to Go to Peru: Climate, Health, Currency & Seasons Guide",
      es: "Cuándo Viajar a Perú: Clima, Temporadas, Salud y Consejos Esenciales"
    },
    summary: {
      en: "A comprehensive seasonal guide to Peru's three geographical zones: the Pacific coast, Andean highlands, and Amazon basin. Essential insights on dry vs. wet seasons, currency, altitude acclimatization, and health advice.",
      es: "Guía estacional completa de las tres regiones del Perú: costa, sierra andina y selva amazónica. Información clave sobre temporadas seca y de lluvias, moneda, prevención del soroche y vacunas recomendadas."
    },
    featured: true,
    tags: ["Climate", "Machu Picchu", "Acclimatization", "Travel Tips", "Currency"],
    content: {
      en: `
        <div class="blog-article-lead">
          <p class="lead-text">Planning an unforgettable journey across Peru requires understanding its dramatic geographical diversity. From the Pacific coastal deserts to the sky-piercing peaks of the Andes and the lush Amazonian rainforest, each region follows its own distinct seasonal rhythm.</p>
        </div>

        <div class="concierge-callout-box">
          <div class="concierge-callout-header">
            <span class="callout-icon">✦</span>
            <h4>Atelier Concierge Summary</h4>
          </div>
          <p><strong>Peak Season (High Andes & Machu Picchu):</strong> May through October offers crisp, sunny days and clear skies ideal for train journeys and citadel photography. <strong>Coast & Beaches:</strong> December through April provides warm, sunny summer weather in Lima and the northern beaches.</p>
        </div>

        <h3 id="climate-by-region">1. Climate by Geographical Region</h3>
        <p>Peru is divided into three distinct macro-regions, each with contrasting microclimates:</p>

        <div class="climate-grid-comparison">
          <div class="climate-card">
            <div class="climate-card-badge">THE PACIFIC COAST</div>
            <h4>Lima, Paracas & North Coast</h4>
            <ul class="climate-bullet-list">
              <li><strong>Summertime (December to April):</strong> Warm, sunny and dry with temperatures between 25°C and 35°C (77°F - 95°F). Perfect for coastal gastronomy and Paracas boat expeditions.</li>
              <li><strong>Wintertime (May to November):</strong> The temperature moderates to 15°C - 20°C (59°F - 68°F) with characteristic coastal mist (<em>garúa</em>) and cloudy skies influenced by the cold Humboldt ocean current.</li>
            </ul>
          </div>

          <div class="climate-card highlight-card">
            <div class="climate-card-badge">THE ANDEAN SIERRA</div>
            <h4>Cusco, Sacred Valley & Machu Picchu</h4>
            <ul class="climate-bullet-list">
              <li><strong>Dry Season (April to October):</strong> Bright, radiant days (20°C - 25°C / 68°F - 77°F) with virtually no rain. Crisp, cold evenings dropping near or below freezing (0°C - 5°C). Ideal for Belmond train journeys and trekking.</li>
              <li><strong>Wet Season (November to April):</strong> Fresh, lush mornings with frequent afternoon showers. Machu Picchu displays mystical mist and dramatic cloud formations. January and February see the heaviest rainfall.</li>
            </ul>
          </div>

          <div class="climate-card">
            <div class="climate-card-badge">THE AMAZON BASIN</div>
            <h4>Tambopata, Puerto Maldonado & Iquitos</h4>
            <ul class="climate-bullet-list">
              <li><strong>Dry Season (April to October):</strong> Warm temperatures up to 35°C (95°F). Occasional nocturnal cold fronts (<em>friajes</em>) from Patagonia can briefly lower temperatures.</li>
              <li><strong>Wet Season (November to April):</strong> High humidity, daily tropical downpours, and elevated river levels facilitating deep canoe navigation.</li>
            </ul>
          </div>
        </div>

        <h3 id="time-zone-currency">2. Time Zone & Currency in Cusco</h3>
        <p>Peru observes Peru Time (PET, GMT -5) year-round. There are no daylight saving clock adjustments.</p>
        <p>The official national currency is the <strong>Peruvian Sol (S/)</strong>, available in banknotes of 10, 20, 50, 100, and 200 soles, and coins of 10, 20, 50 cents, and 1, 2, and 5 soles. The <strong>United States Dollar ($ USD)</strong> is widely accepted in luxury hotels, fine restaurants, high-end shops, and by private tour operators.</p>
        
        <div class="concierge-tip-note">
          <strong>Concierge Tip on Currency:</strong> Ensure any US Dollar cash banknotes you carry are crisp, clean, and completely free of tears or marks, as Peruvian banks and merchants strictly decline imperfect foreign bills. ATMs connected to Visa/Plus and Mastercard/Cirrus are readily available throughout Cusco and Lima.
        </div>

        <h3 id="gratuities-airports">3. Gratuities, Airports & Customs Regulations</h3>
        <p><strong>Staff Gratuities:</strong> While discretionary, a standard recognition for exceptional private master guides is approximately $10 to $20 USD per day for the party, and $5 to $10 USD per day for private chauffeurs.</p>
        <p><strong>Domestic Airports:</strong> The primary air travel hubs include Lima (Jorge Chávez International - LIM), Cusco (Alejandro Velasco Astete - CUZ), Arequipa (AQP), and Puerto Maldonado (PEM). In virtually all commercial tickets, the domestic airport usage fee (TUUA) is pre-included.</p>
        <p><strong>Customs Duty Exemption:</strong> In accordance with Peruvian customs regulations, all personal clothing, professional photography gear, personal laptops, and reasonable personal-use items enter duty-free. Travelers must declare any commercial-quantity items upon arrival.</p>

        <h3 id="health-altitude">4. Health, Acclimatization & Altitude Sickness Prevention</h3>
        <p>Cusco sits at 3,400 meters (11,150 feet) above sea level. Proper altitude acclimatization ensures a seamless and comfortable journey:</p>
        
        <div class="health-checklist">
          <div class="health-item">
            <span class="health-check">✓</span>
            <div>
              <strong>Sacred Valley First Strategy:</strong>
              <p>Whenever possible, transfer directly upon arrival at Cusco airport down to the Sacred Valley of the Incas (2,870m / 9,400ft). Spending your first 2 to 3 nights at this lower elevation prevents acute altitude distress.</p>
            </div>
          </div>
          <div class="health-item">
            <span class="health-check">✓</span>
            <div>
              <strong>Pacing & Hydration:</strong>
              <p>Drink ample water, sip traditional coca leaf or muña herbal tea, eat light meals for dinner during the first 48 hours, and abstain from heavy alcohol consumption.</p>
            </div>
          </div>
          <div class="health-item">
            <span class="health-check">✓</span>
            <div>
              <strong>High Altitude UV Protection:</strong>
              <p>Solar radiation in the Andes is exceptionally potent. Adopt the classic rule: slip on UV clothing, slap on a wide-brim hat, and slop on SPF 50+ mineral sunscreen.</p>
            </div>
          </div>
          <div class="health-item">
            <span class="health-check">✓</span>
            <div>
              <strong>Vaccinations for Jungle Experiences:</strong>
              <p>Yellow fever vaccination is strongly recommended for travelers venturing into the Amazon rainforest (Madre de Dios, Tambopata, Loreto) and must be administered at least 10 days prior to arrival. Yellow fever is non-existent in Lima, Cusco, and Machu Picchu.</p>
            </div>
          </div>
        </div>
      `,
      es: `
        <div class="blog-article-lead">
          <p class="lead-text">Planificar un viaje inolvidable por el Perú exige comprender su fascinante diversidad geográfica. Desde los desiertos de la costa pacífica hasta las cumbres andinas y la selva amazónica, cada territorio obedece a un régimen climático particular.</p>
        </div>

        <div class="concierge-callout-box">
          <div class="concierge-callout-header">
            <span class="callout-icon">✦</span>
            <h4>Resumen del Atelier Concierge</h4>
          </div>
          <p><strong>Temporada Óptima (Andes & Machu Picchu):</strong> De mayo a octubre predominan cielos diáfanos, sol radiante y ausencia casi total de lluvias. <strong>Costa & Playas:</strong> De diciembre a abril es verano soleado en Lima y las playas del norte.</p>
        </div>

        <h3 id="climate-by-region">1. Clima según Región Geográfica</h3>
        <p>El Perú cuenta con tres macro-regiones naturales claramente diferenciadas:</p>

        <div class="climate-grid-comparison">
          <div class="climate-card">
            <div class="climate-card-badge">COSTA DEL PACÍFICO</div>
            <h4>Lima, Paracas y Costa Norte</h4>
            <ul class="climate-bullet-list">
              <li><strong>Verano (diciembre a abril):</strong> Cálido, seco y soleado con temperaturas entre 25°C y 35°C. Época predilecta para la gastronomía marina y sobrevuelos en Paracas y Nazca.</li>
              <li><strong>Invierno (mayo a noviembre):</strong> Temperatura templada (15°C a 20°C) acompañada de la clásica neblina o <em>garúa</em> costeña producida por la corriente fría de Humboldt.</li>
            </ul>
          </div>

          <div class="climate-card highlight-card">
            <div class="climate-card-badge">SIERRA ANDINA</div>
            <h4>Cusco, Valle Sagrado y Machu Picchu</h4>
            <ul class="climate-bullet-list">
              <li><strong>Temporada Seca (abril a octubre):</strong> Días soleados y luminosos (20°C a 25°C) con noches frías que descienden cerca de los 0°C. Condiciones perfectas para los viajes en tren Belmond y recorridos a pie.</li>
              <li><strong>Temporada de Lluvias (noviembre a abril):</strong> Mañanas despejadas y chubascos por la tarde. El santuario luce un verdor espectacular con bancos de niebla mística. Enero y febrero registran las mayores precipitaciones.</li>
            </ul>
          </div>

          <div class="climate-card">
            <div class="climate-card-badge">SELVA AMAZÓNICA</div>
            <h4>Tambopata, Puerto Maldonado e Iquitos</h4>
            <ul class="climate-bullet-list">
              <li><strong>Temporada Seca (abril a octubre):</strong> Caluroso con temperaturas de hasta 35°C. Frentes fríos esporádicos (<em>friajes</em>) pueden refrescar las noches.</li>
              <li><strong>Temporada Húmeda (noviembre a abril):</strong> Elevada humedad, chaparrones tropicales y ríos en su máximo caudal, ideales para navegar en canoa.</li>
            </ul>
          </div>
        </div>

        <h3 id="time-zone-currency">2. Huso Horario y Moneda en Cusco</h3>
        <p>El huso horario del Perú es GMT -5 durante todo el año, sin cambios de horario de verano.</p>
        <p>La moneda oficial es el <strong>Sol (S/)</strong>, con billetes de 10, 20, 50, 100 y 200 soles, y monedas de 10, 20 y 50 céntimos, además de 1, 2 y 5 soles. El <strong>Dólar Estadounidense ($ USD)</strong> es ampliamente recibido en hoteles de lujo, restaurantes de autor y operadores turísticos.</p>
        
        <div class="concierge-tip-note">
          <strong>Tip del Concierge sobre Dólares:</strong> Asegúrese de que los billetes de dólar en efectivo se encuentren en perfecto estado, sin roturas, sellos ni manchas, ya que el sistema bancario y los comercios peruanos no aceptan billetes deteriorados. Hay cajeros automáticos conectados a Visa y Mastercard en Lima y Cusco.
        </div>

        <h3 id="gratuities-airports">3. Propinas, Aeropuertos y Franquicia de Aduanas</h3>
        <p><strong>Propinas:</strong> Aunque quedan a discreción del viajero, una sugerencia habitual para guías privados de alta gama es de $10 a $20 USD por día por grupo, y de $5 a $10 USD diarios para choferes privados.</p>
        <p><strong>Aeropuertos Nacionales:</strong> Los principales terminales aéreos son Lima (Jorge Chávez - LIM), Cusco (Velasco Astete - CUZ), Arequipa (AQP) y Puerto Maldonado (PEM). La tasa de uso de aeropuerto (TUUA) ya viene incluida en los boletos aéreos.</p>
        <p><strong>Aduanas y Equipaje Libre de Impuestos:</strong> De acuerdo a la normativa de aduanas peruana, todo viajero puede ingresar libre de aranceles sus artículos de uso personal, computadoras portátiles, cámaras profesionales y medicinas para su consumo.</p>

        <h3 id="health-altitude">4. Salud y Prevención del Mal de Altura (Soroche)</h3>
        <p>Cusco se ubica a 3,400 metros de altitud. Para garantizar una experiencia de máximo confort, recomendamos:</p>
        
        <div class="health-checklist">
          <div class="health-item">
            <span class="health-check">✓</span>
            <div>
              <strong>Descenso Inmediato al Valle Sagrado:</strong>
              <p>Tras aterrizar en Cusco, trasládese directamente al Valle Sagrado de los Incas (2,870 m). Hospedarse las primeras 2 o 3 noches a menor altura permite una aclimatación progresiva sin malestar.</p>
            </div>
          </div>
          <div class="health-item">
            <span class="health-check">✓</span>
            <div>
              <strong>Hidratación y Comidas Ligeras:</strong>
              <p>Beba abundante agua, infusiones de hoja de coca o muña, opte por cenas ligeras en las primeras 48 horas y modere el consumo de alcohol.</p>
            </div>
          </div>
          <div class="health-item">
            <span class="health-check">✓</span>
            <div>
              <strong>Protección Solar Extrema:</strong>
              <p>La radiación ultravioleta en la cordillera andina es muy intensa. Aplique protector solar FPS 50+, sombrero de ala ancha y lentes con filtro UV.</p>
            </div>
          </div>
          <div class="health-item">
            <span class="health-check">✓</span>
            <div>
              <strong>Vacunas para la Selva:</strong>
              <p>La vacuna contra la fiebre amarilla es recomendada para la selva amazónica (Madre de Dios, Tambopata) y debe aplicarse al menos 10 días antes. No se requiere para Lima, Cusco ni Machu Picchu.</p>
            </div>
          </div>
        </div>
      `
    }
  },
  {
    id: "useful-information-about-peru",
    slug: "useful-information-about-peru",
    category: "visas",
    categoryLabel: {
      en: "Visas & Requirements",
      es: "Requisitos & Visas"
    },
    readTime: 4,
    publishDate: "2025-04-10",
    updatedDate: "2026-07-05",
    author: {
      name: "LMP TRAVEL Legal & Concierge",
      title: "Government Tourism Liaison",
      avatar: "assets/images/logo-travel.png"
    },
    heroImage: "https://lmptravel.com/wp-content/uploads/2025/03/lima-land-inkas.gif",
    localHeroFallback: "assets/images/Cusco.jpg",
    gallery: [
      "https://lmptravel.com/wp-content/uploads/2025/03/peru-llama-web-1.png",
      "assets/images/legal/mincetur_agencia_registrada.png"
    ],
    title: {
      en: "Useful Information About Peru: Passports, Visas & Entry Regulations",
      es: "Información Útil para Viajar a Perú: Pasaportes, Visas y Requisitos de Entrada"
    },
    summary: {
      en: "Key legal and migration requirements for visiting Peru: 6-month passport validity, visa-exempt nationalities (USA, UK, Canada, EU, Australia), 90-day tourist entry conditions, and tax benefits.",
      es: "Requisitos migratorios y normativos indispensables para ingresar al Perú: vigencia de pasaporte de 6 meses, nacionalidades exoneradas de visa de turista (EE.UU., Europa, Canadá, Australia) y exoneración del IGV."
    },
    featured: false,
    tags: ["Passports", "Visas", "Migraciones", "Tax Exemption", "Legal Requirements"],
    content: {
      en: `
        <div class="blog-article-lead">
          <p class="lead-text">Preparing your arrival into Peru is straightforward when you possess accurate, verified official information. Here is the definitive legal summary governing tourist visas, passport validity, and entry documents enforced by the National Superintendence of Migrations (Migraciones Peru).</p>
        </div>

        <h3 id="passport-validity">1. Passport Validity (6-Month Rule)</h3>
        <p>All foreign nationals entering Peruvian territory must hold a valid, machine-readable or biometric passport issued by their home government with a <strong>minimum validity of six (6) months</strong> counting from the projected date of entry into the country.</p>

        <h3 id="visa-exemptions">2. Visa Exemptions for Leisure Travelers</h3>
        <p>Citizens of the following countries and jurisdictions <strong>do NOT require a tourist visa</strong> to visit Peru for leisure or cultural exploration:</p>
        <ul class="styled-feature-list">
          <li><strong>North America:</strong> United States of America, Canada, Mexico.</li>
          <li><strong>Europe:</strong> United Kingdom, all European Union member states, Switzerland, Norway, Iceland.</li>
          <li><strong>Oceania:</strong> Australia, New Zealand.</li>
          <li><strong>South America:</strong> Argentina, Brazil, Chile, Colombia, Ecuador, Uruguay, Paraguay, Bolivia.</li>
        </ul>
        <p><em>Note:</em> Travelers entering Peru to conduct formal business contracts or legal investments must apply for a specific Business Visa (Visa de Negocios) at a Peruvian consulate prior to departure.</p>

        <h3 id="length-of-stay">3. Maximum Permitted Length of Stay</h3>
        <p>Upon entry at the international airport or border checkpoint, immigration authorities grant tourists an authorized stay of <strong>up to 90 continuous days</strong>. In accordance with current Peruvian migration directives, tourist stays cannot be extended once inside the country. If you intend to stay longer for academic or professional reasons, appropriate visas must be secured in advance.</p>

        <div class="concierge-callout-box">
          <div class="concierge-callout-header">
            <span class="callout-icon">⚖️</span>
            <h4>Tax Incentive: 0% IGV Exemption for International Tourists (D.L. 919)</h4>
          </div>
          <p>Under Peruvian Legislative Decree N° 919 for the promotion of receptive tourism, foreign tourists who reside abroad are <strong>exempt from the 18% Value Added Tax (IGV)</strong> on hotel accommodations and packaged tour experiences when presenting their original passport and digital migration entry record (TAM virtual).</p>
        </div>

        <h3 id="special-travel-docs">4. Special Travel Documents & Minors</h3>
        <ul class="styled-feature-list">
          <li><strong>Laissez-Passer & Humanitarian Documents:</strong> Valid travel letters of safe-conduct recognized under international treaties to which Peru is a signatory are accepted under specific approved conditions.</li>
          <li><strong>Traveling with Minors:</strong> When a child travels accompanied by both parents, standard passports suffice. When traveling with only one parent or unaccompanied, certified legal authorizations may be required depending on nationality and departure origin.</li>
        </ul>
      `,
      es: `
        <div class="blog-article-lead">
          <p class="lead-text">Preparar su llegada al Perú es un proceso ágil y transparente cuando se cuenta con información oficial actualizada. A continuación, resumimos las normas vigentes reguladas por la Superintendencia Nacional de Migraciones y el Ministerio de Relaciones Exteriores.</p>
        </div>

        <h3 id="passport-validity">1. Vigencia Mínima de Pasaporte (Regla de los 6 Meses)</h3>
        <p>Todo ciudadano extranjero que desee ingresar a territorio peruano debe presentar un pasaporte biométrico o mecanizado legítimamente expedido, con una <strong>vigencia mínima de seis (6) meses</strong> contados a partir de la fecha de arribo al país.</p>

        <h3 id="visa-exemptions">2. Países Exonerados de Visa de Turismo</h3>
        <p>Los ciudadanos de las siguientes regiones y países <strong>no requieren visa de turista</strong> para viajes de placer o vacaciones en el Perú:</p>
        <ul class="styled-feature-list">
          <li><strong>Norteamérica:</strong> Estados Unidos de América, Canadá y México.</li>
          <li><strong>Europa:</strong> Reino Unido, todos los Estados miembros de la Unión Europea, Suiza, Noruega e Islandia.</li>
          <li><strong>Oceanía:</strong> Australia y Nueva Zelanda.</li>
          <li><strong>América del Sur:</strong> Argentina, Brasil, Chile, Colombia, Ecuador, Uruguay, Paraguay y Bolivia.</li>
        </ul>
        <p><em>Nota:</em> Quienes viajen para suscribir contratos mercantiles o gestiones empresariales requieren tramitar una Visa de Negocios en el consulado peruano correspondiente antes de iniciar su vuelo.</p>

        <h3 id="length-of-stay">3. Tiempo Máximo de Permanencia</h3>
        <p>La autoridad migratoria otorga a los turistas una estadía máxima de <strong>hasta 90 días no prorrogables</strong>. Si el motivo de viaje es de trabajo, voluntariado o estudios, debe solicitarse la visa pertinente ante el consulado peruano antes de salir del país de origen.</p>

        <div class="concierge-callout-box">
          <div class="concierge-callout-header">
            <span class="callout-icon">⚖️</span>
            <h4>Beneficio Tributario: 0% de IGV para Turistas Extranjeros (D.L. 919)</h4>
          </div>
          <p>En virtud del Decreto Legislativo N° 919 de fomento al turismo receptivo, los visitantes extranjeros no domiciliados disfrutan de <strong>exoneración del 18% de IGV</strong> en servicios hoteleros y paquetes turísticos presentando su pasaporte original y registro migratorio virtual (TAM).</p>
        </div>

        <h3 id="special-travel-docs">4. Salvoconductos y Viajes con Menores</h3>
        <ul class="styled-feature-list">
          <li><strong>Salvoconductos y Documentos de Refugio:</strong> Se admiten documentos de viaje de emergencia o Laissez-Passer formalmente reconocidos en convenios internacionales suscritos por el Estado Peruano.</li>
          <li><strong>Ingreso de Menores de Edad:</strong> Al viajar con ambos progenitores solo se requiere pasaporte vigente. Si el menor viaja solo o con uno de sus padres, se aconseja portar autorización notarial legalizada de viaje según la normativa de su país de origen.</li>
        </ul>
      `
    }
  },
  {
    id: "peru-a-country-of-ancient-traditions",
    slug: "peru-a-country-of-ancient-traditions",
    category: "traditions",
    categoryLabel: {
      en: "Ancient Traditions & Wonders",
      es: "Tradiciones Milenarias & Joyas"
    },
    readTime: 7,
    publishDate: "2025-04-11",
    updatedDate: "2026-07-05",
    author: {
      name: "LMP TRAVEL Master Historian",
      title: "Andean Heritage & Archaeology Curator",
      avatar: "assets/images/logo-travel.png"
    },
    heroImage: "https://lmptravel.com/wp-content/uploads/2025/04/mosaico-primcipal-peru-1-e1744780425609.gif",
    localHeroFallback: "assets/images/hero_machu_picchu.jpg",
    gallery: [
      "https://lmptravel.com/wp-content/uploads/2025/04/historic-centre-lima-peru-1024x682.jpg",
      "https://lmptravel.com/wp-content/uploads/2025/04/islas-ballestas-1024x683.jpg",
      "https://lmptravel.com/wp-content/uploads/2025/04/huacachina-1-1024x603.jpg",
      "https://lmptravel.com/wp-content/uploads/2025/04/arequipa-43282_1280-1024x768.jpg",
      "https://lmptravel.com/wp-content/uploads/2025/04/peru-2817321_1280-1024x682.jpg",
      "https://lmptravel.com/wp-content/uploads/2025/04/cusco-peru-2025-1-1024x492.jpg",
      "https://lmptravel.com/wp-content/uploads/2025/04/cerro-ciete-colores-1024x640.jpg",
      "https://lmptravel.com/wp-content/uploads/2025/04/lagoon-4274318_1280-1024x768.jpg"
    ],
    title: {
      en: "Peru: A Country of Ancient Traditions, Gastronomy & Breathtaking Wonders",
      es: "Perú: País de Tradiciones Milenarias, Gastronomía y Maravillas Naturales"
    },
    summary: {
      en: "From the colonial splendour of Lima and the marine riches of Paracas to the White City of Arequipa, high Lake Titicaca, the imperial alleys of Cusco, Machu Picchu, Rainbow Mountain, and Humantay Lake.",
      es: "Un recorrido inolvidable: la gastronomía de Lima, la fauna de Paracas e Islas Ballestas, la Ciudad Blanca de Arequipa, el Lago Titicaca, Cusco imperial, Machu Picchu, la Montaña de 7 Colores y la Laguna Humantay."
    },
    featured: true,
    tags: ["Culture", "Machu Picchu", "Cusco", "Lake Titicaca", "Rainbow Mountain", "Humantay"],
    content: {
      en: `
        <div class="blog-article-lead">
          <p class="lead-text">Peru is a realm where millenary civilizations, vibrant folklore, world-acclaimed culinary artistry, and extraordinary landscapes unite. Few nations on earth possess such staggering geographical breadth—from coastal dunes and wildlife-rich marine reserves to snow-crowned 6,000-meter peaks and the planet's most biodiverse rainforests.</p>
        </div>

        <h3 id="lima-capital">1. Lima (101m a.s.l.): The Gastronomic & Colonial Heart</h3>
        <p>The second-largest desert city on the planet, Lima is an ever-evolving metropolis of over 10 million inhabitants. Here, pre-Inca sacred pyramids (<em>huacas</em>) in Miraflores and San Isidro stand in striking contrast alongside avant-garde culinary temples such as Central and Maido. The UNESCO-listed Historic Centre unveils baroque colonial monasteries, ornate carved cedar balconies, and the historic Plaza Mayor.</p>

        <h3 id="south-coast">2. The South Coast: Islas Ballestas, Paracas & Huacachina Oasis</h3>
        <p>Heading south along the Pan-American highway, the coastal desert gives way to breathtaking natural preserves:</p>
        <ul class="styled-feature-list">
          <li><strong>Islas Ballestas (0m):</strong> Often dubbed Peru’s Little Galapagos, these dramatic sea archipelagos are home to thousands of sea lions, Humboldt penguins, Peruvian boobies, and guano bird colonies, accessible only via private speedboats.</li>
          <li><strong>Paracas National Reserve (7m):</strong> A protected coastal desert spanning 335,000 hectares, safeguarding 216 bird species, flamingos, marine fossils, and the enigmatic <em>Candelabro</em> geoglyph.</li>
          <li><strong>Huacachina Oasis (406m):</strong> A shimmering emerald lagoon encircled by towering golden sand dunes, renowned worldwide for luxury sandboarding and high-speed dune buggy excursions.</li>
          <li><strong>Nazca Lines:</strong> Colossal geometric drawings and zoomorphic geoglyphs etched into the desert plateaus, best admired from an exclusive scenic flight.</li>
        </ul>

        <h3 id="arequipa-colca">3. Arequipa (2,335m a.s.l.) & The Colca Canyon</h3>
        <p>Guarded by the snow-capped volcanic cone of El Misti, Arequipa is Peru's "White City," constructed from pearlescent volcanic <em>sillar</em> stone. Beyond its elegant Plaza de Armas and the vast Santa Catalina Monastery lies the colossal Colca Canyon—twice as deep as the Grand Canyon—where the majestic Andean Condor glides on thermal morning updrafts.</p>

        <h3 id="titicaca-puno">4. Puno & Lake Titicaca (3,812m a.s.l.)</h3>
        <p>The highest navigable lake on earth, Titicaca mirrors an intensely azure Altiplano sky. Ancient civilizations continue their traditions on the floating totora-reed islands of Uros and the UNESCO-recognized textile community of Taquile Island, where weaving techniques have been safeguarded for generations.</p>

        <h3 id="cusco-machupicchu">5. Cusco Imperial (3,400m) & Machu Picchu (2,430m)</h3>
        <p>The historical navel of the Inca empire, Cusco boasts massive megalithic foundations fitted without mortar, crowned with Spanish renaissance architecture. Down in the subtropical cloud forest lies <strong>Machu Picchu</strong>, the crowning Wonder of the Modern World. Enclosed by emerald mountain peaks and the roaring Urubamba River, its sacred temples and astronomical terraces remain unmatched in majesty.</p>

        <h3 id="vinicunca-humantay">6. Vinicunca (5,200m) & Humantay Glacial Lake (4,200m)</h3>
        <p>Among the Andes' most mesmerizing geological wonders:</p>
        <ul class="styled-feature-list">
          <li><strong>Vinicunca (Rainbow Mountain):</strong> 14 distinct mineral stratifications formed over millennia—turquoise chlorite, lavender claystones, golden limestones, and bright red iron oxides—create a surreal striped spectrum at 5,200 meters.</li>
          <li><strong>Humantay Lake:</strong> A sacred emerald-turquoise glacial lagoon fed by melting snowcaps of Mount Salkantay, held sacred as an ancient offering site to Pachamama (Mother Earth).</li>
        </ul>
      `,
      es: `
        <div class="blog-article-lead">
          <p class="lead-text">El Perú es un territorio donde conviven civilizaciones milenarias, una gastronomía laureada en los más altos certámenes internacionales y paisajes de belleza sobrecogedora. Pocos países en el mundo ofrecen tal variedad: desde dunas desérticas y reservas marinas hasta cumbres nevadas de más de 6,000 metros y la selva más biodiversa del planeta.</p>
        </div>

        <h3 id="lima-capital">1. Lima (101 m s.n.m.): Capital Gastronómica y Virreinal</h3>
        <p>La segunda ciudad más grande del mundo erigida sobre un desierto, Lima reúne a más de 10 millones de habitantes. En distritos como Miraflores y San Isidro, las huacas preíncas coexisten con restaurantes de clase mundial como Central y Maido. En su Centro Histórico, declarado Patrimonio Cultural de la Humanidad por la UNESCO, destacan conventos barrocos, balcones virreinales de cedro tallado y la majestuosa Plaza Mayor.</p>

        <h3 id="south-coast">2. Costa Sur: Islas Ballestas, Paracas y el Oasis de Huacachina</h3>
        <p>Al sur de Lima, el desierto costeño se abre paso hacia asombrosos santuarios de vida salvaje:</p>
        <ul class="styled-feature-list">
          <li><strong>Islas Ballestas (0 m):</strong> Célebres por sus formaciones rocosas donde habitan lobos marinos, pingüinos de Humboldt y millones de aves guaneras, accesibles en lanchas a motor.</li>
          <li><strong>Reserva Nacional de Paracas (7 m):</strong> Más de 335,000 hectáreas protegidas de desierto y mar donde conviven 216 especies de aves, flamencos y el misterioso geoglifo de <em>El Candelabro</em>.</li>
          <li><strong>Oasis de Huacachina (406 m):</strong> Una pintoresca laguna esmeralda rodeada de palmeras y colosales dunas de arena dorada, famosa mundialmente para la práctica del sandboard y paseos en carros tubulares (buggies).</li>
          <li><strong>Líneas de Nazca:</strong> Enigmáticos geoglifos trazados en las pampas desérticas que solo revelan sus formas zoomorfas completas (el colibrí, el mono, el cóndor) desde un vuelo panorámico.</li>
        </ul>

        <h3 id="arequipa-colca">3. Arequipa (2,335 m s.n.m.) y el Cañón del Colca</h3>
        <p>Bajo la mirada del volcán Misti, la Ciudad Blanca de Arequipa luce hermosas casonas e iglesias talladas en sillar volcánico. A pocas horas se despliega el Cañón del Colca, uno de los más profundos del planeta, escenario predilecto para contemplar el vuelo majestuoso del Cóndor Andino.</p>

        <h3 id="titicaca-puno">4. Puno y el Lago Titicaca (3,812 m s.n.m.)</h3>
        <p>El lago navegable más alto del mundo refleja la luz cristalina del Altiplano. Sus habitantes preservan costumbres ancestrales en las islas flotantes de totora de los Uros y en la isla de Taquile, célebre por su arte textil reconocido como Patrimonio Inmaterial de la Humanidad.</p>

        <h3 id="cusco-machupicchu">5. Cusco Imperial (3,400 m) y la Maravilla de Machu Picchu (2,430 m)</h3>
        <p>Capital del imperio del Tahuantinsuyo, Cusco conserva ciclópeos muros de piedra ensamblados sin argamasa que sirven de base a templos y palacios coloniales. En plena ceja de selva se erige la ciudadela sagrada de <strong>Machu Picchu</strong>, Maravilla del Mundo Moderno rodeada de frondosos bosques de niebla y picos graníticos.</p>

        <h3 id="vinicunca-humantay">6. Vinicunca (5,200 m) y la Laguna Humantay (4,200 m)</h3>
        <p>Dos de las formaciones naturales más deslumbrantes de la cordillera del Vilcanota:</p>
        <ul class="styled-feature-list">
          <li><strong>Montaña de Siete Colores (Vinicunca):</strong> Su superficie exhibe franjas de 14 minerales sedimentarios (turquesa, lavanda, dorado, rosa y rojo óxido) a 5,200 metros de altitud.</li>
          <li><strong>Laguna Humantay:</strong> Espejo de agua color turquesa alimentado por los glaciares del nevado Salkantay, venerado como sitio sagrado de pago a la Pachamama.</li>
        </ul>
      `
    }
  },
  {
    id: "guide-to-planning-a-luxury-tour-of-peru",
    slug: "guide-to-planning-a-luxury-tour-of-peru",
    category: "luxury-planning",
    categoryLabel: {
      en: "Luxury Tour Planning",
      es: "Guía de Viaje de Lujo"
    },
    readTime: 6,
    publishDate: "2025-04-09",
    updatedDate: "2026-07-05",
    author: {
      name: "Maritza Miranda Ochoa",
      title: "Founder & Master Travel Architect",
      avatar: "assets/images/logo-travel.png"
    },
    heroImage: "https://lmptravel.com/wp-content/uploads/2025/03/peru-llama-web-1.png",
    localHeroFallback: "assets/images/spotlight_hiram_bingham.jpg",
    gallery: [
      "assets/images/hiram_bingham_main.jpg",
      "assets/images/hiram_bingham_musicians.jpg",
      "assets/images/sacred_valley_maras_main.jpg",
      "assets/images/andean_explorer_main.jpg"
    ],
    title: {
      en: "The Connoisseur's Guide to Planning a Luxury Tour of Peru",
      es: "Guía de Alta Gama para Planificar una Experiencia de Lujo por Perú"
    },
    summary: {
      en: "Mastering the art of bespoke travel across the Land of the Incas: Belmond Hiram Bingham rail logistics, private archaeologist curation, sacred valley acclimatization, and five-star sanctuary access.",
      es: "Cómo diseñar un viaje privado impecable por el imperio inca: trenes Belmond de época, arqueólogos privados certificados, hoteles de colección en el Valle Sagrado y accesos preferenciales al santuario."
    },
    featured: true,
    tags: ["Luxury Travel", "Belmond Hiram Bingham", "Bespoke Itinerary", "Private Archaeologist", "Fine Dining"],
    content: {
      en: `
        <div class="blog-article-lead">
          <p class="lead-text">Peru is frequently revered as the "Land of the Incas." While ancient stone ruins, sacred valleys, and enigmatic mountain temples form its soul, exploring this wondrous country in consummate luxury transforms a vacation into a once-in-a-lifetime private odyssey.</p>
        </div>

        <h3 id="the-haute-couture-approach">1. The Haute Couture Approach to Andean Travel</h3>
        <p>Standard group travel often involves crowded tourist shuttles, prolonged queues, and impersonal guides. A true luxury tour replaces logistical friction with effortless elegance:</p>
        <ul class="styled-feature-list">
          <li><strong>Private Rail Carriages:</strong> Boarding the legendary <em>Belmond Hiram Bingham</em> with 1920s Pullman-style polished woods, live Andean acoustic melodies, fine dining, and open-bar observation cars.</li>
          <li><strong>Private Master Archaeologists:</strong> Touring Machu Picchu not with generic guides, but with certified academic historians who uncover celestial alignments and ceremonial masonry at your own unhurried pace.</li>
          <li><strong>Seamless Luggage Concierge:</strong> All suitcases are handled from private airport tarmac greetings straight to luxury hotel suites without you lifting a bag.</li>
        </ul>

        <h3 id="pacing-itinerary">2. The Golden Rule of Itinerary Pacing</h3>
        <p>The single greatest mistake travelers make is rushing from sea level directly into intense physical walking at 3,400 meters. Our recommended high-couture blueprint:</p>
        
        <div class="itinerary-timeline-box">
          <div class="timeline-step">
            <span class="step-num">01</span>
            <div class="step-content">
              <strong>Days 1 - 2: Coastal Sophistication in Lima</strong>
              <p>Acclimatize at sea level with private tasting menus at Central or Astrid & Gastón, private museum collections at Larco, and ocean-view suites in Miraflores.</p>
            </div>
          </div>
          <div class="timeline-step">
            <span class="step-num">02</span>
            <div class="step-content">
              <strong>Days 3 - 5: Gentle Mountain Descent into the Sacred Valley (2,870m)</strong>
              <p>Upon landing in Cusco, transfer straight down to the Sacred Valley. Settle into Belmond Hotel Río Sagrado or Tambo del Inka. Experience private salt mines at Maras, Moray terraces, and ancestral shamanic blessings in total comfort.</p>
            </div>
          </div>
          <div class="timeline-step">
            <span class="step-num">03</span>
            <div class="step-content">
              <strong>Day 6: The Belmond Hiram Bingham to Machu Picchu Citadel</strong>
              <p>Travel in golden-era glamour, savoring brunch and Pisco sours, followed by private afternoon entry into the sanctuary when day-trip crowds have already departed.</p>
            </div>
          </div>
          <div class="timeline-step">
            <span class="step-num">04</span>
            <div class="step-content">
              <strong>Days 7 - 9: Imperial Cusco & Belmond Andean Explorer Rail</strong>
              <p>Fully acclimatized, ascend to Cusco (3,400m) for boutique heritage stays at Belmond Hotel Monasterio. Optional continuation aboard South America's first luxury sleeper train toward Lake Titicaca and Arequipa.</p>
            </div>
          </div>
        </div>

        <div class="concierge-callout-box">
          <div class="concierge-callout-header">
            <span class="callout-icon">✦</span>
            <h4>Advance Booking Window Advisory</h4>
          </div>
          <p>Official daily entrance tickets to Machu Picchu Circuits 1 & 2, as well as Belmond Hiram Bingham seats, are strictly capped by the Ministry of Culture and PeruRail. We advise reserving your luxury travel dates at least <strong>4 to 6 months in advance</strong> to secure premier morning time slots and luxury train allocations.</p>
        </div>
      `,
      es: `
        <div class="blog-article-lead">
          <p class="lead-text">El Perú es frecuentemente llamado la "Tierra de los Incas". Si bien sus enigmas arqueológicos y paisajes montañosos cautivan al viajero, recorrer esta tierra bajo un concepto de alta costura transforma unas vacaciones en una odisea privada de distinción inigualable.</p>
        </div>

        <h3 id="the-haute-couture-approach">1. El Concepto de Alta Costura en Viajes Andinos</h3>
        <p>El turismo masivo convencional suele someter al viajero a largas colas, buses abarrotados y guías genéricos. Una expedición de lujo suprime toda fricción logística para brindar confort absoluto:</p>
        <ul class="styled-feature-list">
          <li><strong>Vagones de Tren de Gran Lujo:</strong> Embarque exclusivo en el <em>Belmond Hiram Bingham</em>, decorado al estilo Pullman de los años 20 con maderas nobles, orquesta en vivo, gastronomía gourmet y coche observatorio con barra libre de cócteles.</li>
          <li><strong>Arqueólogos Privados Certificados:</strong> Descubra Machu Picchu de la mano de historiadores de renombre que revelan la astronomía y el simbolismo inca a su propio ritmo.</li>
          <li><strong>Concierge de Equipaje Privado:</strong> Sus maletas se trasladan de forma invisible desde la pista de aterrizaje hasta la suite de su hotel sin preocupaciones.</li>
        </ul>

        <h3 id="pacing-itinerary">2. La Regla de Oro en la Planificación del Itinerario</h3>
        <p>El error más frecuente es subir directamente a caminar por las cuestas del Cusco a 3,400 metros el primer día. Nuestro diseño de autor recomienda:</p>
        
        <div class="itinerary-timeline-box">
          <div class="timeline-step">
            <span class="step-num">01</span>
            <div class="step-content">
              <strong>Días 1 - 2: Sofisticación Costera en Lima</strong>
              <p>Aclimátese a nivel del mar con menús degustación en Central o Maido, visitas privadas al Museo Larco y suites con vista al Pacífico en Miraflores.</p>
            </div>
          </div>
          <div class="timeline-step">
            <span class="step-num">02</span>
            <div class="step-content">
              <strong>Días 3 - 5: Descenso al Valle Sagrado de los Incas (2,870 m)</strong>
              <p>Al aterrizar en Cusco, descienda de inmediato al Valle Sagrado. Alójese en Belmond Río Sagrado o Tambo del Inka. Explore las Salineras de Maras, los andenes de Moray y participe en un ritual chamánico privado con maestros Q'ero.</p>
            </div>
          </div>
          <div class="timeline-step">
            <span class="step-num">03</span>
            <div class="step-content">
              <strong>Día 6: Experiencia Belmond Hiram Bingham a Machu Picchu</strong>
              <p>Travesía en el legendario ferrocarril disfrutando de un almuerzo gourmet y cócteles de pisco, para ingresar al santuario en la tarde, cuando los grupos turísticos masivos ya se han retirado.</p>
            </div>
          </div>
          <div class="timeline-step">
            <span class="step-num">04</span>
            <div class="step-content">
              <strong>Días 7 - 9: Cusco Monumental y Tren Nocturno Belmond Andean Explorer</strong>
              <p>Completamente aclimatado, disfrute del Cusco virreinal en el histórico Belmond Hotel Monasterio. Posibilidad de continuar en el tren cama de ultra-lujo hacia el Lago Titicaca.</p>
            </div>
          </div>
        </div>

        <div class="concierge-callout-box">
          <div class="concierge-callout-header">
            <span class="callout-icon">✦</span>
            <h4>Plazos de Anticipación Recomendados</h4>
          </div>
          <p>Los boletos de ingreso a los circuitos superiores de Machu Picchu y los asientos del tren Hiram Bingham son estrictamente nominativos y limitados por el Ministerio de Cultura. Le recomendamos reservar con un margen de <strong>4 a 6 meses de anticipación</strong> para garantizar los mejores horarios y categorías de viaje.</p>
        </div>
      `
    }
  },
  {
    id: "inkaterra-hacienda-concepcion",
    slug: "inkaterra-hacienda-concepcion",
    category: "amazon",
    categoryLabel: {
      en: "Amazon & Inkaterra Lodge",
      es: "Amazonía & Inkaterra Lodge"
    },
    readTime: 6,
    publishDate: "2025-04-12",
    updatedDate: "2026-07-05",
    author: {
      name: "LMP TRAVEL Naturalist Team",
      title: "Amazon Experience Curators",
      avatar: "assets/images/logo-travel.png"
    },
    heroImage: "https://lmptravel.com/wp-content/uploads/2023/02/inkaterra_hacienda_concepcion_lmp_travel.jpg",
    localHeroFallback: "assets/images/Iquitos.jpg",
    gallery: [
      "https://lmptravel.com/wp-content/uploads/2023/02/03_tambomachay.jpg",
      "https://lmptravel.com/wp-content/uploads/2023/02/hacienda_concepcion_lmp_travel.jpg",
      "https://lmptravel.com/wp-content/uploads/2023/02/lmp_travel_hacienda_concepcion.jpg"
    ],
    title: {
      en: "Inkaterra Hacienda Concepción: Luxury Amazon Rainforest Experience (3D/2N)",
      es: "Inkaterra Hacienda Concepción: Experiencia de Lujo en la Selva Amazónica (3D/2N)"
    },
    summary: {
      en: "An exclusive immersion in the heart of Tambopata National Reserve: motorized river canoes along Madre de Dios, Lake Sandoval giant otters, hanging bridges at the 30-meter Inkaterra Canopy Walkway, and nocturnal rainforest safaris.",
      es: "Una inmersión exclusiva en la Reserva Nacional Tambopata: navegación por el río Madre de Dios, nutrias gigantes en Lago Sandoval, puentes colgantes a 30 metros en el Canopy Walkway y safaris nocturnos en la selva virgen."
    },
    featured: true,
    tags: ["Amazon Rainforest", "Tambopata", "Inkaterra", "Luxury Lodge", "Wildlife Safari"],
    content: {
      en: `
        <div class="blog-article-lead">
          <p class="lead-text">Travelling to Tambopata National Reserve offers an incomparable opportunity to witness record-setting biodiversity. Puerto Maldonado, in the southern Peruvian rainforest near the borders with Bolivia and Brazil, is the gateway to this pristine tropical wilderness. At <strong>Inkaterra Hacienda Concepción</strong>, sustainable eco-luxury meets world-class naturalist expeditions.</p>
        </div>

        <div class="amenities-badge-row">
          <span class="amenity-chip">🌿 Tambopata National Reserve</span>
          <span class="amenity-chip">🛶 Motorized River Canoes</span>
          <span class="amenity-chip">🌉 30m Canopy Walkway</span>
          <span class="amenity-chip">🍽️ Organic Full Board</span>
          <span class="amenity-chip">✨ Welcome Cocktail & Tea Time</span>
        </div>

        <h3 id="itinerary-3d2n">Full 3-Day / 2-Night Experience Itinerary</h3>

        <div class="daily-itinerary-card">
          <div class="day-badge">DAY 1</div>
          <div class="day-details">
            <h4>Lima / Cusco to Puerto Maldonado • Concepción Nature Trails & Twilight River</h4>
            <p><strong>Morning Arrival:</strong> Arrive at Puerto Maldonado airport, where LMP Travel & Inkaterra staff provide a private meet-and-greet. Transfer to the river port and board an outboard motorized wooden canoe for a scenic 25-minute cruise along the rushing Madre de Dios River to Inkaterra Hacienda Concepción.</p>
            <p><strong>Afternoon:</strong> Savor a welcoming lunch prepared with native Amazonian organic ingredients. Afterwards, embark on the guided <em>Concepción Trails</em> walk through primary and secondary rainforest to examine medicinal plants, exotic trees, and ecological transformations.</p>
            <p><strong>Twilight River Safari:</strong> At dusk, board the river canoe for an evening cruise to discover nocturnal caimans, night birds, and the luminous southern constellations reflecting over the water. Complete your day with an exquisite dinner in the Casa Grande dining hall.</p>
          </div>
        </div>

        <div class="daily-itinerary-card">
          <div class="day-badge">DAY 2</div>
          <div class="day-details">
            <h4>Lake Sandoval Oxbow Lake • Inkaterra Canopy Walkway & Rainforest by Night</h4>
            <p><strong>Morning Experience:</strong> Following a nutritious tropical buffet breakfast, embark on a trek through the high-canopy forest into the heart of Tambopata Reserve toward <strong>Lake Sandoval</strong>. Board a silent wooden dugout canoe across this mirror-like oxbow lake to observe the endangered giant river otter (<em>Pteronura brasiliensis</em>), blue-and-yellow macaws, red howler monkeys, and the prehistoric paiche fish.</p>
            <p><strong>Afternoon Canopy Walkway:</strong> After lunch at the lodge, navigate 20 minutes to the Inkaterra Canopy Walkway Interpretation Center. Ascend the 30-meter (98-foot) observation towers and traverse 7 hanging bridges suspended 28 meters high in the treetops. Spot white-throated toucans, trogons, woodpeckers, and sloths with unobstructed panoramic vistas.</p>
            <p><strong>Anaconda Walk & Night Safari:</strong> Walk along the 200-meter wooden bridge over the flooded palm swamps (<em>aguajales</em>). At night, experience the thrill of <em>Rainforest by Night</em>, discovering tarantulas, nocturnal tree frogs, and enhanced animal adaptation sounds, capped by dinner at the lodge.</p>
          </div>
        </div>

        <div class="daily-itinerary-card">
          <div class="day-badge">DAY 3</div>
          <div class="day-details">
            <h4>Madre de Dios to Puerto Maldonado • Butterfly House & Outbound Flight</h4>
            <p><strong>Morning:</strong> Enjoy a farewell breakfast buffet surrounded by the morning birdsong of the rainforest. Board your motorized river canoe back to Puerto Maldonado.</p>
            <p><strong>Butterfly House (Mariposario):</strong> Before your departure flight to Lima or Cusco, enjoy VIP access to the Butterfly House interpretation center, witnessing the metamorphic cycle of colorful neo-tropical butterflies.</p>
          </div>
        </div>

        <h3 id="inclusions-checklist">Curated Inclusions & Hospitality</h3>
        <div class="inclusions-grid">
          <div class="inclusions-col">
            <h4 class="inclusions-title">✦ Included in Your Experience:</h4>
            <ul class="inclusions-list">
              <li>VIP Airport reception and greeting at Puerto Maldonado (PEM)</li>
              <li>Roundtrip ground and motorized river canoe transfers</li>
              <li>2 nights luxury accommodations at Inkaterra Hacienda Concepción</li>
              <li>Full board: gourmet breakfasts, lunches, and candlelit dinners</li>
              <li>Expert bilingual naturalist guide (English & Spanish)</li>
              <li>All excursion equipment: rubber boots, life vests, headlamps</li>
              <li>SERNANP official park entry fees to Lake Sandoval and Canopy Walkway</li>
              <li>Complimentary tea time and cocktail hour in Casa Grande</li>
            </ul>
          </div>
          <div class="exclusions-col">
            <h4 class="exclusions-title">✕ Not Included:</h4>
            <ul class="exclusions-list">
              <li>Domestic commercial airfares (Lima/Cusco – Puerto Maldonado)</li>
              <li>Spa wellness treatments and premium imported spirits</li>
              <li>Discretionary staff gratuities</li>
            </ul>
          </div>
        </div>
      `,
      es: `
        <div class="blog-article-lead">
          <p class="lead-text">Viajar a la Reserva Nacional Tambopata brinda la oportunidad inigualable de descubrir una de las mayores concentraciones de biodiversidad del planeta. Puerto Maldonado, en el suroriente de la Amazonía peruana, es el portal de acceso a este ecosistema prístino. En <strong>Inkaterra Hacienda Concepción</strong>, el eco-lujo sostenible se funde con expediciones naturalistas de clase mundial.</p>
        </div>

        <div class="amenities-badge-row">
          <span class="amenity-chip">🌿 Reserva Nacional Tambopata</span>
          <span class="amenity-chip">🛶 Lanchas a Motor en el Río</span>
          <span class="amenity-chip">🌉 Canopy Walkway a 30m</span>
          <span class="amenity-chip">🍽️ Pensión Completa Gourmet</span>
          <span class="amenity-chip">✨ Cóctel de Bienvenida y Tea Time</span>
        </div>

        <h3 id="itinerary-3d2n">Itinerario Completo de 3 Días / 2 Noches</h3>

        <div class="daily-itinerary-card">
          <div class="day-badge">DÍA 1</div>
          <div class="day-details">
            <h4>Lima / Cusco a Puerto Maldonado • Trochas Concepción y Río de Noche</h4>
            <p><strong>Arribo y Navegación:</strong> Bienvenida personalizada por el equipo de LMP Travel e Inkaterra en el aeropuerto de Puerto Maldonado. Traslado al embarcadero fluvial para navegar en canoa con motor fuera de borda durante 25 minutos por el río Madre de Dios hasta el lodge.</p>
            <p><strong>Almuerzo y Trochas Concepción:</strong> Almuerzo elaborado con ingredientes orgánicos y sabores nativos de la selva. Por la tarde, caminata guiada por las <em>Trochas Concepción</em> para aprender sobre plantas medicinales, árboles colosales y el dosel forestal.</p>
            <p><strong>Excursión Río de Noche:</strong> Al caer la tarde, navegación por el río Madre de Dios para avistar caimanes, lechuzas y constelaciones australes sobre el cielo amazónico. Cena gourmet en el comedor de la Casa Grande.</p>
          </div>
        </div>

        <div class="daily-itinerary-card">
          <div class="day-badge">DÍA 2</div>
          <div class="day-details">
            <h4>Lago Sandoval en Tambopata • Inkaterra Canopy Walkway y Selva Nocturna</h4>
            <p><strong>Experiencia Lago Sandoval:</strong> Tras un desayuno buffet tropical, caminata por tierra firme hacia la Reserva Nacional Tambopata hasta el <strong>Lago Sandoval</strong>. Navegación en canoa a remo por este espejo de agua para observar la nutria gigante de río en peligro de extinción, guacamayos, monos aulladores y caimanes negros.</p>
            <p><strong>Inkaterra Canopy Walkway & Caminata Anaconda:</strong> Navegación de 20 minutos al Centro de Interpretación. Ascenso a las torres de 30 metros para cruzar 7 puentes colgantes suspendidos entre las copas de los árboles (tucanes, perezosos, trogones). Recorrido por el puente de madera sobre los pantanos de palmeras (aguajales).</p>
            <p><strong>Selva de Noche:</strong> Safari nocturno a pie para descubrir el comportamiento de insectos fascinantes, ranas arbóreas y la magia de los sonidos de la noche. Cena relajante en el lodge.</p>
          </div>
        </div>

        <div class="daily-itinerary-card">
          <div class="day-badge">DÍA 3</div>
          <div class="day-details">
            <h4>Madre de Dios a Puerto Maldonado • Mariposario y Vuelo de Salida</h4>
            <p><strong>Desayuno y Retorno Fluvial:</strong> Desayuno buffet al amanecer con vista al jardín tropical. Navegación en canoa de regreso al puerto de la ciudad.</p>
            <p><strong>Visita al Mariposario:</strong> Antes de abordar su vuelo de retorno a Lima o Cusco, visita privada al Mariposario de Puerto Maldonado para conocer la metamorfosis de mariposas neotropicales.</p>
          </div>
        </div>

        <h3 id="inclusions-checklist">Inclusiones Exclusivas de la Experiencia</h3>
        <div class="inclusions-grid">
          <div class="inclusions-col">
            <h4 class="inclusions-title">✦ Incluido en su Reserva:</h4>
            <ul class="inclusions-list">
              <li>Asistencia y bienvenida en el aeropuerto de Puerto Maldonado (PEM)</li>
              <li>Traslados terrestres y fluviales ida y vuelta (Aeropuerto / Lodge / Aeropuerto)</li>
              <li>2 noches de hospedaje de lujo en Inkaterra Hacienda Concepción</li>
              <li>Pensión completa: desayunos buffet, almuerzos y cenas gourmet a la carta</li>
              <li>Agua embotellada y bebidas calientes</li>
              <li>Guía naturalista certificado bilingüe (español e inglés)</li>
              <li>Equipo completo para cada excursión (botas de jebe, chalecos salvavidas)</li>
              <li>Entradas oficiales de SERNANP al Lago Sandoval y Canopy Walkway</li>
              <li>Cóctel de bienvenida, hora del té y amenities especiales</li>
            </ul>
          </div>
          <div class="exclusions-col">
            <h4 class="exclusions-title">✕ No Incluye:</h4>
            <ul class="exclusions-list">
              <li>Boletos aéreos comerciales nacionales</li>
              <li>Tratamientos de spa y masajes terapéuticos</li>
              <li>Propinas voluntarias al personal</li>
            </ul>
          </div>
        </div>
      `
    }
  }
];

if (typeof window !== 'undefined') {
  window.luxuryBlogData = BLOG_POSTS;
  window.BLOG_POSTS = BLOG_POSTS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BLOG_POSTS };
}

