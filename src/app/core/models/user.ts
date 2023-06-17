export interface UserSignInCredentials {
    email: string;
    password: string;
    remember_me: boolean;
}

export interface UserSignUpCredentials {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}

export interface Author {
    user_id: number;
    first_name: string;
    last_name: string;
  }