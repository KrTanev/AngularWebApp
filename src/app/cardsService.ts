import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from './card.interface';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  url = 'http://localhost:3000/cards';

  constructor(private http: HttpClient) {}

  getCard(id: number): Observable<Card> {
    const url = `${this.url}/${id}`;

    return this.http.get<Card>(url);
  }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.url);
  }

  createCards(card: Card): Observable<any> {
    return this.http.post(this.url, card);
  }

  updateCards(card: Card): Observable<any> {
    const url = `${this.url}/${card.id}`;

    return this.http.put(url, card);
  }

  deleteCards(cardId: number): Observable<any> {
    const url = `${this.url}/${cardId}`;

    return this.http.delete(url);
  }
}
