const Field = ({ name, value, border }) => {
  return (
    <div className="field">
      <div className="field__content">
        <p className="field__name">{name}</p>
        <p className="field__value">{value}</p>
      </div>
      {border && <div className="field__border"></div>}
    </div>
  );
};

export default Field;
