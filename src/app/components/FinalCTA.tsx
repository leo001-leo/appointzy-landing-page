import { LeadForm } from "./LeadForm";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section id="cta" className="w-full px-4 py-14 md:py-20">
      <div className="mx-auto max-w-xl">
        <Reveal>
          <div className="rounded-3xl border border-border bg-white p-6 shadow-lg md:p-10">
            <h2 className="text-3xl md:text-4xl">Бидете меѓу првите</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Оставете е-маил и ние ве контактираме за сè да поставиме. Без обврски.
            </p>
            <div className="mt-6">
              <LeadForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
