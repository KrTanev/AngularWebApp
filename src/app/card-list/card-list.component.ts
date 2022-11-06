import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CardsService } from '../cardsService';
import { Post } from '../post.interface';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit, OnDestroy {
  posts?: Post[];

  destroy$ = new Subject<boolean>();

  constructor(private cardsService: CardsService) {}

  ngOnInit(): void {
    this.cardsService
      .getPosts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response) => {
          this.posts = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onPostSubmit(post: Post): void {
    const newPost = {
      ...post,
      id: this.posts?.length,
    };

    this.posts?.push(newPost);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
