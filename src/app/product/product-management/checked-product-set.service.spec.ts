import { TestBed } from '@angular/core/testing';

import { CheckedProductSetService } from './checked-product-set.service';

describe('CheckedProductSetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckedProductSetService = TestBed.get(CheckedProductSetService);
    expect(service).toBeTruthy();
  });
});
