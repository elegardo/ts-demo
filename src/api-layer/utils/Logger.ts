import pino from 'pino';

export class Logger {
    protected _log: pino.Logger;

    constructor(env: Map<string, string | undefined>) {
        this._log = pino({
            level: env.get('LOG_LEVEL') || 'info',
            prettyPrint: { colorize: true },
        });
    }

    get log(): pino.Logger {
        return this._log;
    }
}
