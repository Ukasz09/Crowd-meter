import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLoadingPageAbsoluteComponent } from './data-loading-page-absolute.component';

describe('DataLoadingPageAbsoluteComponent', () => {
  let component: DataLoadingPageAbsoluteComponent;
  let fixture: ComponentFixture<DataLoadingPageAbsoluteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataLoadingPageAbsoluteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataLoadingPageAbsoluteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
