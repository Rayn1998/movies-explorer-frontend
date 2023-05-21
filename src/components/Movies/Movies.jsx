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
  const slider = useSelector((state) => state.slider.slider);
  const dispatch = useDispatch();
  const location = useLocation();
  const [moviesLimiter, setMoviesLimiter] = useState(12);
  const [searchInput, setSearchInput] = useState('');

  const handleAddClick = useCallback(() => {
    setMoviesLimiter((moviesLimiter) => moviesLimiter + 3);
  }, []);

  const longs = useRef();
  const shorts = useRef();

  useEffect(() => {
    mainApi
      .getMovies()
      .then((res) => {
        dispatch(setSavedMovies(res));
        moviesApi
          .getMovies()
          .then((res) => {
            longs.current = res;
            setShorts(res);
          })
          .catch((err) => {
            errorHandler(err.message);
          });
      })
      .catch((err) => {
        errorHandler(err.message);
      });
  }, []);

  const setShorts = useCallback((arr) => {
    shorts.current = arr.filter((movie) => movie.duration <= 40);
  }, []);

  const filterArray = (data) => {
    return data.filter((item) => {
      return (
        item.nameRU.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.nameEN.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
  };

  useEffect(() => {
    let newMovies = [];
    if (slider && searchInput !== '') {
      newMovies = filterArray(shorts.current);
      dispatch(setMovies(newMovies));
    } else if (!slider && searchInput !== '') {
      newMovies = filterArray(longs.current);
      dispatch(setMovies(newMovies));
    } else {
      dispatch(setMovies([]));
    }
  }, [searchInput, slider]);

  return (
    <Layout footer>
      <div className="movies">
        <Search
          props={{
            setSearchInput,
            errorHandler,
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
