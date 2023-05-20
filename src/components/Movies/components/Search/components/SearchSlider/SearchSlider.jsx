import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sliderOn, sliderOff } from "redux/slices/searchSliderSlice";

const SearchSlider = () => {
  const slider = useSelector(state => state.slider.slider);
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    if (slider) {
      dispatch(sliderOff());
    } else {
      dispatch(sliderOn())
    }
  }, [slider]);

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