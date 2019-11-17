import pino from 'pino';

export const Logger = pino({
    level: 'info',
    prettyPrint: { colorize: true },
});
