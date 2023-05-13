import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { offMenu } from "redux/slices/menuSlice";

const Button = ({ props }) => {
  const { path, name } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const handleClick = () => {
    navigate(path);
    dispatch(offMenu());
  }
  return (
    <button 
      className="nav-button" 
      onClick={handleClick} 
      style={{
        borderBottom: path === location.pathname && '0.2rem solid #FFFFFF',
      }}
    >
      {name}
    </button>
  );
};

export default Button;
