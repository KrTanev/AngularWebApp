import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { Post } from 'src/utils/interfaces/post.interface';
import { PostsService } from 'src/app/postService';
import { User } from '../../../utils/interfaces/user.model';

@Component({
  selector: 'app-post-td-form',
  templateUrl: './post-td-form.component.html',
  styleUrls: ['./post-td-form.component.scss'],
})
export class PostTdFormComponent implements OnInit {
  @ViewChild('form', { static: true }) ngForm?: NgForm;

  user: User;
  post: Post;

  @Output() postSubmitted = new EventEmitter<Post>();

  destroy$ = new Subject<boolean>();

  constructor(
    private postsService: PostsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.post = {
      title: '',
      addedBy: '',
      author: '',
      publishDate: '',
    };
  }

  ngOnInit(): void {
    this.loggedUser();
    try {
      this.activatedRoute.params
        .pipe(takeUntil(this.destroy$))
        .subscribe((props) => this.getPost(props['id']));
    } catch {
      console.log('No id');
    }
  }

  onSubmit(): void {
    if (this.post.id) {
      this.postsService
        .updatePosts(this.post)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.router.navigate(['/Books']);
        });
    } else {
      this.post = {
        ...this.post,
        ...this.ngForm?.value,
      };

      const newPost = {
        ...this.post,
        addedBy: this.user.username,
        content: 'New book',
        publishDate: formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      };

      this.postsService
        .createPosts(newPost)
        .pipe(take(1))
        .subscribe(() => {
          this.router.navigate(['/Books']);
        });
    }
  }

  onBack(): void {
    this.router.navigate(['/Books']);
  }

  loggedUser(): void {
    try {
      this.user = JSON.parse(localStorage.getItem('loggedUser') || '');
    } catch {
      console.log('err');
    }
  }

  private getPost(id: number): void {
    this.postsService
      .getPost(id)
      .pipe(take(1))
      .subscribe((response) => (this.post = response));
  }
}
