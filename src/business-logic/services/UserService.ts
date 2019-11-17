import { User } from '../model/User';

export interface UserService {
    obtainAllUsers(): Promise<User[]>;

    getUserById(id: number): Promise<User>;
}
