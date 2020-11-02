import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaceCategory } from '../model/place-category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<PlaceCategory[]> {
    return this.http.get<PlaceCategory[]>('assets/mocks/categories.json');
  }
}
