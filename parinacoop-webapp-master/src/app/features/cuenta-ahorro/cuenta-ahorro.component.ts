import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil, filter } from 'rxjs';
import { CuentaAhorroService } from './cuenta-ahorro.service';
import { AuthService } from '@app/core/auth/services/auth.service';
import { TipoAhorroPipe } from './pipes/tipo-ahorro.pipe';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SvgIconComponent } from '@app/shared/components/svg-icon/svg-icon.component';
import { CuentaAhorroItemComponent } from './components/cuenta-ahorro-item.component';
import { ProfileService } from '@features/profile/services/profile.service';

@Component({
  selector: 'app-cuenta-ahorro',
  standalone: true,
  imports: [ 
    AsyncPipe,          // aquí van los pipes
    CurrencyPipe,       
    RouterLink,         
    SvgIconComponent,
    CuentaAhorroItemComponent,
    TipoAhorroPipe,  
   ],
  templateUrl: './cuenta-ahorro.component.html',
})

export default class CuentaAhorroComponent implements OnInit, OnDestroy {
  savingTotals$: Observable<{ total: number; interests: number }>;
  savingAccounts$: Observable<any[]>;
  perfil$!: Observable<any>;

  private onDestroy$ = new Subject<void>();

  constructor(
    private cuentaAhorroService: CuentaAhorroService,
    private profileService: ProfileService,
    private authService: AuthService
  ) {
    this.savingTotals$ = this.cuentaAhorroService.totals$;
    this.savingAccounts$ = this.cuentaAhorroService.accounts$;
  }

  ngOnInit() {
  this.authService.currentUser$
    .pipe(takeUntil(this.onDestroy$), filter(Boolean))
    .subscribe(user => {
      this.profileService.getCurrentProfile(user.run);
      this.perfil$ = this.profileService.userProfile$;
      this.cuentaAhorroService.getAhorroList(user.run);
    });
}

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
