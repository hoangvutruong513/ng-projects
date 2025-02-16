// @ts-check
import eslint from "@eslint/js";
import angular from "angular-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: [".angular/", "dist/"] },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/prefer-standalone": "error",
      "@angular-eslint/prefer-on-push-component-change-detection": "error",
      "@angular-eslint/prefer-signals": [
        "error",
        {
          preferReadonlySignalProperties: false,
          preferInputSignals: true,
          preferQuerySignals: true,
        },
      ],
      "@angular-eslint/no-async-lifecycle-method": "error",
      "@angular-eslint/no-conflicting-lifecycle": "error",
      "@angular-eslint/no-duplicates-in-metadata-arrays": "error",
      "@angular-eslint/no-lifecycle-call": "error",
    },
  },
  {
    plugins: {
      "unused-imports": unusedImports,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      "@angular-eslint/template/prefer-self-closing-tags": "error",
      "@angular-eslint/template/prefer-control-flow": "error",
      "@angular-eslint/template/no-interpolation-in-attributes": "error",
    },
  },
  eslintConfigPrettier,
);
