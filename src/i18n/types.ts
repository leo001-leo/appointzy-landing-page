export type Lang = "mk" | "en" | "me";

// Dental chart entry states, shared by every language.
export type DentalStatus = "finding" | "planned" | "done" | "existing" | "resolved";

export interface DentalRecordText {
  items: { name: string; status: DentalStatus; date: string }[];
  note?: string;
  history: { date: string; text: string; by: string }[];
}

// A piece of the SMS template: plain text, or a variable shown as a chip.
export type TemplatePart = { text: string } | { variable: string };
