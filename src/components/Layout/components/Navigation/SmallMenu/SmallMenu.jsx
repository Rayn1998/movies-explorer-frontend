import { useDispatch } from 'react-redux';
import { offMenu } from 'redux/slices/menuSlice';
import { useNavigate } from 'react-router-dom';
import MainMenu from '../MainMenu/MainMenu';

const SmallMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCloseClick = () => {
    dispatch(offMenu());
  };
  const handleMainClick = () => {
    navigate('/');
    handleCloseClick();
  };
  const handleMoviesClick = () => {
    navigate('/movies');
    handleCloseClick();
  };
  const handleSavedMoviesClick = () => {
    navigate('/saved');
    handleCloseClick();
  };
  const handleProfileClick = () => {
    navigate('/profile');
    handleCloseClick();
  };
  const menuItems = [
    { name: 'Главная', handleClick: handleMainClick, path: '/' },
    { name: 'Фильмы', handleClick: handleMoviesClick, path: '/movies' },
    { name: 'Сохранённые фильмы', handleClick: handleSavedMoviesClick, path: '/saved' },
  ];
  return (
    <div className="small-menu">
      <div className="small-menu__close-icon" onClick={handleCloseClick}></div>
      <div className="small-menu__wrapper">
        <MainMenu
          props={{
            handleProfileClick,
            menuItems
          }}
        />
      </div>
    </div>
  );
};

export default SmallMenu;
