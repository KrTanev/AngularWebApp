import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/post.interface';

@Component({
  selector: 'app-post-reactive-form',
  templateUrl: './post-reactive-form.component.html',
  styleUrls: ['./post-reactive-form.component.scss'],
})
export class PostReactiveFormComponent implements OnInit {
  @Output() postSubmitted = new EventEmitter<Post>();

  // @ts-ignore
  formGroup: FormGroup;

  constructor(private formBuild: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuild.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: [''],
    });
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
