using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using LuxuryMachupicchu.Domain.Entities;

namespace LuxuryMachupicchu.Infrastructure.Data;

public static class DbInitializer
{
    public static async Task InitializeAsync(LuxuryMachupicchuDbContext context)
    {
        await context.Database.EnsureCreatedAsync();

        if (!await context.Categories.AnyAsync())
        {

        // 1. Categories
        var catTrains = new Category
        {
            NameEn = "Luxury Rail Journeys",
            NameEs = "Viajes en Trenes de Lujo",
            Slug = "luxury-rail-journeys",
            DescriptionEn = "Timeless journeys aboard the legendary Belmond Hiram Bingham and Andean Explorer.",
            DescriptionEs = "Travesías legendarias a bordo del Belmond Hiram Bingham y el Andean Explorer.",
            Icon = "train",
            DisplayOrder = 1,
            IsActive = true
        };

        var catMachuPicchu = new Category
        {
            NameEn = "Sanctuary Privé",
            NameEs = "Santuario Privé",
            Slug = "sanctuary-prive",
            DescriptionEn = "Bespoke access and private archaeologist curation inside the Machu Picchu Citadel.",
            DescriptionEs = "Acceso exclusivo y curaduría arqueológica privada dentro de la ciudadela de Machu Picchu.",
            Icon = "mountain",
            DisplayOrder = 2,
            IsActive = true
        };

        var catSacredValley = new Category
        {
            NameEn = "Sacred Valley & Mysticism",
            NameEs = "Valle Sagrado y Misticismo",
            Slug = "sacred-valley-mysticism",
            DescriptionEn = "Living Inca heritage, private haciendas, and authentic shamanic ancestral ceremonies.",
            DescriptionEs = "Herencia inca viva, haciendas privadas y ceremonias chamánicas ancestrales exclusivas.",
            Icon = "sparkles",
            DisplayOrder = 3,
            IsActive = true
        };

        var catBespokeTreks = new Category
        {
            NameEn = "VIP Glamping & Expeditions",
            NameEs = "Glamping VIP y Expediciones",
            Slug = "vip-glamping-expeditions",
            DescriptionEn = "The Inca Trail and Rainbow Mountain with heated dome suites and private field chefs.",
            DescriptionEs = "El Camino Inca y Montaña de Colores con domos climatizados y chefs privados de campo.",
            Icon = "tent",
            DisplayOrder = 4,
            IsActive = true
        };

        await context.Categories.AddRangeAsync(catTrains, catMachuPicchu, catSacredValley, catBespokeTreks);
        await context.SaveChangesAsync();

        // 2. Curated Luxury Tours
        var tourHiramBingham = new Tour
        {
            TitleEn = "Belmond Hiram Bingham: The Pinnacle of Machu Picchu",
            TitleEs = "Belmond Hiram Bingham: La Cúspide de Machu Picchu",
            Slug = "belmond-hiram-bingham-pinnacle",
            SubtitleEn = "The ultimate 1920s Pullman rail luxury, private sanctuary entry and five-star Andean gastronomy.",
            SubtitleEs = "El máximo lujo ferroviario estilo Pullman años 20, entrada privada al santuario y alta gastronomía andina.",
            DescriptionEn = "Step aboard the polished wood and brass carriages of the Belmond Hiram Bingham. Enjoy welcome cocktails, a gourmet 4-course brunch paired with vintage wines, and live traditional acoustic music as you wind through the Urubamba Gorge. Upon arrival at the citadel, enjoy seamless access with official pre-reserved permits and your private certified archaeologist, followed by tea time overlooking the cloud forest at the Belmond Sanctuary Lodge.",
            DescriptionEs = "Suba a bordo de los vagones de madera pulida y bronce del Belmond Hiram Bingham. Disfrute de cócteles de bienvenida, un brunch gourmet de 4 tiempos maridado con vinos selectos y música tradicional acústica en vivo a través del cañón del Urubamba. Al llegar a la ciudadela, ingrese fluidamente con sus boletos oficiales pre-reservados y su arqueólogo privado, seguido del té de la tarde frente al bosque de nubes en el Belmond Sanctuary Lodge.",
            CategoryId = catTrains.Id,
            DurationEn = "2 Days / 1 Night",
            DurationEs = "2 Días / 1 Noche",
            DurationDays = 2,
            PriceUsd = 2150.00m,
            PricePen = 8170.00m,
            DifficultyEn = "Leisure & Refined",
            DifficultyEs = "Placentero y Exclusivo",
            AltitudeMax = "2,430 m / 7,972 ft",
            StartingPoint = "Cusco (Poroy Station) or Sacred Valley",
            StyleTag = "Belmond Hiram Bingham Signature",
            Featured = true,
            IsActive = true,
            DisplayOrder = 1,
            MainImageUrl = "assets/images/hiram_bingham_main.jpg",
            GalleryImagesJson = JsonSerializer.Serialize(new[]
            {
                "assets/images/hiram_bingham_main.jpg",
                "assets/images/hiram_bingham_musicians.jpg",
                "assets/images/hiram_bingham_valley.jpg"
            }),
            IncludedJsonEn = JsonSerializer.Serialize(new[]
            {
                "Roundtrip tickets aboard the Belmond Hiram Bingham train",
                "Gourmet 4-course brunch on the outbound journey and fine dinner on return",
                "Open bar with fine wines, Peruvian craft beers, champagne & signature Pisco cocktails",
                "VIP private shuttle bus transfers up to the Sanctuary",
                "Official citadel entrance tickets and certified private archaeologist guide (Circuit 1 or 2)",
                "Exclusive Afternoon Tea at Belmond Sanctuary Lodge",
                "24/7 Dedicated Luxury Concierge & Luggage Handling Service"
            }),
            IncludedJsonEs = JsonSerializer.Serialize(new[]
            {
                "Boletos ida y retorno a bordo del tren Belmond Hiram Bingham",
                "Brunch gourmet de 4 tiempos a la ida y cena gourmet maridada al retorno",
                "Bar abierto con vinos finos, cervezas artesanales, champaña y cócteles de autor",
                "Traslados privados en bus exclusivo hacia y desde el Santuario",
                "Boletos de ingreso preferencial y arqueólogo privado certificado (Circuito 1 o 2)",
                "Afternoon Tea exclusivo en los jardines del Belmond Sanctuary Lodge",
                "Servicio de Concierge de Lujo 24/7 y gestión privada de equipaje"
            }),
            NotIncludedJsonEn = JsonSerializer.Serialize(new[]
            {
                "International flights to Peru",
                "Discretionary gratuities for train crew and archaeologist guide",
                "Travel and medical insurance"
            }),
            NotIncludedJsonEs = JsonSerializer.Serialize(new[]
            {
                "Vuelos internacionales hacia Perú",
                "Propinas discrecionales para tripulación y guía arqueólogo",
                "Seguro médico internacional de viaje"
            }),
            HighlightsJsonEn = JsonSerializer.Serialize(new[]
            {
                "Observation car with open-air terrace & live Andean acoustic bar",
                "Access to the sacred terraces before standard tour crowds arrive",
                "Private dining overlooking Huayna Picchu mountain peaks"
            }),
            HighlightsJsonEs = JsonSerializer.Serialize(new[]
            {
                "Vagón observatorio con terraza al aire libre y bar acústico andino",
                "Acceso a las terrazas sagradas en horarios de mínima afluencia",
                "Almuerzo y té de gala con vistas directas a la montaña Huayna Picchu"
            }),
            LocationsJson = JsonSerializer.Serialize(new[] { "cusco", "mp" }),
            AltitudeProfileJson = JsonSerializer.Serialize(new
            {
                startingAltitude = "3,400 m / 11,152 ft",
                maxAltitude = "3,400 m / 11,152 ft",
                sleepingAltitude = "2,430 m / 7,972 ft",
                oxygenPercentage = 85,
                tipEn = "The Hiram Bingham winds down into the lush Urubamba gorge (2,040 m) to the Machu Picchu citadel (2,430 m), allowing optimal, refreshing sleep at a much lower elevation than Cusco.",
                tipEs = "El Hiram Bingham desciende hacia el cañón del Urubamba (2,040 m) y la ciudadela de Machu Picchu (2,430 m), permitiendo un descanso reparador a menor altitud que Cusco."
            })
        };

        var tourSacredValley = new Tour
        {
            TitleEn = "Sacred Valley Privé: Maras, Moray & Q'ero Shamanic Ritual",
            TitleEs = "Valle Sagrado Privé: Maras, Moray y Ritual Chamánico Q'ero",
            Slug = "sacred-valley-prive-shamanic-ritual",
            SubtitleEn = "Private haciendas, ancestral salt pans, and an intimate Pachamama blessing with an Andean master.",
            SubtitleEs = "Haciendas privadas, salineras ancestrales y pago a la Pachamama con un maestro Q'ero.",
            DescriptionEn = "Traverse the verdant Sacred Valley in a luxury executive Mercedes Sprinter. Discover the concentric agricultural laboratories of Moray and the cascading pink salt terraces of Maras. In an exclusive private garden, take part in an authentic Andean payment ceremony to Mother Earth led by a genuine Q'ero Pampamesayoc healer. Culminate with an artisanal feast at Hacienda Huayoccari accompanied by Peruvian Paso Horse demonstrations.",
            DescriptionEs = "Recorra el fértil Valle Sagrado en una camioneta ejecutiva Mercedes-Benz de alta gama. Descubra los laboratorios agrícolas concéntricos de Moray y las terrazas de sal rosada de Maras. En un jardín privado, participe en una ceremonia ancestral de pago a la Pachamama guiada por un sabio maestro Q'ero. Culmine con un banquete campestre en la exclusiva Hacienda Huayoccari y exhibición de caballos peruanos de paso.",
            CategoryId = catSacredValley.Id,
            DurationEn = "Full Day (8 Hours)",
            DurationEs = "Día Completo (8 Horas)",
            DurationDays = 1,
            PriceUsd = 680.00m,
            PricePen = 2584.00m,
            DifficultyEn = "Gentle & Inspiring",
            DifficultyEs = "Suave y Reparador",
            AltitudeMax = "3,500 m / 11,480 ft",
            StartingPoint = "Cusco or Sacred Valley Hotels",
            StyleTag = "Heritage & High Gastronomy",
            Featured = true,
            IsActive = true,
            DisplayOrder = 2,
            MainImageUrl = "assets/images/sacred_valley_maras_main.jpg",
            GalleryImagesJson = JsonSerializer.Serialize(new[]
            {
                "assets/images/sacred_valley_maras_main.jpg",
                "assets/images/sacred_valley_moray.jpg",
                "assets/images/sacred_valley_qero.jpg"
            }),
            IncludedJsonEn = JsonSerializer.Serialize(new[]
            {
                "Private luxury vehicle with chauffeur and onboard refreshments",
                "Certified bilingual private historian guide",
                "Private Q'ero Andean Master Shaman ritual with offering kit",
                "Boutique multi-course lunch at Hacienda Huayoccari with wine pairing",
                "Private Peruvian Paso Horse exhibition",
                "All private entrance rights and community contributions"
            }),
            IncludedJsonEs = JsonSerializer.Serialize(new[]
            {
                "Vehículo privado de lujo con chofer ejecutivo y amenities a bordo",
                "Guía historiador privado bilingüe colegiado",
                "Ritual ancestral privado con maestro chamán Q'ero e insumos sagrados",
                "Almuerzo campestre gourmet en Hacienda Huayoccari con maridaje",
                "Demostración privada de caballos peruanos de paso",
                "Todos los pases turísticos y donaciones comunitarias directas"
            }),
            NotIncludedJsonEn = JsonSerializer.Serialize(new[] { "Personal purchases", "Gratuities" }),
            NotIncludedJsonEs = JsonSerializer.Serialize(new[] { "Gastos personales", "Propinas" }),
            HighlightsJsonEn = JsonSerializer.Serialize(new[]
            {
                "Private Q'ero shamanic blessing for health & prosperity",
                "Curated culinary art and folk collection at Hacienda Huayoccari"
            }),
            HighlightsJsonEs = JsonSerializer.Serialize(new[]
            {
                "Bendición chamánica privada de los Apus para la salud y prosperidad",
                "Colección privada de arte virreinal y folclórico en Hacienda Huayoccari"
            }),
            LocationsJson = JsonSerializer.Serialize(new[] { "cusco", "mp" }),
            AltitudeProfileJson = JsonSerializer.Serialize(new
            {
                startingAltitude = "2,870 m / 9,416 ft",
                maxAltitude = "3,500 m / 11,480 ft",
                sleepingAltitude = "2,870 m / 9,416 ft",
                oxygenPercentage = 82,
                tipEn = "Acclimatizing in the Sacred Valley is medically advised. Its mild microclimate and lower elevation provide the perfect preparation for highland exploration.",
                tipEs = "La aclimatación en el Valle Sagrado es el protocolo médico recomendado. Su microclima templado y menor altitud preparan confortablemente el organismo."
            })
        };

        var tourAndeanExplorer = new Tour
        {
            TitleEn = "Belmond Andean Explorer: Cusco to Lake Titicaca",
            TitleEs = "Belmond Andean Explorer: De Cusco al Lago Titicaca",
            Slug = "belmond-andean-explorer-cusco-titicaca",
            SubtitleEn = "South America's first luxury sleeper train through high Andean plateaus and floating island sanctuaries.",
            SubtitleEs = "El primer tren de lujo con suites dormitorio de Sudamérica a través del altiplano y el Titicaca.",
            DescriptionEn = "Experience the poetry of high-altitude travel. Travel across the altiplano from Cusco to Puno in handcrafted cabins equipped with private en-suite bathrooms and oxygen enrichment systems. Sip pisco sours by the baby grand piano, savor degustation menus designed by Chef Diego Muñoz, and board a private yacht to the floating reed islands of Uros and Taquile.",
            DescriptionEs = "Viva la poesía del viaje en tren de alta montaña. Cruce el altiplano andino desde Cusco hasta Puno en cabinas artesanales equipadas con baño privado y sistema de oxígeno medicinal. Disfrute del vagón piano bar, deguste menús de alta cocina diseñados por el chef Diego Muñoz y aborde un yate privado hacia las islas flotantes de los Uros y Taquile.",
            CategoryId = catTrains.Id,
            DurationEn = "2 Days / 1 Night",
            DurationEs = "2 Días / 1 Noche",
            DurationDays = 2,
            PriceUsd = 3450.00m,
            PricePen = 13110.00m,
            DifficultyEn = "Ultra-Luxury Leisure",
            DifficultyEs = "Lujo Pleno & Contemplativo",
            AltitudeMax = "4,319 m / 14,170 ft (La Raya)",
            StartingPoint = "Wanchaq Station, Cusco",
            StyleTag = "Belmond Sleeper Train",
            Featured = true,
            IsActive = true,
            DisplayOrder = 3,
            MainImageUrl = "assets/images/andean_explorer_main.jpg",
            GalleryImagesJson = JsonSerializer.Serialize(new[]
            {
                "assets/images/andean_explorer_main.jpg",
                "assets/images/andean_explorer_titicaca.jpg",
                "assets/images/andean_explorer_laraya.jpg"
            }),
            IncludedJsonEn = JsonSerializer.Serialize(new[]
            {
                "Suite accommodation with private shower aboard the Belmond Andean Explorer",
                "All fine dining gourmet meals and sommelier-selected wines",
                "Exclusive stop and champagne toast at La Raya mountain pass",
                "Private yacht excursion on Lake Titicaca to Uros and private Taquile beach",
                "Onboard physician and 24/7 butler service"
            }),
            IncludedJsonEs = JsonSerializer.Serialize(new[]
            {
                "Alojamiento en cabina suite con baño privado en el Belmond Andean Explorer",
                "Todas las comidas de alta cocina andina y vinos seleccionados por sommelier",
                "Parada exclusiva y brindis con champaña en el paso de La Raya (4,319 m)",
                "Excursión en yate privado por el Lago Titicaca hacia Uros y playa privada en Taquile",
                "Médico a bordo y servicio de mayordomo personal 24 horas"
            }),
            NotIncludedJsonEn = JsonSerializer.Serialize(new[] { "Spa treatments aboard train", "Tips" }),
            NotIncludedJsonEs = JsonSerializer.Serialize(new[] { "Tratamientos de spa en cabina", "Propinas" }),
            HighlightsJsonEn = JsonSerializer.Serialize(new[]
            {
                "Sunset cocktails on the open-air observation car",
                "Private Taquile cultural weaving encounter away from commercial boats"
            }),
            HighlightsJsonEs = JsonSerializer.Serialize(new[]
            {
                "Cócteles al atardecer en el vagón mirador con terraza abierta",
                "Encuentro cultural privado de tejeduría en Taquile sin embarcaciones comerciales"
            }),
            LocationsJson = JsonSerializer.Serialize(new[] { "cusco", "puno", "arq" }),
            AltitudeProfileJson = JsonSerializer.Serialize(new
            {
                startingAltitude = "3,400 m / 11,152 ft",
                maxAltitude = "4,319 m / 14,170 ft",
                sleepingAltitude = "3,812 m / 12,506 ft",
                oxygenPercentage = 65,
                tipEn = "The Belmond Andean Explorer train features individual medical oxygen valves in every sleeper suite, constant barometric regulation, and an on-board medical doctor.",
                tipEs = "El tren Belmond Andean Explorer cuenta con válvulas de oxígeno medicinal en cada cabina suite, regulación barométrica y médico a bordo durante toda la travesía."
            })
        };

        var tourIncaTrailGlamping = new Tour
        {
            TitleEn = "Classic Inca Trail VIP Glamping: The Royal Route",
            TitleEs = "Camino Inca Clásico VIP Glamping: La Ruta Real",
            Slug = "classic-inca-trail-vip-glamping",
            SubtitleEn = "Conquer the ancient stone path with heated dome suites, massage therapist, and gourmet field chef.",
            SubtitleEs = "Camine la mítica calzada inca con domos calefaccionados, masajista y chef gourmet en ruta.",
            DescriptionEn = "Reimagine trekking to Machu Picchu. Hike through cloud forests, orchid-covered ridges, and pristine Inca citadels with a private expedition crew. At each sunset camp, unwind in spacious carpeted geodesic domes equipped with real spring beds, down comforters, and hot showers. Savor five-star hot dinners and enjoy daily therapeutic massages before entering the Sun Gate.",
            DescriptionEs = "Reimagine el trekking hacia Machu Picchu. Camine por senderos empedrados, bosques de orquídeas y ciudadelas prehispánicas intactas con un equipo privado de apoyo. En cada campamento, descanse en amplios domos climatizados con camas de resortes, edredones de plumas y duchas calientes. Disfrute de cenas gourmet de alta montaña y masajes descontracturantes antes de cruzar la Puerta del Sol.",
            CategoryId = catBespokeTreks.Id,
            DurationEn = "4 Days / 3 Nights",
            DurationEs = "4 Días / 3 Noches",
            DurationDays = 4,
            PriceUsd = 2890.00m,
            PricePen = 10982.00m,
            DifficultyEn = "Challenging with Elite Support",
            DifficultyEs = "Exigente con Soporte Élite",
            AltitudeMax = "4,215 m / 13,828 ft (Dead Woman's Pass)",
            StartingPoint = "Km 82, Piscacucho",
            StyleTag = "VIP Glamping & Wellness",
            Featured = true,
            IsActive = true,
            DisplayOrder = 4,
            MainImageUrl = "assets/images/inca_trail_main.jpg",
            GalleryImagesJson = JsonSerializer.Serialize(new[]
            {
                "assets/images/inca_trail_main.jpg",
                "assets/images/inca_trail_winay_wayna.jpg",
                "assets/images/inca_trail_sungate.jpg"
            }),
            IncludedJsonEn = JsonSerializer.Serialize(new[]
            {
                "Strictly private trek permits and certified wilderness expert guides",
                "Deluxe walk-in sleeping domes with mattresses, warm duvets and private eco-toilets",
                "Private hot shower tent setup every evening",
                "Professional on-trail massage therapist for daily post-hike recovery",
                "Dedicated culinary brigade preparing hot 3-course organic menus",
                "Emergency satellite phone and hyperbaric oxygen chambers"
            }),
            IncludedJsonEs = JsonSerializer.Serialize(new[]
            {
                "Permisos exclusivos del Camino Inca y guías expertos en alta montaña",
                "Domos habitacionales amplios con camas, plumones térmicos y baño ecológico privado",
                "Carpa de ducha caliente instalada al llegar a cada campamento",
                "Fisioterapeuta / masajista profesional diario para recuperación muscular",
                "Brigada culinaria privada que prepara menús calientes de 3 tiempos e infusiones andinas",
                "Teléfono satelital de emergencia y cámaras hiperbáricas portátiles"
            }),
            NotIncludedJsonEn = JsonSerializer.Serialize(new[] { "Trekking poles rental", "Staff tipping" }),
            NotIncludedJsonEs = JsonSerializer.Serialize(new[] { "Alquiler de bastones", "Propinas al equipo" }),
            HighlightsJsonEn = JsonSerializer.Serialize(new[]
            {
                "Entering Machu Picchu on foot through the Sun Gate in morning serenity",
                "Hot showers and gourmet dining under the stars of the Southern Cross"
            }),
            HighlightsJsonEs = JsonSerializer.Serialize(new[]
            {
                "Entrada triunfal a pie por la Puerta del Sol (Inti Punku) sin multitudes",
                "Duchas calientes y alta gastronomía bajo las estrellas de la Cruz del Sur"
            }),
            LocationsJson = JsonSerializer.Serialize(new[] { "cusco", "mp" }),
            AltitudeProfileJson = JsonSerializer.Serialize(new
            {
                startingAltitude = "2,600 m / 8,530 ft",
                maxAltitude = "4,215 m / 13,828 ft",
                sleepingAltitude = "3,000 m / 9,842 ft",
                oxygenPercentage = 72,
                tipEn = "Our expedition crew provides portable hyperbaric chambers, pulse oximeter monitoring, certified wilderness guides, and chef-brewed muña and coca infusions.",
                tipEs = "Nuestra brigada de expedición incluye cámaras hiperbáricas portátiles, monitoreo de pulsioximetría, guías certificados e infusiones calientes de muña y coca."
            })
        };

        await context.Tours.AddRangeAsync(tourHiramBingham, tourSacredValley, tourAndeanExplorer, tourIncaTrailGlamping);
        await context.SaveChangesAsync();

        // 3. Add Itinerary Days for Hiram Bingham
        var day1Hb = new ItineraryDay
        {
            TourId = tourHiramBingham.Id,
            DayNumber = 1,
            TitleEn = "Boarding the Legend & Sunset at the Citadel",
            TitleEs = "Abordaje de Leyenda y Atardecer en la Ciudadela",
            DescriptionEn = "Morning departure from Poroy or Ollantaytambo. Brunch is served while cruising through cloud forests. Arrival in Aguas Calientes with VIP bus boarding. Intimate private tour of the main temples and terraces. Sunset champagne cocktail at Sanctuary Lodge.",
            DescriptionEs = "Salida matutina desde Poroy u Ollantaytambo. Servicio de brunch mientras se desciende por el cañón. Arribo a Aguas Calientes y traslado en bus VIP. Visita guiada privada a los templos y terrazas. Cóctel con champaña al atardecer en Sanctuary Lodge.",
            GourmetDiningEn = "4-Course Champagne Brunch & Belmond Afternoon Tea",
            GourmetDiningEs = "Brunch de 4 Tiempos con Champaña y Té de la Tarde Belmond",
            PrivateTransferEn = "Private luxury sedan to train station + VIP citadel shuttle",
            PrivateTransferEs = "Sedán de lujo a estación + Bus VIP exclusivo al santuario"
        };

        var day2Hb = new ItineraryDay
        {
            TourId = tourHiramBingham.Id,
            DayNumber = 2,
            TitleEn = "Sunrise Mystic Energy & Return Gala Dinner",
            TitleEs = "Amanecer Místico y Cena de Gala al Retorno",
            DescriptionEn = "Early entry to witness the morning mist lift above the Intihuatana and Temple of the Sun. Optional climb to Huayna Picchu. Midday gourmet lunch. Evening return on the Belmond Hiram Bingham with live band and 4-course banquet dinner.",
            DescriptionEs = "Ingreso temprano para contemplar el amanecer sobre el Intihuatana y el Templo del Sol. Ascenso opcional a Huayna Picchu. Almuerzo gourmet. Retorno nocturno en el Belmond Hiram Bingham con música en vivo y cena de gala de 4 tiempos.",
            GourmetDiningEn = "Gourmet lunch at Sanctuary Lodge & 4-Course Gala Dinner on Train",
            GourmetDiningEs = "Almuerzo en Sanctuary Lodge y Cena de Gala en el Tren",
            PrivateTransferEn = "Private executive chauffeur to your hotel in Cusco",
            PrivateTransferEs = "Chofer ejecutivo privado a su hotel en Cusco"
        };

        await context.ItineraryDays.AddRangeAsync(day1Hb, day2Hb);

        // 4. Testimonials
        var test1 = new Testimonial
        {
            GuestName = "Sir Jonathan & Lady Cavendish",
            OriginCountry = "London, United Kingdom",
            Rating = 5,
            CommentEn = "The Hiram Bingham experience organized by Luxury Machupicchu was an absolute triumph. Having our own private archaeologist made the history come alive without a moment in queues.",
            CommentEs = "La experiencia en el Hiram Bingham organizada por Luxury Machupicchu fue un triunfo absoluto. Tener nuestro arqueólogo privado hizo que la historia cobrara vida sin un segundo de espera.",
            JourneyName = "Belmond Hiram Bingham: The Pinnacle of Machu Picchu",
            Date = DateTime.UtcNow.AddDays(-15),
            IsVerified = true
        };

        var test2 = new Testimonial
        {
            GuestName = "Eleanor Vance-Montgomery",
            OriginCountry = "New York, USA",
            Rating = 5,
            CommentEn = "Every single detail was flawless—from the bespoke champagne greeting at our hotel to the Q'ero blessing in the Sacred Valley. True haute couture travel.",
            CommentEs = "Cada detalle fue impecable: desde la copa de champaña en el hotel hasta la bendición del chamán Q'ero en el Valle Sagrado. Auténtico viaje de alta costura.",
            JourneyName = "Sacred Valley Privé & Andean Mysticism",
            Date = DateTime.UtcNow.AddDays(-28),
            IsVerified = true
        };

        await context.Testimonials.AddRangeAsync(test1, test2);
        await context.SaveChangesAsync();
        }

        // 5. Seed initial sample booking inquiries if table is empty
        if (!await context.BookingInquiries.AnyAsync())
        {
            var tourHiramBingham = await context.Tours.FirstOrDefaultAsync(t => t.Slug == "belmond-hiram-bingham-pinnacle") 
                ?? await context.Tours.FirstOrDefaultAsync();
            var tourSacredValley = await context.Tours.FirstOrDefaultAsync(t => t.Slug == "sacred-valley-prive-andean-mysticism") 
                ?? tourHiramBingham;
            var tourAndeanExplorer = await context.Tours.FirstOrDefaultAsync(t => t.Slug == "andean-explorer-peru-grand-luxury") 
                ?? tourHiramBingham;

            if (tourHiramBingham != null && tourSacredValley != null && tourAndeanExplorer != null)
            {
                var b1 = new BookingInquiry
                {
                    TourId = tourHiramBingham.Id,
                FullName = "Alexander & Charlotte Sterling",
                Email = "alexander.sterling@mayfairpartners.co.uk",
                Phone = "+44 7911 123456",
                Country = "United Kingdom",
                NumberOfGuests = 2,
                TravelDate = DateTime.UtcNow.AddDays(18),
                TrainPreference = "Belmond Hiram Bingham",
                SpecialRequests = "Private citadel archaeologist, vintage champagne upon boarding, anniversary celebration.",
                PreferredLanguage = "en",
                EstimatedTotalUsd = tourHiramBingham.PriceUsd * 2,
                EstimatedTotalPen = tourHiramBingham.PricePen * 2,
                Status = "Confirmed",
                CreatedAt = DateTime.UtcNow.AddDays(-2)
            };

            var b2 = new BookingInquiry
            {
                TourId = tourSacredValley.Id,
                FullName = "Dr. François Dubois",
                Email = "f.dubois@sorbonne-med.fr",
                Phone = "+33 6 12 34 56 78",
                Country = "France",
                NumberOfGuests = 3,
                TravelDate = DateTime.UtcNow.AddDays(25),
                TrainPreference = "Belmond Hiram Bingham",
                SpecialRequests = "Authentic Q'ero shamanic blessing, private hacienda lunch with Peruvian Paso horses.",
                PreferredLanguage = "en",
                EstimatedTotalUsd = tourSacredValley.PriceUsd * 3,
                EstimatedTotalPen = tourSacredValley.PricePen * 3,
                Status = "Pending",
                CreatedAt = DateTime.UtcNow.AddHours(-14)
            };

            var b3 = new BookingInquiry
            {
                TourId = tourAndeanExplorer.Id,
                FullName = "Isabella Rossi & Matteo Conti",
                Email = "isabella.rossi@milanodesign.it",
                Phone = "+39 02 1234567",
                Country = "Italy",
                NumberOfGuests = 2,
                TravelDate = DateTime.UtcNow.AddDays(35),
                TrainPreference = "Belmond Andean Explorer Suite",
                SpecialRequests = "Presidential Cabin suite request, Lake Titicaca private island sunset cocktail.",
                PreferredLanguage = "en",
                EstimatedTotalUsd = tourAndeanExplorer.PriceUsd * 2,
                EstimatedTotalPen = tourAndeanExplorer.PricePen * 2,
                Status = "Paid",
                CreatedAt = DateTime.UtcNow.AddDays(-5)
            };

            await context.BookingInquiries.AddRangeAsync(b1, b2, b3);
            }
        }

        // 6. Seed initial concierge requests if table is empty
        if (!await context.ConciergeRequests.AnyAsync())
        {
            var cr1 = new PrivateConciergeRequest
            {
                GuestName = "Countess Maria Von Habsburg",
                Email = "m.habsburg@vienna-arts.at",
                WhatsApp = "+43 1 9876543",
                DestinationFocus = "Cusco, Sacred Valley & Machu Picchu Sanctuary",
                JourneyDuration = "7-10 Days",
                TravelersCount = 4,
                BudgetTier = "Ultra-Luxury Bespoke",
                BespokeNotes = "Requires presidential suites at Monasterio and Sanctuary Lodge, private helicopter transfers from Cusco airport.",
                CreatedAt = DateTime.UtcNow.AddDays(-1),
                IsAddressed = false
            };

            var cr2 = new PrivateConciergeRequest
            {
                GuestName = "Sebastian Chen",
                Email = "sebastian@chencapital.sg",
                WhatsApp = "+65 9123 4567",
                DestinationFocus = "Machu Picchu & Andean Explorer to Lake Titicaca",
                JourneyDuration = "5-7 Days",
                TravelersCount = 2,
                BudgetTier = "High-End Bespoke",
                BespokeNotes = "Gourmet dining reservations at Central Lima prior to Cusco, private Andean constellation astronomy night.",
                CreatedAt = DateTime.UtcNow.AddDays(-3),
                IsAddressed = true
            };

            await context.ConciergeRequests.AddRangeAsync(cr1, cr2);
        }

        // 7. Seed initial contact message if table is empty
        if (!await context.ContactMessages.AnyAsync())
        {
            var cm1 = new ContactMessage
            {
                Name = "Victoria Thorne",
                Email = "victoria.thorne@heritageclub.com",
                Phone = "+1 415 555 0192",
                Subject = "Chartering Hiram Bingham for Private Family Gathering",
                Message = "We are exploring a private carriage buyout for an exclusive 25-guest celebration next spring. Please have your Director of Concierge contact me.",
                CreatedAt = DateTime.UtcNow.AddHours(-6),
                IsRead = false
            };

            await context.ContactMessages.AddAsync(cm1);
        }

        await context.SaveChangesAsync();
    }
}
