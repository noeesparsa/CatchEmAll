import { render, screen } from "@testing-library/react";

import Card from "../components/card";

describe("Card", () => {
  it("should render the component Card and his informations about the Pokemon", () => {
    render(<Card />);
    const name = screen.getByRole("name");
    const id = screen.getByRole("id");
    const type1 = screen.getByRole("type1");
    const type2 = screen.getByRole("type2");
    const description = screen.getByRole("description");
    const sprite = screen.getByRole("sprite");
    const button = screen.getByText("Know More...");

    expect(name).toBeInTheDocument();
    expect(id).toBeInTheDocument();
    expect(type1).toBeInTheDocument();
    expect(type2).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(sprite).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
