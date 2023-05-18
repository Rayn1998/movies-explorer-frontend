import { useNavigate } from 'react-router-dom';

import logo from 'assets/images/header_logo.png';

const AuthHeader = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="auth-header">
      <img className="auth-header__img" onClick={() => navigate('/')} src={logo} alt="Logo" />
      <p className="auth-header__title">{title}</p>
    </div>
  );
};

export default AuthHeader;
