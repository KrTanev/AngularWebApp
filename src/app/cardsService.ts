import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './post.interface';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  url = 'http://localhost:3000/cards';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }
}
