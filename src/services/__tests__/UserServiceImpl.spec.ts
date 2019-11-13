import { User } from '../../domain/User'
import { UserServiceImpl } from '../UserServiceImpl';

const service: UserServiceImpl = new UserServiceImpl();

describe('UserServiceImpl', () => {
    
    it('obtainAllUsers should deliver all user.', () => {
        const expectUsers: User[] = [{ id: 1, name: '', email: '' }];

        const users: Promise<User[]> = service.obtainAllUsers();

        expect(Promise.resolve(expectUsers)).toEqual(users);
    });
});
