import js from "@eslint/js";
import airbnbBase from "eslint-config-airbnb-base";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,
  airbnbBase,
  {
    files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { globals: globals.browser } 
  },
  { files: ["**/*.js"], 
    languageOptions: { sourceType: "commonjs" } 
  },
  {
    rules: {
      "semi": ["error", "always"],
      "quotes": ["error", "single"],
      "no-debugger": "error",
    },
  }
]);
