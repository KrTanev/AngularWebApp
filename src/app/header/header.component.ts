import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  hasLoggedIn: boolean;

  destroy$ = new Subject<boolean>();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService
      .getHasLoggedIn()
      .pipe(takeUntil(this.destroy$))
      .subscribe((hasLogged) => (this.hasLoggedIn = hasLogged));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onLogOut(): void {
    this.authService.logOut();

    this.router.navigate(['Login']);
  }
}
