import { ObtainAllUsers } from './ObtainAllUsers';
import { UserRepository } from '../../data-access';
import { User } from '../entity/User';

export class ObtainAllUsersImpl implements ObtainAllUsers {
    protected repository: UserRepository;

    constructor(repository: UserRepository) {
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
