import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CardService } from '../../cardsService';
import { Post } from '../../post.interface';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit, OnDestroy {
  posts?: Post[];
  selectedPost: Post;

  destroy$ = new Subject<boolean>();

  constructor(private cardService: CardService) {
    this.selectedPost = {
      title: '',
      content: '',
      author: '',
      publishDate: '',
    };
  }

  ngOnInit(): void {
    this.getData();
  }

  onPostSelect(post: Post): void {
    this.selectedPost = post;
  }

  onPostDelete(postId: number): void {
    this.cardService
      .deletePosts(postId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.getData());
  }

  private getData(): void {
    this.cardService
      .getPosts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => (this.posts = response));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
