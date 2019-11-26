import { UserRepositoryImpl } from '../UserRepositoryImpl';
import { UserModel } from '../../model/UserModel';
import { NotFoundError } from '../../error/NotFoundError';

describe('UserRepositoryImpl', () => {
    let MockDBClient: jest.Mock;

    beforeEach(() => {
        MockDBClient = jest.fn().mockImplementation(() => {
            return { query: jest.fn() };
        });
    });

    it('findAll is called once.', () => {
        const mock = new MockDBClient();
        const instance = new UserRepositoryImpl(mock);

        instance.findAll();

        expect(mock.query).toHaveBeenCalled();
    });

    it('findAll should deliver all user.', () => {
        const mock = new MockDBClient();
        const expectQuery: any = { rows: [{ id: 1, name: 'name1', email: 'email1' }] };
        const expectUsers: UserModel[] = [new UserModel(1, 'name1', 'email1')];
        mock.query.mockReturnValue(Promise.resolve(expectQuery));

        const instance = new UserRepositoryImpl(mock);

        return instance.findAll().then(res => {
            expect(res).toEqual(expectUsers);
        });
    });

    it('findAll throw Error when quey repository', async () => {
        const mock = new MockDBClient();
        mock.query.mockImplementation(() => {
            throw new Error('Error query');
        });

        const instance = new UserRepositoryImpl(mock);

        await expect(instance.findAll()).rejects.toThrow();
    });

    it('findBy is called once.', () => {
        const mock = new MockDBClient();
        const instance = new UserRepositoryImpl(mock);

        instance.findBy(1);

        expect(mock.query).toHaveBeenCalled();
    });

    it('findBy with id = 1 return one user with user.id = 1.', () => {
        const mock = new MockDBClient();
        const expectQuery: any = { rows: [{ id: 1, name: 'name1', email: 'email1' }] };
        const expectUser: UserModel = new UserModel(1, 'name1', 'email1');
        mock.query.mockReturnValue(Promise.resolve(expectQuery));

        const instance = new UserRepositoryImpl(mock);

        return instance.findBy(1).then(res => {
            expect(res).toEqual(expectUser);
        });
    });

    it('findBy throw NotFoundError when user will not exist.', () => {
        const mock = new MockDBClient();
        const expectQuery: any = { rows: [] };
        const expectError = new NotFoundError('Users not exist');
        mock.query.mockReturnValue(Promise.resolve(expectQuery));

        const instance = new UserRepositoryImpl(mock);

        return instance.findBy(1).catch(error => {
            expect(error).toEqual(expectError);
        });
    });
});
