import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { UserService } from '../services/UserService';

const opts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                    },
                },
            },
        },
    },
};

export default fp(async (server: FastifyInstance, service: UserService, next: Function) => {
    server.get('/users', opts, (request, reply) => {
        service
            .getAllUsers()
            .then(res => {
                console.log(res);
                reply.send(res);
            })
            .catch(error => {
                console.log(error);
            });
    });

    next();
});
