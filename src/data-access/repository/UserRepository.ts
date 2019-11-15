import { UserEntity } from '../entity/UserEntity';

export interface UserRepository {
    findAll(): Promise<UserEntity[]>;

    findBy(id: number): Promise<UserEntity>;
}
