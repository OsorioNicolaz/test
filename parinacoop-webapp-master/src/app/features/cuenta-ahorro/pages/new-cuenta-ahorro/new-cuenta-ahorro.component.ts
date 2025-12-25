import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewCuentaAhorroService } from './new-cuenta-ahorro.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-cuenta-ahorro',
  standalone: true,
  templateUrl: './new-cuenta-ahorro.component.html',
  imports: [ 
    ReactiveFormsModule,
    CommonModule,
  ]
})
export class NewCuentaAhorroComponent {
  form: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private newCuentaAhorroService: NewCuentaAhorroService,
    private router: Router
  ) {
    this.form = this.fb.group({
      monto: [null, [Validators.required, Validators.min(1000)]], // monto inicial
      interes: [null, [Validators.required, Validators.min(0)]],
      // Otros campos si los pides al usuario, si son automáticos, quítalos
      tipo: ['normal'],
    });
  }

  submit() {
  if (this.form.invalid) return;
  this.submitting = true;
  this.newCuentaAhorroService.createCuentaAhorro(this.form.value)
    .subscribe({
      next: () => {
        this.submitting = false;
        // Éxito: redirige o muestra mensaje
      },
      error: () => {
        this.submitting = false;
        // Muestra error
      }
    });
    }
}