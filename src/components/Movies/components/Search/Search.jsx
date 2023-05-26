import { useCallback, useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from 'redux/slices/moviesSlice';
import {
  filterSavedMovies,
  setSavedMovies,
} from 'redux/slices/savedMoviesSlice';

import SearchSlider from './components/SearchSlider/SearchSlider';

const Search = ({ props }) => {
  const { errorHandler, longs, shorts, savedRef } = props;
  const [searchInput, setSearchInput] = useState('');

  const dispatch = useDispatch();
  const slider = useSelector((state) => state.slider.slider);
  const saved = useSelector((state) => state.savedMovies.savedMovies);

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
  const search = useCallback(
    (search) => {
      const saved = JSON.parse(localStorage.getItem('saved'));
      // console.log(shorts, longs, saved);
      if (search.search !== '') {
        let newMovies = [];
        let newShortMovies = [];
        let newSavedMovies = [];
        let newShortsSavedMovies = [];
        newMovies = filterArray(longs.current, search);
        newShortMovies = filterArray(shorts.current, search);
        // newSavedMovies = filterArray(savedRef.current, search);
        dispatch(filterSavedMovies(search.search));
        newShortsSavedMovies = saved.filter(
          (movie) => movie.duration <= 40
        );
        if (slider) {
          dispatch(setMovies(newShortMovies));
          dispatch(setSavedMovies(newShortsSavedMovies));
        } else {
          dispatch(filterSavedMovies(''));
          dispatch(setMovies(newMovies));
          dispatch(setSavedMovies(newSavedMovies));
        }
        localStorage.setItem('movies', JSON.stringify({ movies: newMovies }));
        localStorage.setItem('shorts', JSON.stringify(newShortMovies));
        // localStorage.setItem('saved', JSON.stringify(newSavedMovies));
        localStorage.setItem(
          'shortsSaved',
          JSON.stringify(newShortsSavedMovies)
        );
      }
    },
    [slider, savedRef, longs, shorts]
  );

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
      // if (savedRef.current?.length > 0) {
      // console.log(savedRef.current);
      // dispatch(setSavedMovies(savedRef.current));
      // localStorage.setItem('saved', JSON.stringify(savedRef.current));
    }
  }, [searchInput]);

  // Filter the short movies
  useEffect(() => {
    if (slider) {
      if (searchInput === '') {
        // console.log('here')
        // console.log(searchInput)
        // console.log(savedRef.current)
        const shortsFilter = saved.filter((movie) => movie.duration <= 40);
        // console.log(shortsFilter);
        dispatch(setSavedMovies(shortsFilter));
        return;
      }
      const shortMovies = JSON.parse(localStorage.getItem('shorts'));
      const shortSaved = JSON.parse(localStorage.getItem('shortsSaved'));

      if (shortMovies && shortSaved) {
        dispatch(setMovies(shortMovies));
        dispatch(setSavedMovies(shortSaved));
      } else {
        const saved = JSON.parse(localStorage.getItem('saved'));
        const newSavedShorts = saved.filter((movie) => movie.duration <= 40);
        dispatch(setSavedMovies(newSavedShorts));
      }
    } else {
      const movies = JSON.parse(localStorage.getItem('movies'));
      const savedMovies = JSON.parse(localStorage.getItem('saved'));
      if (movies && savedMovies) {
        dispatch(setMovies(movies.movies));
        dispatch(setSavedMovies(savedMovies));
      } else if (savedMovies) {
        dispatch(setSavedMovies(savedRef.current));
      }
    }
  }, [slider, searchInput]);

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
