import { Component, Input } from '@angular/core';
import { Post } from '../post.interface';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent {
  @Input() post!: Post;
  constructor() {}

  likeCurrentPost(): void {
    console.log('likedPost');
  }
}
