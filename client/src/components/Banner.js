import React from "react";

export const Banner = () => {
  return (
    <section className="bg-black py-6">
      <article className="flex flex-col md:flex-row gap-2 justify-center items-center">
        <h3 className="text-cyan-500">Black Lives Matter.</h3>
        <h3 className="text-cyan-500">
          Give support to{" "}
          <span>
            <a
              className="text-cyan-600 underline underline-offset-4 transition ease-in-out hover:text-cyan-500"
              href="https://support.eji.org/give/153413/#!/donation/checkout"
            >
              the Equal Justice Initiative.
            </a>
          </span>
        </h3>
      </article>
    </section>
  );
};
