const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <p className="footer__text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__divider"></div>
        <div className="footer__bottom">
          <p className="footer__year">© 2020</p>
          <div className="footer__bottom-right">
            <p className="footer__bottom-yandex">Яндекс.Практикум</p>
            <p className="footer__bottom-github">Github</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
