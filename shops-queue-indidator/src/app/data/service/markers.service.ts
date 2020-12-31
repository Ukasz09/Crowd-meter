import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MarkerSchema } from '../schema/marker.schema';
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
    return this.http.get<MarkerSchema[]>(ENDPOINT);
  }

  getMarker(markerId: string): Observable<MarkerSchema> {
    const ENDPOINT = environment.crowdMeterApi + Slugs.MARKER + '/' + markerId;
    return this.http.get<MarkerSchema>(ENDPOINT);
  }
}
