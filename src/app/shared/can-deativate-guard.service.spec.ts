import { TestBed } from '@angular/core/testing';

import { CanDeativateGuardService } from './can-deativate-guard.service';

describe('CanDeativateGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanDeativateGuardService = TestBed.get(CanDeativateGuardService);
    expect(service).toBeTruthy();
  });
});
