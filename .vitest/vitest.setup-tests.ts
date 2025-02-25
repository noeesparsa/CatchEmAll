import * as testingLibMatchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import * as jestExtendedMatchers from "jest-extended";
import { afterEach, expect, vi } from "vitest";

import { mockedPokemonList, mockedPokemonDetail } from "../src/App.test.tsx";
import * as pokemonService from "../src/services/Pokemon.service.ts";

beforeAll(() => {
  vi.spyOn(pokemonService, "fetchPokemonList").mockResolvedValue(mockedPokemonList);
  vi.spyOn(pokemonService, "fetchPokemonDetail").mockResolvedValue(mockedPokemonDetail);
});

afterAll(() => {
  vi.resetAllMocks();
  vi.restoreAllMocks();
});

afterEach(() => {
  cleanup();
});

expect.extend(jestExtendedMatchers);
expect.extend(testingLibMatchers);
