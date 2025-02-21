import { FC } from "react";

import "../pokemonTypeBadge/PokemonTypeBadge.css";

export type PokemonTypeBadgeProps = {
  type: string;
};

const PokemonTypeBadge: FC<Readonly<PokemonTypeBadgeProps>> = ({ type }) => {
  return <span className={`type__badge__${type.toLowerCase()}`}>{type}</span>;
};

export default PokemonTypeBadge;
