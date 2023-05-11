import BlockHeader from '../BlockHeader/BlockHeader';
import LittleBlock from '../LittleBlock/LittleBlock';

const Techs = () => {
  const technologies = [
    'HTML',
    'CSS',
    'JS',
    'React',
    'Git',
    'Express.js',
    'mongoDB',
  ];
  return (
    <div className="techs">
      <BlockHeader text="Технологии" />
      <div className="techs__content">
        <h2 className="techs__title">7 технологий</h2>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <div className="techs__blocks-container">
          {technologies.map((tech, i) => <LittleBlock key={i} text={tech} /> )}
        </div>
      </div>
    </div>
  );
};

export default Techs;
