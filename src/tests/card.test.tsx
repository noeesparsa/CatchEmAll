import { render, screen } from "@testing-library/react";

import Card from "../components/card/card";

describe("Card", () => {
  it("should render the component Card and his informations about the Pokemon", () => {
    render(<Card />);
    expect(screen.getByRole("name")).toBeInTheDocument();
    expect(screen.getByRole("id")).toBeInTheDocument();
    expect(screen.getByRole("type1")).toBeInTheDocument();
    expect(screen.getByRole("type2")).toBeInTheDocument();
    expect(screen.getByRole("description")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
