import { User } from '../domain/User';

export interface UserService {
    getAllUsers(): Promise<User[]>;
}
