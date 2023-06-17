import { Author } from './user';

export interface Answer {
    answer_id: number;
    author: Author;
    created_at: string;
    top_answer: boolean;
    votes: number,
    content: string;
    image?: string;
    imageSrc?: string;
  }
  
  export interface AnswerRequest {
    content: string;
    image?: string;
  }