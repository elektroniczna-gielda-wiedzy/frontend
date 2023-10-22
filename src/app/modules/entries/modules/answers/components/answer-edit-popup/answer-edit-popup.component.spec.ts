import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerEditPopupComponent } from './answer-edit-popup.component';

describe('AnswerEditPopupComponent', () => {
  let component: AnswerEditPopupComponent;
  let fixture: ComponentFixture<AnswerEditPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnswerEditPopupComponent]
    });
    fixture = TestBed.createComponent(AnswerEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
