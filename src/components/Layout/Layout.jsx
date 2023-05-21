import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const Layout = ({ footer, children }) => {

  return (
    <>
      <Header />
      {children}
      {footer && <Footer />}
    </>
  );
};

export default Layout;