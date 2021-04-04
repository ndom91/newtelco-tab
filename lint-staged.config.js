module.exports = {
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
  // '*.js': 'eslint --cache --fix',
  '*.{js,css,md}': 'prettier --write',
}
