/* eslint-disable */
import { injectable, inject } from 'inversify';
import { UserEntity } from '../entity/UserEntity';
import { UserRepository } from './UserRepository';
import { NotFoundError } from '../error/NotFoundError';
import { TYPES } from '../../inversify.types';
import { Client } from 'pg';

@injectable()
export class UserRepositoryImpl implements UserRepository {
    protected client: Client;

    constructor(@inject(TYPES.Client) client: Client) {
        this.client = client;
    }

    async findAll(): Promise<UserEntity[]> {
        return this.client
            .query('select * from users')
            .then(response => {
                return response.rows;
            })
            .catch(error => {
                throw error;
            });
    }

    async findBy(id: number): Promise<UserEntity> {
        return this.client
            .query('select * from users where id = $1', [id])
            .then(response => {
                if (!response.rows[0]) {
                    throw new NotFoundError('Users not exist');
                }
                return response.rows[0];
            })
            .catch(error => {
                throw error;
            });
    }
}
