export default {
  clearMocks: true,

  coverageDirectory: 'coverage',

  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],

  coverageProvider: 'v8',

  setupFiles: ['./src/config/dotenv.ts'],

  testEnvironment: 'node',

  testPathIgnorePatterns: ['\\\\node_modules\\\\', 'dist'],

  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
};
