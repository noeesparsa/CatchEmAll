import { render, screen } from "@testing-library/react";

import App from "../App";

describe("App", () => {
  it("should renders header with logo", () => {
    render(<App />);
    expect(screen.getByRole("pokedexLogo")).toBeInTheDocument();
  });
});
