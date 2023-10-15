import { Author } from './user';
import {Comment } from "./comment"
export interface Answer {
    answer_id: number;
    author: Author;
    created_at: string;
    top_answer: boolean;
    votes: number,
    user_vote?: number;
    content: string;
    image?: string;
    imageSrc?: string;
    comments?: Comment[];
  }
  
  export interface AnswerRequest {
    content: string;
    image?: string;
  }