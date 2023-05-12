import SearchSlider from "./components/SearchSlider/SearchSlider";

const Search = () => {
  return (
    <div className="search">
      <div className="search__content">
        <div className="search__input-wrapper">
          <input className="search__input" />
          <div className="search__input-btn"></div>
        </div>
        <div className="search__slider-wrapper">
          <p className="search__slider-title">Короткометражки</p>
          <SearchSlider />
        </div>
      </div>
      <div className="search__divider"></div>
    </div>
  )
}

export default Search;