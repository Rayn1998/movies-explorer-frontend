const BigLink = ({ text, border, link }) => {
  const handleClick = () => {
    window.open(link);
  }
  return (
    <>
      <div className="big-link" onClick={handleClick}>
        <h2 className="big-link__text">{text}</h2>
        <div className="big-link__arrow">↗</div>
      </div>
      {border && <div className="big-link__border"></div>}
    </>
  );
};

export default BigLink;
