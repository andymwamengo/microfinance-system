import { TestBed } from '@angular/core/testing';

import { MicrofiService } from './microfi.service';

describe('MicrofiService', () => {
  let service: MicrofiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicrofiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
