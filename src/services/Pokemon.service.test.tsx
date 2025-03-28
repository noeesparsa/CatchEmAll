import { describe, it, expect, vi } from "vitest";

import { PaginatedResult, PokemonList } from "../types/Pokemon.type";

import { fetchPokemonList } from "./Pokemon.service";

describe("fetchPokemonList", () => {
  it("should return a list of Pokemon", async () => {
    const mockResponse: PaginatedResult<PokemonList> = {
      count: 1,
      next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
      previous: null,
      results: [{ name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" }],
    };

    const mockFetchResponse = {
      json: vi.fn().mockResolvedValue(mockResponse),
    } as Partial<Response>;

    const fetchSpy = vi.spyOn(window, "fetch").mockResolvedValue(mockFetchResponse as Response);

    const response = await fetchPokemonList();
    expect(response.results).toEqual(mockResponse.results);

    fetchSpy.mockRestore();
  });
});
