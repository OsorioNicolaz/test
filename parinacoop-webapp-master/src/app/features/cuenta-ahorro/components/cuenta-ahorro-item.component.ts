import { Component, Input } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-saving-item',
  standalone: true,
  imports: [
    CurrencyPipe,  // Ya lo tienes para monto y saldo
    DatePipe,      // Para | date
    DecimalPipe,   // Para | number
  ],
  template: `
    <div class="rounded border p-3 flex w-full items-center min-h-[60px]">
      <div class="flex-1 flex flex-col items-center">
        <div class="font-bold">Cuenta de Ahorro</div>
        <div>N° {{ account.id | number:'6.0' }}</div>
      </div>
      <div class="flex-1 flex flex-col items-center">
        <div class="font-bold">Monto inicial</div>
        <div>{{ account.monto | currency:'CLP':'symbol' }}</div>
      </div>
      <div class="flex-1 flex flex-col items-center">
        <div class="font-bold">Saldo actual</div>
        <div>{{ account.saldo_actual | currency:'CLP':'symbol' }}</div>
      </div>
      <div class="flex-1 flex flex-col items-center">
        <div class="font-bold">Interés</div>
        <div>{{ account.interes }}%</div>
      </div>
      <div class="flex-1 flex flex-col items-center">
        <div class="font-bold">Fecha apertura</div>
        <div>{{ account.fecha_apertura | date:'dd-MM-yyyy' }}</div>
      </div>
    </div>
  `
})
export class CuentaAhorroItemComponent {
  @Input() account: any;
}