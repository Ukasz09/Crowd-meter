import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaceCategorySchema } from '../schema/place-category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<PlaceCategorySchema[]> {
    return this.http.get<PlaceCategorySchema[]>('assets/mock/categories.json');
  }
}
