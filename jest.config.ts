/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  // Use ts-jest preset to enable TypeScript support in Jest
    preset: 'ts-jest',
    // Specify Node.js environment for running tests (ideal for backend)
    testEnvironment: 'node',
   // Load setup files before tests (e.g., for decorators or metadata reflection)
    setupFiles: ['reflect-metadata'],
    // Configure how files are transformed before testing (TypeScript with ts-jest)
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    // File extensions Jest will recognize and process
    moduleFileExtensions: ['ts', 'js'],
    // Pattern to locate test files (all .test.ts files in the project)
    testMatch: ['**/*.test.ts'],
    // Map module paths starting with "@" to the src/ directory (for absolute imports)
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    // Show individual test results with detailed information
     verbose: true,
};