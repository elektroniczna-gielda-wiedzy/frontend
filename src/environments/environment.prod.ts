import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  tokenAllowedDomains: ['20.251.9.203'],
  tokenDisallowedRoutes: ['http://20.251.9.203/api/v1/auth/sign_in', 'http://20.251.9.203/api/v1/auth/sign_up'],
  apiUrl: 'http://20.251.9.203/api/v1',
  brokerURL: 'ws://20.251.9.203/api/v1/ws',
  defaultLanguage: 'pl',
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.OFF,
};
