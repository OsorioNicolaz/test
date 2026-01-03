import { Injectable } from '@nestjs/common';
import { Database } from '@/database/database';
import { CuentaAhorroRepository } from '../../domain/ports/cuenta-ahorro.repository';
import { SavingsAccount } from '../../domain/models/CuentaAhorro';

@Injectable()
export class PostgreSqlCuentaAhorroRepository extends CuentaAhorroRepository {
  constructor(private db: Database) {
    super();
  }

  async findByUserRun(run: number): Promise<SavingsAccount[]> {
    const result = await this.db
      .selectFrom('savings_account')
      .where('user_run', '=', run)
      .selectAll()
      .execute();
    result.map(row => new SavingsAccount({
    id: row.id,
    userRun: row.user_run,
    initialAmount: Number(row.initial_amount), 
    initialDate: row.created_at,
    closeDate: row.close_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    lastWithdrawalAt: row.last_withdrawal_at,
    remainingWithdrawals: row.remaining_withdrawals,
    birthDate: row.birth_date,
    sex: row.sex,
    department: row.department,
    blockCondo: row.block_condo,
    city: row.city,
    nationality: row.nationality,
    education: row.education,
    occupation: row.occupation,
    maritalStatus: row.marital_status,
    }));
      return result.map(row => new SavingsAccount({
    id: row.id,
    userRun: row.user_run,
    initialAmount: Number(row.initial_amount),
    initialDate: row.initial_date,
    closeDate: row.close_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    lastWithdrawalAt: row.last_withdrawal_at,
    remainingWithdrawals: row.remaining_withdrawals,
    birthDate: row.birth_date,
    sex: row.sex,
    department: row.department,
    blockCondo: row.block_condo,
    city: row.city,
    nationality: row.nationality,
    education: row.education,
    occupation: row.occupation,
    maritalStatus: row.marital_status,
    }));
  }
}