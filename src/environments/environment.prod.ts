import { NgxLoggerLevel } from 'ngx-logger';
const backend = '20.251.9.203'

export const environment = {
  production: true,
  tokenAllowedDomains: [backend],
  tokenDisallowedRoutes: [
    `http://${backend}/api/v1/auth/sign_in`,
    `http://${backend}/api/v1/auth/sign_up`,
  ],
  serverUrl: `http://${backend}`,
  apiUrl: `http://${backend}/api/v1`,
  brokerURL:  `ws://${backend}/api/v1/ws`,
  defaultLanguage: 'pl',
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.OFF,
};
