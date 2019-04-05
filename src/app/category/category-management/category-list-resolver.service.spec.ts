import { TestBed } from '@angular/core/testing';

import { CategoryListResolverService } from './category-list-resolver.service';

describe('CategoryListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryListResolverService = TestBed.get(CategoryListResolverService);
    expect(service).toBeTruthy();
  });
});
