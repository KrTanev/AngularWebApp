import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Post } from '../post.interface';
import { PostsService } from '../postService';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent implements OnInit, OnDestroy {
  posts?: Post[];
  selectedPost: Post;

  destroy$ = new Subject<boolean>();

  constructor(private postsService: PostsService) {
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

  onPostDelete(postId: number): void {
    this.postsService
      .deletePosts(postId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.getData());
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getData(): void {
    this.postsService
      .getPosts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response) => {
          this.posts = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
