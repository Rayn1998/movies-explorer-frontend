import { useState, useEffect } from 'react';

import { mainApi } from 'utils/MainApi';
import Layout from 'components/Layout/Layout';
import Search from 'components/Movies/components/Search/Search';
import MovieCard from 'components/Movies/components/MovieCard/MovieCard';
// import { savedMovies } from 'utils/movies';

const SavedMovies = () => {
  // const { nameRU, duration, image, trailerLink } = props;
  // const { url, name: imageName } = image;
  const [savedMovies, setSavedMovies] = useState([]);
  useEffect(() => {
    mainApi.getMovies()
      .then(res => {
        console.log(res)
        setSavedMovies(res);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);
  return (
    <Layout footer>
      {/* <Search /> */}
      <div className="saved-movies">
        {savedMovies.map((movie, i) => <MovieCard key={i} props={movie} />)}
      </div>
    </Layout>
  );
};

export default SavedMovies;
