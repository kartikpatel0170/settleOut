module.exports = {
  env: {
    browser: true,
    es2022: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  plugins: ["react", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  rules: {
    "prettier/prettier": "error",
    "no-undef": "off",
    "no-unused-vars": "off"
  }
};
 