import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomProgressbarComponent } from './custom-progressbar.component';

describe('CustomProgressbarComponent', () => {
  let component: CustomProgressbarComponent;
  let fixture: ComponentFixture<CustomProgressbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomProgressbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
