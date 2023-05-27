import { useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";

import { sliderOn, sliderOff } from "redux/slices/searchSliderSlice";
import { setMovies } from "redux/slices/moviesSlice";
import { setSavedMovies } from "redux/slices/savedMoviesSlice";

import { filterArrayShort } from "utils/functions";

const SearchSlider = ({ filterArray }) => {
  const slider = useSelector(state => state.slider.slider);
  const input = useSelector(state => state.input.input);
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));
    const originSavedMovies = JSON.parse(localStorage.getItem('originSavedMovies'));
    const filteredSavedMovies = JSON.parse(localStorage.getItem('filteredSavedMovies'));
    const searchData = JSON.parse(localStorage.getItem('searchData'));
    if (slider) {
      dispatch(setMovies(filteredMovies));
      dispatch(sliderOff());

      if (filteredSavedMovies !== null) {
        if (input === '') {
          dispatch(setSavedMovies(originSavedMovies));
        } else {
          dispatch(setSavedMovies(filteredSavedMovies));
        }
      } else {
        if (searchData !== null && searchData.searchInput !== '') {
          const filteredSaved = filterArray(originSavedMovies);
          dispatch(setSavedMovies(filteredSaved));
        } else {
          dispatch(setSavedMovies(originSavedMovies));
        }
      }
      searchData.slider = false;
      localStorage.setItem('searchData', JSON.stringify(searchData));

    } else {
      if (filteredSavedMovies !== null) {
        if (input === '') {
          const shorts = filterArrayShort(originSavedMovies);
          dispatch(setSavedMovies(shorts));
        } else {
          const shorts = filterArrayShort(filteredSavedMovies);
          dispatch(setSavedMovies(shorts));
        }
      } else {
        if (searchData !== null && searchData.searchInput !== '') {
          const filteredSaved = filterArray(originSavedMovies)
          const filteredSavedMoviesShorts = filterArrayShort(filteredSaved);
          dispatch(setSavedMovies(filteredSavedMoviesShorts));
        } else {
          const savedMoviesShorts = filterArrayShort(originSavedMovies);
          dispatch(setSavedMovies(savedMoviesShorts));
        }
      }
      const filteredMoviesShorts = filterArrayShort(filteredMovies);
      dispatch(setMovies(filteredMoviesShorts));
      dispatch(sliderOn());
      searchData.slider = true;
      localStorage.setItem('searchData', JSON.stringify(searchData));

    }
  }, [slider, dispatch, filterArray]);

  return (
    <div 
      className="search-slider" 
      style={{
        backgroundColor: slider ? '#3DDC84' : '#8B8B8B',
      }}
      onClick={handleClick}
    >
      <div 
        className="search-slider-circle"
        style={{
          right: slider ? '0.2rem' : '1.8rem',
        }}
      ></div>
    </div>
  );
};

export default SearchSlider;