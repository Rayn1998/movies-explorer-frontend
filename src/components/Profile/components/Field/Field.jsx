const Field = ({ name, value, changeValue, border }) => {
  return (
    <div className="field">
      <div className="field__content">
        <p className="field__name">{name}</p>
        <input 
          className="field__value" 
          value={value} 
          onChange={e => changeValue(e.target.value)} 
        />
      </div>
      {border && <div className="field__border"></div>}
    </div>
  );
};

export default Field;
