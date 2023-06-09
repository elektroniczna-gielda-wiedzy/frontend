export interface Category {
    category_id: number;
    type: number;
    parent_id: number | null;
    names: {
      lang_id: number;
      name: string;
    }[];
  }