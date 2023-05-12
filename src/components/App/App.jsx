import { Routes, Route } from 'react-router-dom';

import Login from 'components/Auth/Login';
import Register from 'components/Auth/Register';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from 'components/SavedMovies/SavedMovies';
import Profile from 'components/Profile/Profile';
import PageNotFound from 'components/PageNotFound/PageNotFound';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
				<Route path='/' element={<Main />} />
				<Route path='/search' element={<Movies />} />
        <Route path='/saved' element={<SavedMovies />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
