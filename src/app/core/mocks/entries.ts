import { EntryType } from '../enums/entry-type';

const baseEntry = {
  favorite: false,
  categories: [
    {
      category_id: 1,
      type: 1,
      parent_id: 2,
      names: [{ lang_id: 1, name: 'Analiza' }],
    },
    {
      category_id: 2,
      type: 1,
      parent_id: null,
      names: [{ lang_id: 1, name: 'Matematyka' }],
    },
    {
      category_id: 3,
      type: 0,
      parent_id: null,
      names: [{ lang_id: 1, name: 'Wydział Matematyki Stosowanej' }],
    },
    {
      category_id: 4,
      type: 0,
      parent_id: 3,
      names: [{ lang_id: 1, name: 'Matematyka' }],
    },
  ],
  author: {
    user_id: 1,
    first_name: 'Adam',
    last_name: 'Kowalski',
  },
  created_at: '2023-05-01 11:23:15',
};

const createEntry = (
  entry_id: number,
  entry_type_id: EntryType,
  title: string
) => {
  return {
    entry_id: entry_id,
    entry_type_id: entry_type_id,
    title: title,
    ...baseEntry,
  };
};

export const ENTRIES = [
  createEntry(1, EntryType.Announcement, 'Ogłoszenie o korepetycjach 1'),
  createEntry(2, EntryType.Announcement, 'Ogłoszenie o korepetycjach 2'),
  createEntry(
    3,
    EntryType.Announcement,
    'Ogłoszenie o korepetycjach 3 z długim tytułem długim tytułem, długim tytułem, długim tytułem, długim tytułem, długim tytułem'
  ),
  createEntry(4, EntryType.Note, 'Notatki z Analiza'),
  createEntry(5, EntryType.Post, 'Post o Analiza'),
  createEntry(6, EntryType.Announcement, 'Ogłoszenie o korepetycjach 4'),
  createEntry(7, EntryType.Announcement, 'Ogłoszenie o korepetycjach 5'),
  createEntry(8, EntryType.Note, 'Notatki z Algebra 2'),
  createEntry(9, EntryType.Post, 'Post o Algebra 2'),
];
