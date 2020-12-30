import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlaceCategorySchema } from '../schema/place-category.schema';
import { MockedApiService } from './mocked-api.service';
import { Slugs } from './slugs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private http: HttpClient,
    private mockedApiService: MockedApiService
  ) {}

  getCategories(): Observable<PlaceCategorySchema[]> {
    return this.mockedApiService.get<PlaceCategorySchema[]>(
      environment.crowdMeterApi + Slugs.CATEGORIES
    );
  }
}
