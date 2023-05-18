import { useLocation } from "react-router-dom";

import MovieButton from "./components/MovieButton/MovieButton";

const MovieCard = ({ props }) => {
  const location = useLocation();
  const { nameRU, duration, image } = props;
  const { url, name: imageName } = image;
  return (
    <div className="movie-card">
      <div className="movie-card__text-wrapper">
        <h3 className="movie-card__title">{nameRU}</h3>
        <p className="movie-card__duration">{duration} мин</p>
      </div>
      <img className="movie-card__image" src={`https://api.nomoreparties.co/${url}`} alt={imageName} />
      <MovieButton path={location.pathname} />
    </div>
  )
}

export default MovieCard;