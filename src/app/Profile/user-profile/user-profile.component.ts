import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: User;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedUser();
    this.authService.setHasLoggedIn(!!this.loggedUser);

    if (this.user.id) {
      this.authService
        .getUser(this.user.id)
        .pipe(take(1))
        .subscribe((response) => {
          this.user = response;
        });
    }
  }

  loggedUser(): void {
    try {
      this.user = JSON.parse(localStorage.getItem('loggedUser') || '');
    } catch {
      console.log('err');
    }
  }

  //TODO Change usernam/email/passowrd filed
  // table of liked cards
}
