import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorResponsePageComponent } from './error-response-page.component';

describe('ErrorResponsePageComponent', () => {
  let component: ErrorResponsePageComponent;
  let fixture: ComponentFixture<ErrorResponsePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorResponsePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorResponsePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
