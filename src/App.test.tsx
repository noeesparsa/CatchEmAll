import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import App from "./App";
import * as pokemonService from "./services/Pokemon.service.ts";
import { PokemonLight } from "./types/Pokemon.type.ts";

export const mockedPokemonList = [
  {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
  },
] as Array<PokemonLight>;

export const mockedPokemonDetail = {
  id: 1,
  name: "bulbasaur",
  sprites: { front_default: "bulbasaur.png" },
  types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
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

  // it("should render a few Pokemon", async () => {
  //   vi.spyOn(pokemonService, "fetchPokemonDetail").mockResolvedValue(mockedPokemonDetail);

  //   render(<App />);

  //   for (const pokemon of mockedPokemonList) {
  //     const pokemonName = await screen.findByText(pokemon.name);
  //     expect(pokemonName).toBeVisible();
  //   }
  // });

  // describe("When the user click on 'Load More...' button", () => {
  //   it("should render the 20 next Pokemon", async () => {
  //     vi.spyOn(pokemonService, "fetchPokemonList").mockResolvedValue({
  //       results: mockedPokemonList,
  //       next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  //     });

  //     render(<App />);

  //     const button = await screen.findByRole("button", { name: "Load More..." });
  //     expect(button).toBeVisible();
  //   });
  // });

  // it("should render 'Load More...' button and do the API call when we click on it", () => {
  //   render(<App />);

  //   const nextUrl = "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20";
  //   const loadMorePokemon = vi.fn();

  //   const button = screen.getByRole("button", { name: "Load More..." });
  //   expect(button).toBeInTheDocument();

  //   fireEvent.click(button);
  //   expect(loadMorePokemon).toHaveBeenCalled();
  // });
});
