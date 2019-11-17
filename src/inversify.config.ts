import { Container } from 'inversify';
import { Client } from 'pg';
import { UserRepository } from './data-access/repository/UserRepository';
import { UserRepositoryImpl } from './data-access/repository/UserRepositoryImpl';
import { UserServiceImpl } from './business-logic/services/UserServiceImpl';
import { UserService } from './business-logic/services/UserService';

const ServiceIdentifier = {
    Client: 'Client',
    UserRepository: 'UserRepository',
    UserService: 'UserService',
};

const DIContainer = (DBClient: Client): Container => {
    const DIContainer = new Container();

    DIContainer.bind<Client>(ServiceIdentifier.Client).toConstantValue(DBClient);
    DIContainer.bind<UserRepository>(ServiceIdentifier.UserRepository).to(UserRepositoryImpl);
    DIContainer.bind<UserService>(ServiceIdentifier.UserService).to(UserServiceImpl);

    return DIContainer;
};

export { DIContainer, ServiceIdentifier };
