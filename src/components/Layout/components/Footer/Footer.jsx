const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__divider"></div>
        <div className="footer__bottom">
          <p className="footer__year">© 2023</p>
          <div className="footer__bottom-right">
            <a
              className="footer__bottom-yandex"
              href="https://practicum.yandex.ru/"
              target="_blank"
            >
              Яндекс.Практикум
            </a>
            <a
              className="footer__bottom-github"
              href="https://github.com/Rayn1998/movies-explorer-frontend"
              target="_blank"
            >
              Github
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
