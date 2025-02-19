import { render, screen } from "@testing-library/react";

import PokemonTypeBadge from "./PokemonTypeBadge";

describe("PokemonTypeBadge", () => {
  it("should render correctly", () => {
    const { container } = render(<PokemonTypeBadge type="type1" />);
    expect(container.firstChild).toHaveClass("type__badge__type1");
    expect(screen.getByText("type1")).toBeVisible();
  });
});
