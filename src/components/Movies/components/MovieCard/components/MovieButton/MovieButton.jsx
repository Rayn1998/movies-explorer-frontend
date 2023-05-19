import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { mainApi } from 'utils/MainApi';
import { useSelector, useDispatch } from 'react-redux';
import { addSavedMovie, removeSavedMovie } from 'redux/slices/savedMoviesSlice';

const MovieButton = ({ props }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [savedId, setSavedId] = useState(0);
  const location = useLocation();

  const dispatch = useDispatch();
  const savedMovies = useSelector(state => state.savedMovies.savedMovies);

  const handleClick = () => {
    if (!isFavourite && location.pathname !== '/saved') {
      const { image } = props;
      const { id, created_at, updated_at, ...rest } = props;
      const data = Object.assign({}, rest, {image: image.url, thumbnail: image.url, movieId: props.id})
      mainApi
        .addFavourite(data)
        .then((res) => {
          dispatch(addSavedMovie(res));
        })
        .catch(err => console.log('err', err));
    } else {
      mainApi
        .removeFavourite(savedId)
        .then(() => {
          dispatch(removeSavedMovie(savedId));
        })
        .catch(err => console.log(err));
    }
  };

  const search = () => {
    return isFavourite 
        ? <div className='movie-button-checked' />
        : <p className='movie-button-text'>Сохранить</p>
  }

  const saved = () => {
    return <div className='movie-button-del' ></div>
  }

  useEffect(() => {
    const state = savedMovies.find(movie => movie.movieId === (location.pathname === '/saved' ? props.movieId : props.id));
    if (state) {
      setIsFavourite(true)
      setSavedId(state._id);
    } else {
      setIsFavourite(false)
    }
  }, [savedMovies])

  return (
    <button 
      className="movie-button" 
      style={{
        backgroundColor: location.pathname === '/movies' && isFavourite ? '#EE3465' : '#313131',
      }}
      onClick={handleClick}
    >
      {location.pathname === '/movies' ? search() : saved()}
    </button>
  );
}

export default MovieButton;