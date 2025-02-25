// Pour la liste elle même des Pokemon
export type PokemonLight = {
  name: string;
  url: string;
};

// Pour la pagination des Pokemon
export type PaginatedResult<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};

// Récupérer les infos des pokémon
export type PokemonDetail = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
};
