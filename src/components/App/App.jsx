import { useSelector } from 'react-redux';

import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from 'components/Auth/Login';
import Register from 'components/Auth/Register';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from 'components/SavedMovies/SavedMovies';
import Profile from 'components/Profile/Profile';
import PageNotFound from 'components/PageNotFound/PageNotFound';
import SmallMenu from 'components/Layout/components/Navigation/SmallMenu/SmallMenu';

function App() {
  const menu = useSelector((state) => state.menu.open);
  useEffect(() => {
    if (menu) {
      document.body.style.position = 'fixed';
    } else {
      document.body.style.position = 'static';
    }
  }, [menu]);
  return (
    <div className="app">
      <div
        className="menu-wrapper"
        style={{
          transform: menu ? 'translateX(0)' : 'translateX(700px)',
          visibility: menu ? 'visible' : 'hidden',
          transition: 'all 0.3s ease-in-out',
        }}
      ><SmallMenu />
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
