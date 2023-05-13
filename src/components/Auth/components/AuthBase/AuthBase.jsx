import AuthHeader from '../AuthHeader/AuthHeader';
import { useNavigate } from 'react-router-dom';

const Auth = ({ title, submit, children, btnText, footerQuestion, footerBtn, footerLink }) => {
  const navigation = useNavigate();
  const handleBtnClick = () => {
    navigation(footerLink);
  }
  return (
    <div className="auth">
      <AuthHeader title={title} />
      <form className='auth__form' onSubmit={submit}>{children}</form>
      <button className="auth__submit">{btnText}</button>
      <div className="auth__footer-block">
        <p className="auth__footer-question">{footerQuestion}</p>
        <p className="auth__footer-btn" onClick={handleBtnClick} >{footerBtn}</p>
      </div>
    </div>
  );
};

export default Auth;
