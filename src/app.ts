/* eslint-disable */
import 'reflect-metadata';
import fastify from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { handleError, getUser, getUserById } from './apiLayer';
import { ObtainAllUsers, GetUserById } from './useCases';
import { DatabaseClient, Logger, Environment } from './utilities';
import { InversifyContainer } from './inversify.config';
import { TYPES } from './inversify.types';

import Ajv from 'ajv';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV === 'dev') {
    const result = dotenv.config();
    if (result.error) {
        throw result.error;
    }
}

const env: Environment = new Environment();
const databaseClient: DatabaseClient = new DatabaseClient(env);
const logger: Logger = new Logger(env);

const init = () => {
    // schema options
    const ajv = new Ajv({
        removeAdditional: false,
        useDefaults: true,
        coerceTypes: false,
        format: 'full',
        allErrors: true,
    });

    // create server fastify
    const server: fastify.FastifyInstance<Server, 
                                            IncomingMessage, 
                                            ServerResponse> = fastify({ logger: logger.log });
    server.setSchemaCompiler(schema => ajv.compile(schema));
    server.setErrorHandler(handleError);

    // initialize dependency injection
    const container = InversifyContainer(databaseClient, logger);

    //routes register
    server.register(getUser, container.get<ObtainAllUsers>(TYPES.ObtainAllUsers));
    server.register(getUserById, container.get<GetUserById>(TYPES.GetUserById));

    return server;
};

const start = async () => {
    try {
        const server = init();
        await server.listen(3000, '0.0.0.0');
    } catch (error) {
        logger.log.error(error);
        logger.log.error(Array.from(env.getAll()));
        process.exit(1);
    }
};

databaseClient
    .connect()
    .then(() => {
        logger.log.info('Database Connected!');
        start();
    })
    .catch(error => {
        logger.log.error(error.message);
        logger.log.error(Array.from(env.getAll()));
        process.exit(1);
    });
