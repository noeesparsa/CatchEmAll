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

export type PokemonPageDetail = {
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
  height: number;
  weight: number;
  abilities: {
    ability: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
};

export type PokemonDescription = {
  flavor_text_entries: {
    flavor_text: string;
  }[];
};

// export type EvolutionChain = {
//   chain: {
//     species: {
//       name: string; //1ere evo
//     };
//     evolves_to?: {
//       species: {
//         name: string; //2eme evo
//       };
//       evolves_to?: {
//         species: {
//           name: string; //3eme evo
//         };
//       }[];
//     }[];
//   };
// };
