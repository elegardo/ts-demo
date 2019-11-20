/* eslint-disable */
import 'reflect-metadata';
import fastify from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { DIContainer } from './inversify.config';
import { TYPES } from './inversify.types';
import { DatabaseClient, Logger, handleError, getUser, getUserById } from './api-layer';
import { ObtainAllUsers } from './use-cases';
import { GetUserById } from './use-cases';
import Ajv from 'ajv';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV === 'dev') {
    const result = dotenv.config();
    if (result.error) {
        throw result.error;
    }
}

const environmentVariables = (): Map<string, string | undefined> => {
    const mapEnv: Map<string, string | undefined> = new Map<string, string | undefined>();
    mapEnv.set('LOG_LEVEL', process.env.LOG_LEVEL);
    mapEnv.set('DB_USER', process.env.DB_USER);
    mapEnv.set('DB_HOST', process.env.DB_HOST);
    mapEnv.set('DB_DATABASE', process.env.DB_DATABASE);
    mapEnv.set('DB_PASSWORD', process.env.DB_PASSWORD);
    mapEnv.set('DB_PORT', process.env.DB_PORT);

    return mapEnv;
};

const mapEnv: Map<string, string | undefined> = environmentVariables();
const logger: Logger = new Logger(mapEnv);
const databaseClient: DatabaseClient = new DatabaseClient(mapEnv);

const init = () => {
    // schema options
    const ajv = new Ajv({
        removeAdditional: false,
        useDefaults: true,
        coerceTypes: false,
        format: 'full',
        allErrors: true,
    });
    const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({ logger: logger.log });
    server.setSchemaCompiler(schema => ajv.compile(schema));
    server.setErrorHandler(handleError);

    // initialize dependency injection
    const container = DIContainer(databaseClient.client, logger.log);
    const useObtainAllUsers: ObtainAllUsers = container.get<ObtainAllUsers>(TYPES.ObtainAllUsers);
    const useGetUserById: GetUserById = container.get<GetUserById>(TYPES.GetUserById);

    //routes register
    server.register(getUser, useObtainAllUsers);
    server.register(getUserById, useGetUserById);

    return server;
};

const start = async () => {
    try {
        const server = init();
        await server.listen(3000, '0.0.0.0');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

databaseClient.client
    .connect()
    .then(() => {
        console.log('Connected!');
        start();
    })
    .catch(error => {
        console.error(error.message);
        process.exit(1);
    });
