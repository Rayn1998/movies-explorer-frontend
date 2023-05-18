import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ component }) => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.name) {
      navigate('/login');
    }
  }, [user]);
  return component;
};

export default ProtectedRoute;
