const AuthField = ({title, props, register}) => {
  const { errors, reset } = props;
  return (
    <div className="auth-field">
      <p className="auth-field__name">{title}</p>
      <input className="auth-field__input" register />
    </div>
  );
}

export default AuthField;
