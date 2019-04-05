import { TestBed } from '@angular/core/testing';

import { CategoryDetailResolverService } from './category-detail-resolver.service';

describe('CategoryDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryDetailResolverService = TestBed.get(CategoryDetailResolverService);
    expect(service).toBeTruthy();
  });
});
