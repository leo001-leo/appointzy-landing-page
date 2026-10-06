import type { Dict } from "./mk";

// English, served at "/en/". Same claims as the Macedonian page, nothing
// added. Names of people and practices are transliterated.
export const en: Dict = {
  meta: {
    title: "Appointment Scheduling Software for Clinics | Appointzy",
    description:
      "Appointzy is appointment scheduling software with automatic SMS reminders for dental, physiotherapy and other private practices in North Macedonia.",
    ogTitle: "Appointzy · Fewer missed appointments",
    ogDescription:
      "Automatic SMS reminders for your patients. From 9 missed appointments a month to just 1. Made in North Macedonia.",
    ogLocale: "en_GB",
    country: "North Macedonia",
    softwareDescription:
      "Appointzy is appointment scheduling software with automatic SMS reminders for dental, physiotherapy and other private practices in North Macedonia.",
  },

  language: {
    choose: "Choose language",
  },

  nav: {
    cta: "Start free",
    ctaShort: "Start free",
  },

  hero: {
    badgeAudience: "For private practices and studios",
    badgeTrial: "30 days free",
    titleBefore: "Missed appointment, ",
    titleHighlight: "lost money",
    titleAfter: ".",
    subtitle:
      "Appointzy is appointment scheduling software with automatic SMS reminders. For our customers, missed appointments dropped from 9 to 1 a month.",
    screenshotAlt: "Weekly calendar in Appointzy with booked appointments",
    smsTitle: "SMS to Marija P.",
    smsText: "Reminder: you have an appointment tomorrow at 10:00. See you then!",
    clientsLabel:
      "Already used by dental, physiotherapy and other private practices in North Macedonia",
    clients: [
      "Badent",
      "Dental Prestige",
      "Vesna Dent",
      "PZU Dr. Stojanova",
      "Ortoalex",
      "Ivanum",
      "Fizio Dinamik",
    ],
  },

  form: {
    emailLabel: "Email",
    emailPlaceholder: "name@gmail.com",
    emailError: "Enter a valid email address, e.g. name@gmail.com",
    phoneLabel: "Phone",
    phoneOptional: "(optional)",
    phonePlaceholder: "if you'd like us to call you",
    submit: "Try it free",
    sending: "Sending...",
    error: "Something went wrong and your request wasn't saved. Please try again.",
    successTitle: "Thank you!",
    successBefore: "We'll be in touch soon at ",
    successAfter: ".",
    contact: "Our team will contact you within 24 hours.",
    price: "30 days free, then from 1,500 MKD a month.",
    noCard: "No card. No installation.",
  },

  migration: {
    eyebrow: "Getting started",
    titleLine1: "You don't start",
    titleLine2: "from scratch",
    text: "Before you start, we enter your existing appointments together. From day one your calendar is full, just like your notebook, only without the crossed-out lines.",
    notebook: "Notebook",
    names: ["Marija", "Stefan", "Elena", "Darko"],
  },

  problem: {
    eyebrow: "Every day",
    title: "Sound familiar?",
    pains: [
      {
        title: "The phone rings mid-treatment",
        text: "With gloves on, nobody can pick up. The patient calls three times, then gives up.",
      },
      {
        title: "The patient didn't show up",
        text: "Nobody reminded them. The chair sits empty and the hour is lost.",
      },
      {
        title: "The notebook is full of crossed-out names",
        text: "Nobody knows which appointments still stand and which were cancelled last week.",
      },
    ],
  },

  how: {
    eyebrow: "How it works",
    title: "Getting to your first appointment",
    subtitle: "Three steps, nothing more.",
    steps: [
      {
        title: "Leave your email",
        text: "We contact you and set everything up for your practice. We enter your existing appointments together.",
      },
      {
        title: "Add appointments",
        text: "A new appointment takes about ten seconds, from a computer or a phone.",
      },
      {
        title: "Patients get a reminder",
        text: "The SMS goes out on its own, the day before the appointment. You don't have to do a thing.",
      },
    ],
  },

  features: {
    eyebrow: "Features",
    title: "Everything a practice needs",
    introBefore:
      "Every practice gets all of this: dental, physiotherapy or any other. Dentists also get a ",
    introLink: "dental chart",
    introAfter: ".",
    sms: {
      title: "Automatic SMS reminders",
      text: "The message goes out on its own, the day before the appointment. The patient doesn't forget, and you don't have to call.",
      reminder: "Reminder: you have an appointment with Dr. Stojanovska tomorrow at 10:00.",
      reply: "I'll be there, thank you!",
    },
    stat: {
      title: "Fewer empty chairs",
      text: "From 9 missed appointments a month to just 1.",
      without: "without reminders",
      with: "with Appointzy",
    },
    templates: {
      title: "SMS templates you write yourself",
      text: "Write the message in your own words and add {name}, {date} and {time}. Set it up once and the system sends it to every patient.",
      yourTemplate: "Your template",
      template: [
        { text: "Dear " },
        { variable: "{name}" },
        { text: ", this is a reminder of your appointment on " },
        { variable: "{date}" },
        { text: " at " },
        { variable: "{time}" },
        { text: "." },
      ],
      patientGets: "What the patient receives",
      result: "Dear Marija, this is a reminder of your appointment on 12 Oct at 10:00.",
    },
    phone: {
      title: "Works on your phone",
      text: "Opens in the browser. No installation, from anywhere.",
      rows: ["09:00 · Marija P.", "10:30 · Stefan N.", "12:00 · Elena J."],
    },
    calendar: {
      title: "A clear day and a clear week",
      text: "The whole week at a glance, per staff member. No crossing out, no cluttered notebook.",
      alt: "Weekly view of the calendar in Appointzy",
    },
    recurring: {
      title: "Recurring visits",
      text: "A course of ten physiotherapy sessions? Enter it once and the system books them all and sends a reminder for each one.",
      dates: ["Mon 12 Oct", "Wed 14 Oct", "Fri 16 Oct", "Mon 19 Oct", "Wed 21 Oct"],
    },
    records: {
      title: "Patient records and images",
      text: "Images and visit history stay with the patient, in the system. No more searching through folders, USB sticks or an old computer.",
      initials: "MP",
      patient: "Marija Petrovska",
      lastVisit: "Last visit: 12 Oct",
      images: ["Image 14 Mar", "Image 12 Oct"],
      visits: ["Scaling", "Check-up", "Filling"],
    },
    branding: {
      title: "Your logo, your colours",
      text: "The app looks like yours. Working hours, services and staff are set up the way you work.",
      logo: "YOUR LOGO",
    },
    invoices: {
      title: "Supplier invoices and VAT",
      text: "Enter supplier invoices with VAT and totals calculated automatically. Take a photo of the invoice with your phone and AI fills in the details.",
      net: "Net",
      vat: "VAT 18%",
      total: "Total",
      amounts: ["13,500", "2,430", "15,930"],
    },
  },

  dental: {
    eyebrow: "For dental practices",
    titleBefore: "A dental chart with a history for ",
    titleHighlight: "every tooth",
    subtitle:
      "Tap a tooth and see everything: diagnosis, treatments, notes, and who did what and when. No more searching through paper records.",
    initials: "MP",
    patient: "Marija Petrovska",
    patientMeta: "Dental chart · age 34",
    alertLabel: "Medical alert:",
    alert: "Penicillin allergy",
    summary: { findings: "Findings", planned: "Planned", done: "Done" },
    hint: "Tap or click a tooth to see its history.",
    sideRight: "Right side",
    sideLeft: "Left side",
    tooth: "Tooth",
    hasRecords: "has records",
    types: [
      "",
      "Central incisor",
      "Lateral incisor",
      "Canine",
      "First premolar",
      "Second premolar",
      "First molar",
      "Second molar",
      "Third molar",
    ],
    sides: ["", "upper right", "upper left", "lower left", "lower right"],
    status: {
      finding: "Active",
      planned: "Planned",
      done: "Done",
      existing: "Existing",
      resolved: "Resolved",
    },
    items: "Items",
    notes: "Notes",
    history: "Tooth history",
    empty: "Nothing recorded. In the app, this is where you add a finding, a treatment or a note.",
    legendLabel: "Legend",
    legend: {
      finding: "Finding",
      planned: "Planned",
      done: "Done here",
      existing: "Existing",
      missing: "Missing",
      note: "Has a note",
    },
    records: {
      16: {
        items: [{ name: "Crown", status: "existing", date: "2 Sep" }],
        history: [{ date: "2 Sep", text: "Recorded: Crown, existing", by: "Dr. Trajkovski" }],
      },
      11: {
        items: [{ name: "Filling M", status: "done", date: "9 Sep" }],
        history: [{ date: "9 Sep", text: "Completed: Filling M", by: "Dr. Nikolovska" }],
      },
      26: {
        items: [
          { name: "Caries", status: "finding", date: "23 Sep" },
          { name: "Filling MO", status: "planned", date: "23 Sep" },
        ],
        history: [
          { date: "23 Sep", text: "Planned: Filling MO", by: "Dr. Trajkovski" },
          { date: "23 Sep", text: "Recorded: Caries", by: "Dr. Trajkovski" },
        ],
      },
      36: {
        items: [
          { name: "Root canal, 3 canals", status: "done", date: "14 Sep" },
          { name: "Filling OD", status: "done", date: "21 Sep" },
          { name: "Caries", status: "resolved", date: "21 Sep" },
        ],
        note: "Sensitive to cold after the treatment. Check-up in six months.",
        history: [
          { date: "21 Sep", text: "Completed: Filling OD", by: "Dr. Nikolovska" },
          { date: "14 Sep", text: "Completed: Root canal", by: "Dr. Nikolovska" },
          { date: "2 Sep", text: "Recorded: Caries", by: "Dr. Trajkovski" },
        ],
      },
      46: {
        items: [{ name: "Missing", status: "existing", date: "2 Sep" }],
        history: [{ date: "2 Sep", text: "Recorded: Missing", by: "Dr. Trajkovski" }],
      },
      47: {
        items: [{ name: "Caries", status: "finding", date: "23 Sep" }],
        history: [{ date: "23 Sep", text: "Recorded: Caries", by: "Dr. Trajkovski" }],
      },
    },
    points: [
      {
        title: "Findings and treatments on the tooth",
        text: "Caries, fillings, root canals, crowns, bridges and implants, marked on the tooth and on the exact surface.",
      },
      {
        title: "Who, what and when",
        text: "Every change is logged with a date and a name. You can even see how the chart looked on any past day.",
      },
      {
        title: "Treatment plan as a PDF",
        text: "Planned treatments with prices, in a numbered PDF for the patient. What they accepted and what they declined stays on record.",
      },
      {
        title: "Dental Chamber prices",
        text: "Adjust the standard services with the minimum prices of the Dental Chamber of Macedonia and add them all at once.",
      },
    ],
  },

  proof: {
    eyebrow: "Trust",
    title: "A local product, built with local practices",
    intro:
      "Appointzy is developed in North Macedonia, together with the dentists and physiotherapists who use it every day. Their suggestions become part of the app, and support comes from a local team who know how a practice runs.",
    quoteOpen: "“",
    quoteClose: "”",
    quotes: [
      {
        text: "Appointzy transformed the way we run our business. Booking appointments is easy now, and our clients love the SMS reminders.",
        name: "Srna",
        role: "Owner of a private practice",
      },
      {
        text: "With Appointzy we no longer have double bookings or missed appointments. Everything is clear and easy to follow, and our staff picked up the system quickly.",
        name: "Blazhenka",
        role: "Badent practice",
      },
      {
        text: "Our patients come for a series of sessions. I enter the series once and a separate reminder goes out for each session. I used to confirm every appointment with a phone call.",
        name: "Mite",
        role: "Ivanum physiotherapy practice",
      },
      {
        text: "Appointzy gave us a professional image with our clients. The SMS reminders cut the number of missed appointments significantly, and we have saved a lot of working time.",
        name: "Ivo",
        role: "Dental Prestige",
      },
      {
        text: "I recommend it to anyone who works with appointments. We had the system set up and running within a day. Simple and practical.",
        name: "Dragan",
        role: "Vesna Dent",
      },
      {
        text: "I check my schedule on my phone, wherever I am. The reminders go out on their own, so patients rarely forget an appointment and I don't waste time on calls.",
        name: "Bojan",
        role: "Fizio Dinamik physiotherapy practice",
      },
      {
        text: "Finally we can see the whole week without phone calls or a notebook. Patients arrive on time thanks to the reminders.",
        name: "Aleksandra",
        role: "PZU Dr. Stojanova",
      },
      {
        text: "Check-ups that repeat for months are now booked in advance, and the reminders arrive on their own. A huge relief for us.",
        name: "Aleksandra",
        role: "Ortoalex",
      },
    ],
  },

  faq: {
    eyebrow: "Questions",
    title: "Frequently asked questions",
    items: [
      {
        q: "How much does it cost?",
        a: "The first 30 days are free. After that it's from 1,500 MKD a month with SMS messages included, so there's no separate charge for each message sent. We'll tell you the exact price for your practice when we get in touch, with no obligation.",
      },
      {
        q: "Is Appointzy software for dental practices?",
        a: "Yes. Appointzy is appointment scheduling software for dental, physiotherapy and other private practices. Dental practices also get a dental chart: findings, treatments, notes and history for every tooth.",
      },
      {
        q: "What if we already use another program?",
        a: "No problem. During setup we enter your existing appointments together, so you work with a full calendar from day one.",
      },
      {
        q: "Is it hard to learn?",
        a: "No. If you can use Viber, you can use Appointzy. Adding an appointment takes about ten seconds, and everything else happens on its own.",
      },
      {
        q: "Do patients have to install anything?",
        a: "No. Patients get a regular SMS. They don't need an app or an internet connection.",
      },
      {
        q: "What happens to the appointments in our notebook?",
        a: "During setup we enter your existing appointments together. From day one you work with a full calendar.",
      },
      {
        q: "Does it work on a phone?",
        a: "Yes. Appointzy opens in the browser on any phone, tablet or computer, with no installation.",
      },
      {
        q: "Who sends the reminders?",
        a: "The system does, automatically, the day before the appointment. You just enter the appointment, nothing more.",
      },
    ],
  },

  cta: {
    eyebrow: "Get started",
    titleBefore: "Start ",
    titleHighlight: "this week",
    text: "Leave your email and we'll get in touch to set everything up. No commitment, no card.",
    checklist: [
      "30 days free, then from 1,500 MKD a month",
      "SMS messages are included in the price",
      "We enter your existing appointments together",
      "Support from a local team",
    ],
  },

  sticky: {
    cta: "Try it free",
  },

  footer: {
    about:
      "Appointment scheduling and SMS reminder software for dental, physiotherapy and other private practices. Made in North Macedonia.",
    rights: "© 2026 Appointzy. All rights reserved.",
  },
};
