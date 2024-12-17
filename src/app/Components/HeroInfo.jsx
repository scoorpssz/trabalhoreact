const HeroInfo = (props) => {
  return (
    <div className="hero-box">
      <img src={props.image} alt={props.name} />
      <h2>{props.name}</h2>
      <p>{props.superPower}</p>
    </div>
  );
};

export default HeroInfo;