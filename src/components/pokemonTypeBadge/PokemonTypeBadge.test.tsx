import { render, screen } from "@testing-library/react";

import PokemonTypeBadge from "./PokemonTypeBadge";

describe("PokemonTypeBadge", () => {
  it("should render correctly", () => {
    const { container } = render(<PokemonTypeBadge type="TYPE1" />);
    expect(container.firstChild).toHaveClass("type__badge__type1");
    expect(screen.getByText("TYPE1")).toBeVisible();
  });
});
