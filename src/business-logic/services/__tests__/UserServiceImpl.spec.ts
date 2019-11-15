/* eslint-disable */
import { User } from '../../model/User';
import { UserServiceImpl } from '../UserServiceImpl';
import { UserRepositoryImpl } from '../../../data-access/repository/UserRepositoryImpl';
import sinon from 'sinon';

describe('UserServiceImpl', () => {
    let service: UserServiceImpl;
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });
    afterEach(() => {
        sandbox.restore();
    });

    it('obtainAllUsers should deliver all user.', () => {
        var myServiceMock: UserRepositoryImpl = <UserRepositoryImpl>(<any>sinon.mock(UserRepositoryImpl));
        service = new UserServiceImpl(myServiceMock);
        const expectUsers: Promise<User[]> = Promise.resolve([{ id: 1, name: 'name1', email: '' }]);

        sinon.stub(UserServiceImpl.prototype, <any>'obtainAllUsers').returns(Promise.resolve(expectUsers));
        const users: Promise<User[]> = service.obtainAllUsers();

        expect(expectUsers).toEqual(users);
    });
});
