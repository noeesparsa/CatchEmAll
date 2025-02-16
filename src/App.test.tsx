import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  it("should render correctly", () => {
    render(<App />);
    screen.getByText("Vite + React");

    expect(screen.getByText("Vite + React")).toBeVisible();
  });
});
