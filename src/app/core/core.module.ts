import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material-module';
import { AppTranslateModule } from '../modules/translate/translate.module';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenService } from './services/token.service';
import { environment } from 'src/environments/environment';
import { tokenGetter } from './models/token';

@NgModule({
  declarations: [NavbarComponent],
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
        tokenGetter: tokenGetter,
        allowedDomains: [...environment.tokenAllowedDomains],
        disallowedRoutes: [environment.apiUrl + '/auth/sign_in'],
      },
    }),
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
