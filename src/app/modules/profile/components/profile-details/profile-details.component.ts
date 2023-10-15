import { Component } from '@angular/core';
import { TokenService, UserInfo } from 'src/app/core';
import { UserHttpService } from 'src/app/core/http/user-http.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent {
  userInfo?: UserInfo;

  constructor(
    private userHttpService: UserHttpService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    const userId = this.tokenService.getUserId();
    if (!userId) {
      return;
    }

    this.userHttpService.getUserInfo(userId).subscribe((response) => {
      if (response.success && response.result?.length > 0) {
        this.userInfo = response.result[0];
      }
    });
  }

  // TODO: Move this to a pipe
  formatDate(date?: string) {
    if (!date) {
      return '';
    }
    return date.split('+')[0];
  }
}
