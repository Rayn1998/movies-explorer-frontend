const Button = ({ props }) => {
  const { handleClick, name } = props;
  return (
    <button className="nav-button" onClick={handleClick}>
      {name}
    </button>
  );
};

export default Button;
