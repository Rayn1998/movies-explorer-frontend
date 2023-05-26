import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { mainApi } from 'utils/MainApi';
import { useSelector, useDispatch } from 'react-redux';
import { addSavedMovie, removeSavedMovie } from 'redux/slices/savedMoviesSlice';
import { onError, offError } from 'redux/slices/errorPopupSlice';

const MovieButton = ({ props }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [savedId, setSavedId] = useState(0);
  const location = useLocation();

  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const savedMovies = useSelector((state) => state.savedMovies.savedMovies);

  const handleClick = () => {
    const inputSavedFilms = JSON.parse(localStorage.getItem('inputSavedFilms'));
    if (!isFavourite && location.pathname !== '/saved') {
      const { image } = props;
      const { id, created_at, updated_at, ...rest } = props;

      const data = Object.assign({}, rest, {
        image: image.url,
        thumbnail: image.url,
        id: props.id,
      });
      mainApi
        .addFavourite(data)
        .then((res) => {
          if (res.message) {
            dispatch(onError(res.message));
            setTimeout(() => {
              dispatch(offError());
            }, 10000);
            return;
          }
          dispatch(addSavedMovie(res));
          inputSavedFilms.push(res);
          localStorage.setItem('inputSavedFilms', JSON.stringify(inputSavedFilms));
        })
        .catch((err) => {
          dispatch(onError(err.message));
          setTimeout(() => {
            dispatch(offError());
          }, 10000);
        });
    } else {
      mainApi
        .removeFavourite(savedId)
        .then(() => {
          dispatch(removeSavedMovie(savedId));
          const filteredInput = inputSavedFilms.filter(movie => movie._id !== savedId);
          localStorage.setItem('inputSavedFilms', JSON.stringify(filteredInput));
        })
        .catch((err) => {
          dispatch(onError(err.message));
          setTimeout(() => {
            dispatch(offError());
          }, 10000);
        });
    }
  };

  const search = () => {
    return isFavourite ? (
      <div className="movie-button-checked" />
    ) : (
      <p className="movie-button-text">Сохранить</p>
    );
  };

  const saved = () => {
    return <div className="movie-button-del"></div>;
  };

  // Change the status of a button
  useEffect(() => {
    const state = movies.find((movie) => movie.id === props.id);
    if (state) {
      setIsFavourite(true);
      setSavedId(state._id);
    } else {
      setIsFavourite(false);
    }
  }, [localStorage.getItem('inputSavedFilms'), props]);

  return (
    <button
      className="movie-button"
      style={{
        backgroundColor:
          location.pathname === '/movies' && isFavourite
            ? '#EE3465'
            : '#313131',
      }}
      onClick={handleClick}
    >
      {location.pathname === '/movies' ? search() : saved()}
    </button>
  );
};

export default MovieButton;
