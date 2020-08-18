import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrofiComponent } from './microfi.component';

describe('MicrofiComponent', () => {
  let component: MicrofiComponent;
  let fixture: ComponentFixture<MicrofiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicrofiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrofiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
