import Layout from 'components/Layout/Layout';
import Search from 'components/Movies/components/Search/Search';
import MovieCard from 'components/Movies/components/MovieCard/MovieCard';
import { savedMovies } from 'utils/movies';

const SavedMovies = () => {
  return (
    <Layout>
      <Search />
      <div className="saved-movies">
        {savedMovies.map((movie, i) => <MovieCard key={i} props={movie} />)}
      </div>
    </Layout>
  );
};

export default SavedMovies;
