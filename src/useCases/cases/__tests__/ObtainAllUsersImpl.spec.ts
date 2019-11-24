/* eslint-disable */
import { User } from '../../entity/User';
import { ObtainAllUsersImpl } from '../ObtainAllUsersImpl';
import { UserRepositoryImpl } from '../../../dataAccess/repository/UserRepositoryImpl';
import sinon from 'sinon';

describe('ObtainAllUsersImpl', () => {
    let service: ObtainAllUsersImpl;
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });
    afterEach(() => {
        sandbox.restore();
    });

    it('obtainAllUsers should deliver all user.', () => {
        var myServiceMock: UserRepositoryImpl = <UserRepositoryImpl>(<any>sinon.mock(UserRepositoryImpl));
        service = new ObtainAllUsersImpl(myServiceMock);
        const expectUsers: Promise<User[]> = Promise.resolve([{ id: 1, name: 'name1', email: '' }]);

        sinon.stub(ObtainAllUsersImpl.prototype, <any>'obtainAllUsers').returns(Promise.resolve(expectUsers));
        const users: Promise<User[]> = service.obtainAllUsers();

        expect(expectUsers).toEqual(users);
    });
});
