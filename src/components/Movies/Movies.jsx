import Layout from 'components/Layout/Layout';
import Search from './components/Search/Search';
import MoviesContainer from './components/MoviesContainer/MoviesContainer';
import SavedMoviesContainer from './components/SavedMoviesContainer/SavedMoviesContainer';

import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from 'redux/slices/moviesSlice';
import { setSavedMovies } from 'redux/slices/savedMoviesSlice';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { moviesApi } from 'utils/MoviesApi';
import { mainApi } from 'utils/MainApi';

const Movies = ({ errorHandler }) => {
  const movies = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();
  const location = useLocation();
  const [moviesLimiter, setMoviesLimiter] = useState(12);


  const handleAddClick = useCallback(() => {
    setMoviesLimiter((moviesLimiter) => moviesLimiter + 3);
  }, []);

  const longs = useRef();
  const shorts = useRef();
  const savedRef = useRef()

  useEffect(() => {
    mainApi
      .getMovies()
      .then((res) => {
        if (!res.message) {
          dispatch(setSavedMovies(res));
          savedRef.current = res;
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
          console.log(res);
          errorHandler(res.message);
          return;
        }
      })
      .catch((err) => {
        errorHandler(err.message);
      });
  }, []);

  const setShorts = useCallback((arr) => {
    shorts.current = arr.filter((movie) => movie.duration <= 40);
  }, []);

  useEffect(() => {
    const oldSave = JSON.parse(localStorage.getItem('foundMovies'));
    oldSave !== null && dispatch(setMovies(oldSave));
  }, []);

  return (
    <Layout footer>
      <div className="movies">
        <Search
          props={{
            errorHandler,
            savedRef,
            longs,
            shorts,
          }}
        />
        {location.pathname === '/movies' ? (
          <MoviesContainer props={{ movies, moviesLimiter, handleAddClick }} />
        ) : (
          location.pathname === '/saved' && <SavedMoviesContainer />
        )}
      </div>
    </Layout>
  );
};

export default Movies;
