import { Product } from "./product";

export interface DepartmentsWithProducts {
  [key: string]: Product[];
}
