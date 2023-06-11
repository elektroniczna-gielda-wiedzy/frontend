import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: false,
  tokenAllowedDomains: ['localhost:8080'],
  tokenDisallowedRoutes: ['http://localhost:8080/api/v1/auth/sign_in', 'http://localhost:8080/api/v1/auth/sign_up'],
  apiUrl: 'http://localhost:8080/api/v1',
  defaultLanguage: 'pl',
  logLevel: NgxLoggerLevel.TRACE,
  serverLogLevel: NgxLoggerLevel.OFF,
};
