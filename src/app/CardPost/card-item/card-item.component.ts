import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { Card } from 'src/app/card.interface';
import { CardService } from 'src/app/cardsService';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent implements OnInit, OnChanges {
  @Input() card!: Card;
  @Input() user: User;

  destroy$ = new Subject<boolean>();
  errorMassage: string;

  @Output() cardSelected = new EventEmitter<Card>();
  @Output() cardEdit = new EventEmitter<Card>();
  @Output() cardDelete = new EventEmitter<number>();
  constructor(private cardService: CardService, private router: Router) {}

  likeCurrentCard(): void {
    const likedBy = this.card.likedBy || [];
    if (!likedBy.find((user) => user === this.user.username)) {
      likedBy.push(this.user.username);

      const card: Card = {
        ...this.card,
        likes: this.card.likes + 1,
        likedBy: likedBy,
      };

      this.cardService
        .updateCards(card)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.router.navigate(['/Posts']));

      this.cardSelected.emit(this.card);

      //
      window.location.reload();
      return;
    }
    this.errorMassage = 'You already liked this post!';
  }

  editCurrentCard(): void {
    this.cardEdit.emit(this.card);
  }

  ngOnInit(): void {
    // console.log('ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('ngOnChanges');
  }
}
