import Logo from 'assets/images/landing-logo.png';

const Promo = () => {
  return (
    <div className="promo">
      <div className="promo-container">
        <div className="promo__info">
          <h1 className="promo__header">
            Учебный проект студента факультета <br />
            Веб-разработки.
          </h1>
          <p className="promo__text">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <input className="promo__more-btn" value="Узнать больше" />
        </div>
        <img className="promo__image" alt="Logo" src={Logo} />
      </div>
    </div>
  );
};

export default Promo;
