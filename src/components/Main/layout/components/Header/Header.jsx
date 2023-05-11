import HeaderLogo from 'assets/images/header_logo.png';

const Header = () => {
  return (
    <div className="header">
      {/* <div className="header__container"> */}
        <img src={HeaderLogo} alt="Logo" />
      {/* </div> */}
    </div>
  );
};

export default Header;
