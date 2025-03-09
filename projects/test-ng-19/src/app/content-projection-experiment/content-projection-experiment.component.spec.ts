import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentProjectionExperimentComponent } from './content-projection-experiment.component';

describe('ContentProjectionExperimentComponent', () => {
  let component: ContentProjectionExperimentComponent;
  let fixture: ComponentFixture<ContentProjectionExperimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentProjectionExperimentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentProjectionExperimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
