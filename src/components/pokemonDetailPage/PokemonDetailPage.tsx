import { FC } from "react";

import "./PokemonDetailPage.css";
import PokemonType from "../pokemonTypeBadge/PokemonTypeBadge";

// type PokemonStatsProps = {
//   hp: number;
//   atk: number;
//   def: number;
//   SpA: number;
//   SpD: number;
//   SPD: number;
// };

type PokemonDetailPageProps /*<T>*/ = {
  name: string;
  id: number;
  types: string[];
  imageURL: string;
  // description: string;
  // height: number;
  // weight: number;
  // abilities?: string[];
  // evos_chain?: string[];
  // stats?: T[];
};

const PokemonDetailPage: FC<PokemonDetailPageProps /*<PokemonStatsProps>*/> = ({
  name,
  id,
  types,
  imageURL,
  // description,
  // height,
  // weight,
  // stats,
  // abilitie,
  // evos_chain,
}) => {
  return (
    <div className="card">
      <div className="card__header">
        <div>
          <img src={imageURL} alt={name} />
        </div>
        <div>
          <p>#{id}</p>
        </div>
        <div>
          <p>{name}</p>
        </div>
        <div className="type__badge">
          {types.map((type) => (
            <PokemonType key={type} type={type} />
          ))}
        </div>
        {/*
        <div>
          <p>{description}</p>
        </div>
        <div>
          <p>{height}</p>
        </div>
        <div>
          <p>{weight}</p>
        </div>
         <div className="stats">
          {stats.map((stat) => (
            <PokemonStats key={stat} stat={stat} />
          ))}
        </div>
        <div className="abilities">
          {abilities.map((ability) => (
            <PokemonAbility key={ability} stat={ability} />
          ))}
        </div>
        <div className="evo__chain">
          {evos_chain.map((evo_chain) => (
            <PokemonEvoChain key={evo_chain} stat={evo_chain} />
          ))}
        </div> 
       */}
      </div>
    </div>
  );
};

export default PokemonDetailPage;
