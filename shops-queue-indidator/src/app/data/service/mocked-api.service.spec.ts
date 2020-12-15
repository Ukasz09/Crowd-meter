import { TestBed } from '@angular/core/testing';

import { MockedApiService } from './mocked-api.service';

describe('MockedApiService', () => {
  let service: MockedApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockedApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
