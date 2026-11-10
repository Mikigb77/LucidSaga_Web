import type { Dictionary } from "./en";

/** The site's words in Catalan, with tu, as the app speaks. */
export const ca: Dictionary = {
  meta: {
    title: "Lucid Saga · La història que ho recorda tot",
    description:
      "Un joc d'històries amb IA que no s'acaba mai. Tria un món o escriu una línia, actua com vulguis i el narrador escriu què passa després, amb imatges i veu. Aviat a Google Play.",
    ogAlt: "Lucid Saga: una figura encaputxada travessa una porta lluminosa. Aviat a Google Play.",
  },
  nav: {
    how: "Com es juga",
    features: "Característiques",
    worlds: "Mons",
    skip: "Salta al contingut",
    home: "Lucid Saga, inici",
    language: "Idioma",
  },
  badge: {
    soon: "Aviat a",
    store: "Google Play",
    label: "Aviat a Google Play",
  },
  hero: {
    eyebrow: "Un joc d'històries amb IA",
    titleA: "Travessa la porta.",
    titleB: "La història no s'acaba mai.",
    lead: "Una història sense fi que recorda tot el que fas.",
    body: "Tria un món o imagina el teu en una sola línia. Escriu, toca o digues què fas, i el narrador escriu què passa després, dibuixa els moments que importen i te'ls llegeix en veu alta.",
    secondary: "Mira com es juga",
    artAlt: "Una figura encaputxada travessa una porta daurada i lluminosa en un bosc fosc.",
  },
  demo: {
    label: "Una escena de L'últim deixeble extern, tal com es juga a l'app",
    story: "L'últim deixeble extern",
    time: "+2 min · Dia 1, capvespre",
    event: "Esdeveniment local",
    eventText: "El mag gris arriba al pou",
    pictureAlt:
      "Un jove deixeble, amb el palmell alçat, atura un mag gris d'un bastó espurnejant al costat d'un pou de pedra al capvespre.",
    scene1:
      "El mag gris travessa les lloses sense fer soroll. Un llamp pàl·lid s'enfila pel seu bastó, i l'última llum vermella del capvespre li brilla als ulls.",
    action: "Alço el palmell i desvio el seu bastó cap al pou",
    scene2:
      "El teu qi respon tard, però respon. El bastó llisca pel teu palmell i colpeja la vora de pedra del pou, i el llamp no té més camí que l'aigua. El vapor esclata entre tots dos. Quan s'esvaeix, ell somriu.",
    choices: ["Corre cap a la porta exterior", "Pregunta-li qui l'envia", "Espera i observa"],
    composer: "Què fas?",
    readAloud: "Llegeix en veu alta",
  },
  how: {
    eyebrow: "Com es juga",
    title: "Tu decideixes què passa. El món respon.",
    steps: [
      {
        title: "Tria un món o escriu una línia",
        body: "Comença en un dels 23 mons o escriu una premissa. El narrador crea el món i el teu personatge, i pots canviar el que vulguis abans de començar.",
      },
      {
        title: "Fes el que vulguis",
        body: "Toca una opció suggerida, escriu què fas o digues-ho en veu alta. Espera i observa, o actua. No hi ha jugades equivocades, només conseqüències.",
      },
      {
        title: "Mira com es desenvolupa",
        body: "La narració apareix a mesura que s'escriu, pas a pas des d'on va acabar l'última escena. Els moments clau tenen imatge, i qualsevol escena es pot llegir en veu alta.",
      },
      {
        title: "El món recorda",
        body: "Cada persona, lloc, ferida i promesa queda guardada al motor de la història. Els morts continuen morts, i cada acte deixa empremta.",
      },
    ],
  },
  features: {
    eyebrow: "El que el fa diferent",
    title: "Un narrador amb memòria",
    pictures: {
      title: "Imatges als moments que importen",
      body: "Un duel al capvespre, un tracte en un reservat: el narrador dibuixa les escenes que compten, amb un mateix estil cinematogràfic. Cada personatge conserva la cara d'una escena a l'altra.",
      alt: "Un jove s'inclina sobre la taula d'un bar cap a un home gran, en un reservat ple de fum.",
    },
    voice: {
      title: "Cada escena, en veu alta",
      body: "Prem reproduir i una veu d'estudi llegeix l'escena en l'idioma i l'accent de la història: català, castellà d'Espanya o anglès amb veu nativa. Hi ha quatre veus per triar, o deixa que la llegeixi el teu mòbil, gratis.",
    },
    languages: {
      title: "Juga en la teva llengua",
      body: "Tota l'app i cada història, des de la primera línia, en català, castellà o anglès. Cada història es queda en l'idioma en què la vas començar.",
    },
    logic: {
      title: "Primer la lògica, després la sort",
      body: "Els resultats segueixen la causa i l'efecte. Un bon pla pot vèncer un rival més fort, i els daus només decideixen el que els fets deixen obert.",
      card: "Com s'ha desenvolupat",
      lines: [
        "El bastó ha colpejat la pedra, no pas tu",
        "L'aigua s'ha endut el llamp",
        "Una tirada per al vapor: ha amagat la teva retirada",
      ],
    },
    world: {
      title: "Un món que continua sense tu",
      body: "El temps passa en minuts i dies, no en torns. Els rivals conspiren, les notícies corren i les tempestes arriben tant si hi ets com si no.",
      time: "+6 min · Dia 1, alba",
      event: "Esdeveniment local",
      eventText: "L'alarma de la biblioteca desperta la secta",
    },
    memory: {
      title: "Ho recorda tot",
      body: "El motor de la història guarda els fets, així que res no depèn de la memòria de la IA. Obre Memòria per veure què sap el teu personatge, amb les paraules del món.",
      label: "Memòria",
      sublabel: "El que saps, amb les paraules del món.",
      items: [
        { name: "L'ancià Mo", note: "Mort. El van matar al torneig de classificació." },
        { name: "El mag gris", note: "Et busca. Sap allò del pergamí." },
        { name: "El pergamí prohibit", note: "Amagat a la teva túnica." },
      ],
    },
    dictation: {
      title: "Digues-ho en veu alta",
      body: "Digues què fas. El dictat coneix els noms de la teva història, i revises les paraules abans d'enviar-les.",
      sample: "Faig una reverència al germà gran Zhou",
    },
  },
  worlds: {
    eyebrow: "Mons",
    title: "Vint-i-tres mons per començar",
    body: "Sectes de cultivació i cavallers amb aura, una família del crim a la Nàpols de 1974, un vaixell pirata guanyat a les cartes. Cada món compleix les seves pròpies regles.",
    signature: "Mons insígnia",
    signatureBadge: "Insígnia",
    more: "Més mons",
    ownTitle: "O comença amb la teva pròpia idea",
    ownBody: "N'hi ha prou amb una línia. El narrador construeix el món al seu voltant.",
    ownExample: "Un faroner troba al mar una porta que ahir no hi era.",
    ownAlt: "Un castell lluminós sorgeix d'un llibre obert.",
    ownAction: "Crea el món",
  },
  final: {
    title: "La porta s'obre aviat",
    body: "Lucid Saga arriba a Google Play, primer a Android.",
    rating: "Les històries tenen classificació Teen o Mature 17+.",
  },
  footer: {
    tagline: "Una història sense fi que recorda tot el que fas.",
    rights: "© 2026 GARBAR, IN-TEC, S.L.",
    trademark: "Google Play és una marca de Google LLC.",
    languages: "Idiomes",
    legal: "Informació legal",
    support: "Suport",
    sections: "En aquest web",
    family: "Més de GarBar",
    maker: "Un producte de",
    backToTop: "Torna a dalt",
  },
  legal: {
    back: "Torna a Lucid Saga",
    documents: "Documents legals",
    contents: "En aquesta pàgina",
    summary: "D’un cop d’ull",
    inForce: "En vigor des del",
    operator: "Titular",
    taxId: "NIF",
    address: "Domicili social",
    register: "Registre Mercantil",
    registration:
      "Societat inscrita al Registre Mercantil de Barcelona, Tom 49105, Foli 130, Full 607875, Inscripció 1",
    generalContact: "Consultes generals",
    supportContact: "Suport, privadesa i eliminació",
    write: "Escriu al suport",
    deletion: "Escriu la sol·licitud d’eliminació",
    withdrawal: "Envia un desistiment",
    emailHelp:
      "S’obre un correu perquè el revisis i l’enviïs. Si no s’obre res, envia’l des del teu correu habitual a aquesta adreça, amb aquest assumpte.",
    recipient: "Per a",
    subject: "Assumpte",
    subjects: {
      privacy: "Lucid Saga: consulta de privadesa o suport",
      deletion: "Elimina el meu compte de Lucid Saga",
      withdrawal: "Lucid Saga: desistiment",
    },
    deletionBody:
      "Hola:\n\nUs demano que elimineu el meu compte de Lucid Saga i les seves dades.\n\nCorreu del compte: [el correu del teu compte de Lucid Saga]\n\nSi us plau, confirmeu-me quan estigui fet i indiqueu-me quines dades heu de conservar, per què i durant quant de temps.\n\nGràcies.",
    titles: {
      privacy: "Política de privadesa",
      terms: "Termes i condicions",
      legal: "Avís legal",
      "delete-account": "Elimina el compte",
    },
  },
  notFound: {
    title: "Aquest camí no porta enlloc",
    body: "La pàgina que buscaves no és aquí. La porta continua oberta.",
    back: "Torna a la porta",
  },
};
