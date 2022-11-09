import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { User } from 'src/app/auth/user.model';
import { Card } from 'src/app/card.interface';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent implements OnInit, OnChanges {
  @Input() card!: Card;
  @Input() user?: User;

  @Output() cardSelected = new EventEmitter<Card>();
  @Output() cardEdit = new EventEmitter<Card>();
  @Output() cardDelete = new EventEmitter<number>();
  constructor() {}

  likeCurrentCard(): void {
    this.cardSelected.emit(this.card);
  }

  editCurrentCard(): void {
    this.cardEdit.emit(this.card);
  }

  ngOnInit(): void {
    this.loggedUser();

    // console.log('ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('ngOnChanges');
  }

  loggedUser(): void {
    try {
      this.user = JSON.parse(localStorage.getItem('loggedUser') || '');
    } catch {
      console.log('err');
    }
  }
}
