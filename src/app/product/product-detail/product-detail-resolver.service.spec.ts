import { TestBed } from '@angular/core/testing';

import { ProductDetailResolverService } from './product-detail-resolver.service';

describe('ProductDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductDetailResolverService = TestBed.get(ProductDetailResolverService);
    expect(service).toBeTruthy();
  });
});
