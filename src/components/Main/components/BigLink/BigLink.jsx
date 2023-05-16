const BigLink = ({ text, border, link }) => {
  const handleClick = () => {
    window.open(link);
  }
  return (
    <>
      <li className="big-link" onClick={handleClick}>
        <h2 className="big-link__text">{text}</h2>
        {/* <div className="big-link__arrow">↗</div> */}
        <div className="big-link__arrow"></div>
      </li>
      {border && <div className="about-me__border"></div>}
    </>
  );
};

export default BigLink;
