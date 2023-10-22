import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAnswerWidgetComponent } from './top-answer-widget.component';

describe('TopAnswerWidgetComponent', () => {
  let component: TopAnswerWidgetComponent;
  let fixture: ComponentFixture<TopAnswerWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopAnswerWidgetComponent]
    });
    fixture = TestBed.createComponent(TopAnswerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
