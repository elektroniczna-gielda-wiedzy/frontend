import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Author, DEFAULT_RESULT_INFO, ResultInfo, TokenService, UserInfo } from 'src/app/core';
import { UserHttpService } from 'src/app/core/http/user-http.service';
import { ChatService } from 'src/app/modules/chat/services/chat.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  users: UserInfo[] = [];
  userFilterForm = new FormGroup({
    search: new FormControl(''),
    status: new FormControl(''),
  });

  resultInfo?: ResultInfo = DEFAULT_RESULT_INFO

  constructor(
    private userHttpService: UserHttpService,
    private logger: NGXLogger,
    private chatService: ChatService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(event?: PageEvent): void {
    const params = {
      search: this.userFilterForm.value.search || '',
      isEmailAuth: '',
      isBanned: '',
      page: event?.pageIndex || this.resultInfo?.page || DEFAULT_RESULT_INFO.page,
      per_page: event?.pageSize || this.resultInfo?.per_page || DEFAULT_RESULT_INFO.per_page,
    };
    switch (this.userFilterForm.value.status) {
      case 'email-auth':
        params.isEmailAuth = 'true';
        break;
      case 'no-email-auth':
        params.isEmailAuth = 'false';
        break;
      case 'banned':
        params.isBanned = 'true';
        break;
    }
    
    this.userHttpService.getUsers(params).subscribe({
      next: (response) => {
        if (response.success) {
          this.users = response.result;
          this.resultInfo = response.result_info;
        }
        this.logger.trace(response);
      },
      error: (err) => {
        this.logger.error(err);
      },
    });
  }

  applyFilter() {
    this.logger.info(this.userFilterForm.value);
    this.loadUsers();
  }

  clearFilter() {
    this.userFilterForm.reset();
    this.loadUsers();
  }

  contactUser(user: Author) {
    this.chatService.startChatWithUser(user);
    this.router.navigate(['/chat']);
  }

  userEntries(userId: number) {
    this.router.navigate(['/profile', userId, 'entries']);
  }

  userDetails(userId: number) {
    this.router.navigate(['/admin-dashboard', 'users', userId]);
  }

  setBanned(userId: number, isBanned: boolean) {
    this.userHttpService.setBanned(userId, isBanned).subscribe({
      next: (response) => {
        if (response.success) {
          this.users = this.users.map((user) => {
            if (user.user_id === userId) {
              user.is_banned = isBanned;
            }
            return user;
          });
        }
        this.logger.trace(response);
      },
      error: (err) => {
        this.logger.error(err);
      },
    });
  }

  isCurrentUser(userId: number): boolean {
    return this.tokenService.getUserId() === userId;
  }

  handlePageEvent(event: PageEvent) {
    this.loadUsers(event);
  }
}
