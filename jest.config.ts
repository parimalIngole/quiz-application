/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
    // Use ts-jest preset to transpile TypeScript using Babel under the hood
    preset: 'ts-jest',
    // Use Node.js as the testing environment (good for backend tests)
    testEnvironment: 'node',
    // Load setup files before running tests (needed for decorators, etc.)
    setupFiles: ['reflect-metadata'],
    // Define how files should be transformed before testing
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    // Recognize these file extensions in modules
    moduleFileExtensions: ['ts', 'js'],
    // Look for test files ending with .test.ts in any folder
    testMatch: ['**/*.test.ts'],
    // Support absolute imports using "@/..." by mapping it to the src/ directory
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    // Display detailed results for each test
    verbose: true,
};