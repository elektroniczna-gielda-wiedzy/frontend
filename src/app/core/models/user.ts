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

export interface UserInfo {
  basic_info: Author;
  email?: string;
  created_at?: string;
  last_login?: string;
  activity?: {
    no_entries: {
      Announcement: number;
      Note: number;
      Post: number;
    };
    no_votes: {
      Announcement: {
        positive: number;
        negative: number;
      };
      Note: {
        positive: number;
        negative: number;
      };
      Post: {
        positive: number;
        negative: number;
      };
    };
  };
}