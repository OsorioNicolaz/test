import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NuevaCuentaAhorroPayload {
  monto: number;
  interes: number;
  tipo: string;
  // Agrega otros campos si corresponde
}

@Injectable({
  providedIn: 'root'
})
export class NewCuentaAhorroService {
  private apiUrl = '/api/cuentas-ahorro'; // Cambia esto por tu endpoint real

  constructor(private http: HttpClient) {}

  createCuentaAhorro(data: NuevaCuentaAhorroPayload): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
