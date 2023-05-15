import { useState } from "react";

const SearchSlider = () => {
  const [isClicked, setIcClicked] = useState(false);
  const handleClick = () => {
    setIcClicked(!isClicked);
  }
  return (
    <div 
      className="search-slider" 
      style={{
        backgroundColor: isClicked ? '#8B8B8B' : '#3DDC84',
      }}
      onClick={handleClick}
    >
      <div 
        className="search-slider-circle"
        style={{
          right: isClicked ? '1.8rem' : '0.2rem',
        }}
      ></div>
    </div>
  );
};

export default SearchSlider;