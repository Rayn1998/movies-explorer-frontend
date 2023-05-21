import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from 'redux/slices/userSlice';
import { onError, offError } from 'redux/slices/errorPopupSlice';

import { emailCheck } from 'utils/regExpressions';
import { mainApi } from 'utils/MainApi';
import Layout from 'components/Layout/Layout';
import Field from './components/Field/Field';

const Profile = ({ errorHandler }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [editAvailable, setEditAvailable] = useState(0);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const setSubmit = useCallback((data) => {
    mainApi
      .updateUser(data)
      .then((res) => {
        if (res.message) {
          dispatch(onError(res.message));
          setTimeout(() => {
            dispatch(offError());
          }, 10000);
        } else {
          errorHandler('Refreshed');
          dispatch(setUser(res));
        }
      })
      .catch(() => {
        errorHandler('Server error...');
      });
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(setUser({}));
    localStorage.removeItem('token');
    navigate('/login');
  }, []);

  useEffect(() => {
    if (
      (inputName !== user.name && inputName !== '') ||
      (inputEmail !== user.email && inputEmail !== '')
    ) {
      setEditAvailable(true);
    } else {
      setEditAvailable(false);
    }
  }, [inputName, inputEmail, user]);

  useEffect(() => {
    setInputEmail(user.email);
    setInputName(user.name);
  }, [user]);

  useEffect(() => {
    errors.name && errorHandler(errors.name.message);
    errors.email && errorHandler(errors.email.message);
  }, [errors]);
  return (
    <Layout>
      <div className="profile">
        <div className="profile__head-wrapper">
          <h2 className="profile__title">Привет, {user.name}!</h2>
          <form className="profile__form" onSubmit={handleSubmit(setSubmit)}>
            <Field
              name={'Имя'}
              border
              register={{
                ...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 3,
                    message: 'Minimum length of name is 3 symbols',
                  },
                  value: user.name,
                  onChange: (e) => setInputName(e.target.value),
                }),
              }}
            />
            <Field
              name={'E-mail'}
              register={{
                ...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: emailCheck,
                    message: 'Email is incorrect',
                  },
                  value: user.email,
                  onChange: (e) => setInputEmail(e.target.value),
                }),
              }}
            />
          </form>
        </div>
        <div className="profile__buttons">
          <button
            type="submit"
            onClick={handleSubmit(setSubmit)}
            className="profile__edit-btn"
            disabled={!editAvailable}
            style={{
              opacity: editAvailable ? 1 : 0.25,
              cursor: editAvailable ? 'pointer' : 'not-allowed',
              position: editAvailable ? 'relative' : 'static',
            }}
          >
            Редактировать
          </button>
          <p className="profile__exit-btn" onClick={handleLogout}>
            Выйти из аккаунта
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
