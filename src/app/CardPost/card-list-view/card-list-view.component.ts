import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/card.interface';

@Component({
  selector: 'app-card-list-view',
  templateUrl: './card-list-view.component.html',
  styleUrls: ['./card-list-view.component.scss'],
})
export class CardListViewComponent {
  @Input() cards?: Card[];

  @Output() cardSelected = new EventEmitter<Card>();
  @Output() cardDeleted = new EventEmitter<number>();
  selectedCard!: Card;

  constructor() {}

  likeCurrentCard(card: Card): void {
    this.selectedCard = card;
  }

  onCardEdit(card: Card): void {
    this.cardSelected.emit({ ...card });
  }
}
