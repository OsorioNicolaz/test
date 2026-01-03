import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SolicitudService } from './service/solicitud.service';

@Component({
  selector: 'app-new-cuenta-ahorro',
  templateUrl: './new-cuenta-ahorro.component.html'
})
export class NewCuentaAhorroComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private solicitudService: SolicitudService) {}

  ngOnInit() {
    this.form = this.fb.group({
      initial_amount: ['', [Validators.required, Validators.min(1)]],
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
      this.solicitudService.enviarSolicitud(this.form.value).subscribe(
        () => alert('¡Solicitud enviada! La empresa gestionará la apertura de tu cuenta.'),
        error => alert('Hubo un error al enviar la solicitud.')
      );
    }
  }
}