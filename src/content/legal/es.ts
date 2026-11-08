import { company } from "./company";
import type { LegalCopy } from "./types";

const { generalEmail, supportEmail, minimumAge, teenOnlyUnder } = company;
const teenOnly =
  minimumAge < teenOnlyUnder
    ? [`Quien tenga menos de ${teenOnlyUnder} años solo recibe historias Teen.`]
    : [];

/** The legal documents in Spanish from Spain, with tú, as the app speaks. */
export const es: LegalCopy = {
  privacy: {
    title: "Política de privacidad de Lucid Saga",
    description:
      "Cómo usa Lucid Saga tu cuenta, tus historias, tu voz y las imágenes creadas para ellas, y qué puedes decidir tú.",
    summary: [
      "No vendemos tus datos, no te mostramos anuncios ni usamos tus historias para entrenar IA.",
      "Tu historia va a la IA de Google para escribir lo que pasa después, dibujar sus imágenes y leerla en voz alta. Tu voz solo va allí cuando dictas en línea.",
      "Puedes descargarlo todo o eliminar tu cuenta desde la app, cuando quieras.",
    ],
    sections: [
      {
        id: "controller",
        title: "1. Quién es el responsable",
        company: true,
        paragraphs: [
          "GARBAR, IN-TEC, S.L. gestiona Lucid Saga y es la responsable del tratamiento de los datos personales que se describen aquí. Lucid Saga es el nombre del producto, no una empresa distinta. Esta política cubre la app Lucid Saga, sus servidores de cuentas y de juego, y este sitio web.",
          "Esta política explica cómo usamos los datos; no pide un consentimiento general. Cuando una función necesita un permiso o tu consentimiento, la app te lo pide en ese momento.",
          `Escribe a ${generalEmail} para consultas generales y a ${supportEmail} para soporte, privacidad y eliminación de cuentas. Las dos direcciones llegan al buzón de la empresa. No necesitas ningún formulario ni asunto concreto para ejercer tus derechos.`,
        ],
        contact: "privacy",
      },
      {
        id: "data",
        title: "2. Qué datos tratamos",
        bullets: [
          "Cuenta: tu correo electrónico, un nombre visible, tu fecha de nacimiento y, o bien una contraseña, guardada solo como hash con sal que no se puede leer, o bien el identificador de tu cuenta de Google si entras con Google. Nunca recibimos tu contraseña de Google.",
          "Ajustes de las historias: las preferencias de contenido que eliges (nivel de violencia gráfica, romance y temas oscuros activados o no), cómo quieres dictar y que se lean las escenas, y el idioma de cada historia.",
          "Tus historias: el mundo o la premisa de partida, las acciones que escribes o dictas, las opciones que eliges y lo que el narrador escribe, junto con el estado de la historia: sus personajes, lugares y los hechos que recuerda su mundo.",
          "Imágenes y audio: las imágenes dibujadas para tus historias y el audio de las escenas leídas con la voz de estudio, que guardamos para que una escena que vuelves a escuchar suene al instante y no cueste nada.",
          "Créditos: tu saldo y lo que ha costado cada turno, imagen, dictado o escena leída en voz alta.",
          "Dispositivos con sesión iniciada: cuándo entró cada uno y cuándo se usó por última vez, para mantener tu sesión y que puedas cerrarla en un dispositivo.",
          "Denuncias: la escena que denuncias, el motivo que eliges, la nota que escribas, si la bloqueaste y lo que decidió nuestro equipo.",
          "Registros técnicos: identificadores de petición, los identificadores de tu cuenta y de tus historias, errores, tiempos, costes, tu dirección de red y la versión de la app y, cuando nuestras normas de seguridad bloquean una escena, su categoría, nunca el texto de la historia. Los recuentos breves de intentos de acceso fallidos por correo y por dirección de red se guardan solo como claves de un solo sentido.",
          "Los mensajes que nos envías y lo que necesitamos para responderlos.",
        ],
      },
      {
        id: "purposes",
        title: "3. Para qué los usamos y con qué base legal",
        bullets: [
          "Para ofrecerte el juego que nos pides (artículo 6.1.b del RGPD, contrato): tu cuenta, escribir tu historia, dibujar sus imágenes, leerla en voz alta, el dictado, los créditos, la exportación, la eliminación y el soporte. Tu fecha de nacimiento es necesaria para aplicar las normas de edad.",
          "Nuestros intereses legítimos (artículo 6.1.f): mantener el servicio seguro, frenar los intentos de adivinar contraseñas, los registros falsos y los abusos, controlar los costes, corregir fallos y revisar las escenas denunciadas para que el narrador cumpla nuestras normas de contenido. Puedes oponerte cuando esta sea la base.",
          "Obligaciones legales (artículo 6.1.c): los registros contables y fiscales cuando haya compras, atender peticiones legítimas de las autoridades y gestionar tus derechos de protección de datos.",
          "Consentimiento (artículo 6.1.a), solo cuando la app te lo pide aparte, como el permiso del micrófono. Puedes retirarlo cuando quieras, sin que afecte a lo hecho antes.",
        ],
        notes: [
          "No vendemos datos personales, no mostramos anuncios, no usamos rastreadores publicitarios ni entrenamos modelos de IA con tus historias. La IA escribe ficción para tu historia; no toma decisiones sobre ti con efectos jurídicos o de importancia similar.",
        ],
      },
      {
        id: "ai",
        title: "4. La IA, tu voz y la lectura en voz alta",
        paragraphs: [
          "Lucid Saga la escribe una IA. En cada turno, nuestro servidor envía a los modelos Gemini de Google, en Vertex AI de Google Cloud, lo que la historia necesita para continuar: la historia hasta ahora, su mundo y sus personajes, tu acción y tus ajustes de contenido. El mismo servicio dibuja las imágenes de los momentos clave. La parte de las instrucciones de una historia que no cambia de un turno a otro puede guardarse en una caché de Vertex AI hasta 15 minutos después de tu último turno, para que cueste menos.",
          "Dictado: por defecto, la app graba mientras el micrófono está activo y envía la grabación a nuestro servidor, que hace que Gemini la transcriba atento a los nombres que tu personaje conoce en esa historia. La grabación se usa solo para esa petición: no la guardamos ni la registramos, y solo conservamos su duración y su coste en tu historial de créditos. Si eliges Este dispositivo en Cuenta, en Dictado, el reconocimiento de voz de tu propio móvil la transcribe y el audio nunca llega a nuestros servidores, aunque los reconocedores de Android y de Apple pueden usar los servidores de sus fabricantes cuando el móvil no puede hacerlo solo.",
          "Lectura en voz alta: por defecto, la voz de estudio envía el texto de la escena a Gemini, que la lee en voz alta, y guardamos el audio con tu historia. Si eliges la voz de tu dispositivo, la lee tu móvil y nada llega a nuestros servidores.",
          "Según las condiciones de Google Cloud, Google no usa lo que enviamos a Vertex AI para entrenar sus modelos sin nuestro permiso. Google puede conservar algunos datos durante un tiempo limitado para la caché, la seguridad y la detección de abusos, y puede tratarlos fuera de la UE. No prometemos retención cero ni tratamiento solo en la UE.",
          "Tu propia clave de API: si añades en la app tu propia clave de la API de Gemini, tus turnos van a la API de Gemini de Google con tu propia cuenta y bajo las condiciones de Google para ella, y en su nivel gratuito Google puede usar lo que envías para mejorar sus productos. La clave se queda en tu dispositivo y solo se envía con las peticiones que la necesitan; nuestro servidor nunca la guarda ni la registra. El dictado y la voz de estudio siguen funcionando con nuestra cuenta.",
          "Las historias son ficción. No pongas en una historia datos privados de personas reales, historiales médicos, contraseñas ni otra información delicada.",
        ],
        links: [
          {
            label: "Condiciones de servicio de Google Cloud, incluido Vertex AI",
            href: "https://cloud.google.com/terms/service-terms",
          },
          {
            label: "Condiciones de tratamiento de datos de Google Cloud",
            href: "https://cloud.google.com/terms/data-processing-addendum",
          },
        ],
      },
      {
        id: "sharing",
        title: "5. Quién ve tus datos",
        paragraphs: [
          "Tus historias son privadas de tu cuenta: Lucid Saga no permite compartirlas en público. En nuestro equipo, solo el propietario y quienes gestionan las denuncias pueden leer el texto de una historia, y lo leen para revisar denuncias. Quienes ayudan con cuentas y créditos ven el título, la clasificación y las cifras de una historia, nunca lo que hay escrito en ella.",
          "Nuestros proveedores reciben lo que necesitan para su función, como encargados del tratamiento según nuestras instrucciones o, para sus propias obligaciones legales, de seguridad o de pago, como responsables independientes con sus propios avisos.",
        ],
        bullets: [
          "Google Cloud (Cloud Run, Cloud Storage, Cloud Logging, Secret Manager): ejecuta el servidor del juego y este sitio web, guarda las imágenes y el audio, y conserva los registros. El servidor del juego y su almacenamiento están en Fráncfort (Alemania), y este sitio web en Bélgica.",
          "Vertex AI de Google Cloud (Gemini): escribe las historias, dibuja las imágenes, transcribe el dictado en línea y lee las escenas con la voz de estudio.",
          "Neon: aloja la base de datos de cuentas e historias, en Fráncfort (Alemania).",
          "Inicio de sesión con Google: confirma quién eres cuando entras con Google.",
          "Google Workspace (Gmail): recibe y responde los correos que nos envías, con lo que decidas enviar.",
          "Google Play: distribuye la app y, cuando haya compras, cobra los pagos. Nunca recibimos los datos completos de tu tarjeta.",
          "Asesores profesionales o autoridades, solo cuando lo exija una obligación legal o una reclamación.",
        ],
        links: [
          { label: "Aviso de privacidad de Neon", href: "https://neon.com/privacy-policy" },
          { label: "Política de privacidad de Google", href: "https://policies.google.com/privacy" },
        ],
      },
      {
        id: "transfers",
        title: "6. Tratamiento fuera de la UE",
        paragraphs: [
          "Nuestra base de datos y nuestros servidores están en la UE, pero parte del tratamiento puede hacerse en otros lugares: Vertex AI funciona en el punto de acceso global de Google, y los equipos de soporte y seguridad de nuestros proveedores pueden trabajar desde fuera del Espacio Económico Europeo.",
          `Estas transferencias siguen el capítulo V del RGPD: una decisión de adecuación de la Comisión Europea, como el Marco de Privacidad de Datos UE-EE. UU. para los destinatarios adheridos, o las cláusulas contractuales tipo de la Comisión con las medidas que hagan falta. Escribe a ${supportEmail} para saber qué mecanismo se aplica a tus datos y obtener una copia de las garantías.`,
        ],
      },
      {
        id: "retention",
        title: "7. Cuánto tiempo los guardamos",
        bullets: [
          "Tu cuenta, historias, imágenes, audio y créditos: mientras los conserves. Eliminar una historia elimina sus escenas, imágenes y audio. Eliminar tu cuenta elimina todo lo que contiene, al instante.",
          "Denuncias: hasta que elimines la historia denunciada o tu cuenta.",
          "Grabaciones de dictado: no se guardan. Cada una se usa para su única petición.",
          "Registros: 30 días. Los recuentos de protección del acceso caducan solos al poco tiempo.",
          "Tus correos: mientras gestionamos tu petición y, si hace falta, mientras se pueda presentar una reclamación o acción legal sobre ella.",
          "Compras, cuando las haya: los registros que exige la ley, como seis años para los libros mercantiles en España y en general cuatro para los fiscales, con acceso restringido.",
        ],
        notes: [
          "El historial de restauración de nuestra base de datos conserva los datos eliminados durante el periodo de restauración de nuestro proveedor, y después desaparecen; las copias de seguridad no se modifican cuando eliminas algo. Las copias que exportaste tú las tienes que borrar tú. Puedes preguntarnos qué plazos se aplican a tus datos.",
        ],
      },
      {
        id: "website",
        title: "8. Este sitio web y las cookies",
        paragraphs: [
          "Este sitio web no tiene cuentas, analítica, publicidad ni seguimiento. Se abre en el idioma de tu navegador cuando es español, catalán o inglés, y en inglés en otro caso; nunca usa tu ubicación para esto.",
          "Si eliges un idioma en el selector, una cookie llamada lang lo recuerda hasta un año, para que el sitio se abra en ese idioma la próxima vez. Es una preferencia que tú pides y no se usa para nada más. Puedes borrarla en tu navegador cuando quieras.",
          "Nuestro alojamiento guarda durante 30 días registros de las peticiones, con la hora, la página, tu navegador y tu dirección de red, para que el sitio funcione y sea seguro.",
        ],
      },
      {
        id: "security",
        title: "9. Permisos y seguridad",
        paragraphs: [
          "La app pide el micrófono la primera vez que lo tocas y solo escucha mientras muestra que está escuchando; escribir siempre funciona. Puedes cambiar los permisos en los ajustes de tu móvil.",
          "Todo el tráfico va cifrado. Las contraseñas se guardan solo como hash con sal y los tokens de sesión como hash de un solo sentido, nuestras claves están en Google Secret Manager, cerrar sesión en un dispositivo la termina al instante y los intentos repetidos con una contraseña incorrecta se ralentizan. Lucid Saga no tiene cifrado de extremo a extremo: nuestros servidores y proveedores tratan tus historias para poder escribirlas.",
        ],
      },
      {
        id: "rights",
        title: "10. Tus derechos",
        paragraphs: [
          "En la app puedes descargar todo lo que tenemos sobre ti (Cuenta → Privacidad y datos → Exportar mis datos), eliminar tu cuenta y todo lo que contiene (Cuenta → Privacidad y datos → Eliminar cuenta), y corregir tu nombre y tus preferencias en Cuenta.",
          "También puedes pedirnos el acceso, la rectificación, la supresión, la limitación o la portabilidad de tus datos, y oponerte al tratamiento basado en nuestros intereses legítimos. Cuando nos basamos en tu consentimiento, puedes retirarlo.",
          `Escribe a ${supportEmail} indicando la cuenta y el derecho. Comprobamos de forma proporcionada que la cuenta es tuya, y nunca te pedimos la contraseña ni el número de tarjeta. Respondemos en el plazo de un mes; si la petición es compleja o son muchas, podemos tardar hasta dos meses más, y te diremos el motivo dentro del primero. Las peticiones son gratuitas.`,
          "Puedes reclamar ante la Agencia Española de Protección de Datos (AEPD), o ante la autoridad del lugar donde vives, sin tener que contactarnos antes.",
        ],
        contact: "privacy",
        links: [
          { label: "Eliminar tu cuenta", href: "/delete-account" },
          {
            label: "AEPD: tus derechos y cómo reclamar",
            href: "https://www.aepd.es/derechos-y-deberes/conoce-tus-derechos",
          },
        ],
      },
      {
        id: "age-changes",
        title: "11. Edad y cambios",
        paragraphs: [
          [
            `Debes tener al menos ${minimumAge} años para registrarte, y la app te pide la fecha de nacimiento.`,
            ...teenOnly,
            `Si sabemos que se ha registrado alguien menor de ${minimumAge} años, eliminamos la cuenta. Si crees que una persona más joven tiene una, escríbenos.`,
          ].join(" "),
          "Actualizaremos esta política cuando cambien el juego o su uso de los datos, mostraremos la fecha en que entra en vigor cada versión y te avisaremos en la app antes de que entre en vigor un cambio importante.",
        ],
      },
    ],
  },
  terms: {
    title: "Términos y condiciones de Lucid Saga",
    description:
      "Las condiciones para jugar a Lucid Saga: tu cuenta, tus historias, las normas de contenido, los créditos y las compras.",
    summary: [
      "Lucid Saga escribe ficción interactiva con IA; tú decides qué hace tu personaje.",
      "Lo que escribes sigue siendo tuyo, y puedes exportar tus historias.",
      "Tus derechos como consumidor se aplican siempre.",
    ],
    sections: [
      {
        id: "operator",
        title: "1. Lucid Saga y estas condiciones",
        company: true,
        paragraphs: [
          "Estas condiciones son el acuerdo entre GARBAR, IN-TEC, S.L. y tú, la persona que juega a Lucid Saga. Lucid Saga es el nombre de nuestro producto, no una empresa distinta. La política de privacidad explica cómo usamos los datos personales.",
          "Lucid Saga llegará pronto a Google Play. Hasta que esté publicada allí, la app es una versión de prueba que se comparte con personas que la prueban, y no se vende nada. Las cláusulas sobre compras solo se aplican cuando una compra se ofrece y se hace de verdad.",
        ],
      },
      {
        id: "account",
        title: "2. Tu cuenta",
        paragraphs: [
          [
            `Debes tener al menos ${minimumAge} años para registrarte y dar tu fecha de nacimiento real: decide qué historias puedes recibir.`,
            ...teenOnly,
          ].join(" "),
          "Guarda bien tus datos de acceso y avísanos si crees que otra persona ha usado tu cuenta. No compartas una cuenta, no te hagas pasar por otra persona ni abras cuentas para saltarte los límites o volver a conseguir los créditos de bienvenida.",
        ],
      },
      {
        id: "game",
        title: "3. El juego",
        paragraphs: [
          "Lucid Saga es un juego de historias sin fin: eliges un mundo o describes uno, actúas como quieras y un narrador con IA escribe lo que pasa después, dibuja los momentos clave y puede leer las escenas en voz alta. El juego lleva la cuenta del mundo, sus personajes y lo que ha pasado, para que la historia lo recuerde.",
          "El narrador es una IA. Lo que escribe y dibuja puede ser inesperado, incoherente o erróneo, y es ficción: nada de una historia es un consejo ni una afirmación sobre personas o hechos reales.",
          "Algunas funciones necesitan conexión a internet, un dispositivo compatible o un permiso. Podemos mejorar o cambiar el juego; avisaremos con antelación razonable de un cambio que afecte de verdad a algo que hayas pagado, junto con los derechos que te da la ley.",
        ],
      },
      {
        id: "rules",
        title: "4. Normas de contenido",
        paragraphs: [
          "Las historias tienen clasificación Teen o Mature 17+, sin contenido sexual explícito. No uses Lucid Saga para crear contenido que sexualice a menores, acose o difame a personas reales, promueva la violencia en el mundo real o sea ilegal de otro modo, ni intentes saltarte las clasificaciones o las normas de seguridad.",
          "Cualquier escena se puede denunciar o bloquear: bloquearla la oculta para ti, y cada denuncia la revisan personas. Podemos retirar contenido o restringir una cuenta que incumpla estas normas, como explica el apartado 9.",
          "No interfieras con el servicio, no intentes acceder sin autorización, no juegues mediante bots o scripts ni revendas el acceso.",
        ],
      },
      {
        id: "stories",
        title: "5. Tus historias",
        paragraphs: [
          "Lo que escribes sigue siendo tuyo. Solo nos das el permiso que necesitamos para guardar y tratar tus historias y mostrártelas, mediante los proveedores de la política de privacidad, y para revisar una escena que denuncies. No publicamos tus historias, no las usamos en publicidad ni entrenamos IA con ellas.",
          "Los textos y las imágenes que el narrador crea para tu historia puedes conservarlos, exportarlos y compartirlos para uso personal y no comercial. El contenido creado por IA puede no estar protegido por derechos de autor, y la IA puede crear contenido parecido para otras personas.",
          "Los mundos, personajes e ilustraciones que ofrece Lucid Saga, la app, las instrucciones del narrador y la marca Lucid Saga son nuestros o de quienes nos los licencian.",
        ],
      },
      {
        id: "credits",
        title: "6. Créditos",
        paragraphs: [
          "Los turnos, las imágenes, el dictado en línea y la voz de estudio cuestan créditos, como muestra la app. Una cuenta nueva recibe créditos de bienvenida una vez, como explica la app. Si usas tu propia clave de la API de Gemini, tus turnos no cuestan créditos y se aplican las condiciones de Google para esa clave.",
          "Los créditos sirven para pagar el uso del juego. No tienen valor en dinero, no se pueden transferir ni cambiar por dinero, y se pierden al eliminar tu cuenta.",
        ],
      },
      {
        id: "purchases",
        title: "7. Compras, renovación y cancelación",
        paragraphs: [
          "Cuando haya créditos o planes a la venta, la tienda te mostrará antes de confirmar el precio, los impuestos, lo que recibes y, para un plan, cómo se renueva. Las compras en la app se hacen con Google Play según sus normas; nunca vemos los datos de tu tarjeta.",
          "Un plan se renueva hasta que lo canceles en la cuenta de Google Play con la que lo compraste. Cancelarlo detiene la siguiente renovación y mantiene lo que ya pagaste. Eliminar la app o tu cuenta de Lucid Saga no cancela una suscripción de Google Play.",
          "Te avisaremos antes de cambiar el precio de un plan que ya tienes, como exigen la ley y la tienda, con la posibilidad de cancelarlo.",
        ],
      },
      {
        id: "withdrawal",
        title: "8. Desistimiento, reembolsos y fallos",
        paragraphs: [
          "Como consumidor en la UE, en general tienes 14 días para desistir de un contrato a distancia sin dar ningún motivo. Para créditos o un plan que empiezan al instante, la tienda puede pedirte que aceptes que empiecen dentro de esos 14 días y que reconozcas que entonces pierdes el derecho de desistimiento; solo si lo haces, y solo por lo ya suministrado, se pierde ese derecho.",
          "Para desistir, envíanos una declaración clara o usa la solicitud de reembolso de Google Play. Indica la cuenta, la fecha de compra y el número de pedido, nunca los datos de tu tarjeta. Puedes usar este modelo, pero no es obligatorio: «A GARBAR, IN-TEC, S.L., en la dirección que figura en esta página. Desisto de mi contrato de [créditos o plan] comprado el [fecha]. Cuenta y número de pedido: […]. Nombre y dirección: […]. Fecha: […].»",
          "Los reembolsos de un desistimiento válido se hacen en un plazo de 14 días desde tu aviso, por el mismo medio de pago. Si el juego no funciona como se prometió, tienes los derechos que te dan las leyes españolas y europeas: que se arregle, una rebaja del precio o resolver el contrato con reembolso.",
        ],
        contact: "withdrawal",
      },
      {
        id: "ending",
        title: "9. Baja, suspensión y cierre",
        paragraphs: [
          "Puedes eliminar tu cuenta cuando quieras desde la app (Cuenta → Privacidad y datos → Eliminar cuenta), o por correo sin la app. Exporta antes tus historias si quieres conservarlas. Eliminar tu cuenta no cancela una suscripción de Google Play, y no hace falta cancelarla antes.",
          "Podemos restringir o cerrar una cuenta, de forma proporcionada, por un incumplimiento grave de estas condiciones, fraude, actividad ilegal o una amenaza para la seguridad. Cuando sea posible, te diremos el motivo y cómo responder; las medidas de seguridad urgentes pueden aplicarse al instante.",
          "Si algún día cerramos Lucid Saga, avisaremos con antelación razonable, te daremos la posibilidad de exportar tus historias y el reembolso que exija la ley por lo que hayas pagado y no hayas usado.",
        ],
        links: [
          { label: "Eliminar tu cuenta", href: "/delete-account" },
          { label: "Tus derechos de privacidad", href: "/privacy#rights" },
        ],
      },
      {
        id: "liability",
        title: "10. Responsabilidad",
        paragraphs: [
          "Respondemos como exige la ley. Nada de estas condiciones limita una responsabilidad que la ley no nos permite limitar, como la derivada de fraude, dolo o daños personales, ni tus derechos irrenunciables como consumidor o en protección de datos.",
        ],
      },
      {
        id: "law",
        title: "11. Contacto, ley aplicable y cambios",
        paragraphs: [
          `Escribe a ${supportEmail} con tus dudas o reclamaciones. Te confirmaremos que hemos recibido una reclamación y la responderemos en el plazo de un mes. También puedes acudir a la autoridad de consumo o a un organismo de resolución de conflictos competente.`,
          "Se aplica la ley española, sin quitarte la protección que te da la ley del país donde vives. Puedes presentar una reclamación ante los tribunales que permita la ley, incluidos los de tu domicilio.",
          "Mostraremos la fecha de cada nueva versión y te avisaremos en la app antes de que entre en vigor un cambio importante. Un cambio nunca afecta a una compra ya hecha. Las versiones en inglés, español y catalán dicen lo mismo; una diferencia entre ellas no se usará en tu contra.",
        ],
        contact: "privacy",
      },
    ],
  },
  legal: {
    title: "Aviso legal",
    description: "Quién gestiona Lucid Saga y este sitio web: GARBAR, IN-TEC, S.L.",
    summary: [
      "Lucid Saga es el nombre del producto.",
      "Lo gestiona GARBAR, IN-TEC, S.L.",
      `Escríbenos a ${generalEmail}.`,
    ],
    sections: [
      {
        id: "operator",
        title: "1. Titular",
        company: true,
        paragraphs: [
          "GARBAR, IN-TEC, S.L., identificada arriba, es la titular de este sitio web y del servicio Lucid Saga. Este aviso ofrece la información que exige la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI).",
          `Para consultas generales, escribe a ${generalEmail}. Para ayuda con la app, reclamaciones, privacidad o eliminar una cuenta, escribe a ${supportEmail}. También puedes escribir al domicilio social indicado arriba.`,
        ],
        contact: "privacy",
      },
      {
        id: "website",
        title: "2. Este sitio web",
        paragraphs: [
          "Este sitio presenta Lucid Saga, que llegará pronto a Google Play. No vende nada: lo que ofrece la app, y a qué precio, es solo lo que muestran su ficha en la tienda y la propia app.",
          "Los términos y condiciones regulan el uso de Lucid Saga, y la política de privacidad explica cómo usamos los datos personales, incluida la única cookie de este sitio. Escríbenos para avisar de contenido ilícito, un problema de seguridad o un error en este sitio.",
        ],
      },
      {
        id: "rights",
        title: "3. Propiedad intelectual y enlaces",
        paragraphs: [
          "Los textos, las imágenes y el software del sitio, y el nombre y el logotipo de Lucid Saga, pertenecen a GARBAR, IN-TEC, S.L. o a quienes se los licencian. Puedes navegar por el sitio y compartir enlaces a él, pero no copiar su contenido para otros usos ni dar a entender que respaldamos algo que no respaldamos.",
          "Google Play es una marca de Google LLC. Los enlaces a otros sitios llevan a los servicios de sus titulares, con sus propias condiciones.",
        ],
      },
    ],
  },
  "delete-account": {
    title: "Elimina tu cuenta de Lucid Saga",
    description: "Elimina tu cuenta desde la app, o pídenoslo por correo sin la app.",
    summary: [
      "Se elimina: tu cuenta, cada historia con sus escenas, imágenes y audio, tus créditos y tus sesiones.",
      "Desde la app se hace al instante, y no se puede deshacer.",
      "Eliminar tu cuenta no cancela una suscripción de Google Play.",
    ],
    sections: [
      {
        id: "in-app",
        title: "1. Desde la app",
        paragraphs: [
          "Abre Cuenta → Privacidad y datos → Eliminar cuenta. La app te muestra lo que se eliminará. Escribe la palabra que te pide para confirmar y toca Eliminar mi cuenta. Necesitas conexión a internet.",
          "Si antes quieres una copia, toca Exportar mis datos en la misma pantalla: guarda tu cuenta, tus historias y tus imágenes en un archivo.",
          "Cuando nuestro servidor lo confirma, la app cierra tu sesión y te dice que tu cuenta se ha eliminado. Si muestra un error, no des por hecho que ha funcionado: vuelve a intentarlo o escríbenos.",
        ],
      },
      {
        id: "request",
        title: "2. Por correo, sin la app",
        paragraphs: [
          `Escribe a ${supportEmail}, si puedes desde el correo de tu cuenta, e indica qué cuenta quieres eliminar. Usa esta vía si has desinstalado la app, no puedes entrar o necesitas ayuda. No tienes que dar ningún motivo, comprar nada ni cancelar antes una suscripción.`,
          "Si ya no tienes acceso al correo de la cuenta, dínoslo y comprobaremos de forma proporcionada que la cuenta es tuya. Nunca envíes tu contraseña ni el número de tu tarjeta.",
          "El botón de abajo abre un correo para que lo revises y lo envíes; esta página no elimina nada por sí sola.",
        ],
        contact: "deletion",
      },
      {
        id: "scope",
        title: "3. Qué se elimina y qué se queda",
        bullets: [
          "Se elimina: tu cuenta, cada historia con sus escenas, imágenes y el audio de las escenas leídas en voz alta, tus denuncias, tus créditos, incluidos los que te queden, y tu sesión en todos los dispositivos.",
          "La app no elimina: nuestros registros, que contienen identificadores de cuenta y de historia pero nunca el texto de una historia, y caducan a los 30 días; el historial de restauración de la base de datos, que caduca solo; tus correos con nosotros; el registro propio de Google Play de cualquier compra; y las copias que hayas exportado. Pídenos que eliminemos lo que se pueda eliminar, y te diremos qué debe quedarse, por qué y durante cuánto tiempo.",
          "Tu cuenta de Google no se ve afectada.",
        ],
      },
      {
        id: "timing",
        title: "4. Cuándo",
        paragraphs: [
          "Desde la app, tu cuenta se elimina en cuanto confirmas.",
          "Si nos lo pides por correo, respondemos en el plazo de un mes, eliminamos lo que corresponda sin dilación indebida y te lo confirmamos. Si algo debe quedarse por un motivo legal, te explicamos qué, por qué y durante cuánto tiempo.",
        ],
        links: [{ label: "Cuánto tiempo guardamos los datos", href: "/privacy#retention" }],
      },
      {
        id: "subscription",
        title: "5. Suscripciones y tu móvil",
        paragraphs: [
          "Eliminar tu cuenta no cancela una suscripción de Google Play: cancélala en Google Play. No hace falta cancelarla antes de pedirnos que eliminemos tu cuenta.",
          "Después de eliminar tu cuenta, desinstala la app para quitarla de tu móvil. Desinstalarla sin más no elimina tu cuenta.",
        ],
        links: [
          {
            label: "Gestionar suscripciones de Google Play",
            href: "https://support.google.com/googleplay/answer/7018481?hl=es",
          },
        ],
      },
    ],
  },
};
