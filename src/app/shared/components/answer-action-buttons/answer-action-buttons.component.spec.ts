import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerActionButtonsComponent } from './answer-action-buttons.component';

describe('AnswerActionButtonsComponent', () => {
  let component: AnswerActionButtonsComponent;
  let fixture: ComponentFixture<AnswerActionButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnswerActionButtonsComponent]
    });
    fixture = TestBed.createComponent(AnswerActionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
