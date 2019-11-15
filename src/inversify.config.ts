/* eslint-disable */
import { Container } from 'inversify';
import { Client, ClientConfig } from 'pg';
import { TYPES } from './inversify.types';
import { UserRepository } from './repository/UserRepository';
import { UserRepositoryImpl } from './repository/UserRepositoryImpl';
import { UserServiceImpl } from './services/UserServiceImpl';
import { UserService } from './services/UserService';
import * as dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
    throw result.error;
}

const config: ClientConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
};
const DIContainer = new Container();

DIContainer.bind<Client>(TYPES.Client).toConstantValue(new Client(config));
DIContainer.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);
DIContainer.bind<UserService>(TYPES.UserService).to(UserServiceImpl);

export default DIContainer;
