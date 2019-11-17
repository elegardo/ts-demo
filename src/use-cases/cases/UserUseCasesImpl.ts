import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { UserUseCases } from './UserUseCases';
import { UserRepository } from '../../data-access';
import { User } from '../entity/User';
import { TYPES } from '../../inversify.types';

@injectable()
export class UserUseCasesImpl implements UserUseCases {
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
