module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["next/core-web-vitals"],
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "no-unused-vars": "off",
    "react-hooks/exhaustive-deps": "off",
  },
};
