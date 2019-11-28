import { User } from '../entity/User';

export interface GetUserById {
  getUserById(id: number): Promise<User>;
}
