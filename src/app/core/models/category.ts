import { CategoryStatus } from "../enums/category-status";


export interface Category {
  category_id: number;
  type: number;
  parent_id: number | null;
  status?: CategoryStatus;
  names: {
    lang_id: number;
    name: string;
  }[];
}
