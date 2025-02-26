import { PaginatedResult, PokemonLight, PokemonDetail } from "../types/Pokemon.type";

export async function fetchPokemonList(): Promise<PokemonLight[]> {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
  const data: PaginatedResult<PokemonLight> = await response.json();
  return data.results;
}

export async function fetchPokemonDetail(url: string): Promise<PokemonDetail> {
  const response = await fetch(url);
  const data: PokemonDetail = await response.json();
  return data;
}
