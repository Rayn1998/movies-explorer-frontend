import Layout from "components/Layout/Layout";
import Search from "./components/Search/Search";
import MovieCard from "./components/MovieCard/MovieCard";

import { movies } from 'utils/movies';

const Movies = () => {
  
  return (
    <Layout>
      <div className="movies">
        <Search />
        <div className="movies__container" >
          {movies.map((movie, i) => <MovieCard key={i} props={movie} /> )}
        </div>
        <div className="movies__add-more">
          <button className="movies__add-btn">Ещё</button>
        </div>
      </div>
    </Layout>
  );
};

export default Movies;