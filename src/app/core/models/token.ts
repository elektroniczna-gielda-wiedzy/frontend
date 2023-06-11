export interface TokenResponse {
    session_token: string;
}



export const TOKEN_KEY = 'sessionToken';

export function tokenGetter() : string | null {
  return localStorage.getItem(TOKEN_KEY);
}
