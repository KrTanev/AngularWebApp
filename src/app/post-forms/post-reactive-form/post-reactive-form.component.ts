import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/post.interface';

@Component({
  selector: 'app-post-reactive-form',
  templateUrl: './post-reactive-form.component.html',
  styleUrls: ['./post-reactive-form.component.scss'],
})
export class PostReactiveFormComponent implements OnInit, OnChanges {
  @Input() post: Post;
  @Output() postSubmitted = new EventEmitter<Post>();

  // @ts-ignore
  formGroup: FormGroup;

  constructor(private formBuild: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuild.group({
      id: this.post.id,
      title: [this.post.title, [Validators.required, Validators.minLength(5)]],
      content: [this.post.content],
    });
  }

  ngOnChanges(): void {
    if (this.formGroup) {
      this.formGroup.get('id')?.setValue(this.post.id);
      this.formGroup.get('title')?.setValue(this.post.title);
      this.formGroup.get('content')?.setValue(this.post.content);
    }
  }

  onSubmit(): void {
    console.log(this.formGroup.value);
    const post: Post = {
      ...this.formGroup.value,
      author: 'Angular',
      publishDate: formatDate(new Date(), 'dd/MM/yyyy', 'en'),
    };

    this.postSubmitted.emit(post);
  }
}
