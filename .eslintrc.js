module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module",
  },
  "rules": {
    "space-infix-ops": ["error", {"int32Hint": false}],
    "no-unused-vars": "off",
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "off",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "comma-spacing": ["error", {"before": false, "after": true}],
    "no-multiple-empty-lines": "error",
  }
};