import { injectable } from 'inversify';
import { UserService } from './UserService';
import { User } from '../domain/User';

@injectable()
export class UserServiceImpl implements UserService {
    async getAllUsers(): Promise<User[]> {
        const users: User[] = [{ id: 1, name: '', email: '' }];
        return Promise.resolve(users);
    }
}
