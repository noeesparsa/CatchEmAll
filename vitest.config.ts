import { join } from "path";

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: [join(__dirname, ".vitest/vitest.setup-tests.ts")],
    root: join(__dirname, "src"),
    environment: "happy-dom",
    include: ["**/*.test.tsx", "**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["lcov"],
      reportsDirectory: join(__dirname, "coverage"),
      exclude: ["**/*.test.ts", "**/*.test.tsx", "**/index.ts", "**/index.tsx", "**/*.d.ts"],
    },
  },
  plugins: [react(), tsconfigPaths()],
});
