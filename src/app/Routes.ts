import { Route } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { NonAuthGuard } from './auth/guards/non.auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CardListComponent } from './CardPost/card-list/card-list.component';
import { PostReactiveFormComponent } from './post-forms/post-reactive-form/post-reactive-form.component';
import { PostTdFormComponent } from './post-forms/post-td-form/post-td-form.component';
import { ChangeProfileComponent } from './Profile/change-profile/change-profile.component';
import { UserProfileComponent } from './Profile/user-profile/user-profile.component';
import { TableListComponent } from './TableBooks/table-list/table-list.component';

export const ROUTES: Route[] = [
  {
    path: 'Register',
    component: RegisterComponent,
    canActivate: [NonAuthGuard],
  },
  {
    path: 'Login',
    component: LoginComponent,
    canActivate: [NonAuthGuard],
  },
  {
    path: 'Profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ChangeProfile',
    component: ChangeProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Books',
    component: TableListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Books/add',
    component: PostTdFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Books/edit/:id',
    component: PostTdFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Posts',
    component: CardListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Posts/create',
    component: PostReactiveFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Posts/edit/:id',
    component: PostReactiveFormComponent,
    canActivate: [AuthGuard],
  },
];
