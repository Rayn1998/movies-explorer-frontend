import Promo from 'components/Main/components/Promo/Promo';
import AboutMe from './components/AboutMe/AboutMe';
import AboutProject from './components/AboutProject/AboutProject';
import Techs from './components/Techs/Techs';
import Layout from './layout/Layout';

const Main = () => {
  return (
    <Layout>
      <div className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
      </div>
    </Layout>
  );
};

export default Main;
