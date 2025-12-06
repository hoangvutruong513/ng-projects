import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerDetail } from './manufacturer-detail';

describe('ManufacturerDetail', () => {
  let component: ManufacturerDetail;
  let fixture: ComponentFixture<ManufacturerDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturerDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(ManufacturerDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
