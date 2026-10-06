import { dictionaries, LANGS, SITE, type Lang } from "./index";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * The language-specific part of <head>, baked in at build time. The FAQ
 * schema is built from the same dictionary as the visible FAQ, so the two
 * can never drift apart.
 */
export function head(lang: Lang): string {
  const t = dictionaries[lang].meta;
  const url = SITE + LANGS[lang].path;
  const other = (Object.keys(LANGS) as Lang[]).filter((l) => l !== lang);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: "Appointzy",
        url: `${SITE}/`,
        logo: `${SITE}/apple-touch-icon.png`,
        areaServed: { "@type": "Country", name: t.country },
        sameAs: ["https://www.instagram.com/appointzy.app"],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE}/#software`,
        name: "Appointzy",
        url,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        inLanguage: lang,
        publisher: { "@id": `${SITE}/#organization` },
        description: t.softwareDescription,
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: lang,
        mainEntity: dictionaries[lang].faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return [
    `<title>${escape(t.title)}</title>`,
    `<meta name="description" content="${escape(t.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...(Object.keys(LANGS) as Lang[]).map(
      (l) => `<link rel="alternate" hreflang="${l}" href="${SITE}${LANGS[l].path}" />`
    ),
    `<link rel="alternate" hreflang="x-default" href="${SITE}${LANGS.mk.path}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Appointzy" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escape(t.ogTitle)}" />`,
    `<meta property="og:description" content="${escape(t.ogDescription)}" />`,
    `<meta property="og:image" content="${SITE}/og.png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Appointzy" />`,
    `<meta property="og:locale" content="${t.ogLocale}" />`,
    ...other.map(
      (l) => `<meta property="og:locale:alternate" content="${dictionaries[l].meta.ogLocale}" />`
    ),
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(t.ogTitle)}" />`,
    `<meta name="twitter:description" content="${escape(t.ogDescription)}" />`,
    `<meta name="twitter:image" content="${SITE}/og.png" />`,
    // "<" is escaped so no text can close the script tag early.
    `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}
