/* eslint-disable */
import { ContainerModule, injectable, inject } from 'inversify';
import { DatabaseClient, Logger, Environment } from '../utilities';
import { TYPES } from '../inversify.types';
import { UserRepository } from './repository/UserRepository';
import { UserRepositoryImpl } from './repository/UserRepositoryImpl';
import { NotFoundError } from './error/NotFoundError';

const env: Environment = new Environment();
const logger: Logger = new Logger(env);

@injectable()
class A extends UserRepositoryImpl {
    constructor(@inject(TYPES.DatabaseClient) client: DatabaseClient) {
        super(client);
    }
}

const container = new ContainerModule(bind => {
    bind<UserRepository>(TYPES.UserRepository)
        .to(A)
        //Handler for logging
        .onActivation((context, repository) => {
            const handler = {
                apply: function(target: any, thisArgument: any, argumentsList: any) {
                    const timeStarting = new Date().getTime();
                    const result = target.apply(thisArgument, argumentsList);
                    const timeFinished = new Date().getTime();
                    logger.log.info(
                        `[UserRepositoryImpl.findBy]{${argumentsList}} elapsed: ${timeFinished - timeStarting}(ms)`,
                    );
                    return result;
                },
            };
            repository.findBy = new Proxy(repository.findBy, handler);
            return repository;
        });
});

export { container, UserRepository, NotFoundError };
