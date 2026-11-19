"use client";

import { useState } from "react";

export function ClubForm() {
  const [done, setDone] = useState(false);
  if (done)
    return (
      <p className="rounded-full bg-crema px-6 py-4 text-center font-bold text-verde">
        Benvenuto in Famiglia ! Surveille ta boîte mail 🍕
      </p>
    );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <label htmlFor="club-email" className="sr-only">Ton e-mail</label>
      <input
        id="club-email"
        type="email"
        required
        placeholder="ton@email.fr"
        className="min-w-0 flex-1 rounded-full border-2 border-crema/30 bg-ink/40 px-6 py-4 text-crema placeholder:text-crema/50 focus:border-crema focus:outline-none"
      />
      <button className="btn bg-crema px-8 py-4 font-bold uppercase tracking-wide text-verde">
        Je rejoins
      </button>
    </form>
  );
}
