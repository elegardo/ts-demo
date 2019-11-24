import pino from 'pino';
import Environment from './Environment';

export default class Logger {
    protected _log: pino.Logger;

    constructor(env: Environment) {
        this._log = pino({
            name: env.get('APP_NAME'),
            level: env.get('LOG_LEVEL') || 'info',
            prettyPrint: {
                levelFirst: false,
                colorize: true,
                ignore: 'hostname',
                timestampKey: 'time',
                translateTime: true,
            },
        });
    }

    get log(): pino.Logger {
        return this._log;
    }
}
