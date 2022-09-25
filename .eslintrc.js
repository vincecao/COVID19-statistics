

module.exports = {
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:react/recommended",
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint', "simple-import-sort"],
  parser: '@typescript-eslint/parser',
  rules: {
    "prefer-const": "error",
    "react/function-component-definition": [2, { "namedComponents": "function-declaration" }],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "react/display-name": "off",
    "react/react-in-jsx-scope": "off",
  }
};