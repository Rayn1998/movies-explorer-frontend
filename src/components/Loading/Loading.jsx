import loading from 'assets/images/loading.png';

const Loading = () => {
  return (
    <div className="loading">
      <img className="loading__img" src={loading} alt="loading..." />
    </div>
  );
};

export default Loading;
