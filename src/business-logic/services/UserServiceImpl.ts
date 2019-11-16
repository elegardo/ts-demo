/* eslint-disable */
import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../inversify.types';
import { UserService } from './UserService';
import { UserRepository } from '../../data-access/repository/UserRepository';
import { User } from '../model/User';

@injectable()
export class UserServiceImpl implements UserService {
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
