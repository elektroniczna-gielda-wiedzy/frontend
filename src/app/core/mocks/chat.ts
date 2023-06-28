import { ChatListItem, Chat } from "../models/chat";

export const CHAT_LIST: ChatListItem[] = [
    {
        chat_id: 1,
        other_user: {
            user_id: 2,
            first_name: 'Maria',
            last_name: 'Kowalska',
        },
        last_message: {
            message_id: 1,
            chat_id: 1,
            sender: {
                user_id: 1,
                first_name: 'Adam',
                last_name: 'Kowalski',
            },
            content: 'Cześć, chciałbym się umówić na korepetycje z matematyki.',
            date_sent: '2021-05-01 11:23:15',
        }
    },
    {
        chat_id: 2,
        other_user: {
            user_id: 2,
            first_name: 'Jan',
            last_name: 'Nowak',
        },
        last_message: {
            message_id: 2,
            chat_id: 2,
            sender: {
                user_id: 2,
                first_name: 'Jan',
                last_name: 'Nowak',
            },
            content: 'Cześć, chciałbym się umówić na korepetycje z matematyki.',
            date_sent: '2021-05-01 11:23:15',
        }
    },
    {
        chat_id: 3,
        other_user: {
            user_id: 3,
            first_name: 'Anna',
            last_name: 'Kowalska',
        },
        last_message: {
            message_id: 3,
            chat_id: 3,
            sender: {
                user_id: 3,
                first_name: 'Anna',
                last_name: 'Kowalska',
            },
            content: 'Cześć, chciałbym się umówić na korepetycje z matematyki.',
            date_sent: '2021-05-01 11:23:15',
        }
    }
]

export const CHAT: Chat = {
    chat_id: 1,
    other_user_id: 2,
    messages: [
        {
            message_id: 1,
            chat_id: 1,
            sender: {
                user_id: 1,
                first_name: 'Adam',
                last_name: 'Kowalski',
            },
            content: 'Cześć, chciałbym się umówić na korepetycje z matematyki.',
            date_sent: '2021-05-01 11:23:15',
        },
        {
            message_id: 2,
            chat_id: 1,
            sender: {
                user_id: 2,
                first_name: 'Maria',
                last_name: 'Kowalska',
            },
            content: 'Cześć, chciałbym się umówić na korepetycje z matematyki.',
            date_sent: '2021-05-01 11:23:15',
        },
    ]
}