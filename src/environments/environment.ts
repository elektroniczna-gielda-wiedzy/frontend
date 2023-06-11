import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: false,
  tokenAllowedDomains: ['localhost:8080'],
  tokenDisallowedRoutes: ['localhost:8080/api/auth'],
  apiUrl: 'http://localhost:8080/api/v1',
  defaultLanguage: 'pl',
  logLevel: NgxLoggerLevel.TRACE,
  serverLogLevel: NgxLoggerLevel.OFF,
};
