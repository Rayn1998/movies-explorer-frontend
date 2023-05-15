import accountIcon from 'assets/images/icon_acc.png';
import Button from '../RegularMenu/Button';

const MainMenu = ({ props }) => {
  const { handleProfileClick, menuItems } = props;
  
  return (
    <div className="nav-movies">
      <div className="nav-movies__btns">
        {menuItems.map((item, i) => (
          <Button key={i} props={item} />
        ))}
      </div>
      <div className="nav-account__wrapper" onClick={handleProfileClick}>
        <img src={accountIcon} alt="Account icon" />
        <button className="nav-account" style={{ cursor: 'pointer' }}>
          Аккаунт
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
