import { company } from "./company";
import type { LegalCopy } from "./types";

const { generalEmail, supportEmail, minimumAge, teenOnlyUnder } = company;
const teenOnly =
  minimumAge < teenOnlyUnder ? [`Qui tingui menys de ${teenOnlyUnder} anys només rep històries Teen.`] : [];

/** The legal documents in Catalan, with tu, as the app speaks. */
export const ca: LegalCopy = {
  privacy: {
    title: "Política de privadesa de Lucid Saga",
    description:
      "Com fa servir Lucid Saga el teu compte, les teves històries, la teva veu i les imatges creades per a elles, i què pots decidir tu.",
    summary: [
      "No venem les teves dades, no et mostrem anuncis ni fem servir les teves històries per entrenar IA.",
      "La teva història va a la IA de Google per escriure què passa després, dibuixar-ne les imatges i llegir-la en veu alta. La teva veu només hi va quan dictes en línia.",
      "Pots descarregar-ho tot o eliminar el teu compte des de l’app, quan vulguis.",
    ],
    sections: [
      {
        id: "controller",
        title: "1. Qui n’és el responsable",
        company: true,
        paragraphs: [
          "GARBAR, IN-TEC, S.L. gestiona Lucid Saga i és la responsable del tractament de les dades personals que es descriuen aquí. Lucid Saga és el nom del producte, no una empresa diferent. Aquesta política cobreix l’app Lucid Saga, els seus servidors de comptes i de joc, i aquest lloc web.",
          "Aquesta política explica com fem servir les dades; no demana un consentiment general. Quan una funció necessita un permís o el teu consentiment, l’app te’l demana en aquell moment.",
          `Escriu a ${generalEmail} per a consultes generals i a ${supportEmail} per a suport, privadesa i eliminació de comptes. Totes dues adreces arriben a la bústia de l’empresa. No necessites cap formulari ni cap assumpte concret per exercir els teus drets.`,
        ],
        contact: "privacy",
      },
      {
        id: "data",
        title: "2. Quines dades tractem",
        bullets: [
          "Compte: el teu correu electrònic, un nom visible, la teva data de naixement i, o bé una contrasenya, desada només com a hash amb sal que no es pot llegir, o bé l’identificador del teu compte de Google si hi entres amb Google. No rebem mai la teva contrasenya de Google.",
          "Configuració de les històries: les preferències de contingut que tries (nivell de violència gràfica, romanç i temes foscos activats o no), com vols dictar i que es llegeixin les escenes, i l’idioma de cada història.",
          "Les teves històries: el món o la premissa de partida, les accions que escrius o dictes, les opcions que tries i el que escriu el narrador, juntament amb l’estat de la història: els seus personatges, llocs i els fets que recorda el seu món.",
          "Imatges i àudio: les imatges dibuixades per a les teves històries i l’àudio de les escenes llegides amb la veu d’estudi, que desem perquè una escena que tornes a escoltar soni a l’instant i no costi res.",
          "Crèdits: el teu saldo i el que ha costat cada torn, imatge, dictat o escena llegida en veu alta.",
          "Dispositius amb la sessió iniciada: quan hi va entrar cadascun i quan es va fer servir per última vegada, per mantenir la teva sessió i que la puguis tancar en un dispositiu.",
          "Denúncies: l’escena que denuncies, el motiu que tries, la nota que escriguis, si la vas bloquejar i el que va decidir el nostre equip.",
          "Registres tècnics: identificadors de petició, els identificadors del teu compte i de les teves històries, errors, temps, costos, la teva adreça de xarxa i la versió de l’app i, quan les nostres normes de seguretat bloquegen una escena, la seva categoria, mai el text de la història. Els recomptes breus d’intents d’accés fallits per correu i per adreça de xarxa es desen només com a claus d’un sol sentit.",
          "Els missatges que ens envies i el que necessitem per respondre’ls.",
        ],
      },
      {
        id: "purposes",
        title: "3. Per a què les fem servir i amb quina base legal",
        bullets: [
          "Per oferir-te el joc que ens demanes (article 6.1.b del RGPD, contracte): el teu compte, escriure la teva història, dibuixar-ne les imatges, llegir-la en veu alta, el dictat, els crèdits, l’exportació, l’eliminació i el suport. La teva data de naixement és necessària per aplicar les normes d’edat.",
          "Els nostres interessos legítims (article 6.1.f): mantenir el servei segur, aturar els intents d’endevinar contrasenyes, els registres falsos i els abusos, controlar els costos, corregir errors i revisar les escenes denunciades perquè el narrador compleixi les nostres normes de contingut. T’hi pots oposar quan aquesta sigui la base.",
          "Obligacions legals (article 6.1.c): els registres comptables i fiscals quan hi hagi compres, atendre peticions legítimes de les autoritats i gestionar els teus drets de protecció de dades.",
          "Consentiment (article 6.1.a), només quan l’app te’l demana a part, com el permís del micròfon. El pots retirar quan vulguis, sense que afecti el que s’ha fet abans.",
        ],
        notes: [
          "No venem dades personals, no mostrem anuncis, no fem servir rastrejadors publicitaris ni entrenem models d’IA amb les teves històries. La IA escriu ficció per a la teva història; no pren decisions sobre tu amb efectes jurídics o d’importància similar.",
        ],
      },
      {
        id: "ai",
        title: "4. La IA, la teva veu i la lectura en veu alta",
        paragraphs: [
          "Lucid Saga l’escriu una IA. A cada torn, el nostre servidor envia als models Gemini de Google, a Vertex AI de Google Cloud, el que la història necessita per continuar: la història fins ara, el seu món i els seus personatges, la teva acció i la teva configuració de contingut. El mateix servei dibuixa les imatges dels moments clau. La part de les instruccions d’una història que no canvia d’un torn a l’altre es pot desar en una memòria cau de Vertex AI fins a 15 minuts després del teu últim torn, perquè costi menys.",
          "Dictat: per defecte, l’app grava mentre el micròfon està actiu i envia la gravació al nostre servidor, que fa que Gemini la transcrigui atent als noms que el teu personatge coneix en aquella història. La gravació només es fa servir per a aquella petició: no la desem ni la registrem, i només en conservem la durada i el cost al teu historial de crèdits. Si tries Aquest dispositiu a Compte, a Dictat, el reconeixement de veu del teu propi mòbil la transcriu i l’àudio no arriba mai als nostres servidors, tot i que els reconeixedors d’Android i d’Apple poden fer servir els servidors dels seus fabricants quan el mòbil no ho pot fer sol.",
          "Lectura en veu alta: per defecte, la veu d’estudi envia el text de l’escena a Gemini, que la llegeix en veu alta, i desem l’àudio amb la teva història. Si tries la veu del teu dispositiu, la llegeix el teu mòbil i res no arriba als nostres servidors.",
          "Segons les condicions de Google Cloud, Google no fa servir el que enviem a Vertex AI per entrenar els seus models sense el nostre permís. Google pot conservar algunes dades durant un temps limitat per a la memòria cau, la seguretat i la detecció d’abusos, i les pot tractar fora de la UE. No prometem retenció zero ni tractament només a la UE.",
          "La teva pròpia clau d’API: si afegeixes a l’app la teva pròpia clau de l’API de Gemini, els teus torns van a l’API de Gemini de Google amb el teu propi compte i sota les condicions de Google per a aquesta API, i en el seu nivell gratuït Google pot fer servir el que envies per millorar els seus productes. La clau es queda al teu dispositiu i només s’envia amb les peticions que la necessiten; el nostre servidor no la desa ni la registra mai. El dictat i la veu d’estudi continuen funcionant amb el nostre compte.",
          "Les històries són ficció. No posis en una història dades privades de persones reals, historials mèdics, contrasenyes ni altra informació delicada.",
        ],
        links: [
          {
            label: "Condicions de servei de Google Cloud, inclòs Vertex AI",
            href: "https://cloud.google.com/terms/service-terms",
          },
          {
            label: "Condicions de tractament de dades de Google Cloud",
            href: "https://cloud.google.com/terms/data-processing-addendum",
          },
        ],
      },
      {
        id: "sharing",
        title: "5. Qui veu les teves dades",
        paragraphs: [
          "Les teves històries són privades del teu compte: Lucid Saga no permet compartir-les en públic. Al nostre equip, només el propietari i qui gestiona les denúncies poden llegir el text d’una història, i el llegeixen per revisar denúncies. Qui ajuda amb comptes i crèdits veu el títol, la classificació i les xifres d’una història, mai el que hi ha escrit.",
          "Els nostres proveïdors reben el que necessiten per a la seva funció, com a encarregats del tractament segons les nostres instruccions o, per a les seves pròpies obligacions legals, de seguretat o de pagament, com a responsables independents amb els seus propis avisos.",
        ],
        bullets: [
          "Google Cloud (Cloud Run, Cloud Storage, Cloud Logging, Secret Manager): executa el servidor del joc i aquest lloc web, desa les imatges i l’àudio, i conserva els registres. El servidor del joc i el seu emmagatzematge són a Frankfurt (Alemanya), i aquest lloc web a Bèlgica.",
          "Vertex AI de Google Cloud (Gemini): escriu les històries, dibuixa les imatges, transcriu el dictat en línia i llegeix les escenes amb la veu d’estudi.",
          "Neon: allotja la base de dades de comptes i històries, a Frankfurt (Alemanya).",
          "Inici de sessió amb Google: confirma qui ets quan hi entres amb Google.",
          "Google Workspace (Gmail): rep i respon els correus que ens envies, amb el que decideixis enviar.",
          "Google Play: distribueix l’app i, quan hi hagi compres, cobra els pagaments. No rebem mai les dades completes de la teva targeta.",
          "Assessors professionals o autoritats, només quan ho exigeixi una obligació legal o una reclamació.",
        ],
        links: [
          { label: "Avís de privadesa de Neon", href: "https://neon.com/privacy-policy" },
          { label: "Política de privadesa de Google", href: "https://policies.google.com/privacy" },
        ],
      },
      {
        id: "transfers",
        title: "6. Tractament fora de la UE",
        paragraphs: [
          "La nostra base de dades i els nostres servidors són a la UE, però part del tractament es pot fer en altres llocs: Vertex AI funciona al punt d’accés global de Google, i els equips de suport i seguretat dels nostres proveïdors poden treballar des de fora de l’Espai Econòmic Europeu.",
          `Aquestes transferències segueixen el capítol V del RGPD: una decisió d’adequació de la Comissió Europea, com el Marc de Privadesa de Dades UE-EUA per als destinataris adherits, o les clàusules contractuals tipus de la Comissió amb les mesures que calguin. Escriu a ${supportEmail} per saber quin mecanisme s’aplica a les teves dades i obtenir-ne una còpia de les garanties.`,
        ],
      },
      {
        id: "retention",
        title: "7. Quant de temps les conservem",
        bullets: [
          "El teu compte, històries, imatges, àudio i crèdits: mentre els conservis. Eliminar una història n’elimina les escenes, les imatges i l’àudio. Eliminar el teu compte elimina tot el que conté, a l’instant.",
          "Denúncies: fins que eliminis la història denunciada o el teu compte.",
          "Gravacions de dictat: no es desen. Cadascuna es fa servir per a la seva única petició.",
          "Registres: 30 dies. Els recomptes de protecció de l’accés caduquen sols al cap de poc temps.",
          "Els teus correus: mentre gestionem la teva petició i, si cal, mentre s’hi pugui presentar una reclamació o acció legal.",
          "Compres, quan n’hi hagi: els registres que exigeix la llei, com sis anys per als llibres mercantils a Espanya i en general quatre per als fiscals, amb accés restringit.",
        ],
        notes: [
          "L’historial de restauració de la nostra base de dades conserva les dades eliminades durant el període de restauració del nostre proveïdor, i després desapareixen; les còpies de seguretat no es modifiquen quan elimines alguna cosa. Les còpies que vas exportar tu les has d’esborrar tu. Ens pots preguntar quins terminis s’apliquen a les teves dades.",
        ],
      },
      {
        id: "website",
        title: "8. Aquest lloc web i les galetes",
        paragraphs: [
          "Aquest lloc web no té comptes, analítica, publicitat ni seguiment. S’obre en l’idioma del teu navegador quan és català, castellà o anglès, i en anglès en els altres casos; no fa servir mai la teva ubicació per a això.",
          "Si tries un idioma al selector, una galeta anomenada lang el recorda fins a un any, perquè el lloc s’obri en aquest idioma la propera vegada. És una preferència que demanes tu i no es fa servir per a res més. La pots esborrar al teu navegador quan vulguis.",
          "El nostre allotjament conserva durant 30 dies registres de les peticions, amb l’hora, la pàgina, el teu navegador i la teva adreça de xarxa, perquè el lloc funcioni i sigui segur.",
        ],
      },
      {
        id: "security",
        title: "9. Permisos i seguretat",
        paragraphs: [
          "L’app demana el micròfon la primera vegada que el toques i només escolta mentre mostra que està escoltant; escriure sempre funciona. Pots canviar els permisos a la configuració del teu mòbil.",
          "Tot el trànsit va xifrat. Les contrasenyes es desen només com a hash amb sal i els testimonis de sessió com a hash d’un sol sentit, les nostres claus són a Google Secret Manager, tancar la sessió en un dispositiu l’acaba a l’instant i els intents repetits amb una contrasenya incorrecta s’alenteixen. Lucid Saga no té xifratge d’extrem a extrem: els nostres servidors i proveïdors tracten les teves històries per poder escriure-les.",
        ],
      },
      {
        id: "rights",
        title: "10. Els teus drets",
        paragraphs: [
          "A l’app pots descarregar tot el que tenim sobre tu (Compte → Privadesa i dades → Exporta les meves dades), eliminar el teu compte i tot el que conté (Compte → Privadesa i dades → Elimina el compte), i corregir el teu nom i les teves preferències a Compte.",
          "També ens pots demanar l’accés, la rectificació, la supressió, la limitació o la portabilitat de les teves dades, i oposar-te al tractament basat en els nostres interessos legítims. Quan ens basem en el teu consentiment, el pots retirar.",
          `Escriu a ${supportEmail} indicant el compte i el dret. Comprovem de manera proporcionada que el compte és teu, i no et demanem mai la contrasenya ni el número de targeta. Responem en el termini d’un mes; si la petició és complexa o n’hi ha moltes, podem trigar fins a dos mesos més, i et direm el motiu dins del primer. Les peticions són gratuïtes.`,
          "Pots reclamar davant de l’Agència Espanyola de Protecció de Dades (AEPD), o davant de l’autoritat del lloc on vius, sense haver de contactar-nos abans.",
        ],
        contact: "privacy",
        links: [
          { label: "Elimina el teu compte", href: "/delete-account" },
          {
            label: "AEPD: els teus drets i com reclamar",
            href: "https://www.aepd.es/derechos-y-deberes/conoce-tus-derechos",
          },
        ],
      },
      {
        id: "age-changes",
        title: "11. Edat i canvis",
        paragraphs: [
          [
            `Has de tenir com a mínim ${minimumAge} anys per registrar-te, i l’app et demana la data de naixement.`,
            ...teenOnly,
            `Si sabem que s’ha registrat algú de menys de ${minimumAge} anys, n’eliminem el compte. Si creus que una persona més jove en té un, escriu-nos.`,
          ].join(" "),
          "Actualitzarem aquesta política quan canviïn el joc o l’ús que fa de les dades, mostrarem la data en què entra en vigor cada versió i t’avisarem a l’app abans que entri en vigor un canvi important.",
        ],
      },
    ],
  },
  terms: {
    title: "Termes i condicions de Lucid Saga",
    description:
      "Les condicions per jugar a Lucid Saga: el teu compte, les teves històries, les normes de contingut, els crèdits i les compres.",
    summary: [
      "Lucid Saga escriu ficció interactiva amb IA; tu decideixes què fa el teu personatge.",
      "El que escrius continua sent teu, i pots exportar les teves històries.",
      "Els teus drets com a consumidor s’apliquen sempre.",
    ],
    sections: [
      {
        id: "operator",
        title: "1. Lucid Saga i aquestes condicions",
        company: true,
        paragraphs: [
          "Aquestes condicions són l’acord entre GARBAR, IN-TEC, S.L. i tu, la persona que juga a Lucid Saga. Lucid Saga és el nom del nostre producte, no una empresa diferent. La política de privadesa explica com fem servir les dades personals.",
          "Lucid Saga arribarà aviat a Google Play. Fins que s’hi publiqui, l’app és una versió de prova que es comparteix amb persones que la proven, i no es ven res. Les clàusules sobre compres només s’apliquen quan una compra s’ofereix i es fa de debò.",
        ],
      },
      {
        id: "account",
        title: "2. El teu compte",
        paragraphs: [
          [
            `Has de tenir com a mínim ${minimumAge} anys per registrar-te i donar la teva data de naixement real: decideix quines històries pots rebre.`,
            ...teenOnly,
          ].join(" "),
          "Guarda bé les teves dades d’accés i avisa’ns si creus que una altra persona ha fet servir el teu compte. No comparteixis un compte, no et facis passar per una altra persona ni obris comptes per saltar-te els límits o tornar a aconseguir els crèdits de benvinguda.",
        ],
      },
      {
        id: "game",
        title: "3. El joc",
        paragraphs: [
          "Lucid Saga és un joc d’històries sense fi: tries un món o en descrius un, actues com vulguis i un narrador amb IA escriu què passa després, dibuixa els moments clau i pot llegir les escenes en veu alta. El joc porta el compte del món, dels seus personatges i del que ha passat, perquè la història ho recordi.",
          "El narrador és una IA. El que escriu i dibuixa pot ser inesperat, incoherent o erroni, i és ficció: res d’una història és un consell ni una afirmació sobre persones o fets reals.",
          "Algunes funcions necessiten connexió a internet, un dispositiu compatible o un permís. Podem millorar o canviar el joc; avisarem amb una antelació raonable d’un canvi que afecti de debò alguna cosa que hagis pagat, juntament amb els drets que et dona la llei.",
        ],
      },
      {
        id: "rules",
        title: "4. Normes de contingut",
        paragraphs: [
          "Les històries tenen classificació Teen o Mature 17+, sense contingut sexual explícit. No facis servir Lucid Saga per crear contingut que sexualitzi menors, assetgi o difami persones reals, promogui la violència al món real o sigui il·legal d’una altra manera, ni intentis saltar-te les classificacions o les normes de seguretat.",
          "Qualsevol escena es pot denunciar o bloquejar: bloquejar-la l’amaga per a tu, i cada denúncia la revisen persones. Podem retirar contingut o restringir un compte que incompleixi aquestes normes, com explica l’apartat 9.",
          "No interfereixis amb el servei, no intentis accedir-hi sense autorització, no hi juguis mitjançant bots o scripts ni en revenguis l’accés.",
        ],
      },
      {
        id: "stories",
        title: "5. Les teves històries",
        paragraphs: [
          "El que escrius continua sent teu. Només ens dones el permís que necessitem per desar i tractar les teves històries i mostrar-te-les, mitjançant els proveïdors de la política de privadesa, i per revisar una escena que denunciïs. No publiquem les teves històries, no les fem servir en publicitat ni hi entrenem IA.",
          "Els textos i les imatges que el narrador crea per a la teva història els pots conservar, exportar i compartir per a ús personal i no comercial. El contingut creat per IA pot no estar protegit per drets d’autor, i la IA pot crear contingut semblant per a altres persones.",
          "Els mons, personatges i il·lustracions que ofereix Lucid Saga, l’app, les instruccions del narrador i la marca Lucid Saga són nostres o de qui ens els llicencia.",
        ],
      },
      {
        id: "credits",
        title: "6. Crèdits",
        paragraphs: [
          "Els torns, les imatges, el dictat en línia i la veu d’estudi costen crèdits, com mostra l’app. Un compte nou rep crèdits de benvinguda una vegada, com explica l’app. Si fas servir la teva pròpia clau de l’API de Gemini, els teus torns no costen crèdits i s’apliquen les condicions de Google per a aquesta clau.",
          "Els crèdits serveixen per pagar l’ús del joc. No tenen valor en diners, no es poden transferir ni canviar per diners, i es perden quan elimines el teu compte.",
        ],
      },
      {
        id: "purchases",
        title: "7. Compres, renovació i cancel·lació",
        paragraphs: [
          "Quan hi hagi crèdits o plans a la venda, la botiga et mostrarà abans de confirmar el preu, els impostos, el que reps i, per a un pla, com es renova. Les compres a l’app es fan amb Google Play segons les seves normes; no veiem mai les dades de la teva targeta.",
          "Un pla es renova fins que el cancel·lis al compte de Google Play amb què el vas comprar. Cancel·lar-lo atura la renovació següent i manté el que ja has pagat. Eliminar l’app o el teu compte de Lucid Saga no cancel·la una subscripció de Google Play.",
          "T’avisarem abans de canviar el preu d’un pla que ja tens, com exigeixen la llei i la botiga, amb la possibilitat de cancel·lar-lo.",
        ],
      },
      {
        id: "withdrawal",
        title: "8. Desistiment, reemborsaments i errors",
        paragraphs: [
          "Com a consumidor a la UE, en general tens 14 dies per desistir d’un contracte a distància sense donar cap motiu. Per a crèdits o un pla que comencen a l’instant, la botiga et pot demanar que acceptis que comencin dins d’aquests 14 dies i que reconeguis que llavors perds el dret de desistiment; només si ho fas, i només pel que ja s’ha subministrat, es perd aquest dret.",
          "Per desistir, envia’ns una declaració clara o fes servir la sol·licitud de reemborsament de Google Play. Indica el compte, la data de compra i el número de comanda, mai les dades de la teva targeta. Pots fer servir aquest model, però no és obligatori: «A GARBAR, IN-TEC, S.L., a l’adreça que figura en aquesta pàgina. Desisteixo del meu contracte de [crèdits o pla] comprat el [data]. Compte i número de comanda: […]. Nom i adreça: […]. Data: […].»",
          "Els reemborsaments d’un desistiment vàlid es fan en un termini de 14 dies des del teu avís, pel mateix mitjà de pagament. Si el joc no funciona com es va prometre, tens els drets que et donen les lleis espanyoles i europees: que s’arregli, una rebaixa del preu o resoldre el contracte amb reemborsament.",
        ],
        contact: "withdrawal",
      },
      {
        id: "ending",
        title: "9. Baixa, suspensió i tancament",
        paragraphs: [
          "Pots eliminar el teu compte quan vulguis des de l’app (Compte → Privadesa i dades → Elimina el compte), o per correu sense l’app. Exporta abans les teves històries si les vols conservar. Eliminar el teu compte no cancel·la una subscripció de Google Play, i no cal cancel·lar-la abans.",
          "Podem restringir o tancar un compte, de manera proporcionada, per un incompliment greu d’aquestes condicions, frau, activitat il·legal o una amenaça per a la seguretat. Quan sigui possible, et direm el motiu i com respondre; les mesures de seguretat urgents es poden aplicar a l’instant.",
          "Si algun dia tanquem Lucid Saga, avisarem amb una antelació raonable, et donarem la possibilitat d’exportar les teves històries i el reemborsament que exigeixi la llei pel que hagis pagat i no hagis fet servir.",
        ],
        links: [
          { label: "Elimina el teu compte", href: "/delete-account" },
          { label: "Els teus drets de privadesa", href: "/privacy#rights" },
        ],
      },
      {
        id: "liability",
        title: "10. Responsabilitat",
        paragraphs: [
          "Responem com exigeix la llei. Res d’aquestes condicions limita una responsabilitat que la llei no ens permet limitar, com la derivada de frau, dol o danys personals, ni els teus drets irrenunciables com a consumidor o en protecció de dades.",
        ],
      },
      {
        id: "law",
        title: "11. Contacte, llei aplicable i canvis",
        paragraphs: [
          `Escriu a ${supportEmail} amb els teus dubtes o reclamacions. Et confirmarem que hem rebut una reclamació i la respondrem en el termini d’un mes. També pots adreçar-te a l’autoritat de consum o a un organisme de resolució de conflictes competent.`,
          "S’aplica la llei espanyola, sense treure’t la protecció que et dona la llei del país on vius. Pots presentar una reclamació davant dels tribunals que permeti la llei, inclosos els del teu domicili.",
          "Mostrarem la data de cada versió nova i t’avisarem a l’app abans que entri en vigor un canvi important. Un canvi no afecta mai una compra ja feta. Les versions en anglès, castellà i català diuen el mateix; una diferència entre elles no es farà servir en contra teu.",
        ],
        contact: "privacy",
      },
    ],
  },
  legal: {
    title: "Avís legal",
    description: "Qui gestiona Lucid Saga i aquest lloc web: GARBAR, IN-TEC, S.L.",
    summary: [
      "Lucid Saga és el nom del producte.",
      "El gestiona GARBAR, IN-TEC, S.L.",
      `Escriu-nos a ${generalEmail}.`,
    ],
    sections: [
      {
        id: "operator",
        title: "1. Titular",
        company: true,
        paragraphs: [
          "GARBAR, IN-TEC, S.L., identificada a dalt, és la titular d’aquest lloc web i del servei Lucid Saga. Aquest avís ofereix la informació que exigeix la Llei 34/2002, de serveis de la societat de la informació i de comerç electrònic (LSSI).",
          `Per a consultes generals, escriu a ${generalEmail}. Per a ajuda amb l’app, reclamacions, privadesa o eliminar un compte, escriu a ${supportEmail}. També pots escriure al domicili social indicat a dalt.`,
        ],
        contact: "privacy",
      },
      {
        id: "website",
        title: "2. Aquest lloc web",
        paragraphs: [
          "Aquest lloc presenta Lucid Saga, que arribarà aviat a Google Play. No ven res: el que ofereix l’app, i a quin preu, és només el que mostren la seva fitxa a la botiga i la mateixa app.",
          "Els termes i condicions regulen l’ús de Lucid Saga, i la política de privadesa explica com fem servir les dades personals, inclosa l’única galeta d’aquest lloc. Escriu-nos per avisar de contingut il·lícit, un problema de seguretat o un error en aquest lloc.",
        ],
      },
      {
        id: "rights",
        title: "3. Propietat intel·lectual i enllaços",
        paragraphs: [
          "Els textos, les imatges i el programari del lloc, i el nom i el logotip de Lucid Saga, pertanyen a GARBAR, IN-TEC, S.L. o a qui els hi llicencia. Pots navegar pel lloc i compartir-ne enllaços, però no copiar-ne el contingut per a altres usos ni donar a entendre que donem suport a una cosa que no el té.",
          "Google Play és una marca de Google LLC. Els enllaços a altres llocs porten als serveis dels seus titulars, amb les seves pròpies condicions.",
        ],
      },
    ],
  },
  "delete-account": {
    title: "Elimina el teu compte de Lucid Saga",
    description: "Elimina el teu compte des de l’app, o demana’ns-ho per correu sense l’app.",
    summary: [
      "S’elimina: el teu compte, cada història amb les seves escenes, imatges i àudio, els teus crèdits i les teves sessions.",
      "Des de l’app es fa a l’instant, i no es pot desfer.",
      "Eliminar el teu compte no cancel·la una subscripció de Google Play.",
    ],
    sections: [
      {
        id: "in-app",
        title: "1. Des de l’app",
        paragraphs: [
          "Obre Compte → Privadesa i dades → Elimina el compte. L’app et mostra el que s’eliminarà. Escriu la paraula que et demana per confirmar i toca Elimina el meu compte. Necessites connexió a internet.",
          "Si abans en vols una còpia, toca Exporta les meves dades a la mateixa pantalla: desa el teu compte, les teves històries i les teves imatges en un fitxer.",
          "Quan el nostre servidor ho confirma, l’app tanca la teva sessió i et diu que el teu compte s’ha eliminat. Si mostra un error, no donis per fet que ha funcionat: torna-ho a provar o escriu-nos.",
        ],
      },
      {
        id: "request",
        title: "2. Per correu, sense l’app",
        paragraphs: [
          `Escriu a ${supportEmail}, si pots des del correu del teu compte, i indica quin compte vols eliminar. Fes servir aquesta via si has desinstal·lat l’app, no hi pots entrar o necessites ajuda. No has de donar cap motiu, comprar res ni cancel·lar abans cap subscripció.`,
          "Si ja no tens accés al correu del compte, digues-nos-ho i comprovarem de manera proporcionada que el compte és teu. No enviïs mai la teva contrasenya ni el número de la teva targeta.",
          "El botó de sota obre un correu perquè el revisis i l’enviïs; aquesta pàgina no elimina res per si sola.",
        ],
        contact: "deletion",
      },
      {
        id: "scope",
        title: "3. Què s’elimina i què es queda",
        bullets: [
          "S’elimina: el teu compte, cada història amb les seves escenes, imatges i l’àudio de les escenes llegides en veu alta, les teves denúncies, els teus crèdits, inclosos els que et quedin, i la teva sessió a tots els dispositius.",
          "L’app no elimina: els nostres registres, que contenen identificadors de compte i d’història però mai el text d’una història, i caduquen als 30 dies; l’historial de restauració de la base de dades, que caduca sol; els teus correus amb nosaltres; el registre propi de Google Play de qualsevol compra; i les còpies que hagis exportat. Demana’ns que eliminem el que es pugui eliminar, i et direm què s’ha de quedar, per què i durant quant de temps.",
          "El teu compte de Google no es veu afectat.",
        ],
      },
      {
        id: "timing",
        title: "4. Quan",
        paragraphs: [
          "Des de l’app, el teu compte s’elimina tan bon punt confirmes.",
          "Si ens ho demanes per correu, responem en el termini d’un mes, eliminem el que correspongui sense dilacions indegudes i t’ho confirmem. Si alguna cosa s’ha de quedar per un motiu legal, t’expliquem què, per què i durant quant de temps.",
        ],
        links: [{ label: "Quant de temps conservem les dades", href: "/privacy#retention" }],
      },
      {
        id: "subscription",
        title: "5. Subscripcions i el teu mòbil",
        paragraphs: [
          "Eliminar el teu compte no cancel·la una subscripció de Google Play: cancel·la-la a Google Play. No cal cancel·lar-la abans de demanar-nos que eliminem el teu compte.",
          "Després d’eliminar el teu compte, desinstal·la l’app per treure-la del teu mòbil. Desinstal·lar-la sense més no elimina el teu compte.",
        ],
        links: [
          {
            label: "Gestiona les subscripcions de Google Play",
            href: "https://support.google.com/googleplay/answer/7018481?hl=ca",
          },
        ],
      },
    ],
  },
};
