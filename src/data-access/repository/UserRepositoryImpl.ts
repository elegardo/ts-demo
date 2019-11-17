/* eslint-disable */
import { injectable, inject } from 'inversify';
import { UserModel } from '../model/UserModel';
import { UserRepository } from './UserRepository';
import { NotFoundError } from '../error/NotFoundError';
import { Client } from 'pg';
import { TYPES } from '../../inversify.types';

@injectable()
export class UserRepositoryImpl implements UserRepository {
    protected client: Client;

    constructor(@inject(TYPES.Client) client: Client) {
        this.client = client;
    }

    async findAll(): Promise<UserModel[]> {
        return this.client
            .query('select * from users')
            .then(response => {
                return response.rows;
            })
            .catch(error => {
                throw error;
            });
    }

    async findBy(id: number): Promise<UserModel> {
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