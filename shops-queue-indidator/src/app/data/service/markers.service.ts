import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MarkerSchema } from '../schema/marker';
import { MockedApiService } from './mocked-api.service';
import { Slugs } from './slugs';

@Injectable({
  providedIn: 'root',
})
export class MarkersService {
  constructor(
    private http: HttpClient,
    private mockedApiService: MockedApiService
  ) {}

  getMarkers(): Observable<MarkerSchema[]> {
    return this.mockedApiService.get<MarkerSchema[]>(
      environment.crowdMeterApi + Slugs.MARKERS
    );
  }
}
