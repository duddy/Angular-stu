import { TestBed } from '@angular/core/testing';

import { ProductBulkUpdaterService } from './product-bulk-updater.service';

describe('ProductBulkUpdaterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductBulkUpdaterService = TestBed.get(ProductBulkUpdaterService);
    expect(service).toBeTruthy();
  });
});
