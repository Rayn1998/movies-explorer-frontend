import Layout from 'components/Layout/Layout';
import Search from './components/Search/Search';
import MovieCard from './components/MovieCard/MovieCard';

import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from 'redux/slices/moviesSlice';
import { useEffect, useState, useCallback, useRef } from 'react';
import { moviesApi } from 'utils/MoviesApi';

const Movies = () => {
  const movies = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();
  const [moviesLimiter, setMoviesLimiter] = useState(12);
  const [shortMovies, setShortMovies] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleAddClick = useCallback(() => {
    setMoviesLimiter((moviesLimiter) => moviesLimiter + 3);
  }, []);

  const longs = useRef();
  const shorts = useRef();

  const setNewMovies = useCallback((arr) => {
    arr !== 'undefined' && dispatch(setMovies(arr));
  }, []);

  useEffect(() => {
    moviesApi
      .getMovies()
      .then((res) => {
        longs.current = res;
        setNewMovies(longs.current);
        setShorts(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const setShorts = useCallback((arr) => {
    shorts.current = arr.filter((movie) => movie.duration <= 40);
  }, []);

  return (
    <Layout footer>
      <div className="movies">
        <Search
          props={{
            shortMovies,
            setShortMovies,
            searchInput,
            setSearchInput,
            longs,
            shorts,
            setNewMovies,
          }}
        />
        <div className="movies__container">
          {shortMovies 
            ? (searchInput === ''
                ? shorts.current.map((movie, i) => {
                  while (i <= moviesLimiter) {
                    return <MovieCard key={movie.id} props={movie} />;
                  }
                  })
                : shorts.current
                    .filter((item) => {
                      return (
                        item.nameRU
                          .toLowerCase()
                          .includes(searchInput.toLowerCase()) ||
                        item.nameEN
                          .toLowerCase()
                          .includes(searchInput.toLowerCase())
                      );
                    })
                    .map((movie, i) => {
                      while (i <= moviesLimiter) {
                        return <MovieCard key={movie.id} props={movie} />;
                      }
                    })) 
            : (searchInput === ''
              ? movies.map((movie) => {
                while (movie.id <= moviesLimiter) {
                  return <MovieCard key={movie.id} props={movie} />;
                }
                })
              : movies
                .filter((item) => {
                  return (
                    item.nameRU
                      .toLowerCase()
                      .includes(searchInput.toLowerCase()) ||
                    item.nameEN
                      .toLowerCase()
                      .includes(searchInput.toLowerCase())
                  );
                })
                .map((movie) => {
                  while (movie.id <= moviesLimiter) {
                    return <MovieCard key={movie.id} props={movie} />;
                  }
                }))
          }
        </div>
        <div className="movies__add-more">
          <button
            className="movies__add-btn"
            onClick={handleAddClick}
            style={{
              display: moviesLimiter >= (shortMovies ? shorts.current : longs.current)?.length ? 'none' : 'flex',
            }}
          >
            Ещё
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Movies;
