export interface PrimitiveSavingsAccount {
  id: number;
  userRun: number;
  initialAmount: number;
  initialDate: Date | null;
  closeDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  lastWithdrawalAt: Date | null;
  remainingWithdrawals: number | null;
  birthDate: Date | null;
  sex: string | null;
  department: number | null;
  blockCondo: string | null;
  city: string | null;
  nationality: string | null;
  education: string | null;
  occupation: string | null;
  maritalStatus: string | null;
  status: string;
}

export class SavingsAccount {
  constructor(private attributes: PrimitiveSavingsAccount) {}
  toValue(): PrimitiveSavingsAccount {
    return this.attributes;
  }
}