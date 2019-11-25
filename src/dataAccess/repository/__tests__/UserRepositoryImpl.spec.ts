import { UserRepositoryImpl } from '../UserRepositoryImpl';
import { UserModel } from '../../model/UserModel';

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

    it('findAll throw Error when repository throw Error', () => {
        const mock = new MockDBClient();
        const expectError = new Error('Error query');
        mock.query.mockImplementation(() => {
            throw expectError;
        });

        const instance = new UserRepositoryImpl(mock);

        return instance.findAll().catch(error => {
            expect(error).toEqual(expectError);
        });
    });
});
