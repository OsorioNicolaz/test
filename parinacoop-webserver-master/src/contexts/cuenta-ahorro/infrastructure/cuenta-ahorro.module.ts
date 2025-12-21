import { Module } from '@nestjs/common';
import { GetCuentasAhorroController } from './http/get-cuentas-ahorro/get-cuentas-ahorro.controller';
import { GetCuentasAhorroUseCase } from '../application/get-cuentas-ahorro-use-case/get-cuentas-ahorro.use-case';
import { PostgreSqlCuentaAhorroRepository } from './repositories/postgresql.cuenta-ahorro-repository';
import { CUENTA_AHORRO_REPO } from '../domain/ports/cuenta-ahorro.repository';

@Module({
  controllers: [
    GetCuentasAhorroController
  ],
  providers: [
    GetCuentasAhorroUseCase,
    {
        provide: CUENTA_AHORRO_REPO,
        useClass: PostgreSqlCuentaAhorroRepository
    }
    // otros providers
  ],
  exports: [
    // Si otro módulo necesita este use case/repo se agrega aquí
  ]
})
export class CuentaAhorroModule {}