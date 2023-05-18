import Layout from "components/Layout/Layout";
import Search from "./components/Search/Search";
import MovieCard from "./components/MovieCard/MovieCard";

import { useEffect, useState } from "react";
// import { movies } from 'utils/movies';
import { moviesApi } from "utils/MoviesApi";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    moviesApi.getMovies()
      .then(res => {
        setMovies(res)
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <Layout footer>
      <div className="movies">
        <Search />
        <div className="movies__container" >
          {movies.map((movie) => <MovieCard key={movie.id} props={movie} /> )}
        </div>
        <div className="movies__add-more">
          <button className="movies__add-btn">Ещё</button>
        </div>
      </div>
    </Layout>
  );
};

export default Movies;