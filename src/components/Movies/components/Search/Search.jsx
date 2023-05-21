import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import SearchSlider from './components/SearchSlider/SearchSlider';

const Search = ({ props }) => {
  const { setSearchInput, errorHandler } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const setSubmit = useCallback((data) => {
    setSearchInput(data.search);
  }, []);

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
