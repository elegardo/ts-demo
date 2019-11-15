/* eslint-disable */
import 'reflect-metadata';
import fastify from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import userRoutes from './routes/user.routes';
import DIContainer from './inversify.config';
import { UserService } from './services/UserService';
import { TYPES } from './inversify.types';
import Ajv from 'ajv';

const ajv = new Ajv({
    removeAdditional: false,
    useDefaults: true,
    coerceTypes: false,
    format: 'full',
    allErrors: true,
});

// initialize dependency injection
const service: UserService = DIContainer.get<UserService>(TYPES.UserService);

const init = () => {
    const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({ logger: false });
    server.setSchemaCompiler(schema => ajv.compile(schema));
    server.register(userRoutes, service);
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

start();
