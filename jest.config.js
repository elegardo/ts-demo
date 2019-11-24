/* eslint-disable no-undef */
module.exports = {
    verbose: true,
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    collectCoverageFrom: ['**/*.{ts,js}', '!**/node_modules/**', '!**/index.ts'],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0,
        },
    },
};
