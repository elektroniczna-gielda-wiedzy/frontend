import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatusIconComponent } from './user-status-icon.component';

describe('UserStatusIconComponent', () => {
  let component: UserStatusIconComponent;
  let fixture: ComponentFixture<UserStatusIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserStatusIconComponent]
    });
    fixture = TestBed.createComponent(UserStatusIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
