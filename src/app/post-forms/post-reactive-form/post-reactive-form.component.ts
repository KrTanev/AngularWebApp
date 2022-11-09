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
import { Card } from 'src/app/card.interface';

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
    const card: Card = {
      ...this.formGroup.value,
      author: 'Angular',
      publishDate: formatDate(new Date(), 'dd/MM/yyyy', 'en'),
    };

    if (!card.id) {
      this.cardService
        .createCards({ ...card })
        .pipe(take(1))
        .subscribe(() => this.router.navigate(['/cards']));

      return;
    } else {
      this.cardService
        .updateCards(card)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.router.navigate(['/cards']));
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
}
