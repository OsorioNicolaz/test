import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SavingsAccount } from './models/cuenta-ahorro.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CuentaAhorroService {
  private accountsSubject = new BehaviorSubject<SavingsAccount[]>([]);
  public accounts$ = this.accountsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getClientProfile(run: number): Observable<any> {
    return this.http.get(`profile/${run}`);
  }

  usuarioYaAceptoContrato(run: number): Observable<boolean> {
    return this.http.get<boolean>('contrato/aceptado/' + run);
  }

  getAhorroList(run: number): void {
  this.http.get<{ cuentas: any[] }>(`clients/${run}/cuentas-ahorro`).subscribe({
    next: (response) => {
      const mappedCuentas = response.cuentas.map(row => ({
        id: row.id,
        userRun: row.user_run,
        initialAmount: Number(row.initial_amount),
        initialDate: row.initial_date,
        closeDate: row.close_date,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        lastWithdrawalAt: row.last_withdrawal_at,
        remainingWithdrawals: row.remaining_withdrawals,
        birthDate: row.birth_date,
        sex: row.sex,
        department: row.department,
        blockCondo: row.block_condo,
        city: row.city,
        nationality: row.nationality,
        education: row.education,
        occupation: row.occupation,
        maritalStatus: row.marital_status,
        status: row.status,
      }))
      this.accountsSubject.next(mappedCuentas);
    },
  });
}

  aceptarContrato(run: number) {
    return this.http.post('contrato/aceptar', { run });
  }
}