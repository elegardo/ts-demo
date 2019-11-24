import { UserModel } from '../model/UserModel';
import { UserRepository } from './UserRepository';
import { NotFoundError } from '../error/NotFoundError';
import { DatabaseClient } from '../../utilities';

export class UserRepositoryImpl implements UserRepository {
    protected _client: DatabaseClient;

    constructor(client: DatabaseClient) {
        this._client = client;
    }

    async findAll(): Promise<UserModel[]> {
        return this._client
            .query('select * from users')
            .then(response => {
                return response.rows;
            })
            .catch(error => {
                throw error;
            });
    }

    async findBy(id: number): Promise<UserModel> {
        return this._client
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
