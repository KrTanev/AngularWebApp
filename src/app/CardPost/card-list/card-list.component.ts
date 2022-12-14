import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/utils/interfaces/user.model';
import { Card } from 'src/utils/interfaces/card.interface';
import { AuthService } from '../../auth/auth.service';
import { CardService } from '../../cardsService';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit, OnDestroy {
  cards?: Card[];
  user: User;
  selectedCard: Card;

  destroy$ = new Subject<boolean>();

  constructor(
    private cardService: CardService,
    private authService: AuthService
  ) {
    this.selectedCard = {
      title: '',
      content: '',
      author: '',
      publishDate: '',
      likes: 0,
      likedBy: [],
    };
  }

  ngOnInit(): void {
    this.loggedUser();
    this.authService.setHasLoggedIn(!!this.loggedUser);

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

  loggedUser(): void {
    try {
      this.user = JSON.parse(localStorage.getItem('loggedUser') || '');
    } catch {
      console.log('JSON parse Err');
    }
  }
}
