/* eslint-disable */
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

export default fp(async (server, service, next) => {
    // Declare a route

    server.get('/users', schemaUsers, (request, reply) => {
        service
            .obtainAllUsers()
            .then(res => {
                request.log.debug('response=', res);
                reply.send(res);
            })
            .catch(error => {
                reply.send(error);
            });
    });

    next();
});
