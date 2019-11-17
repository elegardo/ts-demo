/* eslint-disable */
import { Client, ClientConfig } from 'pg';
import * as dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
    throw result.error;
}

const config: ClientConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    connectionTimeoutMillis: 1000,
    statement_timeout: 1000,
};
const DBClient: Client = new Client(config);

export default DBClient;
