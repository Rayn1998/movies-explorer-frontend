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
  const savedMovies = useSelector((state) => state.savedMovies.savedMovies);

  // ПРИ КЛИКЕ
  //////////////////////////////////////////////////////////////////////////////
  const handleClick = () => {
    const originSavedMovies = JSON.parse(localStorage.getItem('originSavedMovies'));
    const filteredSavedMovies = JSON.parse(localStorage.getItem('filteredSavedMovies'));

    // Проеверяю текущее состояние
    if (!isFavourite && location.pathname !== '/saved') {
      const { image, id, created_at, updated_at, ...rest } = props;

      const data = Object.assign({}, rest, {
        image: image.url,
        thumbnail: image.url,
        id: props.id,
      });

      // Отправляю запросы на добавление/удаление
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
          originSavedMovies.push(res);
          filteredSavedMovies.push(res);
          localStorage.setItem('originSavedMovies', JSON.stringify(originSavedMovies));
          localStorage.setItem('filteredSavedMovies', JSON.stringify(filteredSavedMovies));
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
          const filteredInput = originSavedMovies.filter(movie => movie._id !== savedId);
          const filteredSaved = filteredSavedMovies.filter(movie => movie._id !== savedId);
          localStorage.setItem('originSavedMovies', JSON.stringify(filteredInput));
          localStorage.setItem('filteredSavedMovies', JSON.stringify(filteredSavedMovies));
        })
        .catch((err) => {
          dispatch(onError(err.message));
          setTimeout(() => {
            dispatch(offError());
          }, 10000);
        });
    }
  };

  // Меняю состояние кнопки
  //////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const state = savedMovies.find((movie) => movie.id === props.id);
    if (state) {
      setIsFavourite(true);
      setSavedId(state._id);
    } else {
      setIsFavourite(false);
    }
  }, [props, savedMovies]);
  //////////////////////////////////////////////////////////////////////////////




  //////////////////////////////////////////////////////////////////////////////
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
  //////////////////////////////////////////////////////////////////////////////
  
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
