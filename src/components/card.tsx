import "../css/card.css";

const Card = () => {
  return (
    <div className="card">
      <div className="top">
        <div className="top__types">
          <span className="top__types__type1" role="type1">
            Type1
          </span>
          <span className="top__types__type2" role="type2">
            Type2
          </span>
        </div>

        <div className="top__id" role="id">
          <p>#001</p>
        </div>
      </div>

      <div className="name" role="name">
        <p>Test name</p>
      </div>

      <div className="bottom">
        <div className="bottom__description" role="description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.Perferendis sit officiis nemo
            cumque, dignissimos modi non unde saepe.
          </p>

          <button className="bottom__more__button">Know More...</button>
        </div>

        <div className="bottom__sprite" role="sprite">
          <img src="/assets/pokeball.png" alt="Pokemon" />
        </div>
      </div>
    </div>
  );
};

export default Card;
