import { Injectable } from '@nestjs/common';
import { Database } from '@/database/database';
import { ContratoAceptadoRepository } from '../../domain/ports/contrato-aceptado.repository';

@Injectable()
export class PostgreSqlContratoAceptadoRepository implements ContratoAceptadoRepository {
  constructor(private db: Database) {}

  async guardarAceptacion(run: string, fecha: Date, ip: string): Promise<void> {
    await this.db
      .insertInto('contratos_aceptados')
      .values({ run, fechaAceptacion: fecha, ip })
      .execute();
  }
}