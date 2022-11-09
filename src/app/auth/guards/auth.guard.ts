import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authSerivece: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authSerivece.getLoggedUser();

    if (!user) {
      this.router.navigate(['Login']);

      return false;
    }
    return true;
  }
}
