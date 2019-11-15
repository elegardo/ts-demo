import { User } from '../domain/User';

export interface UserService {
    obtainAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
}
