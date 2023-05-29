import { useSelector, useDispatch } from 'react-redux';
import { offError } from 'redux/slices/errorPopupSlice';

const ErrorPopup = () => {
  const errorPopup = useSelector((state) => state.error);
  const dispatch = useDispatch();
  return (
    <div
        className="error__popup"
        style={{
          transform: errorPopup.open ? 'translateX(0)' : 'translateX(-700px)',
        }}
      >
        <p className="error__message">{errorPopup.message}</p>
        <button
          onClick={() => dispatch(offError())}
          className="error__close-btn"
        ></button>
      </div>
  );
}

export default ErrorPopup;
