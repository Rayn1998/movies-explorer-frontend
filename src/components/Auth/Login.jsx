import AuthBase from './components/AuthBase/AuthBase';
import AuthField from './components/AuthField/AuthField';
import SubmitButton from './components/SubmitButton/SubmitButton';

import { useDispatch } from 'react-redux';
import { onError, offError } from 'redux/slices/errorPopupSlice';

import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { mainApi } from 'utils/MainApi';

import { emailCheck } from 'utils/regExpressions';

import { useState, useEffect, useCallback } from 'react';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [isButtonActive, setIsButtonActive] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setSubmit = useCallback((data) => {
    mainApi
      .login(data)
      .then((res) => {
        if (res.message) {
          dispatch(onError(res.message));
          setTimeout(() => {
            dispatch(offError());
          }, 10000);
        }
        navigate('/movies');
        localStorage.setItem('token', res.token);
      })
      .catch((err) => {
        dispatch(onError(err));
        setTimeout(() => {
          dispatch(offError());
        }, 10000);
      });
  }, []);

  useEffect(() => {
    localStorage.getItem('token') && navigate('/');
  }, []);

  useEffect(() => {
    inputEmail.length > 0 && inputPassword.length > 0
      ? setIsButtonActive(true)
      : setIsButtonActive(false);
  }, [inputEmail, inputPassword]);

  return (
    <AuthBase
      title="Рады видеть!"
      handleSubmit={handleSubmit}
      submitFunc={setSubmit}
      reset={reset}
      footerQuestion="Ещё не зарегистрированы?"
      footerBtn="Регистрация"
      footerLink="/register"
    >
      <AuthField
        title={'E-mail'}
        props={{
          errors,
          reset,
          name: 'email',
          state: getValues,
          setState: setInputEmail,
        }}
        register={{
          ...register('email', {
            required: 'Email is required',
            pattern: {
              value: emailCheck,
              message: 'Email is incorrect',
            },
            onChange: (e) => setInputEmail(e.target.value),
          }),
        }}
      />
      <AuthField
        title={'Пароль'}
        props={{
          errors,
          reset,
          name: 'password',
          state: getValues,
          setState: setInputPassword,
        }}
        register={{
          ...register('password', {
            required: 'Email is required',
            minLength: {
              value: 4,
              message: 'Minimum length of password is 4 symbols',
            },
            onChange: (e) => setInputPassword(e.target.value),
          }),
        }}
      />
      <SubmitButton btnText={'Войти'} isActive={isButtonActive} />
    </AuthBase>
  );
};

export default Login;
