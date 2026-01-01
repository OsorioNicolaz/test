import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgIf, NgForOf } from '@angular/common';
import { LocationService } from '../../../../features/profile/services/location.service';
import { Region } from '../../../../features/profile/models/Region';
import { Commune } from '../../../../features/profile/models/Commune';
import { Subscription } from 'rxjs';
import { formatRut } from "@fdograph/rut-utilities";
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { runValidator } from '@shared/validators/runValidator';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    FormFieldComponent,
  ]
})
export default class RegisterComponent implements OnInit, OnDestroy {
  step = 1; // Paso actual del registro (1 o 2)

  userForm!: FormGroup;
  addressForm!: FormGroup;

  regions: Region[] = [];
  communes: Commune[] = [];
  private regionSub!: Subscription;
  private communesSub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private locationService: LocationService,
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      run: ['', [Validators.required, runValidator]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    }, { validators: [passwordsMatchValidator] });

    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      number: [null, [Validators.required, Validators.min(1)]],
      region_id: ['', Validators.required],
      commune_id: ['', Validators.required],
      detail: ['']
    });

    // Cargar regiones y suscribirse a los observables
    this.locationService.getRegions();
    this.regionSub = this.locationService.regions$.subscribe(data => this.regions = data);
    this.communesSub = this.locationService.communes$.subscribe(data => this.communes = data);
  }

  onRegionChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value;
  this.locationService.getCommunesByRegionId(Number(value));
  this.addressForm.get('commune_id')?.setValue('');
  }

  ngOnDestroy(): void {
    this.regionSub?.unsubscribe();
    this.communesSub?.unsubscribe();
  }

  get runCtrl() { return this.userForm.get('run') as FormControl; }
  get passwordCtrl() { return this.userForm.get('password') as FormControl; }
  get confirmPasswordCtrl() { return this.userForm.get('confirmPassword') as FormControl; }

  get streetCtrl() { return this.addressForm.get('street') as FormControl; }
  get numberCtrl() { return this.addressForm.get('number') as FormControl; }
  get regionCtrl() { return this.addressForm.get('region_id') as FormControl; }
  get communeCtrl() { return this.addressForm.get('commune_id') as FormControl; }
  get detailCtrl() { return this.addressForm.get('detail') as FormControl; }

  onUserDataSubmit() {
    if (this.userForm.valid) {
      const { run, password } = this.userForm.value;
      this.authService.registrarUsuario(run, password).subscribe(() => {
        this.step = 2; // Pasa al segundo formulario
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
      this.authService.agregarDireccion(data).subscribe(() => {
        // Registro completo
      });
    }
  }

  onRutInput(event: any) {
  // Normaliza entrada (quita todo salvo números y K)
  const clean = event.target.value.replace(/[^0-9kK]/g, '').toUpperCase();
  const formatted = formatRut(clean); // Aplica formato correcto
  this.userForm.get('run')?.setValue(formatted, { emitEvent: false });
  }

  fcUser(name: string): FormControl {
  return this.userForm.get(name) as FormControl;
  }
  fcAddress(name: string): FormControl {
  return this.addressForm.get(name) as FormControl;
  }
}

// Validador de contraseñas iguales
export function passwordsMatchValidator(form: FormGroup): ValidationErrors | null {
  const password = form.get('password')?.value;
  const confirm = form.get('confirmPassword')?.value;
  return password && confirm && password !== confirm ? { passwordsMismatch: true } : null;
}