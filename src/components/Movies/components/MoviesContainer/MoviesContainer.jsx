import { useSelector } from 'react-redux';

import MovieCard from '../MovieCard/MovieCard';

const MoviesContainer = ({ props }) => {
  const { moviesLimiter, handleAddClick } = props;

  const movies = useSelector(state => state.movies.movies);
  return (
    <>
      {movies.length === 0 ? (
        <p className="movies__nothing-found">Ничего не найдено....</p>
      ) : (
        <div className="movies__container">
          {movies.map((movie, i) => {
            while (i < moviesLimiter) {
              return <MovieCard key={movie.id} props={movie} />;
            }
          })}
        </div>
      )}
      <div className="movies__add-more">
        <button
          className="movies__add-btn"
          onClick={handleAddClick}
          style={{
            display: moviesLimiter >= movies?.length ? 'none' : 'flex',
          }}
        >
          Ещё
        </button>
      </div>
    </>
  );
};

export default MoviesContainer;
