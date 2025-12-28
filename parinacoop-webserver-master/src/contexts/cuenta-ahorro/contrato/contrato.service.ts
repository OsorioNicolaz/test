import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ContratoAceptadoRepository } from './domain/ports/contrato-aceptado.repository';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class ContratoService {
  constructor(private contratoAceptadoRepo: ContratoAceptadoRepository) {}

  async aceptarContrato(run: number, ip: string) {
    const fecha = new Date();
    try {
      
      const yaAceptado = await this.contratoAceptadoRepo.existeAceptacion(run);
    if (yaAceptado) {
      throw new ConflictException('Ya se aceptó el contrato anteriormente');
    }

      await this.contratoAceptadoRepo.guardarAceptacion(run, fecha, ip);
    } catch (error) {
      
      console.error('Error guardando la aceptación de contrato:', error);

      // Relanzar un error HTTP 500 para el controller/NestJS
      throw new InternalServerErrorException('No se pudo registrar la aceptación del contrato');
    }
  }

  async yaAceptoContrato(run: number): Promise<boolean> {
  return this.contratoAceptadoRepo.existeAceptacion(run);
  }
}