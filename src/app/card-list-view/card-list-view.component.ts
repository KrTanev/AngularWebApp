import { Component, OnInit } from '@angular/core';
import { Post } from '../post.interface';

@Component({
  selector: 'app-card-list-view',
  templateUrl: './card-list-view.component.html',
  styleUrls: ['./card-list-view.component.scss'],
})
export class CardListViewComponent implements OnInit {
  posts: Post[];
  selectedPost!: Post;

  constructor() {
    this.posts = [];
  }

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

  likeCurrentPost(post: Post): void {
    this.selectedPost = post;
  }
}
