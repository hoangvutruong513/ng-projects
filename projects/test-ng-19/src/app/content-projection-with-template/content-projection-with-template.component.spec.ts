import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentProjectWithTemplateComponent } from './content-projection-with-template.component';

describe('ContentProjectionWithTemplateComponent', () => {
  let component: ContentProjectWithTemplateComponent;
  let fixture: ComponentFixture<ContentProjectWithTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentProjectWithTemplateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentProjectWithTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
