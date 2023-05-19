import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { mainApi } from "utils/MainApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onLoading, offLoading } from "redux/slices/loadingSlice";
import { setUser } from "redux/slices/userSlice";
import { onError, offError } from "redux/slices/errorPopupSlice";
import ErrorPopup from "components/ErrorPopup/ErrorPopup";

const Layout = ({ footer, children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(onLoading());
  //   const data = localStorage.getItem('token');
  //   mainApi.checkToken(data)
  //   .then(res => {
  //       dispatch(setUser(res));
  //       dispatch(offLoading());
  //     })
  //     .catch(() => {
  //       dispatch(offLoading());
  //       navigate('/login');
  //       dispatch(onError('You are unauthorized'));
  //       setTimeout(() => {
  //         dispatch(offError());
  //       }, 10000);
  //     })
  // }, []);
  return (
    <>
      <Header />
      {children}
      {footer && <Footer />}
      {/* <ErrorPopup /> */}
    </>
  );
};

export default Layout;