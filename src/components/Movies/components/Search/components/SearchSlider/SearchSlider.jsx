const SearchSlider = ({ props }) => {
  const { shortMovies, setShortMovies } = props;

  const handleClick = () => {
    setShortMovies(!shortMovies);
  }

  return (
    <div 
      className="search-slider" 
      style={{
        backgroundColor: shortMovies ? '#3DDC84' : '#8B8B8B',
      }}
      onClick={handleClick}
    >
      <div 
        className="search-slider-circle"
        style={{
          right: shortMovies ? '0.2rem' : '1.8rem',
        }}
      ></div>
    </div>
  );
};

export default SearchSlider;