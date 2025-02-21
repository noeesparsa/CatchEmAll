import { render, screen } from "@testing-library/react";

import PokemonCard from "./PokemonCard";

describe("Card", () => {
  it("should render the correctly", () => {
    render(
      <PokemonCard
        name="PokemonName"
        id={666}
        description="PokemonDescription  Pokemon"
        sprite="test.png"
        types={["Ghost"]}
      />,
    );

    expect(screen.getByRole("name")).toBeVisible();
    expect(screen.getByRole("id")).toBeVisible();
    expect(screen.getByRole("description")).toBeVisible();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeVisible();
  });
});
