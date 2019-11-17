import { UserModel } from '../model/UserModel';

export interface UserRepository {
    findAll(): Promise<UserModel[]>;

    findBy(id: number): Promise<UserModel>;
}
