import Layout from 'components/Layout/Layout';
import Search from './components/Search/Search';
import MoviesContainer from './components/MoviesContainer/MoviesContainer';
import SavedMoviesContainer from './components/SavedMoviesContainer/SavedMoviesContainer';

import { useDispatch } from 'react-redux';
import { setSavedMovies } from 'redux/slices/savedMoviesSlice';
import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { moviesApi } from 'utils/MoviesApi';
import { mainApi } from 'utils/MainApi';

const Movies = ({ errorHandler }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [moviesLimiter, setMoviesLimiter] = useState(12);

  const handleAddClick = useCallback(() => {
    setMoviesLimiter((moviesLimiter) => moviesLimiter + 3);
  }, []);

  // При загрузке
  useEffect(() => {
    // Получаю сохраненные фильмы
    mainApi
      .getMovies()
      .then((res) => {
        if (!res.message) {
          dispatch(setSavedMovies(res));
          localStorage.setItem('originSavedMovies', JSON.stringify(res));
        } else {
          errorHandler(res.message);
          return;
        }
      })
      .catch((err) => {
        errorHandler(err.message);
      });
  }, []);

  return (
    <Layout footer>
      <div className="movies">
        <Search
          props={{
            errorHandler,
          }}
        />
        {location.pathname === '/movies' ? (
          <MoviesContainer props={{ moviesLimiter, handleAddClick }} />
        ) : (
          location.pathname === '/saved' && <SavedMoviesContainer />
        )}
      </div>
    </Layout>
  );
};

export default Movies;
