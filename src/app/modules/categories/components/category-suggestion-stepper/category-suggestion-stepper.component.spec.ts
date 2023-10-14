import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySuggestionStepperComponent } from './category-suggestion-stepper.component';

describe('CategorySuggestionStepperComponent', () => {
  let component: CategorySuggestionStepperComponent;
  let fixture: ComponentFixture<CategorySuggestionStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategorySuggestionStepperComponent]
    });
    fixture = TestBed.createComponent(CategorySuggestionStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
