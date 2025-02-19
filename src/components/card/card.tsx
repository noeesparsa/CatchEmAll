import "../card/card.css";
import PokemonType from "../pokemonTypeBadge/PokemonTypeBadge";

const Card = () => {
  return (
    <div className="card">
      <div className="card__header">
        <div className="type__badge">
          <PokemonType type="Type1" />
          <PokemonType type="Type2" />
        </div>

        <div className="card__header__id" role="id">
          <p>#001</p>
        </div>
      </div>

      <div className="name" role="name">
        <p>Test name</p>
      </div>

      <div className="card__footer">
        <div className="card__footer__description" role="description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sit officiis nemo
            cumque, dignissimos modi non unde saepe.
          </p>

          <button className="card__footer__button">Know More...</button>
        </div>

        <div className="card__footer__sprite">
          <img src="/assets/pokeball.png" alt="Pokemon" />
        </div>
      </div>
    </div>
  );
};

export default Card;
