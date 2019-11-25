import { ContainerModule, injectable, inject } from 'inversify';
import { TYPES } from '../inversify.types';
import { ObtainAllUsers } from './cases/ObtainAllUsers';
import { ObtainAllUsersImpl } from './cases/ObtainAllUsersImpl';
import { GetUserById } from './cases/GetUserById';
import { GetUserByIdImpl } from './cases/GetUserByIdImpl';
import { UserRepository } from '../dataAccess';
import { Logger } from '../utilities';

@injectable()
class A extends ObtainAllUsersImpl {
    constructor(@inject(TYPES.UserRepository) repository: UserRepository) {
        super(repository);
    }
}

@injectable()
class B extends GetUserByIdImpl {
    constructor(@inject(TYPES.Logger) logger: Logger, @inject(TYPES.UserRepository) repository: UserRepository) {
        super(logger, repository);
    }
}

const container = new ContainerModule(bind => {
    bind<ObtainAllUsers>(TYPES.ObtainAllUsers).to(A);
    bind<GetUserById>(TYPES.GetUserById).to(B);
});

export { container, ObtainAllUsers, GetUserById };
