module.exports = {
  testEnvironment: 'node',
  testTimeout: 30000,
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.test.json', diagnostics: false }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '.*jobs/index.*': '<rootDir>/tests/__mocks__/jobs.mock.ts',
    '.*jobs/reminder\\.worker.*': '<rootDir>/tests/__mocks__/jobs.mock.ts',
    '.*rateLimitMiddleware.*': '<rootDir>/tests/__mocks__/rateLimit.mock.ts',
  },
  setupFiles: ['./tests/__mocks__/setup-mocks.ts'],  // runs before each test file
  setupFilesAfterEnv: ['./tests/setup.ts'],
  globals: {
    'process.env.NODE_ENV': 'test'
  },
  testEnvironmentOptions: {},
}
