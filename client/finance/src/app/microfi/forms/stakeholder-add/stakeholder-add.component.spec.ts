import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeholderAddComponent } from './stakeholder-add.component';

describe('StakeholderAddComponent', () => {
  let component: StakeholderAddComponent;
  let fixture: ComponentFixture<StakeholderAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StakeholderAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeholderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
