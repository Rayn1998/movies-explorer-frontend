import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from 'redux/slices/moviesSlice';
import {
  setSavedMovies,
} from 'redux/slices/savedMoviesSlice';

import SearchSlider from './components/SearchSlider/SearchSlider';

const Search = ({ props }) => {
  const { errorHandler, longs, shorts } = props;
  const [searchInput, setSearchInput] = useState('');

  const dispatch = useDispatch();
  const slider = useSelector((state) => state.slider.slider);

  // Taking search data from storage
  const initialField = () => {
    const data = JSON.parse(localStorage.getItem('searchData'));
    if (data !== null && data.searchInput) return data.searchInput;
  };

  // Defining the form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      search: initialField(),
    },
  });

  const filterArray = (arr, search) => {
    return arr.filter((item) => {
      return (
        item.nameRU.toLowerCase().includes(search.search.toLowerCase()) ||
        item.nameEN.toLowerCase().includes(search.search.toLowerCase())
      );
    });
  };

  // Search function
  const search = useCallback((search) => {
    if (search.search !== '') {
      const saved = JSON.parse(localStorage.getItem('saved'));
      let newMovies = [];
      let newShortMovies = [];
      let newSavedMovies = [];
      let newShortsSavedMovies = [];
      newMovies = filterArray(longs.current, search);
      newShortMovies = filterArray(shorts.current, search);
      newSavedMovies = filterArray(saved, search);
      newShortsSavedMovies = newSavedMovies.filter((movie) => movie.duration <= 40);
      if (slider) {
        dispatch(setMovies(newShortMovies));
        dispatch(setSavedMovies(newShortsSavedMovies));
      } else {
        dispatch(setMovies(newMovies));
        dispatch(setSavedMovies(newSavedMovies));
      }
      localStorage.setItem('movies', JSON.stringify({ movies: newMovies }));
      localStorage.setItem('shorts', JSON.stringify(newShortMovies));
      localStorage.setItem('saved', JSON.stringify(newSavedMovies));
      localStorage.setItem('shortsSaved', JSON.stringify(newShortsSavedMovies));
    }
  }, [slider]);

  // Submit Function
  const setSubmit = useCallback(
    (data) => {
      localStorage.setItem(
        'searchData',
        JSON.stringify({
          searchInput: data.search,
          slider: slider,
        })
      );

      search(data);
    },
    [slider]
  );

  // Return the saved movies when the search input is empty
  useEffect(() => {
    if (searchInput === '') {
      const localSaved = JSON.parse(localStorage.getItem('saved'));
      localSaved && dispatch(setSavedMovies(localSaved));
    }
  }, [searchInput, localStorage.getItem('saved')]);

  // Filter the short movies
  useEffect(() => {
    if (slider) {
      const shortMovies = JSON.parse(localStorage.getItem('shorts'));
      const shortSaved = JSON.parse(localStorage.getItem('shortsSaved'));

      if (shortMovies && shortSaved) {
        dispatch(setMovies(shortMovies));
        dispatch(setSavedMovies(shortSaved));
      }
    } else {
      const movies = JSON.parse(localStorage.getItem('movies'));
      const savedMovies = JSON.parse(localStorage.getItem('saved'));
      if (movies && savedMovies) {
        dispatch(setMovies(movies.movies));
        dispatch(setSavedMovies(savedMovies));
      }
    }
  }, [slider]);

  // Show the errors
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
