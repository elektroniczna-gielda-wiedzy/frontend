export enum EntryType {
  Announcement = 0,
  Note = 1,
  Post = 2,
}
export function stringToEntryType(type: string): EntryType | null {
  switch (type.toLowerCase()) {
    case 'announcement':
      return EntryType.Announcement;
    case 'post':
      return EntryType.Post;
    case 'note':
      return EntryType.Note;
    default:
      return null;
  }
}
