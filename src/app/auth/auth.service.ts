import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000/users';

  private hasLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUser(id: string): Observable<User> {
    const url = `${this.url}/${id}`;

    return this.http.get<User>(url);
  }

  login(email: string, password: string): Observable<User | undefined> {
    return this.getUsers().pipe(
      map((stream: User[]) =>
        stream.find(
          (user) => user.email === email && user.password === password
        )
      )
    );
  }

  register(data: User): Observable<User> {
    data.isOrganization === 'yes'
      ? (data.isOrganization = 'true')
      : (data.isOrganization = 'false');

    return this.http.post<User>(this.url, data);
  }

  updateProfile(data: User): Observable<User> {
    const url = `${this.url}/${data.id}`;

    data.isOrganization === 'Yes' || data.isOrganization === 'yes'
      ? (data.isOrganization = 'true')
      : (data.isOrganization = 'false');

    return this.http.put<User>(url, data);
  }

  setLoggedUser(user: User): void {
    localStorage.setItem('loggedUser', JSON.stringify(user));

    this.setHasLoggedIn(true);
  }

  getLoggedUser(): User {
    return JSON.parse(localStorage.getItem('loggedUser') || '');
  }

  logOut(): void {
    localStorage.removeItem('loggedUser');

    this.setHasLoggedIn(false);
  }

  setHasLoggedIn(hasLogged: boolean): void {
    this.hasLoggedIn$.next(hasLogged);
  }

  getHasLoggedIn(): Observable<boolean> {
    return this.hasLoggedIn$.asObservable();
  }
}
