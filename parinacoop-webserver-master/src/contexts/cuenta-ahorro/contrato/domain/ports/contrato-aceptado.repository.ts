

export abstract class ContratoAceptadoRepository {
  abstract guardarAceptacion(run: number, fecha: Date, ip: string): Promise<void>;
  abstract existeAceptacion(run: number): Promise<boolean>;
}
