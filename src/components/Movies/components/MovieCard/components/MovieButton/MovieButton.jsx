import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { mainApi } from 'utils/MainApi';
import { useSelector, useDispatch } from 'react-redux';
import { addSavedMovie, removeSavedMovie } from 'redux/slices/savedMoviesSlice';
import { onError, offError } from 'redux/slices/errorPopupSlice';

const MovieButton = ({ props, savedRef }) => {
  // console.log(savedRef)
  const [isFavourite, setIsFavourite] = useState(false);
  const [savedId, setSavedId] = useState(0);
  const location = useLocation();

  const dispatch = useDispatch();
  const savedMovies = useSelector((state) => state.savedMovies.savedMovies);

  const handleClick = () => {
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
          savedRef.current.push(res);
          const localSaved = JSON.parse(localStorage.getItem('saved'));
          localSaved.push(res);
          localStorage.setItem('saved', JSON.stringify(localSaved));
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
          const filtered = savedRef.current.filter(movie => movie._id !== savedId);
          console.log('filtered', filtered);
          savedRef.current = filtered;
          dispatch(removeSavedMovie(savedId));
          // const localSaved = JSON.parse(localStorage.getItem('saved'));
          // const newLocalSaved = localSaved.filter(movie => {
          //   return movie._id !== savedId;
          // });
          localStorage.setItem('saved', JSON.stringify(filtered));
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
    const localSaved = JSON.parse(localStorage.getItem('saved'));
    const state = localSaved.find((movie) => movie.id === props.id);
    if (state) {
      setIsFavourite(true);
      setSavedId(state._id);
    } else {
      setIsFavourite(false);
    }
  }, [savedMovies, props]);

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
