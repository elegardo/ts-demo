import { UserEntity } from '../entity/UserEntity';

export interface UserRepository {
    findAll(): Promise<UserEntity[]>;
}
