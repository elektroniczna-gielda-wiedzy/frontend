import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService, UserInfo } from 'src/app/core';
import { UserHttpService } from 'src/app/core/http/user-http.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent {
  userInfo?: UserInfo;
  adminView = false; //TODO adjust admin view add ban & chat button, hide change password button

  constructor(
    private userHttpService: UserHttpService,
    private tokenService: TokenService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const currentUserId = this.tokenService.getUserId();
    const url = this.router.url;
    
    if (url === '/profile/details') {
      this.fetchUserInfo(currentUserId);
    } else if (
      url.startsWith('/admin-dashboard/users/') &&
      this.tokenService.isAdmin()
    ) {
      this.adminView = true;
      const userId = this.route.snapshot.paramMap.get('id');
      this.fetchUserInfo(parseInt(userId || ''));
    }
  }

  fetchUserInfo(userId: number | null) {
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