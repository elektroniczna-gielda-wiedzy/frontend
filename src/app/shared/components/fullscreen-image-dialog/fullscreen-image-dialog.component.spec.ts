import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullscreenImageDialogComponent } from './fullscreen-image-dialog.component';

describe('FullscreenImageDialogComponent', () => {
  let component: FullscreenImageDialogComponent;
  let fixture: ComponentFixture<FullscreenImageDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FullscreenImageDialogComponent]
    });
    fixture = TestBed.createComponent(FullscreenImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
