const BigLink = ({ text, border }) => {
  return (
    <>
      <div className="big-link">
        <h2 className="big-link__text">{text}</h2>
        <div className="big-link__arrow">↗</div>
      </div>
      {border && <div className="big-link__border"></div>}
    </>
  );
};

export default BigLink;
