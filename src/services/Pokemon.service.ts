import { PaginatedResult, PokemonLight, PokemonDetail } from "../types/Pokemon.type";

export async function fetchPokemonList(): Promise<{
  results: PokemonLight[];
  next: string | null;
}> {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
  const data: PaginatedResult<PokemonLight> = await response.json();
  return { results: data.results, next: data.next };
}

export async function fetchPokemonDetail(url: string): Promise<PokemonDetail> {
  const response = await fetch(url);
  const data: PokemonDetail = await response.json();
  return data;
}
