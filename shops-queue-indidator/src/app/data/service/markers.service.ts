import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarkerSchema } from '../schema/marker';

@Injectable({
  providedIn: 'root',
})
export class MarkersService {
  constructor(private http: HttpClient) {}

  getMarkers(): Observable<MarkerSchema[]> {
    return this.http.get<MarkerSchema[]>('assets/mock/markers.json');
  }
}
