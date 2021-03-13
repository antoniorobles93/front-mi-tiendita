import { TestBed } from '@angular/core/testing';

import { BrandedArticlesService } from './branded-articles.service';

describe('BrandedArticlesService', () => {
  let service: BrandedArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandedArticlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
