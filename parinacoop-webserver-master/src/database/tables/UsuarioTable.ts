import { Role } from '@/contexts/shared/enums/roles.enum';

export interface UsuarioTable {
  run: number;
  role: Role;
  password: string;
  password_attempts: number;
  enabled: boolean;
  created_at: Date;
  updated_at: Date;
}