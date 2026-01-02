import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil, filter, take } from 'rxjs';
import { CuentaAhorroService } from './cuenta-ahorro.service';
import { AuthService } from '@app/core/auth/services/auth.service';
import { TipoAhorroPipe } from './pipes/tipo-ahorro.pipe';
import { AsyncPipe, CurrencyPipe, DatePipe, DecimalPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SvgIconComponent } from '@app/shared/components/svg-icon/svg-icon.component';
import { CuentaAhorroItemComponent } from './components/cuenta-ahorro-item.component';
import { ProfileService } from '@features/profile/services/profile.service';
import { ROUTE_TOKENS } from '@app/route-tokens';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuenta-ahorro',
  standalone: true,
  imports: [ 
    AsyncPipe,         
    CommonModule,       
    RouterLink,         
    SvgIconComponent,
    CuentaAhorroItemComponent,
   ],
  templateUrl: './cuenta-ahorro.component.html',
})

export default class CuentaAhorroComponent implements OnInit, OnDestroy {
  savingTotals$: Observable<{ total: number; interests: number }>;
  savingAccounts$: Observable<any[]>;
  perfil$!: Observable<any>;

  private onDestroy$ = new Subject<void>();

  mostrarContrato = false; //para contrato
  public ROUTE_TOKENS = ROUTE_TOKENS;
  contratoAceptado = false

  constructor(
    private cuentaAhorroService: CuentaAhorroService,
    private profileService: ProfileService,
    private router: Router,
    private authService: AuthService
  ) {
    this.savingTotals$ = this.cuentaAhorroService.totals$;
    this.savingAccounts$ = this.cuentaAhorroService.accounts$;
  }
  
  optionSelected: 'ver' | null = null;

  abrirContrato() {
  if (!this.contratoAceptado) {
    this.mostrarContrato = true;
  }
  }

  cerrarContrato() {
    this.mostrarContrato = false;
  }

  aceptarContrato() {
  this.authService.currentUser$.pipe(
    filter(Boolean), 
    take(1)
  ).subscribe(user => {
    this.cuentaAhorroService.aceptarContrato(user.run).subscribe({
      next: () => {
        this.mostrarContrato = false;
        this.router.navigate([
          '/',
          ROUTE_TOKENS.CLIENT_PATH,
          ROUTE_TOKENS.CUENTA_AHORRO,
          ROUTE_TOKENS.NEW_CUENTA_AHORRO
        ]);
      },
      error: (err) => {
        console.error("No se pudo registrar la aceptación:", err);
      }
    });
  });
}

  ngOnInit() {
  this.authService.currentUser$
    .pipe(takeUntil(this.onDestroy$), filter(Boolean))
    .subscribe(user => {
      this.profileService.getCurrentProfile(user.run);
      this.perfil$ = this.profileService.userProfile$;
      this.cuentaAhorroService.getAhorroList(user.run);

    this.cuentaAhorroService.usuarioYaAceptoContrato(user.run)
        .subscribe((respuesta: boolean) => {
          this.contratoAceptado = respuesta;
        });
    });
}

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
