import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailLinkComponent } from './email-link.component';

describe('EmailLinkComponent', () => {
  let component: EmailLinkComponent;
  let fixture: ComponentFixture<EmailLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailLinkComponent]
    });
    fixture = TestBed.createComponent(EmailLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
