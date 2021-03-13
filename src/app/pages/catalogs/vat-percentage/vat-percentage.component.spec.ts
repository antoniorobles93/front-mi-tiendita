import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VatPercentageComponent } from './vat-percentage.component';

describe('VatPercentageComponent', () => {
  let component: VatPercentageComponent;
  let fixture: ComponentFixture<VatPercentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VatPercentageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VatPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
