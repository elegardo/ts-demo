/* eslint-disable */
import fp from 'fastify-plugin';
import { userSchema } from '../schemas/user.schema';

const opts = {
  schema: {
    response: {
      200: userSchema,
    },
  },
};

export default fp(async (server, service, next) => {
  // Declare a route

  server.get('/users/:id', opts, (request, reply) => {
    service
      .getUserById(request.params.id)
      .then((res) => {
        request.log.debug('params=', request.params);
        request.log.debug('response=', res);
        reply.send(res);
      })
      .catch((error) => {
        reply.send(error);
      });
  });

  next();
});
