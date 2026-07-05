"use client";

import { updateMenu } from "../actions";

export default function EditForm({
  item,
}: {
  item: any;
}) {
  return (
    <form
      action={updateMenu}
      className="space-y-2"
    >
      <input
        type="hidden"
        name="id"
        value={item.id}
      />

      <input
        name="title"
        defaultValue={item.title}
        className="border rounded p-2 w-full"
      />

      <input
        name="code"
        defaultValue={item.code ?? ""}
        className="border rounded p-2 w-full"
      />

      <select
        name="type"
        defaultValue={item.type}
        className="border rounded p-2 w-full"
      >
        <option value="GAME">بازی</option>
        <option value="CAFE">کافه</option>
      </select>

      <button className="bg-blue-600 text-white rounded p-2 w-full">
        ذخیره
      </button>
    </form>
  );
}