import { TestBed } from '@angular/core/testing';

import { VatPercentageService } from './vat-percentage.service';

describe('VatPercentageService', () => {
  let service: VatPercentageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VatPercentageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
