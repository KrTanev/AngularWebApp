import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CardsService } from '../../cardsService';
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

  constructor(private cardsService: CardsService) {
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

  onPostSubmit(post: Post): void {
    if (post.id) {
      this.cardsService
        .updatePosts({ ...post })
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.getData());

      return;
    } else {
      this.cardsService
        .createPosts(post)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.getData());
    }
  }

  onPostSelect(post: Post): void {
    this.selectedPost = post;
  }

  onPostDelete(postId: number): void {
    this.cardsService
      .deletePosts(postId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.getData());
  }

  private getData(): void {
    this.cardsService
      .getPosts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => (this.posts = response));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
