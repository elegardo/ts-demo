import { ContainerModule, injectable, inject } from 'inversify';
import { Client } from 'pg';
import { TYPES } from '../inversify.types';
import { UserRepository } from './repository/UserRepository';
import { UserRepositoryImpl } from './repository/UserRepositoryImpl';
import { NotFoundError } from './error/NotFoundError';

@injectable()
class A extends UserRepositoryImpl {
    constructor(@inject(TYPES.Client) client: Client) {
        super(client);
    }
}

const container = new ContainerModule(bind => {
    bind<UserRepository>(TYPES.UserRepository).to(A);
});

export { container, UserRepository, NotFoundError };
