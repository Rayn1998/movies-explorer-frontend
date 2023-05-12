import AuthBase from './components/AuthBase/AuthBase';
import AuthField from './components/AuthField/AuthField';
import { useForm } from 'react-hook-form';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  return (
    <AuthBase
      title="Добро пожаловать!"
      submit={handleSubmit}
      btnText="Зарегистрироваться"
      footerQuestion="Уже зарегистрированы?"
      footerBtn="Войти"
    >
      <AuthField
        title={'Имя'}
        props={{ errors, reset }}
        register={{ ...register('name') }}
      />
      <AuthField
        title={'E-mail'}
        props={{ errors, reset }}
        register={{ ...register('email') }}
      />
      <AuthField
        title={'Пароль'}
        props={{ errors, reset }}
        register={{ ...register('password') }}
      />
    </AuthBase>
  );
};

export default Register;
