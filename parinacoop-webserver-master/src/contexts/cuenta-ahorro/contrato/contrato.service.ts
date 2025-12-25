import { Injectable } from '@nestjs/common';
import { ContratoAceptadoRepository } from './contrato-aceptado.repository'; // Ajusta el path según corresponda

@Injectable()
export class ContratoService {
  constructor(private contratoAceptadoRepo: ContratoAceptadoRepository) {}

  async aceptarContrato(run: string, ip: string) {
    const fecha = new Date();
    await this.contratoAceptadoRepo.guardarAceptacion(run, fecha, ip);
  }
}