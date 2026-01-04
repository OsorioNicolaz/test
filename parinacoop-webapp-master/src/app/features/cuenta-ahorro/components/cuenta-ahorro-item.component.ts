import { Component, Input } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-saving-item',
  standalone: true,
  imports: [
    CurrencyPipe,  
    DatePipe,      
    DecimalPipe,   
  ],
  template: `
    <div class="rounded border p-3 flex w-full items-center min-h-[60px]">
      <div class="flex-1 flex flex-col items-center">
        <div class="font-bold">Cuenta de Ahorro</div>
        <div>N° {{ account.id | number:'6.0' }}</div>
      </div>
      <div class="flex-1 flex flex-col items-center">
        <div class="font-bold">Monto inicial</div>
        <div>{{ account.initialAmount | currency:'CLP':'symbol' }}</div>
      </div>
      <div>
        <div class="font-bold">Fecha apertura</div>
          <div>
            {{ account.initialDate ? (account.initialDate | date:'dd-MM-yyyy') : 'Aún no aceptada' }}
          </div>
      </div>
      <div class="flex-1 flex flex-col items-center">
        <div class="font-bold">Retiros restantes</div>
        <div>{{ account.remainingWithdrawals }}</div>
      </div>
      <div class="flex-1 flex flex-col items-center">
        <div class="font-bold">Estado de la cuenta</div>
        <div>{{ account.status }}</div>
      </div>
    </div>
  `
})
export class CuentaAhorroItemComponent {
  @Input() account: any;
}