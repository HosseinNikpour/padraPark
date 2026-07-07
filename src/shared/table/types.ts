import { ReactNode } from "react";

export interface Column<T> {
  key: keyof T | string;
  title: string;
  className?: string;

  render?: (row: T) => ReactNode;
}