import { TestBed } from '@angular/core/testing';

import { ProductListResolverService } from './product-list-resolver.service';

describe('ProductListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductListResolverService = TestBed.get(ProductListResolverService);
    expect(service).toBeTruthy();
  });
});
