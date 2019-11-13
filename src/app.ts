import 'reflect-metadata';
import fastify from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import usersRoutes from './routes/users.route';
import InjectionContainer from './inversify.config';
import { UserService } from './services/UserService';
import { TYPES } from './inversify.types';

const server: fastify.FastifyInstance<
                                Server, 
                                IncomingMessage, 
                                ServerResponse> = fastify({ logger: false });

const service: UserService = InjectionContainer
                                .get<UserService>(TYPES.UserService);

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
