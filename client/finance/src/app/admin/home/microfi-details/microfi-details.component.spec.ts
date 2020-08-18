import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrofiDetailsComponent } from './microfi-details.component';

describe('MicrofiDetailsComponent', () => {
  let component: MicrofiDetailsComponent;
  let fixture: ComponentFixture<MicrofiDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicrofiDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrofiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
