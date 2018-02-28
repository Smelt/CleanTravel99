import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleTimeComponent } from './google-time.component';

describe('GoogleTimeComponent', () => {
  let component: GoogleTimeComponent;
  let fixture: ComponentFixture<GoogleTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
