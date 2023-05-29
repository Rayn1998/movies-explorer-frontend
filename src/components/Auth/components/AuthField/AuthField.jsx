const AuthField = ({title, props, register}) => {
  const { errors, name } = props;
  return (
    <div className="auth-field">
      <p className="auth-field__name">{title}</p>
      <input 
        className="auth-field__input" 
        type={name} 
        {...register} 
        placeholder={title} 
        style={{
          outline: errors[name] ? '1px solid red' : 'none'
        }}
      />
      {errors[name] && <p className="auth__error">{errors[name].message}</p>}
    </div>
  );
}

export default AuthField;
