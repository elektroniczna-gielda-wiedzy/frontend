import { Category } from './category';
import { Author } from './user';
import { Answer } from './answer';
import { EntryType } from '../enums/entry-type';

export interface Entry {
  entry_id: number;
  entry_type_id: EntryType;
  title: string;
  favorite: boolean;
  votes: number;
  user_vote?: number;
  categories: Category[];
  author: Author;
  created_at: string;
  content?: string;
  image?: string;
}

export interface EntryRequest {
  entry_type_id: EntryType;
  title: string;
  content: string;
  image?: {
    filename: string;
    data: string;
  }
  categories: number[];
}

export const SORT_KEY = 'entries_order';
export const SORT_DEFAULT = '1';
export const SORT_OPTIONS = [
  { value: '0', label: 'Newest' },
  { value: '1', label: 'Recently modified' },
  { value: '2', label: 'Highest votes' },
];

