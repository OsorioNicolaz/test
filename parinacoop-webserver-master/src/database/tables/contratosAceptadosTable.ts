import { Generated } from 'kysely';

export interface ContratosAceptadosTable {
  id: Generated<number>;
  run: number;
  fecha_aceptacion: Date;
  ip: string;
}