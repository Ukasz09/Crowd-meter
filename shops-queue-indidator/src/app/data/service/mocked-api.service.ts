import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Slugs } from './slugs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MockedApiService {
  mockedUrls: Map<string, { jsonPath: string; mockedForQuery: boolean }>;

  constructor(private http: HttpClient) {
    this.initMockedUrls();
  }

  private initMockedUrls() {
    this.mockedUrls = new Map([
      [
        environment.crowdMeterApi + Slugs.CATEGORIES,
        { jsonPath: 'assets/mock/categories.json', mockedForQuery: false },
      ],
      [
        environment.crowdMeterApi + Slugs.MARKERS,
        { jsonPath: 'assets/mock/markers.json', mockedForQuery: false },
      ],
    ]);
  }

  get<T>(url: string, options?: httpOptions): Observable<T> {
    let mockProperties = this.mockedUrls.get(url);
    if (mockProperties === undefined) {
      return this.getWithQuery(url, options);
    } else return this.http.get<T>(mockProperties.jsonPath);
  }

  private getWithQuery<T>(url: string, options?: httpOptions): Observable<T> {
    const query = url.substring(url.lastIndexOf('?') + 1);
    const slugWithoutQuery = url.substring(0, url.lastIndexOf('?'));
    const mockProperties = this.mockedUrls.get(slugWithoutQuery);
    if (mockProperties === undefined)
      return this.getErrResponse(
        url,
        options,
        404,
        'Not found mocked data for given URL'
      );
    else {
      if (mockProperties.mockedForQuery)
        return this.http.get<T>(mockProperties.jsonPath + '?' + query);
      else return this.http.get<T>(mockProperties.jsonPath);
    }
  }

  getErrResponse<T>(
    url: string,
    options?: httpOptions,
    statusCode?: number,
    msg?: string
  ): Observable<T> {
    const error = new HttpErrorResponse({
      error: { message: msg },
      headers: undefined,
      status: statusCode ?? 404,
      statusText: msg ?? 'Mocked error response msg',
      url: url,
    });
    return throwError(error) as any;
  }

  put<T>(url: string, body: T, options?: httpOptions): Observable<T> {
    return new BehaviorSubject<T>(body);
  }

  putErrorResponse<T>(
    url: string,
    body: T,
    options?: httpOptions,
    statusCode?: number,
    msg?: string
  ): Observable<T> {
    const error = new HttpErrorResponse({
      error: { message: msg },
      headers: undefined,
      status: statusCode ?? 404,
      statusText: msg ?? 'Mocked error response msg',
      url: url,
    });
    return throwError(error) as any;
  }
}

export type httpOptions = {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
};
