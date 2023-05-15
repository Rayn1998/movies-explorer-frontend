import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/');
  }
  return (
    <div className="page-not-found">
      <h1 className="page-not-found__number">404</h1>
      <p className="page-not-found__text">Страница не найдена</p>
      <p className="page-not-found__back" onClick={handleBackClick}>Назад</p>
    </div>
  );
}

export default PageNotFound;
