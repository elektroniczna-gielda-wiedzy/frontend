export enum EntryType {
  Announcement = 2,
  Note = 1,
  Post = 3,
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
