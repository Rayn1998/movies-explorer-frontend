import { useCallback } from 'react';
import AuthHeader from '../AuthHeader/AuthHeader';
import { useNavigate } from 'react-router-dom';

const AuthBase = ({
  title,
  handleSubmit,
  submitFunc,
  children,
  footerQuestion,
  footerBtn,
  footerLink,
}) => {
  const navigation = useNavigate();
  const handleBtnClick = () => {
    navigation(footerLink);
  };

  return (
    <div className="auth">
      <div className="auth__form-wrapper">
        <AuthHeader title={title} />
        <form className="auth__form" onSubmit={handleSubmit(submitFunc)}>
          {children}
        </form>
      </div>
      <div className="auth__footer-wrapper">
        <div className="auth__footer-block">
          <p className="auth__footer-question">{footerQuestion}</p>
          <p className="auth__footer-btn" onClick={handleBtnClick}>
            {footerBtn}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthBase;
