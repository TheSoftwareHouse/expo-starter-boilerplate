module.exports = {
  '**/*.{js,jsx,ts,tsx}': (filenames) => [
    'npm run typecheck',
    `npx eslint --fix ${filenames.map((filename) => `"${filename}"`).join(' ')}`,
  ],
  '**/*.(md|json)': (filenames) => `npx prettier --write ${filenames.map((filename) => `"${filename}"`).join(' ')}`,
};
