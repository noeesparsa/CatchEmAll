import { FC } from "react";

import "./PokemonCard.css";
import PokemonType from "../pokemonTypeBadge/PokemonTypeBadge";

type PokemonCardProps = {
  name: string;
  id: number;
  description: string;
  imageURL: string;
  types: string[];
};

const PokemonCard: FC<Readonly<PokemonCardProps>> = ({
  name,
  id,
  description,
  imageURL,
  types,
}) => {
  return (
    <div className="card">
      <div className="card__header">
        <div className="type__badge">
          {types.map((type) => (
            <PokemonType key={type} type={type} />
          ))}
        </div>

        <div className="card__header__id">
          <p>#{id} </p>
        </div>
      </div>

      <div className="name">
        <p>{name}</p>
      </div>

      <div className="card__footer">
        <div className="card__footer__description">
          <p> {description} </p>
          <button className="card__footer__button">Know More...</button>
        </div>

        <div className="card__footer__sprite">
          <img src={imageURL} alt={name} />
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
