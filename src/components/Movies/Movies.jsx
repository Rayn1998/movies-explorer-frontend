import Layout from 'components/Layout/Layout';
import Search from './components/Search/Search';
import MoviesContainer from './components/MoviesContainer/MoviesContainer';
import SavedMoviesContainer from './components/SavedMoviesContainer/SavedMoviesContainer';

import { useDispatch } from 'react-redux';
import { setSavedMovies } from 'redux/slices/savedMoviesSlice';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { moviesApi } from 'utils/MoviesApi';
import { mainApi } from 'utils/MainApi';
import { setMovies } from 'redux/slices/moviesSlice';

const Movies = ({ errorHandler }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [moviesLimiter, setMoviesLimiter] = useState(12);

  const handleAddClick = useCallback(() => {
    setMoviesLimiter((moviesLimiter) => moviesLimiter + 3);
  }, []);

  const longs = useRef();
  const shorts = useRef();
  const savedRef = useRef();

  const setShorts = useCallback((arr) => {
    shorts.current = arr.filter((movie) => movie.duration <= 40);
  }, []);

  // При загрузке
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('movies'));
    if (savedData !== null) {
      dispatch(setMovies(savedData.movies));
    }

    // Получаю сохраненные фильмы
    mainApi
      .getMovies()
      .then((res) => {
        if (!res.message) {
          // console.log(res);
          dispatch(setSavedMovies(res));
          savedRef.current = res;
          localStorage.setItem('saved', JSON.stringify(res));
          
          // Получаю фильмы с bitfilms;
          moviesApi
            .getMovies()
            .then((res) => {
              longs.current = res;
              setShorts(res);
            })
            .catch((err) => {
              errorHandler(err.message);
            });
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
            longs,
            shorts,
            savedRef,
          }}
        />
        {location.pathname === '/movies' ? (
          <MoviesContainer props={{ moviesLimiter, handleAddClick, longs, savedRef }} />
        ) : (
          location.pathname === '/saved' && <SavedMoviesContainer savedRef={savedRef} />
        )}
      </div>
    </Layout>
  );
};

export default Movies;
