// @ts-check
const eslint = require("./node_modules/@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const eslintConfigPrettier = require("eslint-config-prettier");

module.exports = tseslint.config(
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
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
      "@angular-eslint/no-async-lifecycle-method": "error",
      "@angular-eslint/no-conflicting-lifecycle": "error",
      "@angular-eslint/no-duplicates-in-metadata-arrays": "error",
      "@angular-eslint/no-lifecycle-call": "error",
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
