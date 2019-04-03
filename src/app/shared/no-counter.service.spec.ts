import { TestBed } from '@angular/core/testing';

import { NoCounterService } from './no-counter.service';

describe('NoCounterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoCounterService = TestBed.get(NoCounterService);
    expect(service).toBeTruthy();
  });
});
