import { ObtainAllUsersImpl } from '../ObtainAllUsersImpl';
import { User } from '../../entity/User';

describe('ObtainAllUsersImpl', () => {
    let MockRepository: jest.Mock;

    beforeEach(() => {
        MockRepository = jest.fn(() => ({
            findAll: jest.fn(),
            findBy: jest.fn(),
        }));
    });

    it('obtainAllUsers.findAll is called once.', () => {
        const mock = new MockRepository();
        const instance = new ObtainAllUsersImpl(mock);

        instance.obtainAllUsers();

        expect(mock.findAll).toHaveBeenCalled();
    });

    it('obtainAllUsers should deliver all user.', () => {
        const mock = new MockRepository();
        const expectUsers: User[] = [{ id: 1, name: 'name1', email: '' }];
        mock.findAll.mockReturnValue(Promise.resolve(expectUsers));

        const instance = new ObtainAllUsersImpl(mock);

        return instance.obtainAllUsers().then(res => {
            expect(res).toEqual(expectUsers);
        });
    });

    it('obtainAllUsers throw Error when repository throw Error', () => {
        const mock = new MockRepository();
        const expectError = new Error('Error repository');
        mock.findAll.mockImplementation(() => {
            throw expectError;
        });

        const instance = new ObtainAllUsersImpl(mock);

        return instance.obtainAllUsers().catch(error => {
            expect(error).toEqual(expectError);
        });
    });
});
