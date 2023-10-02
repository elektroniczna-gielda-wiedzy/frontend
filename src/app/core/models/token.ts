export interface TokenResponse {
    session_token: string;
}

export const TOKEN_KEY = 'sessionToken';

export interface TokenPayload {
    user: number;
    role: string;
    iat: number;
    exp: number;
}