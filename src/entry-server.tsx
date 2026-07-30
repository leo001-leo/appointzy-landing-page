import { renderToString } from "react-dom/server";
import App from "./app/App.tsx";

// Used only at build time by scripts/prerender.mjs to bake the page into
// index.html, so crawlers get real content instead of an empty <div>.
export function render() {
  return renderToString(<App />);
}
