import { Container } from 'inversify';
import { Client, ClientConfig } from 'pg';
import { TYPES } from './inversify.types';
import { UserServiceImpl } from './services/UserServiceImpl';
import { UserService } from './services/UserService';

const config: ClientConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'demo',
    password: 'docker',
    port: 5432,
};
const DependencyInjectionContainer = new Container();

DependencyInjectionContainer.bind<Client>(TYPES.Client).toConstantValue(new Client(config));
DependencyInjectionContainer.bind<UserService>(TYPES.UserService).to(UserServiceImpl);

export default DependencyInjectionContainer;
