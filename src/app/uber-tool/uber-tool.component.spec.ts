import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UberToolComponent } from './uber-tool.component';

describe('UberToolComponent', () => {
  let component: UberToolComponent;
  let fixture: ComponentFixture<UberToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UberToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UberToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
