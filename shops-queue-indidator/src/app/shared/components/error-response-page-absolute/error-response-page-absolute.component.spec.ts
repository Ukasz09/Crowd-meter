import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorResponsePageAbsoluteComponent } from './error-response-page-absolute.component';

describe('ErrorResponsePageAbsoluteComponent', () => {
  let component: ErrorResponsePageAbsoluteComponent;
  let fixture: ComponentFixture<ErrorResponsePageAbsoluteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorResponsePageAbsoluteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorResponsePageAbsoluteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
