export interface UserSignInCredentials {
    email: string;
    password: string;
    remember_me: boolean;
}

export interface TokenResponse {
    session_token: string;
}