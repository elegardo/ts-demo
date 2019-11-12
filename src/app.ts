import fastify from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import usersRoutes from './routes/users';

const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify();

server.register(usersRoutes);

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
