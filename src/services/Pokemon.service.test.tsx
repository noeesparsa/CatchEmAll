import { describe, it, expect, vi } from "vitest";

import { PaginatedResult, PokemonLight } from "../types/Pokemon.type";

import { fetchPokemonList } from "./Pokemon.service";

describe("fetchPokemonList", () => {
  it("should return a list of Pokemon", async () => {
    const mockResponse: PaginatedResult<PokemonLight> = {
      count: 1,
      next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
      previous: null,
      results: [{ name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" }],
    };

    const fetchSpy = vi.spyOn(window, "fetch").mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockResponse),
    } as unknown as Response);

    const result = await fetchPokemonList();
    expect(result).toEqual(mockResponse.results);

    fetchSpy.mockRestore();
  });
});
