import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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
}