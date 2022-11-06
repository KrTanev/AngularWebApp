import { Component, OnInit } from '@angular/core';
import { Post } from '../post.interface';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  posts?: Post[];
  constructor() {}

  ngOnInit(): void {
    this.posts = [
      {
        id: 0,
        title: 'Overview',
        content:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
        author: 'Generator',
        publishDate: '01.01.1970',
      },
      {
        id: 1,
        title: 'Interesting fact about lorem',
        content:
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia',
        author: 'Generator',
        publishDate: '01.01.1970',
      },
      {
        id: 2,
        title: 'If you are intrested in',
        content:
          'Lorem is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here,',
        author: 'Generator',
        publishDate: '01.01.1970',
      },
    ];
  }

  onPostSubmit(post: Post): void {
    const newPost = {
      ...post,
      id: this.posts?.length,
    };

    this.posts?.push(newPost);
  }
}