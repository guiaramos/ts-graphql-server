module.exports = {
  plugins: ['jest'],
  extends: ['airbnb-typescript-prettier', 'plugin:jest/recommended'],
  rules: {
    'import/prefer-default-export': 'off'
  }
};
