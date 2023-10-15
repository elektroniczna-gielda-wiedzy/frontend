import { NgxLoggerLevel } from 'ngx-logger';

const backend = 'localhost:8080'

export const environment = {
  production: false,
  tokenAllowedDomains: [backend],
  tokenDisallowedRoutes: [
    `http://${backend}/api/v1/auth/sign_in`,
    `http://${backend}/api/v1/auth/sign_up`,
  ],
  serverUrl: `http://${backend}`,
  apiUrl: `http://${backend}/api/v1`,
  brokerURL:  `ws://${backend}/api/v1/ws`,
  defaultLanguage: 'pl',
  logLevel: NgxLoggerLevel.TRACE,
  serverLogLevel: NgxLoggerLevel.OFF,
};
