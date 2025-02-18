import { render, screen } from "@testing-library/react";

import App from "../App";
import { Card } from "../components/card";

describe("App", () => {
  it("should renders header with logo", () => {
    render(<App />);
    const logo = screen.getByAltText("Logo Pokédex");
    expect(logo).toBeInTheDocument();
  });

  it("should import and render Card component", () => {
    render(<Card />);
  });
});
