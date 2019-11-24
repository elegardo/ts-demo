import { GetUserById } from './GetUserById';
import { UserRepository } from '../../dataAccess';
import { User } from '../entity/User';
import { Logger } from '../../utilities';

export class GetUserByIdImpl implements GetUserById {
    protected repository: UserRepository;
    protected logger: Logger;

    constructor(logger: Logger, repository: UserRepository) {
        this.logger = logger;
        this.repository = repository;
    }

    async getUserById(id: number): Promise<User> {
        return this.repository
            .findBy(id)
            .then(res => {
                this.logger.log.info('[GetUserByIdImpl.getUserById]', id);
                return res;
            })
            .catch(error => {
                this.logger.log.error('[GetUserByIdImpl.getUserById]', id, error.message);
                throw error;
            });
    }
}
