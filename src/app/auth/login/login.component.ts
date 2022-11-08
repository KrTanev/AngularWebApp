import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  errorMassage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(): void {
    this.errorMassage = '';

    const email = this.formGroup.value.email;
    const password = this.formGroup.value.password;

    this.authService
      .login(email, password)
      .pipe(take(1))
      .subscribe((response) => {
        if (!response) {
          this.errorMassage = 'Invalid email or password!';

          return;
        }

        this.router.navigate(['Posts']);
      });
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
}
