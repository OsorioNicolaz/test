import { User } from './user';

export abstract class UserRepository {
  abstract getByRun(run: number): Promise<User | null>;
  abstract createUser(data: { run: number; password: string }): Promise<void>;
}
