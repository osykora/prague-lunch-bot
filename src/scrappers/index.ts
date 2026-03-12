import {Menu, Scrapper} from "../types";
import {fetchPivokarlin} from "./pivokarlin";
import {fetchAsiyo} from "./asiyo";
import {fetchDvorekKarlin} from "./dvorekKarlin";
import {fetchFuelBistro} from "./fuelBistro";
import {fetchMenicka} from "./menicka";
import {fetchJidlovice} from "./jidlovice";
import dayjs from "../utils/dayjs";
import {fetchProtiProudu} from "./protiProudu";

const scrappers: Scrapper[] = [
    {
        id: "asiyo",
        icon: "sushi",
        name: "🍣 Asiyo",
        url: "https://www.asiyo.cz/poledni-menu/",
        locationUrl: "https://maps.app.goo.gl/2yzue2EHDx8SSYCa9",
        load: fetchAsiyo,
        disabled: true,
    },
    {
        id: "diego_pivni_bar",
        icon: "dart",
        name: "🎯 Diego pivní bar",
        url: "http://www.diegopivnibar.cz/cz/",
        scrapeUrl: "https://www.menicka.cz/7191-diego-pivni-bar.html",
        locationUrl: "https://maps.app.goo.gl/WaBWra3W2ebzZ73p8",
        load: fetchMenicka,
    },
    {
        id: "dvorek_karlin",
        icon: "house_with_garden",
        name: "🏡 Dvorek Karlín",
        url: "https://www.dvorekkarlin.com/denni-nabidka/",
        locationUrl: "https://maps.app.goo.gl/kivSxE9iMU6rgQj78",
        load: fetchDvorekKarlin,
    },
    {
        id: "fuel_bistro",
        icon: "coffee",
        name: "☕️ Fuel Bistro",
        url: "https://fuelbistro.cz/",
        scrapeUrl: "https://www.fuelbistro.cz/menu",
        locationUrl: "https://maps.app.goo.gl/DhmZ42BbGxaiRXW68",
        load: fetchFuelBistro,
    },
    {
        id: "gastro_karlin",
        icon: "curry",
        name: "🍛 Gastro Karlín",
        url: "https://www.gastrokarlin.cz/",
        scrapeUrl: "https://www.menicka.cz/4323-gastro-karlin.html",
        locationUrl: "https://maps.app.goo.gl/Hn9WyxNiLziTtHS37",
        load: fetchMenicka,
    },
    {
        id: "jidlovice",
        icon: "knife_fork_plate",
        name: "🍽️ Jídlovice",
        url: "https://www.jidlovice.cz/karlin/",
        scrapeUrl: `https://www.jidlovice.cz/api/v1/branch/2/menu/${dayjs().format('YYYY-MM-DD')}?include_internal_tags=false`,
        locationUrl: "https://maps.app.goo.gl/fK3T5j2mh5XpfGQS9",
        load: fetchJidlovice,
    },
    {
        id: "peters_pub",
        icon: "burger",
        name: "🍔 Peter's pub",
        url: "http://www.peterspub.cz/",
        scrapeUrl: "https://www.menicka.cz/4230-peters-pub.html",
        locationUrl: "https://maps.app.goo.gl/b6dyMJXK1q8VEG897",
        load: fetchMenicka,
    },
    {
        id: "pivo_karlin",
        icon: "beer",
        name: "🍺 Pivo Karlín",
        url: "https://www.pivokarlin.cz/",
        locationUrl: "https://maps.app.goo.gl/iWD3jubpzKhbMRFk8",
        load: fetchPivokarlin,
    },
    {
        id: "proti_proudu",
        icon: "ocean",
        name: "🌊 Proti proudu",
        url: "https://bistroprotiproudu.cz",
        scrapeUrl: "https://bistroprotiproudu.cz/menu",
        locationUrl: "https://maps.app.goo.gl/XcSJSeoGYGWhgAio8",
        load: fetchProtiProudu,
    },
    {
        id: "spojka_karlin",
        icon: "link",
        name: "🔗 Spojka Karlín",
        url: "https://www.spojka-karlin.cz/",
        scrapeUrl: "https://www.menicka.cz/4726-spojka-karlin.html",
        locationUrl: "https://www.google.com/maps/search/Spojka+Karlin,+Pernerova+697,+Praha+8",
        load: fetchMenicka,
    },
    {
        id: "la_perla_de_karlin",
        icon: "paella",
        name: "🥘 La Perla de Karlín",
        url: "https://laperladekarlin.cz/",
        scrapeUrl: "https://www.menicka.cz/9624-la-perla-de-karlin.html",
        locationUrl: "https://www.google.com/maps/search/La+Perla+de+Karlin,+Saldova+9,+Praha+8",
        load: fetchMenicka,
    },
    {
        id: "bistro_cejka",
        icon: "herb",
        name: "🌿 Bistro Čejka",
        url: "https://bistrocejka.cz/",
        scrapeUrl: "https://www.menicka.cz/8427-bistro-cejka.html",
        locationUrl: "https://www.google.com/maps/search/Bistro+Cejka,+Vitkova+91,+Praha+8",
        load: fetchMenicka,
    },
    {
        id: "u_tunelu",
        icon: "railway_track",
        name: "🛤️ U Tunelu",
        url: "https://www.utunelu.cz/",
        scrapeUrl: "https://www.menicka.cz/4379-u-tunelu.html",
        locationUrl: "https://www.google.com/maps/search/U+Tunelu,+Thamova+1,+Praha+8",
        load: fetchMenicka,
    },
    {
        id: "khomfi",
        icon: "leafy_green",
        name: "🥬 Khomfi",
        url: "https://www.khomfi.cz/",
        scrapeUrl: "https://www.menicka.cz/7106-khomfi-restaurant.html",
        locationUrl: "https://www.google.com/maps/search/Khomfi,+Vitkova+202,+Praha+8",
        load: fetchMenicka,
    },
    {
        id: "mlsna_kavka",
        icon: "bird",
        name: "🐦 Mlsná Kavka",
        url: "https://www.mlsnakavka.cz/",
        scrapeUrl: "https://www.menicka.cz/2417-mlsna-kavka.html",
        locationUrl: "https://www.google.com/maps/search/Mlsna+Kavka,+Sokolovska+327,+Praha+8",
        load: fetchMenicka,
    },
    {
        id: "charleston",
        icon: "stew",
        name: "🍲 Charleston",
        url: "https://www.charlestonrestaurant.cz/",
        scrapeUrl: "https://www.menicka.cz/7141-charleston.html",
        locationUrl: "https://www.google.com/maps/search/Charleston,+Krizikova+208,+Praha+8",
        load: fetchMenicka,
    },
    {
        id: "twisted_fig",
        icon: "deciduous_tree",
        name: "🌳 The Twisted Fig",
        url: "https://twistedfig.cz/",
        scrapeUrl: "https://www.menicka.cz/185-the-twisted-fig.html",
        locationUrl: "https://www.google.com/maps/search/The+Twisted+Fig,+Vitkova+26,+Praha+8",
        load: fetchMenicka,
    },
    {
        id: "u_sani",
        icon: "sleigh",
        name: "🛷 U Saní",
        url: "https://www.restaurantusani.cz/",
        scrapeUrl: "https://www.menicka.cz/7151-restaurace-u-sani.html",
        locationUrl: "https://www.google.com/maps/search/Restaurace+U+Sani,+Karlinske+namesti+13,+Praha+8",
        load: fetchMenicka,
    },
    {
        id: "theatro_cafe",
        icon: "performing_arts",
        name: "🎭 Theatro Café",
        url: "https://theatro.cz/",
        scrapeUrl: "https://www.menicka.cz/188-theatro-cafe-restaurant.html",
        locationUrl: "https://www.google.com/maps/search/Theatro+Cafe,+Krizikova+283,+Praha+8",
        load: fetchMenicka,
    },
    {
        id: "na_hlavni_23",
        icon: "fork_and_knife",
        name: "🍴 Na Hlavní 23",
        url: "https://www.nahlavni23.cz/",
        scrapeUrl: "https://www.menicka.cz/7146-restaurace-na-hlavni-23.html",
        locationUrl: "https://www.google.com/maps/search/Restaurace+Na+Hlavni+23,+Praha+8",
        load: fetchMenicka,
    },
    {
        id: "polevkarna",
        icon: "bowl_with_spoon",
        name: "🥣 Polévkárna",
        url: "http://www.polevkarna.cz/",
        scrapeUrl: "https://www.menicka.cz/2416-polevkarna.html",
        locationUrl: "https://www.google.com/maps/search/Polevkarna,+Sokolovska+86,+Praha+8",
        load: fetchMenicka,
    },
]

const fetchMenus = async (scrapperId?: string): Promise<Menu[]> => {
    const enabledScrappers = scrappers
        .filter((scrapper) => !scrapperId || scrapper.id === scrapperId)
        .filter(scrapper => !scrapper.disabled);

    const results = await Promise.allSettled(
        enabledScrappers.map(scrapper => scrapper.load(scrapper))
    );

    results.forEach((res, i) => {
        if (res.status === 'rejected') {
            const scrapper = enabledScrappers[i];
            console.warn(`❌ Scraper ${scrapper.name} failed:`, res.reason?.message || res.reason);
        }
    });

    return results
        .filter((res): res is PromiseFulfilledResult<Menu> => res.status === 'fulfilled')
        .map(res => res.value);
}

export {
    fetchMenus
}