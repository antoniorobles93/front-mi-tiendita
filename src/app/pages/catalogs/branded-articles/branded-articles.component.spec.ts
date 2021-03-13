import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandedArticlesComponent } from './branded-articles.component';

describe('BrandedArticlesComponent', () => {
  let component: BrandedArticlesComponent;
  let fixture: ComponentFixture<BrandedArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandedArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandedArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
