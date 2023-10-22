import { CategoryStatus } from "../enums/category-status";
import { CategoryType } from "../enums/category-type";


export interface Category {
  category_id: CategoryType;
  type: CategoryType;
  parent_id: number | null;
  status?: CategoryStatus;
  names: {
    lang_id: number;
    name: string;
  }[];
}
