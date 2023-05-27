import Layout from 'components/Layout/Layout';
import Search from './components/Search/Search';
import MoviesContainer from './components/MoviesContainer/MoviesContainer';
import SavedMoviesContainer from './components/SavedMoviesContainer/SavedMoviesContainer';

import { useDispatch, useSelector } from 'react-redux';
import { setMovies } from 'redux/slices/moviesSlice';
import { setSavedMovies } from 'redux/slices/savedMoviesSlice';
import { sliderOn, sliderOff } from "redux/slices/searchSliderSlice";

import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { mainApi } from 'utils/MainApi';

import { filterArrayShort } from 'utils/functions';

const Movies = ({ errorHandler }) => {

  const slider = useSelector(state => state.slider.slider);

  const dispatch = useDispatch();
  const location = useLocation();
  const [moviesLimiter, setMoviesLimiter] = useState(12);

  const handleAddClick = useCallback(() => {
    setMoviesLimiter((moviesLimiter) => moviesLimiter + 3);
  }, []);

  // ТОЛЬКО ПРИ ЗАГРУЗКЕ
  /////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('searchData'));
    const originSavedMovies = JSON.parse(localStorage.getItem('originSavedMovies'));
    const filteredSavedMovies = JSON.parse(localStorage.getItem('filteredSavedMovies'));
    const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));

    // Устанавливаю сохранённое значение слайдера
    if (data !== null && data.slider) {
      dispatch(sliderOn());
    } else if (data !== null && !data.slider) {
      dispatch(sliderOff());
    } else {
      localStorage.setItem('searchData', JSON.stringify({
          searchInput: '',
          slider: false,
        })
      );
    }
    // Получаю сохраненные фильмы, если они не были сохранены
    if (filteredSavedMovies !== null) {
      if (slider) {
        const filtered = filterArrayShort(filteredSavedMovies);
        dispatch(setSavedMovies(filtered));
      } else {
        dispatch(setSavedMovies(filteredSavedMovies));
      }
      return;
    }
    if (originSavedMovies !== null && originSavedMovies.length > 0) {
      dispatch(setSavedMovies(originSavedMovies));
      return;
    } else {
      mainApi
        .getMovies()
        .then((res) => {
          if (!res.message) {
            if (slider) {
              const shorts = filterArrayShort(res);
              dispatch(setSavedMovies(shorts));
            } else {
              dispatch(setSavedMovies(res));
            }
            localStorage.setItem('originSavedMovies', JSON.stringify(res));
          } else {
            errorHandler(res.message);
            return;
          }
        })
        .catch((err) => {
          errorHandler(err.message);
        });
    }

    // Получаю отфильтрованные фильмы, если они не были сохранены
    if (filteredMovies !== null && filteredMovies.length > 0) {
      if (slider) {
        const shorts = filterArrayShort(filteredMovies);
        dispatch(setMovies(shorts));
      } else {
        dispatch(setMovies(filteredMovies));
      }
    }
  }, []);
  /////////////////////////////////////////////////////////////////////////////

  return (
    <Layout footer>
      <div className="movies">
        <Search errorHandler={errorHandler} />
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
