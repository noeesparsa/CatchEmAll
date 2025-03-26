import { render, screen, fireEvent, act } from "@testing-library/react";
import { vi } from "vitest";

import App from "./App";
import * as pokemonService from "./services/Pokemon.service";
import { PokemonList } from "./types/Pokemon.type";

export const mockedPokemonList = [
  {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
  },
] as Array<PokemonList>;

export const mockedPokemonListMore = [
  {
    name: "pikachu",
    url: "https://pokeapi.co/api/v2/pokemon/45/",
  },
] as Array<PokemonList>;

export const mockedPokemonDetail = {
  id: 1,
  name: "bulbasaur",
  sprites: { front_default: "bulbasaur.png" },
  types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
};

export const mockedPokemonDetailMore = {
  id: 45,
  name: "pikachu",
  sprites: { front_default: "pikachu.png" },
  types: [{ type: { name: "electric" } }],
};

export const mockedPokemonDetailPage = {
  id: 1,
  name: "bulbasaur",
  sprites: { front_default: "bulbasaur.png" },
  types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
  weight: 69,
  height: 7,
  abilities: [{ ability: { name: "overgrow" } }],
  stats: [{ stat: { name: "hp" }, base_stat: 45 }],
};

export const mockedPokemonDetailPageMore = {
  id: 45,
  name: "pikachu",
  sprites: { front_default: "pikachu.png" },
  types: [{ type: { name: "electric" } }],
  weight: 32,
  height: 4,
  abilities: [{ ability: { name: "electricity" } }],
  stats: [{ stat: { name: "hp" }, base_stat: 36 }],
};

describe("App", () => {
  it("should render header with logo", () => {
    render(<App />);
    expect(screen.getByRole("img", { name: "Pokedex" })).toBeVisible();
  });

  it("should render 'Load More...' button", async () => {
    vi.spyOn(pokemonService, "fetchPokemonList").mockResolvedValue({
      results: mockedPokemonList,
      next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
    });

    render(<App />);

    const button = await screen.findByRole("button", { name: "Load More..." });
    expect(button).toBeVisible();
  });

  it("should render a few Pokemon", async () => {
    vi.spyOn(pokemonService, "fetchPokemonCardInfo").mockResolvedValue(mockedPokemonDetail);

    render(<App />);

    for (const pokemon of mockedPokemonList) {
      const pokemonName = await screen.findByText(pokemon.name);
      expect(pokemonName).toBeVisible();
    }
  });

  describe("When the user clicks on 'Load More...' button", () => {
    it("should render the next Pokemon and call loadMorePokemon", async () => {
      const loadMorePokemon = vi
        .spyOn(pokemonService, "fetchPokemonList")
        .mockResolvedValueOnce({
          results: mockedPokemonList,
          next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
        })
        .mockResolvedValueOnce({
          results: mockedPokemonListMore,
          next: "https://pokeapi.co/api/v2/pokemon?offset=40&limit=20",
        });

      const loadMorePokemonDetails = vi
        .spyOn(pokemonService, "fetchPokemonCardInfo")
        .mockResolvedValueOnce(mockedPokemonDetail)
        .mockResolvedValueOnce(mockedPokemonDetailMore);

      const expectedPokemonList = [...mockedPokemonList, ...mockedPokemonListMore];

      render(<App />);

      const button = await screen.findByRole("button", { name: "Load More..." });
      await act(async () => {
        await fireEvent.click(button);
      });
      expect(loadMorePokemon).toHaveBeenCalledTimes(3); // 1er useEffect, 2eme resetPokemonList, 3eme Load More buttton
      expect(loadMorePokemonDetails).toHaveBeenCalledTimes(3);

      for (const pokemon of expectedPokemonList) {
        const pokemonName = await screen.getByText(pokemon.name);
        expect(pokemonName).toBeVisible();
      }
    });
  });

  describe("When the user searches for a Pokémon", () => {
    it("should render the searched Pokémon", async () => {
      const searchTerm = "bulbasaur";

      vi.spyOn(global, "fetch").mockResolvedValue({
        json: async () => ({
          results: mockedPokemonList,
        }),
      } as Response);

      vi.spyOn(pokemonService, "fetchPokemonCardInfo").mockResolvedValue(mockedPokemonDetail);

      render(<App />);

      const searchInput = screen.getByPlaceholderText("Search Pokémon");
      await act(async () => {
        fireEvent.change(searchInput, { target: { value: searchTerm } });
      });

      const pokemonName = await screen.findByText(mockedPokemonDetail.name);
      expect(pokemonName).toBeVisible();
    });
  });
});
