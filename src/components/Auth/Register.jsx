import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { offError, onError } from 'redux/slices/errorPopupSlice';
import { setUser } from 'redux/slices/userSlice';

import { useForm } from 'react-hook-form';

import { emailCheck } from 'utils/regExpressions';

import AuthBase from './components/AuthBase/AuthBase';
import AuthField from './components/AuthField/AuthField';
import SubmitButton from './components/SubmitButton/SubmitButton';
import { mainApi } from 'utils/MainApi';

const Register = () => {
  const user = useSelector((state) => state.user.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [isButtonActive, setIsButtonActive] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setSubmit = useCallback((data) => {
    reset();
    mainApi
      .register(data)
      .then(() => {
        const { name, ...rest } = data;
        mainApi
          .login(rest)
          .then((res) => {
            localStorage.setItem('token', res.token);
            mainApi
              .checkToken(res)
              .then((res) => {
                dispatch(setUser(res));
                navigate('/movies');
              })
              .catch((err) => {
                dispatch(onError(err));
                setTimeout(() => {
                  dispatch(offError());
                }, 10000);
              });
          })
          .catch((err) => {
            dispatch(onError(err));
            setTimeout(() => {
              dispatch(offError());
            }, 10000);
          });
      })
      .catch((err) => {
        dispatch(onError(err));
        setTimeout(() => {
          dispatch(offError());
        }, 10000);
      });
  }, []);

  useEffect(() => {
    inputName.length > 0 && inputEmail.length > 0 && inputPassword.length > 0
      ? setIsButtonActive(true)
      : setIsButtonActive(false);
  }, [inputEmail, inputName, inputPassword]);

  return (
    <AuthBase
      title="Добро пожаловать!"
      handleSubmit={handleSubmit}
      submitFunc={setSubmit}
      reset={reset}
      footerQuestion="Уже зарегистрированы?"
      footerBtn="Войти"
      footerLink="/login"
    >
      <AuthField
        title={'Имя'}
        props={{
          errors,
          reset,
          name: 'name',
          state: getValues,
          setState: setInputName,
        }}
        register={{
          ...register('name', {
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Minimum length of name is 3 symbols',
            },
            onChange: (e) => setInputName(e.target.value),
          }),
        }}
      />
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
            required: 'Password is required',
            minLength: {
              value: 4,
              message: 'Minimum length of password is 4 symbols',
            },
            onChange: (e) => setInputPassword(e.target.value),
          }),
        }}
      />
      <SubmitButton btnText={'Регистрация'} isActive={isButtonActive} />
    </AuthBase>
  );
};

export default Register;
