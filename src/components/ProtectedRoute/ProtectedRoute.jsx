import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ component }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === null) {
      navigate('/');
    }
  }, [localStorage.getItem('token')]);
  return component;
};

export default ProtectedRoute;
