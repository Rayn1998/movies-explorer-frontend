import { useLocation } from 'react-router-dom';

import MovieButton from './components/MovieButton/MovieButton';

const MovieCard = ({ props }) => {
  const { nameRU, duration, image, trailerLink } = props;
  const location = useLocation();
  const { url, name: imageName } = image;

  return (
    <div className="movie-card">
      <div className="movie-card__text-wrapper">
        <h3 className="movie-card__title">{nameRU}</h3>
        <p className="movie-card__duration">{duration} мин</p>
      </div>
      <a
        className="movie-card__image-container"
        href={trailerLink}
        target="_blank"
      >
        <img
          className="movie-card__image"
          src={
            location.pathname === '/saved'
              ? `https://api.nomoreparties.co/${image}`
              : `https://api.nomoreparties.co/${url}`
          }
          alt={imageName}
        />
      </a>
      <MovieButton props={props} />
    </div>
  );
};

export default MovieCard;
