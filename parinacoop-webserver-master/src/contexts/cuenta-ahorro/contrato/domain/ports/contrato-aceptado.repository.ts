import { ContratoAceptado } from '../../contrato-aceptado.entity';

export abstract class ContratoAceptadoRepository {
  abstract guardarAceptacion(run: string, fecha: Date, ip: string): Promise<void>;
  // agrega otros métodos si los quieres, ejemplo: getByRun?
}