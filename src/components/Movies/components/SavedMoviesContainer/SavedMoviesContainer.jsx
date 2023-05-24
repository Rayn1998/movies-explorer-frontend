import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import MovieCard from '../MovieCard/MovieCard';

const SavedMoviesContainer = () => {
  const savedMovies = useSelector((state) => state.savedMovies.savedMovies);
  const savedRef = useRef();
  savedRef.current = savedMovies;

  useEffect(() => {
    console.log(savedMovies);
  }, [savedMovies]);

  return (
    <>
      {savedMovies.length === 0 ? (
        <p className="movies__nothing-found">Ничего нет</p>
      ) : (
        <div className="saved-movies">
          {savedMovies.map((movie) => {
            return <MovieCard key={movie.movieId} props={movie} />;
          })}
        </div>
      )}
    </>
  );
};

export default SavedMoviesContainer;
