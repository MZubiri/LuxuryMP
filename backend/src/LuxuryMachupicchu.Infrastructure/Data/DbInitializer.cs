using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using LuxuryMachupicchu.Domain.Entities;
using LuxuryMachupicchu.Infrastructure.Security;

namespace LuxuryMachupicchu.Infrastructure.Data;

public static class DbInitializer
{
    public static async Task InitializeAsync(LuxuryMachupicchuDbContext context)
    {
        await context.Database.EnsureCreatedAsync();

        try
        {
            await context.Database.ExecuteSqlRawAsync(@"
                CREATE TABLE IF NOT EXISTS `payment_transactions` (
                    `Id` int NOT NULL AUTO_INCREMENT,
                    `CulqiChargeId` varchar(100) NOT NULL,
                    `CulqiAuthorizationCode` varchar(60) NULL,
                    `ReferenceType` varchar(40) NULL,
                    `ReferenceCode` varchar(60) NULL,
                    `BookingId` int NULL,
                    `ConciergeRequestId` int NULL,
                    `CustomerName` varchar(150) NULL,
                    `CustomerEmail` varchar(150) NULL,
                    `CustomerPhone` varchar(50) NULL,
                    `Amount` decimal(18,2) NOT NULL,
                    `Currency` varchar(10) NOT NULL,
                    `PaymentMethod` varchar(40) NULL,
                    `CardBrand` varchar(40) NULL,
                    `CardLastFour` varchar(10) NULL,
                    `Status` varchar(30) NOT NULL,
                    `RawResponseJson` longtext NULL,
                    `CreatedAt` datetime NOT NULL,
                    PRIMARY KEY (`Id`),
                    UNIQUE KEY `IX_payment_transactions_CulqiChargeId` (`CulqiChargeId`),
                    KEY `IX_payment_transactions_BookingId` (`BookingId`)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
            ");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[DbInitializer] payment_transactions table creation check: {ex.Message}");
        }

        // Ensure LMP Travel tours and Amazon category are always seeded
        await SeedOfficialLmptravelToursAsync(context);

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
            NameEn = "VIP Glamping & Experiences",
            NameEs = "Glamping VIP y Experiencias",
            Slug = "vip-glamping-expeditions",
            DescriptionEn = "The Inca Trail and Rainbow Mountain with heated dome suites and private field chefs.",
            DescriptionEs = "El Camino Inca y Montaña de Colores con domos climatizados y chefs privados de campo.",
            Icon = "tent",
            DisplayOrder = 4,
            IsActive = true
        };

        await context.Categories.AddRangeAsync(catTrains, catMachuPicchu, catSacredValley, catBespokeTreks);
        await context.SaveChangesAsync();

        }

