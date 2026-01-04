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
        userRun: row.userRun,
        initialAmount: Number(row.initialAmount),
        initialDate: row.initialDate,
        closeDate: row.closeDate,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        lastWithdrawalAt: row.lastWithdrawalAt,
        remainingWithdrawals: row.remainingWithdrawals,
        birthDate: row.birthDate,
        sex: row.sex,
        department: row.department,
        blockCondo: row.blockCondo,
        city: row.city,
        nationality: row.nationality,
        education: row.education,
        occupation: row.occupation,
        maritalStatus: row.maritalStatus,
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