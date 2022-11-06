import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  constructor() {}

  ngOnInit(): void {
    // console.log('ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('ngOnChange');
  }

  ngAfterViewInit(): void {
    // console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    // console.log('ngOnDestroy');
  }
}
