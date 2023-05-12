import AuthHeader from '../AuthHeader/AuthHeader';

const Auth = ({ title, submit, children, btnText, footerQuestion, footerBtn }) => {
  return (
    <div className="auth">
      <AuthHeader title={title} />
      <form className='auth__form' onSubmit={submit}>{children}</form>
      <button className="auth__submit">{btnText}</button>
      <div className="auth__footer-block">
        <p className="auth__footer-question">{footerQuestion}</p>
        <p className="auth__footer-btn">{footerBtn}</p>
      </div>
    </div>
  );
};

export default Auth;
