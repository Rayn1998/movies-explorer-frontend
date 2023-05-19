import { useState } from 'react';
import { mainApi } from 'utils/MainApi';

const MovieButton = ({ path, props }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    const { image } = props;
    const data = Object.assign({}, props, {image: image.url, thumbnail: image.url, movieId: image.id})
    mainApi
      .addFavourite(data)
      .then(() => {
        setIsClicked(!isClicked);
        console.log('added')
      })
      .catch(err => console.log('err', err));
  };

  const search = () => {
    return isClicked 
        ? <div className='movie-button-checked' />
        : <p className='movie-button-text'>Сохранить</p>
  }

  const saved = () => {
    return <div className='movie-button-del' ></div>
  }

  return (
    <button 
      className="movie-button" 
      style={{
        backgroundColor: path === '/movies' && isClicked ? '#EE3465' : '#313131',
      }}
      onClick={handleClick}
    >
      {path === '/movies' ? search() : saved()}
    </button>
  );
}

export default MovieButton;