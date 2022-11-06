import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from 'src/app/post.interface';

@Component({
  selector: 'app-post-td-form',
  templateUrl: './post-td-form.component.html',
  styleUrls: ['./post-td-form.component.scss'],
})
export class PostTdFormComponent implements OnInit {
  @ViewChild('form', { static: true }) ngForm?: NgForm;

  @Input() post: Post;

  @Output() postSubmitted = new EventEmitter<Post>();

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.ngForm);
    console.log(this.ngForm?.value);

    this.post = {
      ...this.post,
      ...this.ngForm?.value,
    };

    this.postSubmitted.emit(this.post);
  }
}
