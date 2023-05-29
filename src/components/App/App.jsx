import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onLoading, offLoading } from 'redux/slices/loadingSlice';

import { useCallback, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { setUser } from 'redux/slices/userSlice';
import { offMenu } from 'redux/slices/menuSlice';
import { onError, offError } from 'redux/slices/errorPopupSlice';

import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import { mainApi } from 'utils/MainApi';

import Loading from 'components/Loading/Loading';
import Login from 'components/Auth/Login';
import Register from 'components/Auth/Register';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from 'components/Profile/Profile';
import PageNotFound from 'components/PageNotFound/PageNotFound';
import SmallMenu from 'components/Layout/components/Navigation/SmallMenu/SmallMenu';
import ErrorPopup from 'components/ErrorPopup/ErrorPopup';

function App() {
  const menu = useSelector((state) => state.menu.open);
  const loading = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();

  const [limitSize, setLimitSize] = useState(3);

  const errorHandler = useCallback((err) => {
    dispatch(onError(err));
    setTimeout(() => {
      dispatch(offError());
    }, 10000);
  }, []);

  useEffect(() => {
    dispatch(onLoading());
    const token = localStorage.getItem('token');
    if (token !== null) {
      mainApi
        .checkToken(token)
        .then((res) => {
          if (!res.message) {
            dispatch(setUser(res));
            dispatch(offLoading());
          } else {
            localStorage.removeItem('token');
            errorHandler(res.message);
            dispatch(offLoading());
          }
        })
        .catch((err) => {
          localStorage.removeItem('token');
          errorHandler(err.message);
        });
    } else {
      dispatch(offLoading());
    }
  }, []);

  const checkWidth = () => {
    setTimeout(() => {
      if (window.innerWidth <= 990) {
        setLimitSize(2);
      } else {
        dispatch(offMenu());
        setLimitSize(3);
      }
    }, 3000)
  }

  useEffect(() => {
    window.addEventListener('resize', checkWidth);
    return () => {
      window.removeEventListener('resize', checkWidth);
    }
  }, []);

  useEffect(() => {
    if (menu) {
      document.body.style.position = 'fixed';
    } else {
      document.body.style.position = 'static';
    }
  }, [menu]);
  return (
    <div className="app">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div
            className="menu-wrapper"
            style={{
              transform: menu ? 'translateX(0)' : 'translateX(700px)',
              visibility: menu ? 'visible' : 'hidden',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            <SmallMenu />
          </div>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  component={<Movies errorHandler={errorHandler} props={{
                    limitSize, setLimitSize
                  }} />}
                />
              }
            />
            <Route
              path="/saved"
              element={
                <ProtectedRoute
                  component={<Movies errorHandler={errorHandler} props={{
                    limitSize, setLimitSize
                  }} />}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  component={<Profile errorHandler={errorHandler} />}
                />
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </>
      )}

      <ErrorPopup />
    </div>
  );
}

export default App;
