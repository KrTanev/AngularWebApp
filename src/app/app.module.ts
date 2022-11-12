import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { CardListViewComponent } from './CardPost/card-list-view/card-list-view.component';
import { UserProfileComponent } from './Profile/user-profile/user-profile.component';
import { RouterModule } from '@angular/router';
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
import { ROUTES } from './Routes';

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
    RouterModule.forRoot(ROUTES),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
