import AuthBase from './components/AuthBase/AuthBase';
import AuthField from './components/AuthField/AuthField';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  return (
    <AuthBase 
      title='Рады видеть!'
      submit={handleSubmit} 
      btnText="Войти" 
      footerQuestion='Ещё не зарегистрированы?'
      footerBtn='Регистрация'
    >
      <AuthField 
        title={'E-mail'} 
        props={{errors, reset}}
        register={{...register('email')}} 
      />
      <AuthField 
        title={'Пароль'} 
        props={{errors, reset}}
        register={{...register('password')}} 
      />
    </AuthBase>
  );
}

export default Login;
