import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-post-reactive-form',
  templateUrl: './post-reactive-form.component.html',
  styleUrls: ['./post-reactive-form.component.scss'],
})
export class PostReactiveFormComponent implements OnInit {
  // @ts-ignore
  formGroup: FormGroup;

  constructor(private formBuild: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuild.group({
      title: '',
      content: '',
    });
  }

  onSubmit(): void {
    console.log(this.formGroup);
  }
}
