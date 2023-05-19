import { useState } from 'react';

import Layout from 'components/Layout/Layout';
import Search from 'components/Movies/components/Search/Search';
import MovieCard from 'components/Movies/components/MovieCard/MovieCard';
import { useSelector } from 'react-redux';

const SavedMovies = () => {
  const savedMovies = useSelector((state) => state.savedMovies.savedMovies);

  const [searchInput, setSearchInput] = useState('');
  return (
    <Layout footer>
      <Search props={{ searchInput, setSearchInput }} />
      <div className="saved-movies">
        {searchInput === ''
          ? savedMovies.map((movie) => {
              return <MovieCard key={movie.movieId} props={movie} />;
            })
          : savedMovies
              .filter((item) => {
                return (
                  item.nameRU
                    .toLowerCase()
                    .includes(searchInput.toLowerCase()) ||
                  item.nameEN.toLowerCase().includes(searchInput.toLowerCase())
                );
              })
              .map((movie, i) => {
                return <MovieCard key={movie.movieId} props={movie} />;
              })}
      </div>
    </Layout>
  );
};

export default SavedMovies;
