import { CuentaAhorro } from '../models/CuentaAhorro';

export const CUENTA_AHORRO_REPO = 'CUENTA_AHORRO_REPO';

export abstract class CuentaAhorroRepository {
  abstract findByUserRun(run: number): Promise<any>;
}