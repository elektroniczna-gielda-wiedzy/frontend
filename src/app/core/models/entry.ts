export interface Entry {
  entry_id: number;
  entry_type_id: number;
  title: string;
  favorite: boolean;
  categories: {
    category_id: number;
    type: number;
    parent_id: number | null;
    names: {
      lang_id: number;
      name: string;
    }[];
  }[];
  author: {
    user_id: number;
    first_name: string;
    last_name: string;
  };
  created_at: string;
}
