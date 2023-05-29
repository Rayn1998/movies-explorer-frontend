const BlockHeader = ({ text }) => {
  return (
    <div className="block-header">
      <div className="block-header__header-wrapper">
        <h2 className="block-header__header">{text}</h2>
        <div className="block-header__divider"></div>
      </div>
    </div>
  );
};

export default BlockHeader;
