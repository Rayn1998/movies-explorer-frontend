import BlockHeader from '../BlockHeader/BlockHeader';

const AboutProject = () => {
  return (
    <section className="about-project">
      <div className="about-project__container">
        <BlockHeader text="О проекте" />
        {/* STEPS */}
        <div className="about-project__steps-wrapper">
          <div className="about-project__step">
            <h2 className="about-project__step-header">
              Дипломный проект включал 5 этапов
            </h2>
            <p className="about-project__step-text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="about-project__step">
            <h2 className="about-project__step-header">
              На выполнение диплома ушло 5 недель
            </h2>
            <p className="about-project__step-text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        {/* PROGRESS LINE */}
        <div className="about-project__progress">
          <div className="about-project__progress-step">
            <div className="about-project__progress-step-headers-wrapper">
              <div className="about-project__progress-step-header green">
                1 неделя
              </div>
              <div className="about-project__progress-step-header">
                4 недели
              </div>
            </div>
            <div className="about-project__progress-step-footers-wrapper">
              <p className="about-project__progress-step-footer">Back-end</p>
              <p className="about-project__progress-step-footer">Front-end</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
