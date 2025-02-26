import { render, screen, waitFor } from "@testing-library/react";

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

  it("should fetches the user info", async () => {
    render(<App />);

    await waitFor(
      () => {
        expect(screen.getByText("bulbasaur")).toBeInTheDocument();
      },
      { timeout: 4000 },
    );
  });
});
