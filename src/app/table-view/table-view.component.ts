import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../post.interface';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent {
  @Input() posts?: Post[];

  @Output() postSelected = new EventEmitter<Post>();
  @Output() postDeleted = new EventEmitter<number>();
  constructor() {}

  onEditClick(id?: number): void {
    const post = this.posts?.find((post) => post.id === id);

    this.postSelected.emit({
      ...(post || {
        title: '',
        content: '',
        author: '',
        publishDate: '',
      }),
    });
  }

  onDeleteClick(id?: number): void {
    this.postDeleted.emit(id);
  }
}
