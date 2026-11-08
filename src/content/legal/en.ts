import { company } from "./company";
import type { LegalCopy } from "./types";

const { generalEmail, supportEmail, minimumAge, teenOnlyUnder } = company;
// With a minimum age of 17 or more, every player can get every rating, and the Teen-only rule goes.
const teenOnly = minimumAge < teenOnlyUnder ? [`Players under ${teenOnlyUnder} get only Teen stories.`] : [];

export const en: LegalCopy = {
  privacy: {
    title: "Lucid Saga Privacy Policy",
    description:
      "How Lucid Saga uses your account, your stories, your voice and the pictures made for them, and the choices you have.",
    summary: [
      "We don’t sell your data, show you ads or use your stories to train AI.",
      "Your story goes to Google’s AI to write what happens next, draw its pictures and read it aloud. Your voice goes there only when you dictate online.",
      "You can download everything or delete your account in the app, whenever you want.",
    ],
    sections: [
      {
        id: "controller",
        title: "1. Who is responsible",
        company: true,
        paragraphs: [
          "GARBAR, IN-TEC, S.L. operates Lucid Saga and is the controller of the personal data described here. Lucid Saga is the product’s name, not a separate company. This policy covers the Lucid Saga app, its account and game servers, and this website.",
          "This policy explains how we use data; it doesn’t ask for blanket consent. Where a feature needs a permission or your consent, the app asks at the time.",
          `Write to ${generalEmail} for general enquiries, and to ${supportEmail} for support, privacy requests and account deletion. Both reach our company mailbox. You don’t need a particular form or subject to exercise your rights.`,
        ],
        contact: "privacy",
      },
      {
        id: "data",
        title: "2. What we collect",
        bullets: [
          "Account: your email address, a display name, your birth date, and either a password, stored only as a salted hash that can’t be read back, or your Google account’s identifier when you sign in with Google. We never receive your Google password.",
          "Story settings: the content preferences you choose (gore level, romance and dark themes on or off), your dictation and reading-aloud choices, and the language of each story.",
          "Your stories: the world or premise you start from, the actions you type or dictate, the choices you pick and what the narrator writes back, with the story’s state: its characters, places and the facts its world remembers.",
          "Pictures and audio: the pictures drawn for your stories, and the audio of scenes read aloud in the studio voice, kept so a scene you hear again plays at once and costs nothing.",
          "Credits: your balance, and what each turn, picture, dictation or scene read aloud cost.",
          "Signed-in devices: when each one signed in and was last used, so you stay signed in and can sign a device out.",
          "Reports: a scene you report, the reason you pick, any note you write, whether you blocked it, and what our staff decided.",
          "Technical records: request identifiers, your account and story identifiers, errors, timings, costs, your network address and app version, and, when our safety rules block a scene, its category, never the story’s text. Short-lived counts of failed sign-ins per email and per network address are kept only as one-way keys.",
          "Messages you send us, and what we need to answer them.",
        ],
      },
      {
        id: "purposes",
        title: "3. Why we use it, and our legal bases",
        bullets: [
          "To provide the game you ask for (GDPR Article 6(1)(b), contract): your account, writing your story, drawing its pictures, reading it aloud, dictation, credits, export, deletion and support. Your birth date is needed to apply the age rules.",
          "Our legitimate interests (Article 6(1)(f)): keeping the service secure, stopping password guessing, fake sign-ups and abuse, controlling costs, fixing faults, and reviewing reported scenes so the narrator keeps to our content rules. You can object where this is the basis.",
          "Legal obligations (Article 6(1)(c)): accounting and tax records once there are purchases, answering lawful requests from authorities, and handling your data-protection rights.",
          "Consent (Article 6(1)(a)), only where the app asks for it separately, such as the microphone permission. You can withdraw it at any time, without affecting what was done before.",
        ],
        notes: [
          "We don’t sell personal data, show ads, use advertising trackers or train AI models on your stories. The AI writes fiction for your story; it doesn’t make decisions about you with legal or similarly significant effects.",
        ],
      },
      {
        id: "ai",
        title: "4. The AI, your voice and reading aloud",
        paragraphs: [
          "Lucid Saga is written by AI. On each turn, our server sends Google’s Gemini models, on Google Cloud’s Vertex AI, what the story needs to go on: the story so far, its world and characters, your action and your content settings. The same service draws the pictures for key moments. The part of a story’s instructions that stays the same from turn to turn may be kept in a Vertex AI cache until 15 minutes after your last turn, so it costs less.",
          "Dictation: by default, the app records while the mic is on and sends the recording to our server, which has Gemini write it down, listening for the names your character knows in that story. The recording is used for that request only: we don’t store it or log it, and keep only its length and cost in your credit history. If you choose This device in Account, under Dictation, your phone’s own speech recognition writes it down and the audio never reaches our servers, though Android’s and Apple’s recognizers may use their makers’ servers when the phone can’t do it alone.",
          "Reading aloud: by default, the studio voice sends the scene’s text to Gemini, which reads it aloud, and we keep the audio with your story. If you choose your device’s voice, your phone reads it and nothing reaches our servers.",
          "Under Google Cloud’s terms, Google doesn’t use what we send to Vertex AI to train its models without our permission. Google may keep some data for a limited time for caching, safety and abuse monitoring, and may process it outside the EU. We don’t promise zero retention or EU-only processing.",
          "Your own API key: if you add your own Gemini API key in the app, your turns go to Google’s Gemini API under your own account and Google’s terms for it, and on its free tier Google may use what you send to improve its products. The key stays on your device and is sent only with the requests that need it; our server never stores or logs it. Dictation and the studio voice still run on our account.",
          "Stories are fiction. Don’t put real people’s private details, health records, passwords or other sensitive information into a story.",
        ],
        links: [
          {
            label: "Google Cloud service terms, including Vertex AI",
            href: "https://cloud.google.com/terms/service-terms",
          },
          {
            label: "Google Cloud data processing terms",
            href: "https://cloud.google.com/terms/data-processing-addendum",
          },
        ],
      },
      {
        id: "sharing",
        title: "5. Who sees your data",
        paragraphs: [
          "Your stories are private to your account: Lucid Saga has no public sharing. In our team, only the owner and the staff who handle reports can read a story’s text, and they read it to review reports. Staff who help with accounts and credits see a story’s title, rating and numbers, never what is written in it.",
          "Our providers receive what they need for their job, as processors under our instructions, or, for their own legal, security or payment duties, as independent controllers under their own notices.",
        ],
        bullets: [
          "Google Cloud (Cloud Run, Cloud Storage, Cloud Logging, Secret Manager): runs the game server and this website, stores pictures and audio, and keeps logs. The game server and its storage are in Frankfurt, Germany, and this website in Belgium.",
          "Google Cloud Vertex AI (Gemini): writes the stories, draws the pictures, writes down online dictation and reads scenes in the studio voice.",
          "Neon: hosts the database of accounts and stories, in Frankfurt, Germany.",
          "Google Sign-In: confirms who you are when you sign in with Google.",
          "Google Workspace (Gmail): receives and answers your emails to us, with whatever you choose to send.",
          "Google Play: distributes the app and, once purchases are offered, takes payments. We never receive your full card details.",
          "Professional advisers or authorities, only where a legal obligation or a legal claim requires it.",
        ],
        links: [
          { label: "Neon privacy notice", href: "https://neon.com/privacy-policy" },
          { label: "Google privacy notice", href: "https://policies.google.com/privacy" },
        ],
      },
      {
        id: "transfers",
        title: "6. Processing outside the EU",
        paragraphs: [
          "Our database and servers are in the EU, but some processing can happen elsewhere: Vertex AI runs on Google’s global endpoint, and our providers’ support and security teams may work from outside the European Economic Area.",
          `Such transfers follow Chapter V of the GDPR: a European Commission adequacy decision, such as the EU–US Data Privacy Framework for certified recipients, or the Commission’s Standard Contractual Clauses with any measures needed. Write to ${supportEmail} for the mechanism that applies to your data and a copy of the safeguards.`,
        ],
      },
      {
        id: "retention",
        title: "7. How long we keep it",
        bullets: [
          "Your account, stories, pictures, audio and credits: as long as you keep them. Deleting a story deletes its scenes, pictures and audio. Deleting your account deletes everything in it, at once.",
          "Reports: until you delete the reported story or your account.",
          "Dictation recordings: not kept. Each is used for its one request.",
          "Logs: 30 days. Sign-in protection counts expire on their own after a short time.",
          "Your emails to us: while we handle your request and, where needed, for as long as a complaint or legal claim about it could be brought.",
          "Purchases, once offered: the records the law requires, such as six years for Spanish commercial records and generally four for tax, with restricted access.",
        ],
        notes: [
          "Our database’s restore history keeps deleted data for our provider’s restore window, and then it’s gone; backups aren’t edited when you delete something. Copies you exported yourself are yours to remove. You can ask us which periods apply to your data.",
        ],
      },
      {
        id: "website",
        title: "8. This website and cookies",
        paragraphs: [
          "This website has no accounts, analytics, advertising or tracking. It opens in your browser’s language when that is English, Spanish or Catalan, and in English otherwise; it never uses your location for this.",
          "If you pick a language in the language switch, a cookie named lang remembers it for up to a year, so the site opens in that language next time. It’s a preference you asked for, used for nothing else. You can delete it in your browser at any time.",
          "Our hosting keeps request logs, with the time, the page, your browser and your network address, for 30 days, to keep the site running and secure.",
        ],
      },
      {
        id: "security",
        title: "9. Permissions and security",
        paragraphs: [
          "The app asks for the microphone the first time you tap the mic, and listens only while it shows it is listening; typing always works. You can change permissions in your phone’s settings.",
          "All traffic is encrypted. Passwords are stored only as salted hashes and sign-in tokens as one-way hashes, our own keys live in Google Secret Manager, signing out ends a device’s sign-in at once, and repeated wrong passwords are slowed down. Lucid Saga isn’t end-to-end encrypted: our servers and providers process your stories in order to write them.",
        ],
      },
      {
        id: "rights",
        title: "10. Your rights",
        paragraphs: [
          "In the app you can download everything we hold about you (Account → Privacy and data → Export my data), delete your account and everything in it (Account → Privacy and data → Delete account), and correct your name and preferences in Account.",
          "You can also ask us for access, correction, erasure, restriction or portability of your data, and object to processing based on our legitimate interests. Where we rely on your consent, you can withdraw it.",
          `Write to ${supportEmail} saying which account and which right. We check that the account is yours in a proportionate way, and never ask for your password or card number. We answer within one month; for complex or numerous requests we may take up to two more months, and we’ll tell you why within the first. Requests are free.`,
          "You can complain to the Spanish Data Protection Agency (AEPD), or the authority where you live, without contacting us first.",
        ],
        contact: "privacy",
        links: [
          { label: "Delete your account", href: "/delete-account" },
          {
            label: "AEPD: your rights and how to complain",
            href: "https://www.aepd.es/derechos-y-deberes/conoce-tus-derechos",
          },
        ],
      },
      {
        id: "age-changes",
        title: "11. Age and changes",
        paragraphs: [
          [
            `You must be ${minimumAge} or older to sign up, and the app asks your birth date.`,
            ...teenOnly,
            `If we learn that someone under ${minimumAge} has signed up, we delete the account. If you think a younger person has one, write to us.`,
          ].join(" "),
          "We’ll update this policy when the game or its use of data changes, show the date each version takes effect, and tell you in the app before a change that matters takes effect.",
        ],
      },
    ],
  },
  terms: {
    title: "Lucid Saga Terms and Conditions",
    description:
      "The terms for playing Lucid Saga: your account, your stories, the content rules, credits and purchases.",
    summary: [
      "Lucid Saga writes interactive fiction with AI; you decide what your character does.",
      "What you write stays yours, and you can export your stories.",
      "Your rights as a consumer always apply.",
    ],
    sections: [
      {
        id: "operator",
        title: "1. Lucid Saga and these terms",
        company: true,
        paragraphs: [
          "These terms are the agreement between GARBAR, IN-TEC, S.L. and you, the person who plays Lucid Saga. Lucid Saga is our product’s name, not a separate company. The Privacy Policy explains how we use personal data.",
          "Lucid Saga is coming soon to Google Play. Until it is listed there, the app is a test version shared with testers, and nothing is sold. The clauses about purchases apply only once a purchase is actually offered and made.",
        ],
      },
      {
        id: "account",
        title: "2. Your account",
        paragraphs: [
          [
            `You must be ${minimumAge} or older to sign up, and give your real birth date: it decides which stories you can get.`,
            ...teenOnly,
          ].join(" "),
          "Keep your sign-in details safe, and tell us if you think someone else used your account. Don’t share an account, pretend to be someone else, or open accounts to get around limits or collect starter credits again.",
        ],
      },
      {
        id: "game",
        title: "3. The game",
        paragraphs: [
          "Lucid Saga is an endless story game: you pick a world or describe one, act as you like, and an AI narrator writes what happens next, draws key moments and can read scenes aloud. The game keeps track of the world, its characters and what happened, so the story remembers.",
          "The narrator is AI. What it writes and draws can be unexpected, inconsistent or wrong, and it is fiction: nothing in a story is advice, or a statement of fact about real people or events.",
          "Some features need an internet connection, a compatible device or a permission. We may improve or change the game; we’ll give reasonable notice of a change that matters to something you paid for, together with the rights the law gives you.",
        ],
      },
      {
        id: "rules",
        title: "4. Content rules",
        paragraphs: [
          "Stories are rated Teen or Mature 17+, with no explicit sexual content. Don’t use Lucid Saga to create content that sexualises minors, harasses or defames real people, promotes real-world violence, or is otherwise unlawful, and don’t try to get around the ratings or the safety rules.",
          "Every scene can be reported or blocked: blocking hides it for you, and people review each report. We may remove content, or restrict an account that breaks these rules, as section 9 explains.",
          "Don’t interfere with the service, try to get unauthorised access, play through bots or scripts, or resell access.",
        ],
      },
      {
        id: "stories",
        title: "5. Your stories",
        paragraphs: [
          "What you write stays yours. You give us only the permission we need to store and process your stories and show them to you, through the providers in the Privacy Policy, and to review a scene you report. We don’t publish your stories, use them in advertising or train AI on them.",
          "The text and pictures the narrator makes for your story are yours to keep, export and share for personal, non-commercial use. AI-made content may not be protected by copyright, and the AI can make similar content for other players.",
          "The worlds, characters and art that Lucid Saga offers, the app, the narrator’s instructions and the Lucid Saga brand belong to us or our licensors.",
        ],
      },
      {
        id: "credits",
        title: "6. Credits",
        paragraphs: [
          "Turns, pictures, online dictation and the studio voice cost credits, as the app shows. A new account gets starter credits once, as the app explains. If you use your own Gemini API key, your turns cost no credits, and Google’s terms for that key apply.",
          "Credits pay for using the game. They have no cash value, can’t be transferred or exchanged for money, and end when you delete your account.",
        ],
      },
      {
        id: "purchases",
        title: "7. Purchases, renewal and cancellation",
        paragraphs: [
          "When credits or plans go on sale, the store will show the price, taxes, what you get and, for a plan, how it renews, before you confirm. Purchases in the app go through Google Play under its rules; we never see your card details.",
          "A plan renews until you cancel it in the Google Play account you bought it with. Cancelling stops the next renewal and keeps what you already paid for. Deleting the app or your Lucid Saga account doesn’t cancel a Google Play subscription.",
          "We’ll tell you before a price change for an existing plan, as the law and the store require, with the chance to cancel.",
        ],
      },
      {
        id: "withdrawal",
        title: "8. Withdrawal, refunds and faults",
        paragraphs: [
          "As a consumer in the EU, you generally have 14 days to withdraw from a distance contract without giving a reason. For credits or a plan that starts at once, the store may ask you to agree that it starts within those 14 days and to acknowledge that you then lose the right to withdraw; only if you do, and only for what has been supplied, does that right end.",
          "To withdraw, send us a clear statement, or use Google Play’s refund request. Include the account, the purchase date and the order number, never your card details. You may use this model, but you don’t have to: “To GARBAR, IN-TEC, S.L., at the address on this page. I withdraw from my contract for [credits or plan] bought on [date]. Account and order number: […]. Name and address: […]. Date: […].”",
          "Refunds for a valid withdrawal are made within 14 days of your notice, by the means you paid with. If the game doesn’t work as promised, you have the rights Spanish and EU law give you: a fix, a price reduction, or ending the contract with a refund.",
        ],
        contact: "withdrawal",
      },
      {
        id: "ending",
        title: "9. Leaving, suspension and closure",
        paragraphs: [
          "You can delete your account at any time in the app (Account → Privacy and data → Delete account), or by email without the app. Export your stories first if you want to keep them. Deleting your account doesn’t cancel a Google Play subscription, and you don’t need to cancel one first.",
          "We may restrict or close an account, in proportion, for a serious breach of these terms, fraud, unlawful activity or a security threat. Where we can, we’ll tell you why and how to respond; urgent security measures may take effect at once.",
          "If we ever close Lucid Saga, we’ll give reasonable notice, a chance to export your stories, and any refund the law requires for what you paid and haven’t used.",
        ],
        links: [
          { label: "Delete your account", href: "/delete-account" },
          { label: "Your privacy rights", href: "/privacy#rights" },
        ],
      },
      {
        id: "liability",
        title: "10. Liability",
        paragraphs: [
          "We’re responsible as the law requires. Nothing in these terms limits liability that the law doesn’t allow us to limit, such as for fraud, wilful misconduct or personal injury, or your mandatory rights as a consumer or under data protection law.",
        ],
      },
      {
        id: "law",
        title: "11. Contact, law and changes",
        paragraphs: [
          `Write to ${supportEmail} with questions or complaints. We’ll confirm that we received a complaint and answer it within one month. You can also turn to your consumer authority or a competent dispute-resolution body.`,
          "Spanish law applies, without taking away the protection the law of the country where you live gives you. You can bring a claim before the courts the law allows, including those where you live.",
          "We’ll show the date of each new version and tell you in the app before a change that matters takes effect. A change never affects a purchase already made. The English, Spanish and Catalan versions say the same; a difference between them won’t be used against you.",
        ],
        contact: "privacy",
      },
    ],
  },
  legal: {
    title: "Legal notice",
    description: "Who operates Lucid Saga and this website: GARBAR, IN-TEC, S.L.",
    summary: [
      "Lucid Saga is the product’s name.",
      "GARBAR, IN-TEC, S.L. operates it.",
      `Write to us at ${generalEmail}.`,
    ],
    sections: [
      {
        id: "operator",
        title: "1. Operator",
        company: true,
        paragraphs: [
          "GARBAR, IN-TEC, S.L., identified above, operates this website and the Lucid Saga service. This notice gives the information required by Spain’s Law 34/2002 on information society services and electronic commerce (LSSI).",
          `For general enquiries, write to ${generalEmail}. For help with the app, complaints, privacy requests or deleting an account, write to ${supportEmail}. You can also write to the registered address above.`,
        ],
        contact: "privacy",
      },
      {
        id: "website",
        title: "2. This website",
        paragraphs: [
          "This site presents Lucid Saga, which is coming soon to Google Play. It sells nothing: what the app offers, and at what price, is only what its store listing and the app show.",
          "The Terms and Conditions govern playing Lucid Saga, and the Privacy Policy explains how we use personal data, including this site’s only cookie. Write to us to report unlawful content, a security problem or a mistake on this site.",
        ],
      },
      {
        id: "rights",
        title: "3. Intellectual property and links",
        paragraphs: [
          "The site’s text, pictures and software, and the Lucid Saga name and logo, belong to GARBAR, IN-TEC, S.L. or its licensors. You may browse the site and share links to it, but not copy its content for other uses, or suggest that we endorse something we don’t.",
          "Google Play is a trademark of Google LLC. Links to other sites lead to their owners’ services, under their own terms.",
        ],
      },
    ],
  },
  "delete-account": {
    title: "Delete your Lucid Saga account",
    description: "Delete your account in the app, or ask us by email without the app.",
    summary: [
      "Deleted: your account, every story with its scenes, pictures and audio, your credits and your sign-ins.",
      "In the app it happens at once, and it can’t be undone.",
      "Deleting your account doesn’t cancel a Google Play subscription.",
    ],
    sections: [
      {
        id: "in-app",
        title: "1. In the app",
        paragraphs: [
          "Open Account → Privacy and data → Delete account. The app lists what will be deleted. Type the word it asks for to confirm, and tap Delete my account. You need an internet connection.",
          "If you want a copy first, tap Export my data on the same screen: it saves your account, stories and pictures as a file.",
          "Once our server confirms, the app signs you out and tells you your account was deleted. If it shows an error, don’t assume it worked: try again or write to us.",
        ],
      },
      {
        id: "request",
        title: "2. By email, without the app",
        paragraphs: [
          `Write to ${supportEmail}, if you can from your account’s email address, and say which account to delete. Use this if you’ve uninstalled the app, can’t sign in or need help. You don’t need to give a reason, buy anything or cancel a subscription first.`,
          "If you no longer have access to the account’s email, tell us, and we’ll check that the account is yours in a proportionate way. Never send your password or card number.",
          "The button below opens an email for you to review and send; this page deletes nothing by itself.",
        ],
        contact: "deletion",
      },
      {
        id: "scope",
        title: "3. What is deleted, and what stays",
        bullets: [
          "Deleted: your account, every story with its scenes, pictures and the audio of scenes read aloud, your reports, your credits, including any you have left, and your sign-in on every device.",
          "Not deleted by the app: our logs, which hold account and story identifiers but never a story’s text, and expire after 30 days; the database’s restore history, which ages out on its own; your emails with us; Google Play’s own record of any purchase; and copies you exported. Ask us to delete what can be deleted, and we’ll tell you what must stay, why and for how long.",
          "Your Google account isn’t affected.",
        ],
      },
      {
        id: "timing",
        title: "4. When",
        paragraphs: [
          "In the app, your account is deleted as soon as you confirm.",
          "For an email request, we answer within one month, delete what we have to without undue delay, and confirm it. If something must stay for a legal reason, we explain what, why and for how long.",
        ],
        links: [{ label: "How long we keep data", href: "/privacy#retention" }],
      },
      {
        id: "subscription",
        title: "5. Subscriptions and your phone",
        paragraphs: [
          "Deleting your account doesn’t cancel a Google Play subscription: cancel it in Google Play. You don’t have to cancel before asking us to delete your account.",
          "After deleting your account, uninstall the app to remove it from your phone. Uninstalling alone doesn’t delete your account.",
        ],
        links: [
          {
            label: "Manage Google Play subscriptions",
            href: "https://support.google.com/googleplay/answer/7018481",
          },
        ],
      },
    ],
  },
};
