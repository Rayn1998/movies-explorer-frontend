import { useCallback, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from 'redux/slices/moviesSlice';
import { setInput } from 'redux/slices/inputSlice';
import { setSavedMovies } from 'redux/slices/savedMoviesSlice';

import { moviesApi } from 'utils/MoviesApi';
import SearchSlider from './components/SearchSlider/SearchSlider';

const Search = ({ props }) => {
  const { errorHandler, longs, shorts, savedRef } = props;

  const dispatch = useDispatch();

  // Слайсы
  const input = useSelector((state) => state.input.input);
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

  const filterArray = (arr) => {
    return arr.filter((item) => {
      return (
        item.nameRU.toLowerCase().includes(input.toLowerCase()) ||
        item.nameEN.toLowerCase().includes(input.toLowerCase())
      );
    });
  };

  const filterArrayShort = (arr) => {
    return arr?.filter((item) => {
      return item.duration <= 40;
    });
  };

  // Search function
  // const search = useCallback(() => {
  //   // localStorage.setItem('originMovies', JSON.stringify(res));
  // }, [input]);

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

      // Получаю фильмы с bitfilms;
      moviesApi
        .getMovies()
        .then((res) => {
          const filtered = filterArray(res);
          dispatch(setMovies(filtered));
          localStorage.setItem('filteredMovies', JSON.stringify(filtered));
        })
        .catch((err) => {
          errorHandler(err.message);
          return;
        });
    },
    [slider]
  );

  // Return the saved movies when the search input is empty
  useEffect(() => {
    if (input === '') {
    }
  }, []);

  // Filter the short movies
  useEffect(() => {}, [slider]);

  // Show the errors
  useEffect(() => {
    errors.search && errorHandler(errors.search.message);
  }, [errors.search]);

  useEffect(() => {
    localStorage.setItem(
      'searchData',
      JSON.stringify({ searchInput: '', slider: slider })
    );
  }, []);



  useEffect(() => {
    console.log(input);
  }, [input]);


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
              onChange: (e) => dispatch(setInput(e.target.value)),
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
