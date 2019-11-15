/* eslint-disable */
import { User } from '../../domain/User';
import { UserServiceImpl } from '../UserServiceImpl';
import sinon from 'sinon';

describe('UserServiceImpl', () => {
    let service: UserServiceImpl;
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        service = new UserServiceImpl();
        sandbox = sinon.createSandbox();
    });
    afterEach(() => {
        sandbox.restore();
    });

    it('obtainAllUsers should deliver all user.', () => {
        const expectUsers: Promise<User[]> = Promise.resolve([{ id: 1, name: 'name1', email: '' }]);

        sinon.stub(UserServiceImpl.prototype, <any>'obtainAllUsers').returns(Promise.resolve(expectUsers));
        const users: Promise<User[]> = service.obtainAllUsers();

        expect(expectUsers).toEqual(users);
    });
});
