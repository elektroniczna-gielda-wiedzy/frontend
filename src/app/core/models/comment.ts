import { Author } from './user';

export interface Comment {
    comment_id: number;
    author: Author;
    created_at: string;
    content: string;
  }
  
  export interface CommentRequest {
    content: string;
  }