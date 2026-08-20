import Database from "better-sqlite3";
import { PrismaClient } from "@prisma/client";

const sqlite = new Database("prisma/dev.db", {
    readonly: true,
});

const prisma = new PrismaClient();

type TableConfig = {
    table: string;
    columns: string[];
    booleanColumns?: string[];
    dateColumns?: string[];
      enumColumns?: Record<string, string>;
};

const tables: TableConfig[] = [
    {
        table: "Branch",
        columns: ["id", "name", "createdAt"],
        dateColumns: ["createdAt"],
    },

    {
        table: "MenuItem",
        columns: [
            "id",
            "code",
            "title",
            "type",
            "isActive",
            "createdAt",
            "updatedAt",
            "deletedAt",
        ],
        booleanColumns: ["isActive"],
        dateColumns: ["createdAt", "updatedAt", "deletedAt"],
         enumColumns: {        type: "MenuItemType",    },
    },

    {
        table: "MenuItemPrice",
        columns: [
            "id",
            "menuItemId",
            "price",
            "startDate",
            "endDate",
            "createdAt",
        ],
        dateColumns: ["startDate", "endDate", "createdAt"],
    },

    {
        table: "Device",
        columns: [
            "id",
            "branchId",
            "title",
            "createdAt",
        ],
        dateColumns: ["createdAt"],
    },

    {
        table: "User",
        columns: [
            "id",
            "username",
            "passwordHash",
            "fullName",
            "role",
            "isActive",
            "createdAt",
            "updatedAt",
            "branchId",
        ],
        booleanColumns: ["isActive"],
        dateColumns: ["createdAt", "updatedAt"],
        enumColumns: {
        role: "UserRole",
    },
    },

    {
        table: "DailyReport",
        columns: [
            "id",
            "date",
            "branchId",
            "description",
            "createdAt",
            "updatedAt",
            "totalSales",
            "totalDiscount",
            "cashAmount",
            "invoiceCount",
        ],
        dateColumns: ["date", "createdAt", "updatedAt"],
        enumColumns: {
        status: "IssueStatus",
    },
    },

    {
        table: "DailySaleItem",
        columns: [
            "id",
            "reportId",
            "menuItemId",
            "qty",
            "unitPrice",
            "discount",
            "totalPrice",
            "createdAt",
        ],
        dateColumns: ["createdAt"],
    },

    {
        table: "Issue",
        columns: [
            "id",
            "reportId",
            "title",
            "description",
            "actionTaken",
            "repairDate",
            "status",
            "createdAt",
        ],
        dateColumns: ["repairDate", "createdAt"],
    },

    {
        table: "Incident",
        columns: [
            "id",
            "reportId",
            "title",
            "description",
            "actionTaken",
            "createdAt",
        ],
        dateColumns: ["createdAt"],
    },

    {
        table: "DailyEvent",
        columns: [
            "id",
            "reportId",
            "title",
            "description",
            "createdAt",
        ],
        dateColumns: ["createdAt"],
    },

    {
        table: "ChecklistGroup",
        columns: [
            "id",
            "title",
            "sortOrder",
            "isActive",
            "createdAt",
        ],
        booleanColumns: ["isActive"],
        dateColumns: ["createdAt"],
    },

    {
        table: "ChecklistQuestion",
        columns: [
            "id",
            "title",
            "description",
            "type",
            "groupId",
            "sortOrder",
            "isActive",
            "createdAt",
        ],
        booleanColumns: ["isActive"],
        dateColumns: ["createdAt"],
         enumColumns: {
        type: "ChecklistType",
    },
    },

    {
        table: "ChecklistResponse",
        columns: [
            "id",
            "userId",
            "type",
            "groupId",
            "description",
            "attachment",
            "createdAt",
        ],
        dateColumns: ["createdAt"],
        enumColumns: {
        type: "ChecklistType",
    },
    },

    {
        table: "ChecklistAnswer",
        columns: [
            "id",
            "responseId",
            "questionId",
            "checked",
            "description",
        ],
        booleanColumns: ["checked"],
    },
];

function convertValue(
    value: unknown,
    column: string,
    config: TableConfig
) {
    if (value === null || value === undefined) {
        return null;
    }

    if (config.booleanColumns?.includes(column)) {
        return Boolean(value);
    }

    if (config.dateColumns?.includes(column)) {

        let date: Date;

        // SQLite DateTime stored as Unix milliseconds
        if (typeof value === "number") {
            date = new Date(value);
        }
        else if (value instanceof Date) {
            date = value;
        }
        else {
            date = new Date(String(value));
        }

        if (isNaN(date.getTime())) {
            throw new Error(
                `Invalid date in ${config.table}.${column}: ${value}`
            );
        }

        return date.toISOString();
    }

    return value;
}
async function getSQLiteRows(
    table: string,
    columns: string[]
) {
    const columnSql = columns
        .map((column) => `"${column}"`)
        .join(", ");

    return sqlite
        .prepare(`SELECT ${columnSql} FROM "${table}" ORDER BY "id"`)
        .all() as Record<string, unknown>[];
}

async function insertTable(config: TableConfig) {

    const rows = await getSQLiteRows(
        config.table,
        config.columns
    );

    console.log(
        `\n${config.table}: ${rows.length} records`
    );

    if (rows.length === 0) {
        return;
    }

    const columnSql = config.columns
        .map((column) => `"${column}"`)
        .join(", ");

   const valueSql = config.columns
    .map((column, index) => {

        if (config.dateColumns?.includes(column)) {
            return `CAST($${index + 1} AS TIMESTAMP)`;
        }

        if (config.enumColumns?.[column]) {
            return `CAST($${index + 1} AS "${config.enumColumns[column]}")`;
        }

        return `$${index + 1}`;
    })
    .join(", ");
    
    const query = `
        INSERT INTO "${config.table}"
        (${columnSql})
        VALUES (${valueSql})
    `;

    let count = 0;

    for (const row of rows) {

        const values = config.columns.map(
            (column) =>
                convertValue(
                    row[column],
                    column,
                    config
                )
        );

        await prisma.$executeRawUnsafe(
            query,
            ...values
        );

        count++;

        if (count % 100 === 0) {

            console.log(
                `  ${count}/${rows.length}`
            );

        }
    }

    console.log(
        `  ✓ ${config.table}: ${count} inserted`
    );
}

async function resetSequences() {

    console.log("\nResetting PostgreSQL sequences...");

    for (const config of tables) {

        await prisma.$executeRawUnsafe(`
            SELECT setval(
                pg_get_serial_sequence('"${config.table}"', 'id'),
                COALESCE(
                    (SELECT MAX("id") FROM "${config.table}"),
                    1
                ),
                true
            )
        `);
    }

    console.log("✓ Sequences reset");
}

async function main() {

    console.log(
        "======================================"
    );

    console.log(
        "SQLite → PostgreSQL Migration"
    );

    console.log(
        "======================================"
    );

    console.log(
        "\nSource: prisma/dev.db"
    );

    console.log(
        "Target: PostgreSQL / Neon\n"
    );

    try {

        for (const table of tables) {
            await insertTable(table);
        }

        await resetSequences();

        console.log(
            "\n======================================"
        );

        console.log(
            "Migration completed successfully!"
        );

        console.log(
            "======================================\n"
        );

    } catch (error) {

        console.error(
            "\nMigration FAILED:"
        );

        console.error(error);

        process.exitCode = 1;

    } finally {

        sqlite.close();

        await prisma.$disconnect();
    }
}

main();