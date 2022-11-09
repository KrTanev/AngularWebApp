import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Card } from 'src/app/card.interface';
import { CardService } from '../../cardsService';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit, OnDestroy {
  cards?: Card[];
  selectedCard: Card;

  destroy$ = new Subject<boolean>();

  constructor(private cardService: CardService) {
    this.selectedCard = {
      title: '',
      content: '',
      author: '',
      publishDate: '',
      likes: 0,
    };
  }

  ngOnInit(): void {
    this.getData();
  }

  onCardSelect(card: Card): void {
    this.selectedCard = card;
  }

  onCardDelete(cardId: number): void {
    this.cardService
      .deleteCards(cardId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.getData());
  }

  private getData(): void {
    this.cardService
      .getCards()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => (this.cards = response));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
