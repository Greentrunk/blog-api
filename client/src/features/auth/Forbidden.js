import React from "react";

// Unauthorized
export const Forbidden = () => {
  return (
    <section className="w-4/5 max-w-7xl mx-auto py-10 flex flex-col items-center gap-3">
      <h2 className="text-5xl font-light tracking-wider">Forbidden</h2>
      <p className="text-3xl font-light">Please login for admin features.</p>
    </section>
  );
};
