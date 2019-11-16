/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
function serviceError(name, description) {
    return { name: name, description: description };
}

module.exports = async (error, req, reply) => {
    if (error.name === 'NotFoundError') {
        reply.status(404);
        reply.send(serviceError('NotFoundError', error.message));
    } else {
        reply.status(500);
        reply.send(serviceError('ServiceError', error.message));
    }
};
