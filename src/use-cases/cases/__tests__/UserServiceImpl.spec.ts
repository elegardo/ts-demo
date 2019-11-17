/* eslint-disable */
import { User } from '../../entity/User';
import { UserUseCasesImpl } from '../UserUseCasesImpl';
import { UserRepositoryImpl } from '../../../data-access/repository/UserRepositoryImpl';
import sinon from 'sinon';

describe('UserUseCasesImpl', () => {
    let service: UserUseCasesImpl;
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });
    afterEach(() => {
        sandbox.restore();
    });

    it('obtainAllUsers should deliver all user.', () => {
        var myServiceMock: UserRepositoryImpl = <UserRepositoryImpl>(<any>sinon.mock(UserRepositoryImpl));
        service = new UserUseCasesImpl(myServiceMock);
        const expectUsers: Promise<User[]> = Promise.resolve([{ id: 1, name: 'name1', email: '' }]);

        sinon.stub(UserUseCasesImpl.prototype, <any>'obtainAllUsers').returns(Promise.resolve(expectUsers));
        const users: Promise<User[]> = service.obtainAllUsers();

        expect(expectUsers).toEqual(users);
    });
});
