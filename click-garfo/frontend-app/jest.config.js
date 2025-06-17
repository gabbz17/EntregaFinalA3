export default {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
        '^axios$': '<rootDir>/src/__mocks__/axios.js'
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [
        '/node_modules/(?!axios)/'
    ]
}; 