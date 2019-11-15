import { injectable, inject } from 'inversify';
import { UserEntity } from '../entity/UserEntity';
import { UserRepository } from './UserRepository';
import { TYPES } from '../inversify.types';
import { Client } from 'pg';

@injectable()
export class UserRepositoryImpl implements UserRepository {
    protected client: Client;

    constructor(@inject(TYPES.Client) client: Client) {
        this.client = client;
        this.client.connect();
    }

    async findAll(): Promise<UserEntity[]> {
        const queryResult = this.client
            .query('select * from users')
            .then(response => {
                return response.rows;
            })
            .catch(error => {
                throw error;
            });
        return queryResult;
    }
}
