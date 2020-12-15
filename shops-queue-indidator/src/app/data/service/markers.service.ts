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
    const ENDPOINT = environment.crowdMeterApi + Slugs.MARKERS;
    return this.mockedApiService.get<MarkerSchema[]>(ENDPOINT);
  }

  getMarker(markerId: string): Observable<MarkerSchema> {
    const URL = environment.crowdMeterApi + Slugs.MARKERS;
    const QUERY = '?id=' + markerId;
    const ENDPOINT = URL + QUERY;
    return this.mockedApiService.get<MarkerSchema>(ENDPOINT);
  }
}
