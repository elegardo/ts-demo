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
const InjectionContainer = new Container();

InjectionContainer
    .bind<Client>(TYPES.Client)
    .toConstantValue(new Client(config));
InjectionContainer
    .bind<UserService>(TYPES.UserService)
    .to(UserServiceImpl);

export default InjectionContainer;
