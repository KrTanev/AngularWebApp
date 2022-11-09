import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
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
    const formValues = this.formGroup.value;

    if (formValues.password !== formValues.confirmPassword) {
      this.errorMassage = 'Passowords do not match!';

      this.formGroup.reset({
        username: formValues.username,
        email: formValues.email,
        password: '',
        confirmPassword: '',
      });
      return;
    }

    this.authService
      .getUsers()
      .pipe(
        map((stream: User[]) =>
          stream.find((user) => user.email === formValues.email)
        ),
        take(1)
      )
      .subscribe((response) => {
        if (response) {
          this.errorMassage = 'Email is already used!';
          return;
        }
      });

    this.authService
      .register(formValues)
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(['Login']);
      });
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
}
