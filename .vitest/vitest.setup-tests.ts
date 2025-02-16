import * as testingLibMatchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import * as jestExtendedMatchers from "jest-extended";
import { afterEach, expect } from "vitest";

afterEach(() => {
  cleanup();
});

expect.extend(jestExtendedMatchers);
expect.extend(testingLibMatchers);
