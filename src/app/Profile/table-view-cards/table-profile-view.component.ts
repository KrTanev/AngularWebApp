import { Component, Input, OnInit } from '@angular/core';
import { Subject, take } from 'rxjs';
import { User } from '../../auth/user.model';
import { Card } from '../../card.interface';
import { CardService } from '../../cardsService';

@Component({
  selector: 'app-table-profile-view',
  templateUrl: './table-profile-view.component.html',
  styleUrls: ['./table-profile-view.component.scss'],
})
export class TableProfileViewComponent implements OnInit {
  @Input() user: User;
  likedCards: Card[];

  destroy$ = new Subject<boolean>();

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.getData();
  }

  getCardForCurrentUser(cards: Card[]): void {
    const likedCards = [];
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].likedBy.find((user) => user === this.user.username)) {
        likedCards.push(cards[i]);
      }
    }

    this.likedCards = likedCards;
  }

  getData(): void {
    this.cardService
      .getCards()
      .pipe(take(1))
      .subscribe((response) => {
        this.getCardForCurrentUser(response);
      });
  }

  onDislikeClick(cardId?: number): void {
    const cards = this.likedCards;
    let likedCards;

    for (let i = 0; i < cards.length; i++) {
      if (cards[i].id === cardId) {
        likedCards = cards[i].likedBy.filter(
          (user) => user !== this.user.username
        );
        const card = {
          id: cards[i].id,
          title: cards[i].title,
          content: cards[i].content,
          author: cards[i].author,
          publishDate: cards[i].publishDate,
          likes: cards[i].likes - 1,
          likedBy: likedCards,
        };

        this.cardService
          .updateCards(card)
          .pipe(take(1))
          .subscribe(() => window.location.reload());
      }
    }
  }
}
