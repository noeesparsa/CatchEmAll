import { render, screen } from "@testing-library/react";

import { Card } from "../components/card";

describe("Card", () => {
  it("should render the Card component correctly", () => {
    render(<Card />);
  });

  it("should render the Pokemon name", () => {
    render(<Card />);
    const name = screen.getByTestId("name");
    expect(name).toBeInTheDocument();
  });

  it("should render the ID of the Pokemon", () => {
    render(<Card />);
    const id = screen.getByTestId("id");
    expect(id).toBeInTheDocument();
  });

  it("should render the Pokemon first type", () => {
    render(<Card />);
    const type1 = screen.getByTestId("type1");
    expect(type1).toBeInTheDocument();
  });

  it("should render the Pokemon secondary type", () => {
    render(<Card />);
    const type2 = screen.getByTestId("type2");
    expect(type2).toBeInTheDocument();
  });

  it("should render the Pokemon description", () => {
    render(<Card />);
    const description = screen.getByTestId("description");
    expect(description).toBeInTheDocument();
  });

  it("should render the Pokemon sprite", () => {
    render(<Card />);
    const sprite = screen.getByTestId("sprite");
    expect(sprite).toBeInTheDocument();
  });

  it("should render the more infos button", () => {
    render(<Card />);
    const button = screen.getByText("Know More...");
    expect(button).toBeInTheDocument();
  });
});
