/* eslint-disable */
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { userSchema } from '../schemas/users.schema';

const schemaUsers = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: userSchema,
            },
        },
    },
};

const schemaUser = {
    schema: {
        response: {
            200: userSchema,
        },
    },
};

export default fp(async (server, service, next) => {
    // Declare a route

    server.get('/users', schemaUsers, (request, reply) => {
        service
            .obtainAllUsers()
            .then(res => {
                request.log.info(res);
                reply.send(res);
            })
            .catch(error => {
                reply.send(error);
            });
    });

    server.get('/users/:id', schemaUser, (request, reply) => {
        service
            .getUserById(request.params.id)
            .then(res => {
                request.log.info(res);
                reply.send(res);
            })
            .catch(error => {
                reply.send(error);
            });
    });

    next();
});