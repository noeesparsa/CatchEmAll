import {
  PaginatedResult,
  PokemonLight,
  PokemonDetail,
  PokemonPageDetail,
  // EvolutionChain,
  PokemonDescription,
} from "../types/Pokemon.type";

export async function fetchPokemonList(nextUrl?: string): Promise<{
  results: PokemonLight[];
  next: string | null;
}> {
  const response = await fetch(
    nextUrl ? nextUrl : "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0",
  );
  const data: PaginatedResult<PokemonLight> = await response.json();
  return { results: data.results, next: data.next };
}

export async function fetchPokemonDetail(url: string): Promise<PokemonDetail> {
  const response = await fetch(url);
  const data: PokemonDetail = await response.json();
  return data;
}

export async function fetchPokemonPageDetail(url: string): Promise<PokemonPageDetail> {
  const response = await fetch(url);
  const data: PokemonPageDetail = await response.json();
  return data;
}

export async function fetchPokemonDescription(id: number): Promise<PokemonDescription> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const data: PokemonDescription = await response.json();
  return data;
}

// export async function fetchEvolutionChain(id: number): Promise<EvolutionChain> {
//   const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`);
//   const data: EvolutionChain = await response.json();
//   return data;
// }
