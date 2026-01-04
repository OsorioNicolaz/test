export interface CrearCuentaAhorroDto {
  user_run: number;
  initial_amount: number;
  birth_date: Date;
  sex: string;
  department?: number;
  block_condo?: string;
  city: string;
  nationality: string;
  education: string;
  occupation: string;
  marital_status: string;
  status?: 'pendiente' | 'creada' | 'rechazada';
}