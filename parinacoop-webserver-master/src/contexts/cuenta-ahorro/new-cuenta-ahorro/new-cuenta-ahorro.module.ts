import { Module } from '@nestjs/common';
import { NewCuentaAhorroController } from './new-cuenta-ahorro.controller';
import { NewCuentaAhorroService } from './new-cuenta-ahorro.service';
import { PostgreSqlNewCuentaAhorroRepository } from './infrastructure/repositories/postgresql.new-cuenta-ahorro.repository';
import { NewCuentaAhorroRepositoryToken } from './domain/ports/new-cuenta-ahorro.repository';

@Module({
  controllers: [NewCuentaAhorroController],
  providers: [
    NewCuentaAhorroService,
    {
      provide: NewCuentaAhorroRepositoryToken,
      useClass: PostgreSqlNewCuentaAhorroRepository,
    },
  ],
  exports: [NewCuentaAhorroService],
})
export class NewCuentaAhorroModule {}