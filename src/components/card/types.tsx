import React from "react";

export type TypesPokemonProps = {
  type: string;
};

const TypesPokemon: React.FC<TypesPokemonProps> = ({ type }) => {
  return (
    <span className={`top__types__${type.toLowerCase()}`} role={type.toLowerCase()}>
      {type}
    </span>
  );
};

export default TypesPokemon;
