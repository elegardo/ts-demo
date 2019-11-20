import { Container } from 'inversify';
import { Client } from 'pg';
import { Logger } from 'pino';
import { TYPES } from './inversify.types';

import { UserRepository } from './data-access/repository/UserRepository';
import { UserRepositoryImpl } from './data-access/repository/UserRepositoryImpl';
import { ObtainAllUsers } from './use-cases/cases/ObtainAllUsers';
import { ObtainAllUsersImpl } from './use-cases/cases/ObtainAllUsersImpl';
import { GetUserById } from './use-cases/cases/GetUserById';
import { GetUserByIdImpl } from './use-cases/cases/GetUserByIdImpl';

export const DIContainer = (client: Client, logger: Logger): Container => {
    const DIContainer = new Container();

    DIContainer.bind<Client>(TYPES.Client).toConstantValue(client);
    DIContainer.bind<Logger>(TYPES.Logger).toConstantValue(logger);

    DIContainer.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);

    //Use cases
    DIContainer.bind<ObtainAllUsers>(TYPES.ObtainAllUsers).to(ObtainAllUsersImpl);
    DIContainer.bind<GetUserById>(TYPES.GetUserById).to(GetUserByIdImpl);

    return DIContainer;
};
