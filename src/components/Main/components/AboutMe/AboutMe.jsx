import BlockHeader from '../BlockHeader/BlockHeader';
import Vitalik from 'assets/images/vitalik.png';
import BigLink from '../BigLink/BigLink';

const AboutMe = () => {
  const links = [
    { 
      name: 'Статичный сайт',
      link: 'https://rayn1998.github.io/russian-travel/',
    },
    {
      name: 'Адаптивный сайт',
      link: 'https://rayn1998.github.io/mesto/',
    }, {
      name: 'Одностраничное приложение',
      link: 'https://bodolanov-vfx.000webhostapp.com/',
    },
  ];
  return (
    <section className="about-me">
      <div className="about-me__container">
        <BlockHeader text="Студент" />
        {/* DESCRIPTION */}
        <div className="about-me__description">
          <div className="about-me__description-text-container">
            <h2 className="about-me__description-name">Виталий</h2>
            <p className="about-me__description-position">
              Фронтенд-разработчик, 30 лет
            </p>
            <p className="about-me__description-bio">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <span className="about-me__description-github">Github</span>
          </div>
          <img className="about-me__photo" src={Vitalik} alt="Photo" />
        </div>
        {/* PORTFOLIO */}
        <div className='about-me__portfolio'>
          <h3 className='about-me__portfolio-header'>Портфолио</h3>
          <ul className='about-me__portfolio-links'>
            {links.map((link, i) => {
              return (
                <BigLink 
                key={i} 
                text={link.name}
                link={link.link}
                border={i !== links.length - 1} 
                />
              )})
            }
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
