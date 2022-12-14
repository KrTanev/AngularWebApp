import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../utils/constants/url';
import { Post } from '../utils/interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  url = `${BASE_URL}posts`;

  constructor(private http: HttpClient) {}

  getPost(id: number): Observable<Post> {
    const url = `${this.url}/${id}`;

    return this.http.get<Post>(url);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }

  createPosts(post: Post): Observable<any> {
    return this.http.post(this.url, post);
  }

  updatePosts(post: Post): Observable<any> {
    const url = `${this.url}/${post.id}`;

    return this.http.put(url, post);
  }

  deletePosts(postId: number): Observable<any> {
    const url = `${this.url}/${postId}`;

    return this.http.delete(url);
  }
}
