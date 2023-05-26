const search = useCallback(
  (search) => {
    const inputFilms = JSON.parse(localStorage.getItem('inputFilms'));
    const inputSavedFilms = JSON.parse(
      localStorage.getItem('inputSavedFilms')
    );

    // Фильтрую
    if (search.search !== '') {
      let filteredFilms = [];
      let filteredFilmsShort = [];
      let filteredSavedFilms = [];
      let filteredSavedFilmsShort = [];

      filteredFilms = filterArray(inputFilms, search);
      filteredFilmsShort = filterArrayShort(filteredFilms);
      filteredSavedFilms = filterArray(inputSavedFilms, search);
      filteredSavedFilmsShort = filterArrayShort(filteredSavedFilms);

      if (slider) {
        dispatch(setMovies(filteredFilmsShort));
        dispatch(setSavedMovies(filteredSavedFilmsShort));
      } else {
        dispatch(setMovies(filteredFilms));
        dispatch(setSavedMovies(filteredSavedFilmsShort));
      }

      // Записываю всё в хранилище, откуда буду брать для рендера
      localStorage.setItem('filteredFilms', JSON.stringify(filteredFilms));
      localStorage.setItem(
        'filteredFilmsShort',
        JSON.stringify(filteredFilmsShort)
      );
      localStorage.setItem(
        'filteredSavedFilms',
        JSON.stringify(filteredSavedFilms)
      );
      localStorage.setItem(
        'filteredSavedFilmsShort',
        JSON.stringify(filteredSavedFilmsShort)
      );
    }
  },
  [slider, savedRef, longs, shorts]
);









/////////////////////// MOVIES.js

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
          const shorts = res.filter(movie => movie.duration <= 40);
          localStorage.setItem('inputSavedFilms', JSON.stringify(res));
          localStorage.setItem('filteredSavedFilmsShort', JSON.stringify(shorts));

          
          // Получаю фильмы с bitfilms;
          moviesApi
            .getMovies()
            .then((res) => {
              localStorage.setItem('inputFilms', JSON.stringify(res));
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














// Filter the short movies
useEffect(() => {
  const searchData = JSON.parse(localStorage.getItem('searchData'));
  const filteredFilms = JSON.parse(localStorage.getItem('filteredFilms'));
  const filteredFilmsShort = JSON.parse(
    localStorage.getItem('filteredFilmsShort')
  );
  const filteredSavedFilms = JSON.parse(
    localStorage.getItem('filteredSavedFilms')
  );
  const filteredSavedFilmsShort = JSON.parse(
    localStorage.getItem('filteredSavedFilmsShort')
  );
  const inputSavedFilms = JSON.parse(
    localStorage.getItem('inputSavedFilms')
  );
  if (slider) {
    if (searchInput === '') {
      if (filteredSavedFilmsShort !== null) {
        dispatch(setSavedMovies(filteredSavedFilmsShort));
      } else {
        const filtered = inputSavedFilms.filter(
          (movie) => movie.duration <= 40
        );
        console.log(filtered);
        dispatch(setSavedMovies(filtered));
      }
      return;
    } else {
      if (filteredFilmsShort !== null) {
        dispatch(setMovies(filteredFilmsShort));
      }
      if (filteredSavedFilmsShort !== null) {
        dispatch(setSavedMovies(filteredSavedFilmsShort));
      } else {
        dispatch(setSavedMovies(inputSavedFilms));
      }
    }
    if (searchData !== null) {
      searchData.slider = true;
      localStorage.setItem('searchData', JSON.stringify(searchData));
    }
  } else {
    if (searchInput === '') {
      if (inputSavedFilms !== null) {
          dispatch(setSavedMovies(inputSavedFilms));
        }
    }
    if (filteredFilms !== null && filteredSavedFilms !== null) {
      dispatch(setMovies(filteredFilms));
      dispatch(setSavedMovies(filteredSavedFilms));
    } 
    // else if (filteredSavedFilms !== null) {
    //   dispatch(setSavedMovies(filteredSavedFilms));
    // } else if (inputSavedFilms !== null) {
    //   dispatch(setSavedMovies(inputSavedFilms));
    // }
    if (searchData !== null) {
      searchData.slider = false;
      localStorage.setItem('searchData', JSON.stringify(searchData));
    }
  }
}, [slider, searchInput]);