import { Client, ClientConfig } from 'pg';

export default class DatabaseClient {
    private _config: ClientConfig;
    client: Client;

    constructor(env: Map<string, string | undefined>) {
        this._config = {
            user: env.get('DB_USER'),
            host: env.get('DB_HOST'),
            database: env.get('DB_DATABASE'),
            password: env.get('DB_PASSWORD'),
            port: Number(env.get('DB_PORT')),
            connectionTimeoutMillis: 1000,
        };
        this.client = new Client(this._config);
    }
}
