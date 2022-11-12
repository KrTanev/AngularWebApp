import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { User } from '../../auth/user.model';
import { Post } from '../../post.interface';
import { PostsService } from '../../postService';

@Component({
  selector: 'app-table-profile-books',
  templateUrl: './table-profile-books.component.html',
  styleUrls: ['./table-profile-books.component.scss'],
})
export class TableProfileBooksComponent implements OnInit {
  @Input() user: User;

  myPosts: Post[];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.postsService
      .getPosts()
      .pipe(take(1))
      .subscribe((response) => {
        this.getUserPosts(response);
      });
  }

  getUserPosts(posts: Post[]): void {
    const myPosts: Post[] = [];
    posts.forEach((post) => {
      post.addedBy === this.user.username && myPosts.push(post);
    });
    this.myPosts = myPosts;
  }

  onDeleteClick(postId?: number): void {
    this.postsService
      .deletePosts(postId || 0)
      .pipe(take(1))
      .subscribe(() => this.getData());
  }
}
