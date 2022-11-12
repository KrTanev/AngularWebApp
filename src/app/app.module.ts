import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { CardListViewComponent } from './CardPost/card-list-view/card-list-view.component';
import { UserProfileComponent } from './Profile/user-profile/user-profile.component';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { NonAuthGuard } from './auth/guards/non.auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CardItemComponent } from './CardPost/card-item/card-item.component';
import { CardListComponent } from './CardPost/card-list/card-list.component';
import { PostReactiveFormComponent } from './post-forms/post-reactive-form/post-reactive-form.component';
import { PostTdFormComponent } from './post-forms/post-td-form/post-td-form.component';
import { TableListComponent } from './TableBooks/table-list/table-list.component';
import { TableViewComponent } from './TableBooks/table-view/table-view.component';
import { TableProfileViewComponent } from './Profile/table-view-cards/table-profile-view.component';
import { ChangeProfileComponent } from './Profile/change-profile/change-profile.component';
import { TableProfileBooksComponent } from './Profile/table-profile-books/table-profile-books.component';

const routes: Route[] = [
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
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    TableViewComponent,
    CardListViewComponent,
    CardItemComponent,
    PostTdFormComponent,
    TableListComponent,
    PostReactiveFormComponent,
    CardListComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    TableProfileViewComponent,
    ChangeProfileComponent,
    TableProfileBooksComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
