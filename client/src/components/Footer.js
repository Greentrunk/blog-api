export const Footer = () => {
  return (
    <div className="flex justify-center items-center md:text-lg font-medium py-10 gap-3">
      <p>Copyright @ 2021 Christopher J. Pohl</p>
      <a
        className="text-cyan-600 text-4xl"
        href="https://github.com/CJPohl"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fab fa-github transition ease-in-out hover:rotate-180" />
      </a>
    </div>
  );
};
