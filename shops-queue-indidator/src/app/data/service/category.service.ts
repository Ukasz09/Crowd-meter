import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlaceCategoryModel } from '../../model/place-category.model';
import { CategoryAdapterService } from './category-adapter.service';
import { MockedApiService } from './mocked-api.service';
import { Slugs } from './slugs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private http: HttpClient,
    private mockedApiService: MockedApiService,
    private categoryAdapter: CategoryAdapterService
  ) {}

  getCategories(): Observable<PlaceCategoryModel[]> {
    return this.http
      .get(environment.crowdMeterApi + Slugs.CATEGORIES)
      .pipe(
        map((data: any[]) =>
          data.map((item: any) => this.categoryAdapter.adapt(item))
        )
      );
  }
}
