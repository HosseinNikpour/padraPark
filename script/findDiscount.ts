import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

function toNumber(value: unknown): number {
    if (value === null || value === undefined) {
        return 0;
    }

    if (typeof value === "number") {
        return value;
    }

    const n = Number(
        String(value)
            .replace(/,/g, "")
            .trim()
    );

    return Number.isNaN(n) ? 0 : n;
}

function parseDiscount(filePath: string): number {

    const buffer = fs.readFileSync(filePath);

    const workbook = XLSX.read(buffer);

    const sheet =
        workbook.Sheets[workbook.SheetNames[0]];

    const rows: any[][] =
        XLSX.utils.sheet_to_json(sheet, {
            header: 1,
            raw: true,
        });

    if (rows.length < 2) {
        return 0;
    }

    const summaryRow =
        rows[rows.length - 3];

    return toNumber(
        summaryRow?.[4]
    );
}

async function main() {

    const folderPath =
        path.resolve("./forosh");

    if (!fs.existsSync(folderPath)) {

        throw new Error(
            `Folder not found: ${folderPath}`
        );
    }

    const files = fs
        .readdirSync(folderPath)
        .filter(file =>
            /\.(xlsx|xls)$/i.test(file)
        );

    const data: Record<string, any>[] = [];

    let maxParts = 0;

    for (const file of files) {

        const filePath =
            path.join(folderPath, file);

        try {

            const discount =
                parseDiscount(filePath);

            // حذف پسوند فایل
            const fileNameWithoutExtension =
                path.parse(file).name;

            // تقسیم اسم فایل بر اساس Space
            const parts =
                fileNameWithoutExtension
                    .trim()
                    .split(/\s+/);

            maxParts =
                Math.max(
                    maxParts,
                    parts.length
                );

            const row: Record<string, any> = {

                "مبلغ تخفیف": discount,

            };

            parts.forEach(
                (part, index) => {

                    row[`بخش ${index + 1}`] =
                        part;

                }
            );

            data.push(row);

        } catch (error) {

            console.error(
                `Error reading ${file}:`,
                error
            );

        }
    }

    // مرتب‌سازی بر اساس مبلغ تخفیف
    data.sort(
        (a, b) =>
            (b["مبلغ تخفیف"] ?? 0) -
            (a["مبلغ تخفیف"] ?? 0)
    );

    const worksheet =
        XLSX.utils.json_to_sheet(data);

    // تعیین عرض ستون‌ها
    worksheet["!cols"] = [
        {
            wch: 18,
        },

        ...Array.from(
            { length: maxParts },
            () => ({
                wch: 25,
            })
        ),
    ];

    const workbook =
        XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "تخفیف‌ها"
    );

    const outputPath =
        path.resolve("./discounts.xlsx");

    XLSX.writeFile(
        workbook,
        outputPath
    );

    console.log(
        `Excel created: ${outputPath}`
    );
}

main()
    .catch(error => {

        console.error(error);

        process.exit(1);

    });