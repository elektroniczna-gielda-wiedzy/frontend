export interface UserSignInCredentials {
    email: string;
    password: string;
    remember_me: boolean;
}

export interface TokenResponse {
    session_token: string;
}

export interface UserSignUpCredentials {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}