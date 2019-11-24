import { Client } from 'pg';
import Environment from './Environment';

export default class DatabaseClient extends Client {
    constructor(env: Environment) {
        super({
            user: env.get('DB_USER'),
            host: env.get('DB_HOST'),
            database: env.get('DB_DATABASE'),
            password: env.get('DB_PASSWORD'),
            port: Number(env.get('DB_PORT')),
            connectionTimeoutMillis: 1000,
        });
    }
}
