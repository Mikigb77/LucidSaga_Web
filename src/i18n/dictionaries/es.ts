import type { Dictionary } from "./en";

/** The site's words in Spanish from Spain, with tú, as the app speaks. */
export const es: Dictionary = {
  meta: {
    title: "Lucid Saga · La historia que lo recuerda todo",
    description:
      "Un juego de historias con IA que no termina nunca. Elige un mundo o escribe una línea, actúa como quieras y el narrador escribe lo que pasa después, con imágenes y voz. Próximamente en Google Play.",
    ogAlt: "Lucid Saga: una figura encapuchada cruza una puerta luminosa. Próximamente en Google Play.",
  },
  nav: {
    how: "Cómo se juega",
    features: "Características",
    worlds: "Mundos",
    skip: "Saltar al contenido",
    home: "Lucid Saga, inicio",
    language: "Idioma",
  },
  badge: {
    soon: "Próximamente en",
    store: "Google Play",
    label: "Próximamente en Google Play",
  },
  hero: {
    eyebrow: "Un juego de historias con IA",
    titleA: "Cruza la puerta.",
    titleB: "La historia no termina nunca.",
    lead: "Una historia sin fin que recuerda todo lo que haces.",
    body: "Elige un mundo o imagina el tuyo en una sola línea. Escribe, toca o di lo que haces, y el narrador escribe lo que pasa después, dibuja los momentos que importan y te los lee en voz alta.",
    secondary: "Mira cómo se juega",
    artAlt: "Una figura encapuchada cruza una puerta dorada y luminosa en un bosque oscuro.",
  },
  demo: {
    label: "Una escena de El último discípulo externo, tal como se juega en la app",
    story: "El último discípulo externo",
    time: "+2 min · Día 1, atardecer",
    event: "Evento local",
    eventText: "El mago gris llega al pozo",
    pictureAlt:
      "Un joven discípulo, con la palma alzada, frena a un mago gris de bastón chisporroteante junto a un pozo de piedra al atardecer.",
    scene1:
      "El mago gris cruza las losas sin hacer ruido. Un rayo pálido trepa por su bastón, y la última luz roja del atardecer le brilla en los ojos.",
    action: "Alzo la palma y desvío su bastón hacia el pozo",
    scene2:
      "Tu qi responde tarde, pero responde. El bastón resbala en tu palma y golpea el borde de piedra del pozo, y el rayo no tiene más camino que el agua. El vapor estalla entre los dos. Cuando se disipa, él sonríe.",
    choices: ["Corre hacia la puerta exterior", "Pregúntale quién lo envía", "Espera y observa"],
    composer: "¿Qué haces?",
    readAloud: "Leer en voz alta",
  },
  how: {
    eyebrow: "Cómo se juega",
    title: "Tú decides qué pasa. El mundo responde.",
    steps: [
      {
        title: "Elige un mundo o escribe una línea",
        body: "Empieza en uno de los 23 mundos o escribe una premisa. El narrador crea el mundo y tu personaje, y puedes cambiar lo que quieras antes de empezar.",
      },
      {
        title: "Haz lo que quieras",
        body: "Toca una opción sugerida, escribe lo que haces o dilo en voz alta. Espera y observa, o actúa. No hay jugadas equivocadas, solo consecuencias.",
      },
      {
        title: "Mira cómo se desarrolla",
        body: "La narración aparece a medida que se escribe, paso a paso desde donde terminó la última escena. Los momentos clave tienen imagen, y cualquier escena se puede leer en voz alta.",
      },
      {
        title: "El mundo recuerda",
        body: "Cada persona, lugar, herida y promesa queda guardada en el motor de la historia. Los muertos siguen muertos, y cada acto deja huella.",
      },
    ],
  },
  features: {
    eyebrow: "Lo que lo hace distinto",
    title: "Un narrador con memoria",
    pictures: {
      title: "Imágenes en los momentos que importan",
      body: "Un duelo al atardecer, un trato en un reservado: el narrador dibuja las escenas que cuentan, con un mismo estilo cinematográfico. Cada personaje conserva su cara de una escena a otra.",
      alt: "Un joven se inclina sobre la mesa de un bar hacia un hombre mayor, en un reservado lleno de humo.",
    },
    voice: {
      title: "Cada escena, en voz alta",
      body: "Pulsa reproducir y una voz de estudio lee la escena en el idioma y el acento de la historia: español de España, catalán o inglés con voz nativa. Hay cuatro voces para elegir, o deja que la lea tu móvil, gratis.",
    },
    languages: {
      title: "Juega en tu idioma",
      body: "Toda la app y cada historia, desde la primera línea, en español, inglés o catalán. Cada historia se queda en el idioma en que la empezaste.",
    },
    logic: {
      title: "Primero la lógica, después la suerte",
      body: "Los resultados siguen la causa y el efecto. Un buen plan puede vencer a un rival más fuerte, y los dados solo deciden lo que los hechos dejan abierto.",
      card: "Cómo se desarrolló",
      lines: [
        "El bastón golpeó la piedra, no a ti",
        "El agua se llevó el rayo",
        "Una tirada para el vapor: ocultó tu retirada",
      ],
    },
    world: {
      title: "Un mundo que sigue sin ti",
      body: "El tiempo pasa en minutos y días, no en turnos. Los rivales conspiran, las noticias corren y las tormentas llegan estés o no.",
      time: "+6 min · Día 1, amanecer",
      event: "Evento local",
      eventText: "La alarma de la biblioteca despierta a la secta",
    },
    memory: {
      title: "Lo recuerda todo",
      body: "El motor de la historia guarda los hechos, así que nada depende de la memoria de la IA. Abre Memoria para ver lo que sabe tu personaje, con las palabras del mundo.",
      label: "Memoria",
      sublabel: "Lo que sabes, con las palabras del mundo.",
      items: [
        { name: "El anciano Mo", note: "Muerto. Lo mataron en el torneo de clasificación." },
        { name: "El mago gris", note: "Te busca. Sabe lo del pergamino." },
        { name: "El pergamino prohibido", note: "Escondido en tu túnica." },
      ],
    },
    dictation: {
      title: "Dilo en voz alta",
      body: "Di lo que haces. El dictado conoce los nombres de tu historia, y revisas las palabras antes de enviarlas.",
      sample: "Hago una reverencia al hermano mayor Zhou",
    },
  },
  worlds: {
    eyebrow: "Mundos",
    title: "Veintitrés mundos para empezar",
    body: "Sectas de cultivo y caballeros con aura, una familia del crimen en la Nápoles de 1974, un barco pirata ganado a las cartas. Cada mundo cumple sus propias reglas.",
    signature: "Mundos insignia",
    signatureBadge: "Insignia",
    more: "Más mundos",
    ownTitle: "O empieza con tu propia idea",
    ownBody: "Basta con una línea. El narrador construye el mundo a su alrededor.",
    ownExample: "Un farero encuentra en el mar una puerta que ayer no estaba.",
    ownAlt: "Un castillo luminoso surge de un libro abierto.",
    ownAction: "Crear el mundo",
  },
  final: {
    title: "La puerta se abre pronto",
    body: "Lucid Saga llega a Google Play, primero en Android.",
    rating: "Las historias tienen clasificación Teen o Mature 17+.",
  },
  footer: {
    tagline: "Una historia sin fin que recuerda todo lo que haces.",
    rights: "© 2026 GARBAR, IN-TEC, S.L.",
    trademark: "Google Play es una marca de Google LLC.",
    languages: "Idiomas",
    legal: "Información legal",
    support: "Soporte",
  },
  legal: {
    back: "Volver a Lucid Saga",
    documents: "Documentos legales",
    contents: "En esta página",
    summary: "De un vistazo",
    inForce: "En vigor desde el",
    operator: "Titular",
    taxId: "NIF",
    address: "Domicilio social",
    register: "Registro Mercantil",
    registration:
      "Inscrita en el Registro Mercantil de Barcelona, tomo 49105, folio 130, hoja 607875, inscripción 1",
    generalContact: "Consultas generales",
    supportContact: "Soporte, privacidad y eliminación",
    write: "Escribir a soporte",
    deletion: "Escribir la solicitud de eliminación",
    withdrawal: "Enviar un desistimiento",
    emailHelp:
      "Se abre un correo para que lo revises y lo envíes. Si no se abre nada, envíalo desde tu correo habitual a esta dirección, con este asunto.",
    recipient: "Para",
    subject: "Asunto",
    subjects: {
      privacy: "Lucid Saga: consulta de privacidad o soporte",
      deletion: "Eliminar mi cuenta de Lucid Saga",
      withdrawal: "Lucid Saga: desistimiento",
    },
    deletionBody:
      "Hola:\n\nOs pido que eliminéis mi cuenta de Lucid Saga y sus datos.\n\nCorreo de la cuenta: [el correo de tu cuenta de Lucid Saga]\n\nPor favor, confirmadme cuando esté hecho e indicadme qué datos debéis conservar, por qué y durante cuánto tiempo.\n\nGracias.",
    titles: {
      privacy: "Política de privacidad",
      terms: "Términos y condiciones",
      legal: "Aviso legal",
      "delete-account": "Eliminar cuenta",
    },
  },
  notFound: {
    title: "Este camino no lleva a ninguna parte",
    body: "La página que buscabas no está aquí. La puerta sigue abierta.",
    back: "Volver a la puerta",
  },
};
