import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ManufacturerIndex } from './manufacturer-index';

describe('ManufacturerIndex', () => {
  let component: ManufacturerIndex;
  let fixture: ComponentFixture<ManufacturerIndex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturerIndex],
    }).compileComponents();

    fixture = TestBed.createComponent(ManufacturerIndex);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
