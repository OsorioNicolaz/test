import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
  ]
})
export default class RegisterComponent implements OnInit {
  step = 2;

  userForm!: FormGroup;
  addressForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      run: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    }, { validators: [passwordsMatchValidator] });

    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      number: [null, [Validators.required, Validators.min(1)]],
      commune_id: ['', Validators.required],
      detail: ['']
    });
  }

  get runCtrl() { return this.userForm.get('run') as FormControl; }
  get passwordCtrl() { return this.userForm.get('password') as FormControl; }
  get confirmPasswordCtrl() { return this.userForm.get('confirmPassword') as FormControl; }

  get streetCtrl() { return this.addressForm.get('street') as FormControl; }
  get numberCtrl() { return this.addressForm.get('number') as FormControl; }
  get communeCtrl() { return this.addressForm.get('commune_id') as FormControl; }
  get detailCtrl() { return this.addressForm.get('detail') as FormControl; }



  onUserDataSubmit() {
    if (this.userForm.valid) {
      const { run, password } = this.userForm.value;
      // Llama a tu servicio para crear el usuario aquí.
      // El backend debe:
      //    - asignar roll CLIENT automáticamente
      //    - guardar password como hash bcrypt
      this.authService.registrarUsuario(run, password).subscribe(() => {
        this.step = 2; // Pasa al formulario de dirección
      });
    }
  }

  onAddressSubmit() {
    if (this.addressForm.valid && this.userForm.value.run) {
      const data = {
        ...this.addressForm.value,
        type_address: 'PRINCIPAL',
        user_run: this.userForm.value.run
      };
      // Llama a tu servicio para guardar dirección aquí.
      this.authService.agregarDireccion(data).subscribe(() => {
        // registrar completo, mostrar feedback o ruta final
      });
    }
  }
}

export function passwordsMatchValidator(form: FormGroup): ValidationErrors | null {
  const password = form.get('password')?.value;
  const confirm = form.get('confirmPassword')?.value;
  return password && confirm && password !== confirm ? { passwordsMismatch: true } : null;
}
