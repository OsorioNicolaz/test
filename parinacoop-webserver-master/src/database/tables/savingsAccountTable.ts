
export interface SavingsAccountTable {
  id: number;
  user_run: number;
  initial_amount: number;
  initial_date: Date | null;
  close_date: Date | null;
  created_at: Date;
  updated_at: Date;
  last_withdrawal_at: Date | null;
  remaining_withdrawals: number | null;
  birth_date: Date | null;
  sex: string | null;
  department: number | null;
  block_condo: string | null;
  city: string | null;
  nationality: string | null;
  education: string | null;
  occupation: string | null;
  marital_status: string | null;
  status: 'pendiente' | 'creada' | 'rechazada';
}