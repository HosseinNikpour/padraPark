"use client";

import { deleteMenu } from "../actions";

export default function DeleteButton({
  id,
}: {
  id: number;
}) {
  return (
    <button
      className="text-red-600"
      onClick={async () => {
        if (!confirm("حذف شود؟")) return;

        await deleteMenu(id);
      }}
    >
      حذف
    </button>
  );
}