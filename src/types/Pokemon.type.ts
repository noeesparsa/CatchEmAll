export type PokemonLight = {
  name: string;
  url: string;
};

export type PaginatedResult<T> = {
  count: number;
  next: string | null;
  previous: string | null;
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
