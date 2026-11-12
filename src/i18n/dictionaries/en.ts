/**
 * The site's words in English. es.ts and ca.ts have the same shape (Dictionary), which the type
 * checker holds them to. Phrases the app already uses keep the app's wording (PlayableAnime
 * app/lib/l10n), so the site and the app speak alike.
 */
export const en = {
  meta: {
    title: "Lucid Saga · The story that remembers",
    description:
      "An endless AI story game. Pick a world or dream up your own, act however you like, and the storyteller writes what happens next, with pictures and a narrator's voice. Coming soon to Google Play.",
    ogAlt: "Lucid Saga: a hooded traveller walks through a glowing gate. Coming soon to Google Play.",
  },
  nav: {
    how: "How it plays",
    features: "Features",
    worlds: "Worlds",
    skip: "Skip to content",
    home: "Lucid Saga, home",
    language: "Language",
  },
  badge: {
    soon: "Coming soon to",
    store: "Google Play",
    label: "Coming soon to Google Play",
  },
  hero: {
    eyebrow: "An AI story game",
    titleA: "Step through.",
    titleB: "The story never ends.",
    lead: "An endless story that remembers everything you do.",
    body: "Pick a world, or dream up your own in one line. Type, tap or say what you do, and the storyteller writes what happens next, draws the moments that matter and reads them aloud.",
    secondary: "See how it plays",
    artAlt: "A hooded traveller walks through a glowing golden gate in a dark forest.",
  },
  demo: {
    label: "A scene from The Last Outer Disciple, as it plays in the app",
    story: "The Last Outer Disciple",
    time: "+2 min · Day 1, dusk",
    event: "Local event",
    eventText: "The grey mage reaches the well",
    pictureAlt:
      "A young disciple, one palm raised, holds off a grey mage with a crackling staff beside a stone well at dusk.",
    scene1:
      "The grey mage crosses the flagstones without a sound. Pale lightning crawls along his staff, and the last red light of dusk catches in his eyes.",
    action: "I raise my palm and turn his staff toward the well",
    scene2:
      "Your qi answers late, but it answers. The staff glances off your palm and strikes the stone lip of the well, and the lightning has nowhere to go but into the water. Steam bursts up between you. When it clears, he is smiling.",
    choices: ["Run for the outer gate", "Ask who sent him", "Wait and watch"],
    composer: "What do you do?",
    readAloud: "Read aloud",
    discover: "Discover",
    discoverHeadline: "Pick a world, or dream up your own.",
    createTitle: "Start from your own idea",
    createBody: "One line is enough to build a world.",
    library: "Library",
    account: "Account",
    memoryAll: "All",
    memoryPeople: "People",
    memoryDeeds: "Deeds",
    hostile: "Hostile",
    memoryPlaces: "Places",
    place: { name: "The stone well", note: "Steam still rises from it." },
    deeds: [
      {
        text: "You turned his lightning into the well",
        when: "Day 1, dusk",
        known: "The grey mage saw it",
      },
      {
        text: "You stole the forbidden scroll",
        when: "Day 1, dawn",
        known: "No one saw, as far as you know",
      },
    ],
  },
  how: {
    eyebrow: "How it plays",
    title: "You choose what happens. The world answers.",
    steps: [
      {
        title: "Pick a world, or dream up your own",
        body: "Start from one of 23 worlds, or type a premise. The storyteller drafts the world and your character, and you change anything you like before you begin.",
      },
      {
        title: "Do anything",
        body: "Tap a suggested choice, type what you do, or say it out loud. Wait and watch, or act. There are no wrong moves, only consequences.",
      },
      {
        title: "Watch it play out",
        body: "The narration appears as it's written, step by step from where the last scene ended. Key moments get a picture, and any scene can be read aloud.",
      },
      {
        title: "The world remembers",
        body: "Every person, place, wound and promise is kept by the story engine. The dead stay dead, and every deed leaves a mark.",
      },
    ],
  },
  features: {
    eyebrow: "What makes it different",
    title: "A storyteller with a memory",
    pictures: {
      title: "Pictures at the moments that matter",
      body: "A duel at dusk, a deal in a back booth: the storyteller draws the scenes that count, in one cinematic style. Each character keeps the same face from scene to scene.",
      alt: "A young man leans across a bar table at an older man in a smoky back booth.",
    },
    voice: {
      title: "Every scene, read aloud",
      body: "Press play and a studio voice reads the scene in the story's own language and accent: Spanish from Spain, Catalan, or English in a native voice. Four voices to choose from, or let your phone read it for free.",
    },
    languages: {
      title: "Play in your language",
      body: "The whole app and every story, from the first line, in English, Spanish or Catalan. A story stays in the language you started it in.",
    },
    logic: {
      title: "Logic first, luck second",
      body: "Outcomes follow cause and effect. A clever plan can beat a stronger foe, and dice decide only what the facts leave open.",
      card: "How it played out",
      lines: [
        "The staff struck stone, not you",
        "The water carried the lightning away",
        "A roll for the steam: it hid your retreat",
      ],
    },
    world: {
      title: "A world that moves without you",
      body: "Time passes in minutes and days, not turns. Rivals scheme, news spreads and storms arrive whether you're there or not.",
      time: "+6 min · Day 1, dawn",
      event: "Local event",
      eventText: "The library alarm wakes the sect",
    },
    memory: {
      title: "It remembers everything",
      body: "The story engine keeps the facts, so nothing rests on the AI's memory. Open Memory to see what your character knows, in the world's own words.",
      label: "Memory",
      sublabel: "What you know, in the world's words.",
      items: [
        { name: "Elder Mo", note: "Dead. Killed at the ranking tournament." },
        { name: "The grey mage", note: "Hunting you. Knows about the scroll." },
        { name: "The forbidden scroll", note: "Hidden in your robe." },
      ],
    },
    dictation: {
      title: "Say it out loud",
      body: "Speak your move. Dictation knows the names in your story, and you check the words before you send them.",
      sample: "I bow to Senior Brother Zhou",
    },
  },
  worlds: {
    eyebrow: "Worlds",
    title: "Twenty-three worlds to begin with",
    body: "Cultivation sects and knights with aura, a crime family in 1974 Naples, a pirate ship won at cards. Every world keeps its own rules.",
    signature: "Signature worlds",
    signatureBadge: "Signature",
    more: "More worlds",
    ownTitle: "Or start from your own idea",
    ownBody: "One line is enough. The storyteller builds the world around it.",
    ownExample: "A lighthouse keeper finds a door in the sea that wasn't there yesterday.",
    ownAlt: "A glowing castle rises out of an open book.",
    ownAction: "Draft the world",
  },
  final: {
    title: "The gate opens soon",
    body: "Lucid Saga is coming to Google Play, on Android first.",
    rating: "Stories are rated Teen or Mature 17+.",
  },
  footer: {
    tagline: "An endless story that remembers everything you do.",
    rights: "© 2026 GARBAR, IN-TEC, S.L.",
    trademark: "Google Play is a trademark of Google LLC.",
    languages: "Languages",
    legal: "Legal",
    support: "Support",
    sections: "On this site",
    maker: "A product by",
    backToTop: "Back to top",
  },
  legal: {
    back: "Back to Lucid Saga",
    documents: "Legal documents",
    contents: "On this page",
    summary: "At a glance",
    inForce: "In force since",
    operator: "Operator",
    taxId: "Tax number (NIF)",
    address: "Registered address",
    register: "Mercantile Registry",
    registration:
      "Registered in the Barcelona Mercantile Registry, volume 49105, folio 130, sheet 607875, entry 1",
    generalContact: "General enquiries",
    supportContact: "Support, privacy and deletion",
    write: "Email support",
    deletion: "Write a deletion request",
    withdrawal: "Send a withdrawal",
    emailHelp:
      "This opens an email for you to review and send. If nothing opens, send it from your usual email to this address, with this subject.",
    recipient: "To",
    subject: "Subject",
    subjects: {
      privacy: "Lucid Saga: privacy or support request",
      deletion: "Delete my Lucid Saga account",
      withdrawal: "Lucid Saga: withdrawal",
    },
    deletionBody:
      "Hello,\n\nPlease delete my Lucid Saga account and its data.\n\nAccount email: [the email of your Lucid Saga account]\n\nPlease confirm when it’s done, and tell me about any data you must keep, why and for how long.\n\nThank you.",
    titles: {
      privacy: "Privacy Policy",
      terms: "Terms and Conditions",
      legal: "Legal notice",
      "delete-account": "Delete account",
    },
  },
  notFound: {
    title: "This path leads nowhere",
    body: "The page you were looking for isn't here. The gate is still open.",
    back: "Back to the gate",
  },
};

export type Dictionary = typeof en;
