import logo from 'assets/images/header_logo.png';

const AuthHeader = ({ title }) => {
  return (
    <div className="auth-header">
      <img className="auth-header__img" src={logo} alt="Logo" />
      <p className="auth-header__title">{title}</p>
    </div>
  );
};

export default AuthHeader;
