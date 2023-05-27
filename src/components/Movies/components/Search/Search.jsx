import { useCallback, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { useSelector, useDispatch } from 'react-redux';
import { onLoading, offLoading } from 'redux/slices/loadingSlice';
import { setMovies } from 'redux/slices/moviesSlice';
import { setInput } from 'redux/slices/inputSlice';
import { setSavedMovies } from 'redux/slices/savedMoviesSlice';

import { moviesApi } from 'utils/MoviesApi';
import SearchSlider from './components/SearchSlider/SearchSlider';

import { filterArrayShort } from 'utils/functions';

const Search = ({ errorHandler }) => {
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

  // Submit Function
  const setSubmit = useCallback((data) => {
    localStorage.setItem(
      'searchData',
      JSON.stringify({
        searchInput: data.search,
        slider,
      })
    );
    dispatch(onLoading());

    // Получаю фильмы с bitfilms;
    moviesApi
      .getMovies()
      .then((res) => {
        const originSavedMovies = JSON.parse(
          localStorage.getItem('originSavedMovies')
        );
        const filtered = filterArray(res);
        const filteredSaved = filterArray(originSavedMovies);
        const filteredShorts = filterArrayShort(filtered);
        const filteredSavedShorts = filterArrayShort(filteredSaved);
        if (slider) {
          dispatch(setMovies(filteredShorts));
          dispatch(setSavedMovies(filteredSavedShorts));
        } else {
          dispatch(setMovies(filtered));
          dispatch(setSavedMovies(filteredSaved));
        }
        // Решил еще одну переменную в хранилище создать
        localStorage.setItem('filteredSavedMovies', JSON.stringify(filteredSaved));
        //
        localStorage.setItem('filteredMovies', JSON.stringify(filtered));
        dispatch(offLoading());
      })
      .catch((err) => {
        dispatch(offLoading());
        errorHandler(err.message);
        return;
      });
    }, [slider, filterArray]);

  // Return the saved movies when the search input is empty
  useEffect(() => {
    const originSavedMovies = JSON.parse(
      localStorage.getItem('originSavedMovies')
    );
    const filteredSavedMovies = JSON.parse(
      localStorage.getItem('filteredSavedMovies')
    );
    if (input === '') {
      if (slider) {
        console.log('1');
        const shorts = filterArrayShort(originSavedMovies);
        dispatch(setSavedMovies(shorts));
      } else {
        console.log('2');
        dispatch(setSavedMovies(originSavedMovies));
      }
    } else {
      if (slider) {
        console.log('3');
        const shorts = filterArrayShort(filteredSavedMovies);
        dispatch(setSavedMovies(shorts));
      } else {
        console.log('4');
        dispatch(setSavedMovies(filteredSavedMovies));
      }
    }
  }, [input]);


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
              value: input,
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
          <SearchSlider filterArray={filterArray} />
        </div>
      </div>
      <div className="search__divider"></div>
    </div>
  );
};

export default Search;
