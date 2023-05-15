import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RegularMenu from './RegularMenu/RegularMenu';
import MainMenu from './MainMenu/MainMenu';
import { onMenu } from 'redux/slices/menuSlice';

const Navigation = () => {
  const menu = useSelector(state => state.menu.open);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const [changeMenu, setChangeMenu] = useState(false);
  const handleRegisterClick = () => {
    navigation('/register');
  };
  const handleSignInClick = () => {
    navigation('/login');
  };
  const handleMoviesClick = () => {
    navigation('/movies');
  };
  const handleSavedMoviesClick = () => {
    navigation('/saved');
  };
  const handleProfileClick = () => {
    navigation('/profile');
  };
  const handleMenuClick = () => {
    dispatch(onMenu());
  }
  // If need to highlight active element - set the path value to object
  const menuItems = [
    { name: 'Фильмы', handleClick: handleMoviesClick },
    { name: 'Сохранённые фильмы', handleClick: handleSavedMoviesClick },
  ];

  useEffect(() => {
    window.addEventListener('resize', () => {
      window.innerWidth > 768 ? setChangeMenu(false) : setChangeMenu(true);
    });
  }, []);

  useEffect(() => {
    window.innerWidth > 768 ? setChangeMenu(false) : setChangeMenu(true);
    }, []);

  return (
    <div className="nav">
      {changeMenu && location.pathname !== '/'
        ? <div 
            className='small-menu__icon' 
            onClick={handleMenuClick} 
            style={{
              visibility: menu ? 'hidden' : 'visible',
              opacity: menu ? 0 : 1,
              transition: 'all 0.3s ease-in-out'
          }}></div>
        :
        (
         location.pathname === '/' ? (
        <RegularMenu
          props={{
            handleRegisterClick,
            handleSignInClick,
          }}
        />
      ) : (
        <MainMenu
          props={{
            handleMoviesClick,
            handleSavedMoviesClick,
            handleProfileClick,
            menuItems,
          }}
        />
      ))}
    </div>
  );
};

export default Navigation;
