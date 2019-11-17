import { User } from '../entity/User';

export interface UserUseCases {
    obtainAllUsers(): Promise<User[]>;

    getUserById(id: number): Promise<User>;
}
