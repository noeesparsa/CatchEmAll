import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";

import App from "./App";
import * as pokemonService from "./services/Pokemon.service.ts";
import { PokemonList } from "./types/Pokemon.type.ts";

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
  height: 7,
  weight: 69,
  abilities: [{ ability: { name: "overgrow" } }, { ability: { name: "chlorophyll" } }],
  stats: [
    { base_stat: 45, stat: { name: "hp" } },
    { base_stat: 49, stat: { name: "attack" } },
    { base_stat: 49, stat: { name: "defense" } },
    { base_stat: 65, stat: { name: "special-attack" } },
    { base_stat: 65, stat: { name: "special-defense" } },
    { base_stat: 45, stat: { name: "speed" } },
  ],
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

  describe("PokemonDetailPageCard", () => {
    describe("PokemonDetailPageCard", () => {
      it("should render Pokémon details", async () => {
        vi.spyOn(pokemonService, "fetchPokemonPageDetail").mockResolvedValue(
          mockedPokemonDetailPage,
        );

        render(
          <MemoryRouter initialEntries={["/pokemon/1"]}>
            <Routes>
              <Route path="/pokemon/:id" element={<App />} />
            </Routes>
          </MemoryRouter>,
        );

        await waitFor(() => {
          expect(screen.getByText("bulbasaur")).toBeVisible();
          expect(screen.getByAltText("Pokedex")).toBeVisible();
          expect(screen.getByText("grass")).toBeVisible();
          expect(screen.getByText("poison")).toBeVisible();
          expect(screen.getByText("overgrow")).toBeVisible();
          expect(screen.getByText("chlorophyll")).toBeVisible();
          expect(screen.getByText("hp")).toBeVisible();
          expect(screen.getByText("45")).toBeVisible();
        });
      });
    });
  });
});
