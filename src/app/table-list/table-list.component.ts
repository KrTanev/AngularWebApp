import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { pipe, Subject, takeUntil } from 'rxjs';
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

  onPostSubmitted(post: Post): void {
    //Create
    if (!post.id) {
      const newPost = {
        ...post,
        id: this.posts?.length,
        author: 'Angular',
        publishDate: formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      };

      this.postsService
        .createPosts(newPost)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.getData());
      return;
    } else {
      //Update
      this.postsService
        .updatePosts(post)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.getData());
    }
  }

  onPostSelect(post: Post): void {
    this.selectedPost = post;
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
        (error) => {
          console.log(error);
        }
      );
  }
}
