// // type PokemonStatsProps = {
// //   hp: number;
// //   atk: number;
// //   def: number;
// //   SpA: number;
// //   SpD: number;
// //   SPD: number;
// // };

// type PokemonDetailPageProps /*<T>*/ = {
//   name: string;
//   id: number;
//   types: string[];
//   imageURL: string;
//   // description: string;
//   // height: number;
//   // weight: number;
//   // abilities?: string[];
//   // evos_chain?: string[];
//   // stats?: T[];
// };
import React from "react";

import PokemonTypeBadge from "../pokemonTypeBadge/PokemonTypeBadge";
import "./PokemonDetailPage.css";

type PokemonDetailPageProps = {
  id: number;
  name: string;
  imageURL: string;
  types: string[];
};

const PokemonDetailPage: React.FC<PokemonDetailPageProps> = ({ id, name, imageURL, types }) => {
  return (
    <div className="card__details">
      <div className="card__sprite">
        <img src={imageURL} alt={name} />
      </div>
      <div>
        <p>ID: {id}</p>
        <h1>{name}</h1>

        <div className="type__badge">
          {types.map((type) => (
            <PokemonTypeBadge key={type} type={type} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
