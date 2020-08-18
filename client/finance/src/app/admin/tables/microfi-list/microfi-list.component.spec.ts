import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrofiListComponent } from './microfi-list.component';

describe('MicrofiListComponent', () => {
  let component: MicrofiListComponent;
  let fixture: ComponentFixture<MicrofiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicrofiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrofiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
