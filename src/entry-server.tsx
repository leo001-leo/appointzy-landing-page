import { renderToString } from "react-dom/server";
import App from "./app/App.tsx";
import { LANGS, LangProvider, type Lang } from "./i18n";
export { head } from "./i18n/head";

// Used only at build time by scripts/prerender.mjs to bake each language's
// page into HTML, so crawlers get real content instead of an empty <div>.
export const langs = Object.keys(LANGS) as Lang[];
export const paths = Object.fromEntries(langs.map((l) => [l, LANGS[l].path]));

export function render(lang: Lang) {
  return renderToString(
    <LangProvider lang={lang}>
      <App />
    </LangProvider>
  );
}
