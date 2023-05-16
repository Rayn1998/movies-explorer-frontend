import { useState } from 'react';

const MovieButton = ({ path }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
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