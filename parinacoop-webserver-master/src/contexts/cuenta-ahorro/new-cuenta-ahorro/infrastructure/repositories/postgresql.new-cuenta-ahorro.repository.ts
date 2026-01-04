import { Injectable } from '@nestjs/common';
import { Database } from '@/database/database';
import { NewCuentaAhorroRepository } from '../../domain/ports/new-cuenta-ahorro.repository';
import { CrearCuentaAhorroDto } from '../../domain/new-cuenta-ahorro.entity';
import { Insertable } from 'kysely';
import { SavingsAccountTable } from '@/database/tables/savingsAccountTable';

@Injectable()
export class PostgreSqlNewCuentaAhorroRepository implements NewCuentaAhorroRepository {
  constructor(private db: Database) {}

  async crearCuentaAhorro(data: CrearCuentaAhorroDto): Promise<any> {
    const result = await this.db
      .insertInto('savings_account')
      .values({
        user_run: data.user_run,
        initial_amount: data.initial_amount,
        birth_date: data.birth_date,
        sex: data.sex ?? null,
        department: data.department ?? null,
        block_condo: data.block_condo ?? null,
        city: data.city ?? null,
        nationality: data.nationality ?? null,
        education: data.education ?? null,
        occupation: data.occupation ?? null,
        marital_status: data.marital_status ?? null,

        // Campos que espera la tabla pero NO envía el DTO:
        initial_date: null,
        close_date: null,
        last_withdrawal_at: null,
        remaining_withdrawals: 6, // Asegura que no falle por algún problema

        created_at: new Date(),
        updated_at: new Date(),
        status: 'pendiente',    // Asegura que no falle por algún problema
      } as Insertable<SavingsAccountTable>)
      .returningAll() 
      .execute();
    return result[0]; // Devuelve la cuenta creada
  }
}