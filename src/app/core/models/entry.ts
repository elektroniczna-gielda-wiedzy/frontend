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
  content: string;
  categories: Category[];
  author: Author;
  created_at: string;
}
