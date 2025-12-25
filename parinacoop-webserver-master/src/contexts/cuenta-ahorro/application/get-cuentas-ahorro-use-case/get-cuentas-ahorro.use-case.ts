import { Inject } from '@nestjs/common';
import { CUENTA_AHORRO_REPO, CuentaAhorroRepository } from '../../domain/ports/cuenta-ahorro.repository';

export class GetCuentasAhorroUseCase {
  constructor(
    @Inject(CUENTA_AHORRO_REPO)
    private cuentaAhorroRepository: CuentaAhorroRepository
  ) {}

  async execute({ run }: { run: number }) {
    const resultado = await this.cuentaAhorroRepository.findByUserRun(run);
    return resultado;
  }
}