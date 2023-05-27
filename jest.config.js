module.exports = {
  cacheDirectory: 'node_modules/.cache/jest',
  collectCoverage: true,
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['node_modules'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '\\.(css)': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.tsx?$': ['babel-jest', {
      presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
    }],
  },
};