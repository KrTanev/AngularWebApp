import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { CardListViewComponent } from './CardPost/card-list-view/card-list-view.component';
import { TableViewComponent } from './TableBooks/table-view/table-view.component';
import { CardItemComponent } from './CardPost/card-item/card-item.component';
import { PostTdFormComponent } from './post-forms/post-td-form/post-td-form.component';
import { TableListComponent } from './TableBooks/table-list/table-list.component';
import { CardListComponent } from './CardPost/card-list/card-list.component';
import { PostReactiveFormComponent } from './post-forms/post-reactive-form/post-reactive-form.component';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Route[] = [
  {
    path: 'Register',
    component: RegisterComponent,
  },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'Books',
    component: TableListComponent,
  },
  {
    path: 'Books/add',
    component: PostTdFormComponent,
  },
  {
    path: 'Books/edit/:id',
    component: PostTdFormComponent,
  },
  {
    path: 'Posts',
    component: CardListComponent,
  },
  {
    path: 'Posts/create',
    component: PostReactiveFormComponent,
  },
  {
    path: 'Posts/edit/:id',
    component: PostReactiveFormComponent,
  },
];
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    // FooterComponent,
    TableViewComponent,
    CardListViewComponent,
    CardItemComponent,
    PostTdFormComponent,
    TableListComponent,
    PostReactiveFormComponent,
    CardListComponent,
    LoginComponent,
    RegisterComponent,
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
