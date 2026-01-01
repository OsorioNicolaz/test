import { Injectable } from '@nestjs/common';

import { Database } from '@/database/database';

import { User } from '../../domain/user';
import { UserRepository } from '../../domain/user.repository';

import { Role } from '@/contexts/shared/enums/roles.enum';

@Injectable()
export class PostgresUserRepository implements UserRepository {
  constructor(private db: Database) {}

  async getByRun(run: number): Promise<User | null> {
    const result = await this.db
      .selectFrom('user')
      .where('run', '=', run)
      .select(['run', 'role', 'password'])
      .executeTakeFirst();
    return result ? new User(result) : null;
  }


  async createUser(data: { run: number; password: string }): Promise<void> {
  await this.db
    .insertInto('user')
    .values({
      run: data.run,
      role: Role.CLIENT,
      password: data.password,
      password_attempts: 3,
      enabled: true,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .execute();
    }
}
