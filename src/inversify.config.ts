import { Container } from 'inversify';
import { Client } from 'pg';
import { Logger } from 'pino';
import { UserRepository } from './data-access/repository/UserRepository';
import { UserRepositoryImpl } from './data-access/repository/UserRepositoryImpl';
import { UserUseCases } from './use-cases/cases/UserUseCases';
import { UserUseCasesImpl } from './use-cases/cases/UserUseCasesImpl';
import { TYPES } from './inversify.types';

export const DIContainer = (client: Client, logger: Logger): Container => {
    const DIContainer = new Container();

    DIContainer.bind<Client>(TYPES.Client).toConstantValue(client);
    DIContainer.bind<Logger>(TYPES.Logger).toConstantValue(logger);
    DIContainer.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);
    DIContainer.bind<UserUseCases>(TYPES.UserUseCase).to(UserUseCasesImpl);

    return DIContainer;
};
