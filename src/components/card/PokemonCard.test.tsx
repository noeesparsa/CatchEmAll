import { render, screen } from "@testing-library/react";

import PokemonCard from "./PokemonCard";

describe("Card", () => {
  it("should render the correctly", () => {
    render(
      <PokemonCard
        name="PokemonName"
        id={666}
        description="PokemonDescriptionPokemon"
        imageURL="test.png"
        types={["ghost", "fire"]}
      />,
    );

    expect(screen.getByText("PokemonName")).toBeVisible();
    expect(screen.getByText("#666")).toBeVisible();
    expect(screen.getByText("ghost")).toBeVisible();
    expect(screen.getByText("fire")).toBeVisible();
    expect(screen.getByText("PokemonDescriptionPokemon")).toBeVisible();
    expect(screen.getByRole("img")).toHaveAttribute("src", "test.png");
    expect(screen.getByRole("button", { name: "Know More..." })).toBeVisible();
  });
});
