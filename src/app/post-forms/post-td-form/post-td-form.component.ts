import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from 'src/app/post.interface';

@Component({
  selector: 'app-post-td-form',
  templateUrl: './post-td-form.component.html',
  styleUrls: ['./post-td-form.component.scss'],
})
export class PostTdFormComponent implements OnInit {
  @ViewChild('form', { static: true }) ngForm?: NgForm;
  post: Post;

  constructor() {
    this.post = {
      title: '',
      content: '',
      author: '',
      publishDate: '',
    };
  }

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.ngForm);
  }
}
