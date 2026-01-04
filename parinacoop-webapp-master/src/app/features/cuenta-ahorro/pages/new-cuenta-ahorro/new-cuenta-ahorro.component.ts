import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SolicitudService } from './service/solicitud.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/auth/services/auth.service';

@Component({
  selector: 'app-new-cuenta-ahorro',
  templateUrl: './new-cuenta-ahorro.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
  ],
})
export class NewCuentaAhorroComponent implements OnInit {
  form!: FormGroup;
  mensajeExito = '';

   constructor(
    private router: Router, 
    private fb: FormBuilder, 
    private solicitudService: SolicitudService,
    private authService: AuthService,
  ) {}

   volver() {
    this.router.navigate(['/','cliente','cuentas-de-ahorro']);
    }

  ngOnInit() {
    this.form = this.fb.group({
      initial_amount: ['', [Validators.required, Validators.min(5000)]],
      birth_date: ['', Validators.required],
      sex: ['', Validators.required],
      department: [''],
      block_condo: [''],
      city: ['', Validators.required],
      nationality: ['', Validators.required],
      education: ['', Validators.required],
      occupation: ['', Validators.required],
      marital_status: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const run = this.authService.run;
      if (!run) {
        alert('No se encontró un run válido, por favor reautentícate.');
        return;
      }
      const data = {
        ...this.form.value,
        user_run: run
      };
      this.solicitudService.enviarSolicitud(data).subscribe(
        () => {
          this.mensajeExito = 'Solicitud enviada correctamente.';
          setTimeout(() => {
            this.mensajeExito = '';
            this.volver();
          }, 2000);
        },
        error => {
          this.mensajeExito = 'Hubo un error al enviar la solicitud.';
          setTimeout(() => this.mensajeExito = '', 2500);
        }
      );
    }
  }
}