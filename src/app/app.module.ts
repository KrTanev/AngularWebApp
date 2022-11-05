import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { TableViewComponent } from './table-view/table-view.component';

@NgModule({
  declarations: [AppComponent, MainComponent, HeaderComponent, FooterComponent, TableViewComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent, MainComponent, HeaderComponent, FooterComponent],
})
export class AppModule {}
