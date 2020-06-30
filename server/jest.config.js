module.exports = {
  rootDir: 'src',
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  verbose: false,
  clearMocks: true,
  resetModules: true,
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
};
