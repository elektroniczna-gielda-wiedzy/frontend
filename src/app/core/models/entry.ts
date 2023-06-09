import { Category } from './category';
import { Author } from './user';
import { Answer } from './answer';

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
  answers?: Answer[];
}

export interface EntryRequest {
  entry_type_id: number;
  title: string;
  content: string;
  image?: string;
  categories: number[];
}

