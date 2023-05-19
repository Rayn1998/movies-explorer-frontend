import { useNavigate } from 'react-router-dom';

import Logo from 'assets/images/landing-logo.png';

const Promo = () => {
  const navigate = useNavigate();
  return (
    <section className="promo">
      <div className="promo-container">
        <div className="promo__info">
          <h1 className="promo__header">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className="promo__text">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <input type='button' className="promo__more-btn" value="Узнать больше" onClick={() => navigate('/movies')} />
        </div>
        <img className="promo__image" alt="Logo" src={Logo} />
      </div>
    </section>
  );
};

export default Promo;
