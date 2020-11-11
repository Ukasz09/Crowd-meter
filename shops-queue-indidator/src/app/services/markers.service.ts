import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarkerDetailedModel } from '../model/marker';

@Injectable({
  providedIn: 'root',
})
export class MarkersService {
  constructor(private http: HttpClient) {}

  getMarkers(): Observable<MarkerDetailedModel[]> {
    return this.http.get<MarkerDetailedModel[]>('assets/mocks/markers.json');
  }
}
