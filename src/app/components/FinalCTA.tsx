import React from "react";

export function FinalCTA() {
  return (
    <section id="demo" className="py-20 text-center">
      <h2 className="text-3xl font-bold mb-4">
        Подготвени сте да внесете ред во вашите термини?
      </h2>
      <p className="mb-6">
        Оставете е-маил и ќе ве контактираме за бесплатна демонстрација.
      </p>

      <form
        action="https://api.sheetmonkey.io/form/eGhahDSCJG5fH7oEaBxnS1"
        method="POST"
        className="flex flex-col items-center gap-3 max-w-sm mx-auto"
      >
        <input
          type="email"
          name="email"
          placeholder="Вашиот е-маил"
          required
          className="border rounded px-4 py-2 w-full"
        />
        <button
          type="submit"
          className="btn-primary w-full py-3 text-base font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
        >
          Испрати →
        </button>
      </form>
    </section>
  );
}
