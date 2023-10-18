import { EntryType } from "../enums/entry-type";

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
  user_id: number;
  first_name: string;
  last_name: string;
  email?: string;
  created_at?: string;
  last_login?: string;
  entries_count?: {
    entry_type_id: EntryType;
    count: number;
    name: string;
  }[];
  votes_count?: {
    entry_type_id: EntryType;
    name: string;
    positive: number;
    negative: number;
  }[];
}