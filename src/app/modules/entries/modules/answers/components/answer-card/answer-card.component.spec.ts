import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerCardComponent } from './answer-card.component';

describe('AnswerCardComponent', () => {
  let component: AnswerCardComponent;
  let fixture: ComponentFixture<AnswerCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnswerCardComponent]
    });
    fixture = TestBed.createComponent(AnswerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
