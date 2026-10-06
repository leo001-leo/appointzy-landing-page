import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { LangProvider, langFromPath } from "./i18n";
import "./styles/index.css";

const container = document.getElementById("root")!;

// "/" is Macedonian, "/en/" is English. Each page is prerendered in its own
// language, so the client must pick the same one to hydrate cleanly.
const app = (
  <LangProvider lang={langFromPath(window.location.pathname)}>
    <App />
  </LangProvider>
);

// In production the HTML is prerendered at build time, so hydrate it.
// In dev the container is empty, so mount normally.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
