"use client";

import { addPrice } from "../actions";

export default function PriceForm({
  menuItemId,
}: {
  menuItemId: number;
}) {
  return (
    <form action={addPrice} className="flex gap-3 mt-6">
      <input
        type="hidden"
        name="menuItemId"
        value={menuItemId}
      />

      <input
        type="number"
        name="price"
        placeholder="قیمت جدید"
        className="border rounded p-2 flex-1"
        required
      />

      <button
        type="submit"
        className="bg-green-600 text-white rounded px-4 py-2"
      >
        ثبت قیمت
      </button>
    </form>
  );
}