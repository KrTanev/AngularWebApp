import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { CardService } from 'src/app/cardsService';
import { Post } from 'src/app/post.interface';

@Component({
  selector: 'app-post-reactive-form',
  templateUrl: './post-reactive-form.component.html',
  styleUrls: ['./post-reactive-form.component.scss'],
})
export class PostReactiveFormComponent implements OnInit, OnChanges, OnDestroy {
  @Output() postSubmitted = new EventEmitter<Post>();

  // @ts-ignore
  formGroup: FormGroup;
  post: Post;

  destroy$ = new Subject<boolean>();

  constructor(
    private formBuild: FormBuilder,
    private cardService: CardService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.post = {
      title: '',
      content: '',
      author: '',
      publishDate: '',
    };
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((props) => {
        if (props['id']) {
          this.getPost(props['id']);
        }
      });

    this.buildForm();
  }

  ngOnChanges(): void {
    if (this.formGroup) {
      this.formGroup.get('id')?.setValue(this.post.id);
      this.formGroup.get('title')?.setValue(this.post.title);
      this.formGroup.get('content')?.setValue(this.post.content);
    }
  }

  onSubmit(): void {
    const post: Post = {
      ...this.formGroup.value,
      author: 'Angular',
      publishDate: formatDate(new Date(), 'dd/MM/yyyy', 'en'),
    };

    if (!post.id) {
      this.cardService
        .createPosts({ ...post })
        .pipe(take(1))
        .subscribe(() => this.router.navigate(['/Posts']));

      return;
    } else {
      this.cardService
        .updatePosts(post)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.router.navigate(['/Posts']));
    }

    this.postSubmitted.emit(post);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe;
  }

  private getPost(id: number): void {
    this.cardService
      .getPost(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.post = response;
        this.buildForm();
      });
  }

  buildForm(): void {
    this.formGroup = this.formBuild.group({
      id: this.post.id,
      title: [this.post.title, [Validators.required, Validators.minLength(5)]],
      content: [this.post.content],
    });
  }
}
