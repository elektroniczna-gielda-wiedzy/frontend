import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEntryListComponent } from './profile-entry-list.component';

describe('ProfileEntryListComponent', () => {
  let component: ProfileEntryListComponent;
  let fixture: ComponentFixture<ProfileEntryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileEntryListComponent]
    });
    fixture = TestBed.createComponent(ProfileEntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
