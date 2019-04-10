import { TestBed } from '@angular/core/testing';

import { SessionAuthGuardService } from './session-auth-guard.service';

describe('SessionAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionAuthGuardService = TestBed.get(SessionAuthGuardService);
    expect(service).toBeTruthy();
  });
});
