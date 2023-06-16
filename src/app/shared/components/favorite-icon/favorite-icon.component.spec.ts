import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteIconComponent } from './favorite-icon.component';

describe('FavoriteIconComponent', () => {
  let component: FavoriteIconComponent;
  let fixture: ComponentFixture<FavoriteIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteIconComponent]
    });
    fixture = TestBed.createComponent(FavoriteIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
