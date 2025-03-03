import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import App from "./App";
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

  it("should render 'Load More...' button and do the API call when we click on it", () => {
    const nextUrl = "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20";
    const loadMorePokemon = vi.fn();

    render(
      <div>
        <div id="header">
          <img alt="Pokedex" src="/assets/logoPokedex.png" />
        </div>
        <div className="cards" />
        <div className="load__more__button">
          {nextUrl && <button onClick={loadMorePokemon}>Load More...</button>}
        </div>
      </div>,
    );

    const button = screen.getByRole("button", { name: "Load More..." });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(loadMorePokemon).toHaveBeenCalled();
  });
});
