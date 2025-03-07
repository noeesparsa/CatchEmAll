import React from "react";

import PokemonTypeBadge from "../pokemonTypeBadge/PokemonTypeBadge";
import "./PokemonDetailPage.css";

type PokemonDetailPageProps = {
  id: number;
  name: string;
  imageURL: string;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  stats: { name: string; base_stat: number }[];
};

const statRenameMapping: { [key: string]: string } = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SpA",
  "special-defense": "SpD",
  speed: "SPD",
};
const PokemonDetailPageComponent: React.FC<PokemonDetailPageProps> = ({
  id,
  name,
  imageURL,
  types,
  weight,
  height,
  abilities,
  stats,
}) => {
  return (
    <div className="card__details">
      <div className="card__sprite">
        <img src={imageURL} alt={name} />
      </div>
      <div className="card_right_side">
        <div className="card_right_side_id">
          <p>#{id}</p>
        </div>
        <div className="card_right_side_name">
          <p>{name}</p>
        </div>

        <div className="type__badge">
          {types.map((type) => (
            <PokemonTypeBadge key={type} type={type} />
          ))}
        </div>
        <div className="card_right_side_body">
          <p>
            <span>Height : </span>
            {height}
          </p>
          <p>
            <span>Weight : </span>
            {weight}
          </p>
        </div>
        <div className="stats">
          <h2>Stats</h2>
          <div className="stats__badges">
            {stats.map((stat, index) => (
              <span className={`stats__badge__${stat.name}`} key={index}>
                <p>
                  {statRenameMapping[stat.name]}: {stat.base_stat}
                </p>
              </span>
            ))}
          </div>
        </div>
        <div className="card_right_side_abilities">
          <p>Abilities</p>
          {abilities.map((ability, index) => (
            <span className="ability" key={index}>
              {ability}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPageComponent;
