// App.test.tsx
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import App from "./App";
import * as pokemonService from "./services/Pokemon.service.ts";
import { PokemonLight } from "./types/Pokemon.type.ts";

const mockedPokemonList = [
  {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
  },
] as Array<PokemonLight>;

const mockedPokemonDetail = {
  id: 1,
  name: "bulbasaur",
  sprites: { front_default: "bulbasaur.png" },
  types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
};

describe("App", () => {
  beforeAll(() => {
    vi.spyOn(pokemonService, "fetchPokemonList").mockResolvedValue(mockedPokemonList);
    vi.spyOn(pokemonService, "fetchPokemonDetail").mockResolvedValue(mockedPokemonDetail);
  });

  afterAll(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  afterEach(cleanup);
  it("should render header with logo", () => {
    render(<App />);
    expect(screen.getByRole("img", { name: "Pokedex" })).toBeVisible();
  });

  it("fetches the user info", async () => {
    render(<App />);

    await waitFor(
      () => {
        expect(screen.getByText("bulbasaur")).toBeInTheDocument();
      },
      { timeout: 4000 },
    );
  });
});
