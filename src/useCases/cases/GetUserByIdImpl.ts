import { GetUserById } from './GetUserById';
import { UserRepository } from '../../dataAccess';
import { User } from '../entity/User';

export class GetUserByIdImpl implements GetUserById {
    protected repository: UserRepository;

    constructor(repository: UserRepository) {
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
