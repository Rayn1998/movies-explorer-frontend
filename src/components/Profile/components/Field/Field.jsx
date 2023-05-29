const Field = ({ name, border, register }) => {
  return (
    <div className="field">
      <div className="field__content">
        <p className="field__name">{name}</p>
        <input 
          className="field__value" 
          {...register}
          placeholder={name}
        />
      </div>
      {border && <div className="field__border"></div>}
    </div>
  );
};

export default Field;
