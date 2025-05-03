import bcryptjs from 'bcryptjs';
export interface SeedProduct {
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    title: string;
    type: ValidTypes;
    gender: 'men' | 'women' | 'kid' | 'unisex'
}

type ValidSizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
type ValidTypes = 'shirts' | 'pants' | 'hoodies' | 'hats';

interface SeedUser {
    email: string;
    password: string;
    name: string;
    role: 'admin' | 'user'
}

interface SeedData {
    users: SeedUser[];
    categories: string[];
    products: SeedProduct[];
}

export const initialData: SeedData = {
    users: [
        {
            email: 'admin@test.com',
            name: 'Alejandro Admin',
            password: bcryptjs.hashSync('123456'),
            role: 'admin'
        },
        {
            email: 'paolo@test.com',
            name: 'Paolo Test',
            password: bcryptjs.hashSync('123456'),
            role: 'user'
        }
    ],
    categories: [
        'Shirts', 'Pants', 'Hoodies', 'Hats'
    ],
    products: [
        {
            description: "Set de globos metálicos en colores vibrantes para decorar cualquier celebración.",
            images: [
                '1740176-00-A_0_2000.jpg',
                '1740176-00-A_1.jpg',
            ],
            inStock: 7,
            price: 75,
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            slug: "mens_chill_crew_neck_sweatshirt",
            type: 'shirts',
            tags: ['sweatshirt'],
            title: "Set de globos metálicos",
            gender: 'men'
        },
        {
            description: "Guirnaldas LED para iluminar fiestas con un ambiente mágico.",
            images: [
                '1740507-00-A_0_2000.jpg',
                '1740507-00-A_1.jpg',
            ],
            inStock: 5,
            price: 200,
            sizes: ['XS', 'S', 'M', 'XL', 'XXL'],
            slug: "men_quilted_shirt_jacket",
            type: 'shirts',
            tags: ['jacket'],
            title: "Guirnaldas LED para iluminar fiestas",
            gender: 'men'
        },

        {
            description: "Confeti en forma de estrellas doradas para una decoración elegante.",
            images: [
                '1740250-00-A_0_2000.jpg',
                '1740250-00-A_1.jpg'
            ],
            inStock: 10,
            price: 130,
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            slug: "men_raven_lightweight_zip_up_bomber_jacket",
            type: 'shirts',
            tags: ['shirt'],
            title: "Confeti en forma de estrellas doradas",
            gender: 'men'
        },

        {
            description: "Disfraz de pirata con accesorios incluidos para eventos temáticos.",
            images: [
                '1740280-00-A_0_2000.jpg',
                '1740280-00-A_1.jpg',
            ],
            inStock: 50,
            price: 45,
            sizes: ['XS', 'S', 'M', 'L'],
            slug: "men_turbine_long_sleeve_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Disfraz de pirata con accesorios",
            gender: 'men'
        },
        {
            description: "Vasos desechables con estampados de unicornios para fiestas infantiles.",
            images: [
                '1741416-00-A_0_2000.jpg',
                '1741416-00-A_1.jpg',
            ],
            inStock: 50,
            price: 40,
            sizes: ['M', 'L', 'XL', 'XXL'],
            slug: "men_turbine_short_sleeve_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Vasos desechables con estampados",
            gender: 'men'
        },
        {
            description: "Platos de papel temáticos de superhéroes para fiestas de niños.",
            images: [
                '7654393-00-A_2_2000.jpg',
                '7654393-00-A_3.jpg',
            ],
            inStock: 0,
            price: 35,
            sizes: ['M', 'L', 'XL', 'XXL'],
            slug: "men_cybertruck_owl_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Platos de papel temáticos",
            gender: 'men'
        },
        {
            description: "Cañón de confeti con efecto multicolor ideal para grandes celebraciones.",
            images: [
                '1703767-00-A_0_2000.jpg',
                '1703767-00-A_1.jpg',
            ],
            inStock: 15,
            price: 35,
            sizes: ['S', 'M', 'L', 'XL'],
            slug: "men_solar_roof_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Cañón de confeti con efecto",
            gender: 'men'
        },
        {
            description: "Cortina de lentejuelas brillante para fondos de fotos en eventos.",
            images: [
                '1700280-00-A_0_2000.jpg',
                '1700280-00-A_1.jpg',
            ],
            inStock: 17,
            price: 35,
            sizes: ['XS', 'S', 'XL', 'XXL'],
            slug: "men_let_the_sun_shine_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Cortina de lentejuelas brillante",
            gender: 'men'
        },
        {
            description: "Centro de mesa con luces LED para una decoración llamativa.",
            images: [
                '8764734-00-A_0_2000.jpg',
                '8764734-00-A_1.jpg',
            ],
            inStock: 12,
            price: 35,
            sizes: ['XS', 'S', 'M'],
            slug: "men_3d_large_wordmark_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Centro de mesa con luces LED",
            gender: 'men'
        },
        {
            description: "Gorros de fiesta en colores pastel para celebraciones elegantes.",
            images: [
                '7652426-00-A_0_2000.jpg',
                '7652426-00-A_1.jpg',
            ],
            inStock: 5,
            price: 35,
            sizes: ['XS', 'S'],
            slug: "men_3d_t_logo_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Gorros de fiesta en colores pastel",
            gender: 'men'
        },
        {
            description: "Manteles temáticos de animales de la selva para fiestas infantiles.",
            images: [
                '8528839-00-A_0_2000.jpg',
                '8528839-00-A_2.jpg',
            ],
            inStock: 2,
            price: 35,
            sizes: ['XS', 'S', 'M'],
            slug: "men_3d_small_wordmark_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Manteles temáticos de animales ",
            gender: 'men'
        },
        {
            description: "Banderines de tela con diseño retro para decorar cumpleaños.",
            images: [
                '1549268-00-A_0_2000.jpg',
                '1549268-00-A_2.jpg',
            ],
            inStock: 82,
            price: 35,
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            slug: "men_plaid_mode_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Banderines de tela con diseño retro ",
            gender: 'men'
        },
        {
            description: "Disfraz de hada con alas y varita mágica para fiestas de disfraces.",
            images: [
                '9877034-00-A_0_2000.jpg',
                '9877034-00-A_2.jpg',
            ],
            inStock: 24,
            price: 35,
            sizes: ['XL', 'XXL'],
            slug: "men_powerwall_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Disfraz de hada con alas y varita mágica",
            gender: 'men'
        },
        {
            description: "Velas aromáticas decorativas para ambientar eventos especiales.",
            images: [
                '1633802-00-A_0_2000.jpg',
                '1633802-00-A_2.jpg',
            ],
            inStock: 5,
            price: 30,
            sizes: ['XS', 'S', 'XXL'],
            slug: "men_battery_day_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Velas aromáticas decorativas",
            gender: 'men'
        },
        {
            description: "Piñata en forma de estrella rellenable para celebraciones.",
            images: [
                '7654399-00-A_0_2000.jpg',
                '7654399-00-A_1.jpg',
            ],
            inStock: 150,
            price: 30,
            sizes: ['M', 'L'],
            slug: "men_cybertruck_bulletproof_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Piñata en forma de estrella",
            gender: 'men'
        },
        {
            description: "Cajas sorpresa para souvenirs de fiestas infantiles.",
            images: [
                '7652410-00-A_0.jpg',
                '7652410-00-A_1_2000.jpg',
            ],
            inStock: 10,
            price: 35,
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            slug: "men_haha_yes_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Cajas sorpresa para souvenirs",
            gender: 'men'
        },
        {
            description: "Kit de maquillaje neón para fiestas con luz negra.",
            images: [
                '8764600-00-A_0_2000.jpg',
                '8764600-00-A_2.jpg',
            ],
            inStock: 34,
            price: 35,
            sizes: ['XS', 'S', 'M', 'L'],
            slug: "men_s3xy_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Kit de maquillaje neón",
            gender: 'men'
        },
        {
            description: "Palillos decorativos con figuras temáticas para aperitivos..",
            images: [
                '8764813-00-A_0_2000.jpg',
                '8764813-00-A_1.jpg',
            ],
            inStock: 15,
            price: 40,
            sizes: ['XL', 'XXL'],
            slug: "men_3d_wordmark_long_sleeve_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Palillos decorativos con figuras",
            gender: 'men'
        },
        {
            description: "Lámparas de papel colgantes para una iluminación sofisticada.",
            images: [
                '8529198-00-A_0_2000.jpg',
                '8529198-00-A_1.jpg',
            ],
            inStock: 12,
            price: 40,
            sizes: ['XS', 'XXL'],
            slug: "men_3d_t_logo_long_sleeve_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Lámparas de papel colgantes ",
            gender: 'men'
        },
        {
            description: "Sombreros brillantes de fiesta para despedidas de soltero/a.",
            images: [
                '1740245-00-A_0_2000.jpg',
                '1740245-00-A_1.jpg',
            ],
            inStock: 10,
            price: 115,
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            slug: "men_raven_lightweight_hoodie",
            type: 'hoodies',
            tags: ['hoodie'],
            title: "Sombreros brillantes ",
            gender: 'men'
        },
        {
            description: "Serpentinas de colores para lanzar en momentos especiales.",
            images: [
                '1740051-00-A_0_2000.jpg',
                '1740051-00-A_1.jpg',
            ],
            inStock: 10,
            price: 130,
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            slug: "chill_pullover_hoodie",
            type: 'hoodies',
            tags: ['hoodie'],
            title: "Serpentinas de colores",
            gender: 'unisex'
        },
        {
            description: "Invitaciones personalizadas con diseños exclusivos para eventos.",
            images: [
                '1741111-00-A_0_2000.jpg',
                '1741111-00-A_1.jpg',
            ],
            inStock: 100,
            price: 85,
            sizes: ['XS', 'L', 'XL', 'XXL'],
            slug: "men_chill_full_zip_hoodie",
            type: 'shirts',
            tags: ['shirt'],
            title: "Invitaciones personalizadas ",
            gender: 'men'
        },
        {
            description: "Pañuelos temáticos para fiestas vaqueras.",
            images: [
                '1740140-00-A_0_2000.jpg',
                '1740140-00-A_1.jpg',
            ],
            inStock: 7,
            price: 85,
            sizes: ['XS', 'S', 'M'],
            slug: "men_chill_quarter_zip_pullover_-_gray",
            type: 'shirts',
            tags: ['shirt'],
            title: "Pañuelos temáticos para fiestas vaqueras",
            gender: 'men'
        },
        {
            description: "Pulseras fluorescentes que brillan en la oscuridad.",
            images: [
                '1740145-00-A_2_2000.jpg',
                '1740145-00-A_1.jpg',
            ],
            inStock: 15,
            price: 85,
            sizes: ['XS', 'S', 'M', 'L'],
            slug: "men_chill_quarter_zip_pullover_-_white",
            type: 'shirts',
            tags: ['shirt'],
            title: "Pulseras fluorescentes que brillan",
            gender: 'men'
        },
        {
            description: "Globos con helio de letras para formar mensajes personalizados.",
            images: [
                '8529107-00-A_0_2000.jpg',
                '8529107-00-A_1.jpg',
            ],
            inStock: 15,
            price: 70,
            sizes: ['XS', 'S', 'XL', 'XXL'],
            slug: "3d_large_wordmark_pullover_hoodie",
            type: 'hoodies',
            tags: ['hoodie'],
            title: "Globos con helio de letras para formar",
            gender: 'unisex'
        },
        {
            description: "Máscaras de superhéroes para fiestas temáticas.",
            images: [
                '7654420-00-A_0_2000.jpg',
                '7654420-00-A_1_2000.jpg',
            ],
            inStock: 13,
            price: 60,
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            slug: "cybertruck_graffiti_hoodie",
            type: 'hoodies',
            tags: ['hoodie'],
            title: "Máscaras de superhéroes",
            gender: 'unisex'
        },
        {
            description: "Caminos de mesa con purpurina para decoraciones elegantes.",
            images: [
                '1657932-00-A_0_2000.jpg',
                '1657932-00-A_1.jpg',
            ],
            inStock: 11,
            price: 30,
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            slug: "relaxed_t_logo_hat",
            type: 'hats',
            tags: ['hats'],
            title: "Caminos de mesa con purpurina",
            gender: 'unisex'
        },
        {
            description: "Bebidas en polvo con colores vibrantes para cócteles sin alcohol.",
            images: [
                '1740417-00-A_0_2000.jpg',
                '1740417-00-A_1.jpg',
            ],
            inStock: 13,
            price: 35,
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            slug: "thermal_cuffed_beanie",
            type: 'hats',
            tags: ['hats'],
            title: "Bebidas en polvo con colores",
            gender: 'unisex'
        },
        {
            description: "Cápsulas de humo de colores para efectos visuales en eventos.",
            images: [
                '1740535-00-A_0_2000.jpg',
                '1740535-00-A_1.jpg',
            ],
            inStock: 85,
            price: 225,
            sizes: ['XS', 'S', 'M'],
            slug: "women_cropped_puffer_jacket",
            type: 'hoodies',
            tags: ['hoodie'],
            title: "Cápsulas de humo de colores",
            gender: 'women'
        },
        {
            description: "Tiaras con piedras brillantes para fiestas de princesas.",
            images: [
                '1740226-00-A_0_2000.jpg',
                '1740226-00-A_1.jpg',
            ],
            inStock: 10,
            price: 130,
            sizes: ['XS', 'S', 'M', 'XXL'],
            slug: "women_chill_half_zip_cropped_hoodie",
            type: 'hoodies',
            tags: ['hoodie'],
            title: "Tiaras con piedras brillantes",
            gender: 'women'
        },
        {
            description: "Disco de luces LED portátil para animar cualquier celebración.",
            images: [
                '1740260-00-A_0_2000.jpg',
                '1740260-00-A_1.jpg',
            ],
            inStock: 9,
            price: 110,
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            slug: "women_raven_slouchy_crew_sweatshirt",
            type: 'hoodies',
            tags: ['hoodie'],
            title: "Disco de luces LED portátil ",
            gender: 'women'
        },
        {
            description: "Pistolas de burbujas para fiestas al aire libre",
            images: [
                '1740290-00-A_0_2000.jpg',
                '1740290-00-A_1.jpg',
            ],
            inStock: 10,
            price: 45,
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            slug: "women_turbine_cropped_long_sleeve_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Pistolas de burbujas",
            gender: 'women'
        },
        {
            description: "Collares hawaianos de flores para eventos tropicales",
            images: [
                '1741441-00-A_0_2000.jpg',
                '1741441-00-A_1.jpg',
            ],
            inStock: 0,
            price: 40,
            sizes: ['XS', 'S'],
            slug: "women_turbine_cropped_short_sleeve_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Collares hawaianos de flores ",
            gender: 'women'
        },
        {
            description: "Servilletas con estampados personalizados para fiestas exclusivas.",
            images: [
                '8765090-00-A_0_2000.jpg',
                '8765090-00-A_1.jpg',
            ],
            inStock: 30,
            price: 35,
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            slug: "women_t_logo_short_sleeve_scoop_neck_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Servilletas con estampados personalizados",
            gender: 'women'
        },
        {
            description: "Globos gigantes en forma de números para aniversarios y cumpleaños.",
            images: [
                '8765100-00-A_0_2000.jpg',
                '8765100-00-A_1.jpg',
            ],
            inStock: 16,
            price: 40,
            sizes: ['XS', 'S', 'L', 'XL', 'XXL'],
            slug: "women_t_logo_long_sleeve_scoop_neck_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Globos gigantes en forma de números",
            gender: 'women'
        },
        {
            description: "Tarjetas de agradecimiento con diseños modernos para eventos.",
            images: [
                '8765120-00-A_0_2000.jpg',
                '8765120-00-A_1.jpg',
            ],
            inStock: 18,
            price: 35,
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            slug: "women_small_wordmark_short_sleeve_v-neck_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Tarjetas de agradecimiento con diseños ",
            gender: 'women'
        },
        {
            description: "Carpas plegables con luces para celebraciones al aire libre.",
            images: [
                '8765115-00-A_0_2000.jpg',
                '8765115-00-A_1.jpg',
            ],
            inStock: 5,
            price: 35,
            sizes: ['XL', 'XXL'],
            slug: "women_large_wordmark_short_sleeve_crew_neck_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Carpas plegables con luces para celebraciones",
            gender: 'women'
        },
        {
            description: "Humo de colores para efectos especiales en sesiones de fotos.",
            images: [
                '1549275-00-A_0_2000.jpg',
                '1549275-00-A_1.jpg',
            ],
            inStock: 16,
            price: 35,
            sizes: ['S', 'M'],
            slug: "women_plaid_mode_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Humo de colores para efectos",
            gender: 'women'
        },
        {
            description: "Caja de dulces temática con chocolates y caramelos variados",
            images: [
                '9877040-00-A_0_2000.jpg',
                '9877040-00-A_1.jpg',
            ],
            inStock: 10,
            price: 130,
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            slug: "women_powerwall_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Caja de dulces temática con chocolates",
            gender: 'women'
        },
        {
            description: "Cinta adhesiva decorativa con brillo para envolver regalos.",
            images: [
                '5645680-00-A_0_2000.jpg',
                '5645680-00-A_3.jpg',
            ],
            inStock: 3,
            price: 90,
            sizes: ['M', 'L', 'XL', 'XXL'],
            slug: "women_corp_jacket",
            type: 'shirts',
            tags: ['shirt'],
            title: "Cinta adhesiva decorativa con brillo",
            gender: 'women'
        },
        {
            description: "Pirotecnia fría para darle un toque especial a la fiesta.",
            images: [
                '1740270-00-A_0_2000.jpg',
                '1740270-00-A_1.jpg',
            ],
            inStock: 162,
            price: 100,
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            slug: "women_raven_joggers",
            type: 'shirts',
            tags: ['shirt'],
            title: "Pirotecnia fría",
            gender: 'women'
        },
        {
            description: "Cajas de cartón decoradas para entregar souvenirs.",
            images: [
                '1742694-00-A_1_2000.jpg',
                '1742694-00-A_3.jpg',
            ],
            inStock: 10,
            price: 30,
            sizes: ['XS', 'S', 'M'],
            slug: "kids_cybertruck_long_sleeve_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Cajas de cartón decoradas",
            gender: 'kid'
        },
        {
            description: "Set de stickers para personalizar vasos y platos de fiesta.",
            images: [
                '8529312-00-A_0_2000.jpg',
                '8529312-00-A_1.jpg',
            ],
            inStock: 0,
            price: 25,
            sizes: ['XS', 'S', 'M'],
            slug: "kids_scribble_t_logo_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Set de stickers para personalizar ",
            gender: 'kid'
        },
        {
            description: "Gafas de colores extravagantes para animar cualquier evento.",
            images: [
                '8529342-00-A_0_2000.jpg',
                '8529342-00-A_1.jpg',
            ],
            inStock: 10,
            price: 25,
            sizes: ['XS', 'S', 'M'],
            slug: "kids_cybertruck_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Gafas de colores extravagantes",
            gender: 'kid'
        },
        {
            description: "Carteles personalizables con frases para photobooths.",
            images: [
                '8529354-00-A_0_2000.jpg',
                '8529354-00-A_1.jpg',
            ],
            inStock: 10,
            price: 30,
            sizes: ['XS', 'S', 'M'],
            slug: "kids_racing_stripe_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Carteles personalizables ",
            gender: 'kid'
        },
        {
            description: "Chapas con frases divertidas para despedidas de soltero/a.",
            images: [
                '7652465-00-A_0_2000.jpg',
                '7652465-00-A_1.jpg',
            ],
            inStock: 10,
            price: 30,
            sizes: ['XS', 'S', 'M'],
            slug: "kids_3d_t_logo_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Chapas con frases divertidas",
            gender: 'kid'
        },
        {
            description: "Guantes LED que cambian de color al ritmo de la música.",
            images: [
                '100042307_0_2000.jpg',
                '100042307_alt_2000.jpg',
            ],
            inStock: 10,
            price: 30,
            sizes: ['XS', 'S', 'M'],
            slug: "kids_checkered_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Guantes LED que cambian de color",
            gender: 'kid'
        },
        {
            description: "Botellas de champán decorativas con efectos brillantes",
            images: [
                '1473809-00-A_1_2000.jpg',
                '1473809-00-A_alt.jpg',
            ],
            inStock: 16,
            price: 25,
            sizes: ['XS', 'S'],
            slug: "made_on_earth_by_humans_onesie",
            type: 'shirts',
            tags: ['shirt'],
            title: "Botellas de champán decorativas",
            gender: 'kid'
        },
        {
            description: "Camisas hawaianas para fiestas temáticas tropicales.",
            images: [
                '8529387-00-A_0_2000.jpg',
                '8529387-00-A_1.jpg',
            ],
            inStock: 0,
            price: 30,
            sizes: ['XS', 'S'],
            slug: "scribble_t_logo_onesie",
            type: 'shirts',
            tags: ['shirt'],
            title: "Camisas hawaianas",
            gender: 'kid'
        },
        {
            description: "Moldes de hielo con formas divertidas para bebidas especiales.",
            images: [
                '1473834-00-A_2_2000.jpg',
                '1473829-00-A_2_2000.jpg',
            ],
            inStock: 10,
            price: 30,
            sizes: ['XS', 'S'],
            slug: "zero_emissions_(almost)_onesie",
            type: 'shirts',
            tags: ['shirt'],
            title: "Moldes de hielo con formas divertidas",
            gender: 'kid'
        },
    ]
}