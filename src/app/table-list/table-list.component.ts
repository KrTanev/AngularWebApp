import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Post } from '../post.interface';
import { PostsService } from '../postService';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent implements OnInit {
  posts?: Post[];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getPosts().subscribe(
      (response) => {
        this.posts = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onPostSubmitted(post: Post): void {
    const newPost = {
      ...post,
      id: this.posts?.length,
      author: 'Angular',
      publishDate: formatDate(new Date(), 'dd/MM/yyyy', 'en'),
    };

    this.posts?.push(newPost);
  }
}
