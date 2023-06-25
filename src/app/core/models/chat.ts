
import { Author } from "./user";

export interface ChatMessage {
    message_id: number;
    chat_id: number;
    sender: Author;
    content: string;
    date_sent: String;
}

export interface ChatListItem {
    chat_id: number;
    other_user: Author;
    last_message?: ChatMessage;
    is_read?: boolean;
}

export interface Chat {
    chat_id: number;
    other_user_id: number;
    messages: ChatMessage[];
}