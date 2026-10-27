import type { Dict } from "./mk";
import draganPhoto from "../assets/testimonials/dragan-vesna-dent.jpg";

// Montenegrin (Latin script, ijekavian), served at "/me/". Same claims as
// the Macedonian page, except the price: Montenegro is billed in euros.
export const me: Dict = {
  meta: {
    title: "Softver za zakazivanje termina za ordinacije | Appointzy",
    description:
      "Appointzy je softver za zakazivanje termina sa automatskim SMS podsjetnicima za stomatološke, fizioterapeutske i druge privatne ordinacije.",
    ogTitle: "Appointzy · Manje propuštenih termina",
    ogDescription:
      "Automatski SMS podsjetnici za pacijente. Sa 9 propuštenih termina mjesečno, na samo 1. Napravljeno u Sjevernoj Makedoniji.",
    ogLocale: "sr_ME",
    country: "Sjeverna Makedonija",
    softwareDescription:
      "Appointzy je softver za zakazivanje termina sa automatskim SMS podsjetnicima za stomatološke, fizioterapeutske i druge privatne ordinacije.",
  },

  language: {
    choose: "Izaberite jezik",
  },

  nav: {
    cta: "Počnite besplatno",
    ctaShort: "Počnite",
  },

  hero: {
    badgeAudience: "Za privatne ordinacije i kabinete",
    badgeTrial: "30 dana besplatno",
    titleBefore: "Propušten termin, ",
    titleHighlight: "izgubljen novac",
    titleAfter: ".",
    subtitle:
      "Appointzy je softver za zakazivanje termina sa automatskim SMS podsjetnicima. Kod naših korisnika, propušteni termini su pali sa 9 na 1 mjesečno.",
    screenshotAlt: "Sedmični kalendar u Appointzy-ju sa zakazanim terminima",
    smsTitle: "SMS za Mariju P.",
    smsText: "Podsjećamo: sjutra u 10:00 imate termin. Očekujemo vas!",
    clientsBefore: "Već ga koristi ",
    clientsCount: "30+ ordinacija",
    clientsAfter: ": stomatoloških, fizioterapeutskih i drugih.",
    clients: [
      "Badent",
      "Dental Prestige",
      "Vesna Dent",
      "PZU Dr Stojanova",
      "Ortoalex",
      "Ivanum",
      "Fizio Dinamik",
      "Terzievski",
      "Naturalija",
      "Maksident Vrshkovski",
    ],
  },

  form: {
    title: "Započni besplatno",
    practiceName: "Naziv ordinacije ili salona",
    practiceType: "Djelatnost",
    choose: "Izaberite",
    // Values are the API's: 1 dentist, 2 physiotherapist, 3 beauty salon, 4 cardiologist, 99 other.
    practiceTypes: [
      { value: 1, label: "Stomatolog" },
      { value: 2, label: "Fizioterapeut" },
      { value: 3, label: "Salon ljepote" },
      { value: 4, label: "Kardiolog" },
      { value: 99, label: "Drugo" },
    ],
    practiceTypeOther: "Koja djelatnost?",
    city: "Grad",
    country: "Država",
    countries: [
      { code: "MK", label: "Sjeverna Makedonija" },
      { code: "ME", label: "Crna Gora" },
      { code: "XX", label: "Druga država" },
    ],
    contactName: "Vaše ime i prezime",
    email: "Email",
    phone: "Telefon",
    optional: "(nije obavezno)",
    submit: "Započni besplatno",
    sending: "Šalje se...",
    errors: {
      required: "Popunite sva polja. Samo telefon nije obavezan.",
      email: "Unesite ispravan email.",
      phone: "Telefon treba da ima najmanje 6 cifara.",
      tooMany: "Previše pokušaja sa ove mreže. Pokušajte ponovo kasnije.",
      failed: "Nešto nije u redu i prijava nije sačuvana. Pokušajte ponovo.",
    },
    successTitle: "Hvala vam!",
    successBefore: "Primili smo vaš zahtjev. Kontaktiraćemo vas uskoro na ",
    successAfter: ".",
    contact: "Naš tim će vas kontaktirati u roku od 24 sata.",
    price: "30 dana besplatno, zatim od 40 € mjesečno.",
    noCard: "Bez kartice. Bez instalacije.",
  },

  migration: {
    eyebrow: "Početak",
    titleLine1: "Ne počinjete",
    titleLine2: "od nule",
    text: "Prije početka zajedno unosimo postojeće termine. Od prvog dana kalendar je pun, baš kao sveska, samo bez precrtavanja.",
    notebook: "Sveska",
    names: ["Marija", "Stefan", "Elena", "Darko"],
  },

  problem: {
    eyebrow: "Svakodnevica",
    title: "Zvuči poznato?",
    pains: [
      {
        title: "Telefon zvoni usred intervencije",
        text: "Sa rukavicama na rukama, nema ko da se javi. Pacijent zove triput, pa odustane.",
      },
      {
        title: "Pacijent nije došao",
        text: "Niko ga nije podsjetio. Stolica stoji prazna, a sat je izgubljen.",
      },
      {
        title: "Sveska je puna precrtanih imena",
        text: "Niko ne zna koji termin važi, a koji je otkazan još prošle sedmice.",
      },
    ],
  },

  how: {
    eyebrow: "Kako funkcioniše",
    title: "Kako do prvog termina",
    subtitle: "Tri koraka, ništa više.",
    steps: [
      {
        title: "Ostavite e-mail",
        text: "Mi vas kontaktiramo i podešavamo sve za vašu ordinaciju. Postojeće termine unosimo zajedno.",
      },
      {
        title: "Unosite termine",
        text: "Novi termin se unosi za desetak sekundi, sa računara ili sa telefona.",
      },
      {
        title: "Pacijenti dobijaju podsjetnik",
        text: "SMS poruka se šalje sama, dan prije termina. Vi ne radite ništa.",
      },
    ],
  },

  features: {
    eyebrow: "Mogućnosti",
    title: "Sve što jednoj ordinaciji treba",
    introBefore:
      "Ovo dobija svaka ordinacija: stomatološka, fizioterapeutska ili neka druga. Stomatolozi dobijaju i ",
    introLink: "stomatološki karton",
    introAfter: ".",
    sms: {
      title: "Automatski SMS podsjetnici",
      text: "Poruka se šalje sama, dan prije termina. Pacijent ne zaboravlja, a vi ne zovete.",
      reminder: "Podsjećamo: sjutra u 10:00 imate termin kod dr Stojanovske.",
      reply: "Doći ću, hvala!",
    },
    stat: {
      title: "Manje praznih stolica",
      text: "Sa 9 propuštenih termina mjesečno, na samo 1.",
      without: "bez podsjetnika",
      with: "sa Appointzy-jem",
    },
    templates: {
      title: "SMS šabloni koje pišete vi",
      text: "Poruku sastavljate svojim riječima i dodajete {ime}, {datum} i {vrijeme}. Podesite je jednom, a sistem je šalje svakom pacijentu.",
      yourTemplate: "Vaš šablon",
      template: [
        { text: "Poštovana " },
        { variable: "{ime}" },
        { text: ", podsjećamo vas na termin " },
        { variable: "{datum}" },
        { text: " u " },
        { variable: "{vrijeme}" },
        { text: "." },
      ],
      patientGets: "Šta pacijent dobija",
      result: "Poštovana Marija, podsjećamo vas na termin 12.10. u 10:00.",
    },
    phone: {
      title: "Radi na telefonu",
      text: "Otvara se u pretraživaču. Bez instalacije, odakle god.",
      rows: ["09:00 · Marija P.", "10:30 · Stefan N.", "12:00 · Elena J."],
    },
    calendar: {
      title: "Jasan dan i jasna sedmica",
      text: "Cijela sedmica na jedan pogled, po zaposlenom. Bez precrtavanja, bez gužve u svesci.",
      alt: "Sedmični prikaz kalendara u Appointzy-ju",
    },
    recurring: {
      title: "Ponavljajuće posjete",
      text: "Serija od deset fizioterapija? Unesete je jednom, a sistem zakaže sve termine i podsjeti za svaki posebno.",
      dates: ["Pon 12.10.", "Sri 14.10.", "Pet 16.10.", "Pon 19.10.", "Sri 21.10."],
    },
    records: {
      title: "Karton i snimci pacijenta",
      text: "Snimci i istorija posjeta stoje uz pacijenta, u sistemu. Ne tražite po folderima, USB-ovima ili starom računaru.",
      initials: "MP",
      patient: "Marija Petrovska",
      lastVisit: "Posljednja posjeta: 12.10.",
      images: ["Snimak 14.03.", "Snimak 12.10."],
      visits: ["Uklanjanje kamenca", "Kontrola", "Plomba"],
    },
    branding: {
      title: "Sa vašim logom i vašim bojama",
      text: "Aplikacija izgleda kao vaša. Radno vrijeme, usluge i zaposleni podešeni su kao kod vas.",
      logo: "VAŠ LOGO",
    },
    invoices: {
      title: "Ulazne fakture i PDV",
      text: "Fakture dobavljača unosite uz automatski obračun PDV-a i ukupnih iznosa. Fotografišite fakturu telefonom i AI popunjava podatke.",
      net: "Neto",
      vat: "PDV 18%",
      total: "Ukupno",
      amounts: ["13.500", "2.430", "15.930"],
    },
  },

  dental: {
    eyebrow: "Za stomatološke ordinacije",
    titleBefore: "Stomatološki karton sa istorijom za ",
    titleHighlight: "svaki zub",
    subtitle:
      "Dodirnite zub i vidite sve: dijagnozu, tretmane, bilješke i ko je šta uradio i kada. Bez traženja po papirnim kartonima.",
    initials: "MP",
    patient: "Marija Petrovska",
    patientMeta: "Stomatološki karton · 34 god.",
    alertLabel: "Medicinsko upozorenje:",
    alert: "Alergija na penicilin",
    summary: { findings: "Nalazi", planned: "Planirano", done: "Završeno" },
    hint: "Dodirnite zub da vidite njegovu istoriju.",
    sideRight: "Desna strana",
    sideLeft: "Lijeva strana",
    tooth: "Zub",
    hasRecords: "ima zapise",
    types: [
      "",
      "Centralni sjekutić",
      "Lateralni sjekutić",
      "Očnjak",
      "Prvi premolar",
      "Drugi premolar",
      "Prvi molar",
      "Drugi molar",
      "Treći molar",
    ],
    sides: ["", "gore desno", "gore lijevo", "dolje lijevo", "dolje desno"],
    status: {
      finding: "Aktivno",
      planned: "Planirano",
      done: "Završeno",
      existing: "Postojeće",
      resolved: "Riješeno",
    },
    items: "Stavke",
    notes: "Bilješke",
    history: "Istorija zuba",
    empty: "Nema zapisa. U aplikaciji ovdje unosite nalaz, tretman ili bilješku.",
    legendLabel: "Legenda",
    legend: {
      finding: "Nalaz",
      planned: "Planirano",
      done: "Urađeno ovdje",
      existing: "Postojeće",
      missing: "Nedostaje",
      note: "Ima bilješku",
    },
    records: {
      16: {
        items: [{ name: "Krunica", status: "existing", date: "02.09." }],
        history: [{ date: "02.09.", text: "Uneseno: Krunica, postojeće", by: "dr Trajkovski" }],
      },
      11: {
        items: [{ name: "Plomba M", status: "done", date: "09.09." }],
        history: [{ date: "09.09.", text: "Završeno: Plomba M", by: "dr Nikolovska" }],
      },
      26: {
        items: [
          { name: "Karijes", status: "finding", date: "23.09." },
          { name: "Plomba MO", status: "planned", date: "23.09." },
        ],
        history: [
          { date: "23.09.", text: "Planirano: Plomba MO", by: "dr Trajkovski" },
          { date: "23.09.", text: "Uneseno: Karijes", by: "dr Trajkovski" },
        ],
      },
      36: {
        items: [
          { name: "Kanal, 3 kanala", status: "done", date: "14.09." },
          { name: "Plomba OD", status: "done", date: "21.09." },
          { name: "Karijes", status: "resolved", date: "21.09." },
        ],
        note: "Osjetljiv na hladno nakon tretmana. Kontrola za šest mjeseci.",
        history: [
          { date: "21.09.", text: "Završeno: Plomba OD", by: "dr Nikolovska" },
          { date: "14.09.", text: "Završeno: Kanal", by: "dr Nikolovska" },
          { date: "02.09.", text: "Uneseno: Karijes", by: "dr Trajkovski" },
        ],
      },
      46: {
        items: [{ name: "Nedostaje", status: "existing", date: "02.09." }],
        history: [{ date: "02.09.", text: "Uneseno: Nedostaje", by: "dr Trajkovski" }],
      },
      47: {
        items: [{ name: "Karijes", status: "finding", date: "23.09." }],
        history: [{ date: "23.09.", text: "Uneseno: Karijes", by: "dr Trajkovski" }],
      },
    },
    points: [
      {
        title: "Nalazi i tretmani na zubu",
        text: "Karijes, plomba, kanal, krunica, most ili implant, označeni na zubu i na površini gdje se nalaze.",
      },
      {
        title: "Ko, šta i kada",
        text: "Svaka promjena se bilježi sa datumom i imenom. Možete vidjeti i kako je karton izgledao bilo kog dana.",
      },
      {
        title: "Plan terapije u PDF-u",
        text: "Planirani tretmani sa cijenama, u numerisanom PDF-u za pacijenta. Šta je prihvatio, a šta odbio, ostaje zabilježeno.",
      },
      {
        title: "Cijene Stomatološke komore",
        text: "Standardne usluge sa minimalnim cijenama Stomatološke komore Makedonije prilagodite i dodajte odjednom.",
      },
    ],
  },

  proof: {
    eyebrow: "Povjerenje",
    title: "Proizvod iz regiona, nastao zajedno sa ordinacijama",
    intro:
      "Appointzy je razvijen u Sjevernoj Makedoniji, zajedno sa stomatolozima i fizioterapeutima koji ga koriste svaki dan. Njihovi prijedlozi postaju dio aplikacije, a podršku pruža tim koji zna kako radi jedna ordinacija.",
    statCount: "30+",
    statLabel: "ordinacija ga već koristi",
    quoteOpen: "„",
    quoteClose: "“",
    prev: "Prethodna mišljenja",
    next: "Sljedeća mišljenja",
    quotes: [
      {
        text: "Sa Appointzy-jem više nemamo problema sa duplim terminima i propuštenim zakazivanjima. Sve je jasno i pregledno, a osoblje je brzo savladalo sistem.",
        name: "Blaženka",
        role: "Ordinacija Badent",
      },
      {
        text: "Preporučujem ga svakome ko radi sa terminima. Za jedan dan smo imali sistem podešen i u upotrebi. Jednostavno i praktično.",
        name: "Dragan",
        role: "Stomatološka ordinacija Vesna Dent",
        photo: draganPhoto,
      },
      {
        text: "Naši pacijenti dolaze na serije od više terapija. Seriju unesem jednom i za svaku terapiju stiže poseban podsjetnik. Ranije sam svaki termin potvrđivao pozivom.",
        name: "Mite",
        role: "Fizioterapeutska ordinacija Ivanum",
      },
      {
        text: "Raspored gledam na telefonu, gdje god da sam. Podsjetnici idu sami, pa pacijenti rijetko zaborave termin, a ja ne gubim vrijeme na pozive.",
        name: "Bojan",
        role: "Fizioterapeutska ordinacija Fizio Dinamik",
      },
      {
        text: "Konačno imamo pregled cijele sedmice bez telefonskih poziva i sveske. Pacijenti dolaze na vrijeme zahvaljujući podsjetnicima.",
        name: "Aleksandra",
        role: "PZU Dr Stojanova",
      },
      {
        text: "Kontrole koje se ponavljaju mjesecima sada se zakazuju unaprijed, a podsjetnici stižu sami. Ogromno olakšanje za nas.",
        name: "Aleksandra",
        role: "Ortoalex",
      },
      {
        text: "Otkako pacijenti dobijaju SMS podsjetnik, prazni termini su rijetkost. Više ne gubimo vrijeme na pozive i potvrđivanje.",
        name: "Boban",
        role: "Stomatološka ordinacija Terzievski",
      },
      {
        text: "Poruke smo napisali svojim riječima, pa pacijenti dobijaju podsjetnik koji zvuči kao da je od nas.",
        name: "Viktor",
        role: "Stomatološka ordinacija Naturalija",
      },
      {
        text: "Cijelu sedmicu vidimo na jedan pogled, za svakog zaposlenog posebno. Slobodan termin nađem za nekoliko sekundi, dok je pacijent još na telefonu.",
        name: "Petar",
        role: "Stomatološka ordinacija Maksident Vrshkovski",
      },
    ],
  },

  faq: {
    eyebrow: "Pitanja",
    title: "Najčešća pitanja",
    items: [
      {
        q: "Koliko košta?",
        a: "Prvih 30 dana je besplatno. Nakon toga, od 40 € mjesečno, sa uključenim SMS porukama, pa nema posebnog računa za svaku poslatu poruku. Tačnu cijenu za vašu ordinaciju kažemo vam kada vas kontaktiramo, bez obaveze.",
      },
      {
        q: "Da li je Appointzy softver za stomatološku ordinaciju?",
        a: "Da. Appointzy je softver za zakazivanje termina za stomatološke, fizioterapeutske i druge privatne ordinacije. Stomatološke ordinacije dobijaju i stomatološki karton: nalaze, tretmane, bilješke i istoriju za svaki zub.",
      },
      {
        q: "Šta ako već koristimo drugi program?",
        a: "Nije problem. Prilikom podešavanja zajedno unosimo postojeće termine, tako da od prvog dana radite sa punim kalendarom.",
      },
      {
        q: "Da li je teško za učenje?",
        a: "Nije. Ako znate da koristite Viber, znate da koristite i Appointzy. Unos termina traje desetak sekundi, a sve ostalo ide samo.",
      },
      {
        q: "Da li pacijenti moraju nešto da instaliraju?",
        a: "Ne. Pacijenti dobijaju običnu SMS poruku. Ne treba im aplikacija, ni internet.",
      },
      {
        q: "Šta će biti sa terminima iz sveske?",
        a: "Prilikom podešavanja zajedno unosimo postojeće termine. Od prvog dana radite sa punim kalendarom.",
      },
      {
        q: "Radi li na telefonu?",
        a: "Da. Appointzy se otvara u pretraživaču na bilo kom telefonu, tabletu ili računaru, bez instalacije.",
      },
      {
        q: "Ko šalje podsjetnike?",
        a: "Sistem, automatski, dan prije termina. Vi samo unesete termin i ništa više.",
      },
    ],
  },

  cta: {
    eyebrow: "Počnite",
    titleBefore: "Počnite još ",
    titleHighlight: "ove sedmice",
    text: "Ostavite e-mail i javićemo vam se da sve podesimo. Bez obaveza, bez kartice.",
    checklist: [
      "30 dana besplatno, zatim od 40 € mjesečno",
      "SMS poruke su uključene u cijenu",
      "Postojeće termine unosimo zajedno",
      "Podrška tima iz regiona",
    ],
  },

  sticky: {
    cta: "Isprobajte besplatno",
  },

  footer: {
    about:
      "Softver za zakazivanje termina i SMS podsjetnike za stomatološke, fizioterapeutske i druge privatne ordinacije. Napravljeno u Sjevernoj Makedoniji.",
    rights: "© 2026 Appointzy. Sva prava zadržana.",
  },
};
