import { User } from '../entity/User';

export interface ObtainAllUsers {
  obtainAllUsers(): Promise<User[]>;
}
