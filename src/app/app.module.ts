import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { CardListViewComponent } from './card-list-view/card-list-view.component';
import { TableViewComponent } from './table-view/table-view.component';
import { CardItemComponent } from './card-item/card-item.component';
import { PostTdFormComponent } from './post-forms/post-td-form/post-td-form.component';

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
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent /*FooterComponent*/],
})
export class AppModule {}
