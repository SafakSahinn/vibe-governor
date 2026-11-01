import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "bin/**", "next-env.d.ts"]),
  {
    rules: {
      // The project's own guideline: no `any`.
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
]);
