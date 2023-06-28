import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  tokenAllowedDomains: ['localhost:8080'],
  tokenDisallowedRoutes: ['http://localhost:8080/api/v1/auth/sign_in', 'http://localhost:8080/api/v1/auth/sign_up'],
  apiUrl: 'http://20.251.9.203/api/v1',
  brokerURL: 'ws://20.251.9.203:8080/ws',
  defaultLanguage: 'pl',
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.OFF,
};
