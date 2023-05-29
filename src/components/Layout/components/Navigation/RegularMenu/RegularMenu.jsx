const RegularMenu = ({ props }) => {
  const { handleRegisterClick, handleSignInClick } = props;
  return (
    <div>
      <div className="nav-auth">
        <button className="nav-button" onClick={handleRegisterClick}>
          Регистрация
        </button>
        <button className="nav-signin" onClick={handleSignInClick}>
          Войти
        </button>
      </div>
      
    </div>
  );
};

export default RegularMenu;
