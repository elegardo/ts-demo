import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { ObtainAllUsers } from './ObtainAllUsers';
import { UserRepository } from '../../data-access';
import { User } from '../entity/User';
import { TYPES } from '../../inversify.types';

@injectable()
export class ObtainAllUsersImpl implements ObtainAllUsers {
    protected repository: UserRepository;

    constructor(@inject(TYPES.UserRepository) repository: UserRepository) {
        this.repository = repository;
    }

    async obtainAllUsers(): Promise<User[]> {
        return this.repository
            .findAll()
            .then(res => {
                return res;
            })
            .catch(error => {
                throw error;
            });
    }
}
