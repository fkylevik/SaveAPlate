export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', { configFile: './babel.config.js' }]
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/src/tests/styleMock.js',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/tests/fileMock.js'
  },
  setupFilesAfterEnv: [
    '<rootDir>/src/tests/setupTests.js',
    '<rootDir>/src/tests/TestGlobalSetup.js',
    '<rootDir>/src/tests/jestSetup.js'
  ],
  extensionsToTreatAsEsm: ['.jsx'],
  transformIgnorePatterns: [],
  testPathIgnorePatterns: ['/node_modules/']
}