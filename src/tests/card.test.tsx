import { render, screen } from "@testing-library/react";

import Card from "../components/card/card";

describe("Card", () => {
  it("should render the correctly", () => {
    render(<Card />);

    expect(screen.getByRole("name")).toBeVisible();
    expect(screen.getByRole("id")).toBeVisible();
    expect(screen.getByRole("description")).toBeVisible();
    expect(screen.getByRole("img", { name: "Pokemon" })).toBeVisible();
    expect(screen.getByRole("button")).toBeVisible();
  });
});
