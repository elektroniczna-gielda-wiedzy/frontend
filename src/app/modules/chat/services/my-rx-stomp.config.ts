import { RxStompConfig } from '@stomp/rx-stomp';
import { TokenService } from 'src/app/core';

export function myRxStompConfig(): RxStompConfig {
  return {
    // Which server?
    brokerURL: 'ws://127.0.0.1:8080/ws',

    // Headers
    // Typical keys: login, passcode, host
    connectHeaders: {
      Authorization: TokenService.getToken(),
    },

    // How often to heartbeat?
    // Interval in milliseconds, set to 0 to disable
    heartbeatIncoming: 0, // Typical value 0 - disabled
    heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds

    // Wait in milliseconds before attempting auto reconnect
    // Set to 0 to disable
    // Typical value 500 (500 milli seconds)
    reconnectDelay: 500,
    
    // connectionTimeout: 10000,
    

    // Will log diagnostics on console
    // It can be quite verbose, not recommended in production
    // Skip this key to stop logging to console
    // debug: (msg: string): void => {
    //   console.log(new Date(), msg);
    // },
  };
}
