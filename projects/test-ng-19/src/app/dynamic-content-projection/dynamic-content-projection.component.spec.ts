import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicContentProjectionComponent } from './dynamic-content-projection.component';

describe('DynamicContentProjectionComponent', () => {
  let component: DynamicContentProjectionComponent;
  let fixture: ComponentFixture<DynamicContentProjectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicContentProjectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicContentProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
