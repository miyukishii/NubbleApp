const path = require('path');

module.exports = {
  preset: 'react-native',
  setupFiles: [
    '<rootDir>/src/test/jestSetup.ts'
  ],
  moduleDirectories: [
    'node_modules',
    path.resolve(__dirname, 'src/test'),
  ],
  moduleNameMapper: {
    '^msw/node$': '<rootDir>/node_modules/msw/lib/node/index.js',
    '^test-utils$': '<rootDir>/src/test/test-utils.tsx',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
  },
  collectCoverageFrom: [
    "src/{screens,components,utils,hooks,domain}/**/*.{js,jsx,ts,tsx}"
  ],
  coveragePathIgnorePatterns: [
    "node_modules",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    ".*/mockedData/.*"
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|react-native-reanimated|msw|@mswjs|rettime|until-async|headers-polyfill)'
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
    'mjs',
  ],
  testEnvironment: 'node',
};
