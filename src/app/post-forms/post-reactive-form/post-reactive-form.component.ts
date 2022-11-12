import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { CardService } from 'src/app/cardsService';
import { Card } from 'src/utils/interfaces/card.interface';
import { User } from 'src/utils/interfaces/user.model';

@Component({
  selector: 'app-post-reactive-form',
  templateUrl: './post-reactive-form.component.html',
  styleUrls: ['./post-reactive-form.component.scss'],
})
export class PostReactiveFormComponent implements OnInit, OnChanges, OnDestroy {
  @Output() cardSubmitted = new EventEmitter<Card>();

  // @ts-ignore
  formGroup: FormGroup;
  card: Card;
  user: User;

  destroy$ = new Subject<boolean>();

  constructor(
    private formBuild: FormBuilder,
    private cardService: CardService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.card = {
      title: '',
      content: '',
      author: '',
      publishDate: '',
      likes: 0,
      likedBy: [],
    };
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((props) => {
        if (props['id']) {
          this.getcard(props['id']);
        }
      });

    this.buildForm();
  }

  ngOnChanges(): void {
    if (this.formGroup) {
      this.formGroup.get('id')?.setValue(this.card.id);
      this.formGroup.get('title')?.setValue(this.card.title);
      this.formGroup.get('content')?.setValue(this.card.content);
    }
  }

  onSubmit(): void {
    this.loggedUser();

    const card: Card = {
      ...this.formGroup.value,
      author: this.user.username,
      publishDate: formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      likes: 0,
    };

    if (!card.id) {
      this.cardService
        .createCards({ ...card })
        .pipe(take(1))
        .subscribe(() => this.router.navigate(['/Posts']));

      return;
    } else {
      this.cardService
        .updateCards(card)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.router.navigate(['/Posts']));
    }

    this.cardSubmitted.emit(card);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe;
  }

  private getcard(id: number): void {
    this.cardService
      .getCard(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.card = response;
        this.buildForm();
      });
  }

  buildForm(): void {
    this.formGroup = this.formBuild.group({
      id: this.card.id,
      title: [this.card.title, [Validators.required, Validators.minLength(5)]],
      content: [this.card.content],
    });
  }

  loggedUser(): void {
    try {
      this.user = JSON.parse(localStorage.getItem('loggedUser') || '');
    } catch {
      console.log('err');
    }
  }
}
