import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class NonAuthGuard implements CanActivate {
  constructor(private authSerivece: AuthService, private router: Router) {}

  canActivate(): boolean {
    try {
      const user = this.authSerivece.getLoggedUser() || null;
      console.log(user);

      if (user) {
        this.router.navigate(['Posts']);

        return false;
      }
    } catch {
      return true;
    }
    return true;
  }
}
