import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentActionButtonsComponent } from './comment-action-buttons.component';

describe('CommentActionButtonsComponent', () => {
  let component: CommentActionButtonsComponent;
  let fixture: ComponentFixture<CommentActionButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentActionButtonsComponent]
    });
    fixture = TestBed.createComponent(CommentActionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
