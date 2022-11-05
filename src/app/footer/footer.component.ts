import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  //Example
  numbers: number[];

  constructor() {
    this.numbers = [1, 2, 3, 4, 5];
  }
}
