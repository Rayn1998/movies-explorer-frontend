import { useSelector } from "react-redux";

import MovieCard from "../MovieCard/MovieCard";

const SavedMoviesContainer = () => {
  const savedMovies = useSelector((state) => state.savedMovies.savedMovies);
  return (
    <div className="saved-movies">
      {savedMovies.map((movie) => {
        return <MovieCard key={movie.movieId} props={movie} />;
      })}
    </div>
  );
};

export default SavedMoviesContainer;
