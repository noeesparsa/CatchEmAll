import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";

import * as pokemonService from "../../services/Pokemon.service";

import PokemonDetailPageCard from "./PokemonDetailPage";

const mockedPokemonDesc = {
  flavor_text_entries: [{ flavor_text: "test description" }],
};

const mockedPokemonDetailPage = {
  id: 1,
  name: "bulbasaur",
  sprites: { front_default: "bulbasaur.png" },
  types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
  weight: 69,
  height: 7,
  abilities: [{ ability: { name: "overgrow" } }],
  stats: [{ stat: { name: "hp" }, base_stat: 45 }],
};

describe("PokemonDetailPageCard", () => {
  it("should render Pokémon details", async () => {
    vi.spyOn(pokemonService, "fetchPokemonDescription").mockResolvedValue(mockedPokemonDesc);
    vi.spyOn(pokemonService, "fetchPokemonPageDetail").mockResolvedValue(mockedPokemonDetailPage);

    render(
      <MemoryRouter initialEntries={["/pokemon/1"]}>
        <Routes>
          <Route path="/pokemon/:id" element={<PokemonDetailPageCard />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText("bulbasaur")).toBeInTheDocument());

    expect(screen.getByText("GRASS")).toBeInTheDocument();
    expect(screen.getByText("POISON")).toBeInTheDocument();
    expect(screen.getByText("overgrow")).toBeInTheDocument();
    expect(screen.getByText("HP: 45")).toBeInTheDocument();
    expect(screen.getByText("Weight: 69")).toBeInTheDocument();
    expect(screen.getByText("Height: 7")).toBeInTheDocument();
  });
});
