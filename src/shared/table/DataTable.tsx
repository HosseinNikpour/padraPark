"use client";

import { Column } from "./types";

interface Props<T> {
    columns: Column<T>[];
    data: T[];
    title?: string;
}

export default function DataTable<T>({
    columns,
    data,
    title
}: Props<T>) {
    return (
        <div className="overflow-auto rounded-xl bg-white shadow">
            {title && (

                <div className="px-5 py-4 border-b text-lg font-bold">

                    {title}

                </div>

            )}
            <table className="min-w-full">

                <thead className="sticky top-0 bg-slate-100 z-10">

                    <tr>

                        {columns.map((col) => (

                            <th
                                key={String(col.key)}
                                className="px-4 py-3 text-sm font-bold text-right"
                            >
                                {col.title}
                            </th>

                        ))}

                    </tr>
                    
                </thead>

                <tbody>
                  
                    {data.map((row, index) => (

                        <tr
                            key={index}
                            className={`border-t ${index % 2 === 0
                                ? "bg-white"
                                : "bg-slate-50"
                                } hover:bg-blue-50`}
                        >

                            {columns.map((col) => (

                                <td
                                    key={String(col.key)}
                                    className="px-4 py-3 text-center"
                                >

                                    {col.render
                                        ? col.render(row)
                                        : String(
                                            row[col.key as keyof T] ?? ""
                                        )}

                                </td>

                            ))}

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}