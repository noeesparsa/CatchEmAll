export type PokemonLight = {
  name: string;
  url: string;
};

export type PaginatedResult<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};

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
