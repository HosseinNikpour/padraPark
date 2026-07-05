export interface MenuTableItem {
  id: number;
  title: string;
  code?: string | null;
  type: "GAME" | "CAFE";
  price: number;
}