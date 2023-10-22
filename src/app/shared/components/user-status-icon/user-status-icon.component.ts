import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-status-icon',
  templateUrl: './user-status-icon.component.html',
  styleUrls: ['./user-status-icon.component.scss']
})
export class UserStatusIconComponent {
  @Input()
  is_banned?: boolean = false;
  @Input()
  is_email_auth?: boolean = false;

}
