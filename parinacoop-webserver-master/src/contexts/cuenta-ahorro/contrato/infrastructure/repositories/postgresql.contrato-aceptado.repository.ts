import { Injectable } from '@nestjs/common';
import { Database } from '@/database/database';
import { ContratoAceptadoRepository } from '../../domain/ports/contrato-aceptado.repository';

@Injectable()
export class PostgreSqlContratoAceptadoRepository implements ContratoAceptadoRepository {
  constructor(private db: Database) {}

  async guardarAceptacion(run: number, fecha: Date, ip: string): Promise<void> {
    await this.db
      .insertInto('contratos_aceptados')
      .values({ run, fecha_aceptacion: fecha, ip })
      .execute();
  }

  async existeAceptacion(run: number): Promise<boolean> {
  const existente = await this.db
    .selectFrom('contratos_aceptados')
    .select(['id'])
    .where('run', '=', run)
    .executeTakeFirst();
  return !!existente;
 }
}