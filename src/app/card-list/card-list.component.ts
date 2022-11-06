import { Component, OnInit } from '@angular/core';
import { CardsService } from '../cardsService';
import { Post } from '../post.interface';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  posts?: Post[];
  constructor(private cardsService: CardsService) {}

  ngOnInit(): void {
    this.cardsService.getPosts().subscribe(
      (response) => {
        this.posts = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onPostSubmit(post: Post): void {
    const newPost = {
      ...post,
      id: this.posts?.length,
    };

    this.posts?.push(newPost);
  }
}
