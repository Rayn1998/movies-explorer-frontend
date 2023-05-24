import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from 'redux/slices/moviesSlice';
import { setSavedMovies } from 'redux/slices/savedMoviesSlice';

import SearchSlider from './components/SearchSlider/SearchSlider';

const Search = ({ props }) => {
  const { errorHandler, savedRef, longs, shorts } = props;
  const [searchInput, setSearchInput] = useState('');

  const location = useLocation();
  const dispatch = useDispatch();
  const slider = useSelector((state) => state.slider.slider);

  const initialField = () => {
    const data = JSON.parse(localStorage.getItem('searchData'));
    if (data !== null && data.searchInput) return data.searchInput;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      search: initialField(),
    },
  });

  const setSubmit = useCallback(
    (data) => {
      let newMovies = [];

      const filterArray = (arr) => {
        return arr.filter((item) => {
          return (
            item.nameRU.toLowerCase().includes(data.search.toLowerCase()) ||
            item.nameEN.toLowerCase().includes(data.search.toLowerCase())
          );
        });
      };

      if (location.pathname === '/movies') {
        localStorage.setItem(
          'searchData',
          JSON.stringify({
            searchInput: data.search,
            slider: slider,
          })
        );
        if (slider && data.search !== '') {
          newMovies = filterArray(shorts.current);
          dispatch(setMovies(newMovies));
          localStorage.setItem('foundMovies', JSON.stringify(newMovies));
        } else if (!slider && data.search !== '') {
          newMovies = filterArray(longs.current);
          dispatch(setMovies(newMovies));
          localStorage.setItem('foundMovies', JSON.stringify(newMovies));
        } else {
          dispatch(setMovies([]));
        }
      } else if (location.pathname === '/saved') {
        if (data.search !== '') {
          newMovies = filterArray(savedRef.current);
          dispatch(setSavedMovies(newMovies));
        } else {
          dispatch(setSavedMovies(savedRef.current));
          return;
        }
      }
    },
    [slider, location]
  );

  useEffect(() => {
    (searchInput === '' && savedRef.current) && dispatch(setSavedMovies(savedRef.current));
  }, [searchInput]);

  useEffect(() => {
    errors.search && errorHandler(errors.search.message);
  }, [errors.search]);

  return (
    <div className="search">
      <div className="search__content">
        <form
          onSubmit={handleSubmit(setSubmit)}
          className="search__input-wrapper"
        >
          <input
            className="search__input"
            {...register('search', {
              required: 'Enter some data for searching...',
              onChange: (e) => setSearchInput(e.target.value),
            })}
            style={{
              outline: errors.search?.message ? '0.1rem solid red' : '',
            }}
          />
          <button type="submit" className="search__input-btn"></button>
        </form>
        <div className="search__slider-wrapper">
          <p className="search__slider-title">Короткометражки</p>
          <SearchSlider />
        </div>
      </div>
      <div className="search__divider"></div>
    </div>
  );
};

export default Search;
