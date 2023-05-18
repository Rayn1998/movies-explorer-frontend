const SubmitButton = ({ btnText, isActive }) => {
  return (
    <button
        type="submit"
        className="auth__submit"
        style={{
          opacity:isActive > 0 ? 1 : 0.5,
          cursor: isActive ? 'pointer' : 'not-allowed',
        }}
      >
        {btnText}
      </button>
  );
};

export default SubmitButton;
