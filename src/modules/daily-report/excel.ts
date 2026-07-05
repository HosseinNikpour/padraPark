import * as XLSX from "xlsx";
import { ExcelSaleRow,ParsedExcel } from "./types";

function toNumber(value: unknown): number {
  if (value === null || value === undefined) return 0;

  if (typeof value === "number") return value;

  const n = Number(
    String(value)
      .replace(/,/g, "")
      .trim()
  );

  return Number.isNaN(n) ? 0 : n;
}

export async function parseExcel(  file: File): Promise<ParsedExcel> {

  const buffer = await file.arrayBuffer();

  const workbook = XLSX.read(buffer);

  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const rows: any[][] = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    raw: true,
  });

  const result: ExcelSaleRow[] = [];

 for (let i = 1; i < rows.length; i++) {
  const row = rows[i];

  if (!row) continue;

  // فقط ردیف‌هایی که ستون اولشان عدد است فروش هستند
  if (typeof row[0] !== "number") {
    break;
  }

  result.push({
    code: String(row[0]),
    qty: Number(row[1] ?? 0),
    unitPrice: Number(row[2] ?? 0),
    totalPrice: Number(row[3] ?? 0),
    title: String(row[4] ?? ""),
  });
}
  

 const summary = {
  cashAmount: toNumber(rows[rows.length - 2]?.[0]),
  totalDiscount: toNumber(rows[rows.length - 2]?.[1]),
  totalSales: toNumber(rows[rows.length - 2]?.[3]),
  invoiceCount: result.length,
};

return {
  rows: result,
  summary,
};
}