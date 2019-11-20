import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { GetUserById } from './GetUserById';
import { UserRepository } from '../../data-access';
import { User } from '../entity/User';
import { TYPES } from '../../inversify.types';

@injectable()
export class GetUserByIdImpl implements GetUserById {
    protected repository: UserRepository;

    constructor(@inject(TYPES.UserRepository) repository: UserRepository) {
        this.repository = repository;
    }

    async getUserById(id: number): Promise<User> {
        return this.repository
            .findBy(id)
            .then(res => {
                return res;
            })
            .catch(error => {
                throw error;
            });
    }
}
