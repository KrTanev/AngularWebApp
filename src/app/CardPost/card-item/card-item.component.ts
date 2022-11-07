import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Post } from '../../post.interface';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent implements OnInit, OnChanges {
  @Input() post!: Post;

  @Output() postSelected = new EventEmitter<Post>();
  @Output() postEdit = new EventEmitter<Post>();
  @Output() postDelete = new EventEmitter<number>();
  constructor() {}

  likeCurrentPost(): void {
    this.postSelected.emit(this.post);
  }

  editCurrentPost(): void {
    this.postEdit.emit(this.post);
  }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
  }
}
