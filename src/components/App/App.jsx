import { useSelector, useDispatch } from 'react-redux';
import { onLoading, offLoading } from 'redux/slices/loadingSlice';

import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { setUser } from 'redux/slices/userSlice';
import { onError, offError } from 'redux/slices/errorPopupSlice';

import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import { mainApi } from 'utils/MainApi';

import Loading from 'components/Loading/Loading';
import Login from 'components/Auth/Login';
import Register from 'components/Auth/Register';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from 'components/SavedMovies/SavedMovies';
import Profile from 'components/Profile/Profile';
import PageNotFound from 'components/PageNotFound/PageNotFound';
import SmallMenu from 'components/Layout/components/Navigation/SmallMenu/SmallMenu';
import ErrorPopup from 'components/ErrorPopup/ErrorPopup';

function App() {
  const errorPopup = useSelector((state) => state.error);
  const menu = useSelector((state) => state.menu.open);
  const loading = useSelector((state) => state.loading.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onLoading());
    const token = localStorage.getItem('token');
    if (token !== null) {
      mainApi
        .checkToken(token)
        .then((res) => {
          dispatch(setUser(res));
          dispatch(offLoading());
          navigate('/movies');
        })
        .catch((err) => {
          dispatch(onError(err));
          setTimeout(() => {
            dispatch(offError());
          }, 10000);
        });
    } else {
      dispatch(offLoading());
    }
  }, [localStorage.getItem('token')]);

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
              element={<ProtectedRoute component={<Movies />} />}
            />
            <Route
              path="/saved"
              element={<ProtectedRoute component={<SavedMovies />} />}
            />
            <Route 
              path="/profile" 
              element={<ProtectedRoute component={<Profile />} />}
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
