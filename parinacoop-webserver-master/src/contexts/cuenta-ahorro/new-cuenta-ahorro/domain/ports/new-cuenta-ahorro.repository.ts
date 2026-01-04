import { CrearCuentaAhorroDto } from '../new-cuenta-ahorro.entity';

export const NewCuentaAhorroRepositoryToken = 'NewCuentaAhorroRepository';

export interface NewCuentaAhorroRepository {
  crearCuentaAhorro(data: CrearCuentaAhorroDto): Promise<any>; 
}