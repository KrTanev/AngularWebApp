import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  //Example
  numbers: number[];
  colors: string[];

  stringInput: string;

  constructor() {
    this.numbers = [1, 2, 3, 4, 5];
    this.colors = ['red', 'green', 'blue'];

    this.stringInput = '';
  }
}
