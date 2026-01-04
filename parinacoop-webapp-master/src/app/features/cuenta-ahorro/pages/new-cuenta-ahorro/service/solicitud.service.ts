import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SavingsAccount } from '../../../models/cuenta-ahorro.model';


export interface SolicitudCuentaAhorroPayload {
  user_id: number;
  initial_amount: number;
  birth_date: string;
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


@Injectable({ providedIn: 'root' })
export class SolicitudService {
  constructor(private http: HttpClient) {}

  enviarSolicitud(datos: SolicitudCuentaAhorroPayload) {
    return this.http.post('savings-account', datos);
  }

  getUltimaCuentaAhorro() {
  return this.http.get<any>('savings-account/last');
}

}
