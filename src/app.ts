/* eslint-disable */
import 'reflect-metadata';
import fastify from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { DIContainer, ServiceIdentifier } from './inversify.config';
import { DBClient, Logger, HandleError, UserRoutes } from './api-layer';
import { UserService } from './business-logic/';
import Ajv from 'ajv';

// schema options
const ajv = new Ajv({
    removeAdditional: false,
    useDefaults: true,
    coerceTypes: false,
    format: 'full',
    allErrors: true,
});

const init = (service: UserService) => {
    const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({ logger: Logger });
    server.setSchemaCompiler(schema => ajv.compile(schema));
    server.setErrorHandler(HandleError);
    server.register(UserRoutes, service);

    return server;
};

const start = async (service: UserService) => {
    try {
        const server = init(service);
        await server.listen(3000, '0.0.0.0');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

DBClient.connect()
    .then(() => {
        console.log('Connected!');
        // initialize dependency injection
        const container = DIContainer(DBClient);
        const service: UserService = container.get<UserService>(ServiceIdentifier.UserService);
        start(service);
    })
    .catch(error => {
        console.error(error.message);
        process.exit(1);
    });
