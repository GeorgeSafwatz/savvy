export type CategoryNamesProp =
  | "clothes"
  | "gift"
  | "accessories"
  | "sportswear";

export type SubCategoryProp = {
  title?: string;
  img?: string;
  ref?: React.MutableRefObject<HTMLUListElement | null>;
}[];
