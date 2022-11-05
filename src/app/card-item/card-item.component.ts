import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../post.interface';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent {
  @Input() post!: Post;

  @Output() postSelected = new EventEmitter<Post>();
  constructor() {}

  likeCurrentPost(): void {
    // console.log('likedPost');
    this.postSelected.emit(this.post);
  }
}
