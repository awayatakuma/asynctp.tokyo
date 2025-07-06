const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    '**/__tests__/**/*.test.(ts|tsx|js)'
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/src/components/__tests__/.*\\.skip\\.test\\.(ts|tsx)$'
  ],
}

module.exports = createJestConfig(customJestConfig)