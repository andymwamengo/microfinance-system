import { TestBed } from '@angular/core/testing';

import { MicrofiResolverService } from './microfi-resolver.service';

describe('MicrofiResolverService', () => {
  let service: MicrofiResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicrofiResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
