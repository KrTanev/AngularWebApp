import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Post } from '../post.interface';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent implements OnInit {
  posts?: Post[];

  constructor() {}

  ngOnInit(): void {
    this.posts = [
      {
        id: 0,
        title: 'Title One',
        content: 'Lorem',
        author: 'Angular',
        publishDate: '01.01.1970',
      },
      {
        id: 1,
        title: 'Title two',
        content: 'Lorem',
        author: 'Angular',
        publishDate: '01.01.1970',
      },
      {
        id: 2,
        title: 'Title three',
        content: 'Lorem',
        author: 'Angular',
        publishDate: '01.01.1970',
      },
    ];
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
