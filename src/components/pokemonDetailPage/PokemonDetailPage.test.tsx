import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";

import PokemonDetailPageComponent from "./PokemonDetailPage";

describe("PokemonDetailPageComponent", () => {
  const mockProps = {
    id: 1,
    name: "Bulbasaur",
    imageURL: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    types: ["grass", "poison"],
    height: 7,
    weight: 69,
    abilities: ["overgrow", "chlorophyll"],
    stats: [
      { name: "hp", base_stat: 45 },
      { name: "attack", base_stat: 49 },
      { name: "defense", base_stat: 49 },
      { name: "special-attack", base_stat: 65 },
      { name: "special-defense", base_stat: 65 },
      { name: "speed", base_stat: 45 },
    ],
  };

  it("renders loading state initially", () => {
    render(
      <MemoryRouter>
        <PokemonDetailPageComponent {...mockProps} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders the Pokemon details correctly", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      json: async () => ({
        flavor_text_entries: [{ flavor_text: "A strange seed was planted on its back at birth." }],
      }),
    } as Response);

    render(
      <MemoryRouter>
        <PokemonDetailPageComponent {...mockProps} />
      </MemoryRouter>,
    );

    expect(await screen.findByText("#1")).toBeInTheDocument();
    expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
    expect(screen.getByAltText("Bulbasaur")).toBeInTheDocument();
    expect(
      screen.getByText("A strange seed was planted on its back at birth."),
    ).toBeInTheDocument();
  });

  it("renders the Pokemon stats correctly", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      json: async () => ({
        flavor_text_entries: [{ flavor_text: "A strange seed was planted on its back at birth." }],
      }),
    } as Response);

    render(
      <MemoryRouter>
        <PokemonDetailPageComponent {...mockProps} />
      </MemoryRouter>,
    );

    expect(await screen.findByText("HP: 45")).toBeInTheDocument();
    expect(screen.getByText("ATK: 49")).toBeInTheDocument();
    expect(screen.getByText("DEF: 49")).toBeInTheDocument();
    expect(screen.getByText("SpA: 65")).toBeInTheDocument();
    expect(screen.getByText("SpD: 65")).toBeInTheDocument();
    expect(screen.getByText("SPD: 45")).toBeInTheDocument();
  });

  it("renders the Pokemon abilities correctly", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      json: async () => ({
        flavor_text_entries: [{ flavor_text: "A strange seed was planted on its back at birth." }],
      }),
    } as Response);

    render(
      <MemoryRouter>
        <PokemonDetailPageComponent {...mockProps} />
      </MemoryRouter>,
    );

    expect(await screen.findByText("overgrow")).toBeInTheDocument();
    expect(screen.getByText("chlorophyll")).toBeInTheDocument();
  });
});
