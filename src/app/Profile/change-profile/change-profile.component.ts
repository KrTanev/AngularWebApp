import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.scss'],
})
export class ChangeProfileComponent implements OnInit {
  formGroup: FormGroup;
  errorMassage: string;
  loggedUserData: User;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedUser();

    // if (this.loggedUserData.id) {
    //   this.authService
    //     .getUser(this.loggedUserData.id)
    //     .pipe(take(1))
    //     .subscribe((response) => {
    //       this.user = response;
    //       console.log(response);
    //     });
    // }

    this.buildForm();
  }

  onSubmit(): void {
    const formValues = this.formGroup.value;
    const currentPassword = this.user.password;
    let doSubmit = true;

    //Проверява дали паролата съвпада с написаната
    if (formValues.oldPassword !== currentPassword) {
      this.errorMassage = 'Password do not match!';

      this.formGroup.reset({
        username: formValues.username,
        oldPassword: formValues.oldPassword,
        password: '',
        confirmPassword: '',
        isOrganization: formValues.isOrganization,
      });
      doSubmit = false;
      return;
    }

    //В случей че ще прави нова парола трябва двете полета да съвпаднат
    if (formValues.password !== formValues.confirmPassword) {
      this.errorMassage = 'Passwords do not match!';

      this.formGroup.reset({
        username: formValues.username,
        oldPassword: formValues.oldPassword,
        password: '',
        confirmPassword: '',
        isOrganization: formValues.isOrganization,
      });
      doSubmit = false;
      return;
    }

    //За да направи нова парола ,старата трябва да е правилно написана
    if (formValues.oldPassword && formValues.password) {
      if (formValues.oldPassword !== this.user.password) {
        this.errorMassage = 'Old password is not correct!';

        this.formGroup.reset({
          username: formValues.username,
          oldPassword: formValues.oldPassword,
          password: '',
          confirmPassword: '',
          isOrganization: formValues.isOrganization,
        });
        doSubmit = false;
        return;
      }
    }

    const user = {
      id: this.user.id,
      username: formValues.username,
      password: formValues.password || formValues.oldPassword,
      email: this.user.email,
      isOrganization: formValues.isOrganization,
    };

    if (doSubmit) {
      this.authService
        .updateProfile(user)
        .pipe(take(1))
        .subscribe(() => {
          this.authService.setLoggedUser(user);
          this.router.navigate(['Profile']);
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

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      id: [this.user.id],
      username: [this.user.username, [Validators.required]],
      oldPassword: ['', [Validators.required]],
      email: [this.user.email],
      password: [''],
      confirmPassword: [''],
      isOrganization: [
        this.user.isOrganization === 'true' ? 'Yes' : 'No',
        [Validators.required],
      ],
    });
  }
}
