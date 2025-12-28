import { Module } from '@nestjs/common';
import { ContratoController } from './contrato.controller';
import { ContratoService } from './contrato.service';

import { PostgreSqlContratoAceptadoRepository } from './infrastructure/repositories/postgresql.contrato-aceptado.repository';
import { ContratoAceptadoRepository } from './domain/ports/contrato-aceptado.repository';

@Module({
  controllers: [ContratoController],
  providers: [
    ContratoService,
    {
      provide: ContratoAceptadoRepository,         // Token abstracto
      useClass: PostgreSqlContratoAceptadoRepository, // Implementación concreta
    }
  ],
  exports: [ContratoService],
})
export class ContratoModule {}