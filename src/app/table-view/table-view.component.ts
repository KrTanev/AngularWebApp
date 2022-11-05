import { Component } from '@angular/core';
import { Post } from '../post.interface';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent {
  posts: Post[];

  constructor() {
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
}
