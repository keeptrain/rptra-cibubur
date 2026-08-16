import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
    alias: {
      "server-only": "/dev/null",
    },
  },
  test: {
    environment: "node",
    globals: true,
    restoreMocks: true,
    clearMocks: true,
  },
});
