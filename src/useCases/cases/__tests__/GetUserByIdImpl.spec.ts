import { GetUserByIdImpl } from '../GetUserByIdImpl';
import { User } from '../../entity/User';

describe('GetUserByIdImpl', () => {
    let MockRepository: jest.Mock;
    let MockLogger: jest.Mock;

    beforeEach(() => {
        MockRepository = jest.fn(() => ({
            findAll: jest.fn(),
            findBy: jest.fn(),
        }));

        MockLogger = jest.fn().mockImplementation(() => {
            return { log: { info: jest.fn(), error: jest.fn() } };
        });
    });

    it('GetUserByIdImpl.getUserById is called once.', () => {
        const mockRepository = new MockRepository();
        const mockLogger = new MockLogger();
        const instance = new GetUserByIdImpl(mockLogger, mockRepository);

        instance.getUserById(1);

        expect(mockRepository.findBy).toHaveBeenCalled();
    });

    it('GetUserByIdImpl.getUserById with id = 1 return one user with user.id = 1.', () => {
        const mockRepository = new MockRepository();
        const mockLogger = new MockLogger();
        const expectUser: User = { id: 1, name: 'name1', email: '' };
        mockRepository.findBy.mockReturnValue(Promise.resolve(expectUser));

        const instance = new GetUserByIdImpl(mockLogger, mockRepository);

        return instance.getUserById(1).then(res => {
            expect(res).toEqual(expectUser);
        });
    });

    it('GetUserByIdImpl.getUserById throw Error when user will not exist.', () => {
        const mockRepository = new MockRepository();
        const mockLogger = new MockLogger();
        const expectError = new Error('Not Found');
        mockRepository.findBy.mockImplementation(() => {
            throw expectError;
        });

        const instance = new GetUserByIdImpl(mockLogger, mockRepository);

        return instance.getUserById(1).catch(error => {
            expect(error).toEqual(expectError);
        });
    });
});
