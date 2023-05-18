import { useCallback, useState, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from 'redux/slices/userSlice';

import Layout from 'components/Layout/Layout';
import Field from './components/Field/Field';

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [editAvailable, setEditAvailable] = useState(0);

  const handleLogout = useCallback(() => {
    dispatch(setUser({}));
    localStorage.removeItem('token');
    navigate('/login');
  }, []);

  useEffect(() => {
    if (
      inputName !== user.name || inputEmail !== user.email 
    ) {
      setEditAvailable(true)
    } else {
      setEditAvailable(false);
    }
  }, [inputName, inputEmail]);

  useEffect(() => {
    setInputEmail(user.email);
    setInputName(user.name);
  }, [user]);
  return (
    <Layout>
      <div className="profile">
        <div className="profile__head-wrapper">
          <h2 className="profile__title">Привет, {user.name}!</h2>
          <form className="profile__form">
            <Field
              name={'Имя'}
              value={inputName}
              changeValue={setInputName}
              border
            />
            <Field
              name={'E-mail'}
              value={inputEmail}
              changeValue={setInputEmail}
            />
          </form>
        </div>
        <div className="profile__buttons">
          <p 
            className="profile__edit-btn" 
            style={{
              opacity: editAvailable ? 1 : 0.25,
              cursor: editAvailable ? 'pointer' : 'not-allowed',
              position: editAvailable ? 'relative' : 'static',
            }}
          >Редактировать</p>
          <p className="profile__exit-btn" onClick={handleLogout}>
            Выйти из аккаунта
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
