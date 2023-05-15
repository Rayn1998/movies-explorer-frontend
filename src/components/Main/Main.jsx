import Promo from 'components/Main/components/Promo/Promo';
import AboutMe from './components/AboutMe/AboutMe';
import AboutProject from './components/AboutProject/AboutProject';
import Techs from './components/Techs/Techs';
import Layout from 'components/Layout/Layout';

const Main = () => {
  return (
    <Layout footer>
      <main className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
    </Layout>
  );
};

export default Main;
