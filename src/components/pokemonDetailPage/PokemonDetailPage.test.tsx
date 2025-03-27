import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useParams } from "react-router-dom";
import { describe, it, expect, vi, Mock } from "vitest";

import { mockedPokemonDetailPage } from "../../App.test";
import * as pokemonService from "../../services/Pokemon.service";

import PokemonDetailPageCard from "./PokemonDetailPage";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

describe("PokemonDetailPageComponent", () => {
  it("renders the Pokemon details correctly", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      json: async () => ({
        flavor_text_entries: [{ flavor_text: "A strange seed was planted on its back at birth." }],
      }),
    } as Response);

    render(
      <MemoryRouter>
        <PokemonDetailPageCard />
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
        <PokemonDetailPageCard />
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
        <PokemonDetailPageCard />
      </MemoryRouter>,
    );

    expect(await screen.findByText("overgrow")).toBeInTheDocument();
    expect(screen.getByText("chlorophyll")).toBeInTheDocument();
  });
});

describe("PokemonDetailPageCard", () => {
  const mockedPokemonDesc = {
    flavor_text_entries: [{ flavor_text: "test description" }],
  };

  it("should render Pokémon details", async () => {
    (useParams as Mock).mockReturnValue({ id: "1" });
    vi.spyOn(pokemonService, "fetchPokemonPageDetail").mockResolvedValue(mockedPokemonDetailPage);
    vi.spyOn(pokemonService, "fetchPokemonDescription").mockResolvedValue(mockedPokemonDesc);

    render(
      <MemoryRouter initialEntries={["/pokemon/1"]}>
        <PokemonDetailPageCard />
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText("bulbasaur")).toBeInTheDocument());

    expect(screen.getByText("GRASS")).toBeInTheDocument();
    expect(screen.getByText("POISON")).toBeInTheDocument();
    expect(screen.getByText("overgrow")).toBeInTheDocument();
    expect(screen.getByText("HP: 45")).toBeInTheDocument();
    expect(screen.getByText("Weight: 69")).toBeInTheDocument();
  });
});
