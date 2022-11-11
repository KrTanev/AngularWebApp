import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';
import { Post } from '../../post.interface';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent implements OnInit {
  @Input() posts?: Post[];
  @Input() user: User;

  @Output() postDeleted = new EventEmitter<number>();
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedUser();
    this.authService.setHasLoggedIn(!!this.loggedUser);
  }

  onDeleteClick(id?: number): void {
    this.postDeleted.emit(id);
  }

  loggedUser(): void {
    try {
      this.user = JSON.parse(localStorage.getItem('loggedUser') || '');
    } catch {
      console.log('err');
    }
  }
}
