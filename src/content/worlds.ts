import type { StaticImageData } from "next/image";

import outerDisciple from "@/assets/worlds/outer-disciple.webp";
import ashenSquire from "@/assets/worlds/ashen-squire.webp";
import beastTide from "@/assets/worlds/beast-tide.webp";
import threeHeartbeats from "@/assets/worlds/three-heartbeats.webp";
import demonLordAccountant from "@/assets/worlds/demon-lord-accountant.webp";
import swordTomb from "@/assets/worlds/sword-tomb.webp";
import riverSaint from "@/assets/worlds/river-saint.webp";
import ninthFloor from "@/assets/worlds/ninth-floor.webp";
import sevenDayVillainess from "@/assets/worlds/seven-day-villainess.webp";
import naplesVendetta from "@/assets/worlds/naples-vendetta.webp";
import kestrelDebt from "@/assets/worlds/kestrel-debt.webp";
import nightShift from "@/assets/worlds/night-shift.webp";
import hollowmere from "@/assets/worlds/hollowmere.webp";
import drownedCapital from "@/assets/worlds/drowned-capital.webp";
import deadGodCourier from "@/assets/worlds/dead-god-courier.webp";
import maskMaker from "@/assets/worlds/mask-maker.webp";
import warFrame from "@/assets/worlds/war-frame.webp";
import ashgrove from "@/assets/worlds/ashgrove.webp";
import wonAtCards from "@/assets/worlds/won-at-cards.webp";
import oldNet from "@/assets/worlds/old-net.webp";
import lastLantern from "@/assets/worlds/last-lantern.webp";
import dryBasin from "@/assets/worlds/dry-basin.webp";
import whatThingsRemember from "@/assets/worlds/what-things-remember.webp";

import type { Locale } from "@/i18n/locales";

/** A starter world's words in one language, as the app shows them on Discover. */
export type WorldText = { title: string; genre: string; tagline: string };

export type World = {
  id: string;
  /** One of the signature worlds, shown first and larger (S1). */
  signature: boolean;
  cover: StaticImageData;
  text: Record<Locale, WorldText>;
};

/**
 * The 23 starter worlds, in the app's order: the signature worlds first. Copied from the backend's
 * catalog (PlayableAnime backend/graph/drafting/catalog.py, catalog_es.py and catalog_ca.py), and
 * each cover is the one the backend drew for it in the house style (scripts/prepare_images.py).
 * When the app's starters change, change them here too.
 */
