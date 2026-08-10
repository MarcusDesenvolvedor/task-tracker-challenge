export type CategoryColorName =
  | "blue"
  | "yellow"
  | "red"
  | "green"
  | "orange"
  | "purple"
  | "pink";

export interface Category {
  id: string;
  name: string;
  color: CategoryColorName;
}
