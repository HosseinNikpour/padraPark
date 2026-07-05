export interface ExcelSaleRow {
  code: string;
  title: string;
  qty: number;
  unitPrice: number;
  totalPrice: number;
}

export interface ExcelSummary {
  totalSales: number;
  totalDiscount: number;
  cashAmount: number;
  invoiceCount: number;
}

export interface ParsedExcel {
  rows: ExcelSaleRow[];
  summary: ExcelSummary;
}