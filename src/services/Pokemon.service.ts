import {
  PaginatedResult,
  PokemonList,
  PokemonCardInfo,
  PokemonDetailPage,
  // EvolutionChain,
  PokemonDescription,
} from "../types/Pokemon.type";

export async function fetchPokemonList(nextUrl?: string): Promise<{
  results: PokemonList[];
  next: string | null;
}> {
  const response = await fetch(
    nextUrl ? nextUrl : "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0",
  );
  const data: PaginatedResult<PokemonList> = await response.json();
  return { results: data.results, next: data.next };
}

export async function fetchPokemonCardInfo(url: string): Promise<PokemonCardInfo> {
  const response = await fetch(url);
  const data: PokemonCardInfo = await response.json();
  return data;
}

export async function fetchPokemonPageDetail(url: string): Promise<PokemonDetailPage> {
  const response = await fetch(url);
  const data: PokemonDetailPage = await response.json();
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
