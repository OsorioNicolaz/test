import { Generated } from 'kysely';

export interface ContratosAceptadosTable {
  id: Generated<number>;
  run: string;
  fechaAceptacion: Date;
  ip: string;
}