import { render, screen } from "@testing-library/react";

import PokemonCard from "./PokemonCard";

describe("Card", () => {
  it("should render the correctly", () => {
    render(
      <PokemonCard name="PokemonName" id={666} imageURL="test.png" types={["GHOST", "FIRE"]} />,
    );

    expect(screen.getByText("PokemonName")).toBeVisible();
    expect(screen.getByText("#666")).toBeVisible();
    expect(screen.getByText("GHOST")).toBeVisible();
    expect(screen.getByText("FIRE")).toBeVisible();
    expect(screen.getByRole("img")).toHaveAttribute("src", "test.png");
    expect(screen.getByRole("button", { name: "Know More..." })).toBeVisible();
  });
});
