// Where a visitor came from, so the lead sheet can tell ad leads apart.
// Read from the landing URL: the utm_* parameters set on the Meta ads, or the
// fbclid that Facebook and Instagram add to every link people click there.
// Kept for 30 days, so a visitor who switches language, reloads or comes back
// later to send the form is still counted.

const KEY = "appointzy.attribution";
const MAX_AGE = 30 * 24 * 60 * 60 * 1000;
const META = /^(facebook|fb|instagram|ig|meta)$/i;
const PAID = /paid|cpc|ads?$/i;

interface Attribution {
  source: string;
  medium: string;
  campaign: string;
  at: number;
}

/** Call once on page load. A newer visit from a tagged link replaces an older one. */
export function rememberAttribution(): void {
  try {
    const q = new URLSearchParams(window.location.search);
    const source = q.get("utm_source") || (q.has("fbclid") ? "facebook" : "");
    if (!source) return;
    const a: Attribution = {
      source: source.slice(0, 50),
      medium: (q.get("utm_medium") ?? "").slice(0, 50),
      campaign: (q.get("utm_campaign") ?? "").slice(0, 100),
      at: Date.now(),
    };
    localStorage.setItem(KEY, JSON.stringify(a));
  } catch {
    // Storage blocked (private mode, cookies off): the lead is just unmarked.
  }
}

/**
 * "Facebook ad: <campaign>", "Facebook ad", "Facebook" (a link on Facebook or
 * Instagram without the ad's parameters), another utm_source as given, or ""
 * when we know nothing about the visit.
 */
export function leadOrigin(): string {
  try {
    const a = JSON.parse(localStorage.getItem(KEY) ?? "null") as Attribution | null;
    if (!a || Date.now() - a.at > MAX_AGE) return "";
    const name = META.test(a.source) ? (PAID.test(a.medium) ? "Facebook ad" : "Facebook") : a.source;
    return a.campaign ? `${name}: ${a.campaign}` : name;
  } catch {
    return "";
  }
}