export const worlds: World[] = [
  {
    id: "outer-disciple",
    signature: true,
    cover: outerDisciple,
    text: {
      en: {
        title: "The Last Outer Disciple",
        genre: "Cultivation",
        tagline: "The weakest disciple of the sect, two days before the ranking tournament.",
      },
      es: {
        title: "El último discípulo externo",
        genre: "Cultivo",
        tagline: "El discípulo más débil de la secta, a dos días del torneo de clasificación.",
      },
      ca: {
        title: "L'últim deixeble extern",
        genre: "Cultivació",
        tagline: "El deixeble més feble de la secta, a dos dies del torneig de classificació.",
      },
    },
  },
  {
    id: "ashen-squire",
    signature: true,
    cover: ashenSquire,
    text: {
      en: {
        title: "Squire of the Ashen Crown",
        genre: "Knights and aura",
        tagline: "Nine days to the trial of knighthood, no aura, and a dead master.",
      },
      es: {
        title: "El escudero de la Corona Cenicienta",
        genre: "Caballeros y aura",
        tagline: "Nueve días para la prueba de caballería, sin aura y con tu maestro muerto.",
      },
      ca: {
        title: "L'escuder de la Corona Cendrosa",
        genre: "Cavallers i aura",
        tagline: "Nou dies per a la prova de cavalleria, sense aura i amb el teu mestre mort.",
      },
    },
  },
  {
    id: "beast-tide",
    signature: true,
    cover: beastTide,
    text: {
      en: {
        title: "When the Beast Tide Comes",
        genre: "Races and monsters",
        tagline: "Four peoples behind one wall, and the beast tide is coming early.",
      },
      es: {
        title: "Cuando llegue la marea de bestias",
        genre: "Razas y monstruos",
        tagline: "Cuatro pueblos tras una misma muralla, y la marea de bestias se adelanta.",
      },
      ca: {
        title: "Quan arribi la marea de bèsties",
        genre: "Races i monstres",
        tagline: "Quatre pobles darrere d'una mateixa muralla, i la marea de bèsties s'avança.",
      },
    },
  },
  {
    id: "three-heartbeats",
    signature: true,
    cover: threeHeartbeats,
    text: {
      en: {
        title: "Three Heartbeats",
        genre: "Reincarnation",
        tagline: "Reborn in a world of sects, with the power to stop time.",
      },
      es: {
        title: "Tres latidos",
        genre: "Reencarnación",
        tagline: "Renaces en un mundo de sectas, con el poder de detener el tiempo.",
      },
      ca: {
        title: "Tres batecs",
        genre: "Reencarnació",
        tagline: "Reneixes en un món de sectes, amb el poder d'aturar el temps.",
      },
    },
  },
  {
    id: "demon-lord-accountant",
    signature: true,
    cover: demonLordAccountant,
    text: {
      en: {
        title: "The Demon Lord's Accountant",
        genre: "Reincarnation",
        tagline: "Reborn with no combat skills, hired to save a bankrupt dark army.",
      },
      es: {
        title: "El contable del Señor Demonio",
        genre: "Reencarnación",
        tagline: "Renaces sin dotes de combate y te contratan para salvar un ejército oscuro en quiebra.",
      },
      ca: {
        title: "El comptable del Senyor Dimoni",
        genre: "Reencarnació",
        tagline: "Reneixes sense dots de combat i et contracten per salvar un exèrcit fosc en fallida.",
      },
    },
  },
  {
    id: "sword-tomb",
    signature: true,
    cover: swordTomb,
    text: {
      en: {
        title: "Keeper of the Sword Tomb",
        genre: "Cultivation",
        tagline: "A servant with no qi, three days before the Sword Choosing.",
      },
      es: {
        title: "El guardián de la Tumba de las Espadas",
        genre: "Cultivo",
        tagline: "Un sirviente sin qi, a tres días de la Elección de la Espada.",
      },
      ca: {
        title: "El guardià de la Tomba de les Espases",
        genre: "Cultivació",
        tagline: "Un servent sense qi, a tres dies de l'Elecció de l'Espasa.",
      },
    },
  },
  {
    id: "river-saint",
    signature: true,
    cover: riverSaint,
    text: {
      en: {
        title: "The Saint at the River",
        genre: "Knights and aura",
        tagline: "An enemy sword saint crossed the border alone, and asked for you.",
      },
      es: {
        title: "El santo junto al río",
        genre: "Caballeros y aura",
        tagline: "Un santo de la espada enemigo cruzó la frontera solo y preguntó por ti.",
      },
      ca: {
        title: "El sant vora el riu",
        genre: "Cavallers i aura",
        tagline: "Un sant de l'espasa enemic ha creuat la frontera tot sol i ha preguntat per tu.",
      },
    },
  },
  {
    id: "ninth-floor",
    signature: true,
    cover: ninthFloor,
    text: {
      en: {
        title: "Left on the Ninth Floor",
        genre: "Races and monsters",
        tagline: "Left for dead in the Spire, beside a dragon egg that's starting to hatch.",
      },
      es: {
        title: "Abandonado en el noveno piso",
        genre: "Razas y monstruos",
        tagline: "Te dieron por muerto en la Aguja, junto a un huevo de dragón que empieza a romperse.",
      },
      ca: {
        title: "Abandonat al novè pis",
        genre: "Races i monstres",
        tagline: "Et van donar per mort a l'Agulla, al costat d'un ou de drac que comença a trencar-se.",
      },
    },
  },
  {
    id: "seven-day-villainess",
    signature: true,
    cover: sevenDayVillainess,
    text: {
      en: {
        title: "The Villainess Has Seven Days",
        genre: "Reincarnation",
        tagline: "Reborn as a novel's villainess, a week before her downfall.",
      },
      es: {
        title: "A la villana le quedan siete días",
        genre: "Reencarnación",
        tagline: "Renaces como la villana de una novela, una semana antes de su caída.",
      },
      ca: {
        title: "A la vilana li queden set dies",
        genre: "Reencarnació",
        tagline: "Reneixes com la vilana d'una novel·la, una setmana abans de la seva caiguda.",
      },
    },
  },
  {
    id: "naples-vendetta",
    signature: false,
    cover: naplesVendetta,
    text: {
      en: {
        title: "The Esposito Succession",
        genre: "Grounded crime",
        tagline: "Naples, 1974. Someone inside the family killed your father.",
      },
      es: {
        title: "La sucesión de los Esposito",
        genre: "Crimen realista",
        tagline: "Nápoles, 1974. Alguien de dentro de la familia mató a tu padre.",
      },
      ca: {
        title: "La successió dels Esposito",
        genre: "Crim realista",
        tagline: "Nàpols, 1974. Algú de dins de la família va matar el teu pare.",
      },
    },
  },
  {
    id: "kestrel-debt",
    signature: false,
    cover: kestrelDebt,
    text: {
      en: {
        title: "The Kestrel's Debt",
        genre: "Science fiction",
        tagline: "Thirty days to pay, and a crate in the hold worth killing for.",
      },
      es: {
        title: "La deuda del Cernícalo",
        genre: "Ciencia ficción",
        tagline: "Treinta días para pagar, y en la bodega una caja por la que vale la pena matar.",
      },
      ca: {
        title: "El deute del Xoriguer",
        genre: "Ciència-ficció",
        tagline: "Trenta dies per pagar, i a la bodega una caixa per la qual val la pena matar.",
      },
    },
  },
  {
    id: "night-shift",
    signature: false,
    cover: nightShift,
    text: {
      en: {
        title: "Night Shift",
        genre: "Hidden supernatural",
        tagline: "Lisbon, today. The dead man in your ambulance just sat up.",
      },
      es: {
        title: "Turno de noche",
        genre: "Lo sobrenatural oculto",
        tagline: "Lisboa, hoy. El muerto de tu ambulancia acaba de incorporarse.",
      },
      ca: {
        title: "Torn de nit",
        genre: "El sobrenatural ocult",
        tagline: "Lisboa, avui. El mort de la teva ambulància s'acaba d'incorporar.",
      },
    },
  },
  {
    id: "hollowmere",
    signature: false,
    cover: hollowmere,
    text: {
      en: {
        title: "Last Exam at Hollowmere",
        genre: "Academy fantasy",
        tagline: "Fail the final exam and your memories go to auction.",
      },
      es: {
        title: "Último examen en Hollowmere",
        genre: "Fantasía de academia",
        tagline: "Suspende el examen final y tus recuerdos saldrán a subasta.",
      },
      ca: {
        title: "Últim examen a Hollowmere",
        genre: "Fantasia d'acadèmia",
        tagline: "Suspèn l'examen final i els teus records sortiran a subhasta.",
      },
    },
  },
  {
    id: "drowned-capital",
    signature: false,
    cover: drownedCapital,
    text: {
      en: {
        title: "Ronin of the Drowned Capital",
        genre: "Samurai drama",
        tagline: "Clans fight over the rooftops of a city the sea swallowed.",
      },
      es: {
        title: "El ronin de la capital ahogada",
        genre: "Drama de samuráis",
        tagline: "Los clanes luchan por los tejados de una ciudad que se tragó el mar.",
      },
      ca: {
        title: "El ronin de la capital ofegada",
        genre: "Drama de samurais",
        tagline: "Els clans lluiten pels terrats d'una ciutat que es va empassar el mar.",
      },
    },
  },
  {
    id: "dead-god-courier",
    signature: false,
    cover: deadGodCourier,
    text: {
      en: {
        title: "Courier for a Dead God",
        genre: "Neon urban fantasy",
        tagline: "The god died yesterday. The package in your bag is addressed to them.",
      },
      es: {
        title: "Mensajero de un dios muerto",
        genre: "Fantasía urbana de neón",
        tagline: "El dios murió ayer. El paquete de tu bolsa va a su nombre.",
      },
      ca: {
        title: "Missatger d'un déu mort",
        genre: "Fantasia urbana de neó",
        tagline: "El déu va morir ahir. El paquet de la teva bossa va a nom seu.",
      },
    },
  },
  {
    id: "mask-maker",
    signature: false,
    cover: maskMaker,
    text: {
      en: {
        title: "The Mask-Maker of Venice",
        genre: "Grounded mystery",
        tagline: "Venice, carnival of 1750. A murderer wore the mask you made.",
      },
      es: {
        title: "El mascarero de Venecia",
        genre: "Misterio realista",
        tagline: "Venecia, carnaval de 1750. Un asesino llevaba la máscara que hiciste tú.",
      },
      ca: {
        title: "El mascarer de Venècia",
        genre: "Misteri realista",
        tagline: "Venècia, carnaval de 1750. Un assassí duia la màscara que vas fer tu.",
      },
    },
  },
  {
    id: "war-frame",
    signature: false,
    cover: warFrame,
    text: {
      en: {
        title: "The Frame That Chose You",
        genre: "Mecha",
        tagline: "The oldest war-frame in the hangar woke up and bonded with its mechanic.",
      },
      es: {
        title: "El armazón que te eligió",
        genre: "Mecha",
        tagline: "El armazón de guerra más viejo del hangar despertó y se vinculó a su mecánico.",
      },
      ca: {
        title: "L'armadura que et va triar",
        genre: "Mecha",
        tagline: "L'armadura de guerra més vella de l'hangar s'ha despertat i s'ha vinculat al seu mecànic.",
      },
    },
  },
  {
    id: "ashgrove",
    signature: false,
    cover: ashgrove,
    text: {
      en: {
        title: "Thirteen Nights at Ashgrove",
        genre: "Gothic horror",
        tagline: "Sleep thirteen nights in the manor to inherit it. Something knows your name.",
      },
      es: {
        title: "Trece noches en Ashgrove",
        genre: "Terror gótico",
        tagline: "Duerme trece noches en la mansión para heredarla. Algo sabe tu nombre.",
      },
      ca: {
        title: "Tretze nits a Ashgrove",
        genre: "Terror gòtic",
        tagline: "Dorm tretze nits a la mansió per heretar-la. Alguna cosa sap el teu nom.",
      },
    },
  },
  {
    id: "won-at-cards",
    signature: false,
    cover: wonAtCards,
    text: {
      en: {
        title: "Won at Cards",
        genre: "Pirate fantasy",
        tagline: "You won a pirate ship at cards. The navy is on the horizon.",
      },
      es: {
        title: "Ganado a las cartas",
        genre: "Fantasía pirata",
        tagline: "Ganaste un barco pirata a las cartas. La armada asoma en el horizonte.",
      },
      ca: {
        title: "Guanyat a les cartes",
        genre: "Fantasia pirata",
        tagline: "Vas guanyar un vaixell pirata a les cartes. L'armada apareix a l'horitzó.",
      },
    },
  },
  {
    id: "old-net",
    signature: false,
    cover: oldNet,
    text: {
      en: {
        title: "The Girl in the Old Net",
        genre: "Cyberpunk",
        tagline: "Someone lives inside a dead server, and it's wiped at midnight tomorrow.",
      },
      es: {
        title: "La chica de la red antigua",
        genre: "Cyberpunk",
        tagline: "Alguien vive dentro de un servidor muerto, y lo borran mañana a medianoche.",
      },
      ca: {
        title: "La noia de la xarxa antiga",
        genre: "Cyberpunk",
        tagline: "Algú viu dins d'un servidor mort, i l'esborren demà a mitjanit.",
      },
    },
  },
  {
    id: "last-lantern",
    signature: false,
    cover: lastLantern,
    text: {
      en: {
        title: "A Room for the Dragon",
        genre: "Cozy fantasy",
        tagline: "Your inn is failing, and the only guest is a dragon who pays in riddles.",
      },
      es: {
        title: "Una habitación para el dragón",
        genre: "Fantasía acogedora",
        tagline: "Tu posada se hunde, y el único huésped es un dragón que paga con acertijos.",
      },
      ca: {
        title: "Una habitació per al drac",
        genre: "Fantasia acollidora",
        tagline: "La teva fonda s'enfonsa, i l'únic hoste és un drac que paga amb endevinalles.",
      },
    },
  },
  {
    id: "dry-basin",
    signature: false,
    cover: dryBasin,
    text: {
      en: {
        title: "Two Days to the Well",
        genre: "Post-apocalyptic",
        tagline: "A caravan lies dead beside full water barrels, two days from the well.",
      },
      es: {
        title: "Dos días hasta el pozo",
        genre: "Postapocalíptico",
        tagline: "Una caravana muerta junto a barriles de agua llenos, a dos días del pozo.",
      },
      ca: {
        title: "Dos dies fins al pou",
        genre: "Postapocalíptic",
        tagline: "Una caravana morta al costat de barrils d'aigua plens, a dos dies del pou.",
      },
    },
  },
  {
    id: "what-things-remember",
    signature: false,
    cover: whatThingsRemember,
    text: {
      en: {
        title: "What Things Remember",
        genre: "Superpowers",
        tagline: "Your power woke today: what you hold shows you its memories.",
      },
      es: {
        title: "Lo que recuerdan las cosas",
        genre: "Superpoderes",
        tagline: "Tu poder despertó hoy: lo que sostienes te muestra sus recuerdos.",
      },
      ca: {
        title: "El que recorden les coses",
        genre: "Superpoders",
        tagline: "El teu poder s'ha despertat avui: el que agafes et mostra els seus records.",
      },
    },
  },
];
