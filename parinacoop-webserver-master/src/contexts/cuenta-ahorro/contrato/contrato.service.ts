import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ContratoAceptadoRepository } from './domain/ports/contrato-aceptado.repository';

@Injectable()
export class ContratoService {
  constructor(private contratoAceptadoRepo: ContratoAceptadoRepository) {}

  async aceptarContrato(run: string, ip: string) {
    const fecha = new Date();
    try {
      await this.contratoAceptadoRepo.guardarAceptacion(run, fecha, ip);
    } catch (error) {
      
      console.error('Error guardando la aceptación de contrato:', error);

      // Relanzar un error HTTP 500 para el controller/NestJS
      throw new InternalServerErrorException('No se pudo registrar la aceptación del contrato');
    }
  }
}