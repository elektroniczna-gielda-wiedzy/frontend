export enum EntryType {
  Announcement = 0,
  Note = 1,
  Post = 2,
}
export function stringToEntryType(type: string): EntryType {
  switch (type.toLowerCase()) {
    case 'announcement':
      return EntryType.Announcement;
    case 'post':
      return EntryType.Post;
    case 'note':
      return EntryType.Note;
  }
  throw new Error(`Unknown entry type: ${type}`);
}

export function entryTypeToString(type: EntryType): string {
  switch (type) {
    case EntryType.Announcement:
      return 'Announcement';
    case EntryType.Post:
      return 'Post';
    case EntryType.Note:
      return 'Note';
  }
}
