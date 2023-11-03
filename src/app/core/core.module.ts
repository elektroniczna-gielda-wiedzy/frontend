import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material-module';
import { AppTranslateModule } from '../modules/translate/translate.module';
import { JwtModule } from '@auth0/angular-jwt';
import { TokenService } from './services/token.service';
import { environment } from 'src/environments/environment';
import { SharedModule } from '../shared/shared.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EmailConfirmComponent } from './components/email-confirm/email-confirm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NavbarComponent, PageNotFoundComponent, EmailConfirmComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    HttpClientModule,
    AppTranslateModule,
    JwtModule.forRoot({
      config: {
        headerName: 'Authorization',
        authScheme: '',
        tokenGetter: TokenService.getToken,
        allowedDomains: [...environment.tokenAllowedDomains],
        disallowedRoutes: [...environment.tokenDisallowedRoutes],
      },
    }),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [TokenService],
  exports: [NavbarComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only.'
      );
    }
  }
}