        // 5. Seed initial sample booking inquiries if table is empty
        if (!await context.BookingInquiries.AnyAsync())
        {
            var tourMachuPicchu = await context.Tours.FirstOrDefaultAsync(t => t.Slug == "luxury-machu-picchu-peru") 
                ?? await context.Tours.FirstOrDefaultAsync();
            var tourCuscoGolden = await context.Tours.FirstOrDefaultAsync(t => t.Slug == "cusco-golden-city") 
                ?? tourMachuPicchu;
            var tourExpress = await context.Tours.FirstOrDefaultAsync(t => t.Slug == "machu-picchu-express") 
                ?? tourMachuPicchu;

            if (tourMachuPicchu != null && tourCuscoGolden != null && tourExpress != null)
            {
                var b1 = new BookingInquiry
                {
                    TourId = tourMachuPicchu.Id,
                    FullName = "Alexander & Charlotte Sterling",
                    Email = "alexander.sterling@mayfairpartners.co.uk",
                    Phone = "+44 7911 123456",
                    Country = "United Kingdom",
                    NumberOfGuests = 2,
                    TravelDate = DateTime.UtcNow.AddDays(18),
                    TrainPreference = "Belmond Hiram Bingham",
                    SpecialRequests = "Private citadel archaeologist, vintage champagne upon boarding, anniversary celebration.",
                    PreferredLanguage = "en",
                    EstimatedTotalUsd = tourMachuPicchu.PriceUsd * 2,
                    EstimatedTotalPen = tourMachuPicchu.PricePen * 2,
                    Status = "Confirmed",
                    CreatedAt = DateTime.UtcNow.AddDays(-2)
                };

                var b2 = new BookingInquiry
                {
                    TourId = tourCuscoGolden.Id,
                    FullName = "Dr. François Dubois",
                    Email = "f.dubois@sorbonne-med.fr",
                    Phone = "+33 6 12 34 56 78",
                    Country = "France",
                    NumberOfGuests = 3,
                    TravelDate = DateTime.UtcNow.AddDays(25),
                    TrainPreference = "First Class Panoramic Rail",
                    SpecialRequests = "Authentic Q'ero blessing, private hacienda lunch with Peruvian Paso horses.",
                    PreferredLanguage = "en",
                    EstimatedTotalUsd = tourCuscoGolden.PriceUsd * 3,
                    EstimatedTotalPen = tourCuscoGolden.PricePen * 3,
                    Status = "Pending",
                    CreatedAt = DateTime.UtcNow.AddHours(-14)
                };

                var b3 = new BookingInquiry
                {
                    TourId = tourExpress.Id,
                    FullName = "Isabella Rossi & Matteo Conti",
                    Email = "isabella.rossi@milanodesign.it",
                    Phone = "+39 02 1234567",
                    Country = "Italy",
                    NumberOfGuests = 2,
                    TravelDate = DateTime.UtcNow.AddDays(35),
                    TrainPreference = "Vistadome Observatory",
                    SpecialRequests = "Panoramic citadel morning access, private photography curation.",
                    PreferredLanguage = "en",
                    EstimatedTotalUsd = tourExpress.PriceUsd * 2,
                    EstimatedTotalPen = tourExpress.PricePen * 2,
                    Status = "Paid",
                    CreatedAt = DateTime.UtcNow.AddDays(-5)
                };

                await context.BookingInquiries.AddRangeAsync(b1, b2, b3);
                await context.SaveChangesAsync();
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

        // 8. Ensure Users table exists and seed initial application users (Administrator and Editor roles)
        try
        {
            try
            {
                var isAutoIncrement = await context.Database.SqlQueryRaw<int>(@"
                    SELECT COUNT(*) AS Value 
                    FROM INFORMATION_SCHEMA.COLUMNS 
                    WHERE TABLE_SCHEMA = DATABASE() 
                      AND TABLE_NAME = 'Users' 
                      AND COLUMN_NAME = 'Id' 
                      AND EXTRA LIKE '%auto_increment%'
                ").FirstOrDefaultAsync();

                if (isAutoIncrement == 0)
                {
                    await context.Database.ExecuteSqlRawAsync("DROP TABLE IF EXISTS `Users`;");
                }
            }
            catch (Exception)
            {
                try { await context.Database.ExecuteSqlRawAsync("DROP TABLE IF EXISTS `Users`;"); } catch { }
            }

            await context.Database.ExecuteSqlRawAsync(@"
                CREATE TABLE IF NOT EXISTS `Users` (
                    `Id` int NOT NULL AUTO_INCREMENT,
                    `Username` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
                    `Email` varchar(150) CHARACTER SET utf8mb4 NOT NULL,
                    `FullName` varchar(150) CHARACTER SET utf8mb4 NOT NULL,
                    `PasswordHash` varchar(256) CHARACTER SET utf8mb4 NOT NULL,
                    `Role` varchar(50) CHARACTER SET utf8mb4 NOT NULL,
                    `IsActive` tinyint(1) NOT NULL,
                    `CreatedAt` datetime(6) NOT NULL,
                    `LastLoginAt` datetime(6) NULL,
                    PRIMARY KEY (`Id`),
                    UNIQUE KEY `IX_Users_Username` (`Username`),
                    UNIQUE KEY `IX_Users_Email` (`Email`)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
            ");
        }
        catch (Exception)
        {
            // Table may already exist or running in-memory provider
        }

        if (!await context.Roles.AnyAsync())
        {
            var adminRole = new AppRole
            {
                Name = "Administrator",
                DisplayName = "Directorio Concierge Master",
                Description = "Acceso irrestricto: Gestión completa de usuarios, roles, tours, finanzas y configuración general del Atelier.",
                Permissions = "[\"dashboard\",\"bookings\",\"concierge\",\"tours\",\"users\",\"roles\",\"media\",\"contacts\",\"testimonials\"]",
                IsSystemRole = true,
                CreatedAt = DateTime.UtcNow
            };

            var editorRole = new AppRole
            {
                Name = "Editor",
                DisplayName = "Curador de Expediciones & Viajes",
                Description = "Diseño de itinerarios, consulta de reservas y cotización bespoke de propuestas.",
                Permissions = "[\"tours\",\"bookings:read\",\"concierge\"]",
                IsSystemRole = true,
                CreatedAt = DateTime.UtcNow
            };

            var conciergeRole = new AppRole
            {
                Name = "Concierge",
                DisplayName = "Concierge VIP & Operaciones",
                Description = "Seguimiento personalizado de huéspedes vía WhatsApp, gestión de reservas y vouchers de viaje.",
                Permissions = "[\"bookings\",\"concierge\",\"contacts\"]",
                IsSystemRole = false,
                CreatedAt = DateTime.UtcNow
            };

            var financeRole = new AppRole
            {
                Name = "Finanzas",
                DisplayName = "Administración & Finanzas",
                Description = "Supervisión de métricas financieras, validación de pagos, depósitos de garantía y régimen tributario IGV.",
                Permissions = "[\"dashboard\",\"bookings:read\",\"payments\"]",
                IsSystemRole = false,
                CreatedAt = DateTime.UtcNow
            };

            await context.Roles.AddRangeAsync(adminRole, editorRole, conciergeRole, financeRole);
            await context.SaveChangesAsync();
        }

        if (!await context.Users.AnyAsync())
        {
            var adminRole = await context.Roles.FirstOrDefaultAsync(r => r.Name == "Administrator");
            var editorRole = await context.Roles.FirstOrDefaultAsync(r => r.Name == "Editor");

            var adminUser = new AppUser
            {
                Username = "concierge@luxurymachupicchu.com",
                Email = "concierge@luxurymachupicchu.com",
                FullName = "Directorio Concierge Master",
                Role = "Administrator",
                RoleId = adminRole?.Id,
                PasswordHash = PasswordHasher.HashPassword("MachuPicchuLuxury2026!"),
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            var editorUser = new AppUser
            {
                Username = "editor@luxurymachupicchu.com",
                Email = "editor@luxurymachupicchu.com",
                FullName = "Editor de Curaduría & Experiencias",
                Role = "Editor",
                RoleId = editorRole?.Id,
                PasswordHash = PasswordHasher.HashPassword("LuxuryEditor2026!"),
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            await context.Users.AddRangeAsync(adminUser, editorUser);
        }

        await context.SaveChangesAsync();
    }

    private static async Task SeedOfficialLmptravelToursAsync(LuxuryMachupicchuDbContext context)
    {
        // 1. Ensure Amazon & Rainforest Lodges Category exists
        var catAmazon = await context.Categories.FirstOrDefaultAsync(c => c.Slug == "amazon-rainforest");
        if (catAmazon == null)
        {
            catAmazon = new Category
            {
                NameEn = "Amazon & Rainforest Lodges",
                NameEs = "Amazonía y Lodges de Lujo",
                Slug = "amazon-rainforest",
                DescriptionEn = "Untouched rainforest biodiversity, private river navigation, and luxury canopy lodges in Tambopata and Iquitos.",
                DescriptionEs = "Biodiversidad virgen en la selva amazónica, navegación fluvial privada y lodges de lujo en Tambopata e Iquitos.",
                Icon = "compass",
                DisplayOrder = 5,
                IsActive = true
            };
            await context.Categories.AddAsync(catAmazon);
            await context.SaveChangesAsync();
        }

        // Ensure category names adhere to "Experience" terminology
        var catGlamping = await context.Categories.FirstOrDefaultAsync(c => c.Slug == "vip-glamping-expeditions");
        if (catGlamping != null && (catGlamping.NameEn.Contains("Expeditions") || catGlamping.NameEs.Contains("Expediciones")))
        {
            catGlamping.NameEn = "VIP Glamping & Experiences";
            catGlamping.NameEs = "Glamping VIP y Experiencias";
            await context.SaveChangesAsync();
        }

        var catSanctuary = await context.Categories.FirstOrDefaultAsync(c => c.Slug == "sanctuary-prive");
        var catTrains = await context.Categories.FirstOrDefaultAsync(c => c.Slug == "luxury-rail-journeys");
        var catValley = await context.Categories.FirstOrDefaultAsync(c => c.Slug == "sacred-valley-mysticism");

        int amazonCatId = catAmazon.Id;
        int sanctuaryCatId = catSanctuary?.Id ?? 2;
        int trainsCatId = catTrains?.Id ?? 1;
        int valleyCatId = catValley?.Id ?? 3;

        // =========================================================================
        // TOUR 1: Cusco Golden City (5 Days / 4 Nights)
        // =========================================================================
        if (!await context.Tours.AnyAsync(t => t.Slug == "cusco-golden-city"))
        {
            var tourCuscoGolden = new Tour
            {
                TitleEn = "Cusco Golden City",
                TitleEs = "Cusco Ciudad Dorada",
                Slug = "cusco-golden-city",
                SubtitleEn = "Imperial Incan capital, Sacred Valley artisan villages, and majestic private Machu Picchu exploration.",
                SubtitleEs = "Capital imperial inca, poblados artesanos del Valle Sagrado y exploración privada de Machu Picchu.",
                DescriptionEn = "Discover the wonders of Cusco and the Sacred Valley with a 5-day private experience that culminates at the majestic Machu Picchu. Begin your journey with a warm welcome in Cusco, immerse yourself in colonial and Incan architecture at Koricancha and Sacsayhuaman, explore Pisaq and Urubamba in the Sacred Valley, and witness the sunrise over the Wonder of the World before returning in supreme comfort.",
                DescriptionEs = "Descubra las maravillas de Cusco y el Valle Sagrado con una experiencia privada de 5 días que culmina en el majestuoso Machu Picchu. Inicie con una cálida bienvenida en Cusco, sumérjase en la arquitectura colonial e inca en Koricancha y Sacsayhuamán, recorra Pisaq y Urubamba en el Valle Sagrado, y contemple el amanecer sobre la Maravilla del Mundo antes de retornar con máxima comodidad.",
                CategoryId = sanctuaryCatId,
                DurationEn = "5 Days / 4 Nights",
                DurationEs = "5 Días / 4 Noches",
                DurationDays = 5,
                PriceUsd = 1900.00m,
                PricePen = 7220.00m,
                DifficultyEn = "Leisure & Cultural",
                DifficultyEs = "Cultural y Placentero",
                AltitudeMax = "3,800 m / 12,467 ft",
                StartingPoint = "Cusco Airport (Alejandro Velasco Astete)",
                StyleTag = "Sanctuary Privé & Imperial Heritage",
                Featured = true,
                IsActive = true,
                DisplayOrder = 5,
                MainImageUrl = "https://lmptravel.com/wp-content/uploads/2023/02/cuscogolden.jpg",
                GalleryImagesJson = JsonSerializer.Serialize(new[]
                {
                    "https://lmptravel.com/wp-content/uploads/2023/02/cuscogolden.jpg",
                    "https://lmptravel.com/wp-content/uploads/2023/02/cusco_galllery1.jpg",
                    "https://lmptravel.com/wp-content/uploads/2023/02/cusco_gallery2.jpg",
                    "https://lmptravel.com/wp-content/uploads/2023/02/mapi_gallery3.jpg",
                    "https://lmptravel.com/wp-content/uploads/2023/02/doce_angulos_gallery4.jpg"
                }),
                IncludedJsonEn = JsonSerializer.Serialize(new[]
                {
                    "Private airport reception and luxury transfers in Cusco and Sacred Valley",
                    "All official entrance tickets to archaeological parks (Cusco BTC & Sacred Valley)",
                    "Pre-reserved priority entrance permits to Machu Picchu Sanctuary",
                    "Certified bilingual private archaeologist guide throughout the journey",
                    "Panoramic Vistadome or 360° rail journey to Aguas Calientes",
                    "VIP citadel shuttle bus transfers up and down the mountain",
                    "Gourmet Andean buffet lunch during Sacred Valley exploration",
                    "24/7 dedicated VIP Concierge support and luggage assistance"
                }),
                IncludedJsonEs = JsonSerializer.Serialize(new[]
                {
                    "Recepción privada en aeropuerto y traslados de lujo en Cusco y Valle Sagrado",
                    "Todos los boletos de ingreso a parques arqueológicos (Boleto Turístico del Cusco)",
                    "Boletos oficiales pre-reservados con acceso preferente al Santuario de Machu Picchu",
                    "Guía arqueólogo privado colegiado bilingüe durante todo el recorrido",
                    "Boletos de tren panorámico Vistadome o Voyager hacia Aguas Calientes",
                    "Traslados en bus VIP exclusivo de subida y bajada al santuario",
                    "Almuerzo buffet gourmet andino durante el tour en el Valle Sagrado",
                    "Asistencia de Concierge VIP 24/7 y gestión privada de equipaje"
                }),
                NotIncludedJsonEn = JsonSerializer.Serialize(new[]
                {
                    "Domestic and international flights",
                    "Discretionary gratuities for guides and drivers",
                    "Travel and medical insurance",
                    "Personal incidentals and alcoholic beverages outside scheduled lunches"
                }),
                NotIncludedJsonEs = JsonSerializer.Serialize(new[]
                {
                    "Vuelos domésticos e internacionales",
                    "Propinas discrecionales para guías y conductores",
                    "Seguro médico internacional de viaje",
                    "Consumos personales y bebidas fuera de los almuerzos incluidos"
                }),
                HighlightsJsonEn = JsonSerializer.Serialize(new[]
                {
                    "Private access to Sacsayhuaman megalithic fortress with certified historian",
                    "Vibrant artisan textile market and dramatic mountain terraces of Pisaq",
                    "Serene morning exploration of Machu Picchu citadel before mid-day crowds"
                }),
                HighlightsJsonEs = JsonSerializer.Serialize(new[]
                {
                    "Acceso privado a la fortaleza megalítica de Sacsayhuamán con historiador colegiado",
                    "Mercado artesanal textil y terrazas agrícolas monumentales de Pisaq",
                    "Recorrido matutino en Machu Picchu con brumas místicas antes de la llegada masiva"
                }),
                LocationsJson = JsonSerializer.Serialize(new[] { "cusco", "mp" }),
                AltitudeProfileJson = JsonSerializer.Serialize(new
                {
                    startingAltitude = "3,400 m / 11,152 ft",
                    maxAltitude = "3,800 m / 12,467 ft",
                    sleepingAltitude = "2,870 m / 9,416 ft",
                    oxygenPercentage = 75,
                    tipEn = "Gradual acclimatization protocol with initial rest in the milder elevation of the Sacred Valley ensures complete comfort throughout your stay.",
                    tipEs = "El protocolo de aclimatación progresiva con descanso en el Valle Sagrado garantiza una experiencia sumamente confortable y segura."
                })
            };

            await context.Tours.AddAsync(tourCuscoGolden);
            await context.SaveChangesAsync();

            var days1 = new List<ItineraryDay>
            {
                new ItineraryDay
                {
                    TourId = tourCuscoGolden.Id,
                    DayNumber = 1,
                    TitleEn = "Welcome to Cusco & Acclimatization",
                    TitleEs = "Bienvenida a Cusco y Aclimatación",
                    DescriptionEn = "Fly to Cusco, located over 11,000 feet above sea level. Meet your private concierge host and transfer in an executive vehicle to your luxury hotel. Personalized briefing with your private guide to explore the historic quarter at your own pace.",
                    DescriptionEs = "Vuelo a Cusco a más de 3,300 msnm. Recepción por su anfitrión privado y traslado ejecutivo a su hotel de lujo. Charla informativa personalizada con su guía privado para disfrutar del centro histórico a su ritmo.",
                    GourmetDiningEn = "Welcome Andean coca tea & gourmet dining recommendations",
                    GourmetDiningEs = "Té de coca de bienvenida y cena gourmet sugerida",
                    PrivateTransferEn = "Private executive airport to hotel transfer",
                    PrivateTransferEs = "Traslado privado ejecutivo aeropuerto - hotel"
                },
                new ItineraryDay
                {
                    TourId = tourCuscoGolden.Id,
                    DayNumber = 2,
                    TitleEn = "Cusco Imperial City Tour & Sacsayhuaman",
                    TitleEs = "Tour Ciudad Imperial de Cusco y Sacsayhuamán",
                    DescriptionEn = "Discover Cusco on a private tour: the Cathedral on Plaza de Armas and the golden Koricancha Temple of the Sun. Continue to the megalithic fortress of Sacsayhuaman, Qenqo, Puka Pukara and Tambomachay. Afternoon at leisure for boutique shopping in San Blas.",
                    DescriptionEs = "Descubra Cusco en un recorrido privado: la Catedral en la Plaza de Armas y el Templo del Sol Koricancha. Continúe hacia la fortaleza megalítica de Sacsayhuamán, Qenqo, Puka Pukara y Tambomachay. Tarde libre en el barrio bohemio de San Blas.",
                    GourmetDiningEn = "Gourmet Andean lunch in Cusco historic center",
                    GourmetDiningEs = "Almuerzo gourmet andino en el centro histórico de Cusco",
                    PrivateTransferEn = "Private Mercedes-Benz Sprinter with dedicated chauffeur",
                    PrivateTransferEs = "Mercedes-Benz Sprinter privada con chofer dedicado"
                },
                new ItineraryDay
                {
                    TourId = tourCuscoGolden.Id,
                    DayNumber = 3,
                    TitleEn = "Sacred Valley of the Incas: Pisaq & Ollantaytambo",
                    TitleEs = "Valle Sagrado de los Incas: Pisaq y Ollantaytambo",
                    DescriptionEn = "Journey through the fertile Sacred Valley. Explore the artisan markets and mountaintop Inca terraces of Pisaq. Savor regional dishes based on native quinoa and fresh valley produce in Urubamba, followed by the living Inca fortress town of Ollantaytambo.",
                    DescriptionEs = "Travesía por el fértil Valle Sagrado. Explore los mercados artesanos y terrazas agrícolas de Pisaq. Disfrute de un banquete campestre con insumos nativos en Urubamba, seguido de la imponente fortaleza viva de Ollantaytambo.",
                    GourmetDiningEn = "Buffet lunch featuring Sacred Valley organic produce",
                    GourmetDiningEs = "Almuerzo campestre con productos orgánicos del Valle Sagrado",
                    PrivateTransferEn = "Full-day private executive transport",
                    PrivateTransferEs = "Transporte ejecutivo privado durante todo el día"
                },
                new ItineraryDay
                {
                    TourId = tourCuscoGolden.Id,
                    DayNumber = 4,
                    TitleEn = "Machu Picchu, Wonder of the World!",
                    TitleEs = "Machu Picchu, ¡Maravilla del Mundo!",
                    DescriptionEn = "Board the panoramic train along the Urubamba river canyon. Ascend to the Machu Picchu citadel with your private archaeologist. Explore the Temple of the Sun, Sacred Plaza, and Intihuatana terrace before descending and returning comfortably to Cusco.",
                    DescriptionEs = "Aborde el tren panorámico a lo largo del cañón del río Urubamba. Ascienda a la ciudadela de Machu Picchu con su arqueólogo privado. Recorra el Templo del Sol, la Plaza Sagrada y el Intihuatana antes de descender y regresar cómodamente a Cusco.",
                    GourmetDiningEn = "A la carte lunch at Aguas Calientes overlooking the cloud forest",
                    GourmetDiningEs = "Almuerzo a la carta en Aguas Calientes frente al bosque de nubes",
                    PrivateTransferEn = "Panoramic train tickets & private citadel shuttle",
                    PrivateTransferEs = "Boletos de tren panorámico y bus exclusivo al santuario"
                },
                new ItineraryDay
                {
                    TourId = tourCuscoGolden.Id,
                    DayNumber = 5,
                    TitleEn = "San Blas Artisan Quarter & Cusco - Lima Departure",
                    TitleEs = "Barrio Artesano de San Blas y Retorno Cusco - Lima",
                    DescriptionEn = "Morning stroll through the bohemian stone alleys of San Blas and the San Pedro Market for fresh Andean fruits and textiles. Private transfer to Cusco Airport for your departing flight to Lima.",
                    DescriptionEs = "Paseo matutino por las callejuelas empedradas de San Blas y el Mercado de San Pedro. Traslado privado al Aeropuerto de Cusco para su vuelo de conexión a Lima.",
                    GourmetDiningEn = "Gourmet farewell breakfast",
                    GourmetDiningEs = "Desayuno gourmet de despedida",
                    PrivateTransferEn = "Private transfer hotel - Cusco airport",
                    PrivateTransferEs = "Traslado privado hotel - aeropuerto de Cusco"
                }
            };
            await context.ItineraryDays.AddRangeAsync(days1);
            await context.SaveChangesAsync();
        }

        // =========================================================================
        // TOUR 2: Inkaterra Hacienda Concepción (3 Days / 2 Nights)
        // =========================================================================
        if (!await context.Tours.AnyAsync(t => t.Slug == "inkaterra-hacienda-concepcion"))
        {
            var tourInkaterra = new Tour
            {
                TitleEn = "Inkaterra Hacienda Concepción",
                TitleEs = "Inkaterra Hacienda Concepción",
                Slug = "inkaterra-hacienda-concepcion",
                SubtitleEn = "Pristine Amazonian rainforest sanctuary, Lake Sandoval river otters and canopy trails in Tambopata.",
                SubtitleEs = "Santuario de selva virgen en Tambopata, nutrias gigantes en el Lago Sandoval y puentes colgantes.",
                DescriptionEn = "Travelling to Tambopata National Reserve offers a unique opportunity to discover a lively biodiversity of birds, mammals, reptiles and trees. Located on the banks of the Madre de Dios River, Inkaterra Hacienda Concepción combines sustainable luxury and immersion in the primary Amazonian rainforest. Explore Lake Sandoval by wooden canoe, encounter howler monkeys and giant river otters, and walk the treetop canopy walkways.",
                DescriptionEs = "Viajar a la Reserva Nacional Tambopata ofrece una oportunidad incomparable para descubrir la biodiversidad más densa de la Amazonía. Situado a orillas del río Madre de Dios, Inkaterra Hacienda Concepción fusiona confort ecológico y contacto con la selva primaria. Navegue en canoa por el Lago Sandoval, aviste lobos de río y monos aulladores, y camine sobre puentes colgantes entre las copas de los árboles.",
                CategoryId = amazonCatId,
                DurationEn = "3 Days / 2 Nights",
                DurationEs = "3 Días / 2 Noches",
                DurationDays = 3,
                PriceUsd = 1450.00m,
                PricePen = 5510.00m,
                DifficultyEn = "Tropical Leisure & Nature Walk",
                DifficultyEs = "Paseos Naturales & Confort Tropical",
                AltitudeMax = "183 m / 600 ft",
                StartingPoint = "Puerto Maldonado Airport (PEM)",
                StyleTag = "Amazon Ecolodge & Wildlife Sanctuary",
                Featured = true,
                IsActive = true,
                DisplayOrder = 6,
                MainImageUrl = "https://lmptravel.com/wp-content/uploads/2023/02/inkaterra_tambopata_840px.jpg",
                GalleryImagesJson = JsonSerializer.Serialize(new[]
                {
                    "https://lmptravel.com/wp-content/uploads/2023/02/inkaterra_tambopata_840px.jpg",
                    "https://lmptravel.com/wp-content/uploads/2023/02/inkaterra_hacienda_concepcion_lmp_travel.jpg",
                    "https://lmptravel.com/wp-content/uploads/2023/02/hacienda_concepcion_lmp_travel.jpg",
                    "https://lmptravel.com/wp-content/uploads/2023/02/lmp_travel_hacienda_concepcion.jpg",
                    "https://lmptravel.com/wp-content/uploads/2023/02/03_tambomachay.jpg"
                }),
                IncludedJsonEn = JsonSerializer.Serialize(new[]
                {
                    "Airport reception and roundtrip motorized river canoe transfers in Puerto Maldonado",
                    "Private cabaña accommodation at Inkaterra Hacienda Concepción",
                    "All gourmet meals prepared with fresh native organic Amazonian ingredients",
                    "Certified bilingual native naturalist guide for all rainforest excursions",
                    "Private wooden dugout canoe excursion on Lake Sandoval in Tambopata Reserve",
                    "Canopy Walkway suspension bridge entrance and twilight river navigation",
                    "Inkaterra Butterfly House exclusive visit and cocktail reception"
                }),
                IncludedJsonEs = JsonSerializer.Serialize(new[]
                {
                    "Recepción en aeropuerto y traslados fluviales en canoa a motor en Puerto Maldonado",
                    "Alojamiento en cabañas privadas en Inkaterra Hacienda Concepción",
                    "Todas las comidas gourmet preparadas con insumos frescos de la selva amazónica",
                    "Guía naturalista nativo bilingüe certificado para todas las excursiones",
                    "Excursión en canoa de madera por el Lago Sandoval en la Reserva Nacional Tambopata",
                    "Paseo por los puentes colgantes Canopy Walkway y navegación crepuscular de caimanes",
                    "Visita exclusiva al Mariposario Inkaterra y cóctel de bienvenida"
                }),
                NotIncludedJsonEn = JsonSerializer.Serialize(new[]
                {
                    "Flights to and from Puerto Maldonado",
                    "Bar consumptions and vintage wines outside meal menus",
                    "Gratuities for lodge staff and boat captains",
                    "Travel insurance"
                }),
                NotIncludedJsonEs = JsonSerializer.Serialize(new[]
                {
                    "Vuelos hacia y desde Puerto Maldonado",
                    "Consumos de bar y licores fuera de los menús incluidos",
                    "Propinas para personal de lodge y capitanes de embarcación",
                    "Seguro de viaje"
                }),
                HighlightsJsonEn = JsonSerializer.Serialize(new[]
                {
                    "Serene canoe exploration of Lake Sandoval observing endangered giant river otters",
                    "Treetop perspective 30 meters above the forest floor on the Inkaterra Canopy Walkway",
                    "Twilight river navigation spotting caimans and nocturnal constellations"
                }),
                HighlightsJsonEs = JsonSerializer.Serialize(new[]
                {
                    "Navegación silenciosa en el Lago Sandoval con avistamiento de nutrias gigantes de río",
                    "Vistas panorámicas a 30 metros de altura en los puentes colgantes Canopy Walkway",
                    "Navegación nocturna por el río Madre de Dios en busca de caimanes y fauna crepuscular"
                }),
                LocationsJson = JsonSerializer.Serialize(new[] { "tambopata" }),
                AltitudeProfileJson = JsonSerializer.Serialize(new
                {
                    startingAltitude = "183 m / 600 ft",
                    maxAltitude = "200 m / 656 ft",
                    sleepingAltitude = "183 m / 600 ft",
                    oxygenPercentage = 100,
                    tipEn = "Located at sea-level equivalent elevation in the Amazon basin with rich 100% ambient oxygen, providing restorative comfort before or after mountain excursions.",
                    tipEs = "Ubicado a nivel de la cuenca amazónica con 100% de oxígeno ambiental, ideal para descansar y revitalizarse antes o después de los Andes."
                })
            };

            await context.Tours.AddAsync(tourInkaterra);
            await context.SaveChangesAsync();

            var days2 = new List<ItineraryDay>
            {
                new ItineraryDay
                {
                    TourId = tourInkaterra.Id,
                    DayNumber = 1,
                    TitleEn = "Puerto Maldonado - Madre de Dios River Navigation & Concepción Trails",
                    TitleEs = "Puerto Maldonado - Navegación por Río Madre de Dios y Senderos Concepción",
                    DescriptionEn = "Arrival in Puerto Maldonado. Transfer to the river port and navigate by motorized canoe along the Madre de Dios River (25 min) to Inkaterra Hacienda Concepción. Organic welcome lunch. Afternoon guided nature walk through primary rainforest trails learning about medicinal flora and native fauna. Twilight river navigation to spot nocturnal caimans.",
                    DescriptionEs = "Llegada a Puerto Maldonado. Traslado al puerto fluvial y navegación en canoa motorizada por el río Madre de Dios (25 min) hacia Inkaterra Hacienda Concepción. Almuerzo de bienvenida con insumos orgánicos. Caminata guiada por senderos de selva primaria conociendo plantas medicinales. Navegación crepuscular en busca de caimanes.",
                    GourmetDiningEn = "Organic Amazonian lunch & à la carte dinner",
                    GourmetDiningEs = "Almuerzo amazónico orgánico y cena a la carta",
                    PrivateTransferEn = "Airport reception and motorized river canoe navigation",
                    PrivateTransferEs = "Recepción en aeropuerto y navegación fluvial en canoa a motor"
                },
                new ItineraryDay
                {
                    TourId = tourInkaterra.Id,
                    DayNumber = 2,
                    TitleEn = "Lake Sandoval Oxbow Exploration & Inkaterra Canopy Walkway",
                    TitleEs = "Exploración en el Lago Sandoval y Puentes Colgantes Canopy Walkway",
                    DescriptionEn = "Nutritious tropical breakfast. Guided trek into Tambopata National Reserve towards Lake Sandoval. Paddle across the mirror-like oxbow lake home to giant river otters, hoatzins, and red howler monkeys. In the afternoon, ascend the 30-meter high Inkaterra Canopy Walkway across suspension bridges through the jungle treetops.",
                    DescriptionEs = "Desayuno tropical nutritivo. Caminata guiada hacia el Lago Sandoval dentro de la Reserva Nacional Tambopata. Navegación en canoa a remo avistando lobos de río gigantes, guacamayos y monos aulladores. Por la tarde, ascienda a 30 metros de altura en el Canopy Walkway cruzando puentes colgantes entre las copas de los árboles.",
                    GourmetDiningEn = "Full board: buffet breakfast, riverside lunch and rainforest dinner",
                    GourmetDiningEs = "Pensión completa: desayuno buffet, almuerzo campestre y cena gourmet",
                    PrivateTransferEn = "Private jungle boat and reserve trail transfers",
                    PrivateTransferEs = "Bote privado de selva y traslados en senderos de la reserva"
                },
                new ItineraryDay
                {
                    TourId = tourInkaterra.Id,
                    DayNumber = 3,
                    TitleEn = "Butterfly House Visit & Puerto Maldonado Airport",
                    TitleEs = "Visita al Mariposario y Salida Aeropuerto Puerto Maldonado",
                    DescriptionEn = "Morning boat transfer back to Puerto Maldonado. Visit the Inkaterra Butterfly House to admire the metamorphosis of colorful Amazonian species before your flight connection.",
                    DescriptionEs = "Navegación matutina de retorno a Puerto Maldonado. Visita al Mariposario Inkaterra para conocer la metamorfosis y colores de especies amazónicas antes de abordar su vuelo de conexión.",
                    GourmetDiningEn = "Tropical buffet breakfast",
                    GourmetDiningEs = "Desayuno buffet tropical",
                    PrivateTransferEn = "Motorized canoe and airport shuttle transfer",
                    PrivateTransferEs = "Canoa a motor y traslado privado al aeropuerto"
                }
            };
            await context.ItineraryDays.AddRangeAsync(days2);
            await context.SaveChangesAsync();
        }

        // =========================================================================
        // TOUR 3: Luxury Machu Picchu Peru (7 Days / 6 Nights)
        // =========================================================================
        if (!await context.Tours.AnyAsync(t => t.Slug == "luxury-machu-picchu-peru"))
        {
            var tourLuxuryMp = new Tour
            {
                TitleEn = "Luxury Machu Picchu Peru",
                TitleEs = "Machu Picchu de Lujo Perú",
                Slug = "luxury-machu-picchu-peru",
                SubtitleEn = "Seven days of five-star Andean immersion, Belmond Hiram Bingham rail, and private master archaeologist curation.",
                SubtitleEs = "Siete días de inmersión andina cinco estrellas, tren Belmond Hiram Bingham y arqueólogo privado.",
                DescriptionEn = "An exquisite 7-day luxury journey capturing the absolute zenith of Peru. Commencing in Lima's historic mansions, moving to the imperial cobblestones of Cusco, descending through the microclimates and luxury haciendas of the Sacred Valley, and climaxing with VIP Pullman travel aboard the Belmond Hiram Bingham train with exclusive Sanctuary Lodge hospitality.",
                DescriptionEs = "Una exclusiva travesía de lujo de 7 días que captura el cenit del Perú. Inicia en las mansiones virreinales de Lima, continúa por las calles empedradas de Cusco, desciende por las haciendas privadas del Valle Sagrado y culmina con el viaje en tren Belmond Hiram Bingham y la hospitalidad del Belmond Sanctuary Lodge.",
                CategoryId = trainsCatId,
                DurationEn = "7 Days / 6 Nights",
                DurationEs = "7 Días / 6 Noches",
                DurationDays = 7,
                PriceUsd = 4100.00m,
                PricePen = 15580.00m,
                DifficultyEn = "Refined & Leisurely",
                DifficultyEs = "Refinado y Confortable",
                AltitudeMax = "3,500 m / 11,480 ft",
                StartingPoint = "Lima (Jorge Chávez International Airport)",
                StyleTag = "Belmond Hiram Bingham Signature",
                Featured = true,
                IsActive = true,
                DisplayOrder = 7,
                MainImageUrl = "https://lmptravel.com/wp-content/uploads/2023/01/01_machu_picchu.jpg",
                GalleryImagesJson = JsonSerializer.Serialize(new[]
                {
                    "https://lmptravel.com/wp-content/uploads/2023/01/01_machu_picchu.jpg",
                    "https://lmptravel.com/wp-content/uploads/2023/01/02-machu-picchu.jpg",
                    "https://lmptravel.com/wp-content/uploads/2023/01/luxury_mapi_gallery.jpg",
                    "https://lmptravel.com/wp-content/uploads/2023/01/04_machu-picchu.jpg",
                    "https://lmptravel.com/wp-content/uploads/2024/11/machu-picchu-grande.jpg"
                }),
                IncludedJsonEn = JsonSerializer.Serialize(new[]
                {
                    "Roundtrip Belmond Hiram Bingham Pullman rail journey with fine wines and gourmet dining",
                    "Exclusive Afternoon Tea on the panoramic gardens of Belmond Sanctuary Lodge",
                    "Pre-reserved priority entrance permits to Circuit 1 or 2 with private certified archaeologist",
                    "Private executive chauffeur and bilingual guide in Lima, Sacred Valley, and Cusco",
                    "All admissions to private museums, cathedrals, Maras salt pans, and Inca fortresses",
                    "Private Paso Horse exhibition and multi-course artisanal lunch at Hacienda Huayoccari",
                    "24/7 dedicated in-country Concierge support and seamless luggage transit"
                }),
                IncludedJsonEs = JsonSerializer.Serialize(new[]
                {
                    "Viaje de ida y retorno en el tren Belmond Hiram Bingham con gastronomía gourmet y maridaje",
                    "Té de la tarde exclusivo en los jardines panorámicos de Belmond Sanctuary Lodge",
                    "Boletos de ingreso preferencial con arqueólogo colegiado privado (Circuito 1 o 2)",
                    "Chofer ejecutivo y guía privado bilingüe en Lima, Valle Sagrado y Cusco",
                    "Todos los accesos a museos virreinales, salineras de Maras y ciudadelas incas",
                    "Exhibición privada de caballos peruanos de paso y almuerzo gourmet en Hacienda Huayoccari",
                    "Servicio de Concierge VIP 24/7 y traslado integral de equipaje entre hoteles"
                }),
                NotIncludedJsonEn = JsonSerializer.Serialize(new[]
                {
                    "International airfare to Peru",
                    "Personal discretionary purchases and spa treatments",
                    "Gratuities for train personnel and private guides"
                }),
                NotIncludedJsonEs = JsonSerializer.Serialize(new[]
                {
                    "Vuelos internacionales hacia Perú",
                    "Gastos personales y tratamientos de spa",
                    "Propinas para tripulación del tren y guías privados"
                }),
                HighlightsJsonEn = JsonSerializer.Serialize(new[]
                {
                    "Vintage 1920s Pullman elegance and live acoustic music on the Belmond Hiram Bingham",
                    "Unobstructed morning serenity across the sacred terraces of Machu Picchu",
                    "Private dining inside historic haciendas overlooking the Vilcanota mountain range"
                }),
                HighlightsJsonEs = JsonSerializer.Serialize(new[]
                {
                    "Elegancia Pullman años 20 y música acústica en vivo a bordo del Belmond Hiram Bingham",
                    "Amanecer sereno y vistas despejadas en las terrazas superiores de Machu Picchu",
                    "Almuerzos campestres de autor en haciendas históricas con vista a los nevados del valle"
                }),
                LocationsJson = JsonSerializer.Serialize(new[] { "lima", "cusco", "mp" }),
                AltitudeProfileJson = JsonSerializer.Serialize(new
                {
                    startingAltitude = "154 m / 505 ft",
                    maxAltitude = "3,500 m / 11,480 ft",
                    sleepingAltitude = "2,870 m / 9,416 ft",
                    oxygenPercentage = 80,
                    tipEn = "Thoughtfully sequenced itinerary descending to the lush Sacred Valley on Day 3 for seamless acclimatization prior to citadel exploration.",
                    tipEs = "Secuencia diseñada médicamente que desciende al Valle Sagrado en el Día 3 para una aclimatación óptima antes de visitar la ciudadela."
                })
            };

            await context.Tours.AddAsync(tourLuxuryMp);
            await context.SaveChangesAsync();

            var days3 = new List<ItineraryDay>
            {
                new ItineraryDay
                {
                    TourId = tourLuxuryMp.Id,
                    DayNumber = 1,
                    TitleEn = "Arrival in Lima - Gastronomic Capital",
                    TitleEs = "Llegada a Lima - Capital Gastronómica",
                    DescriptionEn = "Welcome to Peru. Executive chauffeur transfer from Lima International Airport to your luxury oceanfront hotel in Miraflores. Evening at leisure to savor world-renowned Peruvian gastronomy.",
                    DescriptionEs = "Bienvenido al Perú. Traslado ejecutivo privado desde el Aeropuerto de Lima hacia su hotel de lujo con vista al mar en Miraflores. Noche libre para disfrutar de la alta cocina limeña.",
                    GourmetDiningEn = "Curated fine-dining reservation in Miraflores or San Isidro",
                    GourmetDiningEs = "Reserva en restaurante de alta gastronomía en Miraflores o San Isidro",
                    PrivateTransferEn = "Private luxury sedan with executive chauffeur",
                    PrivateTransferEs = "Sedán de lujo privado con chofer ejecutivo"
                },
                new ItineraryDay
                {
                    TourId = tourLuxuryMp.Id,
                    DayNumber = 2,
                    TitleEn = "Flight to Cusco - Discovering the Imperial Capital",
                    TitleEs = "Vuelo a Cusco - Descubriendo la Capital Imperial",
                    DescriptionEn = "Morning flight to Cusco. Check in to your heritage hotel with oxygen-enriched suite. Afternoon private walking tour of the Koricancha Temple of the Sun, the Cathedral, and ancient Inca stone alleys.",
                    DescriptionEs = "Vuelo matutino hacia Cusco. Registro en su hotel boutique con suite climatizada con oxígeno. Recorrido privado a pie por el Templo del Sol Koricancha, la Catedral y las calzadas incas.",
                    GourmetDiningEn = "Contemporary Andean lunch with local ingredient pairings",
                    GourmetDiningEs = "Almuerzo andino contemporáneo maridado con insumos locales",
                    PrivateTransferEn = "Private airport transfers in Lima and Cusco",
                    PrivateTransferEs = "Traslados privados aeropuerto en Lima y Cusco"
                },
                new ItineraryDay
                {
                    TourId = tourLuxuryMp.Id,
                    DayNumber = 3,
                    TitleEn = "Sacred Valley: Pisaq Terraces & Traditional Weaving",
                    TitleEs = "Valle Sagrado: Terrazas de Pisaq y Arte Textil",
                    DescriptionEn = "Descend into the mild Sacred Valley. Explore the high Inca agricultural terraces of Pisaq and meet master Andean weavers preserving ancestral natural dye techniques.",
                    DescriptionEs = "Descenso al templado Valle Sagrado. Explore las terrazas agrícolas de Pisaq y conozca a maestras tejedoras que conservan el teñido natural ancestral.",
                    GourmetDiningEn = "4-course garden lunch at an exclusive valley estate",
                    GourmetDiningEs = "Almuerzo campestre de 4 tiempos en hacienda exclusiva",
                    PrivateTransferEn = "Mercedes-Benz Sprinter with oxygen and refreshments",
                    PrivateTransferEs = "Mercedes-Benz Sprinter con oxígeno y refrigerios"
                },
                new ItineraryDay
                {
                    TourId = tourLuxuryMp.Id,
                    DayNumber = 4,
                    TitleEn = "Maras Salt Mines, Moray Laboratories & Paso Horses",
                    TitleEs = "Salineras de Maras, Laboratorios de Moray y Caballos de Paso",
                    DescriptionEn = "Private excursion to Moray's concentric terraces and the thousands of pink salt pans of Maras. Savor an artisanal feast accompanied by private Peruvian Paso Horse demonstrations.",
                    DescriptionEs = "Excursión privada a los anfiteatros concéntricos de Moray y las milenarias salineras de Maras. Almuerzo campestre con exhibición privada de caballos peruanos de paso.",
                    GourmetDiningEn = "Artisanal feast at Hacienda Huayoccari",
                    GourmetDiningEs = "Banquete artesanal en Hacienda Huayoccari",
                    PrivateTransferEn = "Private executive chauffeur throughout the valley",
                    PrivateTransferEs = "Chofer ejecutivo privado en todo el valle"
                },
                new ItineraryDay
                {
                    TourId = tourLuxuryMp.Id,
                    DayNumber = 5,
                    TitleEn = "Belmond Hiram Bingham: The Pinnacle of Machu Picchu",
                    TitleEs = "Belmond Hiram Bingham: La Cúspide de Machu Picchu",
                    DescriptionEn = "Board the legendary Belmond Hiram Bingham. Savor a gourmet brunch with champagne as you glide through the Urubamba canyon. Private afternoon tour of Machu Picchu with your certified archaeologist, followed by Afternoon Tea at Belmond Sanctuary Lodge.",
                    DescriptionEs = "Aborde el legendario tren Belmond Hiram Bingham. Disfrute de un brunch gourmet con champaña a través del cañón del Urubamba. Recorrido privado por Machu Picchu con su arqueólogo, seguido de té en Belmond Sanctuary Lodge.",
                    GourmetDiningEn = "Brunch aboard Hiram Bingham & Belmond Afternoon Tea",
                    GourmetDiningEs = "Brunch a bordo del Hiram Bingham y Té en Belmond Sanctuary Lodge",
                    PrivateTransferEn = "Hiram Bingham train & VIP citadel shuttle",
                    PrivateTransferEs = "Tren Hiram Bingham y bus exclusivo al santuario"
                },
                new ItineraryDay
                {
                    TourId = tourLuxuryMp.Id,
                    DayNumber = 6,
                    TitleEn = "Sacsayhuaman Megaliths & Return to Cusco",
                    TitleEs = "Megalitos de Sacsayhuamán y Retorno a Cusco",
                    DescriptionEn = "Return in luxury to Cusco. Private guided exploration of the colossal stone ramparts of Sacsayhuaman and the mystical water fountains of Tambomachay. Evening gala dinner.",
                    DescriptionEs = "Retorno de lujo a Cusco. Exploración guiada privada de los colosales baluartes de Sacsayhuamán y las fuentes sagradas de Tambomachay. Cena de gala.",
                    GourmetDiningEn = "Gala tasting dinner in historic courtyard",
                    GourmetDiningEs = "Cena de degustación en patio virreinal",
                    PrivateTransferEn = "Private executive transfers",
                    PrivateTransferEs = "Traslados ejecutivos privados"
                },
                new ItineraryDay
                {
                    TourId = tourLuxuryMp.Id,
                    DayNumber = 7,
                    TitleEn = "Cusco - Lima & International Flight",
                    TitleEs = "Cusco - Lima y Conexión Internacional",
                    DescriptionEn = "Morning at leisure for last-minute jewelry and alpaca shopping. Private transfer to Cusco Airport for flight to Lima, connecting with your international flight home.",
                    DescriptionEs = "Mañana libre para compras de joyería y prendas de alpaca. Traslado privado al Aeropuerto de Cusco para conectar con su vuelo internacional en Lima.",
                    GourmetDiningEn = "Artisanal breakfast buffet",
                    GourmetDiningEs = "Desayuno buffet artesanal",
                    PrivateTransferEn = "Private airport transfers in Cusco and Lima",
                    PrivateTransferEs = "Traslados privados aeropuerto en Cusco y Lima"
                }
            };
            await context.ItineraryDays.AddRangeAsync(days3);
            await context.SaveChangesAsync();
        }

        // =========================================================================
        // TOUR 4: Machu Picchu Express (4 Days / 3 Nights)
        // =========================================================================
        if (!await context.Tours.AnyAsync(t => t.Slug == "machu-picchu-express"))
        {
            var tourMpExpress = new Tour
            {
                TitleEn = "Machu Picchu Express",
                TitleEs = "Machu Picchu Express",
                Slug = "machu-picchu-express",
                SubtitleEn = "The essential high-end 4-day escape: Sacred Valley private haciendas and priority Machu Picchu citadel access.",
                SubtitleEs = "La escapada esencial de alta gama en 4 días: haciendas privadas en el Valle Sagrado y acceso preferencial a Machu Picchu.",
                DescriptionEn = "Designed for travelers seeking the definitive Machu Picchu experience in compressed time without sacrificing supreme comfort. Seamless airport reception, gentle acclimatization in the Sacred Valley, luxury panoramic rail, private archaeologist guide, and four-star or five-star accommodations.",
                DescriptionEs = "Diseñado para viajeros que buscan la experiencia cumbre de Machu Picchu con el máximo confort en menor tiempo. Recepción impecable en aeropuerto, aclimatación suave en el Valle Sagrado, tren panorámico de lujo, guía arqueólogo privado y hotelería de primer nivel.",
                CategoryId = sanctuaryCatId,
                DurationEn = "4 Days / 3 Nights",
                DurationEs = "4 Días / 3 Noches",
                DurationDays = 4,
                PriceUsd = 2100.00m,
                PricePen = 7980.00m,
                DifficultyEn = "Leisure & Inspiring",
                DifficultyEs = "Placentero e Inspirador",
                AltitudeMax = "3,400 m / 11,152 ft",
                StartingPoint = "Cusco Airport",
                StyleTag = "Sanctuary Privé Express",
                Featured = true,
                IsActive = true,
                DisplayOrder = 8,
                MainImageUrl = "https://lmptravel.com/wp-content/uploads/2024/10/mapi5.jpg",
                GalleryImagesJson = JsonSerializer.Serialize(new[]
                {
                    "https://lmptravel.com/wp-content/uploads/2024/10/mapi5.jpg",
                    "https://lmptravel.com/wp-content/uploads/2024/10/mapi_express_gallery1.jpg",
                    "https://lmptravel.com/wp-content/uploads/2024/10/mapi_express_gallery2.jpg",
                    "https://lmptravel.com/wp-content/uploads/2024/10/mapi_express_gallery3.jpg",
                    "https://lmptravel.com/wp-content/uploads/2024/10/mapi_express_gallery4.jpg"
                }),
                IncludedJsonEn = JsonSerializer.Serialize(new[]
                {
                    "Private airport meet-and-greet with dedicated executive transport",
                    "Luxury panoramic train tickets with scenic views of Urubamba canyon",
                    "Pre-reserved priority entrance permits to Machu Picchu citadel",
                    "Certified bilingual private archaeologist guide",
                    "VIP shuttle bus passes directly to the Sanctuary gates",
                    "Gourmet lunch in Aguas Calientes and Andean buffet in Sacred Valley",
                    "24/7 dedicated Luxury Concierge coordination"
                }),
                IncludedJsonEs = JsonSerializer.Serialize(new[]
                {
                    "Recepción privada en aeropuerto con transporte ejecutivo dedicado",
                    "Boletos de tren panorámico de lujo con vistas privilegiadas del cañón",
                    "Boletos oficiales pre-reservados con ingreso preferente a Machu Picchu",
                    "Guía arqueólogo privado colegiado bilingüe",
                    "Pases en bus VIP directo a las puertas del Santuario",
                    "Almuerzo gourmet en Aguas Calientes y buffet andino en el Valle Sagrado",
                    "Coordinación de Concierge de Lujo 24/7"
                }),
                NotIncludedJsonEn = JsonSerializer.Serialize(new[]
                {
                    "Flights to Cusco",
                    "Gratuities for guides and chauffeurs",
                    "Personal expenses and travel insurance"
                }),
                NotIncludedJsonEs = JsonSerializer.Serialize(new[]
                {
                    "Vuelos hacia Cusco",
                    "Propinas para guías y choferes",
                    "Gastos personales y seguro de viaje"
                }),
                HighlightsJsonEn = JsonSerializer.Serialize(new[]
                {
                    "Immediate descent to the milder elevation of Sacred Valley for peak physiological comfort",
                    "Panoramic rail journey winding through sub-tropical cloud forest",
                    "Unrushed private archaeologist exploration of the Sun Temple and sacred plazas"
                }),
                HighlightsJsonEs = JsonSerializer.Serialize(new[]
                {
                    "Descenso directo al clima templado del Valle Sagrado para máximo bienestar fisiológico",
                    "Viaje en tren panorámico a través de los cañones del bosque de nubes",
                    "Visita privada con arqueólogo al Templo del Sol y las plazas sagradas"
                }),
                LocationsJson = JsonSerializer.Serialize(new[] { "cusco", "mp" }),
                AltitudeProfileJson = JsonSerializer.Serialize(new
                {
                    startingAltitude = "3,400 m / 11,152 ft",
                    maxAltitude = "3,400 m / 11,152 ft",
                    sleepingAltitude = "2,430 m / 7,972 ft",
                    oxygenPercentage = 80,
                    tipEn = "Perfect short getaway maximizing time at lower elevations in the Sacred Valley and Machu Picchu for effortless acclimatization.",
                    tipEs = "Escapada perfecta que optimiza el tiempo en altitudes menores en el Valle Sagrado y Machu Picchu para una aclimatación sencilla."
                })
            };

            await context.Tours.AddAsync(tourMpExpress);
            await context.SaveChangesAsync();

            var days4 = new List<ItineraryDay>
            {
                new ItineraryDay
                {
                    TourId = tourMpExpress.Id,
                    DayNumber = 1,
                    TitleEn = "Welcome to Cusco & Descent to Sacred Valley",
                    TitleEs = "Bienvenida a Cusco y Descenso al Valle Sagrado",
                    DescriptionEn = "Arrival at Cusco Airport. Greeted by your private concierge and immediately transferred to your luxury resort in the Sacred Valley. Relax and enjoy the mild Andean climate.",
                    DescriptionEs = "Llegada al Aeropuerto de Cusco. Recepción privada por su concierge y traslado directo a su resort en el Valle Sagrado. Descanso y disfrute del microclima templado.",
                    GourmetDiningEn = "Welcome herbal infusion and light organic dinner",
                    GourmetDiningEs = "Infusión herbal de bienvenida y cena ligera orgánica",
                    PrivateTransferEn = "Private executive Mercedes transfer from airport to valley",
                    PrivateTransferEs = "Traslado privado Mercedes ejecutivo de aeropuerto a valle"
                },
                new ItineraryDay
                {
                    TourId = tourMpExpress.Id,
                    DayNumber = 2,
                    TitleEn = "Sacred Valley Exploration & Ollantaytambo Fortress",
                    TitleEs = "Exploración del Valle Sagrado y Fortaleza de Ollantaytambo",
                    DescriptionEn = "Explore the living Inca town of Ollantaytambo with its massive stone terraces. In the afternoon, board your panoramic train to Aguas Calientes at the base of Machu Picchu.",
                    DescriptionEs = "Explore el pueblo inca vivo de Ollantaytambo con sus imponentes terrazas de piedra. Por la tarde, aborde el tren panorámico hacia Aguas Calientes al pie de Machu Picchu.",
                    GourmetDiningEn = "Andean valley lunch & fine dinner in Aguas Calientes",
                    GourmetDiningEs = "Almuerzo en el valle y cena gourmet en Aguas Calientes",
                    PrivateTransferEn = "Private transport and panoramic rail journey",
                    PrivateTransferEs = "Transporte privado y viaje en tren panorámico"
                },
                new ItineraryDay
                {
                    TourId = tourMpExpress.Id,
                    DayNumber = 3,
                    TitleEn = "Machu Picchu Wonder of the World & Cusco Return",
                    TitleEs = "Machu Picchu Maravilla del Mundo y Retorno a Cusco",
                    DescriptionEn = "Early ascent to Machu Picchu citadel. Private 3-hour curated tour with your archaeologist guide exploring the royal quarters and agricultural terraces. Afternoon train and private transfer back to Cusco.",
                    DescriptionEs = "Ascenso matutino a la ciudadela de Machu Picchu. Recorrido privado de 3 horas con su arqueólogo por el sector real y las terrazas agrícolas. Tren de retorno y traslado privado a Cusco.",
                    GourmetDiningEn = "Lunch overlooking the rainforest & farewell dinner in Cusco",
                    GourmetDiningEs = "Almuerzo frente al bosque de nubes y cena en Cusco",
                    PrivateTransferEn = "Citadel VIP bus, panoramic train & executive car to Cusco",
                    PrivateTransferEs = "Bus VIP al santuario, tren panorámico y vehículo ejecutivo a Cusco"
                },
                new ItineraryDay
                {
                    TourId = tourMpExpress.Id,
                    DayNumber = 4,
                    TitleEn = "Cusco Historic Stroll & Airport Departure",
                    TitleEs = "Paseo Histórico en Cusco y Salida al Aeropuerto",
                    DescriptionEn = "Morning walk through the Plaza de Armas and stone artisan lanes. Private transfer to Cusco Airport for your flight to Lima.",
                    DescriptionEs = "Paseo matutino por la Plaza de Armas y calles artesanales empedradas. Traslado privado al Aeropuerto de Cusco para su vuelo a Lima.",
                    GourmetDiningEn = "Full Andean artisan breakfast",
                    GourmetDiningEs = "Desayuno artesanal andino completo",
                    PrivateTransferEn = "Private hotel to airport transfer",
                    PrivateTransferEs = "Traslado privado de hotel al aeropuerto"
                }
            };
            await context.ItineraryDays.AddRangeAsync(days4);
            await context.SaveChangesAsync();
        }

        // =========================================================================
        // TOUR 5: Peru Travel Package: Coast, Amazon & Andes (9 Days / 8 Nights)
        // =========================================================================
        if (!await context.Tours.AnyAsync(t => t.Slug == "peru-travel-package"))
        {
            var tourGrandPeru = new Tour
            {
                TitleEn = "Peru Travel Package: Coast, Amazon & Andes",
                TitleEs = "Paquete Perú de Lujo: Costa, Amazonía y Andes",
                Slug = "peru-travel-package",
                SubtitleEn = "Grand 9-day private voyage connecting Lima's culinary mastery, the Amazon River at Heliconia Lodge, and sacred Machu Picchu.",
                SubtitleEs = "Gran travesía privada de 9 días uniendo la gastronomía de Lima, el Río Amazonas en Heliconia Lodge y Machu Picchu.",
                DescriptionEn = "A comprehensive luxury journey spanning Peru's three breathtaking geographic realms. Begin along the Pacific coast exploring Lima's Michelin-starred culinary scene, plunge into the heart of the Amazon rainforest along the mighty Amazon River at Heliconia Amazon River Lodge in Iquitos, and ascend to the Andes for private exploration of the Sacred Valley, South Valley, and the majestic citadel of Machu Picchu.",
                DescriptionEs = "Un viaje completo de lujo a través de las tres majestuosas regiones del Perú. Comience en la costa del Pacífico degustando la gastronomía de clase mundial de Lima, adéntrese en la selva del Río Amazonas en Heliconia Amazon River Lodge en Iquitos, y ascienda a los Andes para recorrer el Valle Sagrado, el Valle Sur y la enigmática ciudadela de Machu Picchu.",
                CategoryId = amazonCatId,
                DurationEn = "9 Days / 8 Nights",
                DurationEs = "9 Días / 8 Noches",
                DurationDays = 9,
                PriceUsd = 5100.00m,
                PricePen = 19380.00m,
                DifficultyEn = "Multifaceted Grand Tour",
                DifficultyEs = "Gran Tour Multifacético",
                AltitudeMax = "3,500 m / 11,480 ft",
                StartingPoint = "Lima (Jorge Chávez International Airport)",
                StyleTag = "Coast, Amazon & Andes Grand Tour",
                Featured = true,
                IsActive = true,
                DisplayOrder = 9,
                MainImageUrl = "https://lmptravel.com/wp-content/uploads/2023/02/Lima_grande.jpg",
                GalleryImagesJson = JsonSerializer.Serialize(new[]
                {
                    "https://lmptravel.com/wp-content/uploads/2023/02/Lima_grande.jpg",
                    "https://lmptravel.com/wp-content/uploads/2023/02/Lima_840px.jpg",
                    "https://lmptravel.com/wp-content/uploads/2023/01/01_tambopata.jpg",
                    "https://lmptravel.com/wp-content/uploads/2024/11/machu-picchu-grande.jpg"
                }),
                IncludedJsonEn = JsonSerializer.Serialize(new[]
                {
                    "All private airport transfers and river boat navigations in Lima, Iquitos, and Cusco",
                    "Heliconia Amazon River Lodge stay with full board and guided Amazon river safaris",
                    "Pink river dolphin spotting, Victoria Regia water lilies, and native Yagua community encounter",
                    "Panoramic Vistadome rail journey to Machu Picchu with certified private archaeologist",
                    "Pre-reserved priority admission to Machu Picchu Sanctuary and Huayna Picchu (subject to permit)",
                    "Private Sacred Valley and South Valley (Tipon, Pikillacta & Andahuaylillas) tours",
                    "24/7 dedicated concierge desk throughout the multi-region itinerary"
                }),
                IncludedJsonEs = JsonSerializer.Serialize(new[]
                {
                    "Todos los traslados privados en aeropuerto y navegación fluvial en Lima, Iquitos y Cusco",
                    "Estadía en Heliconia Amazon River Lodge con pensión completa y safaris guiados por el río Amazonas",
                    "Avistamiento de delfines rosados, lirios gigantes Victoria Regia y encuentro con la etnia Yagua",
                    "Viaje en tren panorámico Vistadome a Machu Picchu con arqueólogo privado colegiado",
                    "Ingreso preferencial pre-reservado a Machu Picchu y Huayna Picchu (sujeto a cupo oficial)",
                    "Tours privados en el Valle Sagrado y Valle Sur (Tipón, Pikillacta y la Capilla Sixtina Andahuaylillas)",
                    "Atención de Concierge VIP 24/7 durante todo el circuito interregional"
                }),
                NotIncludedJsonEn = JsonSerializer.Serialize(new[]
                {
                    "International flights",
                    "Discretionary tips for naturalist guides and drivers",
                    "Travel insurance and personal purchases"
                }),
                NotIncludedJsonEs = JsonSerializer.Serialize(new[]
                {
                    "Vuelos internacionales",
                    "Propinas para guías naturalistas y choferes",
                    "Seguro de viaje y compras personales"
                }),
                HighlightsJsonEn = JsonSerializer.Serialize(new[]
                {
                    "Navigating the mighty Amazon River spotting elusive pink river dolphins and giant water lilies",
                    "Deep cultural immersion from Amazonian Yagua traditions to Andean master shamans",
                    "The majestic citadel of Machu Picchu and the colonial baroque treasures of Cusco"
                }),
                HighlightsJsonEs = JsonSerializer.Serialize(new[]
                {
                    "Navegación por el mítico Río Amazonas con avistamiento de delfines rosados y Victoria Regia",
                    "Inmersión cultural profunda desde la comunidad Yagua en la selva hasta los sabios andinos",
                    "La imponente ciudadela de Machu Picchu y el esplendor virreinal de Cusco"
                }),
                LocationsJson = JsonSerializer.Serialize(new[] { "lima", "iquitos", "cusco", "mp" }),
                AltitudeProfileJson = JsonSerializer.Serialize(new
                {
                    startingAltitude = "154 m / 505 ft",
                    maxAltitude = "3,500 m / 11,480 ft",
                    sleepingAltitude = "2,870 m / 9,416 ft",
                    oxygenPercentage = 85,
                    tipEn = "Beginning at sea level in Lima and Iquitos creates a wonderful tropical contrast before ascending to the fresh mountain air of the Andes.",
                    tipEs = "Iniciar al nivel del mar en Lima e Iquitos genera un fascinante contraste tropical antes de ascender al aire fresco de los Andes."
                })
            };

            await context.Tours.AddAsync(tourGrandPeru);
            await context.SaveChangesAsync();

            var days5 = new List<ItineraryDay>
            {
                new ItineraryDay
                {
                    TourId = tourGrandPeru.Id,
                    DayNumber = 1,
                    TitleEn = "International Flight Arrival - Welcome to Lima",
                    TitleEs = "Llegada de Vuelo Internacional - Bienvenida a Lima",
                    DescriptionEn = "Arrival at Jorge Chavez International Airport in Lima. Met by your private chauffeur and transferred to your luxury ocean-view suite in Miraflores.",
                    DescriptionEs = "Llegada al Aeropuerto Internacional Jorge Chávez en Lima. Recepción privada y traslado a su suite con vista al mar en Miraflores.",
                    GourmetDiningEn = "Curated gourmet dining recommendations in Lima",
                    GourmetDiningEs = "Cena gourmet sugerida en restaurante galardonado de Lima",
                    PrivateTransferEn = "Private executive sedan transfer",
                    PrivateTransferEs = "Traslado en sedán ejecutivo privado"
                },
                new ItineraryDay
                {
                    TourId = tourGrandPeru.Id,
                    DayNumber = 2,
                    TitleEn = "Flight to Iquitos & Heliconia Amazon River Lodge",
                    TitleEs = "Vuelo a Iquitos y Heliconia Amazon River Lodge",
                    DescriptionEn = "Transfer to airport for flight to Iquitos. Board a motorized riverboat along the legendary Amazon River to Heliconia Amazon River Lodge. Welcome lunch and afternoon botanical hike in Yanamono reserve.",
                    DescriptionEs = "Vuelo matutino a Iquitos. Abordaje de embarcación fluvial navegando el majestuoso Río Amazonas hacia Heliconia Lodge. Almuerzo de bienvenida y caminata botánica en la reserva Yanamono.",
                    GourmetDiningEn = "Full board Amazonian cuisine with native river fish and fruits",
                    GourmetDiningEs = "Pensión completa con pescado fresco de río y frutas amazónicas",
                    PrivateTransferEn = "Airport transfers & private Amazon riverboat navigation",
                    PrivateTransferEs = "Traslados de aeropuerto y navegación privada por el Amazonas"
                },
                new ItineraryDay
                {
                    TourId = tourGrandPeru.Id,
                    DayNumber = 3,
                    TitleEn = "Amazon River Pink Dolphins, Victoria Regia & Yagua Community",
                    TitleEs = "Delfines Rosados, Victoria Regia y Comunidad Nativa Yagua",
                    DescriptionEn = "Early morning birdwatching boat safari. Cruise to an oxbow lake to observe the giant Victoria Regia water lilies and spot pink river dolphins (Inia geoffrensis). Visit an authentic Yagua indigenous village to learn their ancient traditions and hunting blowgun skills.",
                    DescriptionEs = "Safari fluvial matutino para avistamiento de aves. Navegación en busca de los legendarios delfines rosados y los lirios gigantes Victoria Regia. Visita a la etnia nativa Yagua para conocer sus tradiciones y cerbatanas.",
                    GourmetDiningEn = "Full board gourmet rainforest dining",
                    GourmetDiningEs = "Pensión completa gourmet en el lodge",
                    PrivateTransferEn = "Private riverboat safari with native naturalist guide",
                    PrivateTransferEs = "Bote privado de safari con guía naturalista nativo"
                },
                new ItineraryDay
                {
                    TourId = tourGrandPeru.Id,
                    DayNumber = 4,
                    TitleEn = "Iquitos - Lima - Flight to Cusco",
                    TitleEs = "Iquitos - Lima - Vuelo a Cusco",
                    DescriptionEn = "Morning boat transfer back to Iquitos, visiting a native craft center. Flight via Lima to the imperial city of Cusco. Executive transfer to your heritage hotel and relaxing acclimatization evening.",
                    DescriptionEs = "Navegación de retorno a Iquitos y visita a un centro de artesanías. Vuelo vía Lima a la ciudad imperial de Cusco. Traslado ejecutivo a su hotel boutique y tarde de aclimatación.",
                    GourmetDiningEn = "Amazonian farewell breakfast & Andean welcome dinner",
                    GourmetDiningEs = "Desayuno amazónico de despedida y cena andina en Cusco",
                    PrivateTransferEn = "All airport and river transfers included",
                    PrivateTransferEs = "Todos los traslados de aeropuerto y fluviales incluidos"
                },
                new ItineraryDay
                {
                    TourId = tourGrandPeru.Id,
                    DayNumber = 5,
                    TitleEn = "Sacred Valley: Maras, Moray & Chinchero Weavers",
                    TitleEs = "Valle Sagrado: Maras, Moray y Tejedoras de Chinchero",
                    DescriptionEn = "Journey through the Sacred Valley: visit the historic colonial church and master weavers of Chinchero, Moray's agricultural amphitheater, and the dramatic pink salt terraces of Maras.",
                    DescriptionEs = "Recorrido por el Valle Sagrado: visita a Chinchero con sus maestras tejedoras, los andenes concéntricos de Moray y las impresionantes salineras de Maras.",
                    GourmetDiningEn = "Gourmet country lunch in the Sacred Valley",
                    GourmetDiningEs = "Almuerzo gourmet campestre en el Valle Sagrado",
                    PrivateTransferEn = "Private vehicle with dedicated chauffeur",
                    PrivateTransferEs = "Vehículo privado con chofer dedicado"
                },
                new ItineraryDay
                {
                    TourId = tourGrandPeru.Id,
                    DayNumber = 6,
                    TitleEn = "Ollantaytambo Fortress & Panoramic Rail to Aguas Calientes",
                    TitleEs = "Fortaleza de Ollantaytambo y Tren Panorámico a Aguas Calientes",
                    DescriptionEn = "Morning exploration of the sun temple and stone stairways of Ollantaytambo. In the afternoon, board the panoramic Vistadome train along the Urubamba canyon to Aguas Calientes. Evening hot spring or spa relaxation.",
                    DescriptionEs = "Exploración matutina de Ollantaytambo y su templo del sol. Por la tarde, viaje en tren panorámico Vistadome a lo largo del cañón hacia Aguas Calientes.",
                    GourmetDiningEn = "Artisanal lunch in Ollantaytambo & dinner in Aguas Calientes",
                    GourmetDiningEs = "Almuerzo artesanal en Ollantaytambo y cena en Aguas Calientes",
                    PrivateTransferEn = "Private valley transport & panoramic rail journey",
                    PrivateTransferEs = "Transporte privado en el valle y tren panorámico"
                },
                new ItineraryDay
                {
                    TourId = tourGrandPeru.Id,
                    DayNumber = 7,
                    TitleEn = "Machu Picchu Sanctuary & Huayna Picchu",
                    TitleEs = "Santuario de Machu Picchu y Huayna Picchu",
                    DescriptionEn = "Dawn ascent to the lost city of the Incas. In-depth private tour with certified archaeologist visiting the Temple of the Three Windows, Sacred Plaza, and Intihuatana. Optional climb to Huayna Picchu. Afternoon train back to Ollantaytambo and transfer to Cusco.",
                    DescriptionEs = "Ascenso al amanecer a la ciudad perdida de los Incas. Recorrido privado con arqueólogo por el Templo de las Tres Ventanas, la Plaza Sagrada y el Intihuatana. Retorno en tren y traslado a Cusco.",
                    GourmetDiningEn = "A la carte lunch overlooking the cloud forest",
                    GourmetDiningEs = "Almuerzo a la carta frente al bosque de nubes",
                    PrivateTransferEn = "VIP shuttle bus, panoramic train & executive car to Cusco",
                    PrivateTransferEs = "Bus VIP, tren panorámico y vehículo ejecutivo a Cusco"
                },
                new ItineraryDay
                {
                    TourId = tourGrandPeru.Id,
                    DayNumber = 8,
                    TitleEn = "South Valley: Tipón Hydraulic Engineering & Andahuaylillas",
                    TitleEs = "Valle Sur: Ingeniería Hidráulica de Tipón y Andahuaylillas",
                    DescriptionEn = "Discover the lesser-known wonders of Cusco's South Valley: Tipon's functioning Inca hydraulic water springs, Pikillacta's pre-Inca Wari metropolis, and the baroque Sistine Chapel of the Americas in Andahuaylillas.",
                    DescriptionEs = "Descubra las joyas del Valle Sur: las fuentes hidráulicas activas de Tipón, la metrópoli preinca Wari de Pikillacta y la Capilla Sixtina de América en Andahuaylillas.",
                    GourmetDiningEn = "Traditional Andean lunch in the South Valley",
                    GourmetDiningEs = "Almuerzo tradicional andino en el Valle Sur",
                    PrivateTransferEn = "Private Mercedes-Benz transport with guide",
                    PrivateTransferEs = "Transporte privado Mercedes-Benz con guía"
                },
                new ItineraryDay
                {
                    TourId = tourGrandPeru.Id,
                    DayNumber = 9,
                    TitleEn = "Cusco - Lima City Tour & International Departure",
                    TitleEs = "Cusco - Tour en Lima y Salida Internacional",
                    DescriptionEn = "Fly back to Lima. Enjoy an executive private city tour visiting the historic center, San Francisco convent catacombs, and bohemian Barranco before transferring to the airport for your international flight.",
                    DescriptionEs = "Vuelo de retorno a Lima. Tour privado visitando el centro histórico, las catacumbas de San Francisco y el distrito bohemio de Barranco antes de su conexión internacional.",
                    GourmetDiningEn = "Farewell seafood feast at a coastal cebichería",
                    GourmetDiningEs = "Almuerzo marino de despedida frente al mar",
                    PrivateTransferEn = "Private transfers and tour in Lima leading to airport",
                    PrivateTransferEs = "Traslados privados y tour en Lima hacia el aeropuerto"
                }
            };
            await context.ItineraryDays.AddRangeAsync(days5);
            await context.SaveChangesAsync();
        }

        // =========================================================================
        // TOUR 6: Tambopata & Machu Picchu (9 Days / 8 Nights)
        // =========================================================================
        if (!await context.Tours.AnyAsync(t => t.Slug == "tambopata-machu-picchu"))
        {
            var tourTambopataMp = new Tour
            {
                TitleEn = "Tambopata & Machu Picchu",
                TitleEs = "Tambopata y Machu Picchu",
                Slug = "tambopata-machu-picchu",
                SubtitleEn = "Nine days combining the wildlife wonders of Tambopata National Reserve with the imperial grandeur of Cusco and Machu Picchu.",
                SubtitleEs = "Nueve días combinando la biodiversidad de la Reserva Nacional Tambopata con la grandeza de Cusco y Machu Picchu.",
                DescriptionEn = "An extraordinary dual-ecosystem journey pairing the wild, biodiverse depths of the Amazon rainforest with the ancient majesty of the Incan Andes. Encounter macaws, caimans, and river otters in Tambopata before flying directly to Cusco for private exploration of colonial temples, Maras salt pans, Ollantaytambo, and sunrise at Machu Picchu.",
                DescriptionEs = "Una extraordinaria travesía que fusiona dos mundos: la exuberante biodiversidad de la Amazonía en Tambopata y el misticismo imperial de los Andes en Cusco y Machu Picchu. Aviste guacamayos, caimanes y nutrias gigantes en la selva antes de volar a Cusco para recorrer templos incas, las salineras de Maras, Ollantaytambo y el amanecer en Machu Picchu.",
                CategoryId = amazonCatId,
                DurationEn = "9 Days / 8 Nights",
                DurationEs = "9 Días / 8 Noches",
                DurationDays = 9,
                PriceUsd = 3500.00m,
                PricePen = 13300.00m,
                DifficultyEn = "Adventure & Cultural Comfort",
                DifficultyEs = "Aventura y Confort Cultural",
                AltitudeMax = "3,500 m / 11,480 ft",
                StartingPoint = "Lima / Puerto Maldonado",
                StyleTag = "Amazon Wildlife & Sanctuary Privé",
                Featured = true,
                IsActive = true,
                DisplayOrder = 10,
                MainImageUrl = "https://lmptravel.com/wp-content/uploads/2023/01/tambopata_840px.jpg",
                GalleryImagesJson = JsonSerializer.Serialize(new[]
                {
                    "https://lmptravel.com/wp-content/uploads/2023/01/tambopata_840px.jpg",
                    "https://lmptravel.com/wp-content/uploads/2023/01/01_tambopata.jpg",
                    "https://lmptravel.com/wp-content/uploads/2023/01/03_tambopata.jpg",
                    "https://lmptravel.com/wp-content/uploads/2023/01/04_tambopata.jpg",
                    "https://lmptravel.com/wp-content/uploads/2024/11/cuzco.jpg"
                }),
                IncludedJsonEn = JsonSerializer.Serialize(new[]
                {
                    "All private airport and river boat transfers in Puerto Maldonado and Cusco",
                    "Eco-lodge stay in Tambopata National Reserve with full board",
                    "Lake Sandoval wildlife excursion spotting giant river otters and red howler monkeys",
                    "Canopy suspension walkways and botanical medicinal garden tour",
                    "Panoramic train journey to Machu Picchu with certified private archaeologist guide",
                    "Pre-reserved official entrance tickets to Machu Picchu citadel and Sacred Valley fortresses",
                    "24/7 dedicated in-country Concierge support"
                }),
                IncludedJsonEs = JsonSerializer.Serialize(new[]
                {
                    "Todos los traslados privados de aeropuerto y navegación fluvial en Puerto Maldonado y Cusco",
                    "Alojamiento en ecolodge en la Reserva Nacional Tambopata con pensión completa",
                    "Excursión en el Lago Sandoval con avistamiento de nutrias gigantes y monos aulladores",
                    "Puentes colgantes Canopy Walkway y visita al jardín etnobotánico medicinal",
                    "Viaje en tren panorámico a Machu Picchu con guía arqueólogo privado colegiado",
                    "Boletos oficiales pre-reservados a Machu Picchu y complejos arqueológicos del valle",
                    "Asistencia de Concierge de Lujo 24/7 durante todo el viaje"
                }),
                NotIncludedJsonEn = JsonSerializer.Serialize(new[]
                {
                    "Domestic and international flights",
                    "Discretionary tips for guides and drivers",
                    "Personal travel insurance"
                }),
                NotIncludedJsonEs = JsonSerializer.Serialize(new[]
                {
                    "Vuelos nacionales e internacionales",
                    "Propinas discrecionales para guías y choferes",
                    "Seguro médico internacional de viaje"
                }),
                HighlightsJsonEn = JsonSerializer.Serialize(new[]
                {
                    "Glide through Lake Sandoval at dawn amidst howling monkeys and giant river otters",
                    "Treetop perspective 30 meters above the jungle floor on suspension canopy bridges",
                    "Step through the sacred stone gateways of Machu Picchu with your certified archaeologist"
                }),
                HighlightsJsonEs = JsonSerializer.Serialize(new[]
                {
                    "Navegación al alba en el Lago Sandoval rodeado de monos aulladores y nutrias gigantes",
                    "Puentes colgantes a 30 metros de altura sobre el dosel de la selva virgen",
                    "Ingreso privilegiado a los recintos sagrados de Machu Picchu con su arqueólogo privado"
                }),
                LocationsJson = JsonSerializer.Serialize(new[] { "tambopata", "cusco", "mp" }),
                AltitudeProfileJson = JsonSerializer.Serialize(new
                {
                    startingAltitude = "183 m / 600 ft",
                    maxAltitude = "3,500 m / 11,480 ft",
                    sleepingAltitude = "2,870 m / 9,416 ft",
                    oxygenPercentage = 85,
                    tipEn = "Beginning with 100% ambient oxygen in the Amazon provides prime vitality before ascending into the high Andes.",
                    tipEs = "Comenzar con el 100% de oxígeno en la Amazonía brinda máxima vitalidad antes de ascender a los Andes."
                })
            };

            await context.Tours.AddAsync(tourTambopataMp);
            await context.SaveChangesAsync();

            var days6 = new List<ItineraryDay>
            {
                new ItineraryDay
                {
                    TourId = tourTambopataMp.Id,
                    DayNumber = 1,
                    TitleEn = "Lima - Puerto Maldonado & Rainforest Lodge Arrival",
                    TitleEs = "Lima - Puerto Maldonado y Llegada al Lodge de Selva",
                    DescriptionEn = "Fly from Lima to Puerto Maldonado. Reception and transfer to the river port for a motorized canoe trip along the Madre de Dios River to your luxury rainforest lodge. Twilight caiman boat safari.",
                    DescriptionEs = "Vuelo de Lima a Puerto Maldonado. Recepción y traslado al puerto fluvial para navegar en canoa a motor por el río Madre de Dios hasta su lodge. Safari nocturno de caimanes.",
                    GourmetDiningEn = "Organic Amazonian lunch and welcome dinner",
                    GourmetDiningEs = "Almuerzo orgánico amazónico y cena de bienvenida",
                    PrivateTransferEn = "Airport reception and riverboat navigation",
                    PrivateTransferEs = "Recepción en aeropuerto y navegación fluvial"
                },
                new ItineraryDay
                {
                    TourId = tourTambopataMp.Id,
                    DayNumber = 2,
                    TitleEn = "Tambopata National Reserve & Lake Sandoval",
                    TitleEs = "Reserva Nacional Tambopata y Lago Sandoval",
                    DescriptionEn = "Early trek into Tambopata Reserve. Board a wooden canoe to explore Lake Sandoval, observing giant river otters, hoatzin prehistoric birds, and macaws.",
                    DescriptionEs = "Caminata temprana hacia la Reserva Tambopata. Navegación en canoa a remo por el Lago Sandoval observando nutrias gigantes, aves hoatzin y guacamayos.",
                    GourmetDiningEn = "Full board lodge dining",
                    GourmetDiningEs = "Pensión completa en el lodge",
                    PrivateTransferEn = "Private reserve boat and trail transfers",
                    PrivateTransferEs = "Bote privado en la reserva y senderos guiados"
                },
                new ItineraryDay
                {
                    TourId = tourTambopataMp.Id,
                    DayNumber = 3,
                    TitleEn = "Canopy Walkway & Native Botanical Garden",
                    TitleEs = "Puentes Colgantes Canopy y Jardín Etnobotánico",
                    DescriptionEn = "Walk the canopy suspension walkways high above the rainforest floor. Afternoon visit to a native medicinal plant garden to discover indigenous Amazonian remedies.",
                    DescriptionEs = "Camine por los puentes colgantes sobre el dosel de los árboles. Por la tarde, visite un jardín etnobotánico para conocer plantas medicinales de la selva.",
                    GourmetDiningEn = "Fresh native buffet meals",
                    GourmetDiningEs = "Comidas frescas con insumos nativos",
                    PrivateTransferEn = "Jungle lodge transfers",
                    PrivateTransferEs = "Traslados dentro del lodge y reserva"
                },
                new ItineraryDay
                {
                    TourId = tourTambopataMp.Id,
                    DayNumber = 4,
                    TitleEn = "Tambopata - Flight to Cusco",
                    TitleEs = "Tambopata - Vuelo a Cusco",
                    DescriptionEn = "Morning boat return to Puerto Maldonado. Flight to Cusco. Executive transfer to your heritage hotel and relaxing acclimatization evening with Andean coca tea.",
                    DescriptionEs = "Navegación matutina de retorno a Puerto Maldonado. Vuelo a Cusco. Traslado ejecutivo a su hotel y tarde de aclimatación con té de coca.",
                    GourmetDiningEn = "Tropical breakfast & Andean welcome dinner",
                    GourmetDiningEs = "Desayuno tropical y cena andina de bienvenida",
                    PrivateTransferEn = "Riverboat, airport transfers in PEM and Cusco",
                    PrivateTransferEs = "Bote fluvial y traslados de aeropuerto en PEM y Cusco"
                },
                new ItineraryDay
                {
                    TourId = tourTambopataMp.Id,
                    DayNumber = 5,
                    TitleEn = "Cusco Imperial City & Sacsayhuaman",
                    TitleEs = "Ciudad Imperial de Cusco y Sacsayhuamán",
                    DescriptionEn = "Private walking tour of Koricancha, the Cathedral, and the megalithic fortress of Sacsayhuaman. Afternoon at leisure for boutique exploring.",
                    DescriptionEs = "Tour privado a pie por Koricancha, la Catedral y la fortaleza de Sacsayhuamán. Tarde libre para recorrer las plazas y tiendas de artesanía.",
                    GourmetDiningEn = "Gourmet lunch in Cusco historic center",
                    GourmetDiningEs = "Almuerzo gourmet en el centro histórico de Cusco",
                    PrivateTransferEn = "Private Mercedes vehicle with guide",
                    PrivateTransferEs = "Vehículo Mercedes privado con guía"
                },
                new ItineraryDay
                {
                    TourId = tourTambopataMp.Id,
                    DayNumber = 6,
                    TitleEn = "Maras Salt Pans & Moray Amphitheaters",
                    TitleEs = "Salineras de Maras y Anfiteatros de Moray",
                    DescriptionEn = "Scenic drive to Moray's Inca agricultural experimentation rings and the gleaming white salt terraces of Maras. Continue to your Sacred Valley hotel.",
                    DescriptionEs = "Paseo hacia los andenes concéntricos de Moray y las terrazas de sal de Maras. Continuación a su hotel en el Valle Sagrado.",
                    GourmetDiningEn = "Artisanal lunch in the Sacred Valley",
                    GourmetDiningEs = "Almuerzo campestre en el Valle Sagrado",
                    PrivateTransferEn = "Full-day private valley transport",
                    PrivateTransferEs = "Transporte privado en el valle todo el día"
                },
                new ItineraryDay
                {
                    TourId = tourTambopataMp.Id,
                    DayNumber = 7,
                    TitleEn = "Sacred Valley & Ollantaytambo Town",
                    TitleEs = "Valle Sagrado y Pueblo de Ollantaytambo",
                    DescriptionEn = "Explore Ollantaytambo's majestic fortress and ancient living town. In the afternoon, board the panoramic train to Aguas Calientes.",
                    DescriptionEs = "Explore la fortaleza y calles empedradas de Ollantaytambo. Por la tarde, tren panorámico hacia Aguas Calientes.",
                    GourmetDiningEn = "Valley lunch & Aguas Calientes dinner",
                    GourmetDiningEs = "Almuerzo en el valle y cena en Aguas Calientes",
                    PrivateTransferEn = "Private vehicle & panoramic train journey",
                    PrivateTransferEs = "Vehículo privado y tren panorámico"
                },
                new ItineraryDay
                {
                    TourId = tourTambopataMp.Id,
                    DayNumber = 8,
                    TitleEn = "Machu Picchu Citadel Sunrise Exploration",
                    TitleEs = "Amanecer y Exploración en Machu Picchu",
                    DescriptionEn = "Early morning ascent to Machu Picchu. Private 3-hour tour with your archaeologist exploring sacred temples and plazas. Afternoon return train and private transfer to Cusco.",
                    DescriptionEs = "Ascenso matutino a Machu Picchu. Recorrido privado de 3 horas con su arqueólogo por templos y plazas sagradas. Tren de retorno y traslado a Cusco.",
                    GourmetDiningEn = "Lunch overlooking the cloud forest",
                    GourmetDiningEs = "Almuerzo frente al bosque de nubes",
                    PrivateTransferEn = "Citadel VIP bus, train & executive car to Cusco",
                    PrivateTransferEs = "Bus VIP, tren panorámico y vehículo a Cusco"
                },
                new ItineraryDay
                {
                    TourId = tourTambopataMp.Id,
                    DayNumber = 9,
                    TitleEn = "Cusco - Lima Departure",
                    TitleEs = "Cusco - Retorno a Lima",
                    DescriptionEn = "Morning at leisure. Private transfer to Cusco Airport for your departing flight to Lima and onward international journey.",
                    DescriptionEs = "Mañana libre. Traslado privado al Aeropuerto de Cusco para su vuelo a Lima y conexión internacional.",
                    GourmetDiningEn = "Artisanal breakfast buffet",
                    GourmetDiningEs = "Desayuno buffet artesanal",
                    PrivateTransferEn = "Private hotel to airport transfer",
                    PrivateTransferEs = "Traslado privado de hotel al aeropuerto"
                }
            };
            await context.ItineraryDays.AddRangeAsync(days6);
            await context.SaveChangesAsync();
        }

        // Clean up any unauthorized tours (only keep the 6 official lmptravel.com tours)
        var allowedSlugs = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        {
            "cusco-golden-city",
            "inkaterra-hacienda-concepcion",
            "luxury-machu-picchu-peru",
            "machu-picchu-express",
            "peru-travel-package",
            "tambopata-machu-picchu"
        };

        var allExistingTours = await context.Tours
            .Include(t => t.Itineraries)
            .ToListAsync();

        var unauthorizedTours = allExistingTours
            .Where(t => !allowedSlugs.Contains(t.Slug))
            .ToList();

        if (unauthorizedTours.Any())
        {
            var fallbackTour = await context.Tours.FirstOrDefaultAsync(t => t.Slug == "luxury-machu-picchu-peru");
            foreach (var unTour in unauthorizedTours)
            {
                if (unTour.Itineraries != null && unTour.Itineraries.Any())
                {
                    context.ItineraryDays.RemoveRange(unTour.Itineraries);
                }

                var inquiries = await context.BookingInquiries.Where(b => b.TourId == unTour.Id).ToListAsync();
                foreach (var inq in inquiries)
                {
                    if (fallbackTour != null) inq.TourId = fallbackTour.Id;
                }

                context.Tours.Remove(unTour);
            }
            await context.SaveChangesAsync();
        }
    }

}
