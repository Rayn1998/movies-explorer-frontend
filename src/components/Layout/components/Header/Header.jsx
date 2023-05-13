import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navigation from '../Navigation/Navigation';
import HeaderLogo from 'assets/images/header_logo.png';

const Header = () => {
  const menu = useSelector(state => state.menu.open);
  const navigation = useNavigate();
  const handleClickLogo = () => {
    navigation('/');
  }
  return (
    <div className="header" style={{
      visibility: menu ? 'hidden' : 'visible',
      opacity: menu ? 0 : 1,
      transition: 'all 0.3s ease-in-out',
    }}>
        <img src={HeaderLogo} alt="Logo" onClick={handleClickLogo} style={{cursor: 'pointer'}} />
        <Navigation />
    </div>
  );
};

export default Header;
