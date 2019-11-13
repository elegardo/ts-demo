import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { UserService } from '../services/UserService';
import { userSchema } from '../schemas/users.schema';

const schema = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: userSchema,
            },
        },
    },
};

export default fp(async (
                    server: FastifyInstance, 
                    service: UserService, 
                    next: Function) => {
    // Declare a route

    server.get('/users', schema, (request, reply) => {
        service
            .obtainAllUsers()
            .then(res => {
                console.log(res);
                reply.send(res);
            })
            .catch(error => {
                console.error(error);
            });
    });

    next();
});
