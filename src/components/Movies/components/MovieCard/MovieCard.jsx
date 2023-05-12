import { useLocation } from "react-router-dom";

import MovieButton from "./components/MovieButton/MovieButton";

const MovieCard = ({ props }) => {
  const location = useLocation();
  const { title, duration, image } = props;
  return (
    <div className="movie-card">
      <div className="movie-card__text-wrapper">
        <h3 className="movie-card__title">{title}</h3>
        <p className="movie-card__duration">{duration}</p>
      </div>
      <img className="movie-card__image" src={image} alt={image} />
      <MovieButton path={location.pathname} />
    </div>
  )
}

export default MovieCard;