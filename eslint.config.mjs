import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Strapi build output and generated types
    "cms/dist/**",
    "cms/build/**",
    "cms/.strapi/**",
    "cms/.tmp/**",
    "cms/types/generated/**",
  ]),
]);

export default eslintConfig;
