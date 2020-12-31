import { TestBed } from '@angular/core/testing';

import { CategoryAdapterService } from './category-adapter.service';

describe('CategoryAdapterService', () => {
  let service: CategoryAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
