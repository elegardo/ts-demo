import 'reflect-metadata';
import fastify from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import usersRoutes from './routes/users';
import DependencyInjectionContainer from './inversify.config';
import { UserService } from './services/UserService';
import { TYPES } from './inversify.types';

const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify();

const service: UserService = DependencyInjectionContainer.get<UserService>(TYPES.UserService);

server.register(usersRoutes, service);

const start = async () => {
    try {
        await server.listen(3000, '0.0.0.0');
    } catch (err) {
        console.log(err);
        server.log.error(err);
        process.exit(1);
    }
};

start();
