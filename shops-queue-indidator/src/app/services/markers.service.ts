import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarkerModel } from '../model/marker';

@Injectable({
  providedIn: 'root',
})
export class MarkersService {
  constructor(private http: HttpClient) {}

  getMarkers(): Observable<MarkerModel[]> {
    return this.http.get<MarkerModel[]>('assets/mocks/markers.json');
  }
}
