import { Category } from './category';

interface Author {
  user_id: number;
  first_name: string;
  last_name: string;
}

export interface Entry {
  entry_id: number;
  entry_type_id: number;
  title: string;
  favorite: boolean;
  categories: Category[];
  author: Author;
  created_at: string;
  content?: string;
  image?: string;
}


export interface Answer {
  answer_id: number;
  author: Author;
  created_at: string;
  top_answer: boolean;
  votes: number,
  content: string;
  image?: string;
}

export interface EntryAnswer {
  answers: Answer[];
  entry_type_id: number;
  title: string;
  favorite: boolean;
  categories: Category[];
  author: Author;
  created_at: string;
  content?: string;
  image?: string;

}

